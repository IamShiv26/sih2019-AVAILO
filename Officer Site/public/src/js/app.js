

var officerCardArea = document.querySelector('#main_cont_row');
var loginbutton = document.querySelector('#login');
var loginbutton1 = document.querySelector('#loginDrawer');
var table_body = document.querySelector("#tbody");
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
// function clearCards(){
//     while(officerCardArea.hasChildNodes()){
//       officerCardArea.removeChild(officerCardArea.lastChild);
//     }
//   }
  
//   function createOfficerCard(data) {
//     var cardGrid = document.createElement('div');
//     cardGrid.className = 'mdl-cell mdl-cell--4-col';
//     var cardWrapper = document.createElement('div');
//     cardWrapper.className = 'mdl-card mdl-shadow--2dp demo-card-wide';
//     cardGrid.appendChild(cardWrapper);
//     var cardTitle = document.createElement('div');
//     cardTitle.className = 'mdl-card__title';
//     var cardTitleTextElement = document.createElement('h2');
//     cardTitleTextElement.className = 'mdl-card__title-text';
//     cardTitleTextElement.textContent = data.name;
//     cardTitle.appendChild(cardTitleTextElement);
//     cardWrapper.appendChild(cardTitle);
//     var cardSupportingText = document.createElement('div');
//     cardSupportingText.className = 'mdl-card__supporting-text';
//     cardSupportingText.textContent = data.status;
//     // var cardSaveButton = document.createElement('button');
//     // cardSaveButton.textContent="Save"; 
//     // cardSaveButton.addEventListener('click', onSaveButtonClicked);
//     // cardSupportingText.appendChild(cardSaveButton);
//     cardWrapper.appendChild(cardSupportingText);
//     var cardAction = document.createElement('div');
//     cardAction.className = 'mdl-card__actions mdl-card--border';
//     var cardActionButton = document.createElement('a');
//     cardActionButton.className = 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect';
//     cardActionButton.textContent = 'Get Officer Information';
//     cardActionButton.href = './profile.html?id='+data._id;
//     cardAction.appendChild(cardActionButton);
//     cardWrapper.appendChild(cardAction);
//     componentHandler.upgradeElement(cardWrapper);
//     officerCardArea.appendChild(cardGrid);
//   }
  
//   function updateUI(data){
//     clearCards();
//     for(var i =0;i<data.length;i++){
//       createOfficerCard(data[i]);
//     }
//   }
  
//   var url="https://availo-api.herokuapp.com/officers";
//   var networkDataRecieved = false;
  
//   fetch(url).then(function(res) {
//       return res.json();
//     })
//     .then(function(data) {
//       networkDataRecieved=true;
//       console.group("from web",data);
//       var dataArray=[];
//       for(var key in data){
//           dataArray.push(data[key]);
//       }
//       updateUI(dataArray);
//     });
  
//     if('indexedDB' in window){
//         readAllData('officer-cards').then(function(data){
//           if(!networkDataRecieved){
//             console.log('from cache',data);
//             updateUI(data);
//           }
//         });
//       }

      readAllData('login-tokens').then(function(data){
    console.log("Data Read", data);
    console.log(data[0].token);
    key1 = data[0].token;
});

console.log(key1);

loginbutton1.addEventListener('click',function(event){
    fetch("https://availo-api.herokuapp.com/officers/verify",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization : "Bearer "+key1
        }
    }).then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
        if(data.message =="forbidden"){
            loginbutton1.href = "./login.html"
        }
        else{
            loginbutton1.href = "/profile.html?id="+data.id;
        }
    });

});

loginbutton.addEventListener('click',function(event){
    fetch("https://availo-api.herokuapp.com/officers/verify",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization : "Bearer "+key1
        }
    }).then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
        if(data.message =="forbidden"){
            loginbutton.href = "./login.html"
        }
        else{
            loginbutton.href = "/profile.html?id="+data.id;
        }
    });

});


//   if('indexedDB' in window){
//     readAllData('posts').then(function(data){
//       if(!networkDataRecieved){
//         console.log('from cache',data);
//         updateUI(data);
//       }
//     });
//   }
  

// readAllData("login-tokens").then(function(data){
//     if(data.length!=0){
//         navigator.geolocation.getCurrentPosition(function(position){
//             var latitude = position.coords.latitude;
//             var longitude = position.coords.longitude;
//             writeData('current-coords',{
//                 latitude:latitude,
//                 longitude:longitude,
//                 id:new Date()
//             }).then(function(res){
//                 console.log("Coords Stored",res);
//             })
//         });
//     }
// });


