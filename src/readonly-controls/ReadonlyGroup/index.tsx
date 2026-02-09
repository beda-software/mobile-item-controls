import React from 'react';

import { GroupItemProps } from '@beda.software/fhir-questionnaire/components/QuestionnaireResponseForm/BaseQuestionnaireResponseForm/GroupComponent';
import { View } from 'react-native';

import { BaseControlLabel } from '../BaseControl';
import { S } from '../styles';

export function ReadonlyGroup(props: GroupItemProps) {
    const { questionItem, children } = props;
    const { item } = questionItem;

    const childrenArray = Array.isArray(children) ? children : [children];

    return (
        <S.ContainerGroup>
            <BaseControlLabel {...props} />
            {item && childrenArray.map((child, index) => (
                <View key={index}>{child}</View>
            ))}
        </S.ContainerGroup>
    );
}
