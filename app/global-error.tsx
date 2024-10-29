'use client'

import { AppShell, Button, Collapse, Title } from '@mantine/core';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <html lang='en'>
            <body>
                <AppShell>
                    <Title order={2}>Something went wrong!</Title>
                    <Collapse title="Show error" in={false}>
                        {JSON.stringify(error)}
                    </Collapse>
                    <Button onClick={() => reset()}>Try again</Button>
                </AppShell>
            </body>
        </html>
    );
}
