(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["marcas"],{"5e6a":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.lMarca,"order-by":"id"},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("Cadastro de Marcas")]),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,c=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",c,!1),i),[e._v("Novo Item")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"12"}},[a("v-text-field",{attrs:{label:"Marca",outlined:"",required:"",counter:20,rules:e.marcaRules},model:{value:e.editedItem.nomeMarca,callback:function(t){e.$set(e.editedItem,"nomeMarca",t)},expression:"editedItem.nomeMarca"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("Cancelar")]),a("v-btn",{attrs:{disabled:!e.valid,color:"blue darken-1",text:""},on:{click:e.save}},[e._v("Salvar")])],1)],1)],1)],1),a("v-dialog",{attrs:{"max-width":"430px"},model:{value:e.dialogExcluir,callback:function(t){e.dialogExcluir=t},expression:"dialogExcluir"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Deseja mesmo remover este Item?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeExcluir}},[e._v("Cancelar")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemComfirm}},[e._v("Sim")]),a("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var i=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(i)}}},[e._v("mdi-pencil")]),a("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(i)}}},[e._v("mdi-delete")])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:e.initialize}},[e._v("Resetar")])]},proxy:!0}])})},c=[],r=(a("c975"),a("a434"),a("ac1f"),a("841c"),a("f0b9")),n=r["a"].build(),o={novo:"Nova Marca",edicao:"Edição de Marca",exclusao:"Deseja mesmo remover esta Marca?"},s={name:"lMarca",components:{},data:function(){return{dialog:!1,dialogExcluir:!1,valid:!0,marcaRules:[function(e){return!!e||"Preenchimento Necessário"},function(e){return e&&e.length<=20&&e.length>=2||"O campo deve ter pelo menos 2 e no maximo 20 letras"}],headers:[{text:"ID",value:"id"},{text:"Nome",value:"nomeMarca"},{text:"Ações",align:"end",value:"actions",sortable:!1}],lMarca:[],editedIndex:-1,editedItem:{},defaultItem:{}}},computed:{formTitle:function(){return-1===this.editedIndex?o.novo:o.edicao}},watch:{dialog:function(e){e||this.close()}},created:function(){this.fetchRecords()},methods:{fetchRecords:function(){n.search({}).then(this.fetchRecodsSuccess)},fetchRecodsSuccess:function(e){Array.isArray(e.rows)?this.lMarca=e.rows:this.lMarca=[]},editItem:function(e){this.editedIndex=this.lMarca.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem:function(e){this.editedIndex=this.lMarca.indexOf(e),this.editedItem=Object.assign({},e),this.dialogExcluir=!0},deleteItemComfirm:function(){n.destroy(this.editedItem).then(this.lMarca.splice(this.editedIndex,1)),this.closeExcluir()},closeExcluir:function(){var e=this;this.dialogExcluir=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){var e=this;this.editedIndex>-1?(console.log(this.editedItem),n.update(this.editedItem).then(Object.assign(this.lMarca[this.editedIndex],this.editedItem))):n.create(this.editedItem).then((function(t){return e.lMarca.push(t)})),this.close()}}},d=s,l=a("2877"),u=a("6544"),m=a.n(u),v=a("8336"),f=a("b0af"),h=a("99d9"),x=a("62ad"),b=a("a523"),p=a("8fea"),I=a("169a"),g=a("4bd4"),k=a("132d"),M=a("0fd9"),_=a("2fa4"),C=a("8654"),V=a("71d9"),w=a("2a7f"),y=Object(l["a"])(d,i,c,!1,null,null,null);t["default"]=y.exports;m()(y,{VBtn:v["a"],VCard:f["a"],VCardActions:h["a"],VCardText:h["b"],VCardTitle:h["c"],VCol:x["a"],VContainer:b["a"],VDataTable:p["a"],VDialog:I["a"],VForm:g["a"],VIcon:k["a"],VRow:M["a"],VSpacer:_["a"],VTextField:C["a"],VToolbar:V["a"],VToolbarTitle:w["a"]})},f0b9:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var i=a("d4ec"),c=a("262e"),r=a("2caf"),n=a("ade3"),o=a("de4f"),s=function(e){Object(c["a"])(a,e);var t=Object(r["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return a}(o["a"]);Object(n["a"])(s,"resource","/marcas")}}]);
//# sourceMappingURL=marcas.7b9a0f09.js.map