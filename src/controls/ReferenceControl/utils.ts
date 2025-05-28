import fhirpath, { Context, Model, Path, UserInvocationTable } from 'fhirpath';
import { FormAnswerItems } from 'sdc-qrf';

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
): FormAnswerItems {
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
                reference: `${resourceType}/${id}`,
                display: resource.value.Reference.display,
            },
        },
    };
}
