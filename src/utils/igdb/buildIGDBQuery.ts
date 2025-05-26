import { IGDBGameFilters } from '@schemas/index'

/**
 * Builds a dynamic IGDB query string from provided filters.
 *
 * @param filters - The filtering, sorting and pagination options
 * @returns A string query compatible with IGDB API
 */
export const buildIGDBQuery = (filters: IGDBGameFilters): string => {
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
  } = filters

  const queryParts: string[] = []

  if (q) queryParts.push(`search "${q}";`)

  queryParts.push(`
    fields id, name, slug, summary, storyline, cover.url,
    first_release_date, genres.name, platforms.name,
    rating, total_rating, screenshots.url, videos.video_id, url;
  `.trim())

  const whereParts: string[] = []

  if (minRating) whereParts.push(`rating >= ${minRating}`)
  if (excludeThemes?.length) whereParts.push(`themes != (${excludeThemes.join(',')})`)
  if (platforms?.length) whereParts.push(`platforms = (${platforms.join(',')})`)
  if (genres?.length) whereParts.push(`genres = (${genres.join(',')})`)

  if (whereParts.length > 0) queryParts.push(`where ${whereParts.join(' & ')};`)

  if (sortBy) queryParts.push(`sort ${sortBy} ${sortOrder};`)

  queryParts.push(`limit ${limit};`)
  queryParts.push(`offset ${offset};`)

  return queryParts.join('\n')
}
