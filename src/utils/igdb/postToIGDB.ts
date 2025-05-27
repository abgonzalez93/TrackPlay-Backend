import { IGDB } from '@constants/index'
import axios from 'axios'

/**
 * Sends a POST request to the IGDB API using the given query and token.
 *
 * @param query - IGDB query string in plain text format
 * @param token - OAuth bearer token for IGDB authentication
 * @returns Axios response containing raw IGDB data
 * @throws AxiosError if the request fails
 * @private
 */
export const postToIGDB = async <T = unknown>(
  query: string,
  token: string,
): Promise<{ data: T }> => {
  const response = await axios.post<T>(`${IGDB.API_URL}/games`, query, {
    headers: {
      'Client-ID': IGDB.CLIENT_ID,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
  })

  return response
}
