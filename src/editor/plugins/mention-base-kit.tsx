import { BaseMentionPlugin } from '@platejs/mention';

import { MentionElementStatic } from '@/editor/ui/mention-node-static';

export const BaseMentionKit = [
  BaseMentionPlugin.withComponent(MentionElementStatic),
];
