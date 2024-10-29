'use client';
import { useMutation } from '@apollo/client';
import { Button, Group, Modal, Rating, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconStarFilled } from '@tabler/icons-react';
import { useState } from 'react';

import { comicRateFragment, rateComicMutation } from '../api';

type Props = { rating?: number; totalCount?: number; lng: string; comicId: string };

export const RateButton = ({ rating = 0, totalCount = 0, comicId, lng }: Props) => {
    const formatter = Intl.NumberFormat(lng, { notation: 'compact' });
    const [opened, { close, open }] = useDisclosure();
    const [value, setValue] = useState(0);

    const [rate] = useMutation(rateComicMutation);

    const onRateHandler = () => {
        rate({
            variables: {
                input: {
                    id: comicId,
                    rating: value * 2,
                },
            },
            update: (cache, { data }) => {
                cache.updateFragment(
                    {
                        fragment: comicRateFragment,
                        id: comicId,
                    },
                    (fragmentData) => ({
                        id: comicId,
                        rating: data?.comic.rate.record,
                    })
                );
            },
        });
    };

    return (
        <>
            <Button onClick={open} variant="subtle" c="var(--mantine-color-text)" size="xs">
                <IconStarFilled size={14} />
                <Text inline span size="md" tt="uppercase">
                    <span>{rating.toFixed(1)}</span>
                    <span>/</span>
                    <Text inline span size="xs">
                        {`10 (votes: ${formatter.format(totalCount)})`}
                    </Text>
                </Text>
            </Button>
            <Modal centered opened={opened} title="Rate comic" onClose={close}>
                <Group mb="lg">
                    <Rating
                        size="xl"
                        defaultValue={2.5}
                        fractions={2}
                        value={value}
                        onChange={setValue}
                    />
                    <span>
                        <Text span inline fw={500}>
                            {value * 2}
                        </Text>
                        <Text span inline>
                            / 10
                        </Text>
                    </span>
                </Group>
                <Button onClick={onRateHandler}>Save</Button>
            </Modal>
        </>
    );
};
