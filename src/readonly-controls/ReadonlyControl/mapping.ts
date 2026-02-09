import { QuestionItemComponentMapping } from 'sdc-qrf';

import { ReadonlyControl } from './index';

export const readonlyQuestionnaireControls: QuestionItemComponentMapping = {
    string: ReadonlyControl,
    text: ReadonlyControl,
    integer: ReadonlyControl,
    decimal: ReadonlyControl,
    boolean: ReadonlyControl,
    date: ReadonlyControl,
    dateTime: ReadonlyControl,
    time: ReadonlyControl,
    choice: ReadonlyControl,
    'open-choice': ReadonlyControl,
    quantity: ReadonlyControl,
    reference: ReadonlyControl,
    display: ReadonlyControl,
    url: ReadonlyControl,
    uri: ReadonlyControl,
    attachment: ReadonlyControl,
};
