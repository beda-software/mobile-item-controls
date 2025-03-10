import { GroupItemProps } from '@beda.software/fhir-questionnaire/vendor/sdc-qrf';
import React from 'react';
import { RenderQuestionItems } from './components/RenderQuestionItems';
import { RepeatableGroups } from './components/RepeatableGroups';

interface Props extends GroupItemProps {
    groupIndex?: string;
}

export function Group({
    parentPath,
    questionItem,
    context,
    groupIndex,
}: Props) {
    return questionItem.repeats === true ? (
        <RepeatableGroups
            parentPath={parentPath}
            questionItem={questionItem}
            context={context}
        />
    ) : (
        <RenderQuestionItems
            questionItem={questionItem}
            parentPath={parentPath}
            context={context}
            groupIndex={groupIndex}
        />
    );
}
