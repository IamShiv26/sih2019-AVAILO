

var officerCardArea = document.querySelector('#main_cont_row');
var table_body = document.querySelector("#tbody");
//var loginbutton = document.querySelector('#login');
var key1;

if(!window.Promise){
    window.Promise=Promise;
}

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').then(function(){
        console.log("Service Worker Registered")
    }).catch(function(err){
        console.log(err);
    });
}
function clearCards(){
      while(table_body.hasChildNodes()){
        table_body.removeChild(table_body.lastChild);
      }
    }  

      function updateUI(data){
    clearCards();
    for(var i =0;i<data.length;i++){
      createRow(data[i]);
    }
  }

  var url="https://availo-api.herokuapp.com/officers";
  var networkDataRecieved = false;
  
  fetch(url).then(function(res) {
      return res.json();
    })
    .then(function(data) {
      networkDataRecieved=true;
      console.group("from web",data);
      for(var i=0;i<data.length;i++){
        updateUI(data);
      }
    });
  
    if('indexedDB' in window){
        readAllData('officer-cards').then(function(data){
          if(!networkDataRecieved){
            console.log('from cache',data);
            updateUI(data);
          }
        });
      }

      function createRow(data) {
        console.log('err');
        var row = document.createElement('tr');
        var name = document.createElement('td');
        name.className = 'mdl-data-table__cell--non-numeric';
        
        name.textContent = data.name;
        var designation =  document.createElement('td');
        designation.textContent = data.designation;
        var department =  document.createElement('td');
        department.textContent = data.department;
        var availability = document.createElement('td');
        if(data.status == "avl"){
            availability.textContent = "Available";
            availability.style.color="green";
      
        }
        else{
          availability.textContent = "Not-Available";
          availability.style.color="red";
        }
        row.appendChild(name);
        row.appendChild(designation);
        row.appendChild(department);
        row.appendChild(availability);
        table_body.appendChild(row);
      }

//       readAllData('login-tokens').then(function(data){
//     console.log("Data Read", data);
//     console.log(data[0].token);
//     key1 = data[0].token;
// });

// console.log(key1);

// loginbutton.addEventListener('click',function(event){
//     fetch("https://availo-api.herokuapp.com/officers/verify",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//             Authorization : "Bearer "+key1
//         }
//     }).then(function(res){
//         return res.json();
//     })
//     .then(function(data){
//         console.log(data);
//         if(data.message =="forbidden"){
//             loginbutton.href = "./login.html"
//         }
//         else{
//             loginbutton.href = "/profile.html?id="+data.id;
//         }
//     });

// });
  

//   if('indexedDB' in window){
//     readAllData('posts').then(function(data){
//       if(!networkDataRecieved){
//         console.log('from cache',data);
//         updateUI(data);
//       }
//     });
//   }
  


//     var txt = "";
// fetch('https://availo-api.herokuapp.com/officers').then(function(res){
// console.log(res);
// return res.json();
// })
// .then(function(json){
//     console.log(json);
//     var i;
// for (i = 0; i < json.length; i++){
//     txt+='<br>';
// txt += '<div class="mdl-cell mdl-cell--4-col"><div class="mdl-card mdl-shadow--2dp demo-card-wide"><div class="mdl-card__title"><h2 class="mdl-card__title-text">'+json[i].name+'</h2></div><div class="mdl-card__supporting-text">'+json[i].department+'</div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Get Started</a></div></div></div>';
// txt+='<br>';
// } 
// $('#main_cont_row').html(txt);
// });

