import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export function Eye({ size = 32, color = ColorsEnum.BLACK, testID }: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} viewBox="0 0 32 32">
      <Path
        d="M16.092 10c4.18 0 7.871 2.097 9.257 5.208.225.505.225 1.08 0 1.585a7.634 7.634 0 01-1.75 2.428.5.5 0 01-.687-.727 6.61 6.61 0 001.523-2.108.944.944 0 000-.772C23.221 12.888 19.9 11 16.092 11c-3.806 0-7.128 1.888-8.343 4.614a.944.944 0 000 .772C8.964 19.112 12.286 21 16.092 21c1.583 0 3.103-.324 4.438-.929a.5.5 0 01.412.911c-1.465.664-3.125 1.018-4.85 1.018-4.18 0-7.87-2.097-9.257-5.207a1.948 1.948 0 010-1.586C8.221 12.097 11.912 10 16.092 10zm0 2.966a3.034 3.034 0 110 6.067 3.034 3.034 0 010-6.067zm0 1a2.034 2.034 0 100 4.068 2.034 2.034 0 000-4.068z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
