/**
 * Created by PaulZimmel on 11/6/15.
 */
$(document).ready(function() {
    //getMessages
    //console.log($("#messageText").find("data[type=name]").val());
   enable();

});

//enable function
function enable(){
    getMessages();
    $("#submitButton").on('click', inputMessage);
}

//input new message
function inputMessage(){
    event.preventDefault();
    var message = {};

    $.each($("#inputMessage").serializeArray(), function(i, field){
        message[field.name] = field.value;
    });

    $("#inputMessage").find("[type=text]").val("");
    //console.log(message);
   postMessage(message);

}

////AJAX Calls////
//post new message to database
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
//get messages from server
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

//Append Functions
//append messages to DOM
function updateDOM(messageArray){
    $("#messageDisplay").empty();

    for(var i = 0; i < messageArray.length; i++){
        var el = "<div class='message'>" +
            "<p>Title: " + messageArray[i].title + "</p>" +
            "<p class = 'message-text'>" + messageArray[i].message + "</p>" +
            "<p> username: " + messageArray[i].name + "</p>" +
            "</div>";
        //console.log(el);
        $("#messageDisplay").append(el);
    }
}
