import React from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';

import { BaseControl } from '../BaseControl';

export function Display(props: QuestionItemProps) {
    return (
        <BaseControl {...props} customLayout>
            <></>
        </BaseControl>
    );
}
