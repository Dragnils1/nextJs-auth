import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FC } from 'react';

import { Link } from './Link';


const NavLink: FC<{ href: string, exact: boolean, className: string}> = ({ children, href, exact, ...props }) => {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return <Link href={href} {...props}>{children}</Link>;
}

export { NavLink };