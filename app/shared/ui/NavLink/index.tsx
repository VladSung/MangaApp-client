'use client';
import { NavLink as Link, NavLinkProps as MantineLinkProps } from '@mantine/core';
import NextLink, { LinkProps } from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import classes from './styles.module.css';
export type NavLinkProps = LinkProps & MantineLinkProps & {
    exact?: boolean;
    decorative?: boolean;
    className?: string;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ exact, href, decorative, ...props }, ref) => {

        const pathname = usePathname();
        const { lng } = useParams();
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const stringHref = href.toString();

        let active: boolean;
        active = exact ? pathname === stringHref : pathname?.startsWith(stringHref);

        //! Хак так как на клиенте не работает с локализацией
        if (lng && !active) {
            const hrefWithLng = `/${lng as string}${stringHref}`;
            active = exact ? pathname === hrefWithLng : pathname?.startsWith(hrefWithLng);
        }

        return (
            <Link className={classes.link} component={decorative ? undefined : NextLink} href={href} active={active}  {...props} ref={ref} />
        );
    }
);
