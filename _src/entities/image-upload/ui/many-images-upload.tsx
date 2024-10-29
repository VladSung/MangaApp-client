'use client';
import { Flex, Overlay, Paper, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';

// const Dropzone = dynamic(()=>import('@mantine/dropzone').then(mod=>mod.Dropzone))

type FormInput = { images: FileWithPath[] | [] };
export type UseManyUploadFormContext = () => UseFormReturnType<
    FormInput,
    (values: FormInput) => FormInput
>;
type Props = {
    initialImages?: string[];
    height?: number | string;
    width?: number | string;
    resolution?: string;
    useFormContext: UseManyUploadFormContext;
};

export const ManyImagesUpload = ({
    initialImages,
    height,
    width,
    resolution = '(800 x any px)',
    useFormContext,
}: Props) => {
    const form = useFormContext();
    const files = form?.values?.images as FileWithPath[];

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
                <Overlay backgroundOpacity={0.1} style={{ cursor: 'pointer' }}>
                    <Flex
                        component={Dropzone}
                        multiple
                        accept={IMAGE_MIME_TYPE}
                        h="100%"
                        // c='blue'
                        style={{ cursor: 'pointer', overflow: 'auto', padding: 16 }}
                        onDrop={(newFiles) => {
                            form.setFieldValue('images', [
                                ...files,
                                ...(newFiles as unknown as FileWithPath[]),
                            ]);
                        }}
                        justify="center"
                        align="center"
                    >
                        {/* {files?.map((file: FileWithPath, index: number) => {
                    const imageUrl = file?.name ? URL.createObjectURL(file) : (initialImages?.[index]);
                    if (imageUrl) return <Image key={file?.name} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
                    return <></>
                })} */}

                        <Text ta="center">Select or drop images here</Text>
                        <Text fw="bold" ta="center">
                            {resolution}
                        </Text>
                    </Flex>
                </Overlay>
            </Paper>
        </>
    );
};
