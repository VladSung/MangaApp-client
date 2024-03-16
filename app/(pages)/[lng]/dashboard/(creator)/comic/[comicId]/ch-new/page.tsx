'use client'
import { Anchor, AppShellSection, Center, Stack, Breadcrumbs, Button, Text, Container, Group, NumberInput, Loader, Radio, RadioGroup, TextInput, ActionIcon, InputError, Overlay } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import Link from "next/link";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { graphql } from "@/app/shared/api/graphql";
import { ManyImagesUpload } from "@/app/entities/image-upload";
import { createFormContext, hasLength } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";
import { IconTrash } from "@tabler/icons-react";
import { DndFileList } from "@/app/entities/image-upload/file-list";
import { useMutation } from "@apollo/client";
import { uploadManyImages } from "@/app/features/upload-image";
import { notifications } from "@mantine/notifications";

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
    const minComicVolume = comicData?.comic?.chapters?.[comicData?.comic.chapters.length - 1]?.volume || 0;
    const minComicNumber = comicData?.comic?.chapters?.[comicData?.comic.chapters.length - 1]?.number || 0;
    const [uploadChapter, { data, error, loading }] = useMutation(uploadChapterMutation, {
        updateQueries: {

        }
    })
    const onSubmit = (data: FormInput) => {
        const upload = async () => {

            const uploadImages = await uploadManyImages(data.images, `${params.comicId}/${data.volume}/${data.number}`, 'token.accessToken');
            uploadChapter({
                variables: {
                    input: {
                        comicId: params.comicId,
                        volume: data?.volume,
                        number: data.number,
                        title: data.name,
                        language: '',
                        images: uploadImages.data,
                        publishDate: (new Date()).getTime()
                    },
                },
                update: (cache, { data: newChapterData }) => {
                    const data = cache.readQuery({ query: getComicAndChaptersData });
                    const chapters = Array.isArray(data?.comic?.chapters) && [...data?.comic?.chapters] || [];
                    cache.writeQuery({
                        query: getComicAndChaptersData, data:
                            { ...data, comic: { ...data?.comic, title: data?.comic?.title!, chapters: [...chapters, newChapterData?.addChapter!] } }
                    })
                }
            })
        }
        upload()
    }

    // { data?.addChapter?.id && notifications.show({ message: 'Chapter uploaded', c: 'green' }) }
    // { error && notifications.show({ message: 'Возникла ошибка', c: 'red' }) }

    const form = useForm({
        name: 'upload-chapter',
        initialValues: {
            images: [],
            volume: minComicVolume + 1,
            number: minComicNumber + 1,
            name: ''
        },
        validate: {
            images: hasLength({ min: 1 }, 'Images cannot be empty. Please drop or select images')
        }
    })


    if (data?.addChapter) form.reset()

    return (
        <AppShellSection component={Container} pt={40}>
            <Breadcrumbs mb={32}>
                <Anchor href='/dashboard' component={Link}>Dashboard</Anchor>
                <Anchor href='/dashboard/comic' component={Link}>Projects</Anchor>
                <Anchor href={`/dashboard/comic/${params.comicId}`} component={Link}>{comicData?.comic?.title}</Anchor>
                <Anchor>New chapter</Anchor>
            </Breadcrumbs>
            <FormProvider form={form}>

                <form style={{ position: 'relative' }} onReset={form.reset} onSubmit={form.onSubmit((values) => { onSubmit(values); console.log(values) })}>
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
                            <NumberInput {...form.getInputProps('volume')} label='Volume' min={minComicVolume + 1} max={minComicVolume + 1} />
                            <NumberInput  {...form.getInputProps('number')} label='Chapter' min={minComicNumber + 1} max={minComicNumber + 1.99} />
                            <TextInput  {...form.getInputProps('name')} label='Chapter name' style={{ flexGrow: 1 }} />
                        </Group>
                        <ManyImagesUpload width={'100%'} height={300} useFormContext={useFormContext} />
                        <InputError>{form.errors.images}</InputError>
                        {form.getInputProps('images').value && <DndFileList list={form.getInputProps('images').value} setValue={(files: FileWithPath[]) => { form.setFieldValue('images', files) }} />}
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