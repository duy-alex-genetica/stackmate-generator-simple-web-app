import { clsx } from 'clsx';
import { twMerge, ClassNameValue } from 'tailwind-merge';

export function cn(...classNames: ClassNameValue[]) {
  return twMerge(clsx(classNames));
}
