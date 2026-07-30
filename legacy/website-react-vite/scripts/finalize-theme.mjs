import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const themeDir = path.resolve('weebly-theme');

const resolveFn = 'function r(o,p){var a=p.split("."),c=o;for(var i=0;i<a.length;i++){if(c==null||typeof c!=="object")return;c=c[a[i]]}return c}';

const applyFn = "function a(c){var e=document.querySelectorAll('[data-content]');for(var i=0;i<e.length;i++){var el=e[i],p=el.getAttribute('data-content');if(!p)continue;var v=r(c,p);if(v!=null){if(el.hasAttribute('data-content-html')){el.innerHTML=v}else{el.textContent=v}}}var h=document.querySelector('[data-content-headline]'),l=document.querySelector('[data-content-highlight]');if(h&&l){var hd=r(c,h.getAttribute('data-content-headline')),hl=r(c,l.getAttribute('data-content-highlight'));if(hd&&hl){var pt=hd.split(hl);h.innerHTML=pt.join('<span class=\"gradient-text\">'+hl+'</span>');if(l.parentNode)l.parentNode.removeChild(l)}}var d=document.querySelectorAll('[data-content-src]');for(var i=0;i<d.length;i++){var el=d[i],p=el.getAttribute('data-content-src');if(!p)continue;var v=r(c,p);if(v!=null)el.src=v}}";

const fetchCode = 'try{var x=new XMLHttpRequest;x.open("GET","https://cms.myelektra.com/api/config?cb="+Date.now(),true);x.onreadystatechange=function(){if(x.readyState===4){if(x.status===200){try{var c=JSON.parse(x.responseText);a(c)}catch(e){console.warn("content-loader: JSON parse error",e)}}else{console.warn("content-loader: could not fetch content-config.json (status "+x.status+")")}}};x.send()}catch(e){console.warn("content-loader: request failed",e)}';

const fullScript = '(function(){' + resolveFn + applyFn + fetchCode + '})();';

// Verify syntax
try {
  vm.compileFunction(fullScript);
  console.log('✅ Script syntax OK');
} catch (e) {
  console.log('❌ Script error:', e.message);
  process.exit(1);
}

const files = fs.readdirSync(themeDir).filter(f => f.endsWith('.html'));
for (const file of files) {
  const fp = path.join(themeDir, file);
  let content = fs.readFileSync(fp, 'utf8');

  // 1) Update content-loader inline script
  content = content.replace(
    /<script>\(function\(\)[\s\S]*?<\/script>/,
    '<script>' + fullScript + '</script>'
  );

  // 2) Switch CSS from local main_style.css to CMS API
  // Precise: match href="main_style.css" and replace URL only, keep surrounding intact
  content = content.replace(
    /href="main_style\.css"/g,
    'href="https://cms.myelektra.com/api/css"'
  );

  fs.writeFileSync(fp, content, 'utf8');
  console.log('  ✅', file);
}

console.log('\nVerifying CSS links...');
for (const file of files) {
  const fp = path.join(themeDir, file);
  const content = fs.readFileSync(fp, 'utf8');
  const m = content.match(/href="https:\/\/cms.myelektra.com\/api\/css"[^>]*\/?>/);
  if (!m) {
    console.log('  ⚠️  Missing CMS CSS link:', file);
  }
}
console.log('✅ Done');
