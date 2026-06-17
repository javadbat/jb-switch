import type { JBSwitchWebComponent, ValidationValue } from "jb-switch";
import type { ValidationItem } from "jb-validation";
import { type RefObject, useEffect } from "react";

export type JBSwitchAttributes = {
  validationList?: ValidationItem<ValidationValue>[] | null,
  value?: boolean | null,
  isLoading?: boolean | null,
  disabled?: boolean | null,
  required?: boolean | null,
  trueTitle?: string | null,
  falseTitle?: string | null,
}
export function useJBSwitchAttribute(element: RefObject<JBSwitchWebComponent | null>, props: JBSwitchAttributes) {

  useEffect(() => {
    if (element.current && Array.isArray(props.validationList)) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList, element.current]);

  useEffect(() => {
    if (element.current && typeof props.value === "boolean") {
      element.current.value = props.value;
    }
  }, [props.value, element.current]);

  useEffect(() => {
    if (element.current && typeof props.isLoading === "boolean") {
      element.current.isLoading = props.isLoading;
    }
  }, [props.isLoading, element.current]);

  useEffect(() => {
    if (element.current && typeof props.disabled === "boolean") {
      element.current.disabled = props.disabled;
    }
  }, [props.disabled, element.current]);

  useEffect(() => {
    if (element.current && typeof props.required === "boolean") {
      element.current.required = props.required;
    }
  }, [props.required, element.current]);

  useEffect(() => {
    if (element.current) {
      element.current.setAttribute("true-title", props.trueTitle || "");
    }
  }, [props.trueTitle, element.current]);

  useEffect(() => {
    if (element.current) {
      element.current.setAttribute("false-title", props.falseTitle || "");
    }
  }, [props.falseTitle, element.current]);
}
