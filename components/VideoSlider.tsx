"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ───────────────────────────── Types & Config ───────────────────────────── */

type Lang = "fa" | "en";

interface VideoSliderProps {
  lang: Lang;
}

interface VideoItem {
  id: string;
  src: string;
}

const VIDEOS: readonly VideoItem[] = [
  { id: "v1", src: "/videos/Abu.mp4" },
  { id: "v2", src: "/videos/cancer.mp4" },
  { id: "v3", src: "/videos/L2.mp4" },
  { id: "v4", src: "/videos/L3.mp4" },
  { id: "v5", src: "/videos/P1.mp4" },
  { id: "v6", src: "/videos/P2.mp4" },
  { id: "v7", src: "/videos/P3.mp4" },
  { id: "v8", src: "/videos/project-1.mp4" },
  { id: "v9", src: "/videos/project-2-cv.mp4" },
  { id: "v10", src: "/videos/project-2-dim.mp4" },
  { id: "v11", src: "/videos/project-2-shahyad.mp4" },
  { id: "v12", src: "/videos/project-3.mp4" },
  { id: "v13", src: "/videos/Ram01.mp4" },
  { id: "v14", src: "/videos/Ram02.mp4" },
  { id: "v15", src: "/videos/shariati.mp4" },
  { id: "v16", src: "/videos/St2.mp4" },
  { id: "v17", src: "/videos/xx.mp4" },
];

/** جهت حرکت خودکار: "right" یعنی ویدیوها به سمت راست حرکت می‌کنند */
const MOVE_DIRECTION: "left" | "right" = "right";
/** مدت زمان عبور هر ویدیو (ثانیه)؛ عدد بزرگ‌تر = حرکت آهسته‌تر */
const SECONDS_PER_VIDEO = 6;
/** نسبت کادر ویدیوهای افقی */
const LANDSCAPE_RATIO = 16 / 10;
/** مقدار جابه‌جایی با دکمه‌ها (نسبت به عرض اسلایدر) */
const BUTTON_STEP_RATIO = 0.75;
/** حداقل جابه‌جایی (پیکسل) برای اینکه کلیک، «درگ» حساب شود */
const DRAG_THRESHOLD = 4;

const COPY: Record<
  Lang,
  { left: string; right: string; sound: string; mute: string; enlarge: string; close: string }
> = {
  fa: {
    left: "حرکت به چپ",
    right: "حرکت به راست",
    sound: "پخش با صدا",
    mute: "قطع صدا",
    enlarge: "بزرگ‌نمایی",
    close: "بستن",
  },
  en: {
    left: "Move left",
    right: "Move right",
    sound: "Play with sound",
    mute: "Mute",
    enlarge: "Enlarge",
    close: "Close",
  },
};

/* ───────────────────────────── Helpers ───────────────────────────── */

/** Fisher–Yates */
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const cardButton =
  "rounded-sm border border-white/15 bg-black/65 px-3 py-1.5 text-xs text-paper backdrop-blur-md transition-colors cursor-pointer hover:border-[#F5C542] hover:text-[#F5C542] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C542]";

