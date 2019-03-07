var dbPromise=idb.open('officer-card-store',1,function(db){
    if(!db.objectStoreNames.contains('officer-cards')){
        db.createObjectStore('officer-cards',{keyPath:'_id'});
    }
    if(!db.objectStoreNames.contains('login-tokens')){
        db.createObjectStore('login-tokens',{keyPath:'token'});
    }
    if(!db.objectStoreNames.contains('current-coords')){
        db.createObjectStore('current-coords',{keyPath:'id'});
    }
});


function writeData(st,data){
    return dbPromise.then(function(db){
        var tx = db.transaction(st,'readwrite');
        var store = tx.objectStore(st);
        store.put(data);
        return tx.complete;
    });  
}

function readAllData(st){
    return dbPromise.then(function(db){
        var tx = db.transaction(st,'readonly');
        var store = tx.objectStore(st);
        return store.getAll();
    });  
}

function clearAllData(st){
    return dbPromise.then(function(db){
        var tx = db.transaction(st,'readwrite');
        var store = tx.objectStore(st);
        store.clear();
        return tx.complete;
    });
}

function deleteSingleItem(st,id){
    dbPromise.then(function(db){
        var tx = db.transaction(st,'readwrite');
        var store = tx.objectStore(st);
        store.delete(id);
        return tx.complete;
    })
    .then(function(){
        console.log('Item Deleted');
    });
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
  
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }