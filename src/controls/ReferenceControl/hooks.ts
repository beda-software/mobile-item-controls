import { useMemo } from 'react';

import {
    extractBundleResources,
    getReference,
    ResourcesMap,
    SearchParams,
    WithId,
} from '@beda.software/fhir-react';
import { isSuccess, RemoteDataResult } from '@beda.software/remote-data';
import { Bundle, Resource } from 'fhir/r4b';
import {
    FormAnswerItems,
    parseFhirQueryExpression,
    QuestionItemProps,
} from 'sdc-qrf';

import { evaluate } from './utils';

export type GetFHIRResources = <R_3 extends Resource>(
    resourceType: R_3['resourceType'],
    searchParams: SearchParams,
    extraPath?: string
) => Promise<RemoteDataResult<Bundle<WithId<R_3>>>>;

export function useReferences<
    R extends Resource = any,
    IR extends Resource = any,
>(
    { questionItem, context }: QuestionItemProps,
    getFHIRResources: GetFHIRResources
) {
    const { answerExpression, choiceColumn, text, referenceResource } =
        questionItem;

    const getDisplay = useMemo(() => {
        return (resource: R, includedResources: ResourcesMap<R | IR>) =>
            evaluate(resource, choiceColumn![0]!.path!, {
                ...context,
                ...includedResources,
                resource,
            })[0];
    }, [choiceColumn, context]);

    // TODO: add support for fhirpath and application/x-fhir-query
    const expression = answerExpression!.expression!;
    const [resourceType, searchParams] = useMemo(() => {
        return parseFhirQueryExpression(expression, context);
    }, [expression, context]);

    return {
        loadOptions: (searchText: string) =>
            loadOptions(
                resourceType as any,
                {
                    ...(typeof searchParams === 'string'
                        ? {}
                        : (searchParams ?? {})),
                    _ilike: searchText,
                },
                referenceResource,
                getDisplay,
                getFHIRResources
            ),
        choiceColumn,
        text: text ?? '',
    };
}

async function loadOptions<R extends Resource, IR extends Resource = any>(
    query: R['resourceType'],
    searchParams: SearchParams,
    referenceResource: Array<string> | undefined,
    getDisplayFn: (
        resource: R,
        includedResources: ResourcesMap<R | IR>
    ) => string,
    getFHIRResources: GetFHIRResources
): Promise<FormAnswerItems[]> {
    const bundleResponse = await getFHIRResources<R | IR>(query, searchParams);

    if (!isSuccess(bundleResponse)) {
        return Promise.reject(bundleResponse.error);
    }

    const bundle = bundleResponse.data;

    const resourcesMap = extractBundleResources(bundle);
    let resourceType = query;
    if (referenceResource && referenceResource.length === 1) {
        resourceType = referenceResource![0]!;
    }
    if (resourceType.endsWith('/$has')) {
        resourceType = resourceType?.slice(0, -5);
    }
    return resourcesMap[resourceType].map((resource) => ({
        value: {
            Reference: {
                ...getReference(
                    resource,
                    getDisplayFn(resource as R, resourcesMap)
                ),
            },
        },
    }));
}
