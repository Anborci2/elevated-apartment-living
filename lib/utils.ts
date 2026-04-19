import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names, resolving conflicts via tailwind-merge.
 * Usage: cn('px-4', condition && 'py-2', 'px-6') → 'py-2 px-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
