/**
 * Created by PaulZimmel on 11/8/15.
 */

//ADMIN JS page//

$(document).ready(function() {
    //getMessages
    //console.log($("#messageText").find("data[type=name]").val());
    enable();
});
//enable
function enable(){
    getMessages();
    $("#submitButton").on('click', inputMessage);
    $("#messageDisplay").on('click', '.delete_button', deleteMessage);
}
//input new messages
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
///AJAX Calls///
//post new messages to database
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
//get messages from database
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
//delete message
function deleteMessage(){
    var deletedID = {"id": $(this).data("id")};
    //console.log(deletedID);
    $.ajax({
        type:"DELETE",
        url: "/admin/data",
        data: deletedID,
        success: function(data){
            if(data){
                $("#adminMessages").text("Message Deleted!");
                //display message deleted!
                getMessages();
            }else{
                $("#userMessages").text("Unable to delete message");
            }
        }

    })
}

//Update DOM
//append messages to DOM
function updateDOM(messageArray){
    $("#messageDisplay").empty();

    for(var i = 0; i < messageArray.length; i++){
        var el = "<div class='message'>" +
            "<p>Title: " + messageArray[i].title + "</p>" +
            "<p class = 'message-text'>" + messageArray[i].message + "</p>" +
            "<p> username: " + messageArray[i].name + "</p>" +
            "<div class='delete_button' data-id='" +
            messageArray[i].id + "'>Delete</div>"+
            "</div>";
        //console.log(el);
        $("#messageDisplay").append(el);
    }
}