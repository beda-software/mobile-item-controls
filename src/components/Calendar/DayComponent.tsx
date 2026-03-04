import { S } from './styles';
import { getTodayString } from './utils';

interface DayComponentProps {
    date?: {
        day: number;
        month: number;
        year: number;
        timestamp: number;
        dateString: string;
    };
    state?: '' | 'disabled' | 'today' | 'inactive';
    marking?: {
        selected?: boolean;
        selectedColor?: string;
    };
    onPress?: (dateString: string) => void;
    isOutsideMonth?: boolean;
}

export function DayComponent({ date, state, marking, onPress, isOutsideMonth }: DayComponentProps) {
    if (!date) {
        return <S.DayEmptyContainer />;
    }

    const todayString = getTodayString();
    const isToday = date.dateString === todayString;
    const isSelected = marking?.selected ?? false;
    const isDisabled = state === 'disabled' || state === 'inactive';
    const isOutside = isOutsideMonth || state === 'inactive';

    return (
        <S.DayContainer
            $isToday={isToday}
            $isSelected={isSelected}
            onPress={() => onPress?.(date.dateString)}
            disabled={isDisabled}
            activeOpacity={0.6}
        >
            <S.DayText
                $isToday={isToday}
                $isSelected={isSelected}
                $isDisabled={isDisabled}
                $isOutsideMonth={isOutside}
            >
                {date.day}
            </S.DayText>
        </S.DayContainer>
    );
}
