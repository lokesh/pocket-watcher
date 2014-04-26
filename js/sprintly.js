$(function() {

  var username  = 'lokesh@getaround.com';
  var password  = 'sjvVZXnp2LAACJUh6NTYSmwt9ChGGEjw';
  var productID = '15733';

  var API_BASE_URL        = 'https://sprint.ly/api';
  var API_RESOURCE_ITEMS  = '/products/' + productID + '/items.json';

  var url = API_BASE_URL + API_RESOURCE_ITEMS;

  // var httpHeaders = {"Authorization": "Basic " + Utilities.base64Encode(username + ':' + password)};

  $.ajax({
    type: 'GET',
    url: url,
    headers: {
      'Authorization': 'Basic' + btoa(username + ":" + password)
    },
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      // self.model.set('carAvailabilityStatus', data.update);
    },
    error: function(data) {
      // self.model.set('carAvailabilityStatus', "error");
    },
    complete: function(data, status) {
      
      console.log(data);
      // self.trigger('afterFetch');
    }
  });  

});



var API_BASE_URL        = 'https://sprint.ly/api';
var API_RESOURCE_PEOPLE = '/products/{productId}/people.json';
var API_RESOURCE_ITEMS  = '/products/{productId}/items.json';
var TSHIRT_POINTS       = {'~': 0, 'S': 1, 'M': 3, 'L': 5, 'XL': 8};

// Fetch API endpoint including HTTP basic authentication.
//
function urlFetch(resource, getParams) {  
  if (getParams == null) {getParams = {};}
  
  var username = UserProperties.getProperty('sprintlyUserEmail');
  var password = UserProperties.getProperty('sprintlyApiKey');
  var productId = ScriptProperties.getProperty('sprintlyProductId');
  
  var apiUrl = API_BASE_URL + resource.replace('{productId}', productId);
  var fullUrl = apiUrl;
  var queryString = '';
  for (var gKey in getParams) {
    queryString += (queryString ? '&' : '') + gKey + '=' + encodeURIComponent(getParams[gKey]);
  }
  fullUrl += queryString ? '?' + queryString : '';
  
  var httpHeaders = {"Authorization": "Basic " + Utilities.base64Encode(username + ':' + password)};
  
  return JSON.parse(UrlFetchApp.fetch(fullUrl, {headers: httpHeaders}));  
}

// Update users tab from Sprintly.
//
function updateUsers() {
  var users = urlFetch(API_RESOURCE_PEOPLE);
  var numUsers = users.length;
  
  var sheet = SpreadsheetApp.getActive().getSheetByName('People');
  //var dataRange = sheet.getDataRange();
  //dataRange.clearContent();
  
  sheet.getRange(1,1,1,6).setValues([['id', 'email', 'name', 'active', 'team', 'track?']]);
  for (var i=0; i < numUsers; i++) {
    var range = sheet.getRange(i+2,1,1,4);
    var user = users[i];
    range.setValues([[user.id, user.email, user.first_name + ' ' + user.last_name, user.revoked ? 'Deleted' : 'Active']]);
  }
}

