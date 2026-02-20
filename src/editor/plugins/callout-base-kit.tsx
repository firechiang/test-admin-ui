import { BaseCalloutPlugin } from '@platejs/callout';

import { CalloutElementStatic } from '@/editor/ui/callout-node-static';

export const BaseCalloutKit = [
  BaseCalloutPlugin.withComponent(CalloutElementStatic),
];
