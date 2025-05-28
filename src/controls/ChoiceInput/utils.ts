import { Coding } from 'fhir/r4b';
import {
    FormAnswerItems,
    AnswerValue,
    FCEQuestionnaireItem,
    toAnswerValue,
} from 'sdc-qrf';

export function extractAnswerOptionValueKey(option: FormAnswerItems) {
    return Object.keys(option.value || {})[0] as keyof AnswerValue;
}

export function extractKeyFromValue(value: AnswerValue) {
    return Object.keys(value)[0] as keyof AnswerValue;
}

export function getValuePath(item: FCEQuestionnaireItem, parentPath: string[]) {
    if (!item.answerOption?.[0]) {
        return [];
    }
    const value = toAnswerValue(item.answerOption[0], 'value');
    if (!value) return [];
    const key = extractKeyFromValue(value);
    return [...parentPath, item.linkId, '0', 'value', key];
}

function isCoding(
    value?: FormAnswerItems[] | Coding
): value is Coding{
    return typeof value === 'object' && 'code' in value;
}

export function isAnswerSelected(
    option: FormAnswerItems,
    value?: FormAnswerItems[] | Coding,
    repeats?: boolean
): boolean {
    const key = extractAnswerOptionValueKey(option);
    const optionValue = option.value?.[key];
    if (key === 'Coding') {
        const code = (optionValue as Coding)?.code;
        if (repeats) {
            return (value as FormAnswerItems[]).some((v) => {
                const value = v.value?.[key];
                return isCoding(value) && value.code === code;
            });
        }
        return isCoding(value) && value.code === code;
    }
    return repeats
        ? (value as FormAnswerItems[]).some(
              (option) => option.value?.[key] === optionValue
          )
        : value === optionValue;
}

export function getAnswerDisplay(
    key: keyof AnswerValue,
    answerOptionValue?: AnswerValue
): string {
    if (!answerOptionValue) return '';
    if (key === 'Coding') {
        const coding = answerOptionValue[key];
        return coding?.display || coding?.code || '';
    }
    return String(answerOptionValue[key] ?? '');
}
