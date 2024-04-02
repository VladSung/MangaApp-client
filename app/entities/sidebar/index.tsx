import {
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    Text,
} from '@mantine/core';
import { ReactNode } from 'react';

import { NavLink } from '@/app/shared/ui/NavLink';

type ListCreatorProps = {
    open?: boolean;
    mobile?: boolean;
    list: {
        exact?: boolean;
        icon: ReactNode;
        text: ReactNode;
        link: string;
        withBottomDivider?: boolean;
    }[];
};

export const ListCreator = ({ list, open }: ListCreatorProps) => {
    return (
        <List>
            {/* ={(theme) => ({ [theme.breakpoints.down('md')]: { display: 'flex', maxWidth: '100vw', height: 'max-content', overflowY: 'auto' } })} */}
            {list.map((item) => {
                return (
                    <ListItem key={item.link} style={{ padding: open ? '4px 8px' : '4px' }}>
                        <Button
                            component={NavLink}
                            href={item.link}
                            exact={item.exact}

                            style={{
                                'justifyContent': open ? 'initial' : 'center',
                                'flexDirection': open ? 'row' : 'column',
                                'borderRadius': '8px',
                                '& .MuiListItemText-root': {
                                    margin: 0,
                                },
                                '& .MuiTypography-root': {
                                    margin: 0,
                                },

                                '&.active': {
                                    // 'background': (theme) => theme.vars.palette.secondary.main,
                                    // '& .MuiListItemIcon-root': {
                                    //     color: (theme) => theme.vars.palette.secondary.contrastText,
                                    // },
                                    // '& .MuiTypography-root': {
                                    //     color: (theme) => theme.vars.palette.secondary.contrastText,
                                    // },
                                },
                            }}
                        >
                            {/* <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 0,
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon> */}
                            <Text
                                variant="body2"
                                style={
                                    open
                                        ? {}
                                        : {
                                            fontSize: 10,
                                            textAlign: 'center',
                                            width: 40,
                                            mt: 4,
                                            overflow: 'hidden',
                                            display: 'block',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }
                                }
                            >
                                {item.text}
                            </Text>
                        </Button>
                    </ListItem>
                );
            })}
        </List>
    );
};

type SidebarProps = {
    open: boolean;
    Header: React.ReactNode;
    staticMode?: boolean;
    children: React.ReactNode;
};

export const Sidebar = ({ open, Header, children, ...props }: SidebarProps) => {
    return (
        <Drawer
            variant="permanent"
            opened={open}
            onClose={() => {}}
            component='aside'
            style={{
                'width': open ? 200 : 57,
                'height': '100%',
                // 'display': { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                    overflowX: 'hidden',
                    position: 'static',
                    // background: (theme) => `rgb(${theme.vars.palette.background.defaultChannel} / .7)`,
                    minHeight: 'calc(100vh - 64px)',
                    boxSizing: 'border-box',
                },
            }}
            {...props}
        >
            {Header}
            <Divider />
            {children}
        </Drawer>
    );
};
