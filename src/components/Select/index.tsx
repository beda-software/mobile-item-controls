import React, { useCallback, useMemo, useState } from 'react';

import { FlatList, Image, Modal } from 'react-native';

import { S } from '../../controls/styles';

interface SelectProps<T> {
    label?: string;
    options: T[];
    value?: any;
    onChange: (option: T) => void;
    onSearch?: (search: string) => void;
    placeholder?: string;
    isOptionSelected?: ((option: T, selectValue: any) => boolean) | undefined;
    isMulti?: boolean;
    getOptionLabel?: (option: T) => string;
}

export function Select<T = any>(props: SelectProps<T>) {
    const {
        options,
        value,
        onChange,
        onSearch,
        placeholder = 'Select an option',
        label,
        isOptionSelected,
        getOptionLabel,
        isMulti,
    } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedOptions = useMemo(
        () => options.filter((option) => isOptionSelected?.(option, value)),
        [isOptionSelected, options, value]
    );

    const filteredOptions = useMemo(
        () =>
            options.filter(
                (option) =>
                    getOptionLabel?.(option)?.includes(searchQuery) ?? true
            ),
        [getOptionLabel, options, searchQuery]
    );

    function handleOptionSelect(option: T) {
        onChange(option);
        setSearchQuery('');

        if (!isMulti) {
            setModalVisible(false);
        }
    }

    return (
        <>
            <S.SelectInputWrapper onPress={() => setModalVisible(true)}>
                <S.SelectInput>
                    {selectedOptions.length ? (
                        <>
                            {isMulti ? (
                                <S.SelectInputMultipleOptionsWrapper>
                                    {selectedOptions.map((o) => (
                                        <S.SelectInputMultipleOptionsItem
                                            key={`option-${JSON.stringify(o)}`}
                                        >
                                            <S.SelectInputText>
                                                {getOptionLabel?.(o)}
                                            </S.SelectInputText>
                                        </S.SelectInputMultipleOptionsItem>
                                    ))}
                                </S.SelectInputMultipleOptionsWrapper>
                            ) : (
                                <S.SelectInputText>
                                    {getOptionLabel?.(selectedOptions[0])}
                                </S.SelectInputText>
                            )}
                        </>
                    ) : (
                        <S.SelectInputText>{placeholder}</S.SelectInputText>
                    )}
                </S.SelectInput>
                <S.SelectInputDropdownIcon />
            </S.SelectInputWrapper>

            <Modal
                visible={modalVisible}
                animationType="fade"
                presentationStyle="formSheet"
            >
                <S.SelectModalWrapper>
                    <S.SelectModalHeaderWrapper>
                        <S.SelectModalHeaderTitleText>
                            {label}
                        </S.SelectModalHeaderTitleText>
                        <S.SelectModalHeaderCloseButton
                            onPress={() => setModalVisible(false)}
                        >
                            <Image source={require('./images/close.png')} />
                        </S.SelectModalHeaderCloseButton>
                    </S.SelectModalHeaderWrapper>
                    <S.SelectModalContentWrapper>
                        <S.SelectModalSearchInputWrapper>
                            <S.SelectModalSearchInput
                                placeholder="Search..."
                                onChangeText={useCallback(
                                    (search: string) => {
                                        onSearch
                                            ? onSearch(search)
                                            : setSearchQuery(search);
                                    },
                                    [onSearch]
                                )}
                            />
                        </S.SelectModalSearchInputWrapper>

                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item) => JSON.stringify(item)}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{ flex: 1 }}
                            renderItem={({ item }: { item: T }) => (
                                <S.SelectModalContentItem
                                    onPress={() => handleOptionSelect(item)}
                                >
                                    <S.SelectModalContentItemText>
                                        {getOptionLabel?.(item)}
                                    </S.SelectModalContentItemText>
                                </S.SelectModalContentItem>
                            )}
                        />

                        <S.SelectModalFooterCloseButton
                            onPress={() => setModalVisible(false)}
                        >
                            <S.SelectModalFooterCloseButtonText>
                                Close
                            </S.SelectModalFooterCloseButtonText>
                        </S.SelectModalFooterCloseButton>
                    </S.SelectModalContentWrapper>
                </S.SelectModalWrapper>
            </Modal>
        </>
    );
}
