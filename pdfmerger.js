const {
    PDFDocument
} = PDFLib
var pdfImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAB90SURBVHja7d0JlCR1fcDxX8997Mmy7MXCuotcEqIIymGEsF4RIooIiiheSDwSkyiYYBTxERUx8cCHCkESDCAqBpCIF4gHeCwgcoPcuyyLBPaeq69U9Y7GwAI72z0z1V2fz0ul8flsZn7dU/9vV3dXFarVatC6lq9c1Z/cHJxsS5Jt/ma2qaYEk+O+B1b8+MX77X2QSTAZCgKgJRf92cnNq5Lt1cn2kmTrMRXInhtuui1mTp8mAhAA1LXodyU3b0+2o5Nt/2RrMxXIfgCkRACTwSLR/At/IdnekPzj7cl2ZrK9yOMKzWX12nUH/uTn111tEggAtnTxT9/bX5ZsFyTbYhMBEQACoLUX/rnJ9p3kH69MtuebCIgAEACtv/jvNfqq/y9MA0QACIB8LP6vS25+mmzbmwaIABAArb/wpx/0+2jyjxclW5+JgAgAAZCDxT+5+Y9kOznZCiYCIgAEQD58JNneZAwgAkAA5OfV/xGjr/wBESACEAA5WfzTT/unh/4d9gdEAAIgJ4v/3OTm0vCBP0AEIABy5ezwVT9ABCAAcvXq/6Dk5lCTAEQAAiA/i3/6fv+nTAIQAQiAfDky2fYxBkAEIADy8+q/K7n5uEkAIgABkC9vD5f0BUQAAiB3jjYCQAQgAHJk+cpVs5Ob/U0CEAEIgHx5lccCEAEIgPx5tREAIgABkCPLV67qT25eYhKACEAA5MvBydZjDIAIQADkyxIjAEQAAiB/5hsBIAIQAAIAQAQgAAQAgAhAAAgAABGAABAAACIAAdCcphoBIAIQAACIAAQAACIAAQCACEAAACACEAAAiAAEAAAiAAEAgAhAAAAgAgQAAIgAAQAAIkAAACACEAAAiAAEAAAiAAEAgAhAAAAgAhAAAIgABAAAIgABAIAIQAAAIAIQAACIAAQAACIAAQCACEAAACACEAAAiAAEAAAiQAAAgAgQAAAgAgQAAIgAAQAAIkAAAIAIEAAAIAIEAACIAAEAACJAAAAgAkSAAABABCAAABABCAAARAACAAARgAAAQAQgAAAQAQgAAEQAAgAAESAAAEAECAAAEAECAABEgAAAABEgAABABAgAABABAgAARIAAAAARIAAAQAQIAAAQAQIAAESAAAAAESAAAEAECAAAEAECAABEgAAAQAQgAAAQAQgAAESAAAAAESAAAEAECAAAEAECAIB6tLfZBYsAAQCQO52dHYYgAgQAQP4CoNMQRIAAAMhdAHQ4AiACBABADo8ACAARIAAAchgA3gIQAQIAIHe6uwSACBAAALkzdUp/tBUKBiECBABAnrS1tcXUqVMMQgQIAIC8mTFtqiGIAAEAkDfTBYAIEAAA+dPR0R5T+vsMQgQIAIC8mTljuiGIAAEAkDfbbjMjuru6DEIECACAPCkUCjF/7nYGIQIEAEDezJwxLfr7eg1CBAgAgLxZMG+OIYgAAQCQN+m3AZwXQAQIAIAc2mH7+dHlGgEiQAAA5Et6XoAlixbWThOMCBAAADnS29MTixbONwgRIAAA8mbG9Gkxb85sgxABAgAgb9IA2GamswSKAAEAkDuLFi5wJEAECACAvB4JWLzj9j4YKAIEAEDepJ8J2HnJoujs9BVBESAAAHKlr7cndn32s2K6kwWJgAYoVKtVj9AkWr5ylQcAGLP1GzbGQ6t+FwMDg4bRBGZOn/bjF++390ECAAEANOYV5pp1sTIJgeGREcMQAQJAAAB5ku7H/+fxNUkMrI0NGwcMRAQIAAEA5E2pVI6169bHmmRbv35DVOzjRYAAEABAvlQqldpnBYZHilEsplspiqXSH/65nPz35DcCOjwMAK0pPW/A031jYMPAULING9TkOHDSnx8eA4B8mtLXk2zdBpHXQDQCABGAAABABCAAABABCAAARAACAAARgAAAQAQgAAAQAQgAAEQAAgAAEYAAAEAEIAAAEAEIAABEAAIAABGAAABABCAAABABCAAARAACAAARgAAAQAQIAAAQAQIAAESAAAAAESAAAEAECAAAEAECAAARIAIEAAAiAAEAgAhAAAAgAhAAAIgABAAAIgABAIAIQAAAIAIQAACIAAQAACIAAQCACEAAACACBAAAiAABAAAiQAAAgAgQAAAgAgQAAIgAAQAAIkAAAIAIEAAAIAIEAACIAAEAACJAAACACBAAACACBAAAIgABAIAIQAAAIAIQAACIAAQAACJAAACACBAAACACBAAAiAABAAAiQAAAgAgQAAAgAgQAAIgAAQAAIkAA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`
window.arrayOfPdf = []
var input = document.getElementById("pdf-file")



function openfile(evt) {
    var files = input.files;
    fileData = new Blob([files[0]]);
    // Pass getBuffer to promise.
    var promise = new Promise(getBuffer(fileData));
    promise.then(function(data) {
        window.arrayOfPdf.push({
            bytes: data,
            name: files[0].name
        })
        listFilesOnScreen()
    }).catch(function(err) {
        console.log('Error: ', err);
    });
}

function getBuffer(fileData) {
    return function(resolve) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(fileData);
        reader.onload = function() {
            var arrayBuffer = reader.result
            var bytes = new Uint8Array(arrayBuffer);
            resolve(bytes);
        }
    }
}

function listFilesOnScreen() {
    $('.pdf-file').remove()
    if (window.arrayOfPdf.length > 0) {
        $('.no-files').hide()
        $.each(window.arrayOfPdf, function(i, v) {
            $('.list-files').append(` 
           <div id="pdf-${i}" class="pdf-file">
           <div onclick="removePdf(${i})" class="btn-remove">x</div>
           <img style="height: 75px" src="${pdfImage}">
           <br>
           <p class="px-4">${v.name}</p></div>`)

        })
    } else {
        $('.no-files').show()
    }

}

function removePdf(index) {
    window.arrayOfPdf.splice(index, 1);
    listFilesOnScreen()
}


async function joinPdf() {
    const mergedPdf = await PDFDocument.create();
    for (let document of window.arrayOfPdf) {
        document = await PDFDocument.load(document.bytes);
        const copiedPages = await mergedPdf.copyPages(document, document.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    var pdfBytes = await mergedPdf.save();
    download(pdfBytes, "pdfcombined" + new Date().getTime() + ".pdf", "application/pdf");
}

input.addEventListener('change', openfile, false);

function mostrarDados() {

}