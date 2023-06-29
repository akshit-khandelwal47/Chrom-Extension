import fetchLocations from "./api/fetchLocations.js"

chrome.runtime.onInstalled.addListener(details => {
    fetchLocations()

    
})

chrome.runtime.onMessage.addListener(data => {
    const {event, prefs} = data
    switch (event) {
        case 'onStop':
            handleOnStop();
            break;
        case 'onStart':
            handleOnStart(prefs);
            const dbName = 'MyDB';
            const request = indexedDB.open(dbName,1)

            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                const objectStore = db.createObjectStore('MyObjectStore', { keyPath: 'id', autoIncrement: true });
            }

            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction('MyObjectStore', 'readwrite');
                const objectStore = transaction.objectStore('MyObjectStore');
        
                const dataToStore = { id: prefs.locationId};
                const addRequest = objectStore.add(dataToStore);
        
                addRequest.onsuccess = function(event) {
                console.log('Data added successfully. Generated ID:', event.target.result);
                };
            
      
    }
}})


const handleOnStop = () => {
    console.log("on stop in background")

}

const handleOnStart = (prefs) => {
    console.log("On start in background")
    console.log(prefs)
    chrome.storage.local.set(prefs)
}