import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RenderRemoteData } from '@beda.software/fhir-react';
import { RemoteDataResult } from '@beda.software/remote-data';
import { QuestionnaireItemAnswerOption } from '@beda.software/fhir-questionnaire/contrib/aidbox';
import { Reference } from 'fhir/r4b';

interface ReferenceOptionsListProps {
    optionsRD: RemoteDataResult<any>;
    repeats?: boolean;
    selectedReferences: string[];
    onSelectOption: (option: QuestionnaireItemAnswerOption) => void;
}

export function ReferenceOptionsList({
    optionsRD,
    repeats,
    selectedReferences,
    onSelectOption,
}: ReferenceOptionsListProps) {
    return (
        <RenderRemoteData
            remoteData={optionsRD}
            renderFailure={RemoteDataFailureState}
            renderLoading={RemoteDataLoadingState}
        >
            {(options: QuestionnaireItemAnswerOption[]) => {
                const filtered = options.filter((option) => {
                    const reference = (option?.value?.Reference as Reference)
                        ?.reference;
                    if (!reference) return false;
                    if (repeats) {
                        return !selectedReferences.includes(reference);
                    }
                    return true;
                });

                return (
                    <View>
                        {filtered.length > 0 ? (
                            filtered.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => onSelectOption(option)}
                                    style={{backgroundColor: 'gray', padding: 10, margin: 10}}
                                >
                                    <Text>
                                        {option.value?.Reference?.display || ''}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View>
                                <Text>No results</Text>
                            </View>
                        )}
                    </View>
                );
            }}
        </RenderRemoteData>
    );
}

export function RemoteDataLoadingState() {
    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" />
        </View>
    );
}

export function RemoteDataFailureState(error: any) {
    return (
        <View style={{ flex: 1 }}>
            <Text>{`Error loading: ${JSON.stringify(error)}`}</Text>
        </View>
    );
}
