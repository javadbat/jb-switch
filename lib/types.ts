import {EventTypeWithTarget} from "jb-core";
import { JBSwitchWebComponent } from "./jb-switch";
export type ElementsObject = {
    componentWrapper:HTMLDivElement,
    trueText:HTMLDivElement,
    falseText:HTMLDivElement,
    switch:SVGElement,
    triggerCircleBar:SVGCircleElement,
    triggerButton:SVGGElement
}
export type ValidationValue = boolean;

export type JBSwitchEventType<TEvent> = EventTypeWithTarget<TEvent,JBSwitchWebComponent>