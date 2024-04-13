'use client';
import { ActionIcon, AppShellNavbar, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

import classes from './styles.module.css';

const Wrapper = ({ children }: PropsWithChildren) => {

    return (<AppShellNavbar className={classes['collapsed-links']} w={230} p='md'>
        <Flex direction='column' gap={10} style={{ padding: 0, margin: 0 }}>
            {children}
        </Flex>
    </AppShellNavbar>);
}

export default Wrapper;
