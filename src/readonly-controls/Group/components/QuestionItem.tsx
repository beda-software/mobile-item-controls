import { QuestionnaireItem } from '@beda.software/fhir-questionnaire/contrib/aidbox';
import { GroupItemProps } from 'sdc-qrf';
import { View } from 'react-native';
import { Group } from '..';
import { IntegerInput } from '../../IntegerInput';
import { StringControl } from '../../StringControl';
import { RepeatableGroups } from './RepeatableGroups';

interface Props extends GroupItemProps {
    subQuestionItem: QuestionnaireItem;
    groupIndex?: string;
}

export function QuestionItem({
    parentPath,
    questionItem,
    context,
    subQuestionItem,
    groupIndex,
}: Props) {
    const fieldPath = groupIndex
        ? [...parentPath, questionItem.linkId, 'items', groupIndex]
        : [...parentPath, questionItem.linkId, 'items'];

    if (subQuestionItem.repeats) {
        return (
            <RepeatableGroups
                parentPath={fieldPath}
                questionItem={subQuestionItem}
                context={context}
            />
        );
    }

    switch (subQuestionItem.type) {
        case 'string':
            return (
                <StringControl
                    context={context[0]}
                    parentPath={fieldPath}
                    questionItem={subQuestionItem}
                />
            );
        case 'integer':
            return (
                <IntegerInput
                    context={context[0]}
                    parentPath={fieldPath}
                    questionItem={subQuestionItem}
                />
            );
        case 'group':
            return (
                <Group
                    context={context}
                    parentPath={fieldPath}
                    questionItem={subQuestionItem}
                />
            );
        default:
            console.error(`Item type ${subQuestionItem.type} is not supported`);
            return <View />;
    }
}
