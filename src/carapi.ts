export function getCars() {
  return fetch(import.meta.env.VITE_API_URL + "/cars")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error when fetching cars");
    }

    return response.json();
  })
}

export function deleteCar(url: string) {
  return fetch(url, { method: 'DELETE' })
  .then(response => {
      if (!response.ok)
          throw new Error("Something went wrong in deletion.");

      return response.json();
  })
}