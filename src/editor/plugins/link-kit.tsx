'use client';

import { LinkPlugin } from '@platejs/link/react';

import { LinkElement } from '@/editor/ui/link-node';
import { LinkFloatingToolbar } from '@/editor/ui/link-toolbar';

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
