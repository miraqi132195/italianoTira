import { useInView } from "../hooks/useInView";

const MOTION_CLASS = {
  "fade-up": "motion-fade-up",
  "fade-in": "motion-fade-in",
  "fade-down": "motion-fade-down",
  "scale-in": "motion-scale-in",
  "slide-right": "motion-slide-right",
};

export default function AnimateIn({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration,
  once = true,
  as: Tag = "div",
}) {
  const { ref, inView } = useInView({ once });
  const motionClass = MOTION_CLASS[animation] ?? MOTION_CLASS["fade-up"];

  return (
    <Tag
      ref={ref}
      className={`${inView ? motionClass : "motion-hidden"} ${className}`}
      style={{
        animationDelay: inView ? `${delay}ms` : undefined,
        ...(duration ? { animationDuration: `${duration}ms` } : {}),
      }}
    >
      {children}
    </Tag>
  );
}
