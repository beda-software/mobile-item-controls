import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';

import { TimeSlot } from '../../components';
import { TimeSlots } from '../../components/TimeSlots';
import { BaseControl } from '../BaseControl';

const ALL_TIME_SLOTS: TimeSlot[] = [
    { value: '08:00:00', label: '8:00am' },
    { value: '08:30:00', label: '8:30am' },
    { value: '09:00:00', label: '9:00am' },
    { value: '09:30:00', label: '9:30am' },
    { value: '10:00:00', label: '10:00am' },
    { value: '10:30:00', label: '10:30am' },
    { value: '11:00:00', label: '11:00am' },
    { value: '11:30:00', label: '11:30am' },
    { value: '12:00:00', label: '12:00pm' },
    { value: '12:30:00', label: '12:30pm' },
    { value: '13:00:00', label: '1:00pm' },
    { value: '13:30:00', label: '1:30pm' },
    { value: '14:00:00', label: '2:00pm' },
    { value: '14:30:00', label: '2:30pm' },
    { value: '15:00:00', label: '3:00pm' },
    { value: '15:30:00', label: '3:30pm' },
    { value: '16:00:00', label: '4:00pm' },
    { value: '16:30:00', label: '4:30pm' },
    { value: '17:00:00', label: '5:00pm' },
    { value: '17:30:00', label: '5:30pm' },
    { value: '18:00:00', label: '6:00pm' },
    { value: '18:30:00', label: '6:30pm' },
    { value: '19:00:00', label: '7:00pm' },
    { value: '19:30:00', label: '7:30pm' },
    { value: '20:00:00', label: '8:00pm' },
    { value: '20:30:00', label: '8:30pm' },
];

export function TimeSlotsControl(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId, type } = questionItem;
    const fieldPath = [...parentPath, linkId, 0, 'value', type];
    const field = useFieldController<string>(fieldPath, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    return (
        <BaseControl {...props} error={error} customLayout>
            <TimeSlots slots={ALL_TIME_SLOTS} value={value} onChange={onChange} />
        </BaseControl>
    );
}
