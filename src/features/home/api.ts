import resolveResponse from 'contentful-resolve-response'
import { useMemo, useEffect } from 'react'
import { useQuery } from 'react-query'

import { api } from 'api/api'
import { UserProfileResponse } from 'api/gen'
import { useAuthContext } from 'features/auth/AuthContext'
import { NoContentError } from 'features/home/components/NoContentError'
import {
  EntryCollection,
  EntryFields,
  processHomepageEntry,
  HomepageEntry,
} from 'features/home/contentful'
import { useSelectPlaylist } from 'features/home/selectPlaylist'
import { analytics } from 'libs/analytics'
import { env } from 'libs/environment'
import { getExternal } from 'libs/fetch'
import { ScreenError } from 'libs/monitoring'
import { QueryKeys } from 'libs/queryKeys'

const DEPTH_LEVEL = 2
const STALE_TIME_CONTENTFUL = 5 * 60 * 1000

export const CONTENTFUL_BASE_URL = 'https://cdn.contentful.com'
export const BASE_URL = `${CONTENTFUL_BASE_URL}/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`
export const PARAMS = `?include=${DEPTH_LEVEL}&content_type=homepageNatif&access_token=${env.CONTENTFUL_ACCESS_TOKEN}`

export async function getEntries() {
  const url = `${BASE_URL}/entries${PARAMS}`
  try {
    const json = await getExternal<EntryCollection<EntryFields, 'homepageNatif'>>(url)
    return resolveResponse(json)
  } catch (e) {
    const error = e as Error
    throw new ScreenError(error?.message, NoContentError)
  }
}

export function useHomepageModules(paramsEntryId?: string) {
  const selectPlaylist = useSelectPlaylist(paramsEntryId)
  const { data: entries } = useQuery<HomepageEntry[]>(QueryKeys.HOMEPAGE_MODULES, getEntries, {
    staleTime: STALE_TIME_CONTENTFUL,
  })

  const entry = selectPlaylist(entries || [])
  const entryId = entry?.sys.id

  useEffect(() => {
    if (entryId) analytics.logConsultHome({ entryId })
  }, [entryId])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => (entry ? processHomepageEntry(entry) : []), [entryId])
}

const STALE_TIME_USER_PROFILE = 5 * 60 * 1000

export function useUserProfileInfo(options = {}) {
  const { isLoggedIn } = useAuthContext()

  return useQuery<UserProfileResponse>(QueryKeys.USER_PROFILE, () => api.getnativev1me(), {
    enabled: isLoggedIn,
    staleTime: STALE_TIME_USER_PROFILE,
    ...options,
  })
}
