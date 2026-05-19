import { format, addMonths, subMonths, getYear, getMonth, setMonth, setYear } from 'date-fns';

/**
 * Parse a YYYY-MM-DD string to a local Date (avoids timezone issues)
 */
export function parseDateString(dateString: string): Date {
    return new Date(dateString + 'T00:00:00');
}

/**
 * Format a Date to YYYY-MM-DD string
 */
export function formatDateString(date: Date): string {
    return format(date, 'yyyy-MM-dd');
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayString(): string {
    return formatDateString(new Date());
}

/**
 * Format a date string (YYYY-MM-DD) to display format "MMMM yyyy" (e.g., "February 2026")
 */
export function formatMonthYear(dateString: string): string {
    return format(parseDateString(dateString), 'MMMM yyyy');
}

/**
 * Get the next month's date string from a given YYYY-MM-DD
 */
export function getNextMonth(dateString: string): string {
    return formatDateString(addMonths(parseDateString(dateString), 1));
}

/**
 * Get the previous month's date string from a given YYYY-MM-DD
 */
export function getPrevMonth(dateString: string): string {
    return formatDateString(subMonths(parseDateString(dateString), 1));
}

/**
 * Get year from date string
 */
export function getYearFromDate(dateString: string): number {
    return getYear(parseDateString(dateString));
}

/**
 * Get month index (0-based) from date string
 */
export function getMonthFromDate(dateString: string): number {
    return getMonth(parseDateString(dateString));
}

/**
 * Build a YYYY-MM-DD from year, monthIndex (0-based), day=1
 */
export function buildDateString(year: number, monthIndex: number, day: number = 1): string {
    const date = setYear(setMonth(new Date(2000, 0, 1), monthIndex), year);
    date.setDate(day);
    return formatDateString(date);
}

export const MONTH_NAMES = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
