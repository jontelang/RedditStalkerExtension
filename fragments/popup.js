// Send a message to the background.js
chrome.extension.sendMessage(
    {
        what:"getSubreddits"
    },
    function(response)
    {
        console.log(response);
        $("#subreddits").attr("value",response.data);
    }
);

$("#form").submit(function(){
    chrome.extension.sendMessage(
        {
            what : "save",
            data : $("#subreddits").val()
        },
        function(response){
            $("#status").html(response.text);
        }
    );
    return false;
});