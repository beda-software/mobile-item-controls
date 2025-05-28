import React, { useCallback, useEffect, useRef, useState } from 'react';

import { isSuccess, RemoteDataResult } from '@beda.software/remote-data';
import { Resource } from 'fhir/r4b';
import { ControllerFieldState, Noop, RefCallBack } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { FormAnswerItems } from 'sdc-qrf';

import { renderText } from '../../components/TextRender';
import { styles } from '../styles';
import { ReferenceInput } from './components/ReferenceInput';
import { ReferenceOptionsList } from './components/ReferenceOptionsList';
import {
    AnswerReferenceProps,
    GetFHIRResources,
    useAnswerReference,
} from './hooks';
import { transformResource } from './utils';

interface QuestionReferenceUnsafeProps {
    fieldController: {
        value: FormAnswerItems[] | undefined;
        onChange: (value: FormAnswerItems[]) => void;
        onMultiChange: (option: FormAnswerItems) => void;
        fieldState: ControllerFieldState;
        disabled: boolean | undefined;
        onBlur: Noop;
        name: string;
        ref: RefCallBack;
    };
    searchText: string;
    setSearchText: (text: string) => void;
    optionsRD: RemoteDataResult<any>;
    text: string;
    repeats?: boolean;
}

function QuestionReferenceUnsafe({
    fieldController,
    searchText,
    setSearchText,
    optionsRD,
    text,
    repeats,
}: QuestionReferenceUnsafeProps) {
    const { value, onChange, onMultiChange } = fieldController;

    const [showOptions, setShowOptions] = useState(false);
    const didInitFromValue = useRef(false);

    const selectedReferences = value?.map((v) => {
        const ref = v.value?.Reference;
        return ref?.reference ?? '';
    });

    const onSelectOption = useCallback(
        (option: FormAnswerItems) => {
            const display = option.value?.Reference?.display || '';
            const transformed = transformResource(option);
            if (repeats) {
                const ref = transformed.value?.Reference;
                const alreadyExists = value?.some(
                    (item) =>
                        item.value?.Reference?.reference === ref?.reference
                );
                if (!alreadyExists) {
                    onMultiChange(transformed);
                }
                setSearchText('');
            } else {
                setSearchText(display);
                setShowOptions(false);
                onChange([transformed]);
            }
        },
        [repeats, value, onMultiChange, onChange, setSearchText]
    );

    const onRemove = useCallback(
        (index: number) => {
            onMultiChange(value![index]);
        },
        [onMultiChange, value]
    );

    const onBlur = useCallback(() => {
        if (repeats) {
            Keyboard.dismiss();
        } else {
            if (!searchText.trim()) {
                onChange([]);
                return;
            }
            if (isSuccess(optionsRD)) {
                const matched = optionsRD.data?.find(
                    (option: FormAnswerItems) =>
                        option?.value?.Reference?.display?.toLowerCase() ===
                        searchText.trim().toLowerCase()
                );
                if (!matched) {
                    setSearchText(value?.[0]?.value?.Reference?.display || '');
                }
            }
        }
    }, [repeats, searchText, onChange, setSearchText, optionsRD, value]);

    useEffect(() => {
        if (
            !repeats &&
            !didInitFromValue.current &&
            !searchText &&
            value?.[0]?.value?.Reference?.display
        ) {
            setSearchText(value?.[0].value.Reference.display);
            didInitFromValue.current = true;
        }
    }, [value, searchText, setSearchText, repeats]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(text, styles.text)}
            </View>
            <ReferenceInput
                repeats={repeats}
                value={value}
                searchText={searchText}
                setSearchText={setSearchText}
                setShowOptions={setShowOptions}
                onRemove={onRemove}
                onBlur={onBlur}
            />
            {showOptions && (
                <View
                    style={{
                        position: 'absolute',
                        top: 82,
                        backgroundColor: 'white',
                        width: '100%',
                        zIndex: 10,
                        borderRadius: 16,
                        padding: 16,
                    }}
                >
                    <ReferenceOptionsList
                        optionsRD={optionsRD}
                        repeats={repeats}
                        selectedReferences={selectedReferences || []}
                        onSelectOption={onSelectOption}
                    />
                </View>
            )}
        </View>
    );
}

export function ReferenceControl<
    R extends Resource = any,
    IR extends Resource = any,
>(props: AnswerReferenceProps<R, IR>, getFHIRResources: GetFHIRResources) {
    const { answerExpression, choiceColumn, linkId, repeats } =
        props.questionItem;

    if (!answerExpression || !choiceColumn) {
        console.warn(
            `answerExpression and choiceColumn must be set for linkId '${linkId}'`
        );
        return null;
    }

    const answerReference = useAnswerReference(props, getFHIRResources);

    return <QuestionReferenceUnsafe {...answerReference} repeats={repeats} />;
}
