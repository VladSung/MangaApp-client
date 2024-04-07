'use client'
import { NavLink } from "@mantine/core"
import { IconPlus, IconUsers } from "@tabler/icons-react"
<<<<<<< HEAD:app/widgets/creator-dashboard/sidebar/Team.tsx
import { ImageUpload } from '@/app/entities/image-upload';
import { AddTeamForm } from '@/app/entities/team';
import { graphql } from '@/app/shared/api/graphql';

import { FormInput } from '@/app/entities/team/add-form';
import { useDisclosure } from '@mantine/hooks';
import { gql, useMutation } from "@apollo/client";
import { uploadImages } from "@/app/features/upload-image";
import { Avatar } from "@/app/shared/ui/Avatar";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

const addTeamMutation = graphql(`
    mutation AddTeamMutation($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
            avatar
        }
    }
`);

=======
import { FormInput } from '@/app/entities/team/add-form';
import { AddTeam } from "../teams"
>>>>>>> b266a19677a2f8b68dd7fd41210ca504ad3da883:app/widgets/creator-dashboard/sidebar/team.tsx

type Props = {
    labels: {
        createTeam: string
    }
}

<<<<<<< HEAD:app/widgets/creator-dashboard/sidebar/Team.tsx
export const AddTeamWidget = ({ labels }: Props) => {

    const router = useRouter()
    const [opened, { close, open }] = useDisclosure()

    const [addTeam, { data }] = useMutation(addTeamMutation)


    const onSubmit = async (values: FormInput) => {
        if (values.cover) {
            const { cover, name } = values;
            const imagePath = await uploadImages([cover], values.name)

            const newTeam = await addTeam({
                variables: {
                    input: {
                        name,
                        avatar: imagePath.data[0].path
                    }
                },
                update: (cache, { data: addTeam }) => {
                    cache.writeFragment({
                        id: `Team:${addTeam?.createTeam.id}`,
                        fragment: gql`
                            fragment _ on Team {
                            team {
                                id
                                avatar
                                name
                            }
                            }
                        `,
                        data: {
                            team: addTeam?.createTeam
                        }
                    });
                }
            })
            close();
            newTeam.data?.createTeam && notifications.show({ title: `Team: ${newTeam.data?.createTeam.name}`, message: "Team successfully created" })
            router.push(`/dashboard/team/${newTeam.data?.createTeam.id}`)
        }
    }

=======
export const AddTeamWidget = ({ teams, labels }: Props) => {
    const onSubmit = (values: FormInput) => {
        // addTeam({ input: values })
        console.log(values)
    }
    
>>>>>>> b266a19677a2f8b68dd7fd41210ca504ad3da883:app/widgets/creator-dashboard/sidebar/team.tsx
    return (
        <>

            {data?.createTeam && <NavLink key={data.createTeam.id} variant='outline' px={16} style={{ borderRadius: 99 }}
                label={data.createTeam.name}
                href={`/dashboard/team/${data.createTeam.id}`}
                leftSection={<Avatar size='sm' src={data.createTeam.avatar} alt={data.createTeam.name || ''} />} />}
            <NavLink onClick={open} variant='light' defaultOpened px={16} style={{ borderRadius: 99 }} label={labels.createTeam} leftSection={<IconPlus />} />

            <AddTeamForm
                ImageUpload={ImageUpload}
                onSubmit={onSubmit}
                open={opened}
                handleClose={close}
            />
        </>
    )
}