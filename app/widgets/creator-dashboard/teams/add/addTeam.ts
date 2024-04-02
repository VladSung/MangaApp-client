'use server'
import { uploadImages } from '@/app/features/upload-image';
import { getClient } from '@/app/shared/lib/apollo/client';
import { graphql } from '@/app/shared/api/graphql';
import { teamsQuery } from '../../sidebar/queries';
import { AddTeamFormInput } from '@/app/entities/team';

const addTeamMutation = graphql(`
    mutation AddTeamMutation($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
            avatar
        }
    }
`);

export const AddTeam: (data: AddTeamFormInput) => void = async (data) => {

        if (!data?.cover) {
            throw new Error('image not set');
        }

        const imageData = await uploadImages([data.cover], data.name);

        const newTeam = await getClient().mutate({
            mutation: addTeamMutation,
            variables: {
                input: {
                    avatar: imageData.data[0].path,
                    name: data.name,
                    tagline: data.tagline,
                },
            },
        });

    };
