import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme/colors'

import { RectangleIconInterface } from './types'

export const TicketBookedDeprecated = ({
  color = ColorsEnum.BLACK,
  width = 232,
  height = 146,
  testID,
}: RectangleIconInterface) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 232 146" testID={testID}>
      <G fill="none" fillRule="evenodd">
        <G fill={color}>
          <G>
            <Path
              d="M134.782 16.224l.197.318 5.748 9.563c1.826 3.04 1.297 6.805-1.068 9.48l-.228.248c-4.022 4.221-4.78 10.668-1.735 15.736 2.984 4.966 8.838 7.328 14.347 5.955l.359-.095c3.575-1 7.323.288 9.205 3.42.754 1.254.348 2.882-.906 3.635-1.195.718-2.728.384-3.523-.733l-.113-.173c-.597-.994-1.865-1.43-3.235-1.046-7.896 2.208-16.39-1.103-20.676-8.234-4.283-7.126-3.216-16.183 2.44-22.12.925-.971 1.163-2.202.682-3.175l-.092-.17-5.747-9.563c-2.172-3.614-6.81-4.843-10.475-2.83l-.266.152-73.468 44.135c-3.617 2.176-4.845 6.807-2.832 10.474l.153.266 5.83 9.7c.553.921 1.726 1.325 2.972.961 7.943-2.304 16.538.997 20.856 8.182 4.32 7.187 3.2 16.331-2.563 22.25-.852.879-1.074 2.014-.634 2.914l.09.166 5.824 9.698c2.225 3.702 7.039 4.902 10.741 2.678l35.435-21.287c1.254-.754 2.882-.348 3.636.906s.348 2.882-.906 3.636l-35.435 21.287c-6.104 3.667-14.003 1.787-17.817-4.175l-.196-.317-5.825-9.698c-1.842-3.065-1.235-6.899 1.286-9.5 4.097-4.209 4.894-10.716 1.822-15.83-3.008-5.004-8.936-7.36-14.48-5.919l-.354.097c-3.367.98-6.93-.18-8.822-3.047l-.173-.273-5.83-9.701c-3.666-6.108-1.789-13.995 4.173-17.811l.318-.198 73.47-44.135c6.103-3.667 14.002-1.788 17.815 4.173zm30.091 59.13c3.928 0 7.747.804 11.273 2.339 1.16.505 1.692 1.855 1.187 3.015-.506 1.16-1.856 1.691-3.016 1.186-2.953-1.285-6.149-1.957-9.444-1.957-13.078 0-23.68 10.6-23.68 23.676 0 13.076 10.602 23.676 23.68 23.676 13.079 0 23.68-10.6 23.68-23.676 0-1.265 1.027-2.291 2.292-2.291 1.266 0 2.292 1.026 2.292 2.29 0 15.607-12.654 28.259-28.264 28.259s-28.264-12.652-28.264-28.258c0-15.607 12.654-28.258 28.264-28.258zm28.729 7.72c.879.858.949 2.25.189 3.192l-.12.138-26.633 28.258c-.915.97-2.427.96-3.33.012l-.12-.134L150.1 98.068c-.818-1-.686-2.484.297-3.317.937-.794 2.31-.707 3.144.171l.116.131 11.83 14.447 24.842-26.356c.885-.938 2.35-.97 3.273-.07zm-85.42-37.245l.113.173 21.446 35.684c.754 1.254.348 2.881-.906 3.635-1.195.717-2.728.384-3.523-.733l-.113-.174-21.446-35.683c-.754-1.255-.348-2.882.906-3.636 1.195-.717 2.728-.383 3.523.734z"
              transform="translate(-72 -160) translate(72 160)"
            />
          </G>
        </G>
      </G>
    </Svg>
  )
}