import { GroupItemProps } from 'sdc-qrf';
import { QuestionItem } from './QuestionItem';
import { QuestionnaireItem } from '@beda.software/fhir-questionnaire/contrib/aidbox';

interface Props extends GroupItemProps {
    groupIndex?: string;
}

export function RenderQuestionItems({
    questionItem,
    parentPath,
    groupIndex,
    context,
}: Props) {
    return (
        <>
            {questionItem.item?.map(
                (item: QuestionnaireItem, index: React.Key) => (
                    <QuestionItem
                        key={index}
                        subQuestionItem={item}
                        parentPath={parentPath}
                        questionItem={questionItem}
                        groupIndex={groupIndex}
                        context={context}
                    />
                )
            )}
        </>
    );
}
