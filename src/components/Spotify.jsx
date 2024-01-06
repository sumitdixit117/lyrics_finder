// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQA1vss7j3LUFg3HOQuYiwz8CJ0PgUNxJoSORA5Ws9JhXh6tNywhBjE8s7H9lBqZtKwD6JTXXleQWPu4WDDYSP4_DNFbX98FxVSPJ9p7l0xmBURpj0xBwOWN5lhBOlPEXqsA3R5aPxhAHhHvuEojhZXkCvu9s9rhCYgZVn1fYbqst59tqRAnGqR5RxOAtcgQdpfOb4pzy53t57XFs6l4DvODbp2G-_aXEv2as431UGxV4Gi06cBVi9AKK2s0SA8ZFkMV-CmO15AS0jjS8gt7o0i9EHsx';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);



const playlistId = '6PfbZvWryVdrTSh4jmeE1s';

<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/6PfbZvWryVdrTSh4jmeE1s?utm_source=generator&theme=0`}
  width="100%"
  height="100%"
  style={{ minHeight: '360px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>