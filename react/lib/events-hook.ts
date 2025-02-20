import { useEvent } from "jb-core/react";
import { RefObject } from "react";
import type { JBSwitchEventType, JBSwitchWebComponent } from 'jb-switch';

export type EventProps = {
  /**
   * when component loaded, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onLoad?: (e: JBSwitchEventType<CustomEvent>) => void,
  /**
 * when all property set and ready to use, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
 */
  onInit?: (e: JBSwitchEventType<CustomEvent>) => void,
  onChange?: (e: JBSwitchEventType<Event>) => void,
  onBeforeChange?: (e: JBSwitchEventType<Event>) => void,

}
export function useEvents(element: RefObject<JBSwitchWebComponent>, props: EventProps) {
  useEvent(element, 'load', props.onLoad, true);
  useEvent(element, 'init', props.onInit, true);
  useEvent(element, 'change', props.onChange);
  useEvent(element, 'before-change', props.onBeforeChange);
}