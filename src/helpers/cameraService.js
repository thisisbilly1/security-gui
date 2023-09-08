import { authService } from "./authService"
import { useRootStore } from "@/stores/index"

export async function get(path) {
  const rootStore = useRootStore()
  const resp = await fetch(`${rootStore.cameraServer}${path}`, {
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
  const rootStore = useRootStore()
  const resp = await fetch(`${rootStore.cameraServer}${path}`, {
    method: 'POST',
    mode: "cors",
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