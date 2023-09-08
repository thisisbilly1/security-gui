import { authService } from "./authService"

export async function get(path) {
  const resp = await fetch(path, {
    method: 'GET',
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: authService.accessToken,
    }),
  })
  if (!resp.ok) 
    throw new Error('Network response was not ok')
  const json = await resp.json()
  return json;
}

export async function post(path, body) {
  const resp = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!resp.ok) 
    throw new Error('Network response was not ok')
  const json = await resp.json()
  return json;
}