export const loadPosts = async () => {
  //Performing requests to the API
  const animeResponse = fetch("https://api.aniapi.com/v1/anime?&year=2021", {
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

  //Run through the object and handle the values
  const animes = animesJson.data.documents.map((anime, index) => {
    return { ...anime };
  });
  return animes;
};
