import React from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';
import { ActivityIndicator } from 'react-native';

import { useUploadFileControl } from './hooks';
import { S } from './styles';
import { AttachFileTrigger, UploadFileService } from '../../components/AttachFile';
import { Button as DefaultButton } from '../../components/Button';
import { ButtonProps } from '../../components/Button/types';
import { BaseControl } from '../BaseControl';

type UploadFileControlOptions = {
    Button?: React.ComponentType<ButtonProps>;
};

export function UploadFileControl(
    props: QuestionItemProps,
    service: UploadFileService,
    options?: UploadFileControlOptions,
) {
    return <UploadFileControlInner {...props} service={service} options={options} />;
}

type UploadFileControlInnerProps = QuestionItemProps & {
    service: UploadFileService;
    options?: UploadFileControlOptions;
};

function UploadFileControlInner(props: UploadFileControlInnerProps) {
    const { service, options, ...itemProps } = props;
    const Button = options?.Button ?? DefaultButton;
    const { attachments, disabled, error, showButton, buttonTitle, handleAttachment, removeAttachment } =
        useUploadFileControl(itemProps);

    return (
        <BaseControl {...itemProps} customLayout error={error}>
            {attachments.length > 0 ? (
                <S.FileList>
                    {attachments.map((item, index) => {
                        const attachment = item.value?.Attachment;
                        const title = attachment?.title || attachment?.url || 'File';
                        const isImage = Boolean(attachment?.contentType?.startsWith('image/'));
                        return (
                            <S.FileRow key={`${attachment?.url ?? 'file'}-${index}`}>
                                <S.FilePreview>
                                    <S.FileIcon name={isImage ? 'image' : 'description'} />
                                </S.FilePreview>
                                <S.FileName numberOfLines={1}>{title}</S.FileName>
                                {!disabled ? (
                                    <S.RemoveButton onPress={() => removeAttachment(index)}>
                                        <S.RemoveIcon name="close_small" />
                                    </S.RemoveButton>
                                ) : null}
                            </S.FileRow>
                        );
                    })}
                </S.FileList>
            ) : null}

            {showButton ? (
                <AttachFileTrigger
                    service={service}
                    disabled={disabled}
                    onAttachment={handleAttachment}
                    renderButton={({ onPress, isUploading, disabled: btnDisabled }) => (
                        <Button
                            variant="solid"
                            disabled={btnDisabled || isUploading}
                            onPress={onPress}
                            icon={
                                isUploading ? (
                                    <S.AddSpinnerBox>
                                        <ActivityIndicator size="small" color="#adb5bd" />
                                    </S.AddSpinnerBox>
                                ) : (
                                    <S.AddIcon name="add" $disabled={btnDisabled} />
                                )
                            }
                        >
                            {buttonTitle}
                        </Button>
                    )}
                />
            ) : null}
        </BaseControl>
    );
}
