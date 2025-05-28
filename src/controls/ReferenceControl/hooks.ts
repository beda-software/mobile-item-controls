import { useEffect, useMemo, useState } from 'react';

import { useFieldController } from '@beda.software/fhir-questionnaire';
import {
    extractBundleResources,
    getReference,
    ResourcesMap,
    SearchParams,
    WithId,
} from '@beda.software/fhir-react';
import {
    mapSuccess,
    RemoteDataResult,
    success,
} from '@beda.software/remote-data';
import { Bundle, Reference, Resource } from 'fhir/r4b';
import {
    AnswerValue,
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

export type AnswerReferenceProps<
    R extends Resource,
    IR extends Resource,
> = QuestionItemProps & {
    overrideGetDisplay?: (
        resource: R,
        includedResources: ResourcesMap<R | IR>
    ) => string;
    overrideGetLabel?: (o: AnswerValue) => React.ReactElement | string;
};

export function useAnswerReference<
    R extends Resource = any,
    IR extends Resource = any,
>(
    {
        questionItem,
        parentPath,
        context,
        overrideGetDisplay,
    }: AnswerReferenceProps<R, IR>,
    getFHIRResources: GetFHIRResources
) {
    const {
        linkId,
        repeats,
        answerExpression,
        choiceColumn,
        text,
        entryFormat,
        referenceResource,
    } = questionItem;

    const fieldPath = [...parentPath, linkId];
    const fieldController = useFieldController<FormAnswerItems[]>(fieldPath, questionItem);

    const getDisplay = useMemo(() => {
        if (overrideGetDisplay) {
            return overrideGetDisplay;
        }

        return (resource: R, includedResources: ResourcesMap<R | IR>) =>
            evaluate(resource, choiceColumn![0]!.path!, {
                ...context,
                ...includedResources,
                resource,
            })[0];
    }, [choiceColumn, context, overrideGetDisplay]);

    // TODO: add support for fhirpath and application/x-fhir-query
    const expression = answerExpression!.expression!;
    const [resourceType, searchParams] = useMemo(() => {
        return parseFhirQueryExpression(expression, context);
    }, [expression, context]);

    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebouncedValue(searchText, 500);

    const optionsRD = useLoadOptions(
        resourceType as any,
        {
            ...(typeof searchParams === 'string' ? {} : (searchParams ?? {})),
            _ilike: debouncedSearchText,
        },
        referenceResource,
        getDisplay,
        getFHIRResources
    );

    return {
        fieldController,
        searchText,
        setSearchText,
        debouncedSearchText,
        optionsRD,
        choiceColumn,
        repeats,
        entryFormat,
        text: text ?? '',
    };
}

type LoadResourceOption = {
    value: {
        Reference: Reference;
    };
};

function useLoadOptions<R extends Resource, IR extends Resource = any>(
    query: R['resourceType'],
    searchParams: SearchParams,
    referenceResource: Array<string> | undefined,
    getDisplayFn: (
        resource: R,
        includedResources: ResourcesMap<R | IR>
    ) => string,
    getFHIRResources: GetFHIRResources
) {
    const [result, setResult] =
        useState<RemoteDataResult<LoadResourceOption[], any>>();

    useEffect(() => {
        const loadOptions = async () => {
            const r = mapSuccess(
                await getFHIRResources<R | IR>(query, searchParams),
                (bundle) => {
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
            ) as RemoteDataResult<LoadResourceOption[], any>;
            setResult(r);
        };
        loadOptions();
    }, [query, JSON.stringify(searchParams), referenceResource, getDisplayFn]);
    return result || success({});
}

function useDebouncedValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
