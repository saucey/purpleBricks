import React from 'react';
import { ButtonCta } from '../components/Buttons/ButtonCta';

/** The call to action Buttons! */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Buttons/Call to action Buttons',
  component: ButtonCta,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'The label of the button \n\n `string`'},
    isActive: { control: 'boolean', description: 'variable state isActive \n\n `boolean`', defaultValue: { summary: false } },
    isDisabled: { control: 'boolean', description: 'variable state isDisabled \n\n `boolean`', defaultValue: { summary: false } },
    hasIcon: { control: 'boolean', description: 'variable state hasIcon \n\n `boolean`', defaultValue: { summary: false } },
    isLoading: { control: 'boolean', description: 'variable state isLoading \n\n `boolean`', defaultValue: { summary: false } },
    isDarkBg: { control: 'boolean', description: 'variable state isDarkBg \n\n `boolean`', defaultValue: { summary: false } },
  },
};

const Template = (args) => <ButtonCta {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'This is example button',
};

export const Active = Template.bind({});
Active.args = {
  label: 'Call to action active button',
  isActive: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Call to action disabled button',
  isDisabled: true,
};

export const Icon = Template.bind({});
Icon.args = {
  label: 'Call to action icon button',
  hasIcon: true,
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Call to action loading button',
  isLoading: true,
};

export const IconDisabled = Template.bind({});
IconDisabled.args = {
  label: 'Call to action icon disabled button',
  hasIcon: true,
  isDisabled: true,
};

export const DarkBackground = Template.bind({});
DarkBackground.args = {
  label: 'Call to action dark bg button',
  isDarkBg: true,
};


export const DarkBackgroundActive = Template.bind({});
DarkBackgroundActive.args = {
  label: 'Call to action dark active button',
  isActive: true,
  isDarkBg: true,
};

