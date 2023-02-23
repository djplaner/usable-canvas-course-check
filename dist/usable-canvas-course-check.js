var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function u(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function s(t,e){t.appendChild(e)}function i(t){t.parentNode&&t.parentNode.removeChild(t)}function l(t){return document.createTextNode(t)}let d;function f(t){d=t}const a=[],h=[],p=[],$=[],g=Promise.resolve();let m=!1;function b(t){p.push(t)}const _=new Set;let y=0;function w(){if(0!==y)return;const t=d;do{try{for(;y<a.length;){const t=a[y];y++,f(t),k(t.$$)}}catch(t){throw a.length=0,y=0,t}for(f(null),a.length=0,y=0;h.length;)h.pop()();for(let t=0;t<p.length;t+=1){const e=p[t];_.has(e)||(_.add(e),e())}p.length=0}while(a.length);for(;$.length;)$.pop()();m=!1,_.clear(),f(t)}function k(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(b)}}const x=new Set;function E(t,e){-1===t.$$.dirty[0]&&(a.push(t),m||(m=!0,g.then(w)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function I(c,u,s,l,a,h,p,$=[-1]){const g=d;f(c);const m=c.$$={fragment:null,ctx:[],props:h,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u.context||(g?g.$$.context:[])),callbacks:n(),dirty:$,skip_bound:!1,root:u.target||g.$$.root};p&&p(m.root);let _=!1;if(m.ctx=s?s(c,u.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return m.ctx&&a(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),_&&E(c,t)),e})):[],m.update(),_=!0,o(m.before_update),m.fragment=!!l&&l(m.ctx),u.target){if(u.hydrate){const t=function(t){return Array.from(t.childNodes)}(u.target);m.fragment&&m.fragment.l(t),t.forEach(i)}else m.fragment&&m.fragment.c();u.intro&&((y=c.$$.fragment)&&y.i&&(x.delete(y),y.i(k))),function(t,n,c,u){const{fragment:s,after_update:i}=t.$$;s&&s.m(n,c),u||b((()=>{const n=t.$$.on_mount.map(e).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...n):o(n),t.$$.on_mount=[]})),i.forEach(b)}(c,u.target,u.anchor,u.customElement),w()}var y,k;f(g)}class v{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(e,n){if(!r(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const P=[];
/**
     * @fileoverview Define any Svelte stores used in the app
     * @author @djplanner
     * @license MIT
     * @version 0.0.1
     */
const N=function(e,n=t){let o;const r=new Set;function u(t){if(c(e,t)&&(e=t,o)){const t=!P.length;for(const t of r)t[1](),P.push(t,e);if(t){for(let t=0;t<P.length;t+=2)P[t][0](P[t+1]);P.length=0}}}return{set:u,update:function(t){u(t(e))},subscribe:function(c,s=t){const i=[c,s];return r.add(i),1===r.size&&(o=n(u)||t),c(e),()=>{r.delete(i),0===r.size&&(o(),o=null)}}}}({});function T(e){let n,o,r,c=e[0].currentPage+"";return{c(){var t,e,u,s;t="p",n=document.createElement(t),o=l("Hello world, on the "),r=l(c),e=n,u="class",null==(s="hello svelte-1k8wfko")?e.removeAttribute(u):e.getAttribute(u)!==s&&e.setAttribute(u,s)},m(t,e){!function(t,e,n){t.insertBefore(e,n||null)}(t,n,e),s(n,o),s(n,r)},p(t,[e]){1&e&&c!==(c=t[0].currentPage+"")&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(r,c)},i:t,o:t,d(t){t&&i(n)}}}function M(t,e,n){let o;u(t,N,(t=>n(0,o=t)));let{courseId:r}=e,{editMode:c}=e,{csrfToken:s}=e,{currentPage:i}=e;var l;return o={courseId:r,editMode:c,csrfToken:s,currentPage:i},l=o,N.set(l),t.$$set=t=>{"courseId"in t&&n(1,r=t.courseId),"editMode"in t&&n(2,c=t.editMode),"csrfToken"in t&&n(3,s=t.csrfToken),"currentPage"in t&&n(4,i=t.currentPage)},[o,r,c,s,i]}class C extends v{constructor(t){super(),I(this,t,M,T,c,{courseId:1,editMode:2,csrfToken:3,currentPage:4})}}const R=function(){let t={editMode:!1,courseId:null,currentPage:null,csrfToken:null},e=new URL(window.location.href);e.hash="";const n=e.href;if(ENV.COURSE_ID&&ENV.COURSE_ID.match(/^\d+$/))t.courseId=ENV.COURSE_ID;else{let e=n.split("courses/")[1];if(e){const n=e.split("/")[0];n.match(/^\d+$/)&&(t.courseId=parseInt(n))}}if(!t.courseId)throw new Error("No courseId found");let o=new RegExp(`courses/${t.courseId}/(.*)(/*|#*|#[^/]+)$`);const r=n.match(o);return r&&(t.currentPage=r[1]),t.editMode=null!==document.getElementById("easy_student_view"),t.csrfToken=function(){let t=new RegExp("^_csrf_token=(.*)$"),e=document.cookie.split(";");for(let n=0;n<e.length;n++){let o=e[n].trim(),r=t.exec(o);if(r)return decodeURIComponent(r[1])}return null}(),t}();let S=null;if(["modules","rubrics"].includes(R.currentPage)){const t=document.querySelector(".right-of-crumbs");if(!t)throw new Error("div.right-of-crumbs not found");const e=document.createElement("div");e.className="usable-canvas-userscript",e.style.display="flex",t.appendChild(e),S=new C({target:e,props:R}),addEventListener("beforeunload",(t=>{S.$destroy()}))}return S}();
