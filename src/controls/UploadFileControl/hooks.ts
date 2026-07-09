import { useCallback, useMemo } from 'react';

import { getFieldErrorMessage, QuestionItemProps, useFieldController } from '@beda.software/fhir-questionnaire';
import { Attachment } from 'fhir/r4b';
import { FormAnswerItems } from 'sdc-qrf';

export function useUploadFileControl(props: QuestionItemProps) {
    const { parentPath, questionItem } = props;
    const { linkId, repeats } = questionItem;
    const field = useFieldController<FormAnswerItems[]>([...parentPath, linkId], questionItem);
    const { value, onChange, disabled, fieldState } = field;

    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    const attachments = useMemo(() => value ?? [], [value]);
    const hasAttachments = attachments.length > 0;
    const showButton = Boolean(repeats) || !hasAttachments;
    const buttonTitle = hasAttachments ? 'Add another file' : 'Add file';

    const handleAttachment = useCallback(
        (attachment: Attachment) => {
            const uploaded: FormAnswerItems = { value: { Attachment: attachment } };
            onChange(repeats ? [...attachments, uploaded] : [uploaded]);
        },
        [repeats, attachments, onChange],
    );

    const removeAttachment = useCallback(
        (index: number) => {
            onChange(attachments.filter((_, i) => i !== index));
        },
        [attachments, onChange],
    );

    return {
        attachments,
        disabled,
        error,
        showButton,
        buttonTitle,
        handleAttachment,
        removeAttachment,
    };
}
