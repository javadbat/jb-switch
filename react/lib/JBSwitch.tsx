import React, { useEffect, useRef, useState, useImperativeHandle, useCallback, } from 'react';
import 'jb-switch';
// eslint-disable-next-line no-duplicate-imports
import { JBSwitchWebComponent, ValidationValue } from 'jb-switch';
import { useBindEvent } from '../../../../common/hooks/use-event.js';
import { type ValidationItem } from 'jb-validation';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-switch': JBSwitchType;
    }
    interface JBSwitchType extends React.DetailedHTMLProps<React.HTMLAttributes<JBSwitchWebComponent>, JBSwitchWebComponent> {
      class?: string,
      name?: string,
      "true-title"?: string,
      "false-title"?: string,
    }
  }
}
export type JBSwitchEventType<T> = T & {
  target: JBSwitchWebComponent
}
export type JBSwitchProps = {
  style?: string,
  name?: string,
  className?: string,
  onChange?: (e: JBSwitchEventType<Event>) => void | null | undefined,
  value?: boolean | null | undefined,
  trueTitle?: string | null | undefined,
  falseTitle?: string | null | undefined,
  isLoading?: boolean | null | undefined,
  validationList?: ValidationItem<ValidationValue>[] | null,
}

export const JBSwitch = React.forwardRef((props: JBSwitchProps, ref) => {
  const element = useRef<JBSwitchWebComponent>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);
  const onchange = useCallback((e: JBSwitchEventType<Event>) => {
    if (props.value !== undefined && props.value !== null) {
      e.preventDefault();
    }
    if (typeof props.onChange == "function") {
      props.onChange(e);
    }
  }, [props.onChange, props.value]);


  useBindEvent(element, 'before-change', onchange, true);
  // useEvent(element.current, 'change', onchange, true);

  useEffect(() => {
    if (element.current && props.isLoading !== undefined && props.isLoading !== null && typeof props.isLoading == "boolean") {
      element.current.isLoading = props.isLoading;
    }
  }, [props.isLoading]);
  useEffect(() => {
    if (element.current && props.value !== null && props.value !== undefined) {
      element.current.value = props.value;
    }
  }, [props.value]);

  useEffect(() => {
    if (element.current && typeof props.style == "string") {
      element.current.setAttribute("style", props.style);
    }
  }, [props.style]);
  useEffect(() => {
    if (element.current && typeof props.name == "string") {
      element.current.setAttribute("name", props.name);
    }else if(element.current && props.name == null){
      element.current.removeAttribute("name");
    }
  }, [props.name]);
  useEffect(() => {
    if (element.current && Array.isArray( props.validationList)) {
      element.current.validation.list = props.validationList;
    }
  }, [props.validationList]);

  return (
    <jb-switch class={props.className ? props.className : ""} true-title={props.trueTitle ? props.trueTitle : ''} false-title={props.falseTitle ? props.falseTitle : ''} ref={element}>
    </jb-switch>
  );
});

JBSwitch.displayName = "JBSwitch";
