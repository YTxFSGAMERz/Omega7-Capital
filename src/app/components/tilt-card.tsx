'use client';

import React, { useRef, useCallback, useEffect, useState, useSyncExternalStore } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
}

function useIsDesktop() {
  const subscribe = useCallback((callback: () => void) => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const currentTiltRef = useRef({ x: 0, y: 0 });
  const targetGlareRef = useRef({ x: 50, y: 50, opacity: 0 });
  const currentGlareRef = useRef({ x: 50, y: 50, opacity: 0 });
  const propsRef = useRef({ glare, scale, maxTilt });
  const tickRef = useRef<() => void>(() => {});
  const isDesktop = useIsDesktop();

  useEffect(() => {
    propsRef.current = { glare, scale, maxTilt };
  }, [glare, scale, maxTilt]);

  useEffect(() => {
    tickRef.current = () => {
      const card = cardRef.current;
      const glareEl = glareRef.current;
      if (!card) return;

      const spring = 0.12;
      currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * spring;
      currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * spring;

      currentGlareRef.current.x += (targetGlareRef.current.x - currentGlareRef.current.x) * spring;
      currentGlareRef.current.y += (targetGlareRef.current.y - currentGlareRef.current.y) * spring;
      currentGlareRef.current.opacity += (targetGlareRef.current.opacity - currentGlareRef.current.opacity) * spring;

      const { x: tiltX, y: tiltY } = currentTiltRef.current;
      const scaleVal = isHoveringRef.current ? propsRef.current.scale : 1;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scaleVal}, ${scaleVal}, ${scaleVal})`;

      if (propsRef.current.glare && glareEl) {
        const { x: gx, y: gy, opacity: gOpacity } = currentGlareRef.current;
        glareEl.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${gOpacity}) 0%, transparent 60%)`;
      }

      const dx = Math.abs(targetTiltRef.current.x - currentTiltRef.current.x);
      const dy = Math.abs(targetTiltRef.current.y - currentTiltRef.current.y);
      const dOpacity = Math.abs(targetGlareRef.current.opacity - currentGlareRef.current.opacity);

      if (dx > 0.01 || dy > 0.01 || dOpacity > 0.001) {
        rafRef.current = requestAnimationFrame(tickRef.current);
      }
    };
  }, []);

  const scheduleFrame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      isHoveringRef.current = true;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * propsRef.current.maxTilt;
      const rotateY = ((x - centerX) / centerX) * propsRef.current.maxTilt;

      targetTiltRef.current = { x: rotateX, y: rotateY };

      if (propsRef.current.glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        targetGlareRef.current = { x: glareX, y: glareY, opacity: 0.15 };
      }

      scheduleFrame();
    },
    [scheduleFrame],
  );

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    targetTiltRef.current = { x: 0, y: 0 };
    targetGlareRef.current = { x: 50, y: 50, opacity: 0 };

    scheduleFrame();
  }, [scheduleFrame]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isDesktop) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {glare && (
        <div
          ref={glareRef}
          className="tilt-card-glare"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
