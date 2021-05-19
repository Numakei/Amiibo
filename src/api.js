export async function fetchImages(name) {
  const response = await fetch(
    `https://www.amiiboapi.com/api/amiibo/?gameseries=${name}`
  );
  console.log(name);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}
