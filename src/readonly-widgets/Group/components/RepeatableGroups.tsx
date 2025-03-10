import { useFieldController } from '@/packages/@beda.software/fhir-questionnaire';
import { GroupItemProps } from '@/packages/@beda.software/fhir-questionnaire/vendor/sdc-qrf';
import { RenderQuestionItems } from './RenderQuestionItems';

export function RepeatableGroups({
    parentPath,
    questionItem,
    context,
}: GroupItemProps) {
    const { value } = useFieldController(
        [...parentPath, questionItem.linkId, 'items'],
        questionItem
    );

    return (
        <>
            {value.map((_elem: any, groupIndex: number) => (
                <RenderQuestionItems
                    questionItem={questionItem}
                    parentPath={parentPath}
                    context={context}
                    groupIndex={groupIndex.toString()}
                    key={groupIndex}
                />
            ))}
        </>
    );
}
