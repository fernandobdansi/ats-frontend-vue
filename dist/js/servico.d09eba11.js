(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["servico"],{ab66:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.servicos,"sort-by":"id"},scopedSlots:e._u([{key:"top",fn:function(){return[i("v-toolbar",{attrs:{flat:""}},[i("v-toolbar-title",[e._v("Cadastro de Serviços")]),i("v-spacer"),i("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on,s=t.attrs;return[i("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",s,!1),a),[e._v("Novo Item")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[i("v-card",[i("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[i("v-card-title",[i("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),i("v-card-text",[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12",sm:"6",md:"12"}},[i("v-text-field",{attrs:{label:"Serviço",outlined:"",required:"",counter:100,rules:e.servicosRules},model:{value:e.editedItem.descricao,callback:function(t){e.$set(e.editedItem,"descricao",t)},expression:"editedItem.descricao"}})],1)],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("Cancelar")]),i("v-btn",{attrs:{disabled:!e.valid,color:"blue darken-1",text:""},on:{click:e.save}},[e._v("Salvar")])],1)],1)],1)],1),i("v-dialog",{attrs:{"max-width":"430px"},model:{value:e.dialogExcluir,callback:function(t){e.dialogExcluir=t},expression:"dialogExcluir"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[e._v("Deseja mesmo remover este Item?")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeExcluir}},[e._v("Cancelar")]),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemComfirm}},[e._v("Sim")]),i("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var a=t.item;return[i("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(a)}}},[e._v("mdi-pencil")]),i("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(a)}}},[e._v("mdi-delete")])]}},{key:"no-data",fn:function(){return[i("v-btn",{attrs:{color:"primary"},on:{click:e.fetchRecords}},[e._v("Resetar")])]},proxy:!0}])})},s=[],o=(i("c975"),i("a434"),i("ac1f"),i("841c"),i("c358")),c=o["a"].build(),r={novo:"Novo Serviço",edicao:"Edição de Serviço",exclusao:"Deseja mesmo remover este Serviço?"},n={name:"Servicos",components:{},data:function(){return{dialog:!1,dialogExcluir:!1,valid:!0,servicosRules:[function(e){return!!e||"Preenchimento Necessário"},function(e){return e&&e.length<=100&&e.length>=10||"O campo deve ter pelo menos 10 e no maximo 100 letras"}],headers:[{text:"ID",value:"id"},{text:"Descrição",value:"descricao"},{text:"Ações",align:"end",value:"actions",sortable:!1}],servicos:[],editedIndex:-1,editedItem:{},defaultItem:{}}},computed:{formTitle:function(){return-1===this.editedIndex?r.novo:r.edicao}},watch:{dialog:function(e){e||this.close()}},created:function(){this.fetchRecords()},methods:{fetchRecords:function(){c.search({}).then(this.fetchRecodsSuccess)},fetchRecodsSuccess:function(e){Array.isArray(e.rows)?this.servicos=e.rows:this.servicos=[]},editItem:function(e){this.editedIndex=this.servicos.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem:function(e){this.editedIndex=this.servicos.indexOf(e),this.editedItem=Object.assign({},e),this.dialogExcluir=!0},deleteItemComfirm:function(){c.destroy(this.editedItem).then(this.servicos.splice(this.editedIndex,1)),this.closeExcluir()},closeExcluir:function(){var e=this;this.dialogExcluir=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){var e=this;this.editedIndex>-1?(console.log(this.editedItem),c.update(this.editedItem).then(Object.assign(this.servicos[this.editedIndex],this.editedItem))):c.create(this.editedItem).then((function(t){return e.servicos.push(t)})),this.close()}}},d=n,l=i("2877"),u=i("6544"),v=i.n(u),m=i("8336"),f=i("b0af"),h=i("99d9"),x=i("62ad"),b=i("a523"),p=i("8fea"),I=i("169a"),g=i("4bd4"),k=i("132d"),_=i("0fd9"),C=i("2fa4"),V=i("8654"),w=i("71d9"),y=i("2a7f"),O=Object(l["a"])(d,a,s,!1,null,null,null);t["default"]=O.exports;v()(O,{VBtn:m["a"],VCard:f["a"],VCardActions:h["a"],VCardText:h["b"],VCardTitle:h["c"],VCol:x["a"],VContainer:b["a"],VDataTable:p["a"],VDialog:I["a"],VForm:g["a"],VIcon:k["a"],VRow:_["a"],VSpacer:C["a"],VTextField:V["a"],VToolbar:w["a"],VToolbarTitle:y["a"]})},c358:function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var a=i("d4ec"),s=i("262e"),o=i("2caf"),c=i("ade3"),r=i("de4f"),n=function(e){Object(s["a"])(i,e);var t=Object(o["a"])(i);function i(){return Object(a["a"])(this,i),t.apply(this,arguments)}return i}(r["a"]);Object(c["a"])(n,"resource","/servicos")}}]);
//# sourceMappingURL=servico.d09eba11.js.map