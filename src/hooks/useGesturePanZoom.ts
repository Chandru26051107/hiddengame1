import { useState, useRef, useEffect, useCallback } from 'react';
import { ViewportTransform } from '../types/game';

interface UseGesturePanZoomOptions {
  sceneWidth: number;
  sceneHeight: number;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
}

export const useGesturePanZoom = ({
  sceneWidth,
  sceneHeight,
  minScale = 0.4,
  maxScale = 2.4,
  initialScale = 0.85,
}: UseGesturePanZoomOptions) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<ViewportTransform>({
    x: 0,
    y: 0,
    scale: initialScale,
  });

  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const transformStartRef = useRef({ x: 0, y: 0 });
  const totalTravelRef = useRef(0);
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistRef = useRef<number | null>(null);
  const initialPinchScaleRef = useRef<number>(initialScale);

  // Helper to clamp transform within visible scene limits
  const clampTransform = useCallback(
    (t: ViewportTransform, containerWidth: number, containerHeight: number): ViewportTransform => {
      const scale = Math.max(minScale, Math.min(maxScale, t.scale));
      const scaledW = sceneWidth * scale;
      const scaledH = sceneHeight * scale;

      // Allow panning with comfortable margins
      const minX = containerWidth - scaledW - 100;
      const maxX = 100;
      const minY = containerHeight - scaledH - 100;
      const maxY = 100;

      const clampedX = scaledW <= containerWidth 
        ? (containerWidth - scaledW) / 2 
        : Math.max(minX, Math.min(maxX, t.x));

      const clampedY = scaledH <= containerHeight 
        ? (containerHeight - scaledH) / 2 
        : Math.max(minY, Math.min(maxY, t.y));

      return { x: clampedX, y: clampedY, scale };
    },
    [sceneWidth, sceneHeight, minScale, maxScale]
  );

  // Center initial view when container mounts
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const initX = (rect.width - sceneWidth * initialScale) / 2;
    const initY = (rect.height - sceneHeight * initialScale) / 2;
    setTransform(clampTransform({ x: initX, y: initY, scale: initialScale }, rect.width, rect.height));
  }, [sceneWidth, sceneHeight, initialScale, clampTransform]);

  // Center view smoothly onto a target point (for hints and level init)
  const centerOn = useCallback(
    (targetX: number, targetY: number, desiredScale: number = 1.3) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const targetViewportX = rect.width / 2 - targetX * desiredScale;
      const targetViewportY = rect.height / 2 - targetY * desiredScale;

      const finalTransform = clampTransform(
        { x: targetViewportX, y: targetViewportY, scale: desiredScale },
        rect.width,
        rect.height
      );

      // Smooth step easing
      const startX = transform.x;
      const startY = transform.y;
      const startScale = transform.scale;
      const duration = 500; // ms
      const startTime = performance.now();

      const animateStep = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);

        setTransform({
          x: startX + (finalTransform.x - startX) * ease,
          y: startY + (finalTransform.y - startY) * ease,
          scale: startScale + (finalTransform.scale - startScale) * ease,
        });

        if (progress < 1) {
          requestAnimationFrame(animateStep);
        }
      };

      requestAnimationFrame(animateStep);
    },
    [transform, clampTransform]
  );

  // Wheel zoom centered on cursor
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      const newScale = Math.max(minScale, Math.min(maxScale, transform.scale * zoomFactor));

      // Zoom towards mouse position
      const newX = mouseX - (mouseX - transform.x) * (newScale / transform.scale);
      const newY = mouseY - (mouseY - transform.y) * (newScale / transform.scale);

      setTransform(clampTransform({ x: newX, y: newY, scale: newScale }, rect.width, rect.height));
    },
    [transform, minScale, maxScale, clampTransform]
  );

  // Touch and pointer events
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only track primary touch/left click
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);

    if (activePointersRef.current.size === 1) {
      isDraggingRef.current = true;
      totalTravelRef.current = 0;
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      transformStartRef.current = { x: transform.x, y: transform.y };
    } else if (activePointersRef.current.size === 2) {
      // 2 finger pinch initiation
      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      initialPinchDistRef.current = dist;
      initialPinchScaleRef.current = transform.scale;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activePointersRef.current.has(e.pointerId)) return;
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    if (activePointersRef.current.size === 1 && isDraggingRef.current) {
      const dx = e.clientX - pointerStartRef.current.x;
      const dy = e.clientY - pointerStartRef.current.y;
      totalTravelRef.current = Math.hypot(dx, dy);

      const newX = transformStartRef.current.x + dx;
      const newY = transformStartRef.current.y + dy;

      setTransform(clampTransform({ x: newX, y: newY, scale: transform.scale }, rect.width, rect.height));
    } else if (activePointersRef.current.size === 2 && initialPinchDistRef.current) {
      const pts = Array.from(activePointersRef.current.values());
      const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const pinchMidX = (pts[0].x + pts[1].x) / 2 - rect.left;
      const pinchMidY = (pts[0].y + pts[1].y) / 2 - rect.top;

      const scaleRatio = currentDist / initialPinchDistRef.current;
      const newScale = Math.max(minScale, Math.min(maxScale, initialPinchScaleRef.current * scaleRatio));

      const newX = pinchMidX - (pinchMidX - transform.x) * (newScale / transform.scale);
      const newY = pinchMidY - (pinchMidY - transform.y) * (newScale / transform.scale);

      setTransform(clampTransform({ x: newX, y: newY, scale: newScale }, rect.width, rect.height));
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size === 0) {
      isDraggingRef.current = false;
      initialPinchDistRef.current = null;
    }
  };

  // Keyboard navigation (Arrow keys / WASD and +/- zoom)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', '+', '=', '-', '_'].includes(e.key)) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const panDelta = 60;

        let nextX = transform.x;
        let nextY = transform.y;
        let nextScale = transform.scale;

        if (e.key === 'ArrowUp' || e.key === 'w') nextY += panDelta;
        if (e.key === 'ArrowDown' || e.key === 's') nextY -= panDelta;
        if (e.key === 'ArrowLeft' || e.key === 'a') nextX += panDelta;
        if (e.key === 'ArrowRight' || e.key === 'd') nextX -= panDelta;
        if (e.key === '+' || e.key === '=') nextScale = Math.min(maxScale, nextScale * 1.15);
        if (e.key === '-' || e.key === '_') nextScale = Math.max(minScale, nextScale * 0.85);

        setTransform(clampTransform({ x: nextX, y: nextY, scale: nextScale }, rect.width, rect.height));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [transform, maxScale, minScale, clampTransform]);

  // Attach non-passive wheel listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const hasDragged = () => totalTravelRef.current > 8;

  const zoomIn = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newScale = Math.min(maxScale, transform.scale * 1.25);
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const newX = midX - (midX - transform.x) * (newScale / transform.scale);
    const newY = midY - (midY - transform.y) * (newScale / transform.scale);
    setTransform(clampTransform({ x: newX, y: newY, scale: newScale }, rect.width, rect.height));
  };

  const zoomOut = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newScale = Math.max(minScale, transform.scale * 0.8);
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const newX = midX - (midX - transform.x) * (newScale / transform.scale);
    const newY = midY - (midY - transform.y) * (newScale / transform.scale);
    setTransform(clampTransform({ x: newX, y: newY, scale: newScale }, rect.width, rect.height));
  };

  const resetView = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const initX = (rect.width - sceneWidth * initialScale) / 2;
    const initY = (rect.height - sceneHeight * initialScale) / 2;
    setTransform(clampTransform({ x: initX, y: initY, scale: initialScale }, rect.width, rect.height));
  };

  return {
    containerRef,
    transform,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    centerOn,
    zoomIn,
    zoomOut,
    resetView,
    hasDragged,
  };
};
