document.addEventListener('contextmenu', function(event) {
    // Only trigger if they are clicking on an image
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
        alert("Achou que ia salvar a imagem? ACHOU ERRADO OTÁRIO! 😎");
    }
});