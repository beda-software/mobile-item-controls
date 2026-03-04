import { useState } from 'react';

import { Modal } from 'react-native';

import { S } from './styles';
import { MONTH_NAMES, getYearFromDate, getMonthFromDate, buildDateString } from './utils';

interface MonthYearPickerProps {
    visible: boolean;
    currentDate: string;
    onSelect: (dateString: string) => void;
    onClose: () => void;
}

export function MonthYearPicker({ visible, currentDate, onSelect, onClose }: MonthYearPickerProps) {
    const [pickerYear, setPickerYear] = useState(() => getYearFromDate(currentDate));
    const selectedMonth = getMonthFromDate(currentDate);
    const selectedYear = getYearFromDate(currentDate);

    const handleMonthPress = (monthIndex: number) => {
        const dateString = buildDateString(pickerYear, monthIndex);
        onSelect(dateString);
    };

    const handlePrevYear = () => {
        setPickerYear((y) => y - 1);
    };

    const handleNextYear = () => {
        setPickerYear((y) => y + 1);
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <S.PickerOverlay activeOpacity={1} onPress={onClose}>
                <S.PickerContainer activeOpacity={1} onPress={() => {}}>
                    {/* Year navigation */}
                    <S.PickerYearRow>
                        <S.PickerYearArrow onPress={handlePrevYear}>
                            <S.PickerYearArrowText>{'‹'}</S.PickerYearArrowText>
                        </S.PickerYearArrow>
                        <S.PickerYearText>{pickerYear}</S.PickerYearText>
                        <S.PickerYearArrow onPress={handleNextYear}>
                            <S.PickerYearArrowText>{'›'}</S.PickerYearArrowText>
                        </S.PickerYearArrow>
                    </S.PickerYearRow>

                    {/* Month grid */}
                    <S.PickerMonthGrid>
                        {MONTH_NAMES.map((name, index) => {
                            const isSelected = index === selectedMonth && pickerYear === selectedYear;

                            return (
                                <S.PickerMonthItem
                                    key={name}
                                    $isSelected={isSelected}
                                    onPress={() => handleMonthPress(index)}
                                    activeOpacity={0.6}
                                >
                                    <S.PickerMonthText $isSelected={isSelected}>
                                        {name}
                                    </S.PickerMonthText>
                                </S.PickerMonthItem>
                            );
                        })}
                    </S.PickerMonthGrid>
                </S.PickerContainer>
            </S.PickerOverlay>
        </Modal>
    );
}
