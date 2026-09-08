export function cn(...inputs: Array<string | undefined | boolean>) {
  // TODO: extend this with clsx and tailwind-merge if you need class merging.
  return inputs.filter(Boolean).join(" ");
}
