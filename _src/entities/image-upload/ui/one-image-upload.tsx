'use client';
import { Box, Center, Flex, Group, InputError, Overlay, Paper, rem, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { memo } from 'react';

export type UseOneUploadFormContext = () => UseFormReturnType<
    { cover: FileWithPath },
    (values: { cover: FileWithPath }) => { cover: FileWithPath }
>;
type Props = {
    initialImage?: string;
    className?: string;
    imageFile: FileWithPath | null;
    height?: number;
    width?: number;
    resolution?: string;
    useFormContext: UseOneUploadFormContext;
};

export const OneImageUpload = ({
    initialImage,
    className,
    height = 378,
    imageFile,
    width = 253,
    resolution = '(960 x 1440 px)',
    useFormContext,
}: Props) => {
    const form = useFormContext();

    const imageUrl = imageFile?.name ? URL.createObjectURL(imageFile) : initialImage;
    const imagePreview = imageUrl ? (
        <img
            style={{
                zIndex: -1,
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                width,
                height,
            }}
            src={imageUrl}
            alt={imageFile?.name ?? ''}
            onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
    ) : null;

    return (
        <>
            <Paper
                c="blue"
                withBorder
                h={height || 378}
                pos="relative"
                w={width || 253}
                radius="lg"
                style={{
                    zIndex: 0,
                    borderColor: 'var(--mantine-color-primary-filled-filled)',
                    borderStyle: 'dashed',
                    overflow: 'hidden',
                }}
            >
                {imagePreview}
                <Overlay backgroundOpacity={0.1} style={{ cursor: 'pointer' }}>
                    <Flex
                        component={Dropzone}
                        multiple
                        accept={IMAGE_MIME_TYPE}
                        h="100%"
                        // c='blue'
                        style={{ cursor: 'pointer', overflow: 'auto', padding: 16 }}
                        onDrop={(files) => {
                            const file = (files as unknown as FileWithPath[])?.[0];

                            console.log('dropped', file?.name);
                            form.setFieldValue('cover', file);
                        }}
                        justify="center"
                        align="center"
                    >
                        <Text ta="center">Select or drop cover image here</Text>
                        <Text fw="bold" ta="center">
                            {resolution}
                        </Text>
                    </Flex>
                </Overlay>
            </Paper>
        </>
    );
};
