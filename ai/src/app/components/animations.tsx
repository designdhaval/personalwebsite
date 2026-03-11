import { motion, useInView, useSpring, useMotionValue, useTransform, type Variants } from "motion/react";
import { useRef, useEffect, useState, type ReactNode } from "react";

/* ──────────────────────────────────────────────────────────
   1. FadeUp — Scroll-triggered fade + slide up
   ────────────────────────────────────────────────────────── */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   2. FadeIn — Simple opacity fade on scroll
   ────────────────────────────────────────────────────────── */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. ScaleIn — Scale from slightly smaller on scroll
   ────────────────────────────────────────────────────────── */
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   4. SlideIn — Slide from left or right on scroll
   ────────────────────────────────────────────────────────── */
export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });
  const x = direction === "left" ? -60 : 60;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   5. StaggerContainer + StaggerItem — Grid stagger reveal
   ────────────────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function StaggerContainer({
  children,
  className = "",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   6. CountUp — Animated number counter (like Confluent stats)
   ────────────────────────────────────────────────────────── */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const rounded = useTransform(spring, (v: number) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v: number) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────
   7. TextReveal — Word-by-word reveal animation (hero headlines)
   ────────────────────────────────────────────────────────── */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  element: Element = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  element?: "h1" | "h2" | "h3" | "span" | "p";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   8. LineReveal — Animated line/border that draws across
   ────────────────────────────────────────────────────────── */
export function LineReveal({
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "horizontal",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "horizontal" | "vertical";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scaleX: direction === "horizontal" ? 0 : 1, scaleY: direction === "vertical" ? 0 : 1 }}
      animate={
        isInView
          ? { scaleX: 1, scaleY: 1 }
          : { scaleX: direction === "horizontal" ? 0 : 1, scaleY: direction === "vertical" ? 0 : 1 }
      }
      style={{ transformOrigin: "left" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}

/* ──────────────────────────────────────────────────────────
   9. ParallaxFloat — Subtle floating parallax on scroll
   ────────────────────────────────────────────────────────── */
export function ParallaxFloat({
  children,
  speed = 0.2,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;
        setOffset((center - windowCenter) * speed);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: offset }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   10. PulseGlow — Gentle pulsing glow (for decorative elements)
   ────────────────────────────────────────────────────────── */
export function PulseGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}