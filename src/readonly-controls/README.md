# Readonly Controls

Readonly controls for displaying FHIR Questionnaire responses in a non-editable format. These controls render question labels with their answer values as plain text, without any interactive input elements.

## Components

### `ReadonlyControl`

Universal component that handles all standard FHIR question types. Automatically formats answer values based on the question type.

**Supported Types:**
- `string`, `text`, `url`, `uri` — displays text value
- `integer`, `decimal` — displays numeric value
- `boolean` — displays "Yes" or "No"
- `date`, `dateTime`, `time` — displays formatted date/time (configurable)
- `choice`, `open-choice` — displays Coding display or code
- `quantity` — displays value with unit (e.g., "150 cm")
- `reference` — displays reference display or reference ID
- `display` — displays label only (no value)
- `attachment` — displays attachment title or URL

### `ReadonlyGroup`

Group component for readonly mode. Renders the group label and children without add/remove buttons.

### `readonlyQuestionnaireControls`

Pre-built mapping object that maps all standard FHIR question types to `ReadonlyControl`. Use this with `QuestionnaireResponseForm`'s `widgetsByQuestionType` prop.

## Usage

### Basic Setup

```tsx
import {
    readonlyQuestionnaireControls,
    ReadonlyGroup,
} from '@beda.software/mobile-item-controls';

<QuestionnaireResponseForm
    widgetsByQuestionType={readonlyQuestionnaireControls}
    groupItemComponent={ReadonlyGroup}
    readOnly={true}
    {...otherProps}
/>
```

### With Custom Date/Time Formatting

By default, date/time values are displayed as raw ISO strings. To customize formatting, wrap your form in `ReadonlyControlConfigProvider`:

```tsx
import {
    ReadonlyControlConfigProvider,
    readonlyQuestionnaireControls,
    ReadonlyGroup,
} from '@beda.software/mobile-item-controls';
import moment from 'moment';

<ReadonlyControlConfigProvider
    formatDate={(isoString) => moment(isoString).format('DD MMM YYYY')}
    formatDateTime={(isoString) => moment(isoString).format('DD MMM YYYY HH:mm')}
    formatTime={(isoString) => moment(isoString).format('HH:mm')}
>
    <QuestionnaireResponseForm
        widgetsByQuestionType={readonlyQuestionnaireControls}
        groupItemComponent={ReadonlyGroup}
        readOnly={true}
        {...otherProps}
    />
</ReadonlyControlConfigProvider>
```

### Complete Example

```tsx
import { QuestionnaireResponseForm } from '@beda.software/fhir-questionnaire';
import {
    Group,
    ReadonlyGroup,
    ReadonlyControlConfigProvider,
    readonlyQuestionnaireControls,
} from '@beda.software/mobile-item-controls';
import { formatHumanDate, formatHumanDateTime, formatHumanTime } from '@/utils';

function MyQuestionnaireForm({ readOnly, ...props }) {
    return (
        <ReadonlyControlConfigProvider
            formatDate={formatHumanDate}
            formatDateTime={formatHumanDateTime}
            formatTime={formatHumanTime}
        >
            <QuestionnaireResponseForm
                widgetsByQuestionType={
                    readOnly 
                        ? readonlyQuestionnaireControls 
                        : editableControls
                }
                groupItemComponent={readOnly ? ReadonlyGroup : Group}
                readOnly={readOnly}
                {...props}
            />
        </ReadonlyControlConfigProvider>
    );
}
```

## Empty State

Questions with no answer display "Not provided" by default. This text is defined in the `emptyText` constant exported from `BaseControl`.

## Multi-Value Answers

For questions that allow multiple answers (e.g., `repeats: true`), all values are displayed as comma-separated text:

```
Symptoms: Fever, Cough, Headache
```

## Customization

### Using Individual Components

For custom readonly controls, you can import and use the building blocks:

```tsx
import {
    ReadonlyControl,
    ReadonlyGroup,
    useReadonlyControlConfig,
    formatAnswerValue,
} from '@beda.software/mobile-item-controls';

// Use ReadonlyControl directly as a QuestionItemComponent
const customMapping = {
    string: ReadonlyControl,
    integer: ReadonlyControl,
    // ... other types
};

// Or create a custom readonly control using the utilities
function CustomReadonlyControl(props: QuestionItemProps) {
    const config = useReadonlyControlConfig();
    // ... your custom logic
}
```

## API Reference

### `ReadonlyControlConfig`

```typescript
interface ReadonlyControlConfig {
    formatDate?: (isoString: string) => string;
    formatDateTime?: (isoString: string) => string;
    formatTime?: (isoString: string) => string;
}
```

### `formatAnswerValue(answer, type, config)`

Formats a single answer value based on question type. Returns a string.

### `formatAnswers(answers, type, config)`

Formats an array of answers, joining multiple values with commas. Returns a string.

### `useReadonlyControlConfig()`

Hook to access the current readonly control configuration (date/time formatters).

## Notes

- Readonly controls use `useFieldController` to access form values, consistent with editable controls
- The `display` question type renders label only (no value area)
- All controls are compatible with FHIR SDC (Structured Data Capture) specification
- Controls support both single and repeating questions
