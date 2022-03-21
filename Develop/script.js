// Connect to HTML
var timeBlockContainerEl = $(".container")
var currentDayEl = $("#currentDay");
var timeBlocksUL = $("#timeBlocksUL");

// Write the date in the banner
var today = moment().format('dddd, Do MMMM YYYY');
var thisHour = parseInt(moment().format("HH"));
currentDayEl.text(today);

// Dynamically Make Timeblocks ----------------------------------------
var timeBlocksArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
for (var time in timeBlocksArray) {
    // Make timeblock Div
    var newTimeBlock = $('<div>');
    newTimeBlock.addClass('row time-block');
    newTimeBlock.attr("id", timeBlocksArray[time]);
    timeBlockContainerEl.append(newTimeBlock);

    // Make timeblock label
    var newTimeBlockLabel = $('<label>');
    newTimeBlockLabel.addClass("description col-1");
    newTimeBlockLabel.text(timeBlocksArray[time] + ":00");
    newTimeBlock.append(newTimeBlockLabel);

    // Make timeblock text area
    var newTimeBlockTextArea = $("<textarea>");
    newTimeBlockTextArea.addClass("form-control textarea col-10");
    newTimeBlockTextArea.attr("id", "meeting" + timeBlocksArray[time]);
    newTimeBlockTextArea.attr("rows", "2");

    // Change colours to suit current time
    if (timeBlocksArray[time] < thisHour) {
        newTimeBlockTextArea.addClass("past");
    } else if (timeBlocksArray[time] === thisHour) {
        newTimeBlockTextArea.addClass("present");
    } else { newTimeBlockTextArea.addClass("future"); }


    newTimeBlock.append(newTimeBlockTextArea);

    // make Buttons
    var newTimeBlockButton = $("<button>");
    newTimeBlockButton.addClass("saveBtn col-1");
    // make Icon
    var newSaveButtonIcon = $("<i>");
    newSaveButtonIcon.addClass("fa fa-save");

    newTimeBlockButton.append(newSaveButtonIcon);
    newTimeBlock.append(newTimeBlockButton);
};

// Add clear local storage button
var clearAllButton = $("<button>");
clearAllButton.text("Clear All");
clearAllButton.addClass("btn btn-danger");
clearAllButton.css("margin-top", "20px");
timeBlockContainerEl.append(clearAllButton);
clearAllButton.on('click', function () {
    localStorage.clear();
    location.reload();
});

// --------------------------------------------------------------------------

// Function to Save Meeting to Local Storage -------------------------------
function saveMeeting(event) {
    // Check if they clicked on the icon or the button, then get the id
    if ($(event.target).parent().attr('id')) {
        var clickedMeetingID = $(event.target).parent().attr('id');
        var clickedMeetingTextArea = $(event.target).parent().children('textarea');
    } else {
        var clickedMeetingID = $(event.target).parent().parent().attr('id');
        var clickedMeetingTextArea = $(event.target).parent().parent().children('textarea');
    }

    // Save Meeting to local storage
    meetingDescription = clickedMeetingTextArea.val();
    localStorage.setItem(clickedMeetingID.toString(), meetingDescription);
};
// ------------------------------------------------------------------------------

// Startup Function
function init() {
    // Load local storage items into web page
    for (time in timeBlocksArray) {
        if (localStorage.getItem(timeBlocksArray[time].toString())) {
            var thisMeetingTextAreaId = "meeting" + timeBlocksArray[time];
            var thisMeetingTextArea = $("#" + thisMeetingTextAreaId);
            thisMeetingTextArea.text(localStorage.getItem(timeBlocksArray[time].toString()));
        }
    }

    // Add event listeners
    timeBlockContainerEl.on('click', 'button', saveMeeting);

}

// Start Web page on ready
$(document).ready(init);





