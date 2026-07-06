import React from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';
import { ActivityIndicator, Modal } from 'react-native';

import { useUploadFileControl } from './hooks';
import { S } from './styles';
import { UploadFileService } from './types';
import { Icon } from '../../components/Icon';
import { BaseControl } from '../BaseControl';

export function UploadFileControl(props: QuestionItemProps, service: UploadFileService) {
    return <UploadFileControlInner {...props} service={service} />;
}

type UploadFileControlInnerProps = QuestionItemProps & { service: UploadFileService };

function UploadFileControlInner(props: UploadFileControlInnerProps) {
    const { service, ...itemProps } = props;
    const {
        attachments,
        disabled,
        sourceSheetVisible,
        detailsModalVisible,
        pendingFiles,
        isUploading,
        openSourceSheet,
        closeSourceSheet,
        pickFromSource,
        updatePendingDescription,
        removePendingFile,
        cancelDetails,
        confirmUpload,
        removeAttachment,
    } = useUploadFileControl(itemProps, service);

    return (
        <BaseControl {...itemProps} customLayout>
            <S.FileList>
                {attachments.length === 0 ? (
                    <S.EmptyText>No files attached yet</S.EmptyText>
                ) : (
                    attachments.map((item, index) => {
                        const attachment = item.value?.Attachment;
                        const title = attachment?.title || attachment?.url || 'File';
                        return (
                            <S.FileRow key={`${attachment?.url ?? 'file'}-${index}`}>
                                <Icon name="description" fontSize={20} color="#3366FF" />
                                <S.FileInfo>
                                    <S.FileName numberOfLines={1}>{title}</S.FileName>
                                    {attachment?.url ? (
                                        <S.FileDescription numberOfLines={1}>
                                            {attachment.url}
                                        </S.FileDescription>
                                    ) : null}
                                </S.FileInfo>
                                {!disabled ? (
                                    <S.RemoveButton onPress={() => removeAttachment(index)}>
                                        <Icon name="close" fontSize={20} color="rgba(0,0,0,0.5)" />
                                    </S.RemoveButton>
                                ) : null}
                            </S.FileRow>
                        );
                    })
                )}
            </S.FileList>

            {!disabled ? (
                <S.AttachButton onPress={openSourceSheet}>
                    <Icon name="attach_file" fontSize={18} color="white" />
                    <S.AttachButtonText>Attach File</S.AttachButtonText>
                </S.AttachButton>
            ) : null}

            <Modal
                visible={sourceSheetVisible}
                transparent
                animationType="slide"
                onRequestClose={closeSourceSheet}
            >
                <S.SheetOverlay activeOpacity={1} onPress={closeSourceSheet}>
                    <S.SheetCard onStartShouldSetResponder={() => true}>
                        <S.SheetOption onPress={() => pickFromSource('camera')}>
                            <Icon name="photo_camera" fontSize={22} />
                            <S.SheetOptionText>Take Photo</S.SheetOptionText>
                        </S.SheetOption>
                        <S.SheetOption onPress={() => pickFromSource('library')}>
                            <Icon name="photo_library" fontSize={22} />
                            <S.SheetOptionText>Choose from Library</S.SheetOptionText>
                        </S.SheetOption>
                        <S.SheetOption onPress={() => pickFromSource('document')}>
                            <Icon name="folder" fontSize={22} />
                            <S.SheetOptionText>Choose Document</S.SheetOptionText>
                        </S.SheetOption>
                    </S.SheetCard>
                </S.SheetOverlay>
            </Modal>

            <Modal
                visible={detailsModalVisible}
                transparent
                animationType="fade"
                onRequestClose={cancelDetails}
            >
                <S.ModalOverlay>
                    <S.ModalCard>
                        <S.ModalHeader>
                            <S.ModalTitle>Add file details</S.ModalTitle>
                            <S.CloseButton onPress={cancelDetails}>
                                <Icon name="close" fontSize={22} color="rgba(0,0,0,0.6)" />
                            </S.CloseButton>
                        </S.ModalHeader>

                        <S.PendingListScroll>
                            <S.PendingListInner>
                                {pendingFiles.map((pending) => (
                                    <S.PendingCard key={pending.id}>
                                        <S.PendingHeader>
                                            <S.PendingName numberOfLines={1}>
                                                {pending.filename}
                                            </S.PendingName>
                                            <S.CloseButton onPress={() => removePendingFile(pending.id)}>
                                                <Icon
                                                    name="close"
                                                    fontSize={20}
                                                    color="rgba(0,0,0,0.5)"
                                                />
                                            </S.CloseButton>
                                        </S.PendingHeader>
                                        <S.DescriptionInput
                                            placeholder="Add description..."
                                            value={pending.description}
                                            onChangeText={(text) =>
                                                updatePendingDescription(pending.id, text)
                                            }
                                            maxLength={160}
                                            multiline
                                            editable={!isUploading}
                                        />
                                    </S.PendingCard>
                                ))}
                            </S.PendingListInner>
                        </S.PendingListScroll>

                        <S.SecondaryButton onPress={openSourceSheet} disabled={isUploading}>
                            <Icon name="add" fontSize={18} color="white" />
                            <S.SecondaryButtonText>Add another file</S.SecondaryButtonText>
                        </S.SecondaryButton>

                        <S.ModalFooter>
                            {isUploading ? <ActivityIndicator size="small" /> : null}
                            <S.FooterButton onPress={cancelDetails} disabled={isUploading}>
                                <S.FooterButtonText>Cancel</S.FooterButtonText>
                            </S.FooterButton>
                            <S.FooterButton $primary onPress={confirmUpload} disabled={isUploading}>
                                <S.FooterButtonText $primary>
                                    {pendingFiles.length > 1 ? 'Attach files' : 'Attach file'}
                                </S.FooterButtonText>
                            </S.FooterButton>
                        </S.ModalFooter>
                    </S.ModalCard>
                </S.ModalOverlay>
            </Modal>
        </BaseControl>
    );
}
