import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { FormAnswerItems } from 'sdc-qrf';
import { getDisplay } from 'src/utils';

import { BaseControl, emptyText } from '../BaseControl';
import { S } from '../styles';

export function ChoiceControl(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId, choiceColumn } = questionItem;
    const fieldName = [...parentPath, linkId];

    const field = useFieldController<FormAnswerItems[]>(
        fieldName,
        questionItem
    );
    const { value } = field;

    return (
        <BaseControl {...props}>
            {value ? (
                value.map((answer, index) => (
                    <S.ContentQuestionValue key={`${linkId}-answer-${index}`}>
                        {getDisplay(answer.value, choiceColumn) || ''}
                    </S.ContentQuestionValue>
                ))
            ) : (
                <S.ContentQuestionValue>{emptyText}</S.ContentQuestionValue>
            )}
        </BaseControl>
    );
}
