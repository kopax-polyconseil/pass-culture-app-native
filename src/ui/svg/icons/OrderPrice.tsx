import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export const OrderPrice: React.FunctionComponent<IconInterface> = ({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} testID={testID} fill={color} viewBox="-2 -2 56 56">
    <Path d="M3.70034 2.29173C3.31136 1.90276 2.68071 1.90276 2.29173 2.29173C1.90276 2.68071 1.90276 3.31136 2.29173 3.70034L10.6286 12.0372L10.6379 12.0464L15.3603 16.7688C15.0099 17.362 14.8089 18.054 14.8089 18.7932C14.8089 20.9944 16.5918 22.7773 18.793 22.7773C20.9843 22.7773 22.7772 20.9944 22.7772 18.7932C22.7772 16.5919 20.9943 14.809 18.793 14.809C18.054 14.809 17.3621 15.01 16.769 15.3603L13.1087 11.6999L26.0585 10.0802L26.0644 10.0794C26.36 10.0406 26.6609 10.1408 26.884 10.3638L26.8842 10.3641L43.717 27.1869C44.1049 27.5748 44.1049 28.2091 43.717 28.5971L42.5715 29.7425C42.1826 30.1315 42.1826 30.7621 42.5715 31.1511C42.9605 31.5401 43.5912 31.5401 43.9802 31.1511L45.1256 30.0057C46.2915 28.8398 46.2915 26.9442 45.1256 25.7783L45.1254 25.7781L28.2926 8.95524C27.6399 8.30256 26.727 7.98437 25.8086 8.1038L11.3242 9.91556L3.70034 2.29173ZM16.8741 18.2593C17.2621 18.5269 17.7978 18.4881 18.143 18.1429C18.4882 17.7977 18.527 17.2621 18.2596 16.8741C18.4295 16.8265 18.6084 16.8011 18.793 16.8011C19.8887 16.8011 20.7851 17.6975 20.7851 18.7932C20.7851 19.8888 19.8887 20.7852 18.793 20.7852C17.6974 20.7852 16.801 19.8888 16.801 18.7932C16.801 18.6084 16.8265 18.4294 16.8741 18.2593ZM39.9263 35.2149C40.3152 34.826 40.3152 34.1953 39.9263 33.8063C39.5373 33.4174 38.9066 33.4174 38.5177 33.8063L28.6071 43.7169C28.2192 44.1048 27.5849 44.1048 27.1969 43.7169L21.7187 38.2387L21.7109 38.231L10.3638 26.8839L10.3638 26.8838L10.3557 26.8758C10.1454 26.6704 10.0397 26.3663 10.0793 26.0643L10.0801 26.0584L11.2056 17.0642C11.2739 16.5184 10.8868 16.0205 10.341 15.9522C9.79511 15.8839 9.29725 16.271 9.22895 16.8169L8.10375 25.8084C7.98543 26.7184 8.2964 27.6459 8.95882 28.2961L20.31 39.6473L20.318 39.6552L25.7883 45.1255C26.9542 46.2914 28.8498 46.2914 30.0157 45.1255L39.9263 35.2149Z" />
  </Svg>
)
