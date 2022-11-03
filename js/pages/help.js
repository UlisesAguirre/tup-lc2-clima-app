const btn = document.getElementById('button');
const container = document.getElementById('caja')
let input = document.createElement("input")
const formulario = document.getElementById('form')


document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value
        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_1vwf5wv';

        if (validarEmail(email) == true) {
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar'; 
                    input.type = "submit"
                    input.className = "boton_verde"
                    input.value = "Email enviado correctamente"
                    container.appendChild(input)
                    setTimeout(() => {
                        input.remove()
                        formulario.reset()
                    }, 3000);
                }, (err) => {
                    btn.value = 'Enviar';
                    alert(JSON.stringify(err));
                });
        } else {
            btn.value = "Enviar"
        }

    });

function validarEmail(email) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
        input.remove()
        return true
    } else {
        input.type = "submit"
        input.className = "boton_naranja"
        input.value = "Ingrese un Email válido"
        container.appendChild(input)
        setTimeout(() => {
            input.remove()
            formulario.reset()
        }, 3000);
        return false
    }
}