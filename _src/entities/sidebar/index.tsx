/** @jsxImportSource @emotion/react */
import { NavLink } from '@/_src/shared/ui/NavLink';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SxProps,
    Theme,
    Typography,
} from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { ReactNode } from 'react';

type ListCreatorProps = {
    open?: boolean;
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
            {list.map((item) => {
                return (
                    <ListItem key={item.link} sx={{ padding: '4px 8px' }}>
                        <ListItemButton
                            component={NavLink}
                            href={item.link}
                            exact={item.exact}
                            divider={item.withBottomDivider}
                            sx={{
                                'justifyContent': open ? 'initial' : 'center',

                                'borderRadius': '8px',
                                '& .MuiListItemText-root': {
                                    margin: 0,
                                },
                                '& .MuiTypography-root': {
                                    fontSize: open ? undefined : 0,
                                    margin: 0,
                                },

                                '&.active': {
                                    'background': (theme) => theme.vars.palette.primary.main,
                                    '& .MuiListItemIcon-root': {
                                        color: (theme) => theme.vars.palette.primary.contrastText,
                                    },
                                    '& .MuiTypography-root': {
                                        color: (theme) => theme.vars.palette.primary.contrastText,
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText disableTypography sx={{ opacity: open ? 1 : 0 }}>
                                <Typography sx={{ fontSize: (theme) => theme.typography.fontSize }}>
                                    {item.text}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
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
    sx?: SxProps<Theme>;
};

export const Sidebar = ({ open, Header, children, sx, ...props }: SidebarProps) => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            sx={{
                'width': open ? 200 : 57,
                'height': '100%',
                'display': { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                    overflowX: 'hidden',
                    position: 'static',
                    minHeight: 'calc(100vh - 64px)',
                    boxSizing: 'border-box',
                },
                ...sx,
            }}
            {...props}
        >
            {Header}
            <Divider />
            {children}
        </Drawer>
    );
};
