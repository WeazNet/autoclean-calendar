const key = "4d5g6q21e6y5g42hye371feg5fq3";

export function getCalendarFromApi(database) {
    return fetch("https://www.pro.auto-clean.fr/api/"+key+"/data-"+database+"calendar.json")
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function postToCalendar(database, title_e, start_e, end_e) {
        fetch("https://www.pro.auto-clean.fr/api/"+key+"/add_" + database + ".php", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title:title_e,
            start:start_e,
            end:end_e,
        })
    })
}

export function removeToCalendar(database, title_e, start_e, end_e) {

    fetch("https://www.pro.auto-clean.fr/api/"+key+"/remove_" + database + ".php", {
    method: "POST",
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title:title_e,
        start:start_e,
        end:end_e,
    })
})
}