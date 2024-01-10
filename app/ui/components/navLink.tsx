'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const NavLink = ({ href, ...props }: NavLinkProps) => {
  const pathname = usePathname();

  if (pathname === href) {
    return (
      <span className="pointer-events-none text-blue-900" {...props}>
        {props.children}
      </span>
    );
  }

  return (
    <Link href={href} className="text-blue-600 hover:text-blue-800" {...props}>
      {props.children}
    </Link>
  );
};
