'use client';

import { NavLink, NavLinkProps } from '@/_src/shared/ui/NavLink';
import { Button, ButtonProps } from '@mui/material';
import { forwardRef } from 'react';

export const StyledButton = forwardRef<
    HTMLButtonElement,
    NavLinkProps & Omit<ButtonProps, 'component'>
>(({ href, children, ...props }, ref) => {
    return (
        <Button
            {...props}
            href={href.toString()}
            ref={ref}
            LinkComponent={NavLink}
            sx={{
                '&.active': {
                    color: (theme) => theme.vars.palette.secondary.main,
                },
            }}
        >
            {children}
        </Button>
    );
});
