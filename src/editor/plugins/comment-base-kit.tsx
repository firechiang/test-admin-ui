import { BaseCommentPlugin } from '@platejs/comment';

import { CommentLeafStatic } from '@/editor/ui/comment-node-static';

export const BaseCommentKit = [
  BaseCommentPlugin.withComponent(CommentLeafStatic),
];
