// On submit, run saveissue
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

//Function to save the issue
function saveIssue(e) {
    // Create variables that grab elements on page
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    // Set the issue id to a global id
    var issueId = chance.guid();
    // Set the status to open
    var issueStatus = 'Open';
    // Set issue variable items
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };
    // If the storage is null, push the array items
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        //Set local storage item
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        //Else, get the items in local storage
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        //push new items into local storage
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    //reset input form
    document.getElementById('issueInputForm').reset();
    //run fetchIssues function
    fetchIssues();
    //Prevent page reloading
    e.preventDefault();
}
//Closed status
function setStatusClosed(id) {
    //Get local storage
    var issues = JSON.parse(localStorage.getItem('issues'));
    //Set status as closed
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }
    //Set the local storage item
    localStorage.setItem('issues', JSON.stringify(issues));
    //Grab the issues
    fetchIssues();
}
//Delete issues
function deleteIssue(id) {
    //Grab from local storage
    var issues = JSON.parse(localStorage.getItem('issues'));
    //splice the id and issue
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    //set local storage item
    localStorage.setItem('issues', JSON.stringify(issues));
    //Grab issues
    fetchIssues();
}
//Grab the issues
function fetchIssues() {
    //Grab from local storage 
    var issues = JSON.parse(localStorage.getItem('issues'));
    //grab id for issuelist var
    var issuesList = document.getElementById('issuesList');
    //Blank out the text
    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        //Attach the issue with the trait
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        //Add html to page
        issuesList.innerHTML += '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
            '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }
}