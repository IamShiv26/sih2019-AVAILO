//document.addEventListener('load',function(event

clearAllData('login-tokens').then(function(){
  console.log("Login token cleared");
});

clearAllData('officer-cards').then(function(){
  console.log("Login id cleared");
});

readAllData('login-tokens').then(function(res){
  console.log("Empty db",res.length);
});

$("#action").click( function(){
    var email = $("#email").val();
    var password = $("#password").val();
    fetch('https://availo-api.herokuapp.com/officers/login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',

        },
        body: JSON.stringify(
          {
            email: email,
            password: password
          }
        )
      }
    )
    .then(function(response){
      $("#email").val('');
       $("#password").val('');
      return response.json();
    })
    .then(function(data){
      writeData('login-tokens',data)
      .then(function(){
          console.log("Token Added");
          //document.querySelector("#action").href = "./index.html";
      })
    })
    .catch(err => alert("error! " + err));
    // var officers = await fetch('https://availo-api.herokuapp.com/officers');
    // var json = await officers.json();
    // alert(json);
  });