import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import React, { useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { renderText } from '../../components/TextRender';
import { styles } from '../styles';
import {
    Coding,
    Quantity,
} from '@beda.software/fhir-questionnaire/contrib/aidbox';
import { isValidDecimal } from '../utils';

export function QuantityInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, unitOption } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'Quantity'];
    const { value, onChange } = useFieldController<Quantity>(
        fieldName,
        questionItem
    );

    const [numericValue, setNumericValue] = useState<string>(
        value?.value?.toString() || ''
    );
    const [selectedUnit, setSelectedUnit] = useState<Coding>(unitOption?.[0]);
    const [showUnitList, setShowUnitList] = useState(false);

    function focusRef() {
        inputRef.current?.focus();
    }

    const onValueChange = (inputValue: string) => {
        if (isValidDecimal(inputValue)) {
            setNumericValue(inputValue);
            const parsedValue = parseFloat(inputValue);
            onChange({
                value: !Number.isNaN(parsedValue) ? parsedValue : undefined,
                unit: selectedUnit.display,
                system: selectedUnit.system,
                code: selectedUnit.code,
            });
        }
    };

    const onUnitChange = (unit: Coding) => {
        setSelectedUnit(unit);
        setShowUnitList(false);
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

            <TouchableOpacity
                activeOpacity={1}
                onPress={focusRef}
                style={styles.inputContainer}
            >
                <TextInput
                    ref={inputRef}
                    keyboardType={'decimal-pad'}
                    style={styles.inputText}
                    value={numericValue}
                    onChangeText={onValueChange}
                />
            </TouchableOpacity>

            {unitOption && unitOption.length > 1 ? (
                <View>
                    <TouchableOpacity
                        onPress={() => setShowUnitList(!showUnitList)}
                    >
                        <Text>
                            {'> ' + selectedUnit?.display || 'Select Unit'}
                        </Text>
                    </TouchableOpacity>
                    {showUnitList && (
                        <View>
                            {unitOption.map((item: Coding) => (
                                <TouchableOpacity
                                    key={item.code}
                                    onPress={() => onUnitChange(item)}
                                >
                                    <Text>{item.display}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            ) : (
                selectedUnit?.display && <Text>{selectedUnit.display}</Text>
            )}
        </View>
    );
}
