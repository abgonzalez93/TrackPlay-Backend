import { env } from '@config/index'

/**
 * All available fields for an IGDB Game query, expanded for nested objects like cover, genres, etc.
 *
 * @module constants
 */
export const IGDB = {
  CLIENT_ID: env.IGDB_CLIENT_ID,
  CLIENT_SECRET: env.IGDB_CLIENT_SECRET,
  TOKEN_URL: 'https://id.twitch.tv/oauth2/token',
  API_URL: 'https://api.igdb.com/v4',
  MAX_GAME_LIMIT: 50,
  GAME_FIELDS: `
    id, name, slug, summary, first_release_date, rating, aggregated_rating,
    follows, hypes, cover.url, genres.name, platforms.name,
    screenshots.url, videos.video_id, similar_games, url
  `,
  SORT_FIELDS: ['name', 'rating', 'first_release_date', 'aggregated_rating', 'follows', 'hypes'] as const,
}
