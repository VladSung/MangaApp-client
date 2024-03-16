'use client';

import { Button, ButtonProps } from '@mui/material';
import { forwardRef } from 'react';

import { NavLink, NavLinkProps } from '@/app/shared/ui/NavLink';

export const StyledButton = forwardRef<
    HTMLButtonElement,
    NavLinkProps & Omit<ButtonProps, 'component'>
>(({ href, children, ...props }, ref) => {
    return (
        <Button {...props} href={href.toString()} ref={ref} LinkComponent={NavLink}>
            {children}
        </Button>
    );
});
