class SpotifyLibrary {
  constructor(accessToken, spotifyApi) {
    this.spotifyApi = spotifyApi;
    this.spotifyApi.setAccessToken(accessToken);
    this.albums = [];
    this.tracks = [];
  }

  retrieveAlbums = () => {};
  retrieveTracks = () => {};
  retrieveArtistInformation = () => {};
  retrieveTrackAudioFeatures = () => {};
  filterTracks = () => {};
  filterAlbums = () => {};
}
