import * as React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const MoreSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  testID,
  accessibilityLabel,
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill={color}
    accessibilityLabel={accessibilityLabel}
    testID={testID}>
    <Path d="M11 20.5455C5.72723 20.5455 1.45455 16.2728 1.45455 11C1.45455 9.37616 1.85923 7.84524 2.57655 6.51048C2.70132 6.2783 2.61426 5.98892 2.38207 5.86414C2.14988 5.73936 1.86051 5.82643 1.73573 6.05861C0.944866 7.53022 0.5 9.21612 0.5 11C0.5 16.8 5.20005 21.5 11 21.5C16.8 21.5 21.5 16.8 21.5 11C21.5 5.20005 16.8 0.5 11 0.5C9.19045 0.5 7.48483 0.960075 5.99455 1.77023C5.76297 1.89612 5.67729 2.18591 5.80318 2.4175C5.92908 2.64908 6.21887 2.73476 6.45045 2.60886C7.80472 1.87265 9.35409 1.45455 11 1.45455C16.2728 1.45455 20.5455 5.72723 20.5455 11C20.5455 16.2728 16.2728 20.5455 11 20.5455ZM10.8645 5.45711C11.1406 5.45738 11.3643 5.68145 11.364 5.95759L11.359 10.6082L15.9932 10.614C16.2693 10.6144 16.4929 10.8385 16.4926 11.1146C16.4923 11.3908 16.2682 11.6144 15.992 11.614L11.3614 11.6082L11.3781 16.2551C11.379 16.5312 11.1559 16.7558 10.8798 16.7567C10.6036 16.7576 10.379 16.5345 10.3781 16.2584L10.3614 11.6122L5.72454 11.6296C5.4484 11.6306 5.22378 11.4075 5.22285 11.1313C5.22191 10.8552 5.44501 10.6306 5.72115 10.6296L10.359 10.6122L10.364 5.95662C10.3643 5.68048 10.5884 5.45684 10.8645 5.45711Z" />
  </AccessibleSvg>
)

export const More = styled(MoreSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``