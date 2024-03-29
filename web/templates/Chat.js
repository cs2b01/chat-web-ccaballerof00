var currentUserId = 0;
var currentClickedId = 0;
    function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                $('#cu_username').html(response['username'])
                var name = response['name']+" "+response['fullname'];
                currentUserId = response['id']
                $('#cu_name').html(name);
                allusers();
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function allusers(){
        $.ajax({
            url:'/users',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var i = 0;
                $.each(response, function(){
                    f = '<div class="alert alert-secondary" role="alert" onclick=loadMessages('+currentUserId+','+response[i].id+') >';
                    f = f + response[i].username;
                    f = f + '</div>';
                    i = i+1;
                    $('#allusers').append(f);
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }
     function loadMessages(user_from_id, user_to_id){
        //alert(user_from_id);
        //alert(user_to_id);
         currentClickedId = user_to_id;
        $.ajax({
            url:'/messages/'+user_from_id+"/"+user_to_id,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                $('#_messages').empty();
                var r = 0;
                $.each(response, function(){
                    d = '<div>';
                    d = d + response[r].content;
                    d = d + '</div>';
                    r = r+1;
                    $('#_messages').append(d);
                });
            },
            error: function(response){
                alert(JSON.stringify(response));

            }
        });
    }


    function sendMessage(){
        var message = $('#postmessage').val();
        $('#postmessage').val('');

        var data = JSON.stringify({
                "user_from_id": currentUserId,
                "user_to_id": currentClickedId,
                "content": message
            });

        $.ajax({
            url:'/gabriel/messages',
            type:'POST',
            contentType: 'application/json',
            data : data,
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });





    }
