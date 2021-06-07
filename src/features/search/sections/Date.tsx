import { t } from '@lingui/macro'
import React, { useCallback } from 'react'

import { SectionWithSwitch } from 'features/search/components/SectionWithSwitch'
import { useStagedSearch } from 'features/search/pages/SearchWrapper'
import { SectionTitle } from 'features/search/sections/titles'
import { useLogFilterOnce } from 'features/search/utils/useLogFilterOnce'

export const Date: React.FC = () => {
  const { searchState, dispatch } = useStagedSearch()
  const logUseFilter = useLogFilterOnce(SectionTitle.Date)

  const toggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_DATE' })
    logUseFilter()
  }, [])

  return (
    <SectionWithSwitch
      active={!!searchState.date}
      subtitle={t`Seules les sorties seront affichées`}
      testID={t`Interrupteur filtre sorties avec date`}
      title={SectionTitle.Date}
      toggle={toggle}
    />
  )
}
