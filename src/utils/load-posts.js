export const loadPosts = async () => {
  //Performing requests to the API
  const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
  const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
  const animeResponse = fetch("https://api.aniapi.com/v1/anime?&year=2021", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3OCIsIm5iZiI6MTYzMjM5ODU2MiwiZXhwIjoxNjM0OTkwNTYyLCJpYXQiOjE2MzIzOTg1NjJ9.QokNcpziy9PJhu-ZWa34CCaSL3TMmGjADyXE_yx6ibs>",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  //TODO: Ver ao certo o que saporra faz
  const [posts, photos, xablau] = await Promise.all([
    postsResponse,
    photosResponse,
    animeResponse,
  ]);

  //Converting response into json object
  const postsJson = await posts.json();
  const photosJson = await photos.json();
  const animesJson = await xablau.json();

  //Run through the object and handle the values
  const animes = animesJson.data.documents.map((anime, index) => {
    return { ...anime, cover: photosJson[index].url };
  });
  return animes;

  // const postsAndPhotos = postsJson.map((post, index) => {
  //   console.log("asdasdasd");
  //   return { ...post, cover: photosJson[index].url };
  // });
  // return postsAndPhotos;
};
