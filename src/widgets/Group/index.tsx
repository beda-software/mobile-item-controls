import { QuestionnaireItem } from '@beda.software/fhir-questionnaire/contrib/aidbox';
import { GroupItemProps } from '@beda.software/fhir-questionnaire/vendor/sdc-qrf';
import React, { useCallback, useContext, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { PagerViewContext } from '../context';
import { IntegerInput } from '../IntegerInput';
import { StringInput } from '../StringInput';

export function Group({ parentPath, questionItem, context }: GroupItemProps) {
    const navigation = useContext(PagerViewContext);
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
                        useWidget={false}
                    />
                );
            case 'integer':
                return (
                    <IntegerInput
                        context={context[0]}
                        parentPath={updatedParentPath}
                        questionItem={i}
                        key={`${i.linkId}-${index}`}
                        useWidget={false}
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
        <ScrollView>
            {text && <Text>{text}</Text>}
            {helpText && <Text>{helpText}</Text>}

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

            {repeats && <Button title="Add" onPress={addItem} />}

            {!parentPath.length && (
                <View>
                    <Button title="Continue" onPress={navigation?.next!} />
                </View>
            )}
        </ScrollView>
    );
}
