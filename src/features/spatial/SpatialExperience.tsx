import { useReducedMotion } from 'framer-motion';
import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
  type WheelEvent
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider, css, keyframes } from 'styled-components';
import { RouteSeo } from '../../components/seo/RouteSeo';
import { projectsBySlug } from '../../content/projects';
import { siteContent } from '../../content/site';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { createTheme } from '../../styles/theme';
import {
  areNodesDirectNeighbors,
  getNavigationDirection,
  resolveSpatialNode,
  spatialNodes,
  type SpatialDirection,
  type SpatialNode,
  type SpatialNodeId
} from './config';
import { HomeSpatialScreen } from './screens/HomeSpatialScreen';
import { ProjectSpatialScreen } from './screens/ProjectSpatialScreen';

const TRANSITION_DURATION_MS = 720;
const TRANSITION_SETTLE_MS = 32;
const MOUSE_INTENT_DELAY_MS = 320;
const MOUSE_EXIT_GESTURE_THRESHOLD = 26;
const WHEEL_RESET_MS = 180;
const WHEEL_THRESHOLD = 140;
const SWIPE_THRESHOLD = 82;
const DOMINANCE_RATIO = 1.15;
const TRANSITION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

type TransitionStatus = 'idle' | 'animating' | 'settled';

interface TransitionSession {
  id: number;
  fromId: SpatialNodeId;
  toId: SpatialNodeId;
  direction: SpatialDirection;
  running: boolean;
}

interface TransitionState {
  status: TransitionStatus;
  session: TransitionSession | null;
}

type ScreenLayerRole = 'active' | 'incoming' | 'outgoing';

const Viewport = styled.section`
  position: relative;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.04), transparent 32%),
    radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.06), transparent 24%),
    ${({ theme }) => theme.colors.background};
`;

const Stage = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const ScreenLayer = styled.div<{
  $role: ScreenLayerRole;
  $direction: SpatialDirection;
  $running: boolean;
  $reducedMotion: boolean;
}>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  backface-visibility: hidden;
  contain: layout paint;
  will-change: transform;
  pointer-events: none;
  z-index: ${({ $role }) => ($role === 'incoming' ? 2 : 1)};
  transform: ${({ $role, $direction, $running, $reducedMotion }) =>
    resolveLayerTransform($role, $direction, $running, $reducedMotion)};
  transition: ${({ $role, $reducedMotion }) =>
    $role === 'active'
      ? 'none'
      : `transform ${$reducedMotion ? 1 : TRANSITION_DURATION_MS}ms ${TRANSITION_EASING}`};
