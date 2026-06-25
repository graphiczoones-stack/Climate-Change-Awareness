import React, { useRef, useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

interface VideoPlayerProps {
  src: string;
  /** Which scene triggers this video to play */
  triggerScene?: string;
  /** Label shown on the card */
  label?: string;
  accentColor?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  triggerScene = 'greenhouse',
  label = 'الفيديو التوضيحي',
  accentColor = '#FF6B35',
}) => {
  const activeScene = useAppStore((s) => s.activeScene);
  const isMuted = useAppStore((s) => s.isMuted);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);

  const isVisible = activeScene === triggerScene;

  // Auto-play when scene becomes active
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.muted = isMuted;
      video.play().then(() => setIsPlaying(true)).catch(() => {
        // Autoplay blocked — need user interaction
        setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isVisible, isMuted]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Track progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    video.addEventListener('timeupdate', onTime);
    return () => video.removeEventListener('timeupdate', onTime);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setIsPlaying(true); }
    else { video.pause(); setIsPlaying(false); }
  };

  return (
    <div
      style={{
        position: 'fixed',
        // On mobile: bottom center. On desktop: left side
        bottom: window.innerWidth < 768 ? '2rem' : 'auto',
        left: window.innerWidth < 768 ? '50%' : '4rem',
        top: window.innerWidth < 768 ? 'auto' : '50%',
        zIndex: 20,
        width: window.innerWidth < 768 ? 'calc(100vw - 4rem)' : '380px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? (window.innerWidth < 768 ? 'translateX(-50%) scale(1)' : 'translateY(-50%) scale(1)')
          : (window.innerWidth < 768 ? 'translateX(-50%) scale(0.95)' : 'translateY(-50%) scale(0.95)'),
        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* Glass card wrapper */}
      <div
        style={{
          background: 'rgba(5, 5, 5, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${accentColor}30`,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: `0 0 40px ${accentColor}15, 0 20px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header bar */}
        <div style={{
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${accentColor}20`,
          background: `${accentColor}08`,
        }}>
          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: isPlaying ? accentColor : 'rgba(255,255,255,0.3)',
              boxShadow: isPlaying ? `0 0 8px ${accentColor}` : 'none',
              animation: isPlaying ? 'pulse 1.5s ease-in-out infinite' : 'none',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              color: isPlaying ? accentColor : 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
            }}>
              {isPlaying ? 'جاري التشغيل' : 'متوقف'}
            </span>
          </div>

          {/* Label */}
          <span style={{
            fontFamily: 'var(--font-kufi)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)',
          }}>
            {label}
          </span>
        </div>

        {/* Video element */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
          {!hasError ? (
            <video
              ref={videoRef}
              src={src}
              loop
              playsInline
              muted={isMuted}
              onError={() => setHasError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '0.5rem',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
            }}>
              <span style={{ fontSize: '2rem' }}>🎬</span>
              <span>تعذّر تحميل الفيديو</span>
            </div>
          )}

          {/* Overlay click to play */}
          {!hasError && !isPlaying && (
            <button
              onClick={togglePlay}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.4)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: `${accentColor}cc`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 24px ${accentColor}80`,
                fontSize: '1.4rem',
              }}>
                ▶
              </div>
            </button>
          )}

          {/* Holographic scan line overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${accentColor}05 2px,
              ${accentColor}05 4px
            )`,
            pointerEvents: 'none',
          }} />
        </div>

        {/* Progress bar */}
        <div style={{
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          {/* Play/Pause btn */}
          <button
            onClick={togglePlay}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: accentColor, fontSize: '0.9rem', padding: 0,
              lineHeight: 1,
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Bar */}
          <div style={{
            flex: 1, height: 2,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
              borderRadius: 2,
              transition: 'width 0.5s linear',
              boxShadow: `0 0 6px ${accentColor}`,
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};
