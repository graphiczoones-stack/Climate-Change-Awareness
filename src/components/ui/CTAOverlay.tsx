import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';

export const CTAOverlay: React.FC = () => {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = scrollProgress >= 0.95;

  useEffect(() => {
    if (!containerRef.current) return;
    if (visible) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, [visible]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease',
        padding: '2rem',
      }}
    >
      <div
        ref={containerRef}
        className="glass-green"
        style={{
          maxWidth: 560,
          width: '100%',
          padding: '3rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: '3.5rem', opacity: 0 }}>🌍</div>

        {/* Big headline */}
        <h2
          className="text-scene-title"
          style={{ color: '#fff', opacity: 0 }}
        >
          نحن الحل
        </h2>

        {/* Subtitle */}
        <p className="text-body-arabic" style={{ opacity: 0, textAlign: 'center' }}>
          معاً نستطيع حماية كوكبنا. كل قرار صغير يُحدث فرقاً حقيقياً.
          ابدأ اليوم — الأرض تنتظر.
        </p>

        {/* Divider */}
        <div style={{
          width: 60, height: 1,
          background: 'linear-gradient(90deg, transparent, #00B48A, transparent)',
          opacity: 0,
        }} />

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          opacity: 0,
        }}>
          <button
            className="btn-pill btn-primary"
            data-cursor-hover
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            🔄 أعد مشاهدة القصة
          </button>
          <button
            className="btn-pill btn-ghost"
            data-cursor-hover
          >
            🌱 شارك الرسالة
          </button>
        </div>

        {/* Footer credit */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
          opacity: 0,
        }}>
          Earth in Danger — تجربة مناخية تفاعلية
        </div>
      </div>
    </div>
  );
};
