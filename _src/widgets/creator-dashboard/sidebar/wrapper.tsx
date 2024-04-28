'use client';
import { AppShellNavbar, Flex } from "@mantine/core";
import { PropsWithChildren } from "react";

import classes from './styles.module.css';

const Wrapper = ({ children }: PropsWithChildren) => {

    return (
        <AppShellNavbar w={230} p='md' className={classes.nav}>
            <Flex className={classes.navInner} gap={10} >
                {children}
            </Flex>
        </AppShellNavbar>
    );
}

export default Wrapper;
