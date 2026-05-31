export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-4 h-0.5 w-16 flag-accent" />
      <h2 className="font-display mb-3 text-3xl text-italiano-cream sm:text-4xl">{title}</h2>
      {subtitle && <p className="text-sm text-italiano-cream/60">{subtitle}</p>}
    </div>
  );
}
