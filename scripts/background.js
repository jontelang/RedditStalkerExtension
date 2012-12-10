if(localStorage["subreddits"] == null)
{
    localStorage["subreddits"] = "No subreddits saved";
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse)
  {
    console.log(" ");
    console.log("+++++++++Request+++++++++");
    console.log("+object recieved+");
    console.log(request);
    //console.log("what: " + request.what);
    //console.log("data: " + request.data);

    var returnData = null;

    if( request.what == "getSubreddits" )
    {
        returnData = {
            data : localStorage["subreddits"]
        }
        sendResponse( returnData );
    }
    else if( request.what == "save" )
    {
        console.log("+Action+\nSaving '"+request.data+"' to localStorage");
        localStorage["subreddits"] = request.data;
        returnData = {
            text : "Saved: \"" + request.data + "\" to local storage. <p>Refresh any reddit-tab to apply the changes.</p>"
        }
        sendResponse( returnData );
    }

    console.log("+Response object sent+");
    console.log(returnData);
  });