`;

const ScreenScene = styled.div<{ $interactive: boolean }>`
  position: absolute;
  inset: 0;
  padding: clamp(4.25rem, 7vh, 5.5rem) clamp(4.25rem, 6.5vw, 5.75rem)
    clamp(3.5rem, 6vh, 4.5rem);
  pointer-events: ${({ $interactive }) => ($interactive ? 'auto' : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: clamp(4rem, 6vh, 5rem) clamp(1rem, 4vw, 2rem)
      clamp(3.75rem, 6.5vh, 4.75rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 3.6rem 0.75rem 3rem;
  }
`;

const Overlay = styled.div<{ $locked: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
  opacity: ${({ $locked }) => ($locked ? 0 : 1)};
  transition: opacity 160ms ease;
`;

type SupportTone = 'dark' | 'light';

const hoverIntentFill = keyframes`
  from {
    transform: scaleX(0);
    opacity: 0.36;
  }

  to {
    transform: scaleX(1);
    opacity: 1;
  }
`;

const NavigationZone = styled.div<{
  $direction: SpatialDirection;
  $active: boolean;
  $armed: boolean;
}>`
  position: absolute;
  pointer-events: auto;
  cursor: pointer;
  z-index: 1;
  opacity: ${({ $active, $armed }) => ($armed ? 0.72 : $active ? 0.5 : 0.18)};
  transition: opacity 180ms ease;

  ${({ $direction }) =>
    $direction === 'left' &&
    `
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: clamp(3.75rem, 6vw, 5.25rem);
      height: min(68vh, 32rem);
      border-radius: 0 1.6rem 1.6rem 0;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent);
    `}

  ${({ $direction }) =>
    $direction === 'right' &&
    `
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: clamp(3.75rem, 6vw, 5.25rem);
      height: min(68vh, 32rem);
      border-radius: 1.6rem 0 0 1.6rem;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0.1), transparent);
    `}

  ${({ $direction }) =>
    $direction === 'down' &&
    `
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: min(64vw, 36rem);
      height: clamp(3.5rem, 6vh, 5rem);
      border-radius: 1.6rem 1.6rem 0 0;
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.1), transparent);
    `}

  ${({ $direction }) =>
    $direction === 'up' &&
    `
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: min(64vw, 36rem);
      height: clamp(3.5rem, 6vh, 5rem);
      border-radius: 0 0 1.6rem 1.6rem;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent);
    `}

  &:hover {
    opacity: ${({ $armed }) => ($armed ? 0.78 : 0.58)};
  }

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

const SupportButton = styled.button<{
  $direction: SpatialDirection;
  $hovered: boolean;
  $armed: boolean;
  $tone: SupportTone;
}>`
  position: absolute;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.42rem;
  max-width: min(14rem, 22vw);
  min-height: 2.25rem;
  padding: 0.45rem 0.72rem;
  opacity: ${({ $tone, $hovered, $armed }) =>
    $tone === 'light'
      ? $armed
        ? 1
        : $hovered
          ? 0.94
          : 0.72
      : $armed
        ? 0.98
        : $hovered
          ? 0.82
          : 0.54};
  border: 1px solid
    ${({ theme, $tone, $hovered, $armed }) =>
      $tone === 'dark'
        ? $armed || $hovered
          ? 'rgba(255, 255, 255, 0.34)'
          : 'rgba(255, 255, 255, 0.16)'
        : $armed
          ? 'rgba(255, 255, 255, 0.76)'
          : $hovered
          ? theme.colors.accentStrong
          : 'rgba(255, 255, 255, 0.44)'};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $tone, $hovered, $armed }) =>
    $tone === 'dark'
      ? $armed
        ? 'rgba(8, 8, 8, 0.82)'
        : $hovered
          ? 'rgba(8, 8, 8, 0.72)'
          : 'rgba(8, 8, 8, 0.54)'
      : $armed
        ? 'rgba(250, 247, 242, 0.98)'
        : $hovered
          ? 'rgba(249, 245, 240, 0.94)'
          : 'rgba(247, 242, 236, 0.88)'};
  color: ${({ theme, $tone }) =>
    $tone === 'dark' ? theme.colors.text : theme.colors.accentContrast};
  box-shadow: ${({ $tone, $hovered, $armed }) =>
    $tone === 'dark'
      ? $armed
        ? '0 14px 28px rgba(0, 0, 0, 0.22)'
        : $hovered
          ? '0 12px 26px rgba(0, 0, 0, 0.2)'
          : '0 10px 24px rgba(0, 0, 0, 0.16)'
      : $armed
        ? '0 14px 28px rgba(0, 0, 0, 0.16)'
        : $hovered
          ? '0 12px 24px rgba(0, 0, 0, 0.14)'
          : '0 9px 20px rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(14px);
  transition:
    border-color 180ms ease,
    background 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease,
    opacity 180ms ease;

  ${({ $direction }) =>
    $direction === 'left' &&
    `
      top: 50%;
      left: clamp(1rem, 1.6vw, 1.55rem);
      transform: translateY(-50%);
    `}

  ${({ $direction }) =>
    $direction === 'right' &&
    `
      top: 50%;
      right: clamp(1rem, 1.6vw, 1.55rem);
      transform: translateY(-50%);
    `}

  ${({ $direction }) =>
    $direction === 'up' &&
    `
      left: 50%;
      top: clamp(0.95rem, 1.8vh, 1.35rem);
      transform: translateX(-50%);
    `}

  ${({ $direction }) =>
    $direction === 'down' &&
    `
      left: 50%;
      bottom: clamp(0.95rem, 1.8vh, 1.35rem);
      transform: translateX(-50%);
    `}

  &::after {
    content: '';
    position: absolute;
    left: 0.55rem;
    right: 0.55rem;
    bottom: 0.26rem;
    height: 2px;
    border-radius: 999px;
    background: ${({ theme, $tone }) =>
      $tone === 'dark' ? 'rgba(255, 255, 255, 0.7)' : theme.colors.accentStrong};
    transform: scaleX(0);
    transform-origin: left center;
    opacity: 0;
    pointer-events: none;
    ${({ $armed }) =>
      $armed
        ? css`
            animation: ${hoverIntentFill} ${MOUSE_INTENT_DELAY_MS}ms linear
              forwards;
          `
        : css`
            animation: none;
          `}
  }

  &:hover,
  &:focus-visible {
    opacity: ${({ $armed }) => ($armed ? 1 : 0.9)};
    transform: ${({ $direction }) =>
      $direction === 'left'
        ? 'translate(-0.12rem, -50%)'
        : $direction === 'right'
          ? 'translate(0.12rem, -50%)'
          : $direction === 'up'
            ? 'translate(-50%, -0.12rem)'
            : 'translate(-50%, 0.12rem)'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 2.1rem;
    padding: 0.4rem 0.62rem;
    max-width: min(12rem, 32vw);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 1.95rem;
    padding: 0.34rem 0.5rem;
    max-width: min(10.5rem, 40vw);
    border-radius: 1.1rem;
  }
`;

const SupportGlyph = styled.span<{ $tone: SupportTone }>`
  display: inline-grid;
  place-items: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 999px;
  background: ${({ $tone }) =>
    $tone === 'dark'
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(8, 8, 8, 0.08)'};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.72rem;
  line-height: 1;
`;

const SupportLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.61rem;
    letter-spacing: 0.1em;
  }
`;

const directionLabels: Record<SpatialDirection, string> = {
  left: 'Esquerda',
  right: 'Direita',
  up: 'Acima',
  down: 'Abaixo'
};

const directionGlyphs: Record<SpatialDirection, string> = {
  left: '<',
  right: '>',
  up: '^',
  down: 'v'
};

const getSupportTone = (
  currentNode: SpatialNode,
  targetNode: SpatialNode
): SupportTone => {
  if (currentNode.id === 'home') {
    return 'dark';
  }

  if (targetNode.id === 'home') {
    return 'dark';
  }

  if (currentNode.kind === 'detail' && targetNode.kind === 'hub') {
    return 'dark';
  }

  return 'light';
};

const getSupportLabel = (targetNode: SpatialNode) =>
  targetNode.id === 'home' ? 'Home' : targetNode.label;

const isAbruptZoneExitMotion = (
  direction: SpatialDirection,
  deltaX: number,
  deltaY: number
) => {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  switch (direction) {
    case 'left':
      return (
        deltaX > MOUSE_EXIT_GESTURE_THRESHOLD &&
        absX > absY * DOMINANCE_RATIO
      );
    case 'right':
      return (
        deltaX < -MOUSE_EXIT_GESTURE_THRESHOLD &&
        absX > absY * DOMINANCE_RATIO
      );
    case 'up':
      return (
        deltaY > MOUSE_EXIT_GESTURE_THRESHOLD &&
        absY > absX * DOMINANCE_RATIO
      );
    case 'down':
      return (
        deltaY < -MOUSE_EXIT_GESTURE_THRESHOLD &&
        absY > absX * DOMINANCE_RATIO
      );
  }
};

const toTranslate3d = (x: number, y: number) =>
  `translate3d(${x}%, ${y}%, 0)`;

const getIncomingOffset = (direction: SpatialDirection) => {
  switch (direction) {
    case 'left':
      return { x: -100, y: 0 };
    case 'right':
      return { x: 100, y: 0 };
    case 'up':
      return { x: 0, y: -100 };
    case 'down':
      return { x: 0, y: 100 };
  }
};

const getOutgoingOffset = (direction: SpatialDirection) => {
  switch (direction) {
    case 'left':
      return { x: 100, y: 0 };
    case 'right':
      return { x: -100, y: 0 };
    case 'up':
      return { x: 0, y: 100 };
    case 'down':
      return { x: 0, y: -100 };
  }
};

const resolveLayerTransform = (
  role: ScreenLayerRole,
  direction: SpatialDirection,
  running: boolean,
  reducedMotion: boolean
) => {
  if (reducedMotion || role === 'active') {
    return toTranslate3d(0, 0);
  }

  if (role === 'incoming') {
    const offset = getIncomingOffset(direction);
    return running ? toTranslate3d(0, 0) : toTranslate3d(offset.x, offset.y);
  }

  const offset = getOutgoingOffset(direction);
  return running ? toTranslate3d(offset.x, offset.y) : toTranslate3d(0, 0);
};

const shouldBlockSpatialGesture = (target: EventTarget | null) => {
  const element = target as HTMLElement | null;

  return Boolean(
    element?.closest('[data-spatial-scroll-lock], button, a, input, textarea, select')
  );
};

const createDirectionFromDelta = (
  deltaX: number,
  deltaY: number,
  threshold: number
): SpatialDirection | null => {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  if (absX >= threshold && absX > absY * DOMINANCE_RATIO) {
    return deltaX > 0 ? 'right' : 'left';
  }

  if (absY >= threshold && absY > absX * DOMINANCE_RATIO) {
    return deltaY > 0 ? 'down' : 'up';
  }

  return null;
};

const getNodeThemeKey = (node: SpatialNode) => node.projectSlug ?? 'default';

export function SpatialExperience() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const routeNode = resolveSpatialNode(location.pathname);
  const routeNodeId = routeNode?.id ?? null;
  const routeProject = routeNode?.projectSlug
    ? projectsBySlug[routeNode.projectSlug]
    : null;
  const transitionDuration = prefersReducedMotion ? 1 : TRANSITION_DURATION_MS;

  const [displayedNodeId, setDisplayedNodeId] = useState<SpatialNodeId | null>(
    routeNodeId
  );
  const [transitionState, setTransitionState] = useState<TransitionState>({
    status: 'idle',
    session: null
  });
  const [hoveredDirection, setHoveredDirection] =
    useState<SpatialDirection | null>(null);
  const [hoverIntentDirection, setHoverIntentDirection] =
    useState<SpatialDirection | null>(null);
  const inputLockRef = useRef(false);
  const sessionCounterRef = useRef(0);
  const wheelStateRef = useRef({
    x: 0,
    y: 0,
    timeoutId: 0 as number | ReturnType<typeof setTimeout>
  });
  const touchStateRef = useRef({
    startX: 0,
    startY: 0,
    tracking: false,
    blocked: false
  });
  const hoverIntentRef = useRef({
    direction: null as SpatialDirection | null,
    blockedDirection: null as SpatialDirection | null,
    lastX: 0,
    lastY: 0,
    timeoutId: 0 as number | ReturnType<typeof setTimeout>
  });

  const displayedNode = displayedNodeId ? spatialNodes[displayedNodeId] : null;
  const isTransitionLocked =
    transitionState.status !== 'idle' || inputLockRef.current;

  const clearWheelAccumulator = () => {
    const wheelState = wheelStateRef.current;

    wheelState.x = 0;
    wheelState.y = 0;

    if (wheelState.timeoutId) {
      clearTimeout(wheelState.timeoutId);
      wheelState.timeoutId = 0;
    }
  };

  const clearHoverIntent = (
    direction?: SpatialDirection,
    options?: { releaseBlocked?: boolean; syncState?: boolean }
  ) => {
    const hoverIntent = hoverIntentRef.current;

    if (direction && hoverIntent.direction !== direction) {
      if (options?.releaseBlocked && hoverIntent.blockedDirection === direction) {
        hoverIntent.blockedDirection = null;
      }
      return;
    }

    if (hoverIntent.timeoutId) {
      clearTimeout(hoverIntent.timeoutId);
      hoverIntent.timeoutId = 0;
    }

    hoverIntent.direction = null;
    hoverIntent.lastX = 0;
    hoverIntent.lastY = 0;
    if (!direction || options?.releaseBlocked) {
      hoverIntent.blockedDirection = null;
    }

    if (options?.syncState === false) {
      return;
    }

    setHoverIntentDirection((currentDirection) =>
      direction && currentDirection !== direction ? currentDirection : null
    );
  };

  const scheduleHoverIntent = (
    direction: SpatialDirection,
    clientX: number,
    clientY: number
  ) => {
    if (
      isTransitionLocked ||
      !displayedNode ||
      !displayedNode.neighbors[direction]
    ) {
      return;
    }

    const hoverIntent = hoverIntentRef.current;

    if (hoverIntent.blockedDirection === direction) {
      return;
    }

    if (hoverIntent.direction === direction && hoverIntent.timeoutId) {
      return;
    }

    clearHoverIntent();
    hoverIntent.direction = direction;
    hoverIntent.lastX = clientX;
    hoverIntent.lastY = clientY;
    setHoverIntentDirection(direction);
    hoverIntent.timeoutId = window.setTimeout(() => {
      if (hoverIntentRef.current.direction !== direction) {
        return;
      }

      hoverIntentRef.current.timeoutId = 0;
      hoverIntentRef.current.direction = null;
      setHoverIntentDirection(null);
      void requestNavigateByDirection(direction);
    }, MOUSE_INTENT_DELAY_MS);
  };

  const handleZoneMouseMove = (
    direction: SpatialDirection,
    clientX: number,
    clientY: number
  ) => {
    const hoverIntent = hoverIntentRef.current;

    if (
      isTransitionLocked ||
      hoverIntent.direction !== direction ||
      !hoverIntent.timeoutId
    ) {
      return;
    }

    const deltaX = clientX - hoverIntent.lastX;
    const deltaY = clientY - hoverIntent.lastY;

    hoverIntent.lastX = clientX;
    hoverIntent.lastY = clientY;

    if (!isAbruptZoneExitMotion(direction, deltaX, deltaY)) {
      return;
    }

    hoverIntent.blockedDirection = direction;
    clearHoverIntent(direction);
    setHoveredDirection((currentDirection) =>
      currentDirection === direction ? null : currentDirection
    );
  };

  const createTransitionSession = (
    fromId: SpatialNodeId,
    toId: SpatialNodeId
  ) => {
    if (!areNodesDirectNeighbors(fromId, toId)) {
      return null;
    }

    const direction = getNavigationDirection(fromId, toId);

    if (!direction) {
      return null;
    }

    sessionCounterRef.current += 1;

    return {
      id: sessionCounterRef.current,
      fromId,
      toId,
      direction,
      running: false
    } satisfies TransitionSession;
  };

  const beginTransition = (fromId: SpatialNodeId, toId: SpatialNodeId) => {
    if (inputLockRef.current || transitionState.status !== 'idle') {
      return false;
    }

    const session = createTransitionSession(fromId, toId);

    if (!session) {
      return false;
    }

    inputLockRef.current = true;
    clearWheelAccumulator();
    clearHoverIntent();
    setHoveredDirection(null);
    setTransitionState({
      status: 'animating',
      session
    });
    return true;
  };

  const requestNavigateToNode = (
    targetId: SpatialNodeId,
    explicitDirection?: SpatialDirection
  ) => {
    if (!displayedNodeId || isTransitionLocked) {
      return false;
    }

    const targetNode = spatialNodes[targetId];

    if (
      !targetNode ||
      targetNode.path === location.pathname ||
      !areNodesDirectNeighbors(displayedNodeId, targetId)
    ) {
      return false;
    }

    const direction =
      explicitDirection ?? getNavigationDirection(displayedNodeId, targetId);

    if (!direction) {
      return false;
    }

    if (!beginTransition(displayedNodeId, targetId)) {
      return false;
    }

    navigate(targetNode.path);
    return true;
  };

  const requestNavigateByDirection = (direction: SpatialDirection) => {
    if (!displayedNode) {
      return false;
    }

    const targetId = displayedNode.neighbors[direction];
    return targetId ? requestNavigateToNode(targetId, direction) : false;
  };

  const resolveAvailableMoves = (node: SpatialNode | null) => {
    if (!node) {
      return [];
    }

    return (Object.entries(node.neighbors) as Array<
      [SpatialDirection, SpatialNodeId]
    >)
      .map(([direction, targetId]) => {
        const target = spatialNodes[targetId];
        return target ? { direction, targetId, target } : null;
      })
      .filter((move): move is NonNullable<typeof move> => move !== null);
  };

  const availableMoves = useMemo(
    () => resolveAvailableMoves(displayedNode),
    [displayedNode]
  );

  const renderSpatialScreen = (node: SpatialNode, interactive: boolean) => {
    const project = node.projectSlug ? projectsBySlug[node.projectSlug] : null;

    return (
      <ThemeProvider theme={createTheme(getNodeThemeKey(node))}>
        <ScreenScene $interactive={interactive}>
          {node.id === 'home' ? (
            <HomeSpatialScreen />
          ) : project ? (
            <ProjectSpatialScreen
              isActive={interactive}
              node={node}
              project={project}
            />
          ) : null}
        </ScreenScene>
      </ThemeProvider>
    );
  };

  const settleTransition = (sessionId: number) => {
    setTransitionState((previousState) => {
      if (
        previousState.status !== 'animating' ||
        !previousState.session ||
        previousState.session.id !== sessionId
      ) {
        return previousState;
      }

      return {
        ...previousState,
        status: 'settled'
      };
    });
  };

  useEffect(() => {
    return () => {
      clearWheelAccumulator();
      clearHoverIntent(undefined, {
        releaseBlocked: true,
        syncState: false
      });
    };
  }, []);

  useEffect(() => {
    if (!routeNodeId) {
      if (transitionState.status === 'idle') {
        setDisplayedNodeId(null);
        inputLockRef.current = false;
        clearHoverIntent();
      }

      return;
    }

    if (!displayedNodeId) {
      setDisplayedNodeId(routeNodeId);
      return;
    }

    if (transitionState.status !== 'idle' || routeNodeId === displayedNodeId) {
      return;
    }

    if (!areNodesDirectNeighbors(displayedNodeId, routeNodeId)) {
      clearWheelAccumulator();
      clearHoverIntent();
      inputLockRef.current = false;
      setDisplayedNodeId(routeNodeId);
      return;
    }

    const direction = getNavigationDirection(displayedNodeId, routeNodeId);

    if (!direction) {
      clearWheelAccumulator();
      clearHoverIntent();
      inputLockRef.current = false;
      setDisplayedNodeId(routeNodeId);
      return;
    }

    sessionCounterRef.current += 1;
    inputLockRef.current = true;
    clearWheelAccumulator();
    clearHoverIntent();
    setHoveredDirection(null);
    setTransitionState({
      status: 'animating',
      session: {
        id: sessionCounterRef.current,
        fromId: displayedNodeId,
        toId: routeNodeId,
        direction,
        running: false
      }
    });
  }, [displayedNodeId, routeNodeId, transitionState.status]);

  useEffect(() => {
    if (
      transitionState.status !== 'animating' ||
      !transitionState.session ||
      transitionState.session.running
    ) {
      return undefined;
    }

    const sessionId = transitionState.session.id;
    const frameId = window.requestAnimationFrame(() => {
      setTransitionState((previousState) => {
        if (
          previousState.status !== 'animating' ||
          !previousState.session ||
          previousState.session.id !== sessionId
        ) {
          return previousState;
        }

        return {
          ...previousState,
          session: {
            ...previousState.session,
            running: true
          }
        };
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [transitionState]);

  useEffect(() => {
    if (
      transitionState.status !== 'animating' ||
      !transitionState.session ||
      !transitionState.session.running
    ) {
      return undefined;
    }

    const sessionId = transitionState.session.id;
    const timeoutId = window.setTimeout(
      () => settleTransition(sessionId),
      transitionDuration + TRANSITION_SETTLE_MS
    );

    return () => window.clearTimeout(timeoutId);
  }, [transitionDuration, transitionState]);

  useEffect(() => {
    if (transitionState.status !== 'settled' || !transitionState.session) {
      return undefined;
    }

    setDisplayedNodeId(transitionState.session.toId);

    const timeoutId = window.setTimeout(() => {
      inputLockRef.current = false;
      setTransitionState({
        status: 'idle',
        session: null
      });
    }, TRANSITION_SETTLE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [transitionState]);

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (!displayedNode || isTransitionLocked) {
      event.preventDefault();
      return;
    }

    if (shouldBlockSpatialGesture(event.target)) {
      return;
    }

    const state = wheelStateRef.current;
    state.x += event.deltaX;
    state.y += event.deltaY;

    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
    }

    state.timeoutId = window.setTimeout(() => {
      state.x = 0;
      state.y = 0;
      state.timeoutId = 0;
    }, WHEEL_RESET_MS);

    const direction = createDirectionFromDelta(
      state.x,
      state.y,
      WHEEL_THRESHOLD
    );

    if (!direction || !displayedNode.neighbors[direction]) {
      return;
    }

    event.preventDefault();

    if (requestNavigateByDirection(direction)) {
      clearWheelAccumulator();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (event.touches.length !== 1) {
      touchStateRef.current.tracking = false;
      return;
    }

    const touch = event.touches[0];
    touchStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      tracking: true,
      blocked: shouldBlockSpatialGesture(event.target)
    };
  };

  const handleTouchMove = (event: TouchEvent<HTMLElement>) => {
    if (event.touches.length !== 1) {
      touchStateRef.current.tracking = false;
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const state = touchStateRef.current;

    if (!displayedNode || isTransitionLocked) {
      touchStateRef.current.tracking = false;
      return;
    }

    if (!state.tracking || state.blocked) {
      touchStateRef.current.tracking = false;
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - state.startX;
    const deltaY = touch.clientY - state.startY;
    const direction = createDirectionFromDelta(
      deltaX,
      deltaY,
      SWIPE_THRESHOLD
    );

    touchStateRef.current.tracking = false;

    if (!direction || !displayedNode.neighbors[direction]) {
      return;
    }

    void requestNavigateByDirection(direction);
  };

  useEffect(() => {
    const activeNode = displayedNode;

    if (!activeNode) {
      return undefined;
    }

    const currentMoves = resolveAvailableMoves(activeNode);
    const attemptNavigateToNode = (targetId: SpatialNodeId) => {
      if (
        isTransitionLocked ||
        !areNodesDirectNeighbors(activeNode.id, targetId)
      ) {
        return false;
      }

      const targetNode = spatialNodes[targetId];
      const direction = getNavigationDirection(activeNode.id, targetId);

      if (
        !targetNode ||
        !direction ||
        targetNode.path === location.pathname
      ) {
        return false;
      }

      sessionCounterRef.current += 1;
      inputLockRef.current = true;
      clearWheelAccumulator();
      clearHoverIntent();
      setHoveredDirection(null);
      setTransitionState({
        status: 'animating',
        session: {
          id: sessionCounterRef.current,
          fromId: activeNode.id,
          toId: targetId,
          direction,
          running: false
        }
      });
      navigate(targetNode.path);
      return true;
    };

    const attemptNavigateByDirection = (direction: SpatialDirection) => {
      const targetId = activeNode.neighbors[direction];
      return targetId ? attemptNavigateToNode(targetId) : false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        isTransitionLocked ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;

      if (
        target &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === 'Escape') {
        const firstMove = currentMoves[0];

        if (firstMove) {
          event.preventDefault();
          void attemptNavigateByDirection(firstMove.direction);
        }

        return;
      }

      if (event.key === 'Home') {
        if (activeNode.id !== 'home') {
          event.preventDefault();
          void attemptNavigateToNode('home');
        }

        return;
      }

      const directionByKey: Partial<Record<string, SpatialDirection>> = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down'
      };

      const direction = directionByKey[event.key];

      if (!direction || !activeNode.neighbors[direction]) {
        return;
      }

      event.preventDefault();
      void attemptNavigateByDirection(direction);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayedNode, isTransitionLocked, location.pathname, navigate]);

  if (!routeNode && !displayedNode) {
    return <NotFoundPage />;
  }

  const transitionSession = transitionState.session;
  const outgoingNode = transitionSession
    ? spatialNodes[transitionSession.fromId]
    : null;
  const incomingNode = transitionSession
    ? spatialNodes[transitionSession.toId]
    : null;

  return (
    <>
      <RouteSeo
        description={
          routeProject?.seo.description ?? siteContent.metadata.defaultDescription
        }
        image={routeProject?.heroMedia.poster ?? siteContent.metadata.ogImage}
        title={routeProject?.seo.title ?? siteContent.metadata.defaultTitle}
      />

      <Viewport
        aria-label="Navegacao espacial do portfolio"
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
      >
        <Stage>
          {transitionSession && outgoingNode && incomingNode ? (
            <>
              <ScreenLayer
              $direction={transitionSession.direction}
              $reducedMotion={prefersReducedMotion}
              $role="outgoing"
              $running={transitionSession.running}
            >
              {renderSpatialScreen(outgoingNode, false)}
            </ScreenLayer>

              <ScreenLayer
                $direction={transitionSession.direction}
                $reducedMotion={prefersReducedMotion}
                $role="incoming"
                $running={transitionSession.running}
                onTransitionEnd={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    event.propertyName === 'transform'
                  ) {
                    settleTransition(transitionSession.id);
                  }
                }}
              >
                {renderSpatialScreen(incomingNode, true)}
              </ScreenLayer>
            </>
          ) : displayedNode ? (
            <ScreenLayer
              $direction="right"
              $reducedMotion={prefersReducedMotion}
              $role="active"
              $running
            >
              {renderSpatialScreen(displayedNode, true)}
            </ScreenLayer>
          ) : null}
        </Stage>

        <Overlay $locked={isTransitionLocked}>
          {!isTransitionLocked
            ? availableMoves.map((move) => {
                const isHighlighted =
                  hoveredDirection === move.direction ||
                  hoverIntentDirection === move.direction;
                const supportTone = displayedNode
                  ? getSupportTone(displayedNode, move.target)
                  : 'dark';

                return (
                <Fragment key={move.direction}>
                  <NavigationZone
                    $active={isHighlighted}
                    $armed={hoverIntentDirection === move.direction}
                    $direction={move.direction}
                    onMouseEnter={(event) => {
                      setHoveredDirection(move.direction);
                      scheduleHoverIntent(
                        move.direction,
                        event.clientX,
                        event.clientY
                      );
                    }}
                    onMouseMove={(event) =>
                      handleZoneMouseMove(
                        move.direction,
                        event.clientX,
                        event.clientY
                      )
                    }
                    onMouseLeave={() => {
                      setHoveredDirection((currentDirection) =>
                        currentDirection === move.direction
                          ? null
                          : currentDirection
                      );
                      clearHoverIntent(move.direction, {
                        releaseBlocked: true
                      });
                    }}
                  />

                  <SupportButton
                    $hovered={isHighlighted}
                    $armed={hoverIntentDirection === move.direction}
                    $direction={move.direction}
                    $tone={supportTone}
                    aria-label={`${directionLabels[move.direction]} para ${getSupportLabel(move.target)}`}
                    onBlur={() =>
                      setHoveredDirection((currentDirection) =>
                        currentDirection === move.direction
                          ? null
                          : currentDirection
                      )
                    }
                    onClick={() =>
                      requestNavigateToNode(move.targetId, move.direction)
                    }
                    onFocus={() => setHoveredDirection(move.direction)}
                    onMouseEnter={() => setHoveredDirection(move.direction)}
                    onMouseLeave={() =>
                      setHoveredDirection((currentDirection) =>
                        currentDirection === move.direction
                          ? null
                          : currentDirection
                      )
                    }
                    type="button"
                  >
                    <SupportGlyph $tone={supportTone}>
                      {directionGlyphs[move.direction]}
                    </SupportGlyph>
                    <SupportLabel>{getSupportLabel(move.target)}</SupportLabel>
                  </SupportButton>
                </Fragment>
                );
              })
            : null}

        </Overlay>
      </Viewport>
    </>
  );
}
