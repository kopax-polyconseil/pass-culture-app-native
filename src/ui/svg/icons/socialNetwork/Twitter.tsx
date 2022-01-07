import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from '../types'

export const Twitter: React.FunctionComponent<IconInterface> = ({
  size = 32,
  color: _color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" testID={testID} aria-hidden>
    <G fill="none" fillRule="evenodd">
      <G fillRule="nonzero">
        <G>
          <Path
            fill="#1DA1F2"
            d="M11.915 0c-4.973 0-6.427.005-6.71.029-1.02.085-1.655.247-2.347.594-.533.267-.954.576-1.369 1.01C.733 2.423.275 3.396.11 4.552c-.08.561-.103.676-.108 3.542-.002.956 0 2.213 0 3.9 0 5.007.005 6.471.03 6.755.082 1.001.237 1.63.567 2.32.63 1.317 1.834 2.307 3.252 2.676.491.127 1.033.198 1.73.23.294.014 3.3.023 6.31.023 3.007 0 6.016-.004 6.303-.018.806-.039 1.274-.102 1.792-.237 1.427-.37 2.609-1.346 3.252-2.682.323-.672.487-1.326.561-2.274.016-.207.023-3.504.023-6.796 0-3.293-.007-6.583-.023-6.79-.075-.964-.24-1.612-.573-2.297-.274-.56-.578-.979-1.02-1.407-.788-.759-1.751-1.22-2.9-1.387-.556-.081-.667-.105-3.514-.11h-3.876z"
            transform="translate(-132 -868) translate(132 868)"
          />
          <Path
            fill="#FFF"
            d="M9.393 17.723c5.117 0 7.914-4.403 7.914-8.221 0-.125-.002-.25-.007-.374.543-.408 1.015-.917 1.387-1.496-.498.23-1.035.385-1.597.455.574-.358 1.015-.924 1.223-1.599-.538.331-1.133.572-1.766.702-.508-.562-1.23-.913-2.03-.913-1.537 0-2.782 1.294-2.782 2.89 0 .226.024.446.072.658-2.312-.12-4.362-1.27-5.734-3.02-.239.428-.376.924-.376 1.453 0 1.003.49 1.888 1.237 2.406-.456-.015-.885-.145-1.26-.362v.037c0 1.4.959 2.568 2.232 2.833-.234.066-.48.101-.734.101-.179 0-.353-.018-.522-.052.354 1.148 1.38 1.984 2.598 2.007-.952.775-2.151 1.237-3.455 1.237-.224 0-.445-.013-.663-.04 1.23.82 2.693 1.298 4.264 1.298"
            transform="translate(-132 -868) translate(132 868)"
          />
        </G>
      </G>
    </G>
  </Svg>
)
