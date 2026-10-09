import type React from "react";

export function IconBtn({
  children,
  label,
  ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      title={label}
      aria-label={label}
      {...p}
      className="grid h-8 w-8 place-items-center rounded-md text-base hover:bg-accent disabled:opacity-30"
    >
      {children}
    </button>
  );
}