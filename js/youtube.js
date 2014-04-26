function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyBl5XOqJXoaKdPP6Z9eOKX7Yy5v_roEp40');
    
    search('Lokesh');
    getWatchLaterPlaylist();
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
    playlistId: 'WL-1B2neGHmNZ6xMB9midpJA'
  });
  request.execute(showResponse);
}

