// eslint-disable-next-line import/no-unresolved
import React from 'react'

import { render } from 'tests/utils'
// eslint-disable-next-line no-restricted-imports
import { ColorsEnum } from 'ui/theme/colors'

import { CheckboxInput } from './CheckboxInput'

const NotCheckedCheckboxInput = <CheckboxInput isChecked={false} />
const CheckedCheckboxInput = <CheckboxInput isChecked={true} />

describe('<CheckboxInput />', () => {
  it('should render correctly when not checked', () => {
    const { getByTestId } = render(NotCheckedCheckboxInput)

    const renderedCheckbox = getByTestId('checkbox')
    expect(renderedCheckbox.props.style[0].backgroundColor).toEqual(ColorsEnum.WHITE)
  })

  it('should render correctly when checked', () => {
    const { getByTestId } = render(CheckedCheckboxInput)

    const checkboxMark = getByTestId('checkbox-mark')
    expect(checkboxMark).toBeTruthy()
  })
})
