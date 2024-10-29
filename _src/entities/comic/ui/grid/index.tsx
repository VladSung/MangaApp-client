import { SimpleGrid } from '@mantine/core';
import { PropsWithChildren } from 'react';

export const Grid = ({ children }: PropsWithChildren) => {
    return (
        <SimpleGrid
            type="container"
            cols={{
                'base': 1,
                '220px': 2,
                '300px': 3,
                '450px': 4,
                '600px': 5,
                '800px': 6,
                '1000px': 8,
            }}
        >
            {children}
        </SimpleGrid>
    );
};
