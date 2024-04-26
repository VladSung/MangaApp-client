'use client'
import { graphql } from "@src/shared/api/graphql"
import { useMutation } from "@apollo/client"
import { ActionIcon, Modal, Fieldset, Button, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconSettings } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type Props = {
    params: {
        comicId: string
    }
}

const deleteComicMutation = graphql(`
mutation deleteComic($id:ID!){
    deleteComic(id:$id){
        id
        title
    }
}
`)

export const SettingsModal = ({ params }: Props) => {

    const router = useRouter()
    const [opened, { open, close }] = useDisclosure(false)
    const [deleteComic, { data }] = useMutation(deleteComicMutation)

    const deleteComicHandler = () => {
        deleteComic({
            variables: { id: params.comicId },
            update: (cache, { data }) => {
                cache.evict({
                    id: `Comic:${data?.deleteComic.id}`
                });

                cache.gc();
            }
        })
        router.push('/dashboard/comic')
    }

    useEffect(() => {
        data?.deleteComic.id && notifications.show({ color: 'green', title: `Comic ${data?.deleteComic.title} deleted`, message: 'The comic has been deleted successfully.' })
    }, [data?.deleteComic.id])

    return (<>
        <ActionIcon onClick={open} variant='outline' title='Settings' aria-label='Settings' size='md'>
            <IconSettings size={16} />
        </ActionIcon>

        <Modal opened={opened} onClose={close} title='Settings'>
            <Fieldset color='red' legend="Danger Zone">
                <Text mb={8} size='md' fw={700}>Delete this comic</Text>
                <Text mb={24} size='sm'>Once you delete a comic, there is no going back. Please be certain.</Text>
                <Button onClick={deleteComicHandler} color='red' variant='light'>Delete comic</Button>

            </Fieldset>
        </Modal>
    </>)
}