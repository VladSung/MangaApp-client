import { NavLink } from "@mantine/core"
import { IconPlus, IconUsers } from "@tabler/icons-react"
import { AddTeam } from "../teams"
import { addTeam } from "@/app/features/team"
import { FormInput } from '@/app/entities/team/add-form';

type Props = {
    teams?: JSX.Element[]
    labels: {
        teams: string
        createTeam: string
    }
}

export const AddTeamWidget = ({ teams, labels }: Props) => {
    const onSubmit = async (values: FormInput) => {
        'use server'
        addTeam({ input: values })
    }
    return (
        <>
            <NavLink variant='light' defaultOpened px={16} style={{ borderRadius: 99 }} label={labels.teams} leftSection={<IconUsers />}>
                {teams}
                <NavLink variant='light' defaultOpened px={16} style={{ borderRadius: 99 }} label={labels.createTeam} leftSection={<IconPlus />} />
            </NavLink>
            <AddTeam onSubmit={onSubmit} />
        </>
    )
}
