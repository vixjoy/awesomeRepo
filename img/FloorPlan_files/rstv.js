function _rsEP() {
  var hp = window.location.hostname.split("."); 
  var p = "";
  if ( hp.length >= 4 ) p = hp[0] + ".";
  //p = "erik.";
  return p;  
}
var src = ('https:' == document.location.protocol ? 'https://' : 'http://') + _rsEP() + 'account.roomsketcher.com/tracking/';
src += "?pageUrl=" + escape(window.location.href);
src += "&referrerUrl=" + escape(document.referrer);
src += "&userAgent=" + escape(navigator.userAgent);
src += "&acceptLanguage=" + escape(navigator.language);
for (i = 0; i < _rstv.length; ++i) {
  src += "&" + _rstv[i][0] + "=" + escape(_rstv[i][1]);
}
var img = document.createElement("IMG"); 
img.src = src;
