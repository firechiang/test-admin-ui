import { BaseTocPlugin } from '@platejs/toc';

import { TocElementStatic } from '@/editor/ui/toc-node-static';

export const BaseTocKit = [BaseTocPlugin.withComponent(TocElementStatic)];
