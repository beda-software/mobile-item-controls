import React from 'react';

import { S } from './styles';
import { TimeSlot, TimeSlotGroup, TimeSlotsProps } from './types';

function SlotButton({
    slot,
    isSelected,
    onPress,
}: {
    slot: TimeSlot;
    isSelected: boolean;
    onPress: () => void;
}) {
    return (
        <S.SlotButton
            $selected={isSelected}
            $disabled={slot.disabled}
            disabled={slot.disabled}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <S.SlotText $selected={isSelected}>{slot.label}</S.SlotText>
        </S.SlotButton>
    );
}

function SlotsList({
    slots,
    value,
    onChange,
    direction,
}: {
    slots: TimeSlot[];
    value?: string;
    onChange: (value: string) => void;
    direction: 'row' | 'column';
}) {
    const Wrapper = direction === 'row' ? S.SlotsRow : S.SlotsColumn;

    return (
        <Wrapper>
            {slots.length > 0 ? (
                slots.map((slot) => (
                    <SlotButton
                        key={slot.value}
                        slot={slot}
                        isSelected={slot.value === value}
                        onPress={() => onChange(slot.value)}
                    />
                ))
            ) : (
                <S.NoSlotsContainer>
                    <S.NoSlotsIcon name="event_busy" />
                </S.NoSlotsContainer>
            )}
        </Wrapper>
    );
}

function GroupView({
    group,
    value,
    onChange,
    direction,
}: {
    group: TimeSlotGroup;
    value?: string;
    onChange: (value: string) => void;
    direction: 'row' | 'column';
}) {
    return (
        <S.Group>
            <S.GroupTitle>{group.title}</S.GroupTitle>
            <SlotsList
                slots={group.slots}
                value={value}
                onChange={onChange}
                direction={direction}
            />
        </S.Group>
    );
}

export function TimeSlots({
    value,
    onChange,
    slots,
    groups,
    groupDirection = 'vertical',
}: TimeSlotsProps) {
    // Grouped mode
    if (groups && groups.length > 0) {
        const GroupsContainer =
            groupDirection === 'horizontal'
                ? S.GroupsHorizontal
                : S.GroupsVertical;

        // Slot direction is the opposite of group direction
        const slotDirection =
            groupDirection === 'horizontal' ? 'row' : 'column';

        return (
            <S.Container>
                <GroupsContainer>
                    {groups.map((group) => (
                        <GroupView
                            key={group.title}
                            group={group}
                            value={value}
                            onChange={onChange}
                            direction={slotDirection}
                        />
                    ))}
                </GroupsContainer>
            </S.Container>
        );
    }

    // Flat mode — always horizontal
    if (slots && slots.length > 0) {
        return (
            <S.Container>
                <SlotsList
                    slots={slots}
                    value={value}
                    onChange={onChange}
                    direction="row"
                />
            </S.Container>
        );
    }

    return null;
}
