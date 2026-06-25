import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────
interface Stakeholder {
  name: string;
  role: string;
  interest: string;
  influence: string;
  responsibility: string;
}

interface RiskItem {
  risk: string;
  probability: 'منخفض' | 'متوسط' | 'عالي';
  impact: 'منخفض' | 'متوسط' | 'عالي';
  mitigation: string;
}

interface StoryboardScene {
  id: number;
  visuals: string;
  narrationEn: string;
  narrationAr: string;
}

const TEAM_MEMBERS = [
  { name: 'Ziad Sadawy', role: '👑 قائد الفريق ومدير المشروع (Team PM)', emoji: '👑', image: '/ziad.jpeg', tag: 'PM', responsibility: 'إدارة جميع أنشطة المشروع، توزيع المهام، ومتابعة سير خطة العمل والجدول الزمني.' },
  { name: 'Mostafa Yasseen', role: '🎨 مصمم الرسوم والموشن (Designer & Animator)', emoji: '🎨', image: '/yasseen.jpeg', tag: 'ART', responsibility: 'رسم وتصميم الأصول الرقمية، بيئات المشاهد، وتحريك الموشن جرافيك والمونتاج.' },
  { name: 'Omnia Abdelaziz', role: '📝 كاتب السيناريو والبحث (Scriptwriter & Researcher)', emoji: '📝', image: '/omnia.jpeg', tag: 'WRITER', responsibility: 'جمع أبحاث المناخ، كتابة سيناريو التعليق الصوتي ووصف المشاهد بالتفصيل.' },
  { name: 'Sagdh Wael', role: '🎬 مخطط القصة والستوري بورد (Storyboarder)', emoji: '🎬', image: '/sagdh.jpeg', tag: 'STORY', responsibility: 'رسم وتخطيط تسلسل لوحة القصة المبدئية ومزامنتها البصرية.' },
  { name: 'Asmaa Ibrahim', role: '🔊 مهندس الصوتيات والتعليق (Audio Specialist)', emoji: '🔊', image: '/asmaa.jpeg', tag: 'AUDIO', responsibility: 'تسجيل التعليق الصوتي الاحترافي، تنقية الصوتيات، ومزامنتها مع التحريك.' },
];

const BOYS = [TEAM_MEMBERS[0], TEAM_MEMBERS[1]];
const GIRLS = [TEAM_MEMBERS[2], TEAM_MEMBERS[3], TEAM_MEMBERS[4]];

const STAKEHOLDERS: Stakeholder[] = [
  {
    name: 'Dr. John Joseph',
    role: 'راعي المشروع / المشرف',
    interest: 'التأكد من جودة المشروع وتلبية المتمتطلبات الأكاديمية والمقاييس الفنية العلمية.',
    influence: 'عالي (High)',
    responsibility: 'تقديم التوجيه العلمي والفني والملاحظات البناءة طوال فترة المشروع وتقييم المخرجات النهائية.',
  },
  {
    name: 'Ziad Sadawy',
    role: 'قائد الفريق (PM)',
    interest: 'تنسيق أنشطة المشروع، متابعة التسليمات، إدارة المخاطر، وتنظيم قنوات الاتصال.',
    influence: 'عالي (High)',
    responsibility: 'إدارة وتوزيع المهام، ومتابعة سير الجدول الزمني للمشروع بشكل صارم ودقيق.',
  },
  {
    name: 'فريق العمل',
    role: 'أعضاء الفريق',
    interest: 'تنفيذ المهام الموكلة إليهم وتسليمها في أوقاتها المحددة بجودة فنية وعلمية عالية.',
    influence: 'عالي (High)',
    responsibility: 'جمع البيانات، كتابة السيناريو، رسم الستوري بورد، تصميم الأصول والتحريك والمونتاج الصوتي.',
  },
  {
    name: 'الجمهور المستهدف',
    role: 'المستخدمون النهائيون',
    interest: 'اكتساب الوعي وفهم قضايا التغير المناخي بطريقة مبسطة بصرياً لتسهيل تغيير سلوكياتهم.',
    influence: 'متوسط (Medium)',
    responsibility: 'مشاهدة الفيديو، التفاعل مع المحتوى، وتبني السلوكيات الصديقة للبيئة.',
  },
  {
    name: 'الجامعة / القسم',
    role: 'المؤسسة الأكاديمية',
    interest: 'دعم مخرجات التعلم والتعليم المبتكرة، ونشر الوعي البيئي والمسؤولية المجتمعية.',
    influence: 'متوسط (Medium)',
    responsibility: 'توفير التقييم الأكاديمي والاعتراف بجهود المشروع ونشر المخرج النهائي.',
  },
];

const RISKS: RiskItem[] = [
  {
    risk: 'تأخر إنجاز المهام الموكلة للأعضاء',
    probability: 'متوسط',
    impact: 'عالي',
    mitigation: 'وضع جدول زمني صارم، ومتابعة أسبوعية دقيقة، وتوزيع المهام بمرونة.',
  },
  {
    risk: 'نقص البيانات المناخية الموثوقة وصعوبة الفرز',
    probability: 'منخفض',
    impact: 'عالي',
    mitigation: 'الاعتماد الكامل على المنظمات العلمية الموثوقة مثل (IPCC, NASA, NOAA).',
  },
  {
    risk: 'أعطال البرامج أو المشكلات التقنية المفاجئة',
    probability: 'متوسط',
    impact: 'متوسط',
    mitigation: 'حفظ نسخ احتياطية دورية وسحابية مستمرة، واستخدام برمجيات بديلة عند الضرورة.',
  },
  {
    risk: 'تدني جودة تسجيل الصوت (التعليق الصوتي)',
    probability: 'متوسط',
    impact: 'متوسط',
    mitigation: 'التسجيل في غرف معزولة وهادئة مع استخدام أدوات هندسة وتصفية صوت احترافية.',
  },
  {
    risk: 'عدم تفرغ أو غياب مفاجئ لأحد الأعضاء',
    probability: 'متوسط',
    impact: 'عالي',
    mitigation: 'توزيع المهام بمرونة، وتأهيل الأعضاء للقيام بأدوار مساندة عند الطوارئ.',
  },
  {
    risk: 'ضيق الوقت المحدد للمشروع (5 أسابيع)',
    probability: 'متوسط',
    impact: 'عالي',
    mitigation: 'الالتزام الصارم بالجدول الزمني المخطط وترتيب أولويات المهام الحرجة.',
  },
];

