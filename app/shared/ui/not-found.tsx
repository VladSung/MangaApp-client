import { Flex } from '@mantine/core';

import { PageProps } from '@/app/shared/types';
import Maskot from '@/app/shared/ui/maskot';
import { NotFoundError } from '@/app/widgets/not-found';

const NotFoundPage = ({ params }: PageProps) => {
    return (
        <Flex h='100%' justify='space-between'>
            <NotFoundError
                params={params}
            />
            <Maskot params={params} />
        </Flex>
    );
};

export default NotFoundPage;
