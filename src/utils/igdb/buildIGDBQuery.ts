import { IGDBGameFilters } from '@schemas/index'
import { IGDB } from '@constants/index'

type BuildQueryOptions = IGDBGameFilters & {
  where?: string
}

/**
 * Builds a dynamic IGDB query string from provided filters or a custom condition.
 *
 * @param filters - The filtering, sorting and pagination options
 * @returns A string query compatible with IGDB API
 *
 * @module utils/igdb
 */
export const buildIGDBQuery = (filters: BuildQueryOptions): string => {
  const {
    q,
    limit = 20,
    offset = 0,
    sortBy,
    sortOrder = 'desc',
    minRating,
    excludeThemes,
    platforms,
    genres,
    where,
  } = filters

  const queryParts: string[] = []

  if (q) queryParts.push(`search "${q}";`)
  queryParts.push(`fields ${IGDB.IGDB_GAME_FIELDS.replace(/\s+/g, ' ')};`)

  if (where) {
    queryParts.push(`where ${where};`)
  } else {
    const whereParts: string[] = []
    if (minRating) whereParts.push(`rating >= ${minRating}`)
    if (excludeThemes?.length) whereParts.push(`themes != (${excludeThemes.join(',')})`)
    if (platforms?.length) whereParts.push(`platforms = (${platforms.join(',')})`)
    if (genres?.length) whereParts.push(`genres = (${genres.join(',')})`)

    if (whereParts.length > 0) {
      queryParts.push(`where ${whereParts.join(' & ')};`)
    }
  }

  if (sortBy) queryParts.push(`sort ${sortBy} ${sortOrder};`)
  queryParts.push(`limit ${limit};`)
  queryParts.push(`offset ${offset};`)

  return queryParts.join('\n')
}
