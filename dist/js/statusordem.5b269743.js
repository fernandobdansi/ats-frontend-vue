(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["statusordem"],{"6dc2":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.status,"sort-by":"calories"},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("Cadastro de Status da Ordem de Serviço")]),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,i=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",i,!1),s),[t._v("Novo Item")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"12"}},[a("v-text-field",{attrs:{label:"Status",outlined:""},model:{value:t.editedItem.status,callback:function(e){t.$set(t.editedItem,"status",e)},expression:"editedItem.status"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancelar")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v("Salvar")])],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(e){var s=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(s)}}},[t._v("mdi-pencil")]),a("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(s)}}},[t._v("mdi-delete")])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v("Resetar")])]},proxy:!0}])})},i=[],n=(a("c975"),a("a434"),{data:function(){return{dialog:!1,headers:[{text:"ID",value:"id"},{text:"Status",align:"start",value:"status"},{text:"Ações",value:"actions",sortable:!1}],status:[],editedIndex:-1,editedItem:{},defaultItem:{}}},computed:{formTitle:function(){return-1===this.editedIndex?"Cadastrar Status:":"Editar Status:"}},watch:{dialog:function(t){t||this.close()}},created:function(){this.initialize()},methods:{initialize:function(){this.status=[{id:1,status:"Aguardando"},{id:2,status:"Em Andamento"},{id:3,status:"Finalizado"},{id:4,status:"Aguardando Peças"}]},editItem:function(t){this.editedIndex=this.status.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){var e=this.status.indexOf(t);confirm("Você tem certeza que deseja apagar este item?")&&this.status.splice(e,1)},close:function(){var t=this;this.dialog=!1,this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}))},save:function(){this.editedIndex>-1?Object.assign(this.status[this.editedIndex],this.editedItem):this.status.push(this.editedItem),this.close()}}}),d=n,o=a("2877"),r=a("6544"),l=a.n(r),c=a("8336"),u=a("b0af"),v=a("99d9"),m=a("62ad"),f=a("a523"),h=a("8fea"),b=a("169a"),p=a("132d"),x=a("0fd9"),I=a("2fa4"),g=a("8654"),k=a("71d9"),V=a("2a7f"),_=Object(o["a"])(d,s,i,!1,null,null,null);e["default"]=_.exports;l()(_,{VBtn:c["a"],VCard:u["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:v["c"],VCol:m["a"],VContainer:f["a"],VDataTable:h["a"],VDialog:b["a"],VIcon:p["a"],VRow:x["a"],VSpacer:I["a"],VTextField:g["a"],VToolbar:k["a"],VToolbarTitle:V["a"]})}}]);
//# sourceMappingURL=statusordem.5b269743.js.map