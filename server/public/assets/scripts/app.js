/**
 * Created by PaulZimmel on 11/6/15.
 */
$(document).ready(function() {
    //getMessages
    //console.log($("#messageText").find("data[type=name]").val());
    getMessages();
    $("#submitButton").on('click', inputMessage);

});

function inputMessage(){
    event.preventDefault();
    var message = {};

    $.each($("#inputMessage").serializeArray(), function(i, field){
        message[field.name] = field.value;
    });

    $("#inputMessage").find("[type=text]").val("");
    console.log(message);
   postMessage(message);

}

function postMessage(messageObject){
    $.ajax({
        type:"POST",
        url: "/data",
        data: messageObject,
        success: function(data){
            console.log(data, "it came back");
            //append message to the extent of, "message saved"
            getMessages();
        }
    })
}
function getMessages(){
    $.ajax({
        type:"GET",
        url:"/data",
        success: function(data){
            //$("#messageDisplay").append(data[0].title);
            updateDOM(data);
            console.log(data);
        }
    });
}

function updateDOM(messageArray){
    $("#messageDisplay").empty();

    for(var i = 0; i < messageArray.length; i++){
        var el = "<div class='message'>" +
            "<p>Title: " + messageArray[i].title + "</p>" +
            "<p>" + messageArray[i].message + "</p>" +
            "<p>Name: " + messageArray[i].name + "</p>" +
            "</div>";
        //console.log(el);
        $("#messageDisplay").append(el);
    }
}
//init
    //put up stuff
    //get data from database to populate message board
//enable
    //submit click listeners
    //click listeners on each message on the message board
        //display full message