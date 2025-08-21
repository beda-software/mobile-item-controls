import React, { useRef, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Coding, Quantity } from 'fhir/r4b';
import { TextInput } from 'react-native';

import { Select } from '../../components/Select';
import { BaseControl } from '../BaseControl';
import { S } from '../styles';
import { isValidDecimal } from '../utils';

export function QuantityInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const inputRef = useRef<TextInput>(null);
    const { linkId, readOnly } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'Quantity'];
    const field = useFieldController<Quantity>(fieldName, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);
    const firstOption = questionItem.unitOption?.[0];

    const [selectedUnit, setSelectedUnit] = useState<Coding | undefined>(
        value ? {
            display: value.unit,
            system: value.system,
            code: value.code,
        } : firstOption
    );
    const [isFocused, setIsFocused] = useState(false);

    function focusRef() {
        inputRef.current?.focus();
    }

    const onValueChange = (inputValue: string) => {
        if (isValidDecimal(inputValue)) {
            const parsedValue = parseFloat(inputValue);
            onChange({
                value: !Number.isNaN(parsedValue) ? parsedValue : undefined,
                unit: selectedUnit?.display,
                system: selectedUnit?.system,
                code: selectedUnit?.code,
            });
        }
    };

    const onUnitChange = (unit: Coding) => {
        setSelectedUnit(unit);
        onChange({
            value: value?.value,
            unit: unit.display,
            system: unit.system,
            code: unit.code,
        });
    };

    return (
        <BaseControl
            {...props}
            onFocus={focusRef}
            isActive={isFocused}
            error={error}
        >
            <S.TextInput
                ref={inputRef}
                keyboardType={'decimal-pad'}
                value={value?.value?.toString()}
                onChangeText={onValueChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={!readOnly}
                $readOnly={readOnly}
            />
            <S.TextInputAddon $readOnly={readOnly}>
                {(questionItem.unitOption?.length ?? 0) > 1 ? (
                    <Select<Coding>
                        value={
                            selectedUnit !== undefined
                                ? [selectedUnit]
                                : undefined
                        }
                        options={questionItem?.unitOption ?? []}
                        onChange={onUnitChange}
                        isMulti={false}
                        getOptionLabel={(o) => o.display ?? 'N/A'}
                    />
                ) : (
                    <S.TextInputAddonText>
                        {selectedUnit?.display}
                    </S.TextInputAddonText>
                )}
            </S.TextInputAddon>
        </BaseControl>
    );
}
