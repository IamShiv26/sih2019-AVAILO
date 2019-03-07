importScripts('./src/js/idb.js');
importScripts('./src/js/utility.js');

var CACHE_STATIC = "static-v130";
var CACHE_DYNAMIC = "dynamic-v90";
var STATIC_ARRAY = [
    './',
    './offline.html',
'./index.html',
'./src/js/promise.js',
'./src/js/fetch.js',
'./src/js/app.js',
'./src/js/material.min.js',
'./src/css/app.css',
'https://fonts.googleapis.com/css?family=Roboto:400,700',
'https://fonts.googleapis.com/icon?family=Material+Icons',
'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
];


// function trimCache(cacheName,maxItems){
//     caches.open(CACHE_DYNAMIC).then(function(cache){
//         return cache.keys().then(function(keys){
//             if(keys.length>maxItems){
//                 cache.delete(keys[0]).then(trimCache(cacheName,maxItems));
//             }
//         });
//     })
// }

self.addEventListener('install',function(event){
    console.log("[Service Worker] Installing Service Worker...",event);
    event.waitUntil(
        caches.open(CACHE_STATIC).then(function(cache){
            console.log("[Service Worker] Prechaching App Shell...");
            cache.addAll(STATIC_ARRAY);
        })
    )
});
self.addEventListener('activate',function(event){
    console.log("[Service Worker] Activating Service Worker...",event);
    event.waitUntil(
        caches.keys()
            .then(function(key_list){
                return Promise.all(key_list.map(function(key){
                    if(key!== CACHE_STATIC && key!==CACHE_DYNAMIC){
                        console.log("[Service Worker] Removing old cache...");
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

// self.addEventListener('fetch', function(event){
//     //console.log("[Service Worker] Fetching....",event);
//     //var url="http://availo-api.herokuapp.com/officers";
//     // if(event.request.url.indexOf(url)>-1){
//     // event.respondWith(fetch(event.request).then(function(res){
//     //     var clonedRes = res.clone();
//     //     clearAllData('posts').then(function(){
//     //         return clonedRes.json();
//     //     }).then(function(data){
//     //             for(var key in data){
//     //                 writeData('posts',data[key]);
//     //             }
//     //             });
//     //     return res;
//     //     })
//     // );
//     // }
//     event.respondWith(
//         caches.match(event.request).then(function(response){
//             if(response){
//                 return response;
//             }
//             else{
//                 return fetch(event.request).then(function(res){
//                     return caches.open(CACHE_DYNAMIC).then(function(cache){
//                         cache.put(event.request.url,res.clone());
//                         return res;
//                     })
//                 }).catch(function(err){
//                         console.log(err);
//                 });
//             }
//         })
//     );
// });
function isInArray(string,array){
    for(var i=0;i<array.length;i++){
        if(string===array[i]){
            return true;
        }
    }
    return false;
}

self.addEventListener('fetch', function(event){
    //console.log("[Service Worker] Fetching....",event);
    var url="https://availo-api.herokuapp.com/officers";
    if(event.request.url.indexOf(url)>-1){
    event.respondWith(fetch(event.request).then(function(res){
        var clonedRes = res.clone();
        clearAllData('officer-cards').then(function(){
            return clonedRes.json();
        }).then(function(data){
                for(var key in data){
                    writeData('officer-cards',data[key]);
                }
                });
        return res;
        })
    );
    }
    else if(isInArray(event.request.url,STATIC_ARRAY)){
        //Cache Only Approach For Static Cache
        event.respondWith(
            caches.match(event.request)
        );
    }else{
        event.respondWith(
            caches.match(event.request).then(function(response){
                if(response){
                    return response;
                }
                else{
                    return fetch(event.request).then(function(res){
                        return caches.open(CACHE_DYNAMIC).then(function(cache){
                            //trimCache(CACHE_DYNAMIC,4);
                            cache.put(event.request.url,res.clone());
                            return res;
                        })
                    }).catch(function(err){
                        return caches.open(CACHE_STATIC).then(function(cache){
                            if(event.request.headers.get('accept').includes('text/html')){//Can be used for fallbacking any file and not just html files(eg. images)
                            return cache.match('/offline.html');
                            }
                        });
                    });
                }
            })
        );
    }
});