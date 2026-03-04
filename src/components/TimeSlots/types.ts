export interface TimeSlot {
    /** Time value in 'HH:mm' format */
    value: string;
    /** Display label, e.g. '8:00am' */
    label: string;
    /** Whether the slot is disabled (e.g. already booked) */
    disabled?: boolean;
}

export interface TimeSlotGroup {
    /** Group title, e.g. 'Morning' */
    title: string;
    /** Slots within this group */
    slots: TimeSlot[];
}

export type GroupDirection = 'horizontal' | 'vertical';

export interface TimeSlotsProps {
    /** Currently selected slot value in 'HH:mm:ss' format */
    value?: string;
    /** Called when a slot is selected */
    onChange: (value: string) => void;
    /** Flat list of slots (no grouping, rendered horizontally) */
    slots?: TimeSlot[];
    /** Grouped slots — takes precedence over `slots` */
    groups?: TimeSlotGroup[];
    /**
     * Layout direction for groups:
     * - 'horizontal': groups rendered as rows (group header on left, slots flow right)
     * - 'vertical': groups rendered as columns (group header on top, slots stacked below)
     *
     * Ignored when using flat `slots` (always horizontal).
     * @default 'vertical'
     */
    groupDirection?: GroupDirection;
}
