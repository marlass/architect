!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/app/public/js/",t(t.s=56)}({56:function(e,t,r){e.exports=r(9)},9:function(e,t){function r(e){return!isNaN(parseFloat(e))&&isFinite(e)}function n(){var e=document.querySelector(".calc__result"),t=document.querySelector('[name="size"]').value||0,n=document.querySelector('[name="garden"]').parentNode.querySelector(":checked"),o=0;o=n?1:0;var i=document.querySelector('[name="build"]').parentNode.querySelector(":checked"),a=0;a=i?1:0;var c=document.querySelector('[name="terrace"]').parentNode.querySelector(":checked"),u=0;u=c?1:0;for(var d=document.getElementsByName("garage"),l=0,s=0,m=d.length;s<m;s++)if(d[s].checked){l=d[s].value;break}for(var g=document.getElementsByName("projekt"),f="project1",p=0,h=g.length;p<h;p++)if(g[p].checked){f=g[p].value;break}var w=document.documentElement.lang,v=0;r(t)&&(v="en"===w?160*t/10.7:160*t),"1"===l?v+=1500:"2"===l&&(v+=2e3),"project2"===f?v*=2.2:"project3"===f&&(v*=3),o&&(v+=4e3),a&&(v+=1500),u&&(v+=3e3);var y="";"en"===w?(y=o&&u?"We offer project for single-family house of "+t+"ft<sup>2</sup> size with garden and terrace":o&&!u?"We offer project for single-family house of "+t+"ft<sup>2</sup> size with garden":u?"We offer project for single-family house of "+t+"ft<sup>2</sup> size with terrace":"We offer project for single-family house of "+t+"ft<sup>2</sup> size","1"===l?y+=", garage":"2"===l&&(y+=", double garage"),"project2"===f?y+=" and installation project":"project3"===f&&(y+=" and instalation project, and decoration"),a&&(y+=" with build cost estimation"),y+=" from "+floor(v/5)+"£."):(y=o&&u?"Oferujemy projekt domu jednorodzinnego o metrażu "+t+"m<sup>2</sup> z ogrodem i tarasem":o&&!u?"Oferujemy projekt domu jednorodzinnego o metrażu "+t+"m<sup>2</sup> z ogrodem":u?"Oferujemy projekt domu jednorodzinnego o metrażu "+t+"m<sup>2</sup> z tarasem":"Oferujemy projekt domu jednorodzinnego o metrażu "+t+"m<sup>2</sup>","1"===l?y+=", garażem":"2"===l&&(y+=", 2 garażami"),"project2"===f?y+=" i projektem instalacji":"project3"===f&&(y+=" i projektem instalacji, i wnętrz"),a&&(y+=" z wyceną budowy"),y+=" od "+floor(v)+"zł."),e.innerHTML=y}var o=document.querySelector('[name="size"]'),i=document.querySelectorAll('[name="garage"]'),a=document.querySelectorAll('[name="projekt"]'),c=document.querySelector('[name="build"]'),u=document.querySelector('[name="garden"]'),d=document.querySelector('[name="terrace"]');o&&i&&a&&c&&u&&d&&(o.addEventListener("input",function(e){n()}),i.forEach(function(e){e.addEventListener("change",function(e){n()})}),a.forEach(function(e){e.addEventListener("change",function(e){n()})}),c.addEventListener("change",function(e){n()}),u.addEventListener("change",function(e){n()}),d.addEventListener("change",function(e){n()}));var l=function(e){for(var t=function(e){for(var t,r,n,o=e.closest(".content").getAttribute("data-block-id"),i=e.childNodes,a=i.length,c=[],u=0;u<a;u++)if(t=i[u],1===t.nodeType){r=t.children[0];for(var d=r.getAttribute("href").replace("/static/uploads/",""),l=window.__GALLERY__[parseInt(o)],s=0;s<l.length;s++)l[s].path==d&&(n=l[s]);t.children.length>1&&(n.title=t.children[1].innerHTML),r.children.length>0&&(n.msrc=r.children[0].getAttribute("src")),n.el=t,c.push(n)}return c},r=function e(t,r){return t&&(r(t)?t:e(t.parentNode,r))},n=function(e){e=e||window.event,e.preventDefault?e.preventDefault():e.returnValue=!1;var t=e.target||e.srcElement,n=r(t,function(e){return e.tagName&&"FIGURE"===e.tagName.toUpperCase()});if(n){for(var o,a=n.parentNode,c=n.parentNode.childNodes,u=c.length,d=0,l=0;l<u;l++)if(1===c[l].nodeType){if(c[l]===n){o=d;break}d++}return o>=0&&i(o,a,!0),!1}},o=function(){var e=window.location.hash.substring(1),t={};if(e.length<5)return t;for(var r=e.split("&"),n=0;n<r.length;n++)if(r[n]){var o=r[n].split("=");o.length<2||(t[o[0]]=o[1])}return t.gid&&(t.gid=parseInt(t.gid,10)),t},i=function(e,r,n,o){var i,a,c,u=document.querySelectorAll(".pswp")[0];if(c=t(r),a={galleryUID:r.getAttribute("data-pswp-uid"),getThumbBoundsFn:function(e){var t=c[e].el.getElementsByTagName("img")[0],r=window.pageYOffset||document.documentElement.scrollTop,n=t.getBoundingClientRect();return{x:n.left,y:n.top+r,w:n.width}}},o)if(a.galleryPIDs){for(var d=0;d<c.length;d++)if(c[d].pid==e){a.index=d;break}}else a.index=parseInt(e,10)-1;else a.index=parseInt(e,10);if(!isNaN(a.index)){n&&(a.showAnimationDuration=0,a.hideAnimationDuration=0),i=new PhotoSwipe(u,PhotoSwipeUI_Default,c,a);var l,s,m=!0,g=!1,f=!1,p=!1,h=!1,w=!1,v=!1,y=!1,j=!1,b=!1;i.listen("beforeResize",function(){l=i.viewportSize.x*window.devicePixelRatio,s=!0,l>1920?g=!0:l>1600?f=!0:l>1280?p=!0:l>1024?h=!0:l>960?w=!0:l>640?v=!0:l>320?y=!0:l>200?j=!0:b=!0,s&&!m&&i.invalidateCurrItems(),m&&(m=!1),s=!1}),i.listen("gettingData",function(e,t){g?(t.src=t.img3840.src,t.w=t.img3840.w,t.h=t.img3840.h):f?(t.src=t.img1920.src,t.w=t.img1920.w,t.h=t.img1920.h):p?(t.src=t.img1600.src,t.w=t.img1600.w,t.h=t.img1600.h):h?(t.src=t.img1280.src,t.w=t.img1280.w,t.h=t.img1280.h):w?(t.src=t.img1024.src,t.w=t.img1024.w,t.h=t.img1024.h):v?(t.src=t.img960.src,t.w=t.img960.w,t.h=t.img960.h):y?(t.src=t.img640.src,t.w=t.img640.w,t.h=t.img640.h):j?(t.src=t.img320.src,t.w=t.img320.w,t.h=t.img320.h):b&&(t.src=t.img200.src,t.w=t.img200.w,t.h=t.img200.h)}),i.init()}},a=document.querySelectorAll(e),c=0,u=a.length;c<u;c++)a[c].setAttribute("data-pswp-uid",c+1),a[c].onclick=n;var d=o();d.pid&&d.gid&&i(d.pid,a[d.gid-1],!0,!0)};l(".gallery")}});