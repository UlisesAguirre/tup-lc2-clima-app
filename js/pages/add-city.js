const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q={nombreciudad}&appid=6190b4038187836bda715744d37c0a11&units=metric&lang=es'

const boton = document.getElementById('agregarCiudad')
const mensajes = document.getElementById('mensajes')
const spinner = document.getElementById('carga')

//Declaracion de mensajes de aviso
const exito = document.createElement('p')
exito.className = "exito"
exito.innerHTML = "Ciudad agregada con éxito"

const error = document.createElement('p')
error.className = "error"
error.innerHTML = "Error: la ciudad ingresada no se encuentra en la API o se produjo un error al consultar"

const existente = document.createElement('p')
existente.className = "existente"
existente.innerHTML = "La ciudad ingresada ya se encuentra almacenada"



function addNewCityToLocalStorage(newCity) {


    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + newCity + '&appid=6190b4038187836bda715744d37c0a11&units=metric&lang=es')
        .then(response => response.json())

        .then(data => {
            carga()
            if (data.cod === 200) {
                let cities = getCitiesFromLocalStorage();
    
                if (newCity.length !== 0) {
                    if (cities.length === 0) {
                        mensajes.appendChild(exito)
                        cities.push(newCity);
                        localStorage.setItem("CITIES", JSON.stringify(cities));
                    } else {
                        let validacion = false
                        cities.forEach(function (ciudad) {
                            if (ciudad === newCity) {
                                mensajes.appendChild(existente)
                                validacion = true
                            }

                        })
                        if (validacion === false) {
                            mensajes.appendChild(exito)
                            cities.push(newCity);
                            localStorage.setItem("CITIES", JSON.stringify(cities));
                        }
                    }
                } else {
                    error.innerHTML = "Error: el campo no puede estar vacio"
                    mensajes.appendChild(error)
                }
            }
            else {
                mensajes.appendChild(error)
            }

        })





    setTimeout(() => {




        error.remove()
        existente.remove()
        exito.remove()

        error.innerHTML = "Error: la ciudad ingresada no se encuentra en la API o se produjo un error al consultar"
    }, 4000);




}

function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    } return cities;
}

function carga() {
    // Settime con spinner de carga
        mensajes.style.visibility = "hidden"
    spinner.style.visibility = "visible"
    setTimeout(() => {
        spinner.style.visibility = "hidden"
        mensajes.style.visibility = "visible"
    }, 1000);
}

boton.addEventListener('click', function (event) {
    event.preventDefault();
    let ciudad = document.getElementById('ingresarCiudad').value
    addNewCityToLocalStorage(ciudad.toLowerCase())
})

