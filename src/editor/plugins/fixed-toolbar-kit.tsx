'use client';

import { createPlatePlugin } from 'platejs/react';

import { FixedToolbar } from '@/editor/ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/editor/ui/fixed-toolbar-buttons';

export const FixedToolbarKit = [
  createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
      beforeEditable: () => (
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
      ),
    },
  }),
];
