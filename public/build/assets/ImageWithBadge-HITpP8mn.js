import{U as We,r as Ua,c as Ya,j as U}from"./app-PGsJpjW3.js";/* empty css            *//*!
 * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2026 Fonticons, Inc.
 */function Pe(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,n=Array(t);a<t;a++)n[a]=e[a];return n}function Ha(e){if(Array.isArray(e))return e}function Ga(e){if(Array.isArray(e))return Pe(e)}function Xa(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Ba(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,Tt(n.key),n)}}function Va(e,t,a){return t&&Ba(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function se(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=Ue(e))||t){a&&(e=a);var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(l){throw l},f:r}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,i=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var l=a.next();return i=l.done,l},e:function(l){s=!0,o=l},f:function(){try{i||a.return==null||a.return()}finally{if(s)throw o}}}}function p(e,t,a){return(t=Tt(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Ka(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ja(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var n,r,o,i,s=[],l=!0,u=!1;try{if(o=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;l=!1}else for(;!(l=(n=o.call(a)).done)&&(s.push(n.value),s.length!==t);l=!0);}catch(d){u=!0,r=d}finally{try{if(!l&&a.return!=null&&(i=a.return(),Object(i)!==i))return}finally{if(u)throw r}}return s}}function qa(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qa(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function et(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),a.push.apply(a,n)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?et(Object(a),!0).forEach(function(n){p(e,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):et(Object(a)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))})}return e}function me(e,t){return Ha(e)||Ja(e,t)||Ue(e,t)||qa()}function F(e){return Ga(e)||Ka(e)||Ue(e)||Qa()}function Za(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var n=a.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Tt(e){var t=Za(e,"string");return typeof t=="symbol"?t:t+""}function ue(e){"@babel/helpers - typeof";return ue=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ue(e)}function Ue(e,t){if(e){if(typeof e=="string")return Pe(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Pe(e,t):void 0}}var tt=function(){},Ye={},_t={},Lt=null,Mt={mark:tt,measure:tt};try{typeof window<"u"&&(Ye=window),typeof document<"u"&&(_t=document),typeof MutationObserver<"u"&&(Lt=MutationObserver),typeof performance<"u"&&(Mt=performance)}catch{}var en=Ye.navigator||{},at=en.userAgent,nt=at===void 0?"":at,M=Ye,x=_t,rt=Lt,ie=Mt;M.document;var L=!!x.documentElement&&!!x.head&&typeof x.addEventListener=="function"&&typeof x.createElement=="function",$t=~nt.indexOf("MSIE")||~nt.indexOf("Trident/"),ye,tn=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|gt|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,an=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Graphite|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,Dt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},graphite:{"fa-thin":"thin",fagt:"thin"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"},utility:{"fa-semibold":"semibold",fausb:"semibold"},"utility-duo":{"fa-semibold":"semibold",faudsb:"semibold"},"utility-fill":{"fa-semibold":"semibold",faufsb:"semibold"}},nn={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Rt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-graphite","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],I="classic",te="duotone",zt="sharp",Wt="sharp-duotone",Ut="chisel",Yt="etch",Ht="graphite",Gt="jelly",Xt="jelly-duo",Bt="jelly-fill",Vt="notdog",Kt="notdog-duo",Jt="slab",qt="slab-press",Qt="thumbprint",Zt="utility",ea="utility-duo",ta="utility-fill",aa="whiteboard",rn="Classic",on="Duotone",sn="Sharp",ln="Sharp Duotone",fn="Chisel",un="Etch",cn="Graphite",dn="Jelly",mn="Jelly Duo",vn="Jelly Fill",hn="Notdog",pn="Notdog Duo",gn="Slab",bn="Slab Press",yn="Thumbprint",xn="Utility",wn="Utility Duo",Sn="Utility Fill",An="Whiteboard",na=[I,te,zt,Wt,Ut,Yt,Ht,Gt,Xt,Bt,Vt,Kt,Jt,qt,Qt,Zt,ea,ta,aa];ye={},p(p(p(p(p(p(p(p(p(p(ye,I,rn),te,on),zt,sn),Wt,ln),Ut,fn),Yt,un),Ht,cn),Gt,dn),Xt,mn),Bt,vn),p(p(p(p(p(p(p(p(p(ye,Vt,hn),Kt,pn),Jt,gn),qt,bn),Qt,yn),Zt,xn),ea,wn),ta,Sn),aa,An);var kn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},graphite:{100:"fagt"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"},utility:{600:"fausb"},"utility-duo":{600:"faudsb"},"utility-fill":{600:"faufsb"}},In={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Graphite":{100:"fagt",normal:"fagt"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"},"Font Awesome 7 Utility":{600:"fausb",normal:"fausb"},"Font Awesome 7 Utility Duo":{600:"faudsb",normal:"faudsb"},"Font Awesome 7 Utility Fill":{600:"faufsb",normal:"faufsb"}},Pn=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["graphite",{defaultShortPrefixId:"fagt",defaultStyleId:"thin",styleIds:["thin"],futureStyleIds:[],defaultFontWeight:100}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["utility",{defaultShortPrefixId:"fausb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-duo",{defaultShortPrefixId:"faudsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-fill",{defaultShortPrefixId:"faufsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),En={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},graphite:{thin:"fagt"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},utility:{semibold:"fausb"},"utility-duo":{semibold:"faudsb"},"utility-fill":{semibold:"faufsb"},whiteboard:{semibold:"fawsb"}},ra=["fak","fa-kit","fakd","fa-kit-duotone"],it={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Fn=["kit"],On="kit",Cn="kit-duotone",Nn="Kit",jn="Kit Duotone";p(p({},On,Nn),Cn,jn);var Tn={kit:{"fa-kit":"fak"}},_n={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Ln={kit:{fak:"fa-kit"}},ot={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},xe,oe={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Mn=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-graphite","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],$n="classic",Dn="duotone",Rn="sharp",zn="sharp-duotone",Wn="chisel",Un="etch",Yn="graphite",Hn="jelly",Gn="jelly-duo",Xn="jelly-fill",Bn="notdog",Vn="notdog-duo",Kn="slab",Jn="slab-press",qn="thumbprint",Qn="utility",Zn="utility-duo",er="utility-fill",tr="whiteboard",ar="Classic",nr="Duotone",rr="Sharp",ir="Sharp Duotone",or="Chisel",sr="Etch",lr="Graphite",fr="Jelly",ur="Jelly Duo",cr="Jelly Fill",dr="Notdog",mr="Notdog Duo",vr="Slab",hr="Slab Press",pr="Thumbprint",gr="Utility",br="Utility Duo",yr="Utility Fill",xr="Whiteboard";xe={},p(p(p(p(p(p(p(p(p(p(xe,$n,ar),Dn,nr),Rn,rr),zn,ir),Wn,or),Un,sr),Yn,lr),Hn,fr),Gn,ur),Xn,cr),p(p(p(p(p(p(p(p(p(xe,Bn,dr),Vn,mr),Kn,vr),Jn,hr),qn,pr),Qn,gr),Zn,br),er,yr),tr,xr);var wr="kit",Sr="kit-duotone",Ar="Kit",kr="Kit Duotone";p(p({},wr,Ar),Sr,kr);var Ir={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},graphite:{"fa-thin":"fagt"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"},utility:{"fa-semibold":"fausb"},"utility-duo":{"fa-semibold":"faudsb"},"utility-fill":{"fa-semibold":"faufsb"}},Pr={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],graphite:["fagt"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"],utility:["fausb"],"utility-duo":["faudsb"],"utility-fill":["faufsb"]},Ee={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},graphite:{fagt:"fa-thin"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"},utility:{fausb:"fa-semibold"},"utility-duo":{faudsb:"fa-semibold"},"utility-fill":{faufsb:"fa-semibold"}},Er=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],ia=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fagt","fajr","fajfr","fajdr","facr","fausb","faudsb","faufsb"].concat(Mn,Er),Fr=["solid","regular","light","thin","duotone","brands","semibold"],oa=[1,2,3,4,5,6,7,8,9,10],Or=oa.concat([11,12,13,14,15,16,17,18,19,20]),Cr=["aw","fw","pull-left","pull-right"],Nr=[].concat(F(Object.keys(Pr)),Fr,Cr,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",oe.GROUP,oe.SWAP_OPACITY,oe.PRIMARY,oe.SECONDARY]).concat(oa.map(function(e){return"".concat(e,"x")})).concat(Or.map(function(e){return"w-".concat(e)})),jr={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},T="___FONT_AWESOME___",Fe=16,sa="fa",la="svg-inline--fa",z="data-fa-i2svg",Oe="data-fa-pseudo-element",Tr="data-fa-pseudo-element-pending",He="data-prefix",Ge="data-icon",st="fontawesome-i2svg",_r="async",Lr=["HTML","HEAD","STYLE","SCRIPT"],fa=["::before","::after",":before",":after"],ua=(function(){try{return!0}catch{return!1}})();function ae(e){return new Proxy(e,{get:function(a,n){return n in a?a[n]:a[I]}})}var ca=f({},Dt);ca[I]=f(f(f(f({},{"fa-duotone":"duotone"}),Dt[I]),it.kit),it["kit-duotone"]);var Mr=ae(ca),Ce=f({},En);Ce[I]=f(f(f(f({},{duotone:"fad"}),Ce[I]),ot.kit),ot["kit-duotone"]);var lt=ae(Ce),Ne=f({},Ee);Ne[I]=f(f({},Ne[I]),Ln.kit);var Xe=ae(Ne),je=f({},Ir);je[I]=f(f({},je[I]),Tn.kit);ae(je);var $r=tn,da="fa-layers-text",Dr=an,Rr=f({},kn);ae(Rr);var zr=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],we=nn,Wr=[].concat(F(Fn),F(Nr)),q=M.FontAwesomeConfig||{};function Ur(e){var t=x.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Yr(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(x&&typeof x.querySelector=="function"){var Hr=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Hr.forEach(function(e){var t=me(e,2),a=t[0],n=t[1],r=Yr(Ur(a));r!=null&&(q[n]=r)})}var ma={styleDefault:"solid",familyDefault:I,cssPrefix:sa,replacementClass:la,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};q.familyPrefix&&(q.cssPrefix=q.familyPrefix);var B=f(f({},ma),q);B.autoReplaceSvg||(B.observeMutations=!1);var m={};Object.keys(ma).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(a){B[e]=a,Q.forEach(function(n){return n(m)})},get:function(){return B[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){B.cssPrefix=t,Q.forEach(function(a){return a(m)})},get:function(){return B.cssPrefix}});M.FontAwesomeConfig=m;var Q=[];function Gr(e){return Q.push(e),function(){Q.splice(Q.indexOf(e),1)}}var Y=Fe,O={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Xr(e){if(!(!e||!L)){var t=x.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=x.head.childNodes,n=null,r=a.length-1;r>-1;r--){var o=a[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(n=o)}return x.head.insertBefore(t,n),e}}var Br="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ft(){for(var e=12,t="";e-- >0;)t+=Br[Math.random()*62|0];return t}function K(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function Be(e){return e.classList?K(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function va(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Vr(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(va(e[a]),'" ')},"").trim()}function ve(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function Ve(e){return e.size!==O.size||e.x!==O.x||e.y!==O.y||e.rotate!==O.rotate||e.flipX||e.flipY}function Kr(e){var t=e.transform,a=e.containerWidth,n=e.iconWidth,r={transform:"translate(".concat(a/2," 256)")},o="translate(".concat(t.x*32,", ").concat(t.y*32,") "),i="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(o," ").concat(i," ").concat(s)},u={transform:"translate(".concat(n/2*-1," -256)")};return{outer:r,inner:l,path:u}}function Jr(e){var t=e.transform,a=e.width,n=a===void 0?Fe:a,r=e.height,o=r===void 0?Fe:r,i="";return $t?i+="translate(".concat(t.x/Y-n/2,"em, ").concat(t.y/Y-o/2,"em) "):i+="translate(calc(-50% + ".concat(t.x/Y,"em), calc(-50% + ").concat(t.y/Y,"em)) "),i+="scale(".concat(t.size/Y*(t.flipX?-1:1),", ").concat(t.size/Y*(t.flipY?-1:1),") "),i+="rotate(".concat(t.rotate,"deg) "),i}var qr=`:root, :host {
  --fa-font-solid: normal 900 1em/1 'Font Awesome 7 Free';
  --fa-font-regular: normal 400 1em/1 'Font Awesome 7 Free';
  --fa-font-light: normal 300 1em/1 'Font Awesome 7 Pro';
  --fa-font-thin: normal 100 1em/1 'Font Awesome 7 Pro';
  --fa-font-duotone: normal 900 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-regular: normal 400 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-light: normal 300 1em/1 'Font Awesome 7 Duotone';
  --fa-font-duotone-thin: normal 100 1em/1 'Font Awesome 7 Duotone';
  --fa-font-brands: normal 400 1em/1 'Font Awesome 7 Brands';
  --fa-font-sharp-solid: normal 900 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-regular: normal 400 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-light: normal 300 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-thin: normal 100 1em/1 'Font Awesome 7 Sharp';
  --fa-font-sharp-duotone-solid: normal 900 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-regular: normal 400 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-light: normal 300 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-sharp-duotone-thin: normal 100 1em/1 'Font Awesome 7 Sharp Duotone';
  --fa-font-slab-regular: normal 400 1em/1 'Font Awesome 7 Slab';
  --fa-font-slab-press-regular: normal 400 1em/1 'Font Awesome 7 Slab Press';
  --fa-font-whiteboard-semibold: normal 600 1em/1 'Font Awesome 7 Whiteboard';
  --fa-font-thumbprint-light: normal 300 1em/1 'Font Awesome 7 Thumbprint';
  --fa-font-notdog-solid: normal 900 1em/1 'Font Awesome 7 Notdog';
  --fa-font-notdog-duo-solid: normal 900 1em/1 'Font Awesome 7 Notdog Duo';
  --fa-font-etch-solid: normal 900 1em/1 'Font Awesome 7 Etch';
  --fa-font-graphite-thin: normal 100 1em/1 'Font Awesome 7 Graphite';
  --fa-font-jelly-regular: normal 400 1em/1 'Font Awesome 7 Jelly';
  --fa-font-jelly-fill-regular: normal 400 1em/1 'Font Awesome 7 Jelly Fill';
  --fa-font-jelly-duo-regular: normal 400 1em/1 'Font Awesome 7 Jelly Duo';
  --fa-font-chisel-regular: normal 400 1em/1 'Font Awesome 7 Chisel';
  --fa-font-utility-semibold: normal 600 1em/1 'Font Awesome 7 Utility';
  --fa-font-utility-duo-semibold: normal 600 1em/1 'Font Awesome 7 Utility Duo';
  --fa-font-utility-fill-semibold: normal 600 1em/1 'Font Awesome 7 Utility Fill';
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function ha(){var e=sa,t=la,a=m.cssPrefix,n=m.replacementClass,r=qr;if(a!==e||n!==t){var o=new RegExp("\\.".concat(e,"\\-"),"g"),i=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");r=r.replace(o,".".concat(a,"-")).replace(i,"--".concat(a,"-")).replace(s,".".concat(n))}return r}var ut=!1;function Se(){m.autoAddCss&&!ut&&(Xr(ha()),ut=!0)}var Qr={mixout:function(){return{dom:{css:ha,insertCss:Se}}},hooks:function(){return{beforeDOMElementCreation:function(){Se()},beforeI2svg:function(){Se()}}}},_=M||{};_[T]||(_[T]={});_[T].styles||(_[T].styles={});_[T].hooks||(_[T].hooks={});_[T].shims||(_[T].shims=[]);var E=_[T],pa=[],ga=function(){x.removeEventListener("DOMContentLoaded",ga),ce=1,pa.map(function(t){return t()})},ce=!1;L&&(ce=(x.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(x.readyState),ce||x.addEventListener("DOMContentLoaded",ga));function Zr(e){L&&(ce?setTimeout(e,0):pa.push(e))}function ne(e){var t=e.tag,a=e.attributes,n=a===void 0?{}:a,r=e.children,o=r===void 0?[]:r;return typeof e=="string"?va(e):"<".concat(t," ").concat(Vr(n),">").concat(o.map(ne).join(""),"</").concat(t,">")}function ct(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var Ae=function(t,a,n,r){var o=Object.keys(t),i=o.length,s=a,l,u,d;for(n===void 0?(l=1,d=t[o[0]]):(l=0,d=n);l<i;l++)u=o[l],d=s(d,t[u],u,t);return d};function ba(e){return F(e).length!==1?null:e.codePointAt(0).toString(16)}function dt(e){return Object.keys(e).reduce(function(t,a){var n=e[a],r=!!n.icon;return r?t[n.iconName]=n.icon:t[a]=n,t},{})}function Te(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=a.skipHooks,r=n===void 0?!1:n,o=dt(t);typeof E.hooks.addPack=="function"&&!r?E.hooks.addPack(e,dt(t)):E.styles[e]=f(f({},E.styles[e]||{}),o),e==="fas"&&Te("fa",t)}var ee=E.styles,ei=E.shims,ya=Object.keys(Xe),ti=ya.reduce(function(e,t){return e[t]=Object.keys(Xe[t]),e},{}),Ke=null,xa={},wa={},Sa={},Aa={},ka={};function ai(e){return~Wr.indexOf(e)}function ni(e,t){var a=t.split("-"),n=a[0],r=a.slice(1).join("-");return n===e&&r!==""&&!ai(r)?r:null}var Ia=function(){var t=function(o){return Ae(ee,function(i,s,l){return i[l]=Ae(s,o,{}),i},{})};xa=t(function(r,o,i){if(o[3]&&(r[o[3]]=i),o[2]){var s=o[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){r[l.toString(16)]=i})}return r}),wa=t(function(r,o,i){if(r[i]=i,o[2]){var s=o[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){r[l]=i})}return r}),ka=t(function(r,o,i){var s=o[2];return r[i]=i,s.forEach(function(l){r[l]=i}),r});var a="far"in ee||m.autoFetchSvg,n=Ae(ei,function(r,o){var i=o[0],s=o[1],l=o[2];return s==="far"&&!a&&(s="fas"),typeof i=="string"&&(r.names[i]={prefix:s,iconName:l}),typeof i=="number"&&(r.unicodes[i.toString(16)]={prefix:s,iconName:l}),r},{names:{},unicodes:{}});Sa=n.names,Aa=n.unicodes,Ke=he(m.styleDefault,{family:m.familyDefault})};Gr(function(e){Ke=he(e.styleDefault,{family:m.familyDefault})});Ia();function Je(e,t){return(xa[e]||{})[t]}function ri(e,t){return(wa[e]||{})[t]}function R(e,t){return(ka[e]||{})[t]}function Pa(e){return Sa[e]||{prefix:null,iconName:null}}function ii(e){var t=Aa[e],a=Je("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function $(){return Ke}var Ea=function(){return{prefix:null,iconName:null,rest:[]}};function oi(e){var t=I,a=ya.reduce(function(n,r){return n[r]="".concat(m.cssPrefix,"-").concat(r),n},{});return na.forEach(function(n){(e.includes(a[n])||e.some(function(r){return ti[n].includes(r)}))&&(t=n)}),t}function he(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,n=a===void 0?I:a,r=Mr[n][e];if(n===te&&!e)return"fad";var o=lt[n][e]||lt[n][r],i=e in E.styles?e:null,s=o||i||null;return s}function si(e){var t=[],a=null;return e.forEach(function(n){var r=ni(m.cssPrefix,n);r?a=r:n&&t.push(n)}),{iconName:a,rest:t}}function mt(e){return e.sort().filter(function(t,a,n){return n.indexOf(t)===a})}var vt=ia.concat(ra);function pe(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,n=a===void 0?!1:a,r=null,o=mt(e.filter(function(h){return vt.includes(h)})),i=mt(e.filter(function(h){return!vt.includes(h)})),s=o.filter(function(h){return r=h,!Rt.includes(h)}),l=me(s,1),u=l[0],d=u===void 0?null:u,c=oi(o),v=f(f({},si(i)),{},{prefix:he(d,{family:c})});return f(f(f({},v),ci({values:e,family:c,styles:ee,config:m,canonical:v,givenPrefix:r})),li(n,r,v))}function li(e,t,a){var n=a.prefix,r=a.iconName;if(e||!n||!r)return{prefix:n,iconName:r};var o=t==="fa"?Pa(r):{},i=R(n,r);return r=o.iconName||i||r,n=o.prefix||n,n==="far"&&!ee.far&&ee.fas&&!m.autoFetchSvg&&(n="fas"),{prefix:n,iconName:r}}var fi=na.filter(function(e){return e!==I||e!==te}),ui=Object.keys(Ee).filter(function(e){return e!==I}).map(function(e){return Object.keys(Ee[e])}).flat();function ci(e){var t=e.values,a=e.family,n=e.canonical,r=e.givenPrefix,o=r===void 0?"":r,i=e.styles,s=i===void 0?{}:i,l=e.config,u=l===void 0?{}:l,d=a===te,c=t.includes("fa-duotone")||t.includes("fad"),v=u.familyDefault==="duotone",h=n.prefix==="fad"||n.prefix==="fa-duotone";if(!d&&(c||v||h)&&(n.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(n.prefix="fab"),!n.prefix&&fi.includes(a)){var y=Object.keys(s).find(function(w){return ui.includes(w)});if(y||u.autoFetchSvg){var b=Pn.get(a).defaultShortPrefixId;n.prefix=b,n.iconName=R(n.prefix,n.iconName)||n.iconName}}return(n.prefix==="fa"||o==="fa")&&(n.prefix=$()||"fas"),n}var di=(function(){function e(){Xa(this,e),this.definitions={}}return Va(e,[{key:"add",value:function(){for(var a=this,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];var i=r.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(s){a.definitions[s]=f(f({},a.definitions[s]||{}),i[s]),Te(s,i[s]);var l=Xe[I][s];l&&Te(l,i[s]),Ia()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,n){var r=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(r).map(function(o){var i=r[o],s=i.prefix,l=i.iconName,u=i.icon,d=u[2];a[s]||(a[s]={}),d.length>0&&d.forEach(function(c){typeof c=="string"&&(a[s][c]=u)}),a[s][l]=u}),a}}])})(),ht=[],G={},X={},mi=Object.keys(X);function vi(e,t){var a=t.mixoutsTo;return ht=e,G={},Object.keys(X).forEach(function(n){mi.indexOf(n)===-1&&delete X[n]}),ht.forEach(function(n){var r=n.mixout?n.mixout():{};if(Object.keys(r).forEach(function(i){typeof r[i]=="function"&&(a[i]=r[i]),ue(r[i])==="object"&&Object.keys(r[i]).forEach(function(s){a[i]||(a[i]={}),a[i][s]=r[i][s]})}),n.hooks){var o=n.hooks();Object.keys(o).forEach(function(i){G[i]||(G[i]=[]),G[i].push(o[i])})}n.provides&&n.provides(X)}),a}function _e(e,t){for(var a=arguments.length,n=new Array(a>2?a-2:0),r=2;r<a;r++)n[r-2]=arguments[r];var o=G[e]||[];return o.forEach(function(i){t=i.apply(null,[t].concat(n))}),t}function W(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];var r=G[e]||[];r.forEach(function(o){o.apply(null,a)})}function D(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return X[e]?X[e].apply(null,t):void 0}function Le(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||$();if(t)return t=R(a,t)||t,ct(Fa.definitions,a,t)||ct(E.styles,a,t)}var Fa=new di,hi=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,W("noAuto")},pi={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return L?(W("beforeI2svg",t),D("pseudoElements2svg",t),D("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Zr(function(){bi({autoReplaceSvgRoot:a}),W("watch",t)})}},gi={icon:function(t){if(t===null)return null;if(ue(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:R(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=he(t[0]);return{prefix:n,iconName:R(n,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match($r))){var r=pe(t.split(" "),{skipLookups:!0});return{prefix:r.prefix||$(),iconName:R(r.prefix,r.iconName)||r.iconName}}if(typeof t=="string"){var o=$();return{prefix:o,iconName:R(o,t)||t}}}},P={noAuto:hi,config:m,dom:pi,parse:gi,library:Fa,findIconDefinition:Le,toHtml:ne},bi=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,n=a===void 0?x:a;(Object.keys(E.styles).length>0||m.autoFetchSvg)&&L&&m.autoReplaceSvg&&P.dom.i2svg({node:n})};function ge(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(n){return ne(n)})}}),Object.defineProperty(e,"node",{get:function(){if(L){var n=x.createElement("div");return n.innerHTML=e.html,n.children}}}),e}function yi(e){var t=e.children,a=e.main,n=e.mask,r=e.attributes,o=e.styles,i=e.transform;if(Ve(i)&&a.found&&!n.found){var s=a.width,l=a.height,u={x:s/l/2,y:.5};r.style=ve(f(f({},o),{},{"transform-origin":"".concat(u.x+i.x/16,"em ").concat(u.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:t}]}function xi(e){var t=e.prefix,a=e.iconName,n=e.children,r=e.attributes,o=e.symbol,i=o===!0?"".concat(t,"-").concat(m.cssPrefix,"-").concat(a):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},r),{},{id:i}),children:n}]}]}function wi(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function qe(e){var t=e.icons,a=t.main,n=t.mask,r=e.prefix,o=e.iconName,i=e.transform,s=e.symbol,l=e.maskId,u=e.extra,d=e.watchable,c=d===void 0?!1:d,v=n.found?n:a,h=v.width,y=v.height,b=[m.replacementClass,o?"".concat(m.cssPrefix,"-").concat(o):""].filter(function(g){return u.classes.indexOf(g)===-1}).filter(function(g){return g!==""||!!g}).concat(u.classes).join(" "),w={children:[],attributes:f(f({},u.attributes),{},{"data-prefix":r,"data-icon":o,class:b,role:u.attributes.role||"img",viewBox:"0 0 ".concat(h," ").concat(y)})};!wi(u.attributes)&&!u.attributes["aria-hidden"]&&(w.attributes["aria-hidden"]="true"),c&&(w.attributes[z]="");var S=f(f({},w),{},{prefix:r,iconName:o,main:a,mask:n,maskId:l,transform:i,symbol:s,styles:f({},u.styles)}),A=n.found&&a.found?D("generateAbstractMask",S)||{children:[],attributes:{}}:D("generateAbstractIcon",S)||{children:[],attributes:{}},k=A.children,C=A.attributes;return S.children=k,S.attributes=C,s?xi(S):yi(S)}function pt(e){var t=e.content,a=e.width,n=e.height,r=e.transform,o=e.extra,i=e.watchable,s=i===void 0?!1:i,l=f(f({},o.attributes),{},{class:o.classes.join(" ")});s&&(l[z]="");var u=f({},o.styles);Ve(r)&&(u.transform=Jr({transform:r,width:a,height:n}),u["-webkit-transform"]=u.transform);var d=ve(u);d.length>0&&(l.style=d);var c=[];return c.push({tag:"span",attributes:l,children:[t]}),c}function Si(e){var t=e.content,a=e.extra,n=f(f({},a.attributes),{},{class:a.classes.join(" ")}),r=ve(a.styles);r.length>0&&(n.style=r);var o=[];return o.push({tag:"span",attributes:n,children:[t]}),o}var ke=E.styles;function Me(e){var t=e[0],a=e[1],n=e.slice(4),r=me(n,1),o=r[0],i=null;return Array.isArray(o)?i={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.PRIMARY),fill:"currentColor",d:o[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:t,height:a,icon:i}}var Ai={found:!1,width:512,height:512};function ki(e,t){!ua&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function $e(e,t){var a=t;return t==="fa"&&m.styleDefault!==null&&(t=$()),new Promise(function(n,r){if(a==="fa"){var o=Pa(e)||{};e=o.iconName||e,t=o.prefix||t}if(e&&t&&ke[t]&&ke[t][e]){var i=ke[t][e];return n(Me(i))}ki(e,t),n(f(f({},Ai),{},{icon:m.showMissingIcons&&e?D("missingIconAbstract")||{}:{}}))})}var gt=function(){},De=m.measurePerformance&&ie&&ie.mark&&ie.measure?ie:{mark:gt,measure:gt},J='FA "7.2.0"',Ii=function(t){return De.mark("".concat(J," ").concat(t," begins")),function(){return Oa(t)}},Oa=function(t){De.mark("".concat(J," ").concat(t," ends")),De.measure("".concat(J," ").concat(t),"".concat(J," ").concat(t," begins"),"".concat(J," ").concat(t," ends"))},Qe={begin:Ii,end:Oa},le=function(){};function bt(e){var t=e.getAttribute?e.getAttribute(z):null;return typeof t=="string"}function Pi(e){var t=e.getAttribute?e.getAttribute(He):null,a=e.getAttribute?e.getAttribute(Ge):null;return t&&a}function Ei(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function Fi(){if(m.autoReplaceSvg===!0)return fe.replace;var e=fe[m.autoReplaceSvg];return e||fe.replace}function Oi(e){return x.createElementNS("http://www.w3.org/2000/svg",e)}function Ci(e){return x.createElement(e)}function Ca(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,n=a===void 0?e.tag==="svg"?Oi:Ci:a;if(typeof e=="string")return x.createTextNode(e);var r=n(e.tag);Object.keys(e.attributes||[]).forEach(function(i){r.setAttribute(i,e.attributes[i])});var o=e.children||[];return o.forEach(function(i){r.appendChild(Ca(i,{ceFn:n}))}),r}function Ni(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var fe={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(r){a.parentNode.insertBefore(Ca(r),a)}),a.getAttribute(z)===null&&m.keepOriginalSource){var n=x.createComment(Ni(a));a.parentNode.replaceChild(n,a)}else a.remove()},nest:function(t){var a=t[0],n=t[1];if(~Be(a).indexOf(m.replacementClass))return fe.replace(t);var r=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){var o=n[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(r)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",o.toNode.join(" "))}var i=n.map(function(s){return ne(s)}).join(`
`);a.setAttribute(z,""),a.innerHTML=i}};function yt(e){e()}function Na(e,t){var a=typeof t=="function"?t:le;if(e.length===0)a();else{var n=yt;m.mutateApproach===_r&&(n=M.requestAnimationFrame||yt),n(function(){var r=Fi(),o=Qe.begin("mutate");e.map(r),o(),a()})}}var Ze=!1;function ja(){Ze=!0}function Re(){Ze=!1}var de=null;function xt(e){if(rt&&m.observeMutations){var t=e.treeCallback,a=t===void 0?le:t,n=e.nodeCallback,r=n===void 0?le:n,o=e.pseudoElementsCallback,i=o===void 0?le:o,s=e.observeMutationsRoot,l=s===void 0?x:s;de=new rt(function(u){if(!Ze){var d=$();K(u).forEach(function(c){if(c.type==="childList"&&c.addedNodes.length>0&&!bt(c.addedNodes[0])&&(m.searchPseudoElements&&i(c.target),a(c.target)),c.type==="attributes"&&c.target.parentNode&&m.searchPseudoElements&&i([c.target],!0),c.type==="attributes"&&bt(c.target)&&~zr.indexOf(c.attributeName))if(c.attributeName==="class"&&Pi(c.target)){var v=pe(Be(c.target)),h=v.prefix,y=v.iconName;c.target.setAttribute(He,h||d),y&&c.target.setAttribute(Ge,y)}else Ei(c.target)&&r(c.target)})}}),L&&de.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ji(){de&&de.disconnect()}function Ti(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(n,r){var o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(n[i]=s.join(":").trim()),n},{})),a}function _i(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),n=e.innerText!==void 0?e.innerText.trim():"",r=pe(Be(e));return r.prefix||(r.prefix=$()),t&&a&&(r.prefix=t,r.iconName=a),r.iconName&&r.prefix||(r.prefix&&n.length>0&&(r.iconName=ri(r.prefix,e.innerText)||Je(r.prefix,ba(e.innerText))),!r.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function Li(e){var t=K(e.attributes).reduce(function(a,n){return a.name!=="class"&&a.name!=="style"&&(a[n.name]=n.value),a},{});return t}function Mi(){return{iconName:null,prefix:null,transform:O,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function wt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=_i(e),n=a.iconName,r=a.prefix,o=a.rest,i=Li(e),s=_e("parseNodeAttributes",{},e),l=t.styleParser?Ti(e):[];return f({iconName:n,prefix:r,transform:O,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:l,attributes:i}},s)}var $i=E.styles;function Ta(e){var t=m.autoReplaceSvg==="nest"?wt(e,{styleParser:!1}):wt(e);return~t.extra.classes.indexOf(da)?D("generateLayersText",e,t):D("generateSvgReplacementMutation",e,t)}function Di(){return[].concat(F(ra),F(ia))}function St(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!L)return Promise.resolve();var a=x.documentElement.classList,n=function(c){return a.add("".concat(st,"-").concat(c))},r=function(c){return a.remove("".concat(st,"-").concat(c))},o=m.autoFetchSvg?Di():Rt.concat(Object.keys($i));o.includes("fa")||o.push("fa");var i=[".".concat(da,":not([").concat(z,"])")].concat(o.map(function(d){return".".concat(d,":not([").concat(z,"])")})).join(", ");if(i.length===0)return Promise.resolve();var s=[];try{s=K(e.querySelectorAll(i))}catch{}if(s.length>0)n("pending"),r("complete");else return Promise.resolve();var l=Qe.begin("onTree"),u=s.reduce(function(d,c){try{var v=Ta(c);v&&d.push(v)}catch(h){ua||h.name==="MissingIcon"&&console.error(h)}return d},[]);return new Promise(function(d,c){Promise.all(u).then(function(v){Na(v,function(){n("active"),n("complete"),r("pending"),typeof t=="function"&&t(),l(),d()})}).catch(function(v){l(),c(v)})})}function Ri(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Ta(e).then(function(a){a&&Na([a],t)})}function zi(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=(t||{}).icon?t:Le(t||{}),r=a.mask;return r&&(r=(r||{}).icon?r:Le(r||{})),e(n,f(f({},a),{},{mask:r}))}}var Wi=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=a.transform,r=n===void 0?O:n,o=a.symbol,i=o===void 0?!1:o,s=a.mask,l=s===void 0?null:s,u=a.maskId,d=u===void 0?null:u,c=a.classes,v=c===void 0?[]:c,h=a.attributes,y=h===void 0?{}:h,b=a.styles,w=b===void 0?{}:b;if(t){var S=t.prefix,A=t.iconName,k=t.icon;return ge(f({type:"icon"},t),function(){return W("beforeDOMElementCreation",{iconDefinition:t,params:a}),qe({icons:{main:Me(k),mask:l?Me(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:S,iconName:A,transform:f(f({},O),r),symbol:i,maskId:d,extra:{attributes:y,styles:w,classes:v}})})}},Ui={mixout:function(){return{icon:zi(Wi)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=St,a.nodeCallback=Ri,a}}},provides:function(t){t.i2svg=function(a){var n=a.node,r=n===void 0?x:n,o=a.callback,i=o===void 0?function(){}:o;return St(r,i)},t.generateSvgReplacementMutation=function(a,n){var r=n.iconName,o=n.prefix,i=n.transform,s=n.symbol,l=n.mask,u=n.maskId,d=n.extra;return new Promise(function(c,v){Promise.all([$e(r,o),l.iconName?$e(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(h){var y=me(h,2),b=y[0],w=y[1];c([a,qe({icons:{main:b,mask:w},prefix:o,iconName:r,transform:i,symbol:s,maskId:u,extra:d,watchable:!0})])}).catch(v)})},t.generateAbstractIcon=function(a){var n=a.children,r=a.attributes,o=a.main,i=a.transform,s=a.styles,l=ve(s);l.length>0&&(r.style=l);var u;return Ve(i)&&(u=D("generateAbstractTransformGrouping",{main:o,transform:i,containerWidth:o.width,iconWidth:o.width})),n.push(u||o.icon),{children:n,attributes:r}}}},Yi={mixout:function(){return{layer:function(a){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.classes,o=r===void 0?[]:r;return ge({type:"layer"},function(){W("beforeDOMElementCreation",{assembler:a,params:n});var i=[];return a(function(s){Array.isArray(s)?s.map(function(l){i=i.concat(l.abstract)}):i=i.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(F(o)).join(" ")},children:i}]})}}}},Hi={mixout:function(){return{counter:function(a){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};n.title;var r=n.classes,o=r===void 0?[]:r,i=n.attributes,s=i===void 0?{}:i,l=n.styles,u=l===void 0?{}:l;return ge({type:"counter",content:a},function(){return W("beforeDOMElementCreation",{content:a,params:n}),Si({content:a.toString(),extra:{attributes:s,styles:u,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(F(o))}})})}}}},Gi={mixout:function(){return{text:function(a){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,o=r===void 0?O:r,i=n.classes,s=i===void 0?[]:i,l=n.attributes,u=l===void 0?{}:l,d=n.styles,c=d===void 0?{}:d;return ge({type:"text",content:a},function(){return W("beforeDOMElementCreation",{content:a,params:n}),pt({content:a,transform:f(f({},O),o),extra:{attributes:u,styles:c,classes:["".concat(m.cssPrefix,"-layers-text")].concat(F(s))}})})}}},provides:function(t){t.generateLayersText=function(a,n){var r=n.transform,o=n.extra,i=null,s=null;if($t){var l=parseInt(getComputedStyle(a).fontSize,10),u=a.getBoundingClientRect();i=u.width/l,s=u.height/l}return Promise.resolve([a,pt({content:a.innerHTML,width:i,height:s,transform:r,extra:o,watchable:!0})])}}},_a=new RegExp('"',"ug"),At=[1105920,1112319],kt=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),In),jr),_n),ze=Object.keys(kt).reduce(function(e,t){return e[t.toLowerCase()]=kt[t],e},{}),Xi=Object.keys(ze).reduce(function(e,t){var a=ze[t];return e[t]=a[900]||F(Object.entries(a))[0][1],e},{});function Bi(e){var t=e.replace(_a,"");return ba(F(t)[0]||"")}function Vi(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),n=a.replace(_a,""),r=n.codePointAt(0),o=r>=At[0]&&r<=At[1],i=n.length===2?n[0]===n[1]:!1;return o||i||t}function Ki(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),n=parseInt(t),r=isNaN(n)?"normal":n;return(ze[a]||{})[r]||Xi[a]}function It(e,t){var a="".concat(Tr).concat(t.replace(":","-"));return new Promise(function(n,r){if(e.getAttribute(a)!==null)return n();var o=K(e.children),i=o.filter(function(re){return re.getAttribute(Oe)===t})[0],s=M.getComputedStyle(e,t),l=s.getPropertyValue("font-family"),u=l.match(Dr),d=s.getPropertyValue("font-weight"),c=s.getPropertyValue("content");if(i&&!u)return e.removeChild(i),n();if(u&&c!=="none"&&c!==""){var v=s.getPropertyValue("content"),h=Ki(l,d),y=Bi(v),b=u[0].startsWith("FontAwesome"),w=Vi(s),S=Je(h,y),A=S;if(b){var k=ii(y);k.iconName&&k.prefix&&(S=k.iconName,h=k.prefix)}if(S&&!w&&(!i||i.getAttribute(He)!==h||i.getAttribute(Ge)!==A)){e.setAttribute(a,A),i&&e.removeChild(i);var C=Mi(),g=C.extra;g.attributes[Oe]=t,$e(S,h).then(function(re){var za=qe(f(f({},C),{},{icons:{main:re,mask:Ea()},prefix:h,iconName:A,extra:g,watchable:!0})),be=x.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(be,e.firstChild):e.appendChild(be),be.outerHTML=za.map(function(Wa){return ne(Wa)}).join(`
`),e.removeAttribute(a),n()}).catch(r)}else n()}else n()})}function Ji(e){return Promise.all([It(e,"::before"),It(e,"::after")])}function qi(e){return e.parentNode!==document.head&&!~Lr.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Oe)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Qi=function(t){return!!t&&fa.some(function(a){return t.includes(a)})},Zi=function(t){if(!t)return[];var a=new Set,n=t.split(/,(?![^()]*\))/).map(function(l){return l.trim()});n=n.flatMap(function(l){return l.includes("(")?l:l.split(",").map(function(u){return u.trim()})});var r=se(n),o;try{for(r.s();!(o=r.n()).done;){var i=o.value;if(Qi(i)){var s=fa.reduce(function(l,u){return l.replace(u,"")},i);s!==""&&s!=="*"&&a.add(s)}}}catch(l){r.e(l)}finally{r.f()}return a};function Pt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(L){var a;if(t)a=e;else if(m.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var n=new Set,r=se(document.styleSheets),o;try{for(r.s();!(o=r.n()).done;){var i=o.value;try{var s=se(i.cssRules),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,d=Zi(u.selectorText),c=se(d),v;try{for(c.s();!(v=c.n()).done;){var h=v.value;n.add(h)}}catch(b){c.e(b)}finally{c.f()}}}catch(b){s.e(b)}finally{s.f()}}catch(b){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(i.href," (").concat(b.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(b){r.e(b)}finally{r.f()}if(!n.size)return;var y=Array.from(n).join(", ");try{a=e.querySelectorAll(y)}catch{}}return new Promise(function(b,w){var S=K(a).filter(qi).map(Ji),A=Qe.begin("searchPseudoElements");ja(),Promise.all(S).then(function(){A(),Re(),b()}).catch(function(){A(),Re(),w()})})}}var eo={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=Pt,a}}},provides:function(t){t.pseudoElements2svg=function(a){var n=a.node,r=n===void 0?x:n;m.searchPseudoElements&&Pt(r)}}},Et=!1,to={mixout:function(){return{dom:{unwatch:function(){ja(),Et=!0}}}},hooks:function(){return{bootstrap:function(){xt(_e("mutationObserverCallbacks",{}))},noAuto:function(){ji()},watch:function(a){var n=a.observeMutationsRoot;Et?Re():xt(_e("mutationObserverCallbacks",{observeMutationsRoot:n}))}}}},Ft=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(n,r){var o=r.toLowerCase().split("-"),i=o[0],s=o.slice(1).join("-");if(i&&s==="h")return n.flipX=!0,n;if(i&&s==="v")return n.flipY=!0,n;if(s=parseFloat(s),isNaN(s))return n;switch(i){case"grow":n.size=n.size+s;break;case"shrink":n.size=n.size-s;break;case"left":n.x=n.x-s;break;case"right":n.x=n.x+s;break;case"up":n.y=n.y-s;break;case"down":n.y=n.y+s;break;case"rotate":n.rotate=n.rotate+s;break}return n},a)},ao={mixout:function(){return{parse:{transform:function(a){return Ft(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,n){var r=n.getAttribute("data-fa-transform");return r&&(a.transform=Ft(r)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var n=a.main,r=a.transform,o=a.containerWidth,i=a.iconWidth,s={transform:"translate(".concat(o/2," 256)")},l="translate(".concat(r.x*32,", ").concat(r.y*32,") "),u="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),d="rotate(".concat(r.rotate," 0 0)"),c={transform:"".concat(l," ").concat(u," ").concat(d)},v={transform:"translate(".concat(i/2*-1," -256)")},h={outer:s,inner:c,path:v};return{tag:"g",attributes:f({},h.outer),children:[{tag:"g",attributes:f({},h.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:f(f({},n.icon.attributes),h.path)}]}]}}}},Ie={x:0,y:0,width:"100%",height:"100%"};function Ot(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function no(e){return e.tag==="g"?e.children:[e]}var ro={hooks:function(){return{parseNodeAttributes:function(a,n){var r=n.getAttribute("data-fa-mask"),o=r?pe(r.split(" ").map(function(i){return i.trim()})):Ea();return o.prefix||(o.prefix=$()),a.mask=o,a.maskId=n.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var n=a.children,r=a.attributes,o=a.main,i=a.mask,s=a.maskId,l=a.transform,u=o.width,d=o.icon,c=i.width,v=i.icon,h=Kr({transform:l,containerWidth:c,iconWidth:u}),y={tag:"rect",attributes:f(f({},Ie),{},{fill:"white"})},b=d.children?{children:d.children.map(Ot)}:{},w={tag:"g",attributes:f({},h.inner),children:[Ot(f({tag:d.tag,attributes:f(f({},d.attributes),h.path)},b))]},S={tag:"g",attributes:f({},h.outer),children:[w]},A="mask-".concat(s||ft()),k="clip-".concat(s||ft()),C={tag:"mask",attributes:f(f({},Ie),{},{id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[y,S]},g={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:no(v)},C]};return n.push(g,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(A,")")},Ie)}),{children:n,attributes:r}}}},io={provides:function(t){var a=!1;M.matchMedia&&(a=M.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var n=[],r={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:f(f({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=f(f({},o),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||s.children.push({tag:"animate",attributes:f(f({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},i),{},{values:"1;0;1;1;0;1;"})}),n.push(s),n.push({tag:"path",attributes:f(f({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:f(f({},i),{},{values:"1;0;0;0;0;1;"})}]}),a||n.push({tag:"path",attributes:f(f({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},oo={hooks:function(){return{parseNodeAttributes:function(a,n){var r=n.getAttribute("data-fa-symbol"),o=r===null?!1:r===""?!0:r;return a.symbol=o,a}}}},so=[Qr,Ui,Yi,Hi,Gi,eo,to,ao,ro,io,oo];vi(so,{mixoutsTo:P});P.noAuto;var V=P.config;P.library;P.dom;var La=P.parse;P.findIconDefinition;P.toHtml;var lo=P.icon;P.layer;P.text;P.counter;function fo(e){return e=e-0,e===e}function Ma(e){return fo(e)?e:(e=e.replace(/[_-]+(.)?/g,(t,a)=>a?a.toUpperCase():""),e.charAt(0).toLowerCase()+e.slice(1))}var uo=(e,t)=>We.createElement("stop",{key:`${t}-${e.offset}`,offset:e.offset,stopColor:e.color,...e.opacity!==void 0&&{stopOpacity:e.opacity}});function co(e){return e.charAt(0).toUpperCase()+e.slice(1)}var H=new Map,mo=1e3;function vo(e){if(H.has(e))return H.get(e);const t={};let a=0;const n=e.length;for(;a<n;){const r=e.indexOf(";",a),o=r===-1?n:r,i=e.slice(a,o).trim();if(i){const s=i.indexOf(":");if(s>0){const l=i.slice(0,s).trim(),u=i.slice(s+1).trim();if(l&&u){const d=Ma(l);t[d.startsWith("webkit")?co(d):d]=u}}}a=o+1}if(H.size===mo){const r=H.keys().next().value;r&&H.delete(r)}return H.set(e,t),t}function $a(e,t,a={}){if(typeof t=="string")return t;const n=(t.children||[]).map(c=>{let v=c;return("fill"in a||a.gradientFill)&&c.tag==="path"&&"fill"in c.attributes&&(v={...c,attributes:{...c.attributes,fill:void 0}}),$a(e,v)}),r=t.attributes||{},o={};for(const[c,v]of Object.entries(r))switch(!0){case c==="class":{o.className=v;break}case c==="style":{o.style=vo(String(v));break}case c.startsWith("aria-"):case c.startsWith("data-"):{o[c.toLowerCase()]=v;break}default:o[Ma(c)]=v}const{style:i,role:s,"aria-label":l,gradientFill:u,...d}=a;if(i&&(o.style=o.style?{...o.style,...i}:i),s&&(o.role=s),l&&(o["aria-label"]=l,o["aria-hidden"]="false"),u){o.fill=`url(#${u.id})`;const{type:c,stops:v=[],...h}=u;n.unshift(e(c==="linear"?"linearGradient":"radialGradient",{...h,id:u.id},v.map(uo)))}return e(t.tag,{...o,...d},...n)}var ho=$a.bind(null,We.createElement),Ct=(e,t)=>{const a=Ua.useId();return e||(t?a:void 0)},po=class{constructor(e="react-fontawesome"){this.enabled=!1;let t=!1;try{t=typeof process<"u"&&!1}catch{}this.scope=e,this.enabled=t}log(...e){this.enabled&&console.log(`[${this.scope}]`,...e)}warn(...e){this.enabled&&console.warn(`[${this.scope}]`,...e)}error(...e){this.enabled&&console.error(`[${this.scope}]`,...e)}},go="searchPseudoElementsFullScan"in V&&typeof V.searchPseudoElementsFullScan=="boolean"?"7.0.0":"6.0.0",bo=Number.parseInt(go)>=7,yo=()=>bo,Z="fa",N={beat:"fa-beat",fade:"fa-fade",beatFade:"fa-beat-fade",bounce:"fa-bounce",shake:"fa-shake",spin:"fa-spin",spinPulse:"fa-spin-pulse",spinReverse:"fa-spin-reverse",pulse:"fa-pulse"},xo={left:"fa-pull-left",right:"fa-pull-right"},wo={90:"fa-rotate-90",180:"fa-rotate-180",270:"fa-rotate-270"},So={"2xs":"fa-2xs",xs:"fa-xs",sm:"fa-sm",lg:"fa-lg",xl:"fa-xl","2xl":"fa-2xl","1x":"fa-1x","2x":"fa-2x","3x":"fa-3x","4x":"fa-4x","5x":"fa-5x","6x":"fa-6x","7x":"fa-7x","8x":"fa-8x","9x":"fa-9x","10x":"fa-10x"},j={border:"fa-border",fixedWidth:"fa-fw",flip:"fa-flip",flipHorizontal:"fa-flip-horizontal",flipVertical:"fa-flip-vertical",inverse:"fa-inverse",rotateBy:"fa-rotate-by",swapOpacity:"fa-swap-opacity",widthAuto:"fa-width-auto"};function Ao(e){const t=V.cssPrefix||V.familyPrefix||Z;return t===Z?e:e.replace(new RegExp(String.raw`(?<=^|\s)${Z}-`,"g"),`${t}-`)}function ko(e){const{beat:t,fade:a,beatFade:n,bounce:r,shake:o,spin:i,spinPulse:s,spinReverse:l,pulse:u,fixedWidth:d,inverse:c,border:v,flip:h,size:y,rotation:b,pull:w,swapOpacity:S,rotateBy:A,widthAuto:k,className:C}=e,g=[];return C&&g.push(...C.split(" ")),t&&g.push(N.beat),a&&g.push(N.fade),n&&g.push(N.beatFade),r&&g.push(N.bounce),o&&g.push(N.shake),i&&g.push(N.spin),l&&g.push(N.spinReverse),s&&g.push(N.spinPulse),u&&g.push(N.pulse),d&&g.push(j.fixedWidth),c&&g.push(j.inverse),v&&g.push(j.border),h===!0&&g.push(j.flip),(h==="horizontal"||h==="both")&&g.push(j.flipHorizontal),(h==="vertical"||h==="both")&&g.push(j.flipVertical),y!=null&&g.push(So[y]),b!=null&&b!==0&&g.push(wo[b]),w!=null&&g.push(xo[w]),S&&g.push(j.swapOpacity),yo()?(A&&g.push(j.rotateBy),k&&g.push(j.widthAuto),(V.cssPrefix||V.familyPrefix||Z)===Z?g:g.map(Ao)):g}var Io=e=>typeof e=="object"&&"icon"in e&&!!e.icon;function Nt(e){if(e)return Io(e)?e:La.icon(e)}function Po(e){return Object.keys(e)}var jt=new po("FontAwesomeIcon"),Da={border:!1,className:"",mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1},Eo=new Set(Object.keys(Da)),Ra=We.forwardRef((e,t)=>{const a={...Da,...e},{icon:n,mask:r,symbol:o,title:i,titleId:s,maskId:l,transform:u}=a,d=Ct(l,!!r),c=Ct(s,!!i),v=Nt(n);if(!v)return jt.error("Icon lookup is undefined",n),null;const h=ko(a),y=typeof u=="string"?La.transform(u):u,b=Nt(r),w=lo(v,{...h.length>0&&{classes:h},...y&&{transform:y},...b&&{mask:b},symbol:o,title:i,titleId:c,maskId:d});if(!w)return jt.error("Could not find icon",v),null;const{abstract:S}=w,A={ref:t};for(const k of Po(a))Eo.has(k)||(A[k]=a[k]);return ho(S[0],A)});Ra.displayName="FontAwesomeIcon";/*!
 * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2026 Fonticons, Inc.
 */var Fo={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"]};function No(e){const t=Ya.c(11),{src:a,alt:n,viewCount:r,size:o}=e;let i;t[0]!==n||t[1]!==a?(i=U.jsx("img",{src:a,alt:n,className:"w-full h-[120px] object-cover object-cover rounded border shadow-sm"}),t[0]=n,t[1]=a,t[2]=i):i=t[2];let s;t[3]===Symbol.for("react.memo_cache_sentinel")?(s=U.jsx("span",{className:"px-1 py-0 text-xs text-white font-bold rounded-sm leading-tight",children:U.jsx(Ra,{icon:Fo})}),t[3]=s):s=t[3];let l;t[4]!==r?(l=r>0&&U.jsx("span",{className:"bg-red-500 px-1 py-0 text-xs text-white font-bold rounded-sm leading-tight",children:r}),t[4]=r,t[5]=l):l=t[5];let u;t[6]!==l?(u=U.jsxs("span",{className:"absolute top-[3%] z-[9] flex bg-[#4A4A4A] flex items-center justify-center rounded-xs ml-2 mt-2 px-[1px] py-[1px]",children:[s,l]}),t[6]=l,t[7]=u):u=t[7];let d;return t[8]!==i||t[9]!==u?(d=U.jsxs("div",{className:"relative",children:[i,u]}),t[8]=i,t[9]=u,t[10]=d):d=t[10],d}export{No as default};
