'use client';
import Link, { LinkProps } from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode, RefObject, forwardRef } from 'react';

export type NavLinkProps = LinkProps & {
    exact?: boolean;
    children: ReactNode;
    className?: string;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ exact, href, locale, children, ...props }, ref) => {
        const pathname = usePathname();
        const { lng } = useParams();
        const stringHref = href.toString();
        const active = ' active';
        let isActive: boolean;
        isActive = exact ? pathname === stringHref : pathname?.startsWith(stringHref);

        //! Хак так как на клиенте не работает с локализацией
        if (lng && !isActive) {
            const hrefWithLng = `/${lng as string}${stringHref}`;
            isActive = exact ? pathname === hrefWithLng : pathname?.startsWith(hrefWithLng);
        }
        if (isActive) {
            props.className += active;
        }

        return (
            <Link href={href} legacyBehavior passHref>
                <a {...props} ref={ref}>
                    {children}
                </a>
            </Link>
        );
    }
);