const navButton =
  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-white/10 bg-ink2 text-paper transition-colors hover:border-[#F5C542] hover:text-[#F5C542] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C542]";

/* ───────────────────────────── Component ───────────────────────────── */

export default function VideoSlider({ lang }: VideoSliderProps) {
  const t = COPY[lang];

  const [videos, setVideos] = useState<readonly VideoItem[]>(VIDEOS);
  const [soundKey, setSoundKey] = useState<string | null>(null);
  const [enlarged, setEnlarged] = useState<VideoItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  /** نسبت واقعی (عرض ÷ ارتفاع) هر ویدیو؛ بعد از خواندن متادیتا پر می‌شود */
  const [ratios, setRatios] = useState<Record<string, number>>({});

  /* DOM */
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const visibleKeys = useRef(new Set<string>());

  /* وضعیت حرکت (در ref نگه داشته می‌شود تا هر فریم رندر مجدد نداشته باشیم) */
  const posRef = useRef(0); // جابه‌جایی فعلی ریل (px)
  const halfRef = useRef(0); // عرض یک نسخه از لیست (px)
  const targetRef = useRef<number | null>(null); // مقصد حرکت نرم دکمه‌ها
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const draggingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const enlargedRef = useRef<VideoItem | null>(null);
  const dragStateRef = useRef<{ startX: number; startPos: number; pointerId: number; active: boolean } | null>(null);

  enlargedRef.current = enlarged;

  /* ترتیب تصادفی فقط سمت کلاینت (جلوگیری از اختلاف هیدریشن) */
  useEffect(() => {
    setVideos(shuffle(VIDEOS));
  }, []);

  /* ───────── ویدیوها: ثبت، نسبت تصویر، پخش/توقف، صدا ───────── */

  const recordRatio = useCallback((id: string, el: HTMLVideoElement) => {
    if (!el.videoWidth || !el.videoHeight) return;
    const ratio = el.videoWidth / el.videoHeight;
    setRatios((prev) => (prev[id] === ratio ? prev : { ...prev, [id]: ratio }));
  }, []);

  const registerVideo = useCallback(
    (key: string, id: string, el: HTMLVideoElement | null) => {
      if (el) {
        videoRefs.current.set(key, el);
        if (el.readyState >= 1) recordRatio(id, el);
      } else {
        videoRefs.current.delete(key);
      }
    },
    [recordRatio]
  );

  /* فقط ویدیوهای قابل‌مشاهده پخش شوند */
  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const video = target as HTMLVideoElement;
          const key = video.dataset.key;
          if (!key) return;

          if (isIntersecting) {
            visibleKeys.current.add(key);
            if (!enlargedRef.current) video.play().catch(() => {});
          } else {
            visibleKeys.current.delete(key);
            video.pause();
          }
        });
      },
      { root, threshold: 0.3 }
    );

    videoRefs.current.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [videos]);

  /* همگام‌سازی صدا: فقط ویدیوی انتخاب‌شده صدا دارد */
  useEffect(() => {
    videoRefs.current.forEach((video, key) => {
      video.muted = key !== soundKey;
    });
  }, [soundKey]);

  /* نمای بزرگ‌شده: توقف ریل، قفل اسکرول صفحه، بستن با Esc */
  useEffect(() => {
    videoRefs.current.forEach((video, key) => {
      if (enlarged) {
        video.pause();
      } else if (visibleKeys.current.has(key)) {
        video.play().catch(() => {});
      }
    });

    if (!enlarged) return;

    setSoundKey(null);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEnlarged(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enlarged]);

  /* ───────── موتور حرکت: خودکار + درگ + چرخ + دکمه‌ها ───────── */

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
    }
  }, []);

  /** موقعیت را در بازه‌ی (−half, 0] نگه می‌دارد تا حلقه بی‌پایان بماند */
  const wrap = useCallback(() => {
    const half = halfRef.current;
    if (!half) return;

    let shift = 0;
    while (posRef.current > 0) {
      posRef.current -= half;
      shift -= half;
    }
    while (posRef.current <= -half) {
      posRef.current += half;
      shift += half;
    }
    if (targetRef.current !== null) targetRef.current += shift;
  }, []);

  /* اندازه‌ی یک نسخه از لیست را زیر نظر داشته باش */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  /* ترجیح «کاهش حرکت» سیستم */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  /* حلقه‌ی انیمیشن */
  useEffect(() => {
    const direction = MOVE_DIRECTION === "right" ? 1 : -1;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const half = halfRef.current;

      if (half > 0) {
        if (targetRef.current !== null) {
          // حرکت نرم به مقصد (دکمه‌ها)
          const diff = targetRef.current - posRef.current;
          if (Math.abs(diff) < 0.5) {
            posRef.current = targetRef.current;
            targetRef.current = null;
          } else {
            posRef.current += diff * Math.min(1, dt * 8);
          }
        } else if (
          !draggingRef.current &&
          !hoverRef.current &&
          !focusRef.current &&
          !enlargedRef.current &&
          !reducedMotionRef.current
        ) {
          // حرکت خودکار
          const speed = half / (VIDEOS.length * SECONDS_PER_VIDEO);
          posRef.current += direction * speed * dt;
        }

        wrap();
        applyTransform();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [wrap, applyTransform]);

  /* چرخ ماوس / تاچ‌پد افقی (برای جلوگیری از «برگشت صفحه»، باید non-passive باشد) */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      targetRef.current = null;
      posRef.current -= e.deltaX;
      wrap();
      applyTransform();
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [wrap, applyTransform]);

  /* درگ با موس یا لمس */
  const endDrag = () => {
    const drag = dragStateRef.current;
    if (!drag) return;

    if (drag.active && viewportRef.current?.hasPointerCapture(drag.pointerId)) {
      viewportRef.current.releasePointerCapture(drag.pointerId);
    }
    dragStateRef.current = null;
    draggingRef.current = false;
    setIsDragging(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return; // دکمه‌ها کلیک عادی دارند

    targetRef.current = null;
    dragStateRef.current = {
      startX: e.clientX,
      startPos: posRef.current,
      pointerId: e.pointerId,
      active: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag) return;

    const dx = e.clientX - drag.startX;

    if (!drag.active) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      drag.active = true;
      draggingRef.current = true;
      setIsDragging(true);
      e.currentTarget.setPointerCapture(drag.pointerId);
    }

    posRef.current = drag.startPos + dx;
    wrap();
    applyTransform();
  };

  /* دکمه‌های چپ و راست: ریل با حرکت نرم جابه‌جا می‌شود */
  const nudge = (direction: 1 | -1) => {
    const width = viewportRef.current?.clientWidth ?? 0;
    const base = targetRef.current ?? posRef.current;
    targetRef.current = base + direction * width * BUTTON_STEP_RATIO;
  };

  /* دو نسخه از لیست برای حلقه‌ی بی‌انتها و بدون پرش */
  const loop = [0, 1].flatMap((copy) =>
    videos.map((video) => ({ ...video, copy, key: `${video.id}-${copy}` }))
  );

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-background py-12">
      {/* دکمه‌های چپ و راست */}
      <div dir="ltr" className="mx-auto mb-6 flex max-w-7xl justify-end gap-3 px-6 md:px-16">
        <button type="button" onClick={() => nudge(1)} className={navButton} aria-label={t.left}>
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" onClick={() => nudge(-1)} className={navButton} aria-label={t.right}>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* dir="ltr" ثابت است تا جهت حرکت در هر دو زبان یکسان بماند */}
      <div
        ref={viewportRef}
        dir="ltr"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        onFocus={() => (focusRef.current = true)}
        onBlur={() => (focusRef.current = false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
        style={{ touchAction: "pan-y" }}
        className={`select-none overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <div ref={trackRef} className="flex w-max items-center will-change-transform">
          {loop.map(({ id, src, key, copy }) => {
            const hasSound = soundKey === key;
            const isDuplicate = copy === 1;
            const ratio = ratios[id];
            const isPortrait = ratio !== undefined && ratio < 1;

            return (
              <article
                key={key}
                aria-hidden={isDuplicate || undefined}
                onMouseLeave={() => hasSound && setSoundKey(null)}
                // همه‌ی کارت‌ها ارتفاع یکسان دارند؛ فقط عرض بر اساس جهت ویدیو فرق می‌کند
                style={{ aspectRatio: isPortrait ? ratio : LANDSCAPE_RATIO }}
                className="group relative mr-6 h-[280px] shrink-0 overflow-hidden rounded-sm border border-white/10 bg-ink2 shadow-2xl md:h-[360px]"
              >
                <video
                  ref={(el) => registerVideo(key, id, el)}
                  onLoadedMetadata={(e) => recordRatio(id, e.currentTarget)}
                  data-key={key}
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  draggable={false}
                  preload="metadata"
                  className="h-full w-full object-cover brightness-95 transition-[filter] duration-500 group-hover:brightness-100"
                />

                {/* دکمه‌ها فقط هنگام هاور یا فوکوس دیده می‌شوند */}
                <div
                  dir={lang === "fa" ? "rtl" : "ltr"}
                  className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  <button
                    type="button"
                    tabIndex={isDuplicate ? -1 : 0}
                    onClick={() => setSoundKey(hasSound ? null : key)}
                    aria-pressed={hasSound}
                    className={cardButton}
                  >
                    {hasSound ? t.mute : t.sound}
                  </button>
                  <button
                    type="button"
                    tabIndex={isDuplicate ? -1 : 0}
                    onClick={() => setEnlarged({ id, src })}
                    className={cardButton}
                  >
                    {t.enlarge}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* نمای بزرگ‌شده: داخل همین صفحه است، پس نشانگر موس همیشه دیده می‌شود */}
      <AnimatePresence>
        {enlarged && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setEnlarged(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              <button
                type="button"
                onClick={() => setEnlarged(null)}
                className={`${cardButton} absolute -top-12 right-0`}
              >
                {t.close}
              </button>

              <video
                src={enlarged.src}
                autoPlay
                loop
                controls
                playsInline
                style={
                  (ratios[enlarged.id] ?? LANDSCAPE_RATIO) < 1
                    ? { aspectRatio: ratios[enlarged.id] }
                    : undefined
                }
                className={`mx-auto max-h-[80vh] cursor-default rounded-sm border border-white/10 bg-black object-contain shadow-2xl ${
                  (ratios[enlarged.id] ?? LANDSCAPE_RATIO) < 1 ? "h-[80vh] w-auto max-w-full" : "w-full"
                }`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}