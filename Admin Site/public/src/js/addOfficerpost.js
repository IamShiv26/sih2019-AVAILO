// var latitude = document.querySelector('#latitude');
// var longitude= document.querySelector('#longitude');
var form = document.querySelector('#postForm');
// var name = document.querySelector('#name');
// var email = document.querySelector('#email');
// var phno = document.querySelector('#phno');

        $(document).ready(function() {
            $(window).keydown(function(event){
            if(event.keyCode == 13) {
              event.preventDefault();
              return false;
            }
          });
        });

            
         form.addEventListener('submit', function(event){
            event.preventDefault();
            console.log("Form");
            console.log($("#latitude").val());
                fetch('https://availo-api.herokuapp.com/officers/add',
                {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    },
                    // mode:"no-cors",
                    // origin:"*",
                    body : JSON.stringify({
                        officeLocation:{
                            latitude:$("#latitude").val(),
                            longitude:$("#longitude").val()
                        },
                        workingHours:{
                            startTime:new Date(0,0,0,$("#startTime").val().substring(0,2),$("#startTime").val().substring(3),0),
                            endTime:new Date(0,0,0,$("#endTime").val().substring(0,2),$("#endTime").val().substring(3),0)
                        },
                            address:$("#address").val(),
                            phoneNo : $("#number").val(),
                            name:$("#name").val(),
                            email:$('#email').val(),
                            designation:$('#designation').val(),
                            password : $('#password').val(),
                            department:$("#department").val(),
                            status:"AVL",
                            phoneExtension:$("#phoneExtension").val(),
                            description:$("#description").val()
                        })
                }).then(function(res) {
                    console.log(res);
                    alert("Officer Added successfully!!")
                }).catch(function(err){
                    console.log(err);
                });

         });