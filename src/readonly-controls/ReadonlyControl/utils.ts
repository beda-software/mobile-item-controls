import { FormAnswerItems } from 'sdc-qrf';

import { ReadonlyControlConfig } from '../context';

export function formatAnswerValue(
    answer: FormAnswerItems,
    type: string,
    config: Required<ReadonlyControlConfig>,
): string {
    const value = answer.value;
    if (!value) {
        return '';
    }

    switch (type) {
        case 'string':
        case 'text':
        case 'url':
        case 'uri':
            return value.string ?? '';

        case 'integer':
            return value.integer !== undefined ? String(value.integer) : '';

        case 'decimal':
            return value.decimal !== undefined ? String(value.decimal) : '';

        case 'boolean':
            if (value.boolean === undefined) {
                return '';
            }
            return value.boolean ? 'Yes' : 'No';

        case 'date':
            return value.date ? config.formatDate(value.date) : '';

        case 'dateTime':
            return value.dateTime ? config.formatDateTime(value.dateTime) : '';

        case 'time':
            return value.time ? config.formatTime(value.time) : '';

        case 'choice':
        case 'open-choice': {
            if (value.Coding) {
                return value.Coding.display || value.Coding.code || '';
            }
            if (value.string) {
                return value.string;
            }
            if (value.integer !== undefined) {
                return String(value.integer);
            }
            if (value.date) {
                return config.formatDate(value.date);
            }
            if (value.time) {
                return config.formatTime(value.time);
            }
            if (value.Reference) {
                return value.Reference.display || value.Reference.reference || '';
            }
            return '';
        }

        case 'quantity': {
            const qty = value.Quantity;
            if (!qty) {
                return '';
            }
            const parts: string[] = [];
            if (qty.value !== undefined) {
                parts.push(String(qty.value));
            }
            if (qty.unit) {
                parts.push(qty.unit);
            }
            return parts.join(' ');
        }

        case 'reference': {
            const ref = value.Reference;
            if (!ref) {
                return '';
            }
            return ref.display || ref.reference || '';
        }

        case 'attachment': {
            const attachment = value.Attachment;
            if (!attachment) {
                return '';
            }
            return attachment.title || attachment.url || '';
        }

        default:
            // Fallback: try to find any non-empty value
            if (value.string) return value.string;
            if (value.Coding) return value.Coding.display || value.Coding.code || '';
            if (value.integer !== undefined) return String(value.integer);
            if (value.decimal !== undefined) return String(value.decimal);
            if (value.boolean !== undefined) return value.boolean ? 'Yes' : 'No';
            if (value.date) return config.formatDate(value.date);
            if (value.dateTime) return config.formatDateTime(value.dateTime);
            if (value.time) return config.formatTime(value.time);
            return '';
    }
}

export function formatAnswers(
    answers: FormAnswerItems[] | undefined,
    type: string,
    config: Required<ReadonlyControlConfig>,
): string {
    if (!answers || answers.length === 0) {
        return '';
    }

    return answers
        .map((answer) => formatAnswerValue(answer, type, config))
        .filter((text) => text.length > 0)
        .join(', ');
}
