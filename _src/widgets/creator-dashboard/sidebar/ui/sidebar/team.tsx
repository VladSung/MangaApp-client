'use client';
import { gql, useMutation } from '@apollo/client';
import { Button, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { OneImageUpload } from '@src/entities/image-upload';
import { AddTeamFormModal, AddTeamFormTypes, addTeamMutation } from '@src/entities/team/';
import { uploadImage } from '@src/features/upload-image';
import { PageProps } from '@src/shared/api/types';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { Avatar } from '@src/shared/ui';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

type Props = PageProps & {
    labels: {
        createTeam: string;
    };
};

export const AddTeamWidget = ({ labels, params }: Props) => {
    const { lng } = use(params);
    const { t } = useTranslation(lng, 'dashboard/creator/team/index');

    const router = useRouter();
    const [opened, { close, open }] = useDisclosure();

    const [addTeam, { data, error }] = useMutation(addTeamMutation);

    const onSubmit = async (values: AddTeamFormTypes.FormInput) => {
        if (values.cover && values.name) {
            const { cover, name } = values;
            const image = await uploadImage(cover, false);

            addTeam({
                variables: {
                    input: {
                        name,
                        avatar: image.data?.key,
                    },
                },
                update: (cache, { data: addTeam }) => {
                    cache.writeFragment({
                        id: `Team:${addTeam?.team?.create.record?.id}`,
                        fragment: gql`
                            fragment _Team on Team {
                                id
                                avatar
                                name
                            }
                        `,
                        data: {
                            team: addTeam?.team?.create.record,
                        },
                    });
                },
            }).then((newTeam) => {
                if (newTeam.data?.team.create.issue || newTeam.errors) {
                    notifications.show({
                        color: 'red',
                        title: t('messages.create.error'),

                        // TODO!: DON'T USE HARDCODED MESSAGE, rewrite it with error handling
                        message: newTeam.data?.team.create.issue?.message || 'Something went wrong',
                    });
                } else if (newTeam.data?.team.create.record) {
                    notifications.show({
                        color: 'green',
                        title: `Team: ${newTeam.data.team?.create.record.name}`,
                        message: t('messages.create.success'),
                    });
                }
                close();
                router.push(`/dashboard/team/${newTeam.data?.team?.create.record?.id}`);
            });
        }
    };

    return (
        <>
            {data?.team?.create.record && (
                <NavLink
                    key={data?.team?.create.record?.id}
                    variant="outline"
                    px={16}
                    style={{ borderRadius: 99 }}
                    label={data?.team?.create.record.name}
                    href={`/dashboard/team/${data?.team?.create.record.id}`}
                    leftSection={
                        <Avatar
                            size="sm"
                            src={data?.team?.create.record.avatar}
                            alt={data?.team?.create.record.name || ''}
                        />
                    }
                />
            )}
            <Button
                onClick={open}
                fullWidth
                color="default"
                fw={400}
                variant="subtle"
                px={16}
                style={{ borderRadius: 99 }}
                leftSection={<IconPlus />}
            >
                {labels.createTeam}
            </Button>

            <AddTeamFormModal
                t={t}
                ImageUpload={OneImageUpload}
                onSubmit={onSubmit}
                open={opened}
                handleClose={close}
            />
        </>
    );
};
