window.addEventListener('load', () => {
    let imagen = new Image();
    imagen.addEventListener('load', function() {
        let canvasImagen = document.querySelector("#canvasImagen");
        let contexto = canvasImagen.getContext('2d');
        contexto.drawImage(imagen, 0, 0);
        let datosImagen = contexto.getImageData(0, 0, this.width, this.height);

        try {
            let texto = OCRAD(datosImagen);
            document.querySelector('#resultado').innerText = texto;
        } catch (error) {
            alert(error);
        }
    })
    imagen.src = "oton.png";
});