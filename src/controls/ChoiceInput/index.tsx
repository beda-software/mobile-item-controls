import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
    ValueSetExpandProvider,
} from '@beda.software/fhir-questionnaire';
import _ from 'lodash';
import {
    FCEQuestionnaireItemChoiceColumn,
    FormAnswerItems,
    toAnswerValue,
} from 'sdc-qrf';
import { getDisplay } from 'src/utils';

import { Select } from '../../components/Select';
import { BaseControl } from '../BaseControl';

export function ChoiceInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
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

    const field = useFieldController<FormAnswerItems[]>(
        fieldName,
        questionItem
    );
    const { value, onMultiChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    return (
        <BaseControl {...props} error={error}>
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
        </BaseControl>
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

    const debouncedLoadOptions = _.debounce((searchText: string) => {
        loadOptions(searchText).then(setOptions);
    }, 500);

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
            onSearch={debouncedLoadOptions}
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
            isMulti={repeats}
            getOptionLabel={(o) =>
                (getDisplay(o.value, choiceColumn) as string) || ''
            }
            placeholder={placeholder}
            label={label}
        />
    );
}
