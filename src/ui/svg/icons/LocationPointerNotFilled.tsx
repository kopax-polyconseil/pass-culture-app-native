import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export const LocationPointerNotFilled: React.FunctionComponent<IconInterface> = ({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID} aria-hidden>
    <Path
      fill={color}
      d="M23.9999 2.50122C21.3975 2.50122 18.9542 3.16563 16.8229 4.32231C16.3375 4.58575 16.1575 5.19281 16.421 5.67822C16.6844 6.16362 17.2915 6.34356 17.7769 6.08013C19.6256 5.07681 21.7422 4.50122 23.9999 4.50122C31.1776 4.50122 36.9999 10.3235 36.9999 17.5012C36.9999 19.7515 36.0753 22.0966 35.29 23.9391C34.9205 24.8059 32.3309 29.7926 29.7916 34.6383C28.5309 37.0442 27.2944 39.3931 26.3731 41.1406C25.9125 42.0144 25.5306 42.7377 25.264 43.2426L24.8563 44.014C24.4687 44.6608 23.5293 44.6603 23.1425 44.0124L22.7405 43.2592C22.478 42.7668 22.1018 42.0609 21.6475 41.2064C20.7388 39.4975 19.5176 37.195 18.2672 34.8203C15.746 30.0322 13.1623 25.0554 12.7167 23.9557L12.7156 23.9529C11.7641 21.6248 10.9999 19.7538 10.9999 17.5012C10.9999 14.5551 11.975 11.8368 13.6258 9.66665C13.9601 9.22709 13.8749 8.59969 13.4353 8.26532C12.9957 7.93095 12.3683 8.01623 12.034 8.45579C10.1247 10.9657 8.99988 14.1073 8.99988 17.5012C8.99988 20.1505 9.8959 22.3416 10.8044 24.5632L10.8631 24.7067L11.7899 24.3312L10.8642 24.7095L10.8637 24.7082C11.3597 25.9313 14.0148 31.0372 16.4976 35.7521C17.7496 38.13 18.9722 40.435 19.8816 42.1454C20.3364 43.0006 20.7129 43.7073 20.9757 44.2002L21.3879 44.9726C21.3916 44.9794 21.3953 44.9862 21.3992 44.993C21.4009 44.9961 21.4027 44.9992 21.4045 45.0023C22.5596 46.9975 25.4401 46.9975 26.5953 45.0023L26.6028 44.989L26.6143 44.9679L27.0324 44.1766C27.2993 43.6714 27.6814 42.9476 28.1423 42.0734C29.0641 40.325 30.3014 37.9745 31.5631 35.5666C34.0689 30.7849 36.7192 25.6866 37.1298 24.7233C37.9045 22.9058 38.9999 20.211 38.9999 17.5012C38.9999 9.21894 32.2822 2.50122 23.9999 2.50122ZM25.7299 44.5012L26.6143 44.9679C26.6142 44.968 26.6139 44.9688 25.7299 44.5012ZM20.0002 17.5012C20.0002 15.2935 21.7925 13.5012 24.0002 13.5012C24.5525 13.5012 25.0002 13.0535 25.0002 12.5012C25.0002 11.9489 24.5525 11.5012 24.0002 11.5012C20.6879 11.5012 18.0002 14.1889 18.0002 17.5012C18.0002 20.8135 20.6879 23.5012 24.0002 23.5012C27.3125 23.5012 30.0002 20.8135 30.0002 17.5012C30.0002 16.9489 29.5525 16.5012 29.0002 16.5012C28.4479 16.5012 28.0002 16.9489 28.0002 17.5012C28.0002 19.7089 26.2079 21.5012 24.0002 21.5012C21.7925 21.5012 20.0002 19.7089 20.0002 17.5012Z"
    />
  </Svg>
)
