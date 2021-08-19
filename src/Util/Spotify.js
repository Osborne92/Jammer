const clientId = '';
const redirectUri = "http://localhost:3000/"
let accessToken;

const Spotify = {
    getAccessToken() { // get users access token so that requests can be made to the api
        if (accessToken) {
            return accessToken // if token already exists, return it
        }
        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); // window.location.href locates current url. Captures characters assigned to access token. ([^&]*)/ captures all charcters in the access token
        const expiresinMatch = window.location.href.match(/expires_in=([^&]*)/);
        // if accessTokenMatch & expiresinMatch are in the url...
        if (accessTokenMatch && expiresinMatch) {
            // sets value for accessToken
            accessToken = accessTokenMatch[1];
            // sets expiration time
            const expiresIn = Number(expiresinMatch[1])

            // clears parameters, allowing the use of a new access token once the other one expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            // if no access token or expiration match, redirect user to below url
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        // sets accesstoken to the token that was just created from the method above
        const accessToken = Spotify.getAccessToken()
        // fetches the information that the user requests
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            // access token used for authorization header
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            // converts response to json
            return response.json()
        }).then(jsonResponse => {
            // if no tracks, return empty array
            if (!jsonResponse.tracks) {
                return [];
                // if tracks exist, return array of tracks
            } else {
                // maps through the items array withing the tracks object in the api 
                return jsonResponse.tracks.items.map(banana => ({
                    id: banana.id,
                    name: banana.name,
                    artist: banana.artists[0].name,
                    album: banana.album.name,
                    uri: banana.uri
                }))
            }
        })
    },

    savePlaylist(name, trackUris) {
        // if there's no name or tracks, return that which would be nothing
        if (!name || !trackUris.length) {
            return;
        }
        // access token
        const accessToken = Spotify.getAccessToken();
        // authorizatio header
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        // user id variable
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then(response => response.json())
            .then(jsonResponse => {
                // sets the userId variable equal to the id of the returned jsonResponse id
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    // name is passed in as the method's argument. allows user to name playlist
                    body: JSON.stringify({ name: name })
                }).then(response => response.json())
                    .then(jsonResponse => {
                        // sets variable equal to the id of jsonResponse
                        const playlistId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackUris })
                        })
                    })
            })
    }
}

export default Spotify