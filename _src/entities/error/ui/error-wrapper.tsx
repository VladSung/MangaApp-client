'use client';

import { AppShellMain, Button } from '@mantine/core';
import { ErrorComponent } from '@src/entities/error';

import { ServerError } from './server-error';

export const ErrorWrapper = ({ error, reset }: { error: Error; reset: () => void }) => {
    console.log(error);

    if (error.message === 'fetch failed') {
        return <ServerError reset={reset} />;
    }

    return (
        <AppShellMain>
            <ErrorComponent errorCode={error.name} message={error.message}>
                <Button onClick={() => reset()}>Try again</Button>
            </ErrorComponent>
        </AppShellMain>
    );
};
