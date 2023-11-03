// Importing necessary spreadsheet and script libraries
var SPREADSHEET_URL = "[PUT HERE THE URL OF YOUR GOOGLE SHEET]";
var spreadsheetAccess = new SpreadsheetAccess(SPREADSHEET_URL, "Overspending Alert Weekly Budget");

// Extracting the email address from the spreadsheet
var email = spreadsheetAccess.sheet.getRange(6, 6).getValue();

// Declaration of a variable for counting total columns
var totalColumns;

// Entry point of the script
function main() {
  // Retrieving the headers (columns) from the spreadsheet
  var columns = spreadsheetAccess.sheet.getRange(5, 2, 5, 100).getValues()[0];
  
  // Determining the index of the last non-empty column or the "Results" column
  for (var i = 0; i < columns.length; i++) {
    if (columns[i].length == 0 || columns[i] == 'Results') {
      totalColumns = i;
      break;
    }
  }

  // Adding a "Results" column if it doesn't exist
  if (columns[totalColumns] != 'Results') {
    spreadsheetAccess.sheet.getRange(5, totalColumns + 2, 1, 1).setValue("Results");
  }

  // Clearing the "Results" column
  spreadsheetAccess.sheet.getRange(6, totalColumns + 2, 1000, 1).clear();

  // Process each row in the spreadsheet
  var row = spreadsheetAccess.nextRow();
  while (row != null) {
    var budget;
    try {
      // Parsing the budget value from the row
      budget = parseBudget(row);
    } catch (ex) {
      // Handling errors and logging
      logError(ex);
      row = spreadsheetAccess.nextRow();
      continue;
    }

    // Constructing a selector for AdWords campaigns
    var selector = AdWordsApp.campaigns();
    for (var i = 2; i < totalColumns; i++) {
      var header = columns[i];
      var value = row[i];
      if (!isNaN(parseFloat(value)) || value.length > 0) {
        // Applying conditions to the selector based on headers and values
        if (header.indexOf("'") > 0) {
          value = value.replace(/\'/g,"\\'");
        } else if (header.indexOf("\"") > 0) {
          value = value.replace(/"/g,"\\\"");
        }
        var condition = header.replace('?', value);
        selector.withCondition(condition);
      }
    }

    // Fetching campaigns based on conditions
    var campaigns = selector.get();
    
    try {
      campaigns.hasNext();
    } catch (ex) {
      // Handling errors and logging
      logError(ex);
      row = spreadsheetAccess.nextRow();
      continue;
    }

    var fetched = 0;
    var emailSent = 0;
    
    while (campaigns.hasNext()) {
      var campaign = campaigns.next();
      var oldCost = campaign.getStatsFor("LAST_7_DAYS").getCost();
      var account = spreadsheetAccess.sheet.getRange(2, 10).getValue();
      var client = spreadsheetAccess.sheet.getRange(3, 4).getValue();

      
      fetched++;
		if (budget*1.1 <= oldCost || budget/1.1 >= oldCost) {
		  // Sending an email notification
		  var subjectText = 'The Campaign ' + campaign.getName() + ' of the Google Ads Account ' + account + ' (' + client + ') requires attention! It is over or underspending by more than 10%.';
		  var bodyText = 'Dear charismatic Advance Metrics Employee,<br><br>This is to notify you that the campaign ' + campaign.getName() + ' in the Google Ads Account ' + account + ' (' + client + ') requires your attention due to It is over or underspending by more than 10%.' + '<br><br>' + 'Weekly budget planned: ' + budget.toFixed(2) + '<br>' + 'Weekly cost: ' + oldCost;
		  MailApp.sendEmail({
          to: spreadsheetAccess.sheet.getRange(6, 6).getValue(),
          subject: subjectText,
		  htmlBody: bodyText
        });
        emailSent++;
      }
    }
    // Logging the results
    logResult("Fetched " + fetched + "\nEmail sent " + emailSent);
    
    row = spreadsheetAccess.nextRow();
  }
  // Getting the current date and time
  var now = new Date(Utilities.formatDate(new Date(),
    AdWordsApp.currentAccount().getTimeZone(), "MMM dd,yyyy HH:mm:ss"));
}

// Function to parse budget from a row
function parseBudget(row) {
  if (row[1].length == 0) {
    return null;
  }
  var limit = parseFloat(row[1]);
  if (isNaN(limit)) {
    throw "Bad Argument: must be a number.";
  }
  return limit;
}

// Logging errors
function logError(error) {
  var subject = "Error Encountered in Weekly Budget Overspending Script " + campaign.getName() + ' in the Google Ads Account ' + account + ' (' + client + ')';
	var message = "An error occurred: " + error;
  var email = "service@advance-metrics.com";
	MailApp.sendEmail({
	  to: email,
	  subject: subject,
	  body: message
	});
  }

// Logging results
function logResult(result) {
  // Logging results with specific formatting
  spreadsheetAccess.sheet.getRange(spreadsheetAccess.currentRow(), totalColumns + 2, 1, 1)
    .setValue(result)
    .setFontColor('#444')
    .setFontSize(8)
    .setFontWeight('normal');
}

// Helper class to access spreadsheet data
function SpreadsheetAccess(spreadsheetUrl, sheetName) {
  this.spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  this.sheet = this.spreadsheet.getSheetByName(sheetName);
  this.cells = this.sheet.getRange(6, 2, this.sheet.getMaxRows(), this.sheet.getMaxColumns()).getValues();
  this.rowIndex = 0;

  // Function to retrieve the next non-empty row
  this.nextRow = function() {
    for (; this.rowIndex < this.cells.length; this.rowIndex++) {
      if (this.cells[this.rowIndex][0]) {
        return this.cells[this.rowIndex++];
      }
    }
    return null;
  }
  
  // Function to retrieve the current row index
  this.currentRow = function() {
    return this.rowIndex + 5;
  }
}
