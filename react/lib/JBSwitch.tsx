'use client'
import React, { useRef, useImperativeHandle } from 'react';
import 'jb-switch';
// eslint-disable-next-line no-duplicate-imports
import type { JBSwitchWebComponent } from 'jb-switch';

import { type EventProps, useEvents } from './events-hook.js';
import { useJBSwitchAttribute, type JBSwitchAttributes } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';
import './module-declaration.js';

type SwitchProps = EventProps & JBSwitchAttributes & {
  name?: string,
  value?: boolean | null,
  initialValue?: boolean | null,
}

export type Props = SwitchProps & JBElementStandardProps<JBSwitchWebComponent, keyof SwitchProps>

export const JBSwitch = React.forwardRef((props: Props, ref) => {
  const element = useRef<JBSwitchWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );

  const { disabled, falseTitle, initialValue, isLoading, required, trueTitle, validationList, value, onBeforeChange, onChange, onInit, onLoad, ...otherProps } = props
  useJBSwitchAttribute(element, { disabled, falseTitle, isLoading, required, trueTitle, validationList })
  useEvents(element, { onBeforeChange, onChange, onInit, onLoad });

  return (
    <jb-switch ref={element} value={value ?? false} initialValue={initialValue ?? false} {...otherProps}>
    </jb-switch>
  );
});

JBSwitch.displayName = "JBSwitch";
