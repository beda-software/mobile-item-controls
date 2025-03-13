import { GroupItemProps } from '@beda.software/fhir-questionnaire/vendor/sdc-qrf';
import React from 'react';
import { RenderQuestionItems } from './components/RenderQuestionItems';
import { RepeatableGroups } from './components/RepeatableGroups';

export function Group({ parentPath, questionItem, context }: GroupItemProps) {
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
        />
    );
}
