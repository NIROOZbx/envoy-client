import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string, pattern: string = 'MMM d, p') {
  if (!dateStr) return '';
  
  try {
    // Handle "2026-04-27 07:04:10" format by converting to ISO
    let normalized = dateStr.trim();
    if (normalized.includes(' ') && !normalized.includes('T')) {
      normalized = normalized.replace(' ', 'T');
    }
    
    // Force UTC if no timezone indicator is present
    if (!normalized.endsWith('Z') && !normalized.includes('+')) {
      normalized += 'Z';
    }
    
    return format(parseISO(normalized), pattern);
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateStr;
  }
}
