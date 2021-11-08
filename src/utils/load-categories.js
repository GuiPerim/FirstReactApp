export const loadCategories = async () => {
  const animeResponse = fetch("https://api.aniapi.com/v1/resources/1.0/0", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3OCIsIm5iZiI6MTYzMjM5ODU2MiwiZXhwIjoxNjM0OTkwNTYyLCJpYXQiOjE2MzIzOTg1NjJ9.QokNcpziy9PJhu-ZWa34CCaSL3TMmGjADyXE_yx6ibs>",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const [xablau] = await Promise.all([animeResponse]);
  const animesJson = await xablau.json();

  return animesJson.data.genres.sort();
};
