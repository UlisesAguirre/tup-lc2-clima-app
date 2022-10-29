document.onload = () => {
    loadLocalStorage();
};

function loadLocalStorage() {
    // La primera vez que se ingrese a la pagina permite crear previamente 
    // la clave 'CITIES' en el localStorage para ser utilizada posteriormente.
    let cities = getCitiesFromLocalStorage()
    if (cities == []) {
        localStorage.setItem("CITIES", JSON.stringify(cities))
    }
}

function getCitiesFromLocalStorage() {
    // Devuelve un array conteniendo las ciudades existentes en el localStorage.
    let cities = localStorage.getItem("CITIES");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}
 
async function API(cityName){
    let apiKey="6190b4038187836bda715744d37c0a11"
    return fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=metric&lang=es")
        .then(response => {
            if (response.status == 200) return response.json();
            
            else{throw new Error}
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            return "error"
        });


    }