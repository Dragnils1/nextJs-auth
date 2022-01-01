import NextLink from 'next/link';
import { FC } from 'react';

export { Link };

const Link: FC<{href: string, }> = ({ href, children, ...props }) => {
    return (
        <NextLink href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}