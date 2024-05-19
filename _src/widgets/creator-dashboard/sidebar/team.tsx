'use client'
import { gql, useMutation } from "@apollo/client";
import { Button, NavLink } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react"
import { useRouter } from "next/navigation";

import { ImageUpload } from '@src/entities/image-upload';
import { AddTeamForm } from '@src/entities/team';
import { FormInput } from '@src/entities/team/add-form';
import { graphql } from '@src/shared/api/graphql';
import { Avatar } from "@src/shared/ui/Avatar";
import { useEffect } from "react";
import { PageProps } from "@src/shared/types";
import { useTranslation } from "@src/shared/lib/i18n/client";
import { mutationWithUploadImages } from "@src/features/upload-image";

const addTeamMutation = graphql(`
    mutation AddTeamMutation($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
            avatar
        }
    }
`);


type Props = PageProps & {
    labels: {
        createTeam: string
    }
}

export const AddTeamWidget = ({ labels, params }: Props) => {

    const { t } = useTranslation(params.lng, 'dashboard/creator/team/index');

    const router = useRouter()
    const [opened, { close, open }] = useDisclosure()

    const [addTeam, { data, error }] = useMutation(addTeamMutation)

    const onSubmit = (values: FormInput) => {
        if (values.cover && values.name) {
            const { cover, name } = values;

            mutationWithUploadImages(images => {
                addTeam({
                    variables: {
                        input: {
                            name,
                            avatar: images?.data[0].path
                        }
                    },
                    update: (cache, { data: addTeam }) => {
                        cache.writeFragment({
                            id: `Team:${addTeam?.createTeam.id}`,
                            fragment: gql`
                            fragment _Team on Team {
                                id
                                avatar
                                name
                            }
                        `,
                            data: {
                                team: addTeam?.createTeam
                            }
                        });
                    }
                }).then((newTeam) => {
                    close();
                    router.push(`/dashboard/team/${newTeam.data?.createTeam.id}`)
                })

            }, { type: 'avatar', files: [values.cover], fileFolder: `teams/${name}` })
        }
    }

    useEffect(() => {
        data?.createTeam && notifications.show({ color: 'green', title: `Team: ${data?.createTeam.name}`, message: t('messages.create.success') })
        if (error?.name) {
            notifications.show({ color: 'red', title: t('messages.create.error'), message: error.message })
            console.log('error message: ', error.message + '\nerror extraInfo: ', error.extraInfo)
        }
    }, [data])

    return (
        <>

            {data?.createTeam && <NavLink key={data.createTeam.id} variant='outline' px={16} style={{ borderRadius: 99 }}
                label={data.createTeam.name}
                href={`/dashboard/team/${data.createTeam.id}`}
                leftSection={<Avatar size='sm' src={data.createTeam.avatar} alt={data.createTeam.name || ''} />} />}
            <Button
                onClick={open}
                fullWidth
                color='default'
                fw={400}
                variant='subtle'
                px={16}
                style={{ borderRadius: 99 }}
                leftSection={<IconPlus />}
            >{labels.createTeam}</Button>

            <AddTeamForm
                t={t}
                ImageUpload={ImageUpload}
                onSubmit={onSubmit}
                open={opened}
                handleClose={close}
            />
        </>
    )
}
