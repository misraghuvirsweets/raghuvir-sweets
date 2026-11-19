export default function SectionHeading({ eyebrow, title, subtitle, light }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${light ? 'text-amber-300' : 'text-saffron-dark'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`section-title mt-2 ${light ? '!text-white' : ''}`}>{title}</h2>
      <div className="ornament">✦</div>
      {subtitle && <p className={`mt-3 ${light ? 'text-amber-100/80' : 'text-stone-600'}`}>{subtitle}</p>}
    </div>
  );
}
