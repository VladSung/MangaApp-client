import { Box, Text, Title } from '@mantine/core';

type Properties = {
    errorCode: string;
    message: string;
    children?: React.ReactNode;
};

export const Error = ({ errorCode, message, children }: Properties) => {
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Title mb={3} order={1} variant="h2">
                {errorCode}
            </Title>
            <Text
                mb={children ? 16 : 16}
                style={{ textAlign: 'center', maxWidth: 360 }}
                variant="subtitle1"
                component={'p'}
            >
                {message}
            </Text>
            {children}
        </Box>
    );
};
