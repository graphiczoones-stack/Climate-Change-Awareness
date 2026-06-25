import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';

export const HeroOverlay: React.FC = () => {
  const isLoaded = useAppStore((s) => s.isLoaded);
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, [isLoaded]);

  const visible = scrollProgress < 0.07;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 5vw',
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div
        ref={containerRef}
        className="glass"
        style={{
          maxWidth: 480,
          padding: '2.5rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          alignItems: 'flex-end',
          textAlign: 'right',
        }}
      >
        {/* Eyebrow */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          color: '#00B48A',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          opacity: 0,
        }}>
          تجربة سينمائية تفاعلية
        </div>

        {/* Title */}
        <h1 className="text-cinematic" style={{ opacity: 0, color: '#fff' }}>
          الأرض<br />
          <span style={{ color: '#00B48A' }}>في خطر</span>
        </h1>

        {/* Divider */}
        <div style={{
          width: 60, height: 2,
          background: 'linear-gradient(to left, #00B48A, transparent)',
          borderRadius: 2,
          opacity: 0,
          alignSelf: 'flex-end',
        }} />

        {/* Subtitle */}
        <p className="text-body-arabic" style={{ opacity: 0, textAlign: 'right' }}>
          رحلة بصرية في قلب تغيُّر المناخ وأثره على كوكبنا الجميل
        </p>

        {/* CTA Button */}
        <button
          className="btn-pill btn-primary"
          data-cursor-hover
          style={{ opacity: 0 }}
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 2, behavior: 'smooth' });
          }}
        >
          ابدأ الرحلة
          <span style={{ fontSize: '1.1em' }}>←</span>
        </button>
      </div>
    </div>
  );
};
