import React from 'react';
import {JBSwitch} from 'jb-switch/react';
import JBSwitchTest from './samples/JBSwitchTestPage';
import JBSwitchIsLoadingTest from './samples/JBSwitchIsLoadingTestPage';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import {
  appendEventSwitch,
  getSwitch,
  getSwitchSvg,
  getSwitchWrapper,
  getTriggerCircleBar,
  getTrueText,
  getFalseText,
  waitForSwitchValue,
} from './test-utils';

const meta = {
  title: "Components/form elements/JBSwitch",
  component: JBSwitch,
} satisfies Meta<typeof JBSwitch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal:Story = {
  args:{
    value:false,
    trueTitle:'active',
    falseTitle:'deactivate',
    onChange:(e)=>{console.log(e)}
  },
  play: async ({ canvasElement, args }) => {
    const switchElement = getSwitch(canvasElement);

    await waitFor(() => {
      expect(switchElement.value).toBe(args.value);
      expect(getTrueText(switchElement).textContent).toBe(args.trueTitle);
      expect(getFalseText(switchElement).textContent).toBe(args.falseTitle);
    });

    await userEvent.click(getSwitchWrapper(switchElement));
    await waitForSwitchValue(switchElement, true);
  }
};

export const RTL:Story = {
  args:{
    value:false,
    trueTitle:'فعال',
    falseTitle:'غیر فعال',
    onChange:(e)=>{console.log(e);}
  },
  parameters: {
    themes:{
      themeOverride:'rtl'
    }
  },
  play: async ({ canvasElement, args }) => {
    const switchElement = getSwitch(canvasElement);

    await waitFor(() => {
      expect(getTrueText(switchElement).textContent).toBe(args.trueTitle);
      expect(getFalseText(switchElement).textContent).toBe(args.falseTitle);
    });
  }
};

export const ActionTest:Story = {
  render: (args) => <JBSwitchTest {...args} />,
  args:{
    trueTitle:'active',
    falseTitle:'deactivate',
  }
};

export const LoadingActionTest = {
  render: (args)=><JBSwitchIsLoadingTest {...args}></JBSwitchIsLoadingTest>,
  args:{
    trueTitle:'active',
    falseTitle:'deactivate',
    value:false,
    isLoading:true,
    onChange:(e)=>{console.log(e);}
  },
  play: async ({ canvasElement }) => {
    const switchElement = getSwitch(canvasElement);

    await userEvent.click(getSwitchWrapper(switchElement));

    await waitFor(() => {
      expect(switchElement.isLoading).toBe(true);
      expect(getTriggerCircleBar(switchElement).classList.contains('--loading')).toBe(true);
    });

    await waitFor(() => {
      expect(switchElement.value).toBe(true);
      expect(switchElement.isLoading).toBe(false);
      expect(getTriggerCircleBar(switchElement).classList.contains('--loading')).toBe(false);
    }, { timeout: 2500 });
  }
};

export const WebComponent:StoryObj<any> = {
  render:(args:any) => <jb-switch true-title={args.trueTitle} false-title={args.falseTitle}></jb-switch>,
  args:{
    value:false,
    trueTitle:'active',
    falseTitle:'deactivate',
    onChange:(e:any)=>{console.log(e);}
  },
  play: async ({ canvasElement, args }) => {
    const switchElement = getSwitch(canvasElement);

    await waitFor(() => {
      expect(switchElement.value).toBe(false);
      expect(getTrueText(switchElement).textContent).toBe(args.trueTitle);
      expect(getFalseText(switchElement).textContent).toBe(args.falseTitle);
    });

    await userEvent.click(getSwitchWrapper(switchElement));
    await waitForSwitchValue(switchElement, true);
  }
};

export const EventTest: Story = {
  render: () => <JBSwitch trueTitle="active" falseTitle="deactivate" required />,
  play: async ({ canvasElement }) => {
    const { switchElement, events } = await appendEventSwitch(canvasElement);

    expect(switchElement.reportValidity()).toBe(false);

    await userEvent.click(getSwitchWrapper(switchElement));

    await waitFor(() => {
      expect(switchElement.value).toBe(true);
      expect(switchElement.reportValidity()).toBe(true);
      expect(events).toEqual(expect.arrayContaining(['before-change', 'change']));
    });

    switchElement.value = false;
    switchElement.addEventListener('before-change', (event) => event.preventDefault(), { once: true });

    await userEvent.click(getSwitchWrapper(switchElement));

    await waitFor(() => {
      expect(switchElement.value).toBe(false);
    });

    switchElement.value = false;
    switchElement.addEventListener('change', (event) => event.preventDefault(), { once: true });

    await userEvent.click(getSwitchWrapper(switchElement));

    await waitFor(() => {
      expect(switchElement.value).toBe(false);
      expect(getSwitchSvg(switchElement).classList.contains('--active')).toBe(false);
    });
  }
};
