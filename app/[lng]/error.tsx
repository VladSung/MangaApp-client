'use client'

import { Error as ErrorEntity } from "@src/entities/error";
import { AppShellMain, Button } from "@mantine/core";

const ErrorComponent = ({ error, reset }: { error: Error, reset: () => void }) => {

    return (<AppShellMain>
        <ErrorEntity errorCode={error.name} message={error.message}>
            <Button onClick={() => reset()}>Try again</Button>
        </ErrorEntity>
    </AppShellMain>);
};

export default ErrorComponent;
