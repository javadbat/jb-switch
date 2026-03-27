import type { JBSwitchWebComponent, ValidationValue } from "jb-switch";
import type { ValidationItem } from "jb-validation";
import { type RefObject, useEffect } from "react";

export type JBSwitchAttributes = {
  validationList?: ValidationItem<ValidationValue>[] | null,

}
export function useJBSwitchAttribute(element: RefObject<JBSwitchWebComponent>, props: JBSwitchAttributes) {

  useEffect(() => {
    if (element.current && Array.isArray(props.validationList)) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList, element.current]);
}