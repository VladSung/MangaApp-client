'use server';
import { AddTeamFormInput } from '@/app/entities/team';
import { uploadImages } from '@/app/features/upload-image';
import { graphql } from '@/app/shared/api/graphql';
import { getClient } from '@/app/shared/lib/apollo/client';

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