// Update accepted items tab from Sprintly.
//
function updateItems() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Items');
  sheet.getDataRange().offset(1,0).clearContent();
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  // build lookup table of teams
  var peopleRange = SpreadsheetApp.getActive().getSheetByName('People').getDataRange();
  var peopleValues = peopleRange.offset(1,0,peopleRange.getNumRows()-1,peopleRange.getNumColumns()).getValues();
  var teams = {};
  for (var i=0; i<peopleValues.length; i++) {
    var person = peopleValues[i];
    teams[person[0]] = person;
  }

  // formats a data string as 2014-1-31
  function _simpleDate(aDate) {
    return aDate.getFullYear() + '-' + (aDate.getMonth() + 1) + '-' + aDate.getDate();
  }
  
  // build lookup table of sprints
  var sprintRange = SpreadsheetApp.getActive().getSheetByName('Weeks').getDataRange();
  var sprintValues = sprintRange.offset(1,0,sprintRange.getNumRows()-1,sprintRange.getNumColumns()).getValues();
  var sprints = {};
  for (var i=0; i<sprintValues.length; i++) {
    var sprint = sprintValues[i];
    sprints[_simpleDate(sprint[0])] = sprint;
  }

  // matches an arbitrary date to a sprint
  function _findSprint(aDate, ticketNo) {
    
    // clone date and modify local object only
    var checkDate = new Date(aDate.valueOf());
    
    // look back up to 3 weeks (longest sprint is 3 weeks)
    checkDate.setDate( checkDate.getDate() - ((checkDate.getDay() - 1) % 7) );
    if (_simpleDate(checkDate) in sprints) {
      return sprints[_simpleDate(checkDate)][5];
    }
    
    checkDate.setDate(checkDate.getDate() - 7);
    if (_simpleDate(checkDate) in sprints) {
      return sprints[_simpleDate(checkDate)][5];
    }
    
    checkDate.setDate(checkDate.getDate() - 7);
    if (_simpleDate(checkDate) in sprints) {
      return sprints[_simpleDate(checkDate)][5];
    }   
    
    return null;
  }
  
  do {
    // Get the latest from Sprintly in 100 ticket increments
    var items = urlFetch(API_RESOURCE_ITEMS, {status:   'accepted,completed,in-progress,backlog',
                                              order_by: 'oldest',
                                              offset:    lastRow-1,
                                              limit:     100});
    
    for (var i=0; i < items.length; i++) {
      var range = sheet.getRange(lastRow+i+1,1,1,lastCol);
      var item = items[i];
      var created_at = new Date(item.created_at.replace('+00:00','.000Z'));
      var started_at = item.progress && item.progress.started_at ? new Date(item.progress.started_at.replace('+00:00','.000Z')) : null;
      var closed_at = item.progress && item.progress.closed_at ? new Date(item.progress.closed_at.replace('+00:00','.000Z')) : null;
      var accepted_at = item.progress && item.progress.accepted_at ? new Date(item.progress.accepted_at.replace('+00:00','.000Z')) : null;
      var last_modified = new Date(item.last_modified.replace('+00:00','.000Z'));
      var current_at = new Date();
      range.setValues([[item.number,
                        item.title,
                        item.type,
                        item.status,
                        item.score,
                        TSHIRT_POINTS[item.score],
                        (!closed_at && started_at) ? (current_at-started_at)/1000/60/60/24 : (closed_at-started_at)/1000/60/60/24,
                        (closed_at && started_at) ? (closed_at-started_at)/1000/60/60/24 : null,
                        (accepted_at && started_at) ? (accepted_at-started_at)/1000/60/60/24 : null,
                        item.created_by.id,
                        item.created_by.first_name + ' ' + item.created_by.last_name,
                        item.assigned_to ? item.assigned_to.id : null,
                        item.assigned_to ? item.assigned_to.first_name + ' ' + item.assigned_to.last_name : null,
                        item.accepted_by ? item.accepted_by.id : null,
                        item.accepted_by ? item.accepted_by.first_name + ' ' + item.accepted_by.last_name : null,
                        item.assigned_to ? teams[item.assigned_to.id][4] : null,
                        created_at,
                        started_at,
                        closed_at,
                        accepted_at,
                        last_modified,
                        started_at ? _findSprint(started_at, item.number) : null,
                        closed_at ? _findSprint(closed_at) : null,
                        accepted_at ? _findSprint(accepted_at) : null,
                        item.tags.join(),
                        item.short_url]]);
    }
    lastRow += items.length;
  } while (items.length > 0);
}

/**
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function readRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues()
  
  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    Logger.log(row);
  }
};

// Add menu items when the spreadsheet loads.
//
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{name : "Update People",
                  functionName : "updateUsers"},
                 {name : "Update Items",
                  functionName : "updateItems"}];
  sheet.addMenu("Sprintly", entries);
};
