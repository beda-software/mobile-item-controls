import { QuestionnaireItem } from '@beda.software/fhir-questionnaire/contrib/aidbox';
import { GroupItemProps } from '@beda.software/fhir-questionnaire/vendor/sdc-qrf';
import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { IntegerInput } from '../IntegerInput';
import { StringInput } from '../StringInput';
import { styles } from '../styles';

export function Group({ parentPath, questionItem, context }: GroupItemProps) {
    const { item, text, helpText, repeats, linkId } = questionItem;
    const [items, setItems] = useState([{}]);

    const addItem = useCallback(() => {
        setItems((prevItems) => [...prevItems, {}]);
    }, []);

    const renderQuestionItem = (i: QuestionnaireItem, index: number) => {
        const updatedParentPath = repeats
            ? [...parentPath, linkId, 'items', String(index)]
            : [...parentPath, linkId, 'items'];

        switch (i.type) {
            case 'string':
                return (
                    <StringInput
                        context={context[0]}
                        parentPath={updatedParentPath}
                        questionItem={i}
                        key={`${i.linkId}-${index}`}
                    />
                );
            case 'integer':
                return (
                    <IntegerInput
                        context={context[0]}
                        parentPath={updatedParentPath}
                        questionItem={i}
                        key={`${i.linkId}-${index}`}
                    />
                );
            case 'group':
                return (
                    <Group
                        context={context}
                        parentPath={updatedParentPath}
                        questionItem={i}
                        key={`${i.linkId}-${index}`}
                    />
                );
            default:
                console.error(`Item type ${i.type} is not supported`);
                return <View key={`${i.linkId}-${index}`} />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {text && <Text style={styles.text}>{text}</Text>}
                {helpText && <Text>{helpText}</Text>}
            </View>

            {item && (
                <View>
                    {items.map((_, index) => (
                        <View key={index}>
                            {questionItem.item?.map((i) =>
                                renderQuestionItem(i, index)
                            )}
                        </View>
                    ))}
                </View>
            )}

            {repeats && (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.addButtonContainer}
                    onPress={addItem}
                >
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
