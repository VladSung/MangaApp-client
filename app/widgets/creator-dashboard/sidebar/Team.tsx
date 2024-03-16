'use client'

import { useDisclosure } from "@mantine/hooks"
import { AddTeam } from "../teams"
import { NavLink } from "@mantine/core"
import { IconPlus, IconUsers } from "@tabler/icons-react"
import { createContext, useState } from "react"
import { AddTeamFormInput } from "@/app/entities/team"
import { Avatar } from "@/app/shared/ui/Avatar"

type Props = {
    teams?: JSX.Element[]
    labels: {
        teams: string
        createTeam: string
    }
}

export const AddTeamWidget = ({ teams, labels }: Props) => {
    const [opened, { close, open }] = useDisclosure()
    const [newTeams, setNewTeams] = useState<({ __typename?: "Team" | undefined; avatar: string | null; id: string | null; name: string | null; } | undefined)[]>([])

    return (
        <>
            <NavLink variant='light' defaultOpened px={16} style={{ borderRadius: 99 }} label={labels.teams} leftSection={<IconUsers />}>
                {teams}
                {newTeams.map((team =>
                    <NavLink key={team?.id} variant='outline' px={16} style={{ borderRadius: 99 }}
                        label={team?.name}
                        href={`/dashboard/team/${team?.id}`}
                        leftSection={<Avatar size='sm' src={team?.avatar} alt="" />}
                    />
                ))}
                <NavLink onClick={open} variant='light' defaultOpened px={16} style={{ borderRadius: 99 }} label={labels.createTeam} leftSection={<IconPlus />} />
            </NavLink>
            <AddTeam open={opened} setNewTeams={setNewTeams} handleClose={close} />
        </>
    )
}