/* globals CryptoJS, JSZip, $, FormData, File, FileReader */

function handleFiles([file]) {
  const reader = new FileReader();
  reader.addEventListener('load', async () => {
    const dataFile = `data:application/zip;base64,${reader.result}`;
    const zip = new JSZip();
    zip.file(file.name, dataFile);
    const zippedFile = await zip.generateAsync({ type : 'string' });
    const encryptedZip = await CryptoJS.AES.encrypt(zippedFile, 'entropy');
    const encryptedFile = new File([encryptedZip], file.name, { type: "text/plain", lastModified: new Date() });
    const formData = new FormData();
    formData.append(file.name, encryptedFile, file.name);
    $.ajax({
      url: '/files/upload',
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      type: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  });
  reader.readAsDataURL(file);
}

