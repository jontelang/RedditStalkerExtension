var BIGRESULTLIST = "";

function getSubmitted(username,resultarea,chosenvalue,after,first)
{
    // reset when it is the first recursion-level.
    if(first==true){BIGRESULTLIST="";}

    $.get(
        "http://www.reddit.com/user/"+username+"/submitted.json?limit=100&after="+after,
        function(reply)
        {
            var count = 1;
            $.each(reply.data.children,function(key,value)
            {
                if( value.data["subreddit"].toLowerCase() == chosenvalue.toLowerCase() )
                {
                    BIGRESULTLIST += " <a href='http://www.reddit.com"+value.data["permalink"]+"'>"+(count++)+"</a>,";
                }
            });

            console.log("reply.data.after: " + reply.data.after);
            if( reply.data.after != null )
            {   getSubmitted(username,resultarea,chosenvalue,reply.data.after,false);
            }else{
                if(BIGRESULTLIST=="") BIGRESULTLIST="Nothing";
                resultarea.html(BIGRESULTLIST);
            }
        },
        "json"
    );
}

chrome.extension.sendMessage({what:"getSubreddits"}, function(response)
{
    var readyStateCheckInterval = setInterval(function()
    {
        if (document.readyState === "complete")
        {
            clearInterval(readyStateCheckInterval);

            //\\
            //\\ Get the saved subreddits
            //// from the extension
            ///
            //
            // --here goes the codes--
            var extras = [];
            var extrareddits = response.data.split(",");
            for (var i = extrareddits.length - 1; i >= 0; i--) {
                extras.push("<option>"+extrareddits[i]+"</option>");
            };

            //
            ////
            ////// Find everything and add events etc etc...
            ////
            //
            $(".noncollapsed").each(function()
            {
                var userlink = $(this).find("a")[1];
                if( userlink != null)
                {
                    var username    = userlink.innerHTML;
                    var resultarea  = $("<span style='margin-right:5px;'></span>");
                    var choose      = $("<select style='width:25px;height:10px;margin-right:5px;'></select>");

                    choose.insertBefore(userlink);
                    resultarea.insertAfter(choose);

                    choose.one('hover',function(){
                        var options     = "<option></option><option>gonewild</option><option>funny</option><option>askreddit</option><option>------------</option>" + extras;
                        choose.html(options);
                    });

                    choose.change(function()
                    {
                        // Loading animated gif.
                        var imglink = chrome.extension.getURL("scripts/l.gif");
                        resultarea.html("<img src='"+imglink+"' />");
                        getSubmitted(username,resultarea,choose.val(),null,true);
                    });
                }
            });
        }
    }, 10);
});











