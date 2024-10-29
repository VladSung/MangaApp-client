import { Button, List, ListItem, Text } from '@mantine/core';
import { NavLink } from '@src/shared/ui/NavLink';
import { ReactNode } from 'react';

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
        //  ={(theme) => ({ [theme.breakpoints.down('md')]: { display: 'flex', maxWidth: '100vw', height: 'max-content', overflowY: 'auto' } })} */} +
        list.map((item) => {
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
        })
    );
};
