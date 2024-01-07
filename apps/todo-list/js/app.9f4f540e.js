(function(){"use strict";var e={3211:function(e,t,n){var o=n(9242),i=n(3396),d=n(7139);const l={id:"App"},a={action:"https://tmacedo.pythonanywhere.com/setjson/json_data.json",method:"post",enctype:"application/json",style:{display:"inline",float:"right"}},s=(0,i._)("input",{type:"hidden",id:"hiddenInput",name:"jsondata"},null,-1),r={"aria-labelledby":"list-summary",class:"stack-large"},u={class:"list-summary"};function c(e,t,n,o,c,m){const b=(0,i.up)("todo-item"),p=(0,i.up)("add-form");return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("h1",null,[(0,i.Uk)(" To do list "),(0,i._)("form",a,[s,(0,i._)("button",{type:"submit",class:"btn__save",onClick:t[0]||(t[0]=e=>m.sendData(this.TodoItems))}," Save ")])]),(0,i._)("ul",r,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(c.TodoItems,(e=>((0,i.wg)(),(0,i.iD)("li",{key:e.id},[(0,i.Wm)(b,{label:e.label,done:e.done,id:e.id,onCheckboxChanged:t=>m.updateDone(e.id),onItemDeleted:t=>m.deleteItem(e.id),onItemEdited:t=>m.editItem(e.id,t)},null,8,["label","done","id","onCheckboxChanged","onItemDeleted","onItemEdited"])])))),128))]),(0,i._)("h2",u,(0,d.zw)(m.listSummary),1),(0,i.Wm)(p,{onItemAdded:m.addItem},null,8,["onItemAdded"])])}n(560);const m=(0,i._)("button",{type:"submit",class:"btn btn__primary btn__lg"}," Add ",-1);function b(e,t,n,d,l,a){return(0,i.wg)(),(0,i.iD)("form",{onSubmit:t[1]||(t[1]=(0,o.iM)(((...e)=>a.onSubmit&&a.onSubmit(...e)),["prevent"]))},[(0,i.wy)((0,i._)("input",{type:"text",autocomplete:"off",class:"input__lg","onUpdate:modelValue":t[0]||(t[0]=e=>l.label=e)},null,512),[[o.nr,l.label,void 0,{lazy:!0,trim:!0}]]),m],32)}var p={methods:{onSubmit(){""!==this.label&&(this.$emit("item-added",this.label),this.label="")}},data(){return{label:""}}},h=n(89);const f=(0,h.Z)(p,[["render",b]]);var y=f;const g={key:0,class:"stack small"},_={class:"custom-checkbox"},v=["id","checked"],I=["for"],w={class:"btn-group"},k={class:"visually-hidden"},S={class:"visually-hidden"};function E(e,t,n,o,l,a){const s=(0,i.up)("item-edit-form");return l.isEditing?((0,i.wg)(),(0,i.j4)(s,{key:1,id:n.id,label:n.label,onItemEdited:a.itemEdited,onEditCancelled:a.editCancelled},null,8,["id","label","onItemEdited","onEditCancelled"])):((0,i.wg)(),(0,i.iD)("div",g,[(0,i._)("div",_,[(0,i._)("input",{type:"checkbox",class:"checkbox",id:n.id,checked:a.isDone,onChange:t[0]||(t[0]=t=>e.$emit("checkbox-changed"))},null,40,v),(0,i._)("label",{for:n.id,class:"checkbox-label"},(0,d.zw)(n.label),9,I)]),(0,i._)("div",w,[(0,i._)("button",{type:"button",class:"btn",onClick:t[1]||(t[1]=(...e)=>a.toggleEditForm&&a.toggleEditForm(...e))},[(0,i.Uk)(" Edit "),(0,i._)("span",k,(0,d.zw)(n.label),1)]),(0,i._)("button",{type:"button",class:"btn btn__danger",onClick:t[2]||(t[2]=(...e)=>a.deleteItem&&a.deleteItem(...e))},[(0,i.Uk)(" Delete "),(0,i._)("span",S,(0,d.zw)(n.label),1)])])]))}const T={class:"edit-label"},C=["id"],j={class:"btn-group"},x={class:"visually-hidden"},D={type:"submit",class:"btn btn__primary"},O={class:"visually-hidden"};function z(e,t,n,l,a,s){return(0,i.wg)(),(0,i.iD)("form",{class:"stack-small",onSubmit:t[2]||(t[2]=(0,o.iM)(((...e)=>s.onSubmit&&s.onSubmit(...e)),["prevent"]))},[(0,i._)("div",null,[(0,i._)("label",T,' Edit Name for "'+(0,d.zw)(n.label)+'" ',1),(0,i.wy)((0,i._)("input",{id:n.id,type:"text",autocomplete:"off","onUpdate:modelValue":t[0]||(t[0]=e=>a.newLabel=e)},null,8,C),[[o.nr,a.newLabel,void 0,{lazy:!0,trim:!0}]])]),(0,i._)("div",j,[(0,i._)("button",{type:"button",class:"btn",onClick:t[1]||(t[1]=(...e)=>s.onCancel&&s.onCancel(...e))},[(0,i.Uk)(" Cancel "),(0,i._)("span",x,"editing "+(0,d.zw)(n.label),1)]),(0,i._)("button",D,[(0,i.Uk)(" Save "),(0,i._)("span",O,"edit for "+(0,d.zw)(n.label),1)])])],32)}var $={props:{label:{type:String,required:!0},id:{type:String,required:!0}},data(){return{newLabel:this.label}},methods:{onSubmit(){this.newLabel&&this.newLabel!==this.label&&this.$emit("item-edited",this.newLabel)},onCancel(){this.$emit("edit-cancelled")}}};const U=(0,h.Z)($,[["render",z],["__scopeId","data-v-b57cf344"]]);var A=U,F={props:{label:{required:!0,type:String},done:{default:!1,type:Boolean},id:{required:!0,type:String}},components:{ItemEditForm:A},data(){return{isEditing:!1}},methods:{deleteItem(){this.$emit("item-deleted")},toggleEditForm(){this.isEditing=!0},itemEdited(e){this.$emit("item-edited",e),this.isEditing=!1},editCancelled(){this.isEditing=!1}},computed:{isDone(){return this.done}}};const L=(0,h.Z)(F,[["render",E],["__scopeId","data-v-4a4f7e9d"]]);var M=L,Z=n(1076),q=n(2e3),P=n.n(q),N={name:"App",components:{AddForm:y,TodoItem:M},computed:{listSummary(){const e=this.TodoItems.length,t=this.TodoItems.filter((e=>e.done)).length;return`Total: ${t} out of ${e}`}},data(){return{TodoItems:null}},methods:{addItem(e){this.TodoItems.push({id:P()("todo-"),label:e,done:!1})},updateDone(e){const t=this.TodoItems.find((t=>t.id===e));t.done=!t.done},deleteItem(e){const t=this.TodoItems.findIndex((t=>t.id===e));this.TodoItems.splice(t,1)},editItem(e,t){const n=this.TodoItems.find((t=>t.id===e));n.label=t},sendData(e){const t=JSON.stringify(e);document.getElementById("hiddenInput").value=t}},created(){const e="https://tmacedo.pythonanywhere.com/getjson/json_data.json";Z.Z.get(e).then((e=>{this.TodoItems=JSON.parse(e.data.message)}))}};const B=(0,h.Z)(N,[["render",c]]);var J=B;(0,o.ri)(J).mount("#app")}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var d=t[o]={exports:{}};return e[o].call(d.exports,d,d.exports,n),d.exports}n.m=e,function(){var e=[];n.O=function(t,o,i,d){if(!o){var l=1/0;for(u=0;u<e.length;u++){o=e[u][0],i=e[u][1],d=e[u][2];for(var a=!0,s=0;s<o.length;s++)(!1&d||l>=d)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(a=!1,d<l&&(l=d));if(a){e.splice(u--,1);var r=i();void 0!==r&&(t=r)}}return t}d=d||0;for(var u=e.length;u>0&&e[u-1][2]>d;u--)e[u]=e[u-1];e[u]=[o,i,d]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var i,d,l=o[0],a=o[1],s=o[2],r=0;if(l.some((function(t){return 0!==e[t]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(s)var u=s(n)}for(t&&t(o);r<l.length;r++)d=l[r],n.o(e,d)&&e[d]&&e[d][0](),e[d]=0;return n.O(u)},o=self["webpackChunkTo_do_list"]=self["webpackChunkTo_do_list"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(3211)}));o=n.O(o)})();
//# sourceMappingURL=app.9f4f540e.js.map
