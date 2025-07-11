import React from 'react';
import {JBSwitch, Props} from 'jb-switch/react';
import JBSwitchTest from './samples/JBSwitchTestPage';
import JBSwitchIsLoadingTest from './samples/JBSwitchIsLoadingTestPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<Props> = {
  title: "Components/form elements/JBSwitch",
  component: JBSwitch,
};
export default meta;
type Story = StoryObj<typeof JBSwitch>;

export const Normal:Story = {
  args:{
    value:false,
    trueTitle:'فعال',
    falseTitle:'غیر فعال',
    onChange:(e)=>{console.log(e)}
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
  }
};

export const ActionTest:Story = {
  render: (args) => <JBSwitchTest {...args} />,
  args:{
    trueTitle:'فعال',
    falseTitle:'غیر فعال',
  }
};

export const LoadingActionTest = {
  render: (args)=><JBSwitchIsLoadingTest {...args}></JBSwitchIsLoadingTest>,
  args:{
    trueTitle:'فعال',
    falseTitle:'غیر فعال',
    value:false,
    isLoading:true,
    onChange:(e)=>{console.log(e);}
  }
};

export const WebComponent:StoryObj<any> = {
  render:(args:any) => <jb-switch true-title={args.trueTitle} false-title={args.falseTitle}></jb-switch>,
  args:{
    value:false,
    trueTitle:'فعال',
    falseTitle:'غیر فعال',
    onChange:(e)=>{console.log(e);}
  }
};