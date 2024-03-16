'use client'
import { Text, Image, Flex, Paper } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';

type FormInput = { cover: FileWithPath } & any
type Props = {
    initialImage?: string,
    height?: number
    width?: number
    resolution?: string
    useFormContext: () => UseFormReturnType<FormInput, (values: FormInput) => FormInput>
}
export const OneUpload = ({ initialImage, height, width, resolution = '(960 x 1440 px)', useFormContext }: Props) => {
    const form = useFormContext();

    const file = form?.values?.cover as FileWithPath

    const imageUrl = file?.name ? URL.createObjectURL(file) : (initialImage);


    return (
        <Paper withBorder h={height || 378} pos='relative' w={width || 253} radius='lg' style={{ overflow: 'hidden' }}>
            <Flex
                component={Dropzone}
                accept={IMAGE_MIME_TYPE}
                maxFiles={1}
                h='100%'
                style={{ cursor: 'pointer' }}
                onDrop={(files: FileWithPath[]) => form.setFieldValue('cover', files[0])}
                align='center'
                justify='center'>
                <Text ta="center">Drop image here</Text>
                <Text fw='bold' ta="center">{resolution}</Text>
                {Boolean(file) && imageUrl && <Image pos='absolute' top={0} left={0} h='100%' src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />}
            </Flex>
        </Paper>

    );
}