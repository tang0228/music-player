(this["webpackJsonpmusic-player"]=this["webpackJsonpmusic-player"]||[]).push([[21],{1021:function(e,t,n){"use strict";var c=n(19),s=n(1),a=n(1022),r=n.n(a),i=n(27),m=n(105),u=n(5);t.a=Object(m.b)((function(e){return{user:e.user}}))((function(e){var t=e.user,n=Object(s.useState)(""),a=Object(c.a)(n,2),m=a[0],o=a[1];return Object(u.jsxs)("div",{className:r.a.commit,id:"comment",children:[Object(u.jsxs)("div",{className:"commit-header",children:[Object(u.jsx)("h3",{className:"title",children:"\u8bc4\u8bba"}),Object(u.jsxs)("span",{className:"nums",children:["\u5171",e.commitNum,"\u6761\u8bc4\u8bba"]})]}),Object(u.jsxs)("div",{className:"commit-wrap",children:[Object(u.jsx)("img",{src:t?t.avatarUrl:"http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50",alt:""}),Object(u.jsxs)("div",{className:"commit-content",children:[Object(u.jsx)(i.x,{placeholder:"\u8bc4\u8bba",value:m,onChange:function(e){o(e)},maxCount:e.commitLength}),Object(u.jsx)("div",{className:"commit-opearte",children:Object(u.jsx)(i.c,{onClick:function(){t?m?(o(""),e.commit&&e.commit(m)):i.y.warning({content:"\u8bf7\u5148\u8f93\u5165\u5185\u5bb9\u54e6\ud83d\ude0a",duration:2}):i.y.warning("\u8bf7\u5148\u767b\u5f55\u518d\u8bc4\u8bba\u54e6")},children:"\u8bc4\u8bba"})})]})]})]})}))},1022:function(e,t,n){e.exports={commit:"index_commit__msAm_"}},1023:function(e,t,n){e.exports={"comment-list":"commitList_comment-list__JzpVv"}},1024:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return u}));var c=n(15),s=n.n(c),a=n(23),r=n(26);function i(e){return m.apply(this,arguments)}function m(){return(m=Object(a.a)(s.a.mark((function e(t){var n,c,a,i,m,u,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.t,c=t.type,a=t.id,i=t.content,m=t.commentId,u=t.timestamp,e.next=3,r.a.post("/comment",{t:n,type:c,id:a,content:i,commentId:m,timestamp:u});case 3:return o=e.sent,e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function u(e){return o.apply(this,arguments)}function o(){return(o=Object(a.a)(s.a.mark((function e(t){var n,c,a,i,m,u,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.cid,a=t.t,i=t.type,m=t.threadId,u=t.timestamp,e.next=3,r.a.post("/comment/like",{id:n,cid:c,t:a,type:i,threadId:m,timestamp:u});case 3:return o=e.sent,e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},1025:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n(1);var c=n(1023),s=n.n(c),a=n(997),r=n.n(a),i=n(42),m=n(14),u=n(105),o=n(5);var l=Object(u.b)((function(e){return{user:e.user}}))((function(e){var t=e.c,n=e.user;return Object(o.jsxs)("li",{className:"comment-item",children:[Object(o.jsx)(i.b,{to:"/user/home?uid="+t.user.userId,children:Object(o.jsx)(r.a,{height:50,debounce:500,placeholder:Object(o.jsx)("img",{width:50,height:50,src:"http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"}),children:Object(o.jsx)("img",{src:t.user.avatarUrl,alt:""})})}),Object(o.jsxs)("div",{className:"comment-desc",children:[Object(o.jsxs)("p",{className:"comment-content",children:[Object(o.jsx)(i.b,{className:"name",to:"/user/home?uid="+t.user.userId,children:t.user.nickname}),Object(o.jsx)("span",{className:"divider",children:":"}),Object(o.jsx)("span",{className:"content",children:t.content})]}),t.beReplied.length?t.beReplied.map((function(e){return Object(o.jsx)("div",{className:"beReplied",children:Object(o.jsxs)("p",{className:"comment-content",children:[Object(o.jsx)(i.b,{className:"name",to:"/user/home?uid="+e.user.userId,children:e.user.nickname}),Object(o.jsx)("span",{className:"divider",children:":"}),Object(o.jsx)("span",{className:"content",children:e.content})]})},e.beRepliedCommentId)})):null,Object(o.jsxs)("div",{className:"comment-points",children:[Object(o.jsx)("span",{className:"time",children:t.timeStr}),Object(o.jsxs)("div",{className:"operate",children:[n&&t.user.userId===n.userId?Object(o.jsxs)("span",{className:"del-wrap",children:[Object(o.jsx)("span",{className:"reback",onClick:function(){e.delComment&&e.delComment(t.commentId)},children:"\u5220\u9664"}),Object(o.jsx)("span",{className:"line",children:"|"})]}):null,Object(o.jsxs)("span",{className:t.liked?"like liked":"like",onClick:function(){e.commentLike&&e.commentLike(t.commentId,t.liked)},children:[Object(o.jsx)(m.I,{}),t.likedCount?Object(o.jsxs)("span",{className:"num",children:["(",t.likedCount,")"]}):null]}),Object(o.jsx)("span",{className:"line",children:"|"}),Object(o.jsx)("span",{className:"reback",children:"\u56de\u590d"})]})]})]})]},t.commentId)}));function d(e){var t=e.total,n=e.comments,c=e.hotComments,a=function(t,n){e.like&&e.like(t,n)},r=function(t){e.del&&e.del(t)};return Object(o.jsxs)("div",{className:s.a["comment-list"],children:[c&&c.length?Object(o.jsxs)("ul",{className:"comment",children:[Object(o.jsx)("li",{className:"header",children:Object(o.jsx)("h3",{className:"title",children:"\u7cbe\u5f69\u8bc4\u8bba"})}),c.map((function(e){return Object(o.jsx)(l,{commentLike:a,delComment:r,c:e},e.commentId)}))]}):null,Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),n&&n.length?Object(o.jsxs)("ul",{className:"comment",children:[Object(o.jsx)("li",{className:"header",children:Object(o.jsxs)("h3",{className:"title",children:["\u6700\u65b0\u8bc4\u8bba(",t,")"]})}),n.map((function(e){return Object(o.jsx)(l,{commentLike:a,delComment:r,c:e},e.commentId)}))]}):null]})}},1110:function(e,t,n){e.exports={"mv-detail":"index_mv-detail__3LR1Z"}},1111:function(e,t,n){e.exports={"mv-left":"mvLeft_mv-left__tNAX8"}},1112:function(e,t,n){e.exports={"mv-right":"MvRight_mv-right__1Y4bL"}},1157:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return A}));var c=n(15),s=n.n(c),a=n(23),r=n(19),i=n(1),m=n(50),u=n(26);function o(e){return l.apply(this,arguments)}function l(){return(l=Object(a.a)(s.a.mark((function e(t){var n,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.mvid,e.next=3,u.a.get("/mv/detail",{params:{mvid:n}});case 3:return c=e.sent,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e){return j.apply(this,arguments)}function j(){return(j=Object(a.a)(s.a.mark((function e(t){var n,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.mvid,e.next=3,u.a.get("/mv/detail/info",{params:{mvid:n}});case 3:return c=e.sent,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(e){return b.apply(this,arguments)}function b(){return(b=Object(a.a)(s.a.mark((function e(t){var n,c,a,r,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.limit,a=t.offset,r=t.timestamp,e.next=3,u.a.get("/comment/mv",{params:{id:n,limit:c,offset:a,timestamp:r}});case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(){return O.apply(this,arguments)}function O(){return(O=Object(a.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("/personalized/mv");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){return(f=Object(a.a)(s.a.mark((function e(t){var n,c,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.r,a=void 0===c?1080:c,e.next=3,u.a.get("/mv/url",{params:{id:n,r:a}});case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=n(1e3),v=n.n(x),N=n(1110),y=n.n(N),g=n(1111),w=n.n(g),k=n(42),C=n(14),I=n(27),_=n(1021),S=n(1025),L=n(1024),D=n(5);function z(e){var t=e.mvDetail,n=e.id,c=Object(i.useState)({}),m=Object(r.a)(c,2),u=m[0],o=m[1],l=Object(i.useState)([]),j=Object(r.a)(l,2),b=j[0],h=j[1],O=Object(i.useState)([]),x=Object(r.a)(O,2),v=x[0],N=x[1],y=Object(i.useState)(0),g=Object(r.a)(y,2),z=g[0],R=g[1],E=Object(i.useState)(1),M=Object(r.a)(E,2),J=M[0],P=M[1],U=Object(i.useState)(20),V=Object(r.a)(U,2),A=V[0],F=V[1],T=Object(i.useState)(!1),X=Object(r.a)(T,2),Y=X[0],Z=X[1],q=Object(i.useState)(""),B=Object(r.a)(q,2),G=B[0],H=B[1];Object(i.useEffect)((function(){return Object(a.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d({mvid:n});case 2:200===(t=e.sent).code&&o(t);case 4:case"end":return e.stop()}}),e)})))(),function(){}}),[n]);var K=function(){var e=Object(a.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(L.a)({t:1,type:1,content:t,id:n,timestamp:Date.now()});case 2:200===e.sent.code&&(I.y.success({content:"\u8bc4\u8bba\u6210\u529f",duration:2}),Q());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(a.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z(!0),e.next=3,p({id:n,limit:A,offset:(J-1)*A,timestamp:Date.now()});case 3:200===(t=e.sent).code&&(Z(!1),R(t.total),h(t.comments),N(t.hotComments));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(i.useEffect)((function(){return Q(),function(){}}),[n,A,J]);var W=function(){var e=Object(a.a)(s.a.mark((function e(t,c){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(L.b)({id:n,cid:t,t:c?0:1,type:1,timestamp:Date.now()});case 2:200===e.sent.code?(c?I.y.success({content:"\u53d6\u6d88\u8d5e\u6210\u529f",duration:2}):I.y.success({content:"\u8d5e\u6210\u529f",duration:2}),Q()):I.y.error({content:"\u64cd\u4f5c\u5931\u8d25"});case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),$=function(){var e=Object(a.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(L.a)({t:0,type:1,id:n,commentId:t,timestamp:Date.now()});case 2:200===e.sent.code&&(I.y.success({content:"\u5220\u9664\u6210\u529f",duration:2}),Q());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){return function(e){return f.apply(this,arguments)}({id:n}).then((function(e){200===e.code&&H(e.data.url)})),function(){}}),[n]),Object(D.jsxs)("div",{className:w.a["mv-left"],children:[Object(D.jsxs)("div",{className:"top",children:[Object(D.jsxs)("div",{className:"top-name",children:[Object(D.jsx)("span",{className:"name-icon",children:"MV"}),Object(D.jsx)("h3",{className:"name-mvname",children:t.name}),t.artists.map((function(e,t){return 0===t?Object(D.jsx)(k.b,{to:"/find/artist?id="+e.id,className:"name-artist",children:e.name},e.id):Object(D.jsxs)(k.b,{to:"/find/artist?id="+e.id,className:"name-artist",children:[Object(D.jsx)("span",{className:"divider",children:"/"}),e.name]},e.id)}))]}),Object(D.jsx)("div",{className:"top-img",children:Object(D.jsx)("video",{className:"mv-video",src:G,preload:1,controls:!0,poster:t.cover})}),u?Object(D.jsx)("div",{className:"top-btns",children:Object(D.jsxs)(I.s,{children:[Object(D.jsxs)(I.c,{type:"tertiary",icon:Object(D.jsx)(C.I,{}),children:["(",u.likedCount,")"]}),Object(D.jsxs)(I.c,{type:"tertiary",icon:Object(D.jsx)(C.O,{}),children:["(",t.subCount,")"]}),Object(D.jsxs)(I.c,{type:"tertiary",icon:Object(D.jsx)(C.C,{}),children:["(",u.shareCount,")"]})]})}):null]}),Object(D.jsx)(_.a,{commitNum:z,commit:K,commitLength:140}),Object(D.jsx)(S.a,{like:W,del:$,total:z,comments:b,hotComments:v}),z>0?Object(D.jsx)("div",{className:"pagination-wrapper",children:Object(D.jsx)(I.k,{total:z,currentPage:J,onPageChange:function(e){P(e)},showSizeChanger:!0,pageSize:A,pageSizeOpts:[20,30,50],onPageSizeChange:function(e){F(e)}})}):null,Object(D.jsx)(I.t,{spinning:Y,tip:"loading...",size:"large",style:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:"9999"}})]})}var R=n(1112),E=n.n(R),M=n(90),J=n(997),P=n.n(J);function U(e){var t=e.mvDetail,n=Object(i.useState)([]),c=Object(r.a)(n,2),m=c[0],u=c[1];return Object(i.useEffect)((function(){return Object(a.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:200===(t=e.sent).code&&u(t.result);case 4:case"end":return e.stop()}}),e)})))(),function(){}}),[]),Object(D.jsxs)("div",{className:E.a["mv-right"],children:[Object(D.jsxs)("div",{className:"mv-row",children:[Object(D.jsx)("h3",{className:"title",children:"MV\u7b80\u4ecb"}),Object(D.jsxs)("div",{className:"desc-content",children:[Object(D.jsxs)("div",{className:"text",children:["\u53d1\u5e03\u65f6\u95f4\uff1a",M.a.formatDate(t.publishTime)]}),Object(D.jsxs)("div",{className:"text",children:["\u64ad\u653e\u6b21\u6570\uff1a",t.playCount>1e4?parseInt(t.playCount/1e4)+"\u4e07\u6b21":t.playCount+"\u6b21"]}),Object(D.jsx)("div",{className:"desc",children:t.desc})]})]}),Object(D.jsxs)("div",{className:"mv-row",children:[Object(D.jsx)("h3",{className:"title",children:"\u76f8\u5173\u63a8\u8350"}),Object(D.jsx)("ul",{className:"mv-list",children:m?m.map((function(e){return Object(D.jsxs)("li",{className:"item",children:[Object(D.jsx)("div",{className:"img-wrap",children:Object(D.jsxs)(k.b,{to:"/find/mv?id="+e.id,children:[Object(D.jsx)(P.a,{children:Object(D.jsx)("img",{src:e.picUrl,alt:""})}),Object(D.jsxs)("div",{className:"img-top",children:[Object(D.jsx)(C.bb,{}),Object(D.jsx)("span",{className:"count",children:e.playCount>1e4?parseFloat(e.playCount/1e4)+"\u4e07":e.playCount})]})]})}),Object(D.jsxs)("div",{className:"mv-info",children:[Object(D.jsx)(k.b,{to:"/find/mv?id="+e.id,className:"name",children:e.name}),Object(D.jsx)("span",{className:"time",children:M.a.formatTime(e.duration)}),Object(D.jsxs)("span",{className:"by",children:["by ",Object(D.jsx)(k.b,{className:"artist",to:"/user/home?uid="+e.artistId,children:e.artistName})]})]})]},e.id)})):null})]})]})}var V=n(1026);function A(){var e=Object(m.h)(),t=v.a.parse(e.search).id,n=Object(i.useState)(null),c=Object(r.a)(n,2),u=c[0],l=c[1];return Object(i.useEffect)((function(){return Object(a.a)(s.a.mark((function e(){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({mvid:t});case 2:200===(n=e.sent).code&&l(n.data);case 4:case"end":return e.stop()}}),e)})))(),function(){}}),[t]),Object(D.jsx)(D.Fragment,{children:u?Object(D.jsxs)("div",{className:y.a["mv-detail"],children:[Object(D.jsx)("div",{className:"left",children:Object(D.jsx)(z,{mvDetail:u,id:t})}),Object(D.jsx)("div",{className:"right",children:Object(D.jsx)(U,{mvDetail:u,id:t})})]}):Object(D.jsx)(I.f,{image:Object(D.jsx)(V.a,{style:{width:150,height:150}}),darkModeImage:Object(D.jsx)(V.b,{style:{width:150,height:150}}),description:"\u4fe1\u606f\u4e22\u5931",style:{padding:30}})})}}}]);
//# sourceMappingURL=21.f44791e4.chunk.js.map