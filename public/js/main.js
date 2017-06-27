$("document").ready(function(){
    
    // include socket.io lib
    var socket   = io.connect();

    // get varaiables
    var sendform = $("#sendform"),
        message  = $("#message"),
        button   = $("#submit"),  
        chat     = $("#chat");
        
        // send message to server
        sendform.submit(function(event){

            event.preventDefault();

            if(message.val() !== ""){

            socket.emit("messagae to server" , message.val());
            message.val("");
            }

        });  

      // reccive message from server

      socket.on("send message from server",function(data){

        chat.append("<span class='name'>" + data.name + "</span> " + "  " +"  <span class='mess'>"+data.mess +"</span><br />");

      });

      // submit username 
      var username = $(".username");
      $(".loginform").submit(function(event){
        
        event.preventDefault();
        if(username.val() !== ""){
            
            socket.emit("new user", username.val(), function(data){

                if(data){
                    $(".loginuser").hide();
                    $(".all").show();

                }else{

                    $(".ErrorLogin").html("This Name Is Already Tacken! Choose Another One");
                }
            });

            username.val("");
        }else{

            alert("Enter youe username");
        }
      });

      socket.on("users",function(data){

        var html = "";
        for(i=0; i<data.length ; i++){

            html = html + data[i] + "<br />";
        }
        $(".users").html(html);
      });

    
});