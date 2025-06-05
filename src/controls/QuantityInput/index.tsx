import React, { useMemo, useRef, useState } from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Coding, Quantity } from 'fhir/r4b';
import { TextInput, View } from 'react-native';
import { ExtensionIdentifier } from 'sdc-qrf/dist/converter/extensions';

import { Select } from '../../components/Select';
import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';
import { isValidDecimal } from '../utils';

export function QuantityInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, readOnly } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'Quantity'];
    const { value, onChange } = useFieldController<Quantity>(
        fieldName,
        questionItem
    );

    const unitOption = useMemo(
        () =>
            questionItem.extension
                ?.filter((ext) => ext.url === ExtensionIdentifier.UnitOption)
                ?.map((ext) => ext.valueCoding)
                ?.filter((unit): unit is Coding => unit !== undefined),
        [questionItem.extension]
    );

    const [numericValue, setNumericValue] = useState<string>(
        value?.value?.toString() || ''
    );
    const [selectedUnit, setSelectedUnit] = useState<Coding | undefined>(
        unitOption?.[0]
    );
    const [isFocused, setIsFocused] = useState(false);

    function focusRef() {
        inputRef.current?.focus();
    }

    const onValueChange = (inputValue: string) => {
        if (isValidDecimal(inputValue)) {
            setNumericValue(inputValue);
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
            value: parseFloat(numericValue) || undefined,
            unit: unit.display,
            system: unit.system,
            code: unit.code,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(questionItem.text, styles.text)}
                {renderText(questionItem.helpText)}
            </View>
            <S.InputWrapper
                activeOpacity={1}
                onPress={focusRef}
                $readOnly={readOnly}
                $active={isFocused}
            >
                <S.TextInput
                    ref={inputRef}
                    keyboardType={'decimal-pad'}
                    value={numericValue}
                    onChangeText={onValueChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    editable={!readOnly}
                    $readOnly={readOnly}
                />
                <S.TextInputAddon $readOnly={readOnly}>
                    <Select<Coding>
                        value={selectedUnit}
                        options={unitOption ?? []}
                        onChange={onUnitChange}
                        isOptionSelected={(option) =>
                            option.code === selectedUnit?.code
                        }
                        isMulti={false}
                        getOptionLabel={(o) => o.display ?? 'N/A'}
                    />
                </S.TextInputAddon>
            </S.InputWrapper>
        </View>
    );
}
