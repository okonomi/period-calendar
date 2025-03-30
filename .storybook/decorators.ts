import { makeDecorator } from "@storybook/preview-api"
import MockDate from "mockdate"

export const withMockdateDecorator = makeDecorator({
  name: "withMockdate",
  parameterName: "mockdate",
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters: date }) => {
    MockDate.reset()
    if (date instanceof Date) {
      MockDate.set(date)
    }

    return getStory(context)
  },
})
