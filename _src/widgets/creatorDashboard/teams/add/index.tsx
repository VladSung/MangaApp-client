'use client';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { ImageUpload } from '@/_src/entities/imageUpload';
import { AddTeamForm, AddTeamFormInput } from '@/_src/entities/team';
import { uploadImage } from '@/_src/features/uploadImage';
import { graphql } from '@/_src/shared/api/graphql';

const addTeamMutation = graphql(`
    mutation AddTeam($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
        }
    }
`);

type AddTeamProps = {
    open: boolean;
    handleClose: () => void;
};

export const Add = ({ open, handleClose }: AddTeamProps) => {
    const [addTeam] = useMutation(addTeamMutation);

    const onSubmit: SubmitHandler<AddTeamFormInput> = async (data) => {
        if (data?.image?.[0]) console.error('image not set');

        const imageData = await uploadImage({
            tags: ['team', data.name],
            image: data.image[0],
        });

        addTeam({
            variables: {
                input: {
                    avatar: imageData.data.public_id,
                    name: data.name,
                    tagline: data.tagline,
                },
            },
        });
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
