(this["webpackJsonpmusic-player"]=this["webpackJsonpmusic-player"]||[]).push([[10],{1032:function(e,t,s){"use strict";s.d(t,"b",(function(){return c})),s.d(t,"a",(function(){return n}));var c=[{text:"\u5355\u66f2",key:"1"},{text:"\u6b4c\u624b",key:"100"},{text:"\u4e13\u8f91",key:"10"},{text:"\u89c6\u9891",key:"1014"},{text:"\u6b4c\u8bcd",key:"1006"},{text:"\u6b4c\u5355",key:"1000"},{text:"\u58f0\u97f3\u4e3b\u64ad",key:"1009"},{text:"\u7528\u6237",key:"1002"}],n=[{text:"\u70ed\u95e8\u4f5c\u54c1",key:"song"},{text:"\u6240\u6709\u4e13\u8f91",key:"album"},{text:"\u76f8\u5173MV",key:"mv"},{text:"\u827a\u4eba\u4ecb\u7ecd",key:"desc"}]},1072:function(e,t,s){},1073:function(e,t,s){},1074:function(e,t,s){},1075:function(e,t,s){},1076:function(e,t,s){},1077:function(e,t,s){},1078:function(e,t,s){},1079:function(e,t,s){},1080:function(e,t,s){},1081:function(e,t,s){},1151:function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return R}));var c=s(15),n=s.n(c),a=s(23),i=s(19),r=s(1),l=s(1e3),d=s.n(l),j=s(50),o=(s(1072),s(90)),u=s(104),b=s(42),m=s(105),O=s(106),x=s(165),h=s(5);var p=Object(m.b)((function(e){return{song:e.song}}),(function(e){return{addSong:function(){return e(O.e.apply(void 0,arguments))},setCurSongId:function(){return e(x.b.apply(void 0,arguments))}}}))((function(e){var t=e.addSong,s=e.setCurSongId,c=function(){var e=Object(a.a)(n.a.mark((function e(c){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.m)({id:c});case 2:a=e.sent,s(c),200===a.code&&a.data[0].url&&t(a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i=e.songs.map((function(e,t){return Object(h.jsxs)("li",{className:"".concat(o.a.isEven(t+1)?"search-item":"search-item even"),children:[Object(h.jsx)("i",{className:"music-play",onClick:function(){c(e.id)}}),Object(h.jsxs)("div",{className:"song-wrap",style:{flex:"1"},children:[Object(h.jsx)(b.b,{to:"/find/song?id="+e.id,className:"name",children:e.name}),e.mvid?Object(h.jsx)(b.b,{to:"/find/mv?id="+e.mvid,className:"music-mv"}):null]}),Object(h.jsxs)("div",{className:"operates",children:[Object(h.jsx)("i",{className:"icon icon-add"}),Object(h.jsx)("i",{className:"icon icon-fav"}),Object(h.jsx)("i",{className:"icon icon-share"}),Object(h.jsx)("i",{className:"icon icon-down"})]}),Object(h.jsx)("div",{className:"singers",children:e.artists&&e.artists.map((function(e,t){return Object(h.jsx)(b.b,{className:"singer-name",to:"/find/artist?id="+e.id,children:0===t?e.name:"/".concat(e.name)},e.id)}))}),Object(h.jsxs)(b.b,{to:"/find/album?id="+e.album.id,className:"album",children:["\u300a",e.album.name,"\u300b"]}),Object(h.jsx)("div",{className:"duration",children:o.a.formatTime(e.duration)})]},e.id)}));return Object(h.jsx)("ul",{className:"music-container",children:i})})),f=s(997),g=s.n(f),v=(s(1073),s(999));function N(e){var t=e.singers.map((function(e){return Object(h.jsxs)("li",{className:"singer-item",children:[Object(h.jsx)("div",{className:"singer-img",children:Object(h.jsx)(b.b,{to:"/find/artist?id="+e.id,children:Object(h.jsxs)(g.a,{height:130,debounce:500,placeholder:Object(h.jsx)("img",{width:"100%",height:"100%",src:v.a}),children:[Object(h.jsx)("img",{src:e.img1v1Url,alt:""}),Object(h.jsx)("span",{className:"mask"})]})})}),Object(h.jsxs)("p",{className:"singer-name",children:[Object(h.jsx)(b.b,{to:"/find/artist?id="+e.id,className:"name",children:e.name}),e.identityIconUrl?Object(h.jsx)("img",{src:e.identityIconUrl,alt:""}):null]})]},e.id)}));return Object(h.jsx)("ul",{className:"singer-content",children:t})}s(1074);var y=s(27);var k=Object(m.b)((function(e){return{curSongId:e.curSongId}}),(function(e){return{setCurSongId:function(){return e(x.b.apply(void 0,arguments))},addSongs:function(){return e(O.f.apply(void 0,arguments))}}}))((function(e){var t=e.albums,s=e.setCurSongId,c=e.addSongs,n=function(e){Object(u.b)({id:e}).then((function(e){if(200===e.code){y.y.success({content:"\u6210\u529f\u6dfb\u52a0\u65b0\u789f\u5230\u64ad\u653e\u5217\u8868",duration:2});var t=e.songs.map((function(e){return{id:e.id,url:"https://music.163.com/song/media/outer/url?id="+e.id+".mp3",song:e}}));c(t),s(t[0].id)}}))},a=t.map((function(e){return Object(h.jsxs)("li",{className:"album-item",children:[Object(h.jsxs)("div",{className:"album-img",children:[Object(h.jsx)(b.b,{to:"/find/album?id="+e.id,children:Object(h.jsxs)(g.a,{height:130,debounce:500,placeholder:Object(h.jsx)("img",{width:"100%",height:"100%",src:v.a}),children:[Object(h.jsx)("img",{src:e.blurPicUrl,alt:""}),Object(h.jsx)("span",{className:"mask"})]})}),Object(h.jsx)("i",{className:"album-play",onClick:n.bind(null,e.id)})]}),Object(h.jsx)(b.b,{to:"/find/album?id="+e.id,className:"album-name",children:e.name}),Object(h.jsx)(b.b,{to:"/find/artist?id="+e.artist.id,className:"singer-name",children:e.artist.name})]},e.id)}));return Object(h.jsx)("ul",{className:"album-container",children:a})}));s(1075);function w(e){var t=e.videos.map((function(e){return Object(h.jsxs)("li",{className:"video-item",children:[Object(h.jsx)(b.b,{to:"/find/mv?id="+e.vid,children:Object(h.jsxs)("div",{className:"video-img",children:[Object(h.jsx)(g.a,{height:90,debounce:500,placeholder:Object(h.jsx)("img",{width:"100%",height:"100%",src:v.a}),children:Object(h.jsx)("img",{src:e.coverUrl,alt:""})}),Object(h.jsxs)("div",{className:"play-nums",children:[Object(h.jsx)("i",{className:"icon-video"}),Object(h.jsxs)("span",{className:"nums",children:[Number(e.playTime/1e4).toFixed(1),"\u4e07"]})]}),Object(h.jsx)("span",{className:"video-duration",children:o.a.formatTime(e.durationms)})]})}),Object(h.jsx)("div",{className:"video-name",children:e.title}),Object(h.jsxs)("div",{className:"singer-name",children:["by ",e.creator[0].userName]})]},e.vid)}));return Object(h.jsx)("ul",{className:"video-container",children:t})}var S=s(204),C=(s(1076),s(14));var I=Object(m.b)((function(e){return{song:e.song}}),(function(e){return{addSong:function(){return e(O.e.apply(void 0,arguments))},setCurSongId:function(){return e(x.b.apply(void 0,arguments))}}}))((function(e){var t=e.addSong,s=e.setCurSongId,c=Object(r.useState)(!1),l=Object(i.a)(c,2),d=l[0],j=l[1],m=function(){var e=Object(a.a)(n.a.mark((function e(c){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.m)({id:c});case 2:a=e.sent,s(c),200===a.code&&a.data[0].url&&t(a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{className:"words-item",children:[Object(h.jsxs)("div",{className:"".concat(o.a.isEven(e.index+1)?"words-header":"words-header even"),children:[Object(h.jsxs)("div",{className:"name",children:[Object(h.jsx)("i",{className:"word-play",onClick:function(){m(e.id)}}),Object(h.jsx)(b.b,{to:"/find/song?id="+e.id,className:"ml8",children:e.name})]}),Object(h.jsxs)("div",{className:"operates",children:[Object(h.jsx)("i",{className:"icon icon-add"}),Object(h.jsx)("i",{className:"icon icon-fav"}),Object(h.jsx)("i",{className:"icon icon-share"}),Object(h.jsx)("i",{className:"icon icon-down"})]}),Object(h.jsx)("div",{className:"singers",children:e.artists.map((function(e,t){return Object(h.jsx)(b.b,{to:"/find/artist?id="+e.id,children:0===t?e.name:"/"+e.name},e.id)}))}),Object(h.jsx)(b.b,{to:"/find/album?id="+e.album.id,className:"alnum",children:e.album.name}),Object(h.jsx)("span",{className:"duration",children:o.a.formatTime(e.duration)})]}),Object(h.jsxs)("div",{className:"words-lyric",children:[d?e.lyrics.txt:e.lyrics.txt.split("\n").slice(0,4).join("\n"),Object(h.jsxs)("div",{className:"arrow",onClick:function(){j(!d)},children:[Object(h.jsx)("span",{className:"text",children:d?"\u6536\u8d77":"\u5c55\u5f00"}),d?Object(h.jsx)(C.n,{}):Object(h.jsx)(C.k,{})]})]})]},e.id)}));function U(e){var t=e.words.map((function(e,t){return Object(h.jsx)(I,Object(S.a)(Object(S.a)({},e),{},{index:t}),e.id)}));return Object(h.jsx)("div",{className:"words-container",children:t})}s(1077);var z=Object(m.b)((function(e){return{curSongId:e.curSongId}}),(function(e){return{setCurSongId:function(){return e(x.b.apply(void 0,arguments))},addSongs:function(){return e(O.f.apply(void 0,arguments))}}}))((function(e){var t=e.playlist,s=e.addSongs,c=e.setCurSongId,n=function(e){Object(u.q)({id:e}).then((function(e){if(200===e.code){y.y.success({content:"\u6210\u529f\u6dfb\u52a0\u6b4c\u5355\u5230\u64ad\u653e\u5217\u8868",duration:2});var t=e.playlist.tracks.map((function(e){return{id:e.id,url:"https://music.163.com/song/media/outer/url?id="+e.id+".mp3",song:e}}));s(t),c(t[0].id)}}))},a=t.map((function(e,t){return Object(h.jsxs)("li",{className:o.a.isEven(t+1)?"play-item":"play-item even",children:[Object(h.jsx)("i",{className:"list-play",onClick:n.bind(null,e.id)}),Object(h.jsx)(b.b,{to:"/find/playlist/detail?id="+e.id,children:Object(h.jsx)("div",{className:"img-wrap",children:Object(h.jsxs)(g.a,{height:50,debounce:500,placeholder:Object(h.jsx)("img",{width:"50px",height:"50px",src:v.a}),children:[Object(h.jsx)("img",{className:"img",src:e.coverImgUrl,alt:""}),Object(h.jsx)("span",{className:"mask"})]})})}),Object(h.jsx)(b.b,{to:"/find/playlist/detail?id="+e.id,className:"name",children:e.name}),Object(h.jsxs)("div",{className:"operates",children:[Object(h.jsx)("i",{className:"icon icon-add"}),Object(h.jsx)("i",{className:"icon icon-fav"}),Object(h.jsx)("i",{className:"icon icon-share"})]}),Object(h.jsxs)("span",{className:"count",children:[e.trackCount," \u9996"]}),Object(h.jsxs)("span",{className:"creator",children:["by ",Object(h.jsx)(b.b,{className:"name",to:"/user/home?uid="+e.creator.userId,children:e.creator.nickname})]}),Object(h.jsxs)("span",{className:"book",children:["\u6536\u85cf\uff1a",e.bookCount]}),Object(h.jsxs)("span",{className:"listens",children:["\u6536\u542c\uff1a",parseInt(e.playCount/1e4),"\u4e07"]})]},e.id)}));return Object(h.jsx)("ul",{className:"playlist-wrap",children:a})}));s(1078);function E(e){var t=e.djs.map((function(e){return Object(h.jsxs)("div",{className:"dj-item",children:[Object(h.jsx)(g.a,{height:150,debounce:500,placeholder:Object(h.jsx)("img",{width:"100%",height:"100%",src:v.a}),children:Object(h.jsx)("img",{src:e.picUrl,alt:""})}),Object(h.jsxs)("div",{className:"dj-content",children:[Object(h.jsx)("p",{className:"desc",children:e.desc||"\u8fd9\u4eba\u5f88\u61d2\uff0c\u6ca1\u6709\u4ecb\u7ecd"}),Object(h.jsxs)("div",{className:"info",children:["by",Object(h.jsx)("span",{className:"name",children:e.name}),Object(h.jsxs)("span",{className:2===e.dj.gender?"pink":"blue",children:[e.nickname," ",2===e.dj.gender?Object(h.jsx)(C.y,{}):Object(h.jsx)(C.K,{})]})]})]})]},e.id)}));return Object(h.jsx)("div",{className:"dj-container",children:t})}s(1079);function T(e){var t=e.users.map((function(e,t){return Object(h.jsxs)("li",{className:o.a.isEven(t+1)?"user-item":"user-item even",children:[Object(h.jsxs)("div",{className:"user-info",children:[Object(h.jsx)(b.b,{to:"/user/home?uid="+e.userId,children:Object(h.jsx)("div",{className:"img-wrap",children:Object(h.jsxs)(g.a,{height:50,debounce:500,placeholder:Object(h.jsx)("img",{width:"100%",height:"100%",src:v.a}),children:[Object(h.jsx)("img",{src:e.avatarUrl,alt:""}),Object(h.jsx)("span",{className:"mask"})]})})}),Object(h.jsxs)("div",{className:"user-desc",children:[Object(h.jsxs)("span",{className:2===e.gender?"name pink":"name blue",children:[Object(h.jsxs)(b.b,{to:"/user/home?uid="+e.userId,children:[e.nickname," "]})," ",2===e.gender?Object(h.jsx)(C.y,{}):Object(h.jsx)(C.K,{})," "]}),Object(h.jsx)("span",{className:"desc",children:e.signature})]})]}),Object(h.jsx)("div",{className:"btn",children:Object(h.jsxs)(y.c,{type:"tertiary",children:[Object(h.jsx)(C.O,{}),Object(h.jsx)("span",{className:"add",children:"\u5173\u6ce8"})]})}),Object(h.jsxs)("div",{className:"playlist",children:["\u6b4c\u5355\uff1a",e.playlistCount||0]}),Object(h.jsxs)("div",{className:"fans",children:["\u7c89\u4e1d\uff1a",e.followeds||0]})]},e.userId)}));return Object(h.jsx)("ul",{className:"user-container",children:t})}var P=s(1026),K=(s(1080),s(238)),J=s(1032);s(1081);function M(e){var t=e.keyword,s=e.total,c=e.type,n=o.a.getTextByType(c);return Object(h.jsxs)("div",{className:"note-container",children:["\u641c\u7d22\u201c",t,"\u201d\uff0c\u627e\u5230 ",Object(h.jsx)("span",{className:"nums",children:s})," \u4e2a",n]})}function R(){var e=Object(r.useState)(35),t=Object(i.a)(e,2),s=t[0],c=t[1],l=Object(r.useState)(1),o=Object(i.a)(l,2),u=o[0],b=o[1],m=Object(r.useState)("1"),O=Object(i.a)(m,2),x=O[0],f=O[1],g=Object(r.useState)(!1),v=Object(i.a)(g,2),S=v[0],I=v[1],R=Object(j.h)(),q=Object(j.g)(),B=d.a.parse(R.search).keywords,F=Object(r.useState)(B),V=Object(i.a)(F,2),A=V[0],D=V[1],G=Object(r.useState)([]),H=Object(i.a)(G,2),L=H[0],Q=H[1],W=Object(r.useState)([]),X=Object(i.a)(W,2),Y=X[0],Z=X[1],$=Object(r.useState)([]),_=Object(i.a)($,2),ee=_[0],te=_[1],se=Object(r.useState)([]),ce=Object(i.a)(se,2),ne=ce[0],ae=ce[1],ie=Object(r.useState)([]),re=Object(i.a)(ie,2),le=re[0],de=re[1],je=Object(r.useState)([]),oe=Object(i.a)(je,2),ue=oe[0],be=oe[1],me=Object(r.useState)([]),Oe=Object(i.a)(me,2),xe=Oe[0],he=Oe[1],pe=Object(r.useState)([]),fe=Object(i.a)(pe,2),ge=fe[0],ve=fe[1],Ne=Object(r.useState)(0),ye=Object(i.a)(Ne,2),ke=ye[0],we=ye[1],Se=function(){var e=Object(a.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!0),e.next=3,Object(K.a)({keywords:B,limit:s,offset:(u-1)*s,type:x});case 3:if(200!==(t=e.sent).code){e.next=34;break}e.t0=x,e.next="1"===e.t0?8:"100"===e.t0?11:"10"===e.t0?14:"1014"===e.t0?17:"1006"===e.t0?20:"1000"===e.t0?23:"1009"===e.t0?26:"1002"===e.t0?29:32;break;case 8:return Q(t.result.songs),we(t.result.songCount),e.abrupt("break",33);case 11:return Z(t.result.artists),we(t.result.artistCount),e.abrupt("break",33);case 14:return te(t.result.albums),we(t.result.albumCount),e.abrupt("break",33);case 17:return ae(t.result.videos),we(t.result.videoCount),e.abrupt("break",33);case 20:return de(t.result.songs),we(t.result.songCount),e.abrupt("break",33);case 23:return be(t.result.playlists),we(t.result.playlistCount),e.abrupt("break",33);case 26:return he(t.result.djRadios),we(t.result.djRadiosCount),e.abrupt("break",33);case 29:return ve(t.result.userprofiles),we(t.result.userprofileCount),e.abrupt("break",33);case 32:return e.abrupt("break",33);case 33:I(!1);case 34:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){return Se(),function(){}}),[B,s,u,x]);var Ce=J.b.map((function(e){return Object(h.jsx)(y.u,{tab:e.text,itemKey:e.key},e.key)}));return Object(h.jsxs)("div",{className:"search-container",children:[Object(h.jsx)("div",{className:"search-inp",children:Object(h.jsx)(y.h,{suffix:Object(h.jsx)(C.S,{}),style:{width:420,color:"#000",border:"1px solid #ddd"},value:A,size:"large",showClear:!0,onEnterPress:function(){A?q.push("/search?keywords=".concat(A)):y.y.warning({content:"\u8bf7\u8f93\u5165 \u97f3\u4e50/\u89c6\u9891/\u7535\u53f0/\u7528\u6237 \u7b49\u5173\u952e\u5b57",duration:2})},onChange:function(e){D(e)}})}),Object(h.jsx)(M,{keyword:B,type:x,total:ke||0}),Object(h.jsx)("div",{className:"search-tabs",children:Object(h.jsx)(y.v,{type:"card",onChange:function(e){f(e)},children:Ce})}),"1"===x&&L?Object(h.jsx)(p,{songs:L}):null,"100"===x&&Y?Object(h.jsx)(N,{singers:Y}):null,"10"===x&&ee?Object(h.jsx)(k,{albums:ee}):null,"1014"===x&&ne?Object(h.jsx)(w,{videos:ne}):null,"1006"===x&&le?Object(h.jsx)(U,{words:le}):null,"1000"===x&&ue?Object(h.jsx)(z,{playlist:ue}):null,"1009"===x&&xe?Object(h.jsx)(E,{djs:xe}):null,"1002"===x&&ge?Object(h.jsx)(T,{users:ge}):null,ke>0?Object(h.jsx)("div",{className:"pagination-ontainer",children:Object(h.jsx)(y.k,{total:ke,currentPage:u,onPageChange:function(e){b(e)},showSizeChanger:!0,pageSize:s,pageSizeOpts:[15,35,70],onPageSizeChange:function(e){c(e)}})}):Object(h.jsx)(y.f,{image:Object(h.jsx)(P.c,{style:{width:150,height:150}}),darkModeImage:Object(h.jsx)(P.d,{style:{width:150,height:150}}),description:"\u641c\u7d22\u65e0\u7ed3\u679c"}),Object(h.jsx)(y.t,{spinning:S,tip:"loading...",size:"large",style:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:"9999"}})]})}},999:function(e,t,s){"use strict";t.a=s.p+"static/media/loading.4c0ea1e7.svg"}}]);
//# sourceMappingURL=10.0c9b0f57.chunk.js.map