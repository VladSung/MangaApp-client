'use client'
import { ImageUpload } from '@/app/entities/image-upload';
import { AddTeamForm } from '@/app/entities/team';
import { graphql } from '@/app/shared/api/graphql';

import { FormInput } from '@/app/entities/team/add-form';
import { useDisclosure } from '@mantine/hooks';

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
    onSubmit: (values: FormInput) => void
};

export const Add = ({ onSubmit }: AddTeamProps) => {

    const [opened, { close, open }] = useDisclosure(true)


    return (
        <AddTeamForm
            ImageUpload={ImageUpload}
            onSubmit={onSubmit}
            open={opened}
            handleClose={close}
        />
    );
};
