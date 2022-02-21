export function arrayBufferToBase64String(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer)
    var byteString = ''
    for (var i=0; i<byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i])
    }
    return btoa(byteString)
}

export function base64StringToArrayBuffer(b64str) {
    var byteStr = atob(b64str)
    var bytes = new Uint8Array(byteStr.length)
    for (var i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i)
    }
    return bytes.buffer
}

export function convertBinaryToPem(binaryData, label) {
    var base64Cert = arrayBufferToBase64String(binaryData);
    var pemCert = "-----BEGIN " + label + "-----\r\n";
    var nextIndex = 0;
    while (nextIndex < base64Cert.length) {
    if (nextIndex + 64 <= base64Cert.length) {
        pemCert += base64Cert.substring(nextIndex, 64) + "\r\n"
    } else {
        pemCert += base64Cert.substring(nextIndex) + "\r\n"
    }
    nextIndex += 64
    }
    pemCert += "-----END " + label + "-----\r\n"
    return pemCert
}

export function convertPemToBinary(pem) {
    var lines = pem.split('\n')
    var encoded = ''
    for(var i = 0;i < lines.length;i++){
    if (lines[i].trim().length > 0 &&
        lines[i].indexOf('-BEGIN RSA PRIVATE KEY-') < 0 &&
        lines[i].indexOf('-BEGIN RSA PUBLIC KEY-') < 0 &&
        lines[i].indexOf('-END RSA PRIVATE KEY-') < 0 &&
        lines[i].indexOf('-END RSA PUBLIC KEY-') < 0) {
        encoded += lines[i].trim()
    }
    }
    return base64StringToArrayBuffer(encoded)
}

export function importPublicKey(pemKey) {
    return new Promise(function(resolve) {
    var importer = crypto.subtle.importKey("spki", convertPemToBinary(pemKey), signAlgorithm, true, ["verify"])
    importer.then(function(key) {
        resolve(key)
    })
    })
}

export function exportPublicKey(key) {
    return new Promise(function(resolve) {
    window.crypto.subtle.exportKey('spki', key).
    then(function(spki) {
        resolve(convertBinaryToPem(spki, "RSA PUBLIC KEY"))
    })
    })
}