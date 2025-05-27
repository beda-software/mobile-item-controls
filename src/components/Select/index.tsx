import React, { useState } from 'react';

import { Modal, FlatList, Image } from 'react-native';

import { S } from './styles';

interface SelectProps<T> {
    label?: string;
    options: T[];
    value?: any;
    onChange: (option: T) => void;
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
        placeholder = 'Select an option',
        label,
        isOptionSelected,
        getOptionLabel,
        isMulti,
    } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedOptions = options.filter((option) =>
        isOptionSelected?.(option, value)
    );

    // const filteredOptions = options.filter((option) =>
    //     option.label.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    const filteredOptions = options;

    function handleOptionSelect(option: T) {
        onChange(option);
        setSearchQuery('');

        if (!isMulti) {
            setModalVisible(false);
        }
    }

    return (
        <>
            <S.SelectContainer onPress={() => setModalVisible(true)}>
                <S.SelectField>
                    {selectedOptions.length ? (
                        <>
                            {isMulti ? (
                                <S.MultiOptions>
                                    {selectedOptions.map((o) => (
                                        <S.MultiOption
                                            key={`option-${JSON.stringify(o)}`}
                                        >
                                            <S.SelectText>
                                                {getOptionLabel?.(o)}
                                            </S.SelectText>
                                        </S.MultiOption>
                                    ))}
                                </S.MultiOptions>
                            ) : (
                                <S.SelectText>
                                    {getOptionLabel?.(selectedOptions[0])}
                                </S.SelectText>
                            )}
                        </>
                    ) : (
                        <S.SelectText>{placeholder}</S.SelectText>
                    )}
                </S.SelectField>
                <S.SelectIcon />
            </S.SelectContainer>

            <Modal
                visible={modalVisible}
                animationType="fade"
                presentationStyle="formSheet"
            >
                <S.ModalContainer>
                    <S.ModalHeader>
                        <S.ModalHeaderTitle>{label}</S.ModalHeaderTitle>
                        <S.CloseButton onPress={() => setModalVisible(false)}>
                            <Image source={require('./images/close.png')} />
                        </S.CloseButton>
                    </S.ModalHeader>
                    <S.ModalContent>
                        <S.SearchContainer>
                            <S.SearchInput
                                placeholder="Search..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </S.SearchContainer>

                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item) => JSON.stringify(item)}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{ flex: 1 }}
                            renderItem={({ item }: { item: T }) => (
                                <S.OptionItem
                                    onPress={() => handleOptionSelect(item)}
                                >
                                    <S.OptionText>
                                        {getOptionLabel?.(item)}
                                    </S.OptionText>
                                </S.OptionItem>
                            )}
                        />

                        <S.CloseButton2 onPress={() => setModalVisible(false)}>
                            <S.CloseButton2Text>Close</S.CloseButton2Text>
                        </S.CloseButton2>
                    </S.ModalContent>
                </S.ModalContainer>
            </Modal>
        </>
    );
}
