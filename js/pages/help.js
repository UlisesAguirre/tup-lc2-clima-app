const btn = document.getElementById('button');
const container = document.getElementById('caja')


document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value
        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_4yy6cxm';

        if (validarEmail(email) == true) {
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar';
                    alert('Mensaje enviado correctamente!');
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
        let input = document.createElement("input")
        input.type = "submit"
        input.className = "boton_naranja"
        input.value = "Ingrese un Email válido"
        container.appendChild(input)
        setTimeout(() => {
            input.remove()
          }, 3000);
        return false
    }
}