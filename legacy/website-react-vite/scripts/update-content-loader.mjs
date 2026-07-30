import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const themeDir = path.join(root, 'weebly-theme');

const enhanced = `<script>(function(){function r(o,p){var a=p.split("."),c=o;for(var i=0;i<a.length;i++){if(c==null||typeof c!=="object")return;c=c[a[i]]}return c}function a(c){var e=document.querySelectorAll("[data-content]");for(var i=0;i<e.length;i++){var el=e[i],p=el.getAttribute("data-content");if(!p)continue;var v=r(c,p);if(v!=null){if(el.hasAttribute("data-content-html")){el.innerHTML=v}else{el.textContent=v}}}var h=document.querySelector("[data-content-headline]"),l=document.querySelector("[data-content-highlight]");if(h&&l){var hd=r(c,h.getAttribute("data-content-headline")),hl=r(c,l.getAttribute("data-content-highlight"));if(hd&&hl){var pt=hd.split(hl);h.innerHTML=pt.join('<span class="gradient-text">'+hl+'</span>');if(l.parentNode)l.parentNode.removeChild(l)}}var d=document.querySelectorAll("[data-content-src]");for(var i=0;i<d.length;i++){var el=d[i],p=el.getAttribute("data-content-src");if(!p)continue;var v=r(c,p);if(v!=null)el.src=v}try{var x=new XMLHttpRequest;x.open("GET","https://cms.myelektra.com/api/config?cb="+Date.now(),true);x.onreadystatechange=function(){if(x.readyState===4){if(x.status===200){try{var c=JSON.parse(x.responseText);a(c)}catch(e){console.warn("content-loader: JSON parse error",e)}}else{console.warn("content-loader: could not fetch content-config.json (status "+x.status+")")}}};x.send()}catch(e){console.warn("content-loader: request failed",e)}})();</script>`;

const files = fs.readdirSync(themeDir).filter(f => f.endsWith('.html'));
let updated = 0;

for (const file of files) {
  const fp = path.join(themeDir, file);
  let html = fs.readFileSync(fp, 'utf8');

  const oldRe = /<script>\(function\(\)[\s\S]*?api\/config[\s\S]*?<\/script>/;
  if (oldRe.test(html)) {
    html = html.replace(oldRe, enhanced);
    fs.writeFileSync(fp, html, 'utf8');
    updated++;
    console.log('  ✅', file);
  } else {
    console.log('  ⚠️  no script found:', file);
  }
}

console.log(`Updated ${updated} files`);
