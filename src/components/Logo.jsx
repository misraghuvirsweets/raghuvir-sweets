import { useState } from 'react';

// Logo image: put your file at public/logo.png
// If the file is missing, a gold "R" badge is shown instead.
export default function Logo({ className = 'h-11 w-11' }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <span className={`${className} flex shrink-0 items-center justify-center rounded-full border-2 border-saffron bg-maroon font-serif text-xl font-bold text-amber-300`}>R</span>
    );
  }
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.png`}
      alt="Raghuvir Sweets and Bakers"
      onError={() => setErr(true)}
      className={`${className} shrink-0 rounded-full object-contain`}
    />
  );
}
