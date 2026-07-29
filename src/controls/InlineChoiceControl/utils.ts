import { Coding } from 'fhir/r4b';
import { FormAnswerItems, AnswerValue } from 'sdc-qrf';

export function extractAnswerOptionValueKey(option: FormAnswerItems) {
    return Object.keys(option.value || {})[0] as keyof AnswerValue;
}

export function extractKeyFromValue(value: AnswerValue) {
    return Object.keys(value)[0] as keyof AnswerValue;
}

export function isAnswerSelected(
    option: FormAnswerItems,
    value?: FormAnswerItems[]
): boolean {
    const key = extractAnswerOptionValueKey(option);
    const optionValue = option.value?.[key];

    return (value ?? []).some((answer) => {
        const answerValue = answer.value?.[key];

        return key === 'Coding'
            ? (answerValue as Coding | undefined)?.code ===
                  (optionValue as Coding).code
            : answerValue === optionValue;
    });
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
