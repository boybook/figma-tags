!function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=165)}({165:function(e,t,a){"use strict";a.r(t);const n=[],i=(e,t)=>{figma.ui.postMessage({action:e,data:t})};a=(e,t)=>{n.push({type:e,callback:t})},figma.ui.onmessage=e=>{for(var t of n)e.action===t.type&&t.callback(e.data)};const r=(e,t)=>{var a;const n=figma.getNodeById(t.node_id);if(n){n.setRelaunchData({node:t.title});const i=function(e){for(;"PAGE"!==e.type;)e=e.parent;return e}(n);i.id!==n.id&&((a=n.getSharedPluginData("figma_tags","tile_node_id"))&&null!=(a=figma.getNodeById(a))&&a.remove(),0!==Object.values(t.tags).flat().length&&figma.loadFontAsync({family:"Inter",style:"Semi Bold"}).then(()=>{const a=figma.createFrame(),r=(a.x=n.x,a.y=n.y-63,[]);for(let a in t.tags)e.has(a)&&r.push(...e.get(a).tags.filter(e=>t.tags[a].find(t=>e.id===t)));a.name=r.map(e=>e.name).join(),a.fills=[],a.layoutMode="HORIZONTAL",a.layoutAlign="INHERIT",a.layoutGrow=0,a.primaryAxisAlignItems="MIN",a.primaryAxisSizingMode="AUTO",a.counterAxisSizingMode="AUTO",a.itemSpacing=8,r.forEach(e=>{const t=figma.createFrame(),n=(t.name=e.name,figma.createText());n.fontName={family:"Inter",style:"Semi Bold"},n.lineHeight={value:27,unit:"PIXELS"},n.fontSize=18,n.characters=e.name,n.fills=[{type:"SOLID",color:{r:e.color.r/255,g:e.color.g/255,b:e.color.b/255},opacity:e.color.a}],t.appendChild(n),t.layoutMode="HORIZONTAL",t.primaryAxisSizingMode="AUTO",t.counterAxisSizingMode="AUTO",t.paddingTop=6,t.paddingBottom=6,t.paddingLeft=16,t.paddingRight=16,t.cornerRadius=4,t.fills=[{type:"SOLID",color:{r:e.background.r/255,g:e.background.g/255,b:e.background.b/255}}],t.strokes=[{type:"SOLID",color:{r:0,g:0,b:0},opacity:.05}],a.appendChild(t)});const o=figma.group([a],i);o.name="Tag#"+t.node_id,o.locked=!0,i.appendChild(o),n.setSharedPluginData("figma_tags","tile_node_id",o.id),n.setSharedPluginData("figma_tags","node",JSON.stringify(t))}).catch(e=>{figma.notify("Font family not found!",{error:!0})}))}};function o(e){var t=e.getSharedPluginData("figma_tags","tile_node_id");if(t){const a=figma.getNodeById(t);!a||"GROUP"!==a.type&&"FRAME"!==a.type||(a.parent!=e.parent&&e.parent.appendChild(a),a.x==e.x&&a.y==e.y-63||(a.x=e.x,a.y=e.y-63))}}const g=setInterval(()=>{for(var e of figma.currentPage.selection)o(e)},50);figma.showUI(__html__,{visible:!1});let c,l=!1,f=figma.fileKey;f=f||figma.root.getPluginData("file-id");const d=async()=>Promise.all([figma.clientStorage.getAsync("language"),figma.clientStorage.getAsync("access-token"),figma.clientStorage.getAsync("provider"),figma.clientStorage.getAsync("node-type")]);let s;function m(){if(0<figma.currentPage.selection.length){const t=figma.currentPage.selection[0];var e;"GROUP"===t.type&&t.name.startsWith("Tag#")&&(e=t.name.slice(4),(e=figma.getNodeById(e))&&(figma.currentPage=p(e),figma.currentPage.selection=[e]))}}function u(){if("frame"===c)try{var e=0<figma.currentPage.selection.length?y(figma.currentPage.selection[0]):figma.currentPage,t=e.width;return{type:"PAGE"===e.type?"PAGE":"FRAME",id:e.id,name:e.name,width:t}}catch(e){return{type:"PAGE",id:figma.currentPage.id,name:figma.currentPage.name,width:-1}}else if("document"===c)return{type:"DOCUMENT",id:void 0,name:figma.root.name,width:-1}}function y(e){if(null===e.parent)return e;for(;"PAGE"!==e.parent.type;)e=e.parent;return e}function p(e){for(;"PAGE"!==e.type;)e=e.parent;return e}("lookup"===figma.command?async()=>{var[e,t,a,n]=await d();c="document"!==a&&n||"frame",m(),i("init",{language:e,accessToken:t,userId:figma.currentUser.id,userName:figma.currentUser.name,provider:a,nodeType:c,page:"PageSelect",fileId:f,selection:u()})}:async()=>{var[e,t,a,n]=await d();c="document"!==a&&n||"frame",m(),i("init",{language:e,accessToken:t,userId:figma.currentUser.id,userName:figma.currentUser.name,provider:a,nodeType:c,page:"PageNode",fileId:f,selection:u()})})(),a("resize",e=>{l||(figma.ui.show(),l=!0),figma.ui.resize(e.width,e.height)}),a("client-storage-get",e=>{figma.clientStorage.getAsync(e.key).then(t=>{t={key:e.key,result:t},i("client-storage-get",t)})}),a("client-storage-set",e=>{figma.clientStorage.setAsync(e.key,e.data).then(()=>{var t={key:e.key,suc:!0};i("client-storage-set",t)})}),a("document-plugin-data-get",e=>{e={key:e,value:figma.root.getPluginData(e)},i("document-plugin-data-get",e)}),a("document-plugin-data-set",e=>{figma.root.setPluginData(e.key,e.value),i("document-plugin-data-set",{key:e.key,suc:!0})}),a("document-shared-plugin-data-set",e=>{figma.root.setSharedPluginData("figma-nodes",e.key,e.value)}),a("notify",e=>{null!=s&&s.cancel(),s="string"==typeof e?figma.notify(e):figma.notify(JSON.stringify(e))}),a("notify-err",e=>{null!=s&&s.cancel(),s="string"==typeof e?figma.notify(e,{error:!0}):figma.notify(JSON.stringify(e),{error:!0})}),a("canvas-mark-node",e=>{r(new Map(JSON.parse(e.fullTags)),JSON.parse(e.node))}),a("canvas-unmark-node",e=>{{const t=figma.getNodeById(e);return void(t&&(t.setRelaunchData({}),t.setSharedPluginData("figma_tags","node",""),(e=t.getSharedPluginData("figma_tags","tile_node_id"))&&null!=(e=figma.getNodeById(e))&&e.remove()))}}),a("canvas-refresh-all-marks",e=>{var t,a=e=new Map(JSON.parse(e));for(t of figma.root.children)for(var n of t.children.filter(e=>e.getSharedPluginData("figma_tags","node")))(n=JSON.parse(n.getSharedPluginData("figma_tags","node")))&&r(a,n)}),a("request-selection",()=>{i("selectionchange",u())}),a("select-node",e=>{var t=figma.getNodeById(e);t?(figma.currentPage=p(t),"PAGE"!==t.type&&(figma.currentPage.selection=[y(t)],figma.viewport.scrollAndZoomIntoView([t]))):figma.notify("Missing node "+e+"?")}),a("node-rename",e=>{const t=figma.getNodeById(e.nodeId);t&&e.name&&(t.name=e.name)}),a("toggle-node-type",e=>{figma.clientStorage.setAsync("node-type",e).then(),"document"===(c=e)&&(figma.viewport.scrollAndZoomIntoView(figma.root.children[0].children),figma.currentPage.selection=[]),i("selectionchange",u())}),figma.on("selectionchange",()=>{if(0===figma.currentPage.selection.length)for(var e of figma.root.children)for(var t of e.children.filter(e=>e.getSharedPluginData("figma_tags","node")))o(t);else for(var a of figma.currentPage.selection){var n=a.getSharedPluginData("figma_tags","node");!n||(null==(n=JSON.parse(n))?void 0:n.node_id)!=a.id&&(a.setSharedPluginData("figma_tags","node",""),a.setSharedPluginData("figma_tags","tile_node_id",""))}"document"===c?0<figma.currentPage.selection.length&&(m(),i("force-change-node-type","frame")):(m(),i("selectionchange",u()))}),figma.on("currentpagechange",()=>{"document"!==c&&i("selectionchange",u())}),figma.on("close",()=>{clearInterval(g)})}});