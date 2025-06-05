import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
    QuestionItemProps,
    useFieldController,
    ValueSetExpandProvider,
} from '@beda.software/fhir-questionnaire';
import _ from 'lodash';
import { View } from 'react-native';
import {
    FCEQuestionnaireItemChoiceColumn,
    FormAnswerItems,
    toAnswerValue,
} from 'sdc-qrf';
import { getDisplay } from 'src/utils';

import { Select } from '../../components/Select';
import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';

export function ChoiceInput({ questionItem, parentPath }: QuestionItemProps) {
    const {
        repeats,
        answerOption,
        text,
        linkId,
        answerValueSet,
        choiceColumn,
        entryFormat,
    } = questionItem;
    const fieldName = [...parentPath, linkId];

    const { value, onMultiChange } = useFieldController<FormAnswerItems[]>(
        fieldName,
        questionItem
    );

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(questionItem.text, styles.text)}
                {renderText(questionItem.helpText)}
            </View>
            <S.InputWrapper
                activeOpacity={1}
                $readOnly={questionItem.readOnly}
                $active={false}
            >
                {answerValueSet ? (
                    <ChoiceQuestionValueSet
                        answerValueSet={answerValueSet}
                        value={value}
                        onChange={onMultiChange}
                        repeats={repeats}
                        placeholder={entryFormat}
                        choiceColumn={choiceColumn}
                        label={text}
                    />
                ) : (
                    <ChoiceQuestionSelect
                        options={(answerOption ?? []).map((option) => ({
                            value: toAnswerValue(option, 'value')!,
                        }))}
                        value={value}
                        onChange={onMultiChange}
                        repeats={repeats}
                        placeholder={entryFormat}
                        choiceColumn={choiceColumn}
                        label={text}
                    />
                )}
            </S.InputWrapper>
        </View>
    );
}

interface ChoiceQuestionValueSetProps {
    answerValueSet: string;
    value: FormAnswerItems[] | undefined;
    label?: string;
    onChange: (option: any) => void;
    repeats?: boolean;
    placeholder?: string;
    choiceColumn?: FCEQuestionnaireItemChoiceColumn[];
}

export function ChoiceQuestionValueSet(props: ChoiceQuestionValueSetProps) {
    const {
        answerValueSet,
        value,
        onChange,
        repeats = false,
        placeholder,
        choiceColumn,
        label,
    } = props;
    const expand = useContext(ValueSetExpandProvider);

    const loadOptions = useCallback(
        async (searchText: string) => {
            return expand(answerValueSet, searchText);
        },
        [answerValueSet, expand]
    );

    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const newOptions = await loadOptions('');
            setOptions(newOptions);
        })();
    }, [loadOptions]);

    return (
        <Select<FormAnswerItems>
            value={value}
            options={options}
            onChange={(v) => onChange(v)}
            isOptionSelected={(option) =>
                !!value &&
                value?.findIndex((v) => _.isEqual(v?.value, option.value)) !==
                    -1
            }
            isMulti={repeats}
            getOptionLabel={(o) =>
                (getDisplay(o.value, choiceColumn) as string) || ''
            }
            placeholder={placeholder}
            label={label}
        />
    );
}

interface ChoiceQuestionSelectProps {
    value: FormAnswerItems[] | undefined;
    label?: string;
    onChange: (...option: any[]) => void;
    options: FormAnswerItems[];
    repeats?: boolean;
    placeholder?: string;
    choiceColumn?: FCEQuestionnaireItemChoiceColumn[];
}

export function ChoiceQuestionSelect(props: ChoiceQuestionSelectProps) {
    const {
        value,
        onChange,
        options,
        repeats = false,
        placeholder = `Select...`,
        choiceColumn,
        label,
    } = props;

    return (
        <Select<FormAnswerItems>
            value={value}
            options={options}
            onChange={(v) => onChange(v)}
            isOptionSelected={(option) =>
                !!value &&
                value?.findIndex((v) => _.isEqual(v?.value, option.value)) !==
                    -1
            }
            isMulti={repeats}
            getOptionLabel={(o) =>
                (getDisplay(o.value, choiceColumn) as string) || ''
            }
            placeholder={placeholder}
            label={label}
        />
    );
}
