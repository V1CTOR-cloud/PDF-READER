var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.5,

    canvas = document.getElementById('pdf_canvas')
ctx = canvas.getContext('2d')

// CLAVE
function renderPage(num) {
    pageRendering = true; //Cambiar bool por OK
    pdfDoc.getPage(num).then((page) => {
        let viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height
        canvas.width = viewport.width

        let renderContext = {
            canvasContext: ctx,
            viewport: viewport
        }

        let renderTask = page.render(renderContext)

        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending)
                pageNumPending = null;
            }
        })
    })
    document.getElementById('page_num').textContent = num;
}
// Función para las páginas
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}
// Navegación entre páginas
function onPrevPage() {
    if (pageNum <= 1) {
        return
    }
    pageNum--;
    queueRenderPage(pageNum)
}
document.getElementById('prev').addEventListener('click', onPrevPage)
    // FIN


// Navegación entre páginas
function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum)
}
document.getElementById('next').addEventListener('click', onNextPage)
    // FIN

function zoomOut() {
    scale -= 0.1;
    renderPage(pageNum)
}
document.getElementById('zoomOut').addEventListener('click', zoomOut)

function zoomIn() {
    scale += 0.1;
    renderPage(pageNum)
}
document.getElementById('zoomIn').addEventListener('click', zoomIn)


// Aquí va el PDF a insertar
pdfjsLib.getDocument('KIJOTE.pdf').promise.then((doc) => {
    pdfDoc = doc;
    document.getElementById('page_count').textContent = doc.numPages;
    renderPage(pageNum)
})