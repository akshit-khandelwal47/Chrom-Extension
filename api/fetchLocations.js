const LOC_API = "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry"

export default function fetchLocations() {
    fetch(LOC_API)
        .then(response => response.json())
        .then(data => {
            const filteredLocation = data.map(loc => ({
                "id":loc.id,
                "name": loc.name,
                "shortName": loc.shortName
            }))
            filteredLocation.sort((a,b) => a.name.localeCompare(b.name));
            chrome.storage.local.set({locations: filteredLocation})
            console.log(filteredLocation);
        })
        .catch(error => {
            console.log(error);
        })
}