var CryptoJS = require('crypto-js')
const keyArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p','q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5'];

var shorten = function(url) {
    let md5 = CryptoJS.MD5(url);
    let char = ""
    let ind = Math.floor(Math.random()*4)
    hex = md5.words[ind] & 0x3fffffff
    for (let j = 0; j < 6; j = j + 1) {
        index = 0x1F & hex
        char += keyArr[index]
        hex = hex >> 5
    }
    let shortenUrl = char;
    return shortenUrl;
}
module.exports=shorten;

