'use client'
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ActionIcon, Anchor, AppShellSection, Breadcrumbs, Button, Center, Container, Group, InputError, Loader, NumberInput, Overlay, Radio, RadioGroup, Stack, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { FileWithPath } from "@mantine/dropzone";
import { createFormContext, hasLength } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import Link from "next/link";

import { ManyImagesUpload, ManyUploadUseFormContext } from "@/app/entities/image-upload";
import { DndFileList } from "@/app/entities/image-upload/file-list";
import { uploadImages } from "@/app/features/upload-image";
import { graphql } from "@/app/shared/api/graphql";

const getComicAndChaptersData = graphql(`
    query getComicAndLastChapterData($id: ID!){
        comic(id:$id){
            title
            chapters{
            id
            volume
            number
            }
        }
}   
`);

type FormInput = {
    images: FileWithPath[] | [],
    volume: number,
    number: number,
    name: string
}

const [FormProvider, useFormContext, useForm] =
    createFormContext<FormInput>();

const uploadChapterMutation = graphql(`
mutation addChapter($input: addChapterInput!){
  addChapter(input:$input){
    id
    volume
    number
  }
}
`)

const ChapterUploadPage = ({ params }: { params: { comicId: string, lng: string } }) => {
    const { data: comicData } = useQuery(getComicAndChaptersData, { variables: { id: params.comicId } })
    const minComicVolume = comicData?.comic?.chapters?.[comicData?.comic.chapters.length - 1]?.volume || 1;
    const minComicNumber = comicData?.comic?.chapters?.[comicData?.comic.chapters.length - 1]?.number || 0;
    const [uploadChapter, { data, error, loading }] = useMutation(uploadChapterMutation)

    const onSubmit = (data: FormInput) => {
        const upload = async () => {

            const uploadedImages = await uploadImages(data.images, `${params.comicId}/${data.volume}/${data.number}`, 'token.accessToken');

            await uploadChapter({
                variables: {
                    input: {
                        comicId: params.comicId,
                        volume: data?.volume,
                        number: data.number,
                        title: data.name,
                        language: '',
                        images: uploadedImages.data,
                        publishDate: Date.now()
                    },
                },
                update: (cache, { data: newChapterData }) => {
                    const data = cache.readQuery({ query: getComicAndChaptersData });
                    const chapters = (data?.comic?.chapters && Array.isArray(data?.comic?.chapters)) ? [...data.comic.chapters] : [];

                    data?.comic && newChapterData?.addChapter && cache.writeQuery({
                        query: getComicAndChaptersData, data:
                        {
                            ...data,
                            comic: {
                                ...data.comic,
                                title: data.comic.title,
                                chapters: [...chapters, newChapterData?.addChapter]
                            }
                        }
                    })
                }
            })

            form.reset()
        }

        upload()
    }

    data?.addChapter?.id && window && notifications.show({ message: 'Chapter uploaded', c: 'green' })
    error && window && notifications.show({ message: 'Возникла ошибка', c: 'red' })


    const form = useForm({
        name: 'upload-chapter',
        initialValues: {
            images: [],
            volume: (data?.addChapter.volume || minComicVolume),
            number: (data?.addChapter.number || minComicNumber) + 1,
            name: ''
        },
        validate: {
            images: hasLength({ min: 1 }, 'Images cannot be empty. Please drop or select images')
        }
    })


    const images = form.getInputProps('images').value as FileWithPath[] | []

    return (
        <AppShellSection component={Container} pt={40}>
            <Breadcrumbs mb={32}>
                <Anchor href='/dashboard' component={Link}>Dashboard</Anchor>
                <Anchor href='/dashboard/comic' component={Link}>Projects</Anchor>
                <Anchor href={`/dashboard/comic/${params.comicId}`} component={Link}>{comicData?.comic?.title}</Anchor>
                <Anchor>New chapter</Anchor>
            </Breadcrumbs>
            <FormProvider form={form}>

                <form style={{ position: 'relative' }} onReset={form.reset} onSubmit={form.onSubmit(onSubmit)}>
                    {loading && <Overlay
                        zIndex={201}
                        radius='sm'
                        blur={2}
                    >
                        <Center style={{ 'flexDirection': 'column' }} h='100%'>
                            <Loader color="blue" type="bars" />
                            <Text c='white'>Uploading and optimize images...</Text>
                        </Center>

                    </Overlay>}
                    <Stack>
                        <Group>
                            <NumberInput {...form.getInputProps('volume')} label='Volume' min={minComicVolume} max={minComicVolume + 1} />
                            <NumberInput  {...form.getInputProps('number')} label='Chapter' min={minComicNumber + 1} max={minComicNumber + 1.99} />
                            <TextInput  {...form.getInputProps('name')} label='Chapter name' style={{ flexGrow: 1 }} />
                        </Group>
                        <ManyImagesUpload width={'100%'} height={300} useFormContext={useFormContext as unknown as ManyUploadUseFormContext} />
                        <InputError>{form.errors.images}</InputError>
                        {images && <DndFileList list={images} setValue={(files: FileWithPath[]) => {
                            form.setFieldValue('images', files)
                        }} />}
                        <RadioGroup defaultValue="immediately" name='publishDate' label='Publish'>
                            <Radio value='immediately' name='publishDate' label='immediately' />
                            <Radio value='schedule' name='publishDate' label='schedule for later' />
                        </RadioGroup>
                        <DatePickerInput valueFormat="DD.MM.YYYY" label='Publish date' placeholder="publish date" />
                        <RadioGroup defaultValue="enable" name='comments' label='Comments'>
                            <Radio value='enable' label='Enable' />
                            <Radio value='disable' label='Disable' />
                        </RadioGroup>
                        <Group>
                            <ActionIcon variant="default" type="reset"><IconTrash size={18} /></ActionIcon>
                            <Button type="submit">Upload</Button>
                        </Group>
                    </Stack>
                </form>
            </FormProvider>
        </AppShellSection >
    )
}

export default ChapterUploadPage;
