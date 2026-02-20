import { BaseTogglePlugin } from '@platejs/toggle';

import { ToggleElementStatic } from '@/editor/ui/toggle-node-static';

export const BaseToggleKit = [
  BaseTogglePlugin.withComponent(ToggleElementStatic),
];
