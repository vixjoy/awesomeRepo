/* globals CryptoJS, JSZip, $, FormData, File, FileReader, Cookies, saveAs, btoa */

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
    const { token } = await Promise.resolve(
      $.get('/user/login?username=asdf&password=asdf')
    );
    Cookies.set('token', token);
    $.ajax({
      url: '/files/upload',
      data: formData,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      processData: false,
      contentType: false,
      cache: false,
      type: 'POST'
    });
  });
  reader.readAsDataURL(file);
}

(async () => {
  const { token } = await $.get('/user/login?username=asdf&password=asdf');
  Cookies.set('token', token);
  const [file] = await $.get('/files');
  if(!file)
    return console.log('No Files!');
  const { _id } = file;
  const fileData = await $.ajax('/files/' + _id, {
    type: 'GET',
    mimeType: 'text/plain; charset=x-user-defined;'
  });
  if(!fileData)
    return console.log('No file data!');
  const decryptedData = await CryptoJS.AES.decrypt(fileData, 'entropy');
  const decryptedFile = decryptedData.toString(CryptoJS.enc.Utf8);

  const zip = new JSZip();

  const unzippedFiles = await zip.loadAsync(decryptedFile);
  const [fileName] = Object.keys(unzippedFiles.files);

  const zippedFile = await unzippedFiles.file(fileName);
  const zippedFileAsBase64 = await zippedFile.async('string');

  const unzippedFile = zippedFileAsBase64.replace('data:application/zip;base64,', '');
  //return window.location = unzippedFile;
})();
