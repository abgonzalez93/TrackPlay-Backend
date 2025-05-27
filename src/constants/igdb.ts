/**
 * All available fields for an IGDB Game query, expanded for nested objects like cover, genres, etc.
 *
 * @module constants
 */
export const IGDB = {
  CLIENT_ID: process.env.IGDB_CLIENT_ID,
  CLIENT_SECRET: process.env.IGDB_CLIENT_SECRET,
  TOKEN_URL: 'https://id.twitch.tv/oauth2/token',
  API_URL: 'https://api.igdb.com/v4',
  GAME_FIELDS: `
    age_ratings, aggregated_rating, aggregated_rating_count, alternative_names,
    artworks, bundles, category, checksum, collection, collections,
    cover.url, created_at, dlcs, expanded_games, expansions, external_games,
    first_release_date, follows, forks, franchise, franchises, game_engines,
    game_localizations, game_modes, game_status, game_type, genres.name,
    hypes, id, involved_companies, keywords, language_supports, multiplayer_modes,
    name, parent_game, platforms.name, player_perspectives, ports, rating,
    rating_count, release_dates, remakes, remasters, screenshots.url,
    similar_games, slug, standalone_expansions, status, storyline, summary,
    tags, themes, total_rating, total_rating_count, updated_at, url,
    version_parent, version_title, videos.video_id, websites
  `,
}
