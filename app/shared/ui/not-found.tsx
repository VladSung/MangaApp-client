import { Flex } from '@mantine/core';

import { PageProps } from '@/app/shared/types';
import { NotFoundError } from '@/app/widgets/not-found';

const NotFoundPage = ({ params }: PageProps) => {
    return (
        <Flex h='100%' justify='space-between'>
            <NotFoundError
                params={params}
            />
        </Flex>
    );
};

export default NotFoundPage;
