'use client'
import { graphql } from "@/app/shared/api/graphql"
import { useTranslation } from "@/app/shared/lib/i18n/client"
import { useMutation } from "@apollo/client"
import { ActionIcon, Button } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react"

// const addToBookmarkMutation = graphql(`
//     mutation addToBookmark($id: ID!){
//         addBookmark(id: $id){
//             id
//         }
//     }
// `)

const Add = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'comic/id')

    // const [addToBookmark] = useMutation(addToBookmarkMutation, { errorPolicy: 'all' })

    return (
        <>
            <ActionIcon size='lg' hiddenFrom='sm' aria-label={t('add-bookmark')}>
                <IconBookmark size={20} />
                <IconBookmarkFilled size={20} />
            </ActionIcon>
            <Button visibleFrom='sm' mb={16} size="xs" leftSection={<IconBookmark size={20} />} variant="default" fullWidth>
                {t('add-bookmark')}
            </Button>
        </>
    )
}

export default Add;