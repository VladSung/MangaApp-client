'use client';
import { useMutation } from '@apollo/client';

import { ImageUpload } from '@/app/entities/image-upload';
import { AddTeamForm, AddTeamFormInput } from '@/app/entities/team';
import { uploadImage } from '@/app/features/upload-image';
import { graphql } from '@/app/shared/api/graphql';
import { notifications } from '@mantine/notifications';
import { teamsQuery } from '../../sidebar/queries';
import { Dispatch, SetStateAction } from 'react';

const addTeamMutation = graphql(`
    mutation AddTeamMutation($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
            avatar
        }
    }
`);

type AddTeamProps = {
    open: boolean;
    setNewTeams: Dispatch<SetStateAction<({ __typename?: "Team" | undefined; avatar: string | null; id: string | null; name: string | null; } | undefined)[]>>;
    handleClose: () => void;
};

export const Add = ({ open, setNewTeams, handleClose }: AddTeamProps) => {
    const [addTeam] = useMutation(addTeamMutation);

    const onSubmit: (data: AddTeamFormInput) => void = async (data) => {
        if (!data?.cover) {
            throw new Error('image not set');
        }

        const imageData = await uploadImage(data.cover, data.name);

        const newTeam = await addTeam({
            variables: {
                input: {
                    avatar: imageData.imageId,
                    name: data.name,
                    tagline: data.tagline,
                },
            },
            refetchQueries: [teamsQuery]
        });
        setNewTeams((prev) => ([...prev, newTeam.data?.createTeam]))
        notifications.show({ message: 'Команда успешно создана' })

    };

    return (
        <AddTeamForm
            ImageUpload={ImageUpload}
            onSubmit={onSubmit}
            open={open}
            handleClose={handleClose}
        />
    );
};
