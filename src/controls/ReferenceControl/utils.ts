import { QuestionnaireItemAnswerOption } from '@beda.software/fhir-questionnaire/contrib/aidbox';

import fhirpath, { Context, Model, Path, UserInvocationTable } from 'fhirpath';

const FHIRPATH_EVALUATE_INVOCATION_TABLE: UserInvocationTable = {};

export function evaluate(
    fhirData: any,
    path: string | Path,
    context?: Context | undefined,
    model?: Model,
    options?: {
        resolveInternalTypes?: boolean;
        traceFn?: (value: any, label: string) => void;
        userInvocationTable?: UserInvocationTable;
    }
): any[] {
    const resultUserInvocationTable = {
        ...(options?.userInvocationTable ?? {}),
        ...FHIRPATH_EVALUATE_INVOCATION_TABLE,
    };

    return fhirpath.evaluate(fhirData, path, context, model, {
        ...options,
        userInvocationTable: resultUserInvocationTable,
    });
}

export function transformResource(
    resource: any
): QuestionnaireItemAnswerOption {
    if (!resource?.value?.Reference?.reference) {
        return resource;
    }
    const reference = resource.value.Reference.reference;
    const [resourceType, id] = reference.split('/');
    if (!resourceType || !id) {
        return resource;
    }
    return {
        value: {
            Reference: {
                resourceType: resourceType,
                id: id,
                display: resource.value.Reference.display,
            },
        },
    };
}
