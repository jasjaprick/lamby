import { IMatch, IPlayer, IPosition } from '../interfaces/interfaces';
const base_url: string = 'http://localhost:3001';

async function getMatch(): Promise<IMatch> {
  return await fetchRequest('/next-match');
}

async function getPlayers(): Promise<IPlayer[]> {
  return await fetchRequest('/user');
}

async function getCurrentUser(): Promise<IPlayer> {
  return await fetchRequest('/current-user');
}

async function getPlayerById(id: number):Promise<IPlayer> {
  return await fetchRequest(`/user/${id}`)
}

async function getMatchPositions(): Promise<IPosition[]> {
  return await fetchRequest('/positions');
}

async function postMatchPosition(body: IPosition): Promise<void> {
  return fetchRequest('/positions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      matchId: body.matchId,
      userId: body.userId,
      position: body.position,
      instruction: body.instruction,
    }),
  });
}

// Helper function for fetching
async function fetchRequest(path: string, options?: object): Promise<any> {
  return await fetch(base_url + path, options)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => (res.status === 204 ? res : res.json()))
    .catch((error) => console.log(`Error fetching ${path}:`, error));
}

export const api = {
  getMatch,
  getPlayers,
  postMatchPosition,
  getMatchPositions,
  getCurrentUser,
  getPlayerById
};
