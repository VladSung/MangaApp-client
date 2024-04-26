'use client'

import { AppShell, Button, Title } from "@mantine/core";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    console.log(error);

    return (
        <html>
            <body>
                <AppShell>
                    <Title order={2}>Something went wrong!</Title>
                    {JSON.stringify(error)}
                    <Button onClick={() => reset()}>Try again</Button>

                </AppShell>
            </body>
        </html>
    );
}
