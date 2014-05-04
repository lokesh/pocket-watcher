var clientId = '967186682027-hhbgqn4l3tdi5u1arf9rsmi0ahguribj.apps.googleusercontent.com';
var apiKey = 'AIzaSyBl5XOqJXoaKdPP6Z9eOKX7Yy5v_roEp40';
var scopes = 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly';
var playlistId = 'WL-1B2neGHmNZ6xMB9midpJA';

function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
    
  // search('Lokesh');
  // getWatchLaterPlaylist();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
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
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
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
