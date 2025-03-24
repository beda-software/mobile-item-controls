import {
    Coding,
    QuestionnaireItem,
    QuestionnaireItemAnswerOption,
    QuestionnaireItemAnswerOptionValue,
} from '@beda.software/fhir-questionnaire/contrib/aidbox';

export function extractAnswerOptionValueKey(
    option: QuestionnaireItemAnswerOption
) {
    return Object.keys(
        option.value || {}
    )[0] as keyof QuestionnaireItemAnswerOptionValue;
}

export function extractKeyFromValue(value: QuestionnaireItemAnswerOptionValue) {
    return Object.keys(value)[0] as keyof QuestionnaireItemAnswerOptionValue;
}

export function getValuePath(item: QuestionnaireItem, parentPath: string[]) {
    const value = item.answerOption?.[0].value;
    if (!value) return [];
    const key = extractKeyFromValue(value);
    return [...parentPath, item.linkId, '0', 'value', key];
}

function isCoding(
    value?: QuestionnaireItemAnswerOption[] | Coding
): value is Coding {
    return typeof value === 'object' && 'code' in value;
}

export function isAnswerSelected(
    option: QuestionnaireItemAnswerOption,
    value?: QuestionnaireItemAnswerOption[] | Coding,
    repeats?: boolean
): boolean {
    const key = extractAnswerOptionValueKey(option);
    const optionValue = option.value?.[key];
    if (key === 'Coding') {
        const code = (optionValue as Coding)?.code;
        if (repeats) {
            return (value as QuestionnaireItemAnswerOption[]).some((v) => {
                return isCoding(v.value?.[key]) && v.value[key].code === code;
            });
        }
        return isCoding(value) && value.code === code;
    }
    return repeats
        ? (value as QuestionnaireItemAnswerOption[]).some(
              (option) => option.value?.[key] === optionValue
          )
        : value === optionValue;
}

export function getAnswerDisplay(
    key: keyof QuestionnaireItemAnswerOptionValue,
    answerOptionValue?: QuestionnaireItemAnswerOptionValue
): string {
    if (!answerOptionValue) return '';
    if (key === 'Coding') {
        const coding = answerOptionValue[key];
        return coding?.display || coding?.code || '';
    }
    return String(answerOptionValue[key] ?? '');
}
