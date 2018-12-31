import spotifyWebApi from "spotify-web-api-js";

const libPromises = (spotifyApi, libraryAlbums, total, queryParam) => {
  const spPromises = [];
  let newOffset = queryParam.limit;
  while (total > newOffset) {
    const spPromise = spotifyApi
      .getMySavedAlbums({ limit: queryParam.limit, offset: newOffset })
      .then(data => libraryAlbums.push(...data.items));
    spPromises.push(
      spotifyApi.getMySavedAlbums({
        limit: queryParam.limit,
        offset: newOffset
      })
    );
    newOffset = newOffset + queryParam.limit;
  }
  return spPromises;
};

const retrieveAlbums = (spotifyApi, limit) => {
  const libraryAlbums = [];
  spotifyApi.getMySavedAlbums({ limit, offset: 0 }).then(
    function(data) {
      console.log("Ma albums", data);
      const pages = data.total;
      libraryAlbums.push(...data.items);
      const promises = libPromises(libraryAlbums, pages);
      Promise.all(promises).then(() => {
        return libraryAlbums;
      });
    },
    function(err) {
      console.error(err);
    }
  );
};

const retrieveArtistInformation = data => {};
const retrieveTrackAudioFeatures = data => {};

const retrieveTrackInfo = data => {};
