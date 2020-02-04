const CliendID = process.env.REACT_APP_SPOTIFY_API;
const redirectURL = process.env.REACT_APP_SPOTIFY_REDIRECT_URL;
let AccessToken;
let ExpiresIn;
let userIDspotify;
const Spotify = {
    getAccessToken() {
        if (AccessToken) {
            return AccessToken;
        }
        const AccessTokeninUrl = window.location.href.match(/access_token=([^&]*)/);
        const ExpiresIninUrl = window.location.href.match(/expires_in=([^&]*)/);
        if(AccessTokeninUrl && ExpiresIninUrl) {
            AccessToken = AccessTokeninUrl[1];
            ExpiresIn = Number(ExpiresIninUrl[1]);
            window.setTimeout(() => {AccessToken = ''}, ExpiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return AccessToken;
        } else {
            const RedictToSpotifyUrl = `https://accounts.spotify.com/authorize?client_id=${CliendID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
            window.location = RedictToSpotifyUrl;
        }
    },
    search(searchTerm) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${AccessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => (
                {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            ));
        });
    },
    savePlaylist(nameOfPlaylist, ArrayofTracks) {
        if (!(nameOfPlaylist && ArrayofTracks)) {
            return;
        }
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${AccessToken}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(responeJson => { 
            return responeJson.id;
        }).then(userID => {
            userIDspotify = userID;
            return fetch(`https://api.spotify.com/v1/users/${userIDspotify}/playlists/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
                body: JSON.stringify({
                    name: nameOfPlaylist
                })
            })
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.id
        }).then(IDnr => {
            const filteredList = ArrayofTracks.map(track => {
                return 'spotify:track:' + track.id;
            });
            return fetch(`https://api.spotify.com/v1/playlists/${IDnr}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: filteredList
                })
            });
        }).catch(e => {
            console.log('Fout: ' + e);
        })
    }
}
            

export default Spotify;