const STORYBOARD_SCENES: StoryboardScene[] = [
  {
    id: 1,
    visuals: 'كوكب الأرض يدور في الفضاء بمظهر مستقر، مع غابات خضراء واسعة ومحيطات زرقاء نظيفة.',
    narrationEn: 'This is our planet... the home we all live in. For millions of years, nature followed its natural balance. Forests grew, oceans were full of life, and the climate was stable.',
    narrationAr: 'ده كوكبنا... البيت اللي عايشين فيه كلنا. على مدار ملايين السنين... الطبيعة كانت ماشي بتوازنها الطبيعي. الغابات بتكبر. والمحيطات مليانة حياة. والجو مستقر.',
  },
  {
    id: 2,
    visuals: 'توسع تدريجي وسريع للمدن والمباني الخرسانية، تشغيل المصانع التي تطلق الدخان الأسود وعوادم السيارات.',
    narrationEn: 'But over time, humans began to develop their lives rapidly. We built bigger cities, ran more factories, made millions of cars, and consumed more energy than ever before. All of this looked like progress... but it came with a price.',
    narrationAr: 'لكن مع مرور الزمن... الإنسان بدأ يطور حياته بسرعة. بنينا مدن أكبر. وشغلنا مصانع أكتر. وصنعنا ملايين العربيات. واستخدمنا طاقة أكتر من أي وقت فات. وكل ده كان شكله تطور... لكن كان ليه تمن.',
  },
  {
    id: 3,
    visuals: 'مؤشر قياس درجات الحرارة يرتفع بسرعة على شاشة مراقبة، ذوبان كتل الجليد، وارتفاع منسوب مياه البحر.',
    narrationEn: 'In recent years, Earth\'s temperature has begun to rise noticeably. Scientists have been recording record numbers year after year. Ice has begun to melt in many places around the world, sea levels are rising, and the weather has become more volatile.',
    narrationAr: 'في السنين الأخيرة... درجة حرارة الأرض بدأت تزيد بشكل واضح. والعلماء بقوا يسجلوا أرقام قياسية سنة ورا سنة. والجليد بدأ يدوب في أماكن كتير حوالين العالم. ومستوى البحار بدأ يرتفع. والطقس بقى متقلب أكتر من أي وقت فات.',
  },
  {
    id: 4,
    visuals: 'صورة قريبة لإنبعاثات المصانع، عوادم الشاحنات، وحرق الوقود الأحفوري، وقطع وحرق الأشجار.',
    narrationEn: 'So, what is the cause? The reason is that harmful gases are accumulating in the atmosphere in large quantities. Gases coming from factories, cars, burning fuel, and deforestation.',
    narrationAr: 'طب إيه السبب؟ السبب إن الغازات الضارة بقت بتتجمع في الغلاف الجوي بكميات كبيرة. غازات طالعة من المصانع. ومن العربيات. ومن حرق الوقود. ومن إزالة الغابات.',
  },
  {
    id: 5,
    visuals: 'أشعة الشمس تدخل الغلاف الجوي للأرض وتتحبس بداخله بفعل تراكم طبقة الغازات الدفيئة الكثيفة.',
    narrationEn: 'See these sun rays? In the past, a large part of their heat returned to space naturally. But now, the heat is trapped around Earth more and more. And this is what we call... global warming.',
    narrationAr: 'شايف أشعة الشمس دي؟ زمان جزء كبير من حرارتها كان بيرجع للفضاء بشكل طبيعي. لكن دلوقتي... الحرارة بقت بتتحبس حوالين الأرض أكتر وأكتر. وده اللي بنسميه... الاحتباس الحراري.',
  },
  {
    id: 6,
    visuals: 'حرائق غابات هائلة، جفاف للأراضي وتشققها، فيضانات تغمر الشوارع والمباني، وحيوانات تفر من موائلها المحترقة.',
    narrationEn: 'Over time, the Earth began to pay the price. We started seeing huge wildfires, droughts hitting entire regions, floods submerging streets and cities, destructive storms, and many animals losing their homes.',
    narrationAr: 'ومع الوقت... الأرض بدأت تدفع التمن. بدأنا نشوف حرائق غابات ضخمة. وجفاف بيضرب مناطق كاملة. وفيضانات بتغرق شوارع ومدن. وعواصف مدمرة بتسبب خسائر كبيرة. وحيوانات كتير فقدت الأماكن اللي كانت عادة عايشة فيها.',
  },
  {
    id: 7,
    visuals: 'لقطة مقربة لشخص ينظر بحزن وتأمل نحو كاميرا مع تداخل مشاهد متسارعة للكوارث البيئية.',
    narrationEn: 'And the problem is that none of this is happening far from us... it is all happening right now, right before our eyes.',
    narrationAr: 'والمشكلة إن كل ده مش بيحصل بعيد عننا... كل ده بيحصل دلوقتي. وقدام عينينا.',
  },
  {
    id: 8,
    visuals: 'مجموعة أفراد يتعاونون لزراعة الأشجار، تركيب الألواح الشمسية، توربينات الرياح، وإعادة تدوير المخلفات.',
    narrationEn: 'Despite everything that has happened, we still have a chance. A chance to change the situation. By using cleaner energy, planting more trees, reducing pollution, and conserving resources.',
    narrationAr: 'ورغم كل اللي حصل... لسه عندنا فرصة. فرصة إننا نغير الوضع. باستخدام طاقة أنضف. وزراعة شجر أكتر. وتقليل التلوث. وترشيد استهلاك الموارد.',
  },
  {
    id: 9,
    visuals: 'كوكب الأرض يبتسم ويعود أخضراً ومستقراً وجميلاً، مع شعار "مستقبل الأرض بين أيدينا".',
    narrationEn: 'Because the truth is simple: we are the cause, and we are also the solution. The future of Earth is in our hands. This is our planet, and we must protect it.',
    narrationAr: 'لأن الحقيقة بسيطة... إحنا السبب. وإحنا كمان الحل. ومستقبل الأرض... بين إيدينا. وده كوكبنا... ولازم نحافظ عليه.',
  },
];

// ─── MAIN LOADER ──────────────────────────────────────────────────────────────
interface LoaderProps {
  onDone: (soundOn: boolean) => void;
}

