import { GroupItemProps } from '@beda.software/fhir-questionnaire/vendor/sdc-qrf';
import { QuestionItem } from './QuestionItem';

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
            {questionItem.item?.map((item, index) => (
                <QuestionItem
                    key={index}
                    subQuestionItem={item}
                    parentPath={parentPath}
                    questionItem={questionItem}
                    groupIndex={groupIndex}
                    context={context}
                />
            ))}
        </>
    );
}
