import {EventTypeWithTarget} from "jb-core";
import { JBSwitchWebComponent } from "./jb-switch";
export type ElementsObject = {
    componentWrapper:HTMLButtonElement,
    trueText:HTMLSpanElement,
    falseText:HTMLSpanElement,
    switch:SVGElement,
    triggerCircleBar:SVGCircleElement,
    triggerButton:SVGGElement
}
export type ValidationValue = boolean;

export type JBSwitchEventType<TEvent> = EventTypeWithTarget<TEvent,JBSwitchWebComponent>