readAllData("login-tokens").then(function(data){
        if(data.length!=0){
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            var id1 = navigator.geolocation.watchPosition(function(pos){
                var crd = pos.coords;
                console.log(crd);
                writeData('current-coords',{
                    latitude:crd.latitude,
                    longitude:crd.longitude,
                    id:new Date()
                }).then(function(res){
                    console.log("Coords Stored",res);
                })
                
            }, function(err){
                console.warn('ERROR(' + err.code + ')' + err.message);
            }, options);
        }
    });
    
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

function configurePushSub(){
    if(!('serviceWorker' in navigator)){
        return;
    }
    var reg;
    navigator.serviceWorker.ready.then(function(swreg){
        reg=swreg;
        return swreg.pushManager.getSubscription();
    })
    .then(function(sub){
        if(sub==null){
            //create new Subsciption
            var vapidPublicKey = "BDQ2A1k5b4RzV73Bf_uIWAA_4lWwOtIdXTXYFZErahePxfja13ALOmcWWXP-SQpNJ-flOwRZnWbyd87szPlAAFw";
            var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
            return reg.pushManager.subscribe({
                userVisibleOnly : true,
                applicationServerKey:convertedVapidPublicKey
            })
            .then(function(newSub){
                console.log(newSub);
                return fetch("https://availo-api.herokuapp.com/algos/subscribe",{
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    },
                    body:JSON.stringify(newSub)
                })
            })
            .then(function(response){
                if(response.ok){
                    console.log("Subscription sent ",response);
                }
            })
            .catch(function(err){
                console.log(err);
            });
        }
        else{
            //We have a subscription
            console.log("Already exists");
        }
    });

}
    

askForNotificationPermissions();

function askForNotificationPermissions(){
    Notification.requestPermission(function(result){
        console.log("User Choice",result);
        if(result !=='granted'){
            console.log("No Notification Permission Granted!");
        }
        else{
            configurePushSub();
            //Hide Button
            //displayConfirmedNotifications();

        }
    });
}

// var intervalID = setTimeout(function(){
//     readAllData('officer-cards').then(function(data){
//         if(data.length!=0){
//             console.log("Function called")
//             var id1, target, options;
//     var lastTimeStamp;
//     var LIMIT = 1000 * 30;
//     var id =data[0]._id; // TODO: put id here
//     console.log(id);
//     function success(pos) {
//     var crd = pos.coords;
//     //document.querySelector('#myLocation').innerHTML = crd.latitude + ", " + crd.longitude;
//     if(typeof lastTimeStamp === 'undefined'){ // no last timestamp
//     lastTimeStamp = new Date().getTime();
//     console.log(crd.latitude, crd.longitude);
//     fetch('https://availo-api.herokuapp.com/coords', {
//       method: 'POST',
    
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(
//         {
//           _id: id,
//           location: {
//             latitude: crd.latitude,
//             longitude: crd.longitude
//           }
//         }
//     )
//     }).then(function(res){
//         console.log(res);
//     }).catch(function(err){
//       console.log(err);
//     });
//     }
//     else{
//     console.log(crd.latitude, crd.longitude);
//     // var cds = crd.latitude + "," + crd.longitude;
//     // fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + cds + '&radius=100&key=AIzaSyBswU5dhAix0bAR2cs6xDF_MhCPbSumJ7c', {
//     //     method: 'POST',
//     //     headers: {
//     //         'content-type': 'application/json'
//     //     },
//     //     body: {

//     //     }
//     // }).then(function(res){
//     //     return res.json();
//     // }).then(function(json){
//     //     console.log(json.results[0].name);
//     // });
//     var dt = new Date();
//     if(dt.getTime() - lastTimeStamp >= LIMIT){
//       alert('its time')
//       lastTimeStamp = dt.getTime();
//       fetch('https://availo-api.herokuapp.com/coords', {
//         method: 'PATCH',
//         headers: {
//           'content-type': 'application/json',
//         },
//         body: JSON.stringify({
//           _id: id,
//           location: {
//             latitude: crd.latitude,
//             longitude: crd.longitude
//           }
//         })
//       }).then(function(res){
//           console.log(res);
//       }).catch(function(err){
//         console.log(err);
//       })
//     }
//     }
//     }
    
//     function error(err) {
//     console.warn('ERROR(' + err.code + '): ' + err.message);
//     }
    
    
//     options = {
//     enableHighAccuracy: false,
//     timeout: 5000,
//     maximumAge: 0
//     };
    
//     id1 = navigator.geolocation.watchPosition(success, error, options);
    
//         }
//     });

// }, 10000)