const Loader: React.FC<LoaderProps> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 15 + 5;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        setTimeout(() => setIsReady(true), 250);
      }
      setProgress(Math.min(val, 100));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleStart = (sound: boolean) => {
    setFadeOut(true);
    setTimeout(() => {
      onDone(sound);
    }, 800);
  };

  return (
    <div className={`loader-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="loader-inner">
        <div className="orbit-container">
          <div className="orbit orbit-1" />
          <div className="orbit orbit-2" />
          <div className="orbit orbit-3" />
          <div className="orbit-dot" />
          <div className="orbit-globe">🌍</div>
        </div>
        
        <div className="loader-text-group">
          <h1 className="loader-title">الأرض في خطر</h1>
          <p className="loader-subtitle">Earth in Danger</p>
        </div>

        {!isReady ? (
          <div className="loader-progress-area">
            <div className="loader-bar-wrap">
              <div className="loader-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="loader-pct">{Math.round(progress)}%</div>
          </div>
        ) : (
          <div className="loader-gate-area">
            <p className="gate-hint">مستعد لبدء العرض التقديمي؟</p>
            <div className="gate-buttons">
              <button className="gate-btn main-btn" onClick={() => handleStart(true)}>
                ابدأ العرض بالصوت 🔊
              </button>
              <button className="gate-btn secondary-btn" onClick={() => handleStart(false)}>
                بدون صوت 🔇
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── VIDEO SCREEN ──────────────────────────────────────────────────────────────
interface VideoIntroProps {
  initialSoundOn: boolean;
  onEnd: () => void;
}

const VideoIntro: React.FC<VideoIntroProps> = ({ initialSoundOn, onEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(!initialSoundOn);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  
  // Initialize orientation synchronously
  const [isPortrait, setIsPortrait] = useState(() => {
    const isMobile = window.innerWidth <= 900;
    const portrait = window.innerHeight > window.innerWidth;
    return isMobile && portrait;
  });

  // Check orientation on resize/orientationchange
  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth <= 900;
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(isMobile && portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Autoplay only on mount or when portrait state changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay blocked. Retrying muted...', err);
          v.muted = true;
          setIsMuted(true);
          v.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        });
    }

    const onEnded = () => {
      setFadeOut(true);
      setTimeout(onEnd, 800);
    };

    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('ended', onEnded);
    };
  }, [isPortrait, onEnd]);

  // Sync mute state separately
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true));
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitEnterFullscreen) {
      (video as any).webkitEnterFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  };

  return (
    <div className={`video-screen${fadeOut ? ' fade-out' : ''}`}>
      {isPortrait ? (
        <div className="rotate-device-overlay animation-fadeIn">
          <div className="rotate-icon-container">
            <span className="rotate-phone-icon">📱</span>
            <span className="rotate-arrow-icon">🔄</span>
          </div>
          <h2 className="rotate-title">يرجى تدوير الهاتف للوضع الأفقي</h2>
          <p className="rotate-desc">
            للاستمتاع بتجربة العرض السينمائي الكاملة وبجودة عالية، يرجى تدوير هاتفك بالعرض.
          </p>
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <video
            ref={videoRef}
            src="/videos/main.mp4"
            playsInline
            className="video-fullscreen"
          />
          
          {/* Floating circular trigger and expandable control panel */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row-reverse',
            gap: '1rem',
            zIndex: 1000,
          }}>
            {/* The main trigger circle button */}
            <button
              onClick={() => setControlsOpen(!controlsOpen)}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: controlsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
              title="خيارات التشغيل"
            >
              {controlsOpen ? (
                // Close / X icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                // Control/Settings sliders icon
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="12" x2="23" y2="12"></line>
                </svg>
              )}
            </button>

            {/* Expanded options panel (slides out to the left) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.6rem 1.5rem',
              borderRadius: '100px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              transform: controlsOpen ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.8)',
              opacity: controlsOpen ? 1 : 0,
              pointerEvents: controlsOpen ? 'auto' : 'none',
              transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center',
                  opacity: 0.85, transition: 'opacity 0.2s'
                }}
                title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center',
                  opacity: 0.85, transition: 'opacity 0.2s'
                }}
                title={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#fff', display: 'flex', alignItems: 'center',
                  opacity: 0.85, transition: 'opacity 0.2s'
                }}
                title="ملء الشاشة"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3" />
                </svg>
              </button>

              {/* Divider */}
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />

              {/* Skip Intro Button */}
              <button
                onClick={() => {
                  setFadeOut(true);
                  setTimeout(onEnd, 800);
                }}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                  fontFamily: 'var(--font-kufi)',
                  fontSize: '0.8rem',
                  padding: '0.35rem 1.1rem',
                  borderRadius: '50px',
                  transition: 'background 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                تخطي ◀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── PRESENTATION APP ──────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<'loading' | 'video' | 'slides'>('loading');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedSceneId, setSelectedSceneId] = useState(1);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Track scroll position to update side indicator
  useEffect(() => {
    if (phase !== 'slides') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSlide = 0;

      for (let i = 0; i < slidesRef.current.length; i++) {
        const slideEl = slidesRef.current[i];
        if (slideEl && scrollPosition >= slideEl.offsetTop) {
          currentSlide = i;
        }
      }
      setActiveSlide(currentSlide);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phase]);

  const scrollToSlide = (idx: number) => {
    const slideEl = slidesRef.current[idx];
    if (slideEl) {
      slideEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoaderDone = (soundOn: boolean) => {
    setSoundEnabled(soundOn);
    setPhase('video');
  };

  const slideTitles = [
    'البداية وعنوان المشروع',
    'فريق العمل والمسؤوليات',
    'خلفية وغرض المشروع',
    'أهداف المشروع الاستراتيجية',
    'نطاق المشروع والمخرجات',
    'الخطة والجدول التفصيلي',
    'الافتراضات والقيود والنجاح',
    'المشكلة البيئية وفجوة الوعي',
    'أصحاب المصلحة والتواصل',
    'هيكل تقسيم العمل WBS',
    'إدارة المخاطر والاستجابة',
    'لوحة القصة والسيناريو',
    'الخاتمة والمسؤولية الجماعية',
  ];

  return (
    <div className="app" dir="rtl">
      {phase === 'loading' && <Loader onDone={handleLoaderDone} />}
      
      {phase === 'video' && (
        <VideoIntro
          initialSoundOn={soundEnabled}
          onEnd={() => setPhase('slides')}
        />
      )}

      {phase === 'slides' && (
        <>
          {/* Top fixed presentation nav */}
          <nav className="top-nav">
            <div className="nav-right">
              <span className="nav-logo">🌍 الأرض في خطر</span>
              <span className="nav-divider">|</span>
              <span className="nav-project-subtitle">كشف الحقيقة وراء تغير المناخ</span>
            </div>
            <div className="nav-left">
              <span className="nav-chapter-indicator">الشريحة {activeSlide + 1} / 13</span>
            </div>
          </nav>

          {/* Left vertical slide dots */}
          <div className="slide-dots-indicator">
            {slideTitles.map((title, idx) => (
              <button
                key={idx}
                className={`dot-indicator-btn${activeSlide === idx ? ' active' : ''}`}
                onClick={() => scrollToSlide(idx)}
                title={title}
              >
                <span className="dot-label">{title}</span>
                <span className="dot-circle" />
              </button>
            ))}
          </div>

          <main className="slides-container">
            
            {/* SLIDE 1: COVER TITLE & CHARTER */}
            <div
              ref={(el) => { slidesRef.current[0] = el; }}
              className="slide slide-1 bg-gradient-landing"
            >
              <div className="slide-blob accent-blue" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-blue">
                  <span className="chapter-dot bg-blue" />
                  ميثاق المشروع | Project Charter
                </div>
                <div className="slide-card border-blue">
                  <span className="slide-icon">🌍</span>
                  <h1 className="slide-title font-highlight">الأرض في خطر</h1>
                  <h2 className="slide-subtitle color-blue-glow">Unveiling the Truth Behind Climate Change</h2>
                  <div className="slide-line bg-blue-line" />
                  
                  <div className="metadata-table">
                    <div className="metadata-row">
                      <span className="meta-label">راعي المشروع (Sponsor)</span>
                      <span className="meta-value font-bold">Dr. John Joseph</span>
                    </div>
                    <div className="metadata-row">
                      <span className="meta-label">مدير المشروع (PM)</span>
                      <span className="meta-value font-bold text-highlight">Ziad Mahmoud Mohammed Sadawy</span>
                    </div>
                    <div className="metadata-row">
                      <span className="meta-label">تاريخ الميثاق (Date)</span>
                      <span className="meta-value">16 يونيو 2026</span>
                    </div>
                  </div>

                  {/* Approvals section inside Charter */}
                  <div className="charter-approvals">
                    <h5 className="approval-title">✍️ الاعتماد والتوقيع (Approvals)</h5>
                    <div className="approvals-flex">
                      <div className="approval-box">
                        <p className="app-role">راعي المشروع (Sponsor)</p>
                        <p className="app-name">Dr. John Joseph</p>
                        <div className="app-signature">Dr. John Joseph</div>
                      </div>
                      <div className="approval-box">
                        <p className="app-role">مدير المشروع (PM)</p>
                        <p className="app-name">Ziad M. Sadawy</p>
                        <div className="app-signature pm-sig">Ziad Sadawy</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-blue" />
                </div>
              </div>
            </div>

            {/* SLIDE 2: TEAM MEMBERS */}
            <div
              ref={(el) => { slidesRef.current[1] = el; }}
              className="slide slide-2 bg-gradient-team"
            >
              <div className="slide-blob accent-teal" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-teal">
                  <span className="chapter-dot bg-teal" />
                  أعضاء فريق عمل المشروع | Project Team
                </div>
                <div className="slide-card border-teal">
                  <h2 className="slide-title">فريق العمل والمسؤوليات</h2>
                  <p className="slide-desc">مجموعة عمل متكاملة تسعى لتبسيط العلوم المناخية وسردها بصرياً وصوتياً باحترافية.</p>
                  <div className="slide-line bg-teal-line" />
                  
                  <div className="team-pyramid-uniform">
                    {/* الصف العلوي (ولدين) */}
                    <div className="team-row">
                      {BOYS.map((m, idx) => (
                        <div
                          key={`boy-${idx}`}
                          className={`team-member-card${m.image ? ' image-card' : ''}`}
                          style={m.image ? { backgroundImage: `url(${m.image})` } : {}}
                        >
                          {m.image ? (
                            <div className="image-card-content">
                              <div className="image-card-bottom">
                                <div className="member-header">
                                  {m.tag && <span className="leader-tag">{m.tag}</span>}
                                  <h4 className="member-name">{m.name}</h4>
                                </div>
                                <p className="member-role">{m.role}</p>
                                <div className="member-resp-divider"></div>
                                <p className="member-resp-desc"><strong>المسؤولية:</strong> {m.responsibility}</p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="member-header">
                                <span className="member-emoji">{m.emoji}</span>
                                <h4 className="member-name">{m.name}</h4>
                              </div>
                              <p className="member-role">{m.role}</p>
                              <div className="member-resp-divider"></div>
                              <p className="member-resp-desc"><strong>المسؤولية:</strong> {m.responsibility}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* الصف السفلي (ثلاث بنات) */}
                    <div className="team-row">
                      {GIRLS.map((m, idx) => (
                        <div
                          key={`girl-${idx}`}
                          className={`team-member-card${m.image ? ' image-card' : ''}`}
                          style={m.image ? { backgroundImage: `url(${m.image})` } : {}}
                        >
                          {m.image ? (
                            <div className="image-card-content">
                              <div className="image-card-bottom">
                                <div className="member-header">
                                  {m.tag && <span className="leader-tag">{m.tag}</span>}
                                  <h4 className="member-name">{m.name}</h4>
                                </div>
                                <p className="member-role">{m.role}</p>
                                <div className="member-resp-divider"></div>
                                <p className="member-resp-desc"><strong>المسؤولية:</strong> {m.responsibility}</p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="member-header">
                                <span className="member-emoji">{m.emoji}</span>
                                <h4 className="member-name">{m.name}</h4>
                              </div>
                              <p className="member-role">{m.role}</p>
                              <div className="member-resp-divider"></div>
                              <p className="member-resp-desc"><strong>المسؤولية:</strong> {m.responsibility}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-teal" />
                </div>
              </div>
            </div>

            {/* SLIDE 3: BACKGROUND & PURPOSE */}
            <div
              ref={(el) => { slidesRef.current[2] = el; }}
              className="slide slide-3 bg-gradient-purpose"
            >
              <div className="slide-blob accent-yellow" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-yellow">
                  <span className="chapter-dot bg-yellow" />
                  الخلفية والغرض من المشروع | Background & Purpose
                </div>
                <div className="slide-card border-yellow">
                  <h2 className="slide-title">خلفية المشروع وغرضه الأساسي</h2>
                  <div className="slide-line bg-yellow-line" />
                  
                  <div className="two-columns-layout">
                    <div className="content-col bg-panel">
                      <h3 className="col-header color-yellow">📖 خلفية المشروع (Project Background)</h3>
                      <p className="col-text">
                        يعتبر التغير المناخي أحد أهم التحديات البيئية التي تواجه العالم اليوم. لقد أدت الأنشطة البشرية مثل حرق الوقود الأحفوري، وإزالة الغابات، والانبعاثات الصناعية إلى زيادة تركيزات غازات الاحتباس الحراري في الغلاف الجوي.
                      </p>
                      <p className="col-text">
                        هذا التراكم للغازات أدى بدوره إلى ظاهرة الاحتباس الحراري وتدهور البيئة وتغير أنماط الطقس عالمياً. يدرك العديد من الناس وجود التغير المناخي ولكنهم قد لا يفهمون أسبابه وعواقبه بشكل كامل وعلمي.
                      </p>
                    </div>
                    <div className="content-col bg-panel">
                      <h3 className="col-header color-yellow">🎯 الغرض من المشروع (Project Purpose)</h3>
                      <p className="col-text">
                        الهدف الأساسي من هذا المشروع هو <strong>تثقيف ورفع مستوى الوعي العام</strong> حول ظاهرة التغير المناخي، وأسبابها، وتأثيراتها، والحلول الممكنة لها.
                      </p>
                      <p className="col-text">
                        يتم تحقيق هذا الهدف من خلال إنتاج فيديو توعوي قصير ذو جودة عالية يعتمد على الرسوم المتحركة (Motion Graphics) ليكون جذاباً وسهل الفهم لعامة الناس غير المتخصصين.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-yellow" />
                </div>
              </div>
            </div>

            {/* SLIDE 4: PROJECT OBJECTIVES */}
            <div
              ref={(el) => { slidesRef.current[3] = el; }}
              className="slide slide-4 bg-gradient-objectives"
            >
              <div className="slide-blob accent-purple" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-purple">
                  <span className="chapter-dot bg-purple" />
                  أهداف المشروع | Project Objectives
                </div>
                <div className="slide-card border-purple">
                  <h2 className="slide-title">أهداف المشروع الاستراتيجية والتفصيلية</h2>
                  <div className="slide-line bg-purple-line" />

                  <div className="objectives-grid">
                    <div className="objective-card">
                      <span className="obj-icon">🧩</span>
                      <h4>التبسيط العلمي</h4>
                      <p>شرح مفهوم التغير المناخي العلمي بطريقة بسيطة ومفهومة للجميع لتجنب التعقيد.</p>
                    </div>
                    <div className="objective-card">
                      <span className="obj-icon">🛢️</span>
                      <h4>تحديد المسببات البشرية</h4>
                      <p>تسليط الضوء على الأنشطة البشرية الأساسية المساهمة في الاحتباس الحراري وحرق الوقود.</p>
                    </div>
                    <div className="objective-card">
                      <span className="obj-icon">📈</span>
                      <h4>رفع مستوى الوعي</h4>
                      <p>زيادة الوعي البيئي والمسؤولية المجتمعية والمسؤولية الفردية لدى الجمهور المستهدف.</p>
                    </div>
                    <div className="objective-card">
                      <span className="obj-icon">📖</span>
                      <h4>سرد القصص بصرياً</h4>
                      <p>توظيف أسلوب السرد القصصي البصري والرسوم المتحركة لعرض البيانات بصورة مشوقة.</p>
                    </div>
                    <div className="objective-card">
                      <span className="obj-icon">🎬</span>
                      <h4>الإنتاج الفني الاحترافي</h4>
                      <p>إنتاج فيديو توعوي قصير ذو جودة فنية وعلمية وإخراج إعلامي متميز.</p>
                    </div>
                    <div className="objective-card">
                      <span className="obj-icon">🌱</span>
                      <h4>تحفيز السلوك البيئي</h4>
                      <p>تشجيع الأفراد والمجتمعات على تبني سلوكيات صديقة للبيئة تساهم في تقليل الاحتباس.</p>
                    </div>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-purple" />
                </div>
              </div>
            </div>

            {/* SLIDE 5: SCOPE LIMITS & DELIVERABLES */}
            <div
              ref={(el) => { slidesRef.current[4] = el; }}
              className="slide slide-5 bg-gradient-scope"
            >
              <div className="slide-blob accent-red" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-red">
                  <span className="chapter-dot bg-red" />
                  حدود نطاق المشروع والمخرجات | Scope & Deliverables
                </div>
                <div className="slide-card border-red">
                  <h2 className="slide-title">نطاق المشروع ومخرجاته الأساسية</h2>
                  <div className="slide-line bg-red-line" />
                  
                  <div className="scope-split">
                    <div className="scope-box in-scope">
                      <h3 className="scope-header">✅ داخل النطاق (In Scope)</h3>
                      <ul className="scope-list">
                        <li>جمع البيانات والأبحاث المتعلقة بالتغير المناخي من مصادرها.</li>
                        <li>كتابة السيناريو والحوار والتعليق الصوتي ووصف المشاهد.</li>
                        <li>رسم وتخطيط الستوري بورد وتحديد الكوادر والزوايا البصرية.</li>
                        <li>تصميم الرسوم وعناصر الخلفيات والبيئات وتحريكها.</li>
                        <li>تسجيل التعليق الصوتي والتحرير والتنقية الصوتية.</li>
                        <li>المونتاج النهائي للعمل وعمليات الرندرة والمزامنة.</li>
                        <li>رفع ملفات المشروع والتوثيق البرمجي على مستودع GitHub.</li>
                      </ul>
                    </div>
                    
                    <div className="scope-box out-scope">
                      <h3 className="scope-header">❌ خارج النطاق (Out of Scope)</h3>
                      <ul className="scope-list">
                        <li>إجراء أبحاث علمية مناخية أصلية أو تجارب معملية جديدة.</li>
                        <li>صياغة أو تطوير سياسات بيئية وتشريعات قانونية حكومية.</li>
                        <li>إنتاج فيلم وثائقي سينمائي طويل أو سلسلة حلقات معقدة.</li>
                        <li>إنتاج نسخ متعددة اللغات للفيديو (دبلجة أو ترجمة للغات أخرى).</li>
                      </ul>
                    </div>
                  </div>

                  {/* Deliverables section */}
                  <div className="deliverables-container">
                    <h3 className="deliverables-title">📦 المخرجات الأساسية للمشروع (Deliverables)</h3>
                    <div className="deliverables-grid">
                      <div className="deliv-card"><span>1</span> الملخص البحثي المعتمد</div>
                      <div className="deliv-card"><span>2</span> السيناريو المكتوب للنص</div>
                      <div className="deliv-card"><span>3</span> لوحة القصة Storyboard</div>
                      <div className="deliv-card"><span>4</span> أصول الرسوم المتحركة</div>
                      <div className="deliv-card"><span>5</span> ملف التعليق الصوتي</div>
                      <div className="deliv-card"><span>6</span> الفيديو النهائي بجودة عالية</div>
                      <div className="deliv-card"><span>7</span> التوثيق ورفع الملفات على GitHub</div>
                    </div>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-red" />
                </div>
              </div>
            </div>

            {/* SLIDE 6: TIMELINE & DETAILED SCHEDULE */}
            <div
              ref={(el) => { slidesRef.current[5] = el; }}
              className="slide slide-6 bg-gradient-timeline"
            >
              <div className="slide-blob accent-cyan" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-cyan">
                  <span className="chapter-dot bg-cyan" />
                  خطة العمل والجدول التفصيلي | Schedule & Timeline
                </div>
                <div className="slide-card border-cyan">
                  <h2 className="slide-title">خطة العمل والجدول الزمني التفصيلي</h2>
                  <div className="slide-line bg-cyan-line" />
                  
                  {/* General Timeline Gantt */}
                  <div className="timeline-horizontal">
                    <div className="timeline-step">
                      <div className="step-num bg-cyan">1</div>
                      <h4 className="step-title">جمع البيانات</h4>
                      <p className="step-desc">الأسبوع 1: جمع البيانات وتصفية الأرقام والفرز البحثي.</p>
                    </div>
                    <div className="timeline-step">
                      <div className="step-num bg-cyan">2</div>
                      <h4 className="step-title">السيناريو</h4>
                      <p className="step-desc">الأسبوع 2: كتابة سيناريو التعليق ورسم الستوري بورد.</p>
                    </div>
                    <div className="timeline-step">
                      <div className="step-num bg-cyan">3</div>
                      <h4 className="step-title">الأصول</h4>
                      <p className="step-desc">الأسبوع 3: رسم الشخصيات وتصميم البيئات والأيقونات.</p>
                    </div>
                    <div className="timeline-step">
                      <div className="step-num bg-cyan">4</div>
                      <h4 className="step-title">التحريك</h4>
                      <p className="step-desc">الأسبوع 4: التحريك الفعلي وتسجيل التعليق الصوتي.</p>
                    </div>
                    <div className="timeline-step">
                      <div className="step-num bg-cyan">5</div>
                      <h4 className="step-title">المونتاج</h4>
                      <p className="step-desc">الأسبوع 5: المونتاج والمراجعة والرفع على GitHub.</p>
                    </div>
                  </div>

                  {/* Detailed Schedule Table */}
                  <h3 className="schedule-table-title">🗓️ جدول توزيع المهام التفصيلي حسب الأسابيع</h3>
                  <div className="table-container">
                    <table className="presentation-table schedule-table">
                      <thead>
                        <tr>
                          <th>المهمة التفصيلية</th>
                          <th>الأسبوع 1</th>
                          <th>الأسبوع 2</th>
                          <th>الأسبوع 3</th>
                          <th>الأسبوع 4</th>
                          <th>الأسبوع 5</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>البحث وجمع البيانات البيئية وتصفيتها</td>
                          <td className="center-cell"><span className="active-week-dot bg-cyan" /></td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>كتابة السيناريو وتصميم لوحة القصة (Storyboard)</td>
                          <td>-</td>
                          <td className="center-cell"><span className="active-week-dot bg-cyan" /></td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>تحضير الأصول والرسومات والتصميم البصري</td>
                          <td>-</td>
                          <td>-</td>
                          <td className="center-cell"><span className="active-week-dot bg-cyan" /></td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>تحريك المشاهد وتسجيل الهندسة الصوتية والتعليق</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td className="center-cell"><span className="active-week-dot bg-cyan" /></td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>المونتاج النهائي، تصفية وضبط الجودة والنشر والرفع لـ GitHub</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td className="center-cell"><span className="active-week-dot bg-cyan" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-cyan" />
                </div>
              </div>
            </div>

            {/* SLIDE 7: ASSUMPTIONS, CONSTRAINTS & SUCCESS CRITERIA */}
            <div
              ref={(el) => { slidesRef.current[6] = el; }}
              className="slide slide-7 bg-gradient-assumptions"
            >
              <div className="slide-blob accent-orange" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-orange">
                  <span className="chapter-dot bg-orange" />
                  الافتراضات والقيود ومعايير النجاح | Framework
                </div>
                <div className="slide-card border-orange">
                  <h2 className="slide-title">الافتراضات والقيود ومعايير نجاح المشروع</h2>
                  <div className="slide-line bg-orange-line" />
                  
                  <div className="assumptions-grid">
                    <div className="ass-card border-yellow-glow">
                      <h4>📌 الافتراضات (Assumptions)</h4>
                      <ul className="details-list">
                        <li>التزام جميع أعضاء الفريق بإنهاء المهام الموكلة إليهم بالوقت المحدد.</li>
                        <li>توفر البرامج والأجهزة التقنية المطلوبة لإتمام عمليات التحريك والرندرة.</li>
                        <li>سهولة الوصول إلى مصادر بيانات مناخية بيئية موثوقة وعلمية.</li>
                      </ul>
                    </div>

                    <div className="ass-card border-red-glow">
                      <h4>⚠️ القيود (Constraints)</h4>
                      <ul className="details-list">
                        <li><strong>الوقت:</strong> مدة المشروع محددة بـ 5 أسابيع فقط ولا يمكن التمديد.</li>
                        <li><strong>البشرية:</strong> مدى تفرغ أعضاء الفريق وتنسيق مواعيدهم واجتماعاتهم.</li>
                        <li><strong>التقنية:</strong> الإمكانيات التقنية والمعالجة لأجهزة الرندرة والبرامج المتاحة.</li>
                      </ul>
                    </div>

                    <div className="ass-card border-green-glow">
                      <h4>🏆 معايير النجاح (Success Criteria)</h4>
                      <ul className="details-list">
                        <li><strong>الالتزام بالوقت:</strong> إنهاء المشروع وتسليمه بالكامل في الوقت المحدد بالخطة.</li>
                        <li><strong>الإنتاج الفني:</strong> إخراج فيديو رسوم متحركة بمستوى احترافي منافس.</li>
                        <li><strong>الدقة العلمية:</strong> دقة وصحة المعلومات والأرقام المعروضة بالفيديو.</li>
                        <li><strong>التقييم الإيجابي:</strong> الحصول على تقييمات إيجابية من المشرف والجمهور.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-orange" />
                </div>
              </div>
            </div>

            {/* SLIDE 8: PROBLEM STATEMENT */}
            <div
              ref={(el) => { slidesRef.current[7] = el; }}
              className="slide slide-8 bg-gradient-problem"
            >
              <div className="slide-blob accent-red" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-red">
                  <span className="chapter-dot bg-red" />
                  المشكلة والتحديات | Problem Statement
                </div>
                <div className="slide-card border-red">
                  <h2 className="slide-title">بيان المشكلة وفجوة الوعي والمعرفة</h2>
                  <div className="slide-line bg-red-line" />
                  
                  <div className="problem-panels">
                    <div className="problem-panel p-challenge">
                      <span className="panel-badge bg-red">التحدي البيئي المتزايد (The Challenge)</span>
                      <p>
                        التغير المناخي يهدد التوازن البيئي العالمي. الأنشطة البشرية مثل حرق الوقود الأحفوري، إزالة الغابات، والانبعاثات الصناعية أدت إلى زيادة انبعاثات غازات الاحتباس الحراري بشكل كبير، مما يهدد استقرار الكوكب.
                      </p>
                      <ul className="problem-points">
                        <li>🛢️ حرق الوقود الأحفوري الكثيف</li>
                        <li>🪓 إزالة الغابات وتدمير المساحات الخضراء</li>
                        <li>🏭 الانبعاثات الصناعية غير المقيدة</li>
                      </ul>
                    </div>
                    
                    <div className="problem-panel p-gap">
                      <span className="panel-badge bg-red">فجوة الوعي والمعرفة (Knowledge Gap)</span>
                      <p>
                        على الرغم من خطورة الوضع، يفتقر الكثير من الناس إلى فهم واضح لأسبابه وعواقبه الحقيقية. ويرجع ذلك أساساً إلى:
                      </p>
                      <ul className="problem-points">
                        <li><strong>التعقيد العلمي:</strong> تُعرض المعلومات بطريقة علمية جافة ومعقدة.</li>
                        <li><strong>صعوبة الاستيعاب:</strong> يصعب على عامة الناس استيعاب المصطلحات الجافة والإحصائيات المجردة دون تمثيل بصري.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="solution-banner">
                    <span className="sol-badge">💡 الحل المقترح للمشروع (Our Proposed Solution)</span>
                    <p>
                      تطوير فيديو رسوم متحركة (Motion Graphics) تفاعلي وسهل الفهم يبسط القضايا البيئية بلغة بصرية واضحة ومقنعة، ويحفز السلوك المسؤول لحماية الأرض.
                    </p>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-red" />
                </div>
              </div>
            </div>

            {/* SLIDE 9: STAKEHOLDER ANALYSIS & ROLES */}
            <div
              ref={(el) => { slidesRef.current[8] = el; }}
              className="slide slide-9 bg-gradient-stakeholders"
            >
              <div className="slide-blob accent-green" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-green">
                  <span className="chapter-dot bg-green" />
                  تحليل أصحاب المصلحة والتواصل | Stakeholders
                </div>
                <div className="slide-card border-green">
                  <h2 className="slide-title">تحليل أصحاب المصلحة وخطة التواصل</h2>
                  <div className="slide-line bg-green-line" />
                  
                  <div className="table-container">
                    <table className="presentation-table">
                      <thead>
                        <tr>
                          <th>الطرف (Stakeholder)</th>
                          <th>الدور في المشروع</th>
                          <th>التأثير والاهتمام</th>
                          <th>خطة التواصل والتكرار</th>
                        </tr>
                      </thead>
                      <tbody>
                        {STAKEHOLDERS.map((s, idx) => (
                          <tr key={idx}>
                            <td className="font-bold">{s.name}</td>
                            <td><span className="table-role-tag">{s.role}</span></td>
                            <td className="color-green-text">{s.influence}</td>
                            <td>
                              {s.name === 'Dr. John Joseph' && 'الاجتماعات الدورية والبريد الإلكتروني ومراجعة المخرجات (أسبوعياً)'}
                              {s.name === 'Ziad Sadawy' && 'الاجتماعات المباشرة ووسائل التواصل الرقمي وقنوات التنسيق (يومياً)'}
                              {s.name === 'فريق العمل' && 'WhatsApp، الاجتماعات الفنية، ومنصات العمل السحابية المشتركة (يومياً)'}
                              {s.name === 'الجمهور المستهدف' && 'عرض المخرج النهائي ونشر الفيديو التوعوي عبر المنصات (عند الاكتمال)'}
                              {s.name === 'الجامعة / القسم' && 'تقديم التقارير الدورية والتوثيق البرمجي النهائي (عند التسليم)'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Stakeholders responsibilities list */}
                  <div className="stakeholder-detail-section">
                    <h4 className="section-subtitle">📋 تفاصيل المسؤوليات والالتزامات:</h4>
                    <ul className="details-list stakeholder-detail-list">
                      <li><strong>Dr. John Joseph (المشرف):</strong> التوجيه العلمي والتحقق من جودة ومصداقية المادة العلمية ومراجعتها أكاديمياً.</li>
                      <li><strong>Ziad Sadawy (PM):</strong> تنسيق الجدول الزمني، إدارة المخاطر، متابعة التسليمات، وربط الأعضاء لضمان سلاسة العمل.</li>
                      <li><strong>فريق العمل:</strong> تحويل الأبحاث لسيناريو، تصميم الأصول والتحريك، تسجيل التعليق الصوتي، والمونتاج النهائي للفيلم.</li>
                    </ul>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-green" />
                </div>
              </div>
            </div>

            {/* SLIDE 10: WBS BREAKDOWN */}
            <div
              ref={(el) => { slidesRef.current[9] = el; }}
              className="slide slide-10 bg-gradient-wbs"
            >
              <div className="slide-blob accent-blue" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-blue">
                  <span className="chapter-dot bg-blue" />
                  هيكل تقسيم العمل | WBS
                </div>
                <div className="slide-card border-blue">
                  <h2 className="slide-title">هيكل تقسيم العمل التفصيلي (WBS)</h2>
                  <p className="slide-desc">الهيكل الهرمي لتصنيف مهام المشروع لضمان شمولية التنفيذ:</p>
                  <div className="slide-line bg-blue-line" />

                  <div className="wbs-flex-container">
                    <div className="wbs-branch border-orange-glow">
                      <h4>1. إدارة المشروع (PM)</h4>
                      <p><strong>1.1 التخطيط:</strong> وضع الأهداف وتوزيع الأدوار والجدول الزمني.</p>
                      <p><strong>1.2 المتابعة:</strong> مراقبة سير العمل وحل المعوقات وضبط الجودة.</p>
                    </div>
                    <div className="wbs-branch border-teal-glow">
                      <h4>2. البحث وجمع البيانات</h4>
                      <p><strong>2.1 أبحاث المناخ:</strong> جمع البيانات والأرقام من المصادر المعتمدة.</p>
                      <p><strong>2.2 التحليل والفرز:</strong> تحديد الرسائل الأساسية التي يركز عليها الفيديو.</p>
                    </div>
                    <div className="wbs-branch border-yellow-glow">
                      <h4>3. السيناريو والستوري بورد</h4>
                      <p><strong>3.1 كتابة السيناريو:</strong> مسودة الحوار والوصف البصري ومراجعتها.</p>
                      <p><strong>3.2 الستوري بورد:</strong> التخطيط البصري لكل مشهد وحركة الكاميرا.</p>
                    </div>
                    <div className="wbs-branch border-purple-glow">
                      <h4>4. إنتاج الموشن جرافيك</h4>
                      <p><strong>4.1 بناء الأصول:</strong> رسم وتجهيز الشخصيات والخلفيات والبيئات.</p>
                      <p><strong>4.2 التحريك:</strong> تحريك الرسوم وإضافة المؤثرات الانتقالية البصرية.</p>
                    </div>
                    <div className="wbs-branch border-red-glow">
                      <h4>5. الإنتاج الصوتي</h4>
                      <p><strong>5.1 تسجيل التعليق:</strong> إلقاء النص الصوتي بجودة ومعدات مناسبة.</p>
                      <p><strong>5.2 هندسة الصوت:</strong> معالجة الضوضاء ومزامنة التوقيت مع التحريك.</p>
                    </div>
                    <div className="wbs-branch border-cyan-glow">
                      <h4>6. المونتاج والنشر</h4>
                      <p><strong>6.1 دمج المونتاج:</strong> تركيب الرسوم مع التعليق وتصحيح الألوان.</p>
                      <p><strong>6.2 ضبط الجودة:</strong> تصدير الفيديو النهائي ورفع الكود لـ GitHub.</p>
                    </div>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-blue" />
                </div>
              </div>
            </div>

            {/* SLIDE 11: RISK MANAGEMENT */}
            <div
              ref={(el) => { slidesRef.current[10] = el; }}
              className="slide slide-11 bg-gradient-risks"
            >
              <div className="slide-blob accent-yellow" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-yellow">
                  <span className="chapter-dot bg-yellow" />
                  إدارة المخاطر والاستجابة | Risk Management
                </div>
                <div className="slide-card border-yellow">
                  <h2 className="slide-title">خطة إدارة المخاطر وتجنب العقبات</h2>
                  <div className="slide-line bg-yellow-line" />

                  <div className="table-container">
                    <table className="presentation-table">
                      <thead>
                        <tr>
                          <th>المخاطر المحتملة (Risk)</th>
                          <th>الاحتمالية</th>
                          <th>الأثر</th>
                          <th>استراتيجية الحد والتخفيف (Mitigation)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RISKS.map((r, idx) => (
                          <tr key={idx}>
                            <td className="font-bold">{r.risk}</td>
                            <td>
                              <span className={`risk-tag p-${r.probability === 'عالي' ? 'high' : r.probability === 'متوسط' ? 'med' : 'low'}`}>
                                {r.probability}
                              </span>
                            </td>
                            <td>
                              <span className={`risk-tag i-${r.impact === 'عالي' ? 'high' : r.impact === 'متوسط' ? 'med' : 'low'}`}>
                                {r.impact}
                              </span>
                            </td>
                            <td>{r.mitigation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Detailed response and monitoring plan */}
                  <div className="risk-plans-box">
                    <div className="r-plan-col">
                      <h5>🛡️ خطة الاستجابة للمخاطر (Risk Response Plan)</h5>
                      <p>
                        <strong>المتابعة الدورية:</strong> تقييم ومراجعة تقدم أنشطة ومخرجات المشروع أسبوعياً. 
                        <strong> التواصل الفعال:</strong> الحفاظ على قنوات اتصال نشطة يومياً لتلافي غياب الأعضاء.
                        <strong> النسخ الاحتياطي:</strong> عمل نسخ احتياطية للملفات والتصاميم دورياً لتجنب فقدان البيانات.
                      </p>
                    </div>
                    <div className="r-plan-col">
                      <h5>🔍 مراقبة المخاطر ومتابعتها (Risk Monitoring)</h5>
                      <p>
                        يقوم مدير المشروع بالتعاون مع فريق العمل بمراقبة وتتبع المخاطر باستمرار طوال دورة حياة المشروع (5 أسابيع)، واتخاذ القرارات التصحيحية الفورية لمعالجة أي خلل طارئ لضمان الجودة والتسليم في الموعد المحدد.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-yellow" />
                </div>
              </div>
            </div>

            {/* SLIDE 12: STORYBOARD & SCRIPT SLIDER */}
            <div
              ref={(el) => { slidesRef.current[11] = el; }}
              className="slide slide-12 bg-gradient-storyboard"
            >
              <div className="slide-blob accent-purple" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-purple">
                  <span className="chapter-dot bg-purple" />
                  لوحة القصة والسيناريو | Storyboard & Script
                </div>
                <div className="slide-card border-purple">
                  <h2 className="slide-title">لوحة القصة التفصيلية والتعليق الصوتي</h2>
                  <p className="slide-desc">اضغط على أرقام المشاهد أدناه لمشاهدة سيناريو التعليق الصوتي ووصف الحركة المقابل له:</p>
                  <div className="slide-line bg-purple-line" />

                  <div className="storyboard-interactive">
                    <div className="storyboard-tabs">
                      {STORYBOARD_SCENES.map((scene) => (
                        <button
                          key={scene.id}
                          className={`story-tab-btn${selectedSceneId === scene.id ? ' active' : ''}`}
                          onClick={() => setSelectedSceneId(scene.id)}
                        >
                          مشهد {scene.id}
                        </button>
                      ))}
                    </div>

                    {STORYBOARD_SCENES.filter(s => s.id === selectedSceneId).map((scene) => (
                      <div key={scene.id} className="storyboard-detail-card animation-fadeIn">
                        <div className="storyboard-visual-panel">
                          <h5>🎬 التصور البصري على الشاشة (Visuals):</h5>
                          <p>{scene.visuals}</p>
                        </div>
                        <div className="storyboard-audio-panels">
                          <div className="audio-lang-panel">
                            <h6>🔊 التعليق الصوتي (العربية):</h6>
                            <p className="voice-text-ar">{scene.narrationAr}</p>
                          </div>
                          <div className="audio-lang-panel">
                            <h6>🎙️ Narration (English):</h6>
                            <p className="voice-text-en">"{scene.narrationEn}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="scroll-hint">
                  <span className="scroll-hint-dot bg-purple" />
                </div>
              </div>
            </div>

            {/* SLIDE 13: CONCLUSION */}
            <div
              ref={(el) => { slidesRef.current[12] = el; }}
              className="slide slide-13 bg-gradient-conclusion"
            >
              <div className="slide-blob accent-green" />
              <div className="slide-grid" />
              <div className="slide-content">
                <div className="chapter-badge color-green">
                  <span className="chapter-dot bg-green" />
                  الخاتمة والمسؤولية الجماعية | Conclusion
                </div>
                <div className="slide-card border-green">
                  <h2 className="slide-title">الخاتمة والمسؤولية الجماعية لحماية الكوكب</h2>
                  <div className="slide-line bg-green-line" />

                  <div className="conclusion-grid">
                    <div className="conclusion-item">
                      <h5>👤 دور الأفراد</h5>
                      <p>ترشيد استهلاك الطاقة والمياه، زراعة الأشجار المنزلية، الحد من استخدام البلاستيك، واستخدام وسائل النقل الصديقة للبيئة.</p>
                    </div>
                    <div className="conclusion-item">
                      <h5>👥 دور المجتمعات</h5>
                      <p>نشر التوعية البيئية المحلية، دعم مبادرات إعادة التدوير، والتعاون لحماية البيئات المحلية والتشجير.</p>
                    </div>
                    <div className="conclusion-item">
                      <h5>🏢 دور الحكومات</h5>
                      <p>وضع سياسات بيئية وتشريعات صارمة للانبعاثات، تمويل مشاريع الطاقة النظيفة كالرياح والشمس والحد من إزالة الغابات.</p>
                    </div>
                  </div>

                  <blockquote className="quote-box">
                    "إن كل إجراء صغير نقوم به اليوم يمكن أن يسهم بفعالية في بناء مستقبل أكثر استدامة لكوكب الأرض." 🌍💚
                  </blockquote>

                  <div className="presentation-ctas">
                    <button
                      className="pres-cta-btn restart-btn"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      🔄 أعد عرض الشرائح من البداية
                    </button>
                    <button
                      className="pres-cta-btn video-replay-btn"
                      onClick={() => {
                        setPhase('video');
                      }}
                    >
                      🎬 إعادة تشغيل الفيديو التعريفي الكامل
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </main>
        </>
      )}
    </div>
  );
}
