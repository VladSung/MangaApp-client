'use client'
import { Box, Center, Group, InputError, Paper, rem, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { memo } from 'react';

export type UseFormContext = () => UseFormReturnType<{ cover: FileWithPath }, (values: { cover: FileWithPath }) => { cover: FileWithPath }>
type Props = {
    initialImage?: string,
    className?: string
    height?: number
    width?: number
    resolution?: string
    useFormContext: UseFormContext
}

export const OneUpload = memo(({ initialImage, className, height = 378, width = 253, resolution = '(960 x 1440 px)', useFormContext }: Props) => {
    const form = useFormContext();
    const file = form?.values?.cover
    const imageUrl = file?.name ? URL.createObjectURL(file) : (initialImage);
    const imagePreview = imageUrl ? <img style={{ zIndex: -1, objectFit: 'cover', position: 'absolute', top: 0, left: 0, width, height }} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} /> : null;

    return (
        <Box w='min-content' m={{ base: 'auto', md: 0 }}>
            <Paper mb={5} className={className} withBorder h={height} pos='relative' w={width} radius='lg' style={{ color: form.errors.cover ? 'var(--mantine-color-error)' : undefined, borderColor: form.errors.cover ? 'var(--mantine-color-error)' : undefined, background: imagePreview ? 'transparent' : undefined, overflow: 'hidden' }}>
                <Dropzone
                    p={24}
                    accept={IMAGE_MIME_TYPE}
                    maxSize={10 * 1024 ** 2}
                    maxFiles={1}
                    h='100%'
                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onDrop={(files) => {
                        form.setFieldValue('cover', (files as unknown as FileWithPath[])[0])
                    }}
                >
                    <Group>
                        <Dropzone.Accept>
                            {/* <Overlay style={{ left: 0, top: 0, position: 'absolute', width: '100%', height: '100%' }} color='#000' backgroundOpacity={.4}> */}
                            <div>
                                <Center mb={24}>
                                    <IconUpload
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                        stroke={1.5}
                                    />
                                </Center>
                                <Text ta="center" mb={8}>Drag image here or click to select file</Text>
                                <Text c='dimmed' ta="center">{resolution}</Text>
                                <Text c='dimmed' ta="center">max file size: 5mb</Text>
                            </div>
                            {/* </Overlay> */}

                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <Center>
                                <IconX
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                    stroke={1.5}
                                />
                            </Center>
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            {!imageUrl && <>
                                <Center mb={24}>
                                    <IconPhoto
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                        stroke={1.5}
                                    />
                                </Center>
                                <Text ta="center" mb={8}>Drag image here or click to select file</Text>
                                <Text c='dimmed' ta="center">{resolution}</Text>
                                <Text c='dimmed' ta="center">max file size: 5mb</Text>
                            </>
                            }
                        </Dropzone.Idle>

                    </Group>
                </Dropzone>
                {imagePreview}
            </Paper>
            <InputError>{form?.errors?.cover}</InputError>
        </Box>

    );
})
