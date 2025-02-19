/* eslint-disable @typescript-eslint/no-explicit-any */

import { cx, styled } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';

import type { SidebarLinkItem } from '~/src/types';

const Link = styled(Box, {
  py: '$1',
  px: '$2',
  color: '$gray10',
  borderRadius: '$md',
  '&:focus, &:hover': {
    color: '$gray11',
    background: '$whiteA3',
  },
  '&.active': {
    color: '#00F58C',
    background: '#001a0e',
  },
  '&:focus': {
    outline: 'none',
  },
});

export type SidebarLinkProps = {
  item: SidebarLinkItem;
  handleClick: () => void
};

export const SidebarLink = forwardRef<unknown, SidebarLinkProps>(
  ({ item, handleClick }, ref) => {
    const pathname = usePathname() || '';
    const fullSlug = `/docs/${item.slug}`;
    const isActive = cx({
      active:
        (pathname === '/' && fullSlug === '/docs/install') ||
        pathname.includes(fullSlug),
    });
    return (
      <Link onClick={handleClick} style={{flexGrow: 1}} ref={ref} as={NextLink as any} href={fullSlug} className={isActive}>
        {item.label}
      </Link>
    );
  }
);
