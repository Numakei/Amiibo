export async function fetchNames() {
  const response = await fetch(`https://www.amiiboapi.com/api/gameseries/`);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}
