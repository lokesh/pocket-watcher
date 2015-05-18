var scopes = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly';
var playlistId = 'WL-1B2neGHmNZ6xMB9midpJA';

function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
  gapi.client.setApiKey(GAPI_KEY);
  window.setTimeout(checkAuth,1);
    
  // search('Lokesh');
  // getWatchLaterPlaylist();
}

function checkAuth() {
  gapi.auth.authorize({client_id: GAPI_CLIENTID, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    getWatchLaterPlaylist();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: GAPI_CLIENTID, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

function showResponse(response) {
  var responseString = JSON.stringify(response, '', 2);
  $('#response').prepend(responseString);
}

function search(query) {
  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    q: query
  });
  request.execute(showResponse);
}

function getWatchLaterPlaylist() {
  var request = gapi.client.youtube.playlistItems.list({
    part: 'snippet',
    playlistId: playlistId
  });
  request.execute(showResponse);
}
