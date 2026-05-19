export interface CalendarProps {
    /** Selected date in YYYY-MM-DD format */
    value?: string;
    /** Called when user selects a date, receives YYYY-MM-DD string */
    onChange: (date: string) => void;
    /** First day of week: 0 = Sunday, 1 = Monday (default: 1) */
    firstDay?: number;
    /** Minimum selectable date in YYYY-MM-DD format */
    minDate?: string;
    /** Maximum selectable date in YYYY-MM-DD format */
    maxDate?: string;
    /** Whether tapping the header month/year title opens the picker modal (default: true) */
    showMonthYearPicker?: boolean;
}

export type CalendarViewMode = 'month' | 'week';
