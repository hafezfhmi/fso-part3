(this.webpackJsonpex=this.webpackJsonpex||[]).push([[0],{40:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(15),a=n.n(c),o=n(3),s=n(0),u=function(e){var t=e.message;return Object(s.jsx)("p",{style:"danger"===t.type?{backgroundColor:"#f1f1f1",color:"red",border:"2px solid red",padding:"5px"}:{backgroundColor:"#f1f1f1",color:"green",border:"2px solid green",padding:"5px"},children:t.message})},i=function(e){var t=e.getName,n=e.newName,r=e.getNumber,c=e.newNumber,a=e.submitInput;return Object(s.jsxs)("form",{children:[Object(s.jsx)("h2",{children:"add a new"}),Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{onChange:t,value:n})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{onChange:r,value:c})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",onClick:a,children:"add"})})]})},d=n(4),l=n.n(d),b="/api/persons",f={getAll:function(){return l.a.get(b).then((function(e){return e.data}))},addPerson:function(e){return l.a.post(b,e).then((function(e){return e.data}))},deletePerson:function(e){return l.a.delete("".concat(b,"/").concat(e))},updatePerson:function(e,t){return l.a.put("".concat(b,"/").concat(e),t).then((function(e){return e.data}))}},m=function(e){var t=e.name,n=e.number,r=e.id,c=e.persons,a=e.setPersons,o=e.setShowMessage;return Object(s.jsxs)("p",{children:["".concat(t," ").concat(n)," ",Object(s.jsx)("button",{onClick:function(e){e.preventDefault(),window.confirm("Delete ".concat(t,"?"))&&(f.deletePerson(r),a(c.filter((function(e){return e.id!==r}))),o({message:"".concat(t," has been deleted"),type:"danger"}),setTimeout((function(){return o(null)}),3e3))},children:"delete"})]})},j=function(e){var t=e.persons,n=e.filterName,r=e.setPersons,c=e.setShowMessage;return t.map((function(e){return new RegExp(n,"i").test(e.name)?Object(s.jsx)(m,{name:e.name,number:e.number,id:e.id,persons:t,setPersons:r,setShowMessage:c},e.name):null}))},p=function(e){var t=e.getFilter,n=e.filterName;return Object(s.jsxs)("div",{children:["filter shown with",Object(s.jsx)("input",{type:"text",onChange:t,value:n})]})},h=function(){var e=Object(r.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),d=Object(o.a)(a,2),l=d[0],b=d[1],m=Object(r.useState)(""),h=Object(o.a)(m,2),g=h[0],O=h[1],x=Object(r.useState)(""),v=Object(o.a)(x,2),w=v[0],N=v[1],y=Object(r.useState)(null),P=Object(o.a)(y,2),S=P[0],k=P[1];Object(r.useEffect)((function(){f.getAll().then((function(e){c(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),S&&Object(s.jsx)(u,{message:S}),Object(s.jsx)(p,{getFilter:function(e){N(e.target.value)},filterName:w}),Object(s.jsx)(i,{getName:function(e){b(e.target.value)},newName:l,getNumber:function(e){O(e.target.value)},newNumber:g,submitInput:function(e){e.preventDefault();var t=n.find((function(e){return e.name===l}));void 0!==t?(t.number=g,window.confirm("".concat(t.name," is already added to phonebook, replace the old number with a new one?"))&&(f.updatePerson(t.id,t).then((function(e){k({message:"Updated ".concat(l),type:"normal"}),setTimeout((function(){k(null)}),3e3),c(n.map((function(n){return n.id!==t.id?n:e})))})).catch((function(e){k({message:"Information of ".concat(l," has already been removed from server"),type:"danger"}),setTimeout((function(){k(null)}),3e3),c(n.filter((function(e){return e.name!==l})))})),b(""),O(""))):(f.addPerson({name:l,number:g}).then((function(e){k({message:"Added ".concat(l),type:"normal"}),setTimeout((function(){k(null)}),3e3),c(n.concat(e))})).catch((function(e){k({message:e.response.data,type:"danger"}),setTimeout((function(){k(null)}),3e3)})),b(""),O(""))}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(j,{persons:n,filterName:w,setPersons:c,setShowMessage:k})]})};a.a.render(Object(s.jsx)(h,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.25d1ab70.chunk.js.map