const encode = (k, s) => {
    k = k.toUpperCase();
    s = s.toUpperCase();
    var r = "";
    var c = 0;
    for(var i = 0;i<s.length;i++){
        if(s[i].charCodeAt(0)<"A".charCodeAt(0)||s[i].charCodeAt(0)>"Z".charCodeAt(0)){
            r+=s[i];
            continue;
        }
        r+=String.fromCharCode((s[i].charCodeAt(0)+k[c].charCodeAt(0)-(2*"A".charCodeAt(0)))%26+"A".charCodeAt(0));
        c = (c+1)%k.length;
    }
    return r;
  }
const decode = (k, s) => {
    k = k.toUpperCase();
    s = s.toUpperCase();
    var r = "";
    var c = 0;
    for(var i = 0;i<s.length;i++){
        if(s[i].charCodeAt(0)<"A".charCodeAt(0)||s[i].charCodeAt(0)>"Z".charCodeAt(0)){
            r+=s[i];
            continue;
        }
        r+=String.fromCharCode((s[i].charCodeAt(0)-k[c].charCodeAt(0)+26)%26+"A".charCodeAt(0));
        c = (c+1)%k.length;
    }
    return r;
}

var s = encode("hello","my name is tam");
console.log(s);
s= decode("hello",s);
console.log(s);