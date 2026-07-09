import React, { useCallback, useRef, useState } from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';
import { ActivityIndicator, Dimensions, View } from 'react-native';

import { useUploadFileControl } from './hooks';
import { S } from './styles';
import { Button as DefaultButton } from '../../components/Button';
import { ButtonProps } from '../../components/Button/types';
import { BaseControl } from '../BaseControl';
import { UploadFileService } from '../UploadFileControl1/types';

type UploadFileControlOptions = {
    Button?: React.ComponentType<ButtonProps>;
};

export function UploadFileControl(
    props: QuestionItemProps,
    service: UploadFileService,
    options?: UploadFileControlOptions
) {
    return <UploadFileControlInner {...props} service={service} options={options} />;
}

type UploadFileControlInnerProps = QuestionItemProps & {
    service: UploadFileService;
    options?: UploadFileControlOptions;
};

// Estimated height of the three-option source box (3 x 44px rows + margin);
// used only to decide whether there is room to drop below the trigger.
const ESTIMATED_SOURCE_BOX_HEIGHT = 140;

function UploadFileControlInner(props: UploadFileControlInnerProps) {
    const { service, options, ...itemProps } = props;
    const Button = options?.Button ?? DefaultButton;
    const {
        attachments,
        disabled,
        error,
        showButton,
        buttonTitle,
        sourceBoxVisible,
        isUploading,
        toggleSourceBox,
        closeSourceBox,
        pickFromSource,
        removeAttachment,
    } = useUploadFileControl(itemProps, service);

    const anchorRef = useRef<View>(null);
    const [placement, setPlacement] = useState<'below' | 'above'>('below');

    // Measure the trigger in the window on open: if it doesn't fit below, flip above.
    const handleToggle = useCallback(() => {
        if (sourceBoxVisible) {
            toggleSourceBox();
            return;
        }
        const node = anchorRef.current;
        if (!node) {
            toggleSourceBox();
            return;
        }
        node.measureInWindow((_x, y, _width, height) => {
            const spaceBelow = Dimensions.get('window').height - (y + height);
            setPlacement(spaceBelow < ESTIMATED_SOURCE_BOX_HEIGHT ? 'above' : 'below');
            toggleSourceBox();
        });
    }, [sourceBoxVisible, toggleSourceBox]);

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
                <View ref={anchorRef} collapsable={false}>
                    <S.ButtonAnchor>
                        <Button
                            variant="solid"
                            disabled={disabled || isUploading}
                            onPress={handleToggle}
                            icon={
                                isUploading ? (
                                    <S.AddSpinnerBox>
                                        <ActivityIndicator size="small" color="#adb5bd" />
                                    </S.AddSpinnerBox>
                                ) : (
                                    <S.AddIcon name="add" $disabled={disabled} />
                                )
                            }
                        >
                            {buttonTitle}
                        </Button>
                        {sourceBoxVisible ? (
                            <>
                                <S.Backdrop activeOpacity={1} onPress={closeSourceBox} />
                                <S.SourceBox $placement={placement}>
                                    <S.SourceBoxContent>
                                        <S.SourceOption onPress={() => pickFromSource('library')}>
                                            <S.SourceOptionText>Photo</S.SourceOptionText>
                                            <S.OptionSymbol name="photo.on.rectangle" />
                                        </S.SourceOption>
                                        <S.SourceOption onPress={() => pickFromSource('camera')}>
                                            <S.SourceOptionText>Camera</S.SourceOptionText>
                                            <S.OptionSymbol name="camera" />
                                        </S.SourceOption>
                                        <S.SourceOption $last onPress={() => pickFromSource('document')}>
                                            <S.SourceOptionText>Files</S.SourceOptionText>
                                            <S.OptionSymbol name="text.document" />
                                        </S.SourceOption>
                                    </S.SourceBoxContent>
                                </S.SourceBox>
                            </>
                        ) : null}
                    </S.ButtonAnchor>
                </View>
            ) : null}
        </BaseControl>
    );
}
