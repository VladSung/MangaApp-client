import { Button, Container, Group, Text, Title } from '@mantine/core';

import classes from './server-error.module.css';

export function ServerError({ reset }: { reset: () => void }) {
    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>500</div>
                <Title className={classes.title}>Something bad just happened...</Title>
                <Text size="lg" ta="center" className={classes.description}>
                    Our servers could not handle your request. Don&apos;t worry, our development
                    team was already notified. Try refreshing the page.
                </Text>
                <Group justify="center">
                    <Button onClick={reset} size="md">
                        Refresh the page
                    </Button>
                </Group>
            </Container>
        </div>
    );
}
