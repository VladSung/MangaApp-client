import { Box, Text, Title } from '@mantine/core';

type Properties = {
    errorCode: string;
    message: string;
    children?: React.ReactNode;
};

export const Error = ({ errorCode, message, children }: Properties) => {
    return (
        <Box
            mt='md'
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Title mb={8} order={1} variant="h2">
                {errorCode}
            </Title>
            <Text
                mb={children ? 24 : 16}
                style={{ textAlign: 'center', overflowWrap: 'anywhere', maxWidth: 360 }}
                variant="subtitle1"
                component={'p'}
            >
                {message}
            </Text>
            {children}
        </Box>
    );
};
