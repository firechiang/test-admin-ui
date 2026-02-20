import { BaseLinkPlugin } from '@platejs/link';

import { LinkElementStatic } from '@/editor/ui/link-node-static';

export const BaseLinkKit = [BaseLinkPlugin.withComponent(LinkElementStatic)];
