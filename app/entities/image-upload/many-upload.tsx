import { Text, Flex, Paper, Overlay } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { DndFileList } from './file-list';

type FormInput = { images: FileWithPath[] | [] } & any
type Props = {
    initialImages?: string[],
    height?: number | string
    width?: number | string
    resolution?: string
    useFormContext: () => UseFormReturnType<FormInput, (values: FormInput) => FormInput>
}
export const ManyUpload = ({ initialImages, height, width, resolution = '(800 x any px)', useFormContext }: Props) => {
    const form = useFormContext();
    const files = form?.values?.images as FileWithPath[]

    return (
        <>
            <Paper c='blue' withBorder h={height || 378} pos='relative' w={width || 253} radius='lg' style={{ borderColor: 'var(--mantine-color-blue-filled)', borderStyle: 'dashed', overflow: 'hidden' }}>

                <Overlay backgroundOpacity={0.1} style={{ cursor: 'pointer' }}>
                    <Flex
                        component={Dropzone}
                        multiple
                        accept={IMAGE_MIME_TYPE}
                        h='100%'
                        // c='blue'
                        style={{ cursor: 'pointer', overflow: 'auto', padding: 16 }}
                        onDrop={(newFiles: FileWithPath[]) => { form.setFieldValue('images', [...files, ...newFiles]) }}
                        justify='center'
                        align='center'
                    >
                        {/* {files?.map((file: FileWithPath, index: number) => {
                    const imageUrl = file?.name ? URL.createObjectURL(file) : (initialImages?.[index]);
                    if (imageUrl) return <Image key={file?.name} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
                    return <></>
                })} */}

                        <Text ta="center">Select or drop images here</Text>
                        <Text fw='bold' ta="center">{resolution}</Text>
                    </Flex>
                </Overlay>
            </Paper>
        </>
    );
}