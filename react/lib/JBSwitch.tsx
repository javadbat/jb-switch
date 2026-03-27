'use client'
import React, { useRef, useImperativeHandle } from 'react';
import 'jb-switch';
// eslint-disable-next-line no-duplicate-imports
import type { JBSwitchWebComponent } from 'jb-switch';

import { type EventProps, useEvents } from './events-hook.js';
import { useJBSwitchAttribute, type JBSwitchAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';

declare module "react" {
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

type SwitchProps = EventProps & JBSwitchAttributes & {
  name?: string,
  trueTitle?: string | null | undefined,
  falseTitle?: string | null | undefined,
  value?: boolean | null | undefined,
  isLoading?: boolean | null | undefined,
}

export type Props = SwitchProps & JBElementStandardProps<JBSwitchWebComponent, keyof SwitchProps>

export const JBSwitch = React.forwardRef((props: Props, ref) => {
  const element = useRef<JBSwitchWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );

  //isLoading, value, name are in otherProps
  const { validationList, onBeforeChange, onChange, onInit, onLoad, ...otherProps } = props
  useJBSwitchAttribute(element, { validationList })
  useEvents(element, { onBeforeChange, onChange, onInit, onLoad });

  return (
    <jb-switch true-title={props.trueTitle ? props.trueTitle : ''} false-title={props.falseTitle ? props.falseTitle : ''} ref={element} {...otherProps}>
    </jb-switch>
  );
});

JBSwitch.displayName = "JBSwitch";
