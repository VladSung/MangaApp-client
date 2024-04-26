import { AppShellMain, Flex } from '@mantine/core';

import { PageProps } from '@src/shared/types';
import { NotFoundError } from '@src/widgets/not-found';

const NotFoundPage = ({ params }: PageProps) => {
    return (
        <AppShellMain>
            <Flex h='100%' justify='center'>
                <NotFoundError
                    params={params}
                />
            </Flex>
        </AppShellMain>
    );
};

export default NotFoundPage;
