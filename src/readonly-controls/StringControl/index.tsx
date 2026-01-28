import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';

import { BaseControl, emptyText } from '../BaseControl';
import { S } from '../styles';

export function StringControl(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId } = questionItem;

    const field = useFieldController<string>(
        [...parentPath, linkId, 0, 'value', 'string'],
        questionItem
    );
    const { value } = field;

    return (
        <BaseControl {...props}>
            <S.ContentQuestionValue>{value ?? emptyText}</S.ContentQuestionValue>
        </BaseControl>
    );
}
