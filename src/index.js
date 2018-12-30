import "./styles.css";
import SpotifyWebApi from "spotify-web-api-js";

document.getElementById("app").innerHTML = `
<h1>Spotify Library Inspector!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
const accessToken =
  "BQBe3zK1LM_cJbW1-XAFHJmHa2Lbv-aXWVKAfg85GxDcZD_QZuawYqryCv4HD8OFCqbBm1yFcWhmiLfs0w72Z_IhEFHipIiTKfgRNSusO2jvA-7K13NIwCR6vqj50UFB5wcqySNSG2UPgsM2WbxjaLHo32Ag0w";
const libraryAlbums = [];
const limit = 50;
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);
const libPromises = total => {
  const spPromises = [];
  let newOffset = limit;
  while (total > newOffset) {
    const spPromise = spotifyApi
      .getMySavedAlbums({ limit, offset: newOffset })
      .then(data => libraryAlbums.push(...data.items));
    spPromises.push(spotifyApi.getMySavedAlbums({ limit, offset: newOffset }));
    newOffset = newOffset + limit;
  }
  return spPromises;
};
spotifyApi.getMySavedAlbums({ limit, offset: 0 }).then(
  function(data) {
    console.log("Ma albums", data);
    const pages = data.total;
    libraryAlbums.push(...data.items);
    const promises = libPromises(pages);
    Promise.all(promises).then(() => console.log(data));
  },
  function(err) {
    console.error(err);
  }
);
