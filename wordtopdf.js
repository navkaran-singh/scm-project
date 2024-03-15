function convertPDFtoDOC() {
  const fileInput = document.getElementById('pdfFileInput');
  const file = fileInput.files[0];
  if (!file) {
      alert('Please select a file.');
      return;
  }

  const apiKey = "kiyeke1648@getmola.com_twBovq0I5YOBghEOcLZ453bma54RhJ8aouB70z22pnB89IJYSs4dy8l8IK4E4n4KGCcOYnwGo1aby3OXJztL77b98EFPj2dzJ9Rh3gk0wNhk663sWxacEf1RYjS2n05Op2x0L9cVgvvw06hARjDQf19yc5"; // Your API key here

  const uploadUrl = "https://api.pdf.co/v1/file/upload/get-presigned-url" +
      "?name=" + encodeURIComponent(file.name) +
      "&contenttype=application/octet-stream";

  const xhrUpload = new XMLHttpRequest();
  xhrUpload.open("GET", uploadUrl, true);
  xhrUpload.setRequestHeader("x-api-key", apiKey);

  xhrUpload.onreadystatechange = function () {
      if (xhrUpload.readyState == 4) {
          if (xhrUpload.status == 200) {
              const jsonResponse = JSON.parse(xhrUpload.responseText);

              if (!jsonResponse.error) {
                  const uploadFileUrl = jsonResponse.presignedUrl;

          
                  const fileHandle = new FileReader();
                  fileHandle.onload = function () {
                      const fileData = new Uint8Array(fileHandle.result);

                      const xhrUploadFile = new XMLHttpRequest();
                      xhrUploadFile.open("PUT", uploadFileUrl, true);
                      xhrUploadFile.setRequestHeader("content-type", "application/octet-stream");

                      xhrUploadFile.onreadystatechange = function () {
                          if (xhrUploadFile.readyState == 4) {
                              if (xhrUploadFile.status == 200) {
                                
                                  docToPdf(apiKey, jsonResponse.url, '');
                              } else {
                                  
                                  console.error("Status code: " + xhrUploadFile.status);
                                  console.error(xhrUploadFile.responseText);
                              }
                          }
                      };

                      xhrUploadFile.send(fileData);
                  };

                  fileHandle.readAsArrayBuffer(file);
              } else {
                
                  console.error("Error: " + jsonResponse.message);
              }
          } else {
             
              console.error("Status code: " + xhrUpload.status);
              console.error(xhrUpload.responseText);
          }
      }
  };

  xhrUpload.send();
}

function docToPdf(apiKey, uploadedFileUrl, pages) {

  const convertUrl = "https://api.pdf.co/v1/pdf/convert/from/doc";

 
  const requestData = {
      url: uploadedFileUrl,
      pages: pages
  };

 
  const xhrConvert = new XMLHttpRequest();
  xhrConvert.open("POST", convertUrl, true);
  xhrConvert.setRequestHeader("x-api-key", apiKey);
  xhrConvert.setRequestHeader("Content-type", "application/json");

  xhrConvert.onreadystatechange = function () {
      if (xhrConvert.readyState == 4) {
          if (xhrConvert.status == 200) {
              const jsonResponse = JSON.parse(xhrConvert.responseText);

              if (!jsonResponse.error) {
                  const resultFileUrl = jsonResponse.url;

                 
                  console.log("Conversion Result: ", resultFileUrl);
                  document.write("<div><h2>Conversion Result:</h2><a href='" + resultFileUrl + "' target='_blank'>" + resultFileUrl + "</a></div>");
              } else {
                  
                  console.error("Error: " + jsonResponse.message);
              }
          } else {
              
              console.error("Status code: " + xhrConvert.status);
              console.error(xhrConvert.responseText);
          }
      }
  };

  xhrConvert.send(JSON.stringify(requestData));
}
