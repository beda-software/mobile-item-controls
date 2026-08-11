export { ReadonlyControl } from './ReadonlyControl';
export { ReadonlyGroup } from './ReadonlyGroup';

export { readonlyQuestionnaireControls } from './ReadonlyControl/mapping';
export { formatAnswerValue, formatAnswers } from './ReadonlyControl/utils';

/**
 * @deprecated The config now drives editable controls too — use `ControlConfigProvider` /
 * `useControlConfig` / `ControlConfig` from `control-config`. Kept until every consumer migrates.
 */
export {
    ControlConfigProvider as ReadonlyControlConfigProvider,
    useControlConfig as useReadonlyControlConfig,
} from '../control-config';
/** @deprecated Use `ControlConfig` from `control-config`. */
export type { ControlConfig as ReadonlyControlConfig } from '../control-config';
