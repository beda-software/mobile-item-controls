import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
    QuestionItemProps,
    useFieldController,
    ValueSetExpandProvider,
} from '@beda.software/fhir-questionnaire';
import {
    QuestionnaireItemAnswerOption,
    QuestionnaireItemChoiceColumn,
    QuestionnaireResponseItemAnswer,
} from '@beda.software/fhir-questionnaire/contrib/aidbox';
import { debounce } from 'lodash';
import _ from 'lodash';
import { getDisplay } from 'src/utils';

import { Select } from '../../components/Select';

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

    const { value, onMultiChange } = useFieldController(
        fieldName,
        questionItem
    );

    if (questionItem.hidden) {
        return null;
    }

    if (answerValueSet) {
        return (
            <ChoiceQuestionValueSet
                answerValueSet={answerValueSet}
                value={value}
                onChange={onMultiChange}
                repeats={repeats}
                placeholder={entryFormat}
                choiceColumn={choiceColumn}
                label={text}
            />
        );
    }

    return (
        <ChoiceQuestionSelect
            options={answerOption!}
            value={value}
            onChange={onMultiChange}
            repeats={repeats}
            placeholder={entryFormat}
            choiceColumn={choiceColumn}
            label={text}
        />
    );
}

interface ChoiceQuestionValueSetProps {
    answerValueSet: string;
    value: QuestionnaireResponseItemAnswer[];
    label?: string;
    onChange: (option: any) => void;
    repeats?: boolean;
    placeholder?: string;
    choiceColumn?: QuestionnaireItemChoiceColumn[];
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

    const debouncedLoadOptions = debounce((searchText) => {
        (async () => await loadOptions(searchText))();
    }, 500);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const newOptions = await loadOptions('');
            setOptions(newOptions);
        })();
    }, [loadOptions]);

    return (
        <Select<QuestionnaireItemAnswerOption>
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
    value?: QuestionnaireResponseItemAnswer[];
    label?: string;
    onChange: (...option: any[]) => void;
    options: QuestionnaireItemAnswerOption[];
    repeats?: boolean;
    placeholder?: string;
    choiceColumn?: QuestionnaireItemChoiceColumn[];
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
        <Select<QuestionnaireItemAnswerOption>
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
