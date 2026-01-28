import React from "react";
import { Meta, Story } from "@storybook/react";
import { PeriodSelector, Props } from "./PeriodSelector";

export default {
  title: "Components/PeriodSelector",
  component: PeriodSelector,
  argTypes: {
    onPrevPeriod: { action: "onPrevPeriod" },
    onNextPeriod: { action: "onNextPeriod" },
  },
} as Meta;

const Template: Story<Props> = (args) => <PeriodSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  period: 1,
  onPrevPeriod: () => {},
  onNextPeriod: () => {},
};