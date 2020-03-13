(function(t){function e(e){for(var i,r,o=e[0],l=e[1],d=e[2],c=0,p=[];c<o.length;c++)r=o[c],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&p.push(s[r][0]),s[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(p.length)p.shift()();return a.push.apply(a,d||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,o=1;o<n.length;o++){var l=n[o];0!==s[l]&&(i=!1)}i&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},s={app:0},a=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var d=0;d<o.length;d++)e(o[d]);var u=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"2b9d":function(t,e,n){},"47f6":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("a026"),s=i["default"].component("App",{template:"\n\t\t<router-view></router-view>\n\t"}),a=(n("96cf"),n("1da1")),r=n("8c4f"),o=(n("4160"),n("498a"),n("159b"),n("d3b7"),i["default"].component("loading",{props:["text","wrapper"],template:'<div class="loader-container" v-bind:class="{ curtain: wrapper }"><div class="loader-content"><i class="fas fa-fan fa-spin fa-3x fa-fw"></i> <span>{{text}}</span></div></div>'}),i["default"].component("errors",{props:["error"],template:'<div v-if="error.length" class="error-list alert alert-warning" role="alert"><ul><li v-for="item in error">{{item.message}}</li></ul></div>'}),i["default"].component("success",{template:'<div class="alert alert-success" role="success"><slot name="heading"></slot><slot name="message"></slot><slot name="link"></slot></div>'}),n("bc3a")),l=n.n(o),d=i["default"].component("Login",{data:function(){return{userName:"",password:"",errors:[],loading:!1}},methods:{validateForm:function(){var t=this;return this.errors=[],""!=this.userName.trim()&&""!=this.password.trim()||(""==this.userName.trim()&&this.errors.push({field:"userName",message:"Anna käyttäjänimi"}),""==this.password.trim()&&this.errors.push({field:"password",message:"Anna salasana"}),t.loading=!1,!1)},submitForm:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e,n.loading=!0,!e.validateForm()){t.next=12;break}return t.prev=3,t.next=6,l()({url:"/api/user/login",method:"post",withCredentials:!0,data:{userName:n.userName,password:n.password}}).then((function(t){t.length&&"success"!=t[0].message&&(t.forEach((function(t,e){i["default"].set(n.errors,e,{message:t.message})})),n.loading=!1)})).then((function(t){f.push({name:"index",params:{success:!0}})})).catch((function(t){console.log(t),n.loading=!1}));case 6:t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](3),console.error(t.t0),n.loading=!1;case 12:case"end":return t.stop()}}),t,null,[[3,8]])})))()}},template:'\n\t\t<div class="d-flex align-items-center justify-content-center flex-column" style="height: 100vh">\n\t\t\t<img src="img/icons/android-icon-144x144.png" />\n        \t<div className="flex-row">\n        \t\t<b-card header="Kirjaudu sisään" header-tag="h3" class="mx-3">\n        \t\t\t<errors v-bind:error=errors />\n        \t\t\t<loading v-if="loading" text="Kirjaudutaan sisään" v-bind:wrapper=true />\n\t\t\t\t    <b-form inline v-on:submit.prevent="submitForm">\n\t\t\t\t\t    <b-input class="mb-2 mr-sm-2 mb-sm-0" placeholder="Käyttäjänimi" v-model="userName"></b-input>\t\t\t\t\t    \n\t\t\t\t\t    <b-input placeholder="Salasana" type="password" class="mb-2 mb-sm-0 mr-sm-2" v-model="password"></b-input>\n\t\t\t\t\t    <b-button variant="primary" type="submit" class="ml-auto">Kirjaudu</b-button>\n\t\t\t\t  \t</b-form>\n\t\t\t\t  \t<template v-slot:footer>\n\t\t\t\t        Eikö sinulla ole vielä tiliä? Rekisteröidy <router-link :to="{ name: \'register\'}">tästä</router-link>\n\t\t      \t\t</template>\n\t\t  \t\t</b-card>\n        \t</div>\n    \t</div>\n\t'}),u=n("5f5b");n("caad"),n("45fc"),n("a434"),n("2532"),n("b0c0"),n("25f0"),i["default"].component("shoppinglistListItem",{props:["data","existsID"],data:function(){return{isHidden:!1,informExists:!1}},created:function(){this.$emit("created")},computed:{insertClasses:function(){return{done:this.data.done,hidden:this.isHidden,"list-item":!0,exists:this.informExists}}},watch:{existsID:function(t,e){if(this.informExists=this.data._id==t,this.informExists){var n=this;setTimeout((function(){n.informExists=!1,n.$emit("reset-existingID")}),3e3)}}},methods:{removeItem:function(t){this.$emit("remove-list-item",this.data)},toggleDone:function(t){this.data.done=!this.data.done,this.$emit("item-done"),this.$emit("update-list")}},template:'<li :class="insertClasses">{{data.title}}\n  \t\t\t\t\t<span class="tools">\n  \t\t\t\t\t\t<button v-if="!this.data.done" v-on:click="toggleDone" class="list-item-done-toggle" title="Merkitse valmiiksi"><i class="fas fa-check"></i></button>\n  \t\t\t\t\t\t<button v-else v-on:click="toggleDone" class="list-item-done-toggle" title="Merkitse puuttuvaksi"><i class="fas fa-undo"></i></button>\n  \t\t\t\t\t\t<button v-on:click="removeItem" class="text-warning" title="Poista"><i class="far fa-trash-alt"></i></button>\n  \t\t\t\t\t</span>\n\t\t\t\t</li>'}),i["default"].component("shoppinglistList",{props:["list","lists","shared_lists","newListLoading"],data:function(){return{message:"",edit:!1,prevName:"",nameUpdated:!1,allRemoveDisabled:!0,existsID:null,loading:!1,newName:"",newListName:"",shareEmail:""}},watch:{list:function(t,e){var n=this;n.toggleRemoveAllDone()}},methods:{add:function(t){var e=this;t.preventDefault();var n=this.message.trim();if(""==n)return!1;var i=function(t){if(t.title.toLowerCase()==n.toLowerCase())return e.existsID=t._id,!0};if(this.list.items.some(i))return this.message="",!1;var s=(new Date).getTime().toString(16),a={id:s,title:n,done:!1};this.message="",this.list.items.push(a),this.updateList(),this.$emit("add-item",a)},removeItem:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n="id",i=-1,"undefined"!=typeof e._id&&(n="_id"),this.list.items.some((function(t,s){if(t[n]==e[n])return i=s,!0})),-1==i){t.next=9;break}return this.list.items.splice(i,1),t.next=8,this.updateList().then((function(t){return console.log(t)})).catch((function(t){console.error(t)}));case 8:return t.abrupt("return",!0);case 9:return t.abrupt("return",!1);case 10:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),shareList:function(){var t=this;if(""==t.shareEmail.trim())return!1;this.updateShared(t.shareEmail).then((function(e){i["default"].set(t.list,"shared_with",e.data.shared_with)})).catch((function(t){console.error(t)})),t.shareEmail=""},updateShared:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=this,t.next=3,l.a.put("/api/list/shared",{email:e,list:n.list._id});case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),toggleRemoveAllDone:function(){this.allRemoveDisabled=!0;var t=function(t){return!0===t.done};this.list.items.some(t)&&(this.allRemoveDisabled=!1)},removeDone:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(e=this,this.list.items.forEach((function(t,e){})),n=this.list.items.length-1;n>=0;n--)this.list.items[n].done&&this.list.items.splice(n,1);return t.next=5,this.updateList().then((function(t){e.toggleRemoveAllDone()})).catch((function(t){console.error(t)}));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),toggleEdit:function(t){t.preventDefault();var e=this;e.edit=!e.edit,e.edit?(e.newListName=e.list.name.valueOf(),e.prevName=e.list.name):(e.newListName="",e.list.name=e.prevName)},removeList:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n,i,s,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.preventDefault(),n=this,i=n.list._id,s=n.list.name,!confirm("Haluatko varmasti poistaa listan: ".concat(s))){t.next=8;break}return n.loading=!0,t.next=8,l.a.delete("/api/list/"+i).then((function(t){n.$emit("list-removed",i),n.loading=!1})).catch((function(t){if(401==t.response.status)return a.$router.push({name:"login"});console.error(t),n.loading=!1}));case 8:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),updateList:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,l.a.put("/api/list/items",e.list);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),updateListName:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n,s=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.preventDefault(),n=this,""!=n.newListName.trim()){t.next=4;break}return t.abrupt("return",!1);case 4:return t.next=6,l.a.put("/api/list/name",{_id:n.list._id,name:n.newListName}).then((function(t){i["default"].set(n.list,"name",t.data.name),i["default"].set(n,"prevName",t.data.name)})).catch((function(t){if(401==t.response.status)return s.$router.push({name:"login"});console.error(t)}));case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),newList:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.preventDefault(),n=this,this.$emit("add-list",e),n.newName="";case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},template:'\n  \t\t<div>\n\t\t  \t<div v-if="!edit && list" class="card bg-primary text-white">\n\t\t        <div class="card-header">\n\t\t            <template v-if="list">\n\t\t            {{list.name}}\n\t\t            <b-button v-if="!list.is_shared" class="ml-2 btn-sm btn-success float-right d-none d-lg-block" v-on:click="toggleEdit" title="Muokkaa listaa"><i class="fas fa-edit"></i></b-button>\n\t\t        \t<b-dropdown class="float-right d-lg-none" variant="primary" size="sm" no-caret right>\n\t\t\t\t    <template v-slot:button-content>\n\t\t\t\t      <i class="fas fa-ellipsis-v"></i>\n\t\t\t\t    </template>\n\t\t\t\t    <b-dropdown-item-button v-if="!list.is_shared" variant="success" class="text-center" v-on:click="toggleEdit" title="Muokkaa listaa" size="sm"><i class="fas fa-edit"></i></b-dropdown-item-button>\n\t\t\t\t    <b-dropdown-divider></b-dropdown-divider>\n\t\t\t\t    <b-dropdown-item v-for="(lista, index) in lists" v-bind:key="lista.id" @click="$emit(\'change-list\', lista._id)" v-bind:class="{ \'bg-warning text-light\': lista._id==list._id }">\n\t\t\t\t    \t<span>{{lista.name}}</span>\n\t\t\t    \t\t<span class="float-right">\n\t\t\t\t\t    \t<b-badge v-if="lista.shared_with.length > 0" class="ml-3" variant="alert" pill title="Olet jakanut tämän listan"><i class="fas fa-share-square"></i></b-badge><b-badge v-if="lista.items" variant="primary" pill>{{ lista.items.length }}</b-badge>\n\t\t\t\t\t    </span>\n\t\t\t\t    </b-dropdown-item>\n\t\t\t\t    <b-dropdown-item v-for="(shared, index) in shared_lists" v-bind:key="shared.id" @click="$emit(\'change-list\', shared._id)" v-bind:class="{ \'bg-warning text-light\': shared._id==list._id }">\n\t\t\t\t    \t<span>{{shared.name}}</span>\n\t\t\t    \t\t<span class="float-right">\n\t\t\t\t\t    \t<b-badge class="ml-3" variant="alert" pill title="Tämä lista on jaettu kanssasi"><i class="fas fa-share-square fa-flip-horizontal"></i></b-badge><b-badge v-if="shared.items" variant="primary" pill>{{ shared.items.length }}</b-badge>\n\t\t\t\t\t    </span>\n\t\t\t\t    </b-dropdown-item>\n\t\t\t\t    <b-dropdown-divider></b-dropdown-divider>\n\t\t\t\t    <b-dropdown-form v-bind:style="{width: \'200px\'}">\n\t\t\t\t    \t<b-input-group size="sm">\n\t\t\t\t    \t\t<loading v-if="newListLoading" text="" v-bind:wrapper=true />\n\t\t\t\t\t\t\t<b-form-input placeholder="Uusi lista" v-bind:value="newName" v-on:input="$emit(\'alter-newlistname\', $event)" v-on:keyup.enter="newList"></b-form-input>\n\t\t\t\t\t\t\t<b-input-group-append>\n\t\t\t\t\t\t\t\t<b-button size="sm" variant="success" v-on:click="newList" title="Tallenna"><i class="fas fa-check"></i></b-button>\n\t\t\t\t\t\t\t</b-input-group-append>\n\t\t\t\t\t\t</b-input-group>\n\t\t\t\t\t</b-dropdown-form>\n\t\t\t\t  </b-dropdown>\n\t\t            </template>\n\t\t        </div>\n\t\t        <div class="card-body">\n\t\t    \t\t<loading v-if="!list" text="Lataillaan" v-bind:wrapper=true />\n\t\t            <ol class="shoppinglist-list" v-if="list.items && list.items.length > 0">\n\t\t                <shoppinglistListItem \n\t\t                \tv-for="item in list.items" \n\t\t                \tv-bind:key=item.uniqid \n\t\t                \tv-bind:data=item \n\t\t                \tv-bind:existsID=existsID\n\t\t                \t@remove-list-item="removeItem" \n\t\t                \t@item-done="toggleRemoveAllDone" \n\t\t                \t@update-list="updateList"\n\t\t                \t@reset-existingID="existsID = null"\n\t\t                \tv-on="$listeners" />\n\t\t            </ol>\n\t\t            <div v-else class="alert alert-secondary" role="alert">\n\t\t\t\t\t\tListalla ei ole vielä kohteita.\n\t\t\t\t\t</div>\n\t\t            <button v-on:click="removeDone" class="btn btn-warning btn-sm float-right" v-bind:disabled="allRemoveDisabled" title="Poista valmiit"><i class="fas fa-trash-alt"></i></button>\n\t\t        </div>\n\t\t        <div class="card-footer">\n\t\t        \t<form class="form-inline" v-on:submit.prevent>\n\t\t            \t<input class="form-control shoppinglist-input-auto" type="text" v-model="message" v-on:keyup.enter="add" placeholder="Lisää listalle" autofocus /><b-button class="ml-2" variant="primary" v-on:click="add"><i class="fas fa-plus-circle"></i></b-button>\n\t\t        \t</form>\n\t\t        </div>\n\t\t    </div>\n\t\t    <div v-if="edit" class="card bg-primary text-white">\n\t\t        <div class="card-header form-inline">\n\t\t            <input class="form-control form-control-sm shoppinglist-input-auto" type="text" v-model="newListName">\n\t\t            <b-button class="ml-2 btn-sm" variant="success" title="Tallenna nimi" v-on:click="updateListName" v-bind:disabled="newListName == list.name"><i class="fas fa-check"></i></b-button>\n\t\t        </div>\n\t\t        <div class="card-body">\n\t\t        \t<loading v-if="loading" text="" v-bind:wrapper=true />\n\t\t        \t<b-button class="ml-2 btn-sm" variant="danger" v-on:click="removeList" title="Sulje muokkaus"><i class="fas fa-trash-alt"></i> Poista lista</b-button>\n\t\t        \t<hr>\n\t\t        \t<h4>Jaa lista</h4>\n\t\t        \t<small class="text-info mb-2 d-block">Voit jakaa listan sellaisen henkilön kanssa joka on myös rekisteröitynyt tähän palveluun</small>\n\t\t        \t<form class="form-inline mb-3">\n\t\t        \t\t<input class="form-control form-control-sm shoppinglist-input-auto" v-model="shareEmail" type="email" placeholder="Anna sähköpostiosoite">\n\t\t            \t<b-button class="ml-2 btn-sm" variant="success" title="Jaa lista" v-on:click="shareList" ><i class="fas fa-share-square" ></i></b-button>\n\t\t            </form>\n\t\t            <div v-if="list.shared_with.length > 0">\n\t\t\t            <p class="mb-1"><b>Lista jaettu seuraavien käyttäjien kanssa:</b></p>\n\t\t\t            <ul class="pl-3">\n\t\t\t            \t<li v-for="(shared, index) in list.shared_with">{{shared.email}}</li>\n\t\t\t            </ul>\n\t\t\t            \n\t\t            </div>\n\t\t        </div>\n\t\t        <div class="card-footer text-right">\n\t\t        \t<b-button class="ml-2 btn-sm" variant="warning" v-on:click="toggleEdit" title="Sulje muokkaus"><i class="fas fa-undo"></i></b-button>\n\t\t        </div>\n\t\t    </div>\n\t    </div>\n    '}),i["default"].component("shoppinglist",{props:{lists:Array,shared_lists:Array},data:function(){return{shoppingLists:[],sharedShoppingLists:[],shoppingList:null,itemList:[],showNewListForm:!1,newListName:"",newListLoading:!1,listType:"normal"}},watch:{lists:function(t,e){this.shoppingLists=t,null===this.shoppingList?this.shoppingList=this.shoppingLists[0]:this.chooseList(this.shoppingList._id)},shared_lists:function(t,e){this.sharedShoppingLists=t,null===this.shoppingList?this.shoppingList=this.sharedShoppingLists[0]:this.chooseList(this.shoppingList._id)}},methods:{handleItemAdd:function(t){if(this.itemList.includes(t.title))return!1;this.itemList.push(t.title)},chooseList:function(t){var e=this,n=!1;if(e.shoppingLists.some((function(s,a){if(s._id==t)return i["default"].set(e,"shoppingList",e.shoppingLists[a]),n=!0,e.listType="normal",!0})),n)return!0;e.sharedShoppingLists.some((function(s,a){if(s._id==t)return i["default"].set(e,"shoppingList",e.sharedShoppingLists[a]),n=!0,e.listType="shared",!0}))},toggleAddNewList:function(){var t=this;t.showNewListForm=!t.showNewListForm,t.showNewListForm||(t.newListName="")},alterNewListName:function(t){var e=this;e.newListName=t},addNewList:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.preventDefault(),n=this,""!=n.newListName.trim()){t.next=4;break}return t.abrupt("return",!1);case 4:return n.newListLoading=!0,t.next=7,l.a.post("/api/list",{name:n.newListName}).then((function(t){n.shoppingLists.push(t.data),n.toggleAddNewList(),n.chooseList(t.data._id),n.newListLoading=!1})).catch((function(t){console.error(t),n.newListLoading=!1}));case 7:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),removeList:function(t){var e=this,n=-1;e.shoppingLists.forEach((function(e,i){e._id==t&&(n=i)})),-1!=n&&(e.shoppingLists.splice(n,1),e.shoppingLists.length>0?e.chooseList(e.shoppingLists[0]._id):e.shoppingList=null)}},template:'\n  \t\t<div class="row">\n  \t\t\t<div class="col-sm-12 col-lg-6">\n  \t\t\t\t<shoppinglistList \n  \t\t\t\t\tv-bind:list=shoppingList \n  \t\t\t\t\tv-bind:lists=shoppingLists \n  \t\t\t\t\tv-bind:shared_lists=sharedShoppingLists \n  \t\t\t\t\tv-bind:newListLoading=newListLoading \n  \t\t\t\t\t@alter-newlistname="alterNewListName"\n  \t\t\t\t\t@add-list="addNewList" \n  \t\t\t\t\t@add-item="handleItemAdd" \n  \t\t\t\t\t@list-removed="removeList" \n  \t\t\t\t\t@change-list="chooseList" />\n\t\t\t</div>\n\t\t\t<div class="d-none d-lg-block col-sm-3">\n\t\t\t\t<div>\n\t\t\t\t\t<b-list-group class="shoppinglist-user-lists">\n\t\t\t\t\t  <b-list-group-item v-on:click="chooseList( list._id )" class="d-flex justify-content-between align-items-center" v-for="(list, index) in shoppingLists" v-bind:key="list.id" v-bind:class="{ \'bg-warning text-light\': list._id==shoppingList._id }">\n\t\t\t\t\t    <a>{{list.name}}</a>\n\t\t\t\t\t    <span>\n\t\t\t\t\t    <b-badge v-if="list.shared_with.length > 0" class="ml-3" variant="alert" pill title="Olet jakanut tämän listan"><i class="fas fa-share-square"></i></b-badge><b-badge v-if="list.items" variant="primary" pill>{{ list.items.length }}</b-badge>\n\t\t\t\t\t    </span>\n\t\t\t\t\t  </b-list-group-item>\n\t\t\t\t\t  <b-list-group-item v-on:click="chooseList( list._id )" class="d-flex justify-content-between align-items-center" v-for="(list, index) in sharedShoppingLists" v-bind:key="list.id" v-bind:class="{ \'bg-warning text-light\': list._id==shoppingList._id }">\n\t\t\t\t\t    <a>{{list.name}}</a>\n\t\t\t\t\t    <span>\n\t\t\t\t\t    <b-badge class="ml-3" variant="alert" pill title="Jaettu sinun kanssasi"><i class="fas fa-share-square fa-flip-horizontal"></i></b-badge><b-badge v-if="list.items" variant="primary" pill>{{ list.items.length }}</b-badge>\n\t\t\t\t\t    </span>\n\t\t\t\t\t  </b-list-group-item>\n\t\t\t\t\t</b-list-group>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<b-button v-if="!showNewListForm" class="float-right" size="sm" variant="success" v-on:click="toggleAddNewList" title="Lisää lista"><i class="fas fa-plus"></i></b-button>\n\t\t\t\t\t\t<b-input-group v-if="showNewListForm" class="mb-3" size="sm">\n\t\t\t\t\t\t\t<loading v-if="newListLoading" text="" v-bind:wrapper=true />\n\t\t\t\t\t\t\t<b-form-input placeholder="Listan nimi" v-model="newListName" v-on:keyup.enter="addNewList"></b-form-input>\n\t\t\t\t\t\t\t<b-input-group-append>\n\t\t\t\t\t\t\t\t<b-button size="sm" variant="success" v-on:click="addNewList" title="Tallenna"><i class="fas fa-check"></i></b-button>\n\t\t\t\t\t\t\t\t<b-button size="sm" variant="warning" v-on:click="toggleAddNewList" title="Peruuta"><i class="fas fa-undo"></i></b-button>\n\t\t\t\t\t\t\t</b-input-group-append>\n\t\t\t\t\t\t</b-input-group>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>'}),n("f9e3"),n("2dd8"),n("2b9d"),n("7f2c"),n("47f6");i["default"].use(u["a"]);var c=i["default"].component("shoppinglistapp",{data:function(){return{user:{username:"",email:"",lists:[],timer:null}}},created:function(){this.getUserData(),this.timer=setInterval(this.getUserData,1e4)},methods:{getUserData:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,l.a.get("/api/user/currentuser").then((function(t){e.user=t.data,i["default"].set(e.user,"lists",t.data.lists),i["default"].set(e.user,"shared_lists",t.data.shared_lists)})).catch((function(t){console.log(t)}));case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},beforeDestroy:function(){clearInterval(this.timer)},template:'\n\t\t<div class="container">\n            <div class="row">\n                <div class="col-sm-12">\n                \t<b-navbar class="mb-1 info-color" type="dark">\n                      <b-navbar-brand href="#">ListaAPP<sup>TM</sup></b-navbar-brand>\n                      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>\n                      <b-collapse id="nav-collapse" is-nav>\n                      \t<b-navbar-nav class="ml-auto">\n\t\t\t\t\t      \t<b-nav-item-dropdown right>\n\t\t\t\t\t      \t\t<template  v-if="user" v-slot:button-content>\n\t\t\t\t\t\t\t\t\t<i class="fas fa-user"></i> {{user.username}}\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<b-dropdown-item href="/logout">Kirjaudu ulos</b-dropdown-item>\n\t\t\t\t\t        </b-nav-item-dropdown>\n\t\t\t\t      \t</b-navbar-nav>\n                      </b-collapse>\n                    </b-navbar>\n                </div>\n              </div>  \n              \n              <shoppinglist v-bind:lists="user.lists" v-bind:shared_lists="user.shared_lists" />\n                \n            </div>\n        </div>\n\t'}),p=(n("b64b"),n("07ac"),i["default"].component("registrationForm",{data:function(){return{username:"",password:"",passwordConf:"",email:"",errors:[],errorFields:[],loading:!1,phase:"register"}},methods:{validateForm:function(){this.errors=[],this.errorFields=[];var t=this.username.trim(),e=this.password.trim(),n=this.passwordConf.trim(),i=this.email.trim();return""==t&&(this.errors.push({message:"Anna käyttäjänimi"}),this.errorFields.push("username")),""==i&&(this.errors.push({message:"Anna Sähköpostiosoite"}),this.errorFields.push("email")),""==e&&(this.errors.push({message:"Anna salasana"}),this.errorFields.push("password")),""==n?(this.errors.push({message:"Anna salasana uudelleen"}),this.errorFields.push("passwordConf")):e!=n&&(this.errors.push({message:"Salasanat eivät täsmää"}),this.errorFields.push("password"),this.errorFields.push("passwordConf")),0==this.errors.length},submitForm:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,s,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e,n.loading=!0,!n.validateForm()){t.next=22;break}return t.prev=3,t.next=6,fetch("/api/user/register",{method:"POST",body:JSON.stringify({username:n.username,password:n.password,email:n.email}),headers:{"Content-Type":"application/json"}});case 6:if(s=t.sent,400!=s.status){t.next=16;break}return t.next=10,s.json();case 10:a=t.sent,n.errorFields=Object.keys(a),r=Object.values(a),r.forEach((function(t,e){i["default"].set(n.errors,e,{message:t.message})})),t.next=17;break;case 16:n.phase="success";case 17:t.next=22;break;case 19:t.prev=19,t.t0=t["catch"](3),console.error(t.t0);case 22:n.loading=!1;case 23:case"end":return t.stop()}}),t,null,[[3,19]])})))()}},template:'\n\t\t<div class="d-flex align-items-center justify-content-center" style="height: 100vh">\n        \t<div class="flex-row">\n        \t\t<b-card header="Rekisteröidy" header-tag="h3" class="mx-3">\n        \t\t\t<errors v-bind:error=errors />\n        \t\t\t<loading v-if="loading" text="Lataa" v-bind:wrapper=true />\n\t\t\t\t    <b-form v-if="phase === \'register\'" v-on:submit.prevent="submitForm">\n\t\t\t\t    \t<b-form-row class="mb-sm-3"> \n\t\t\t\t    \t\t<div class="col-sm-6">\n\t\t\t\t\t    \t\t<b-input class="mb-2 mr-sm-2 mb-sm-0" v-bind:class="{ \'is-invalid\': errorFields.indexOf( \'username\' ) != -1}" placeholder="Käyttäjänimi*" v-model="username" ></b-input>\n\t\t\t\t    \t\t</div>\n\t\t\t\t    \t\t<div class="col-sm-6">\n\t\t\t\t\t    \t\t<b-input class="mb-2 mr-sm-2 mb-sm-0" v-bind:class="{ \'is-invalid\': errorFields.indexOf( \'email\' ) != -1}" placeholder="Sähköpostiosoite*" v-model="email" type="email" ></b-input>\n\t\t\t\t    \t\t</div>\n\t\t\t\t\t    </b-form-row> \n\t\t\t\t\t    <b-form-row class="mb-3">\n\t\t\t\t    \t\t<div class="col-sm-6">\n\t\t\t\t\t    \t\t<b-input class="mb-2 mr-sm-2 mb-sm-0" v-bind:class="{ \'is-invalid\': errorFields.indexOf( \'password\' ) != -1}" placeholder="Salasana*" type="password" v-model="password" ></b-input>\n\t\t\t\t    \t\t</div>\n\t\t\t\t    \t\t<div class="col-sm-6">\n\t\t\t\t    \t\t\t<b-input class="mb-2 mr-sm-2 mb-sm-0" v-bind:class="{ \'is-invalid\': errorFields.indexOf( \'passwordConf\' ) != -1}" placeholder="Salasana uudelleen*" type="password" v-model="passwordConf" ></b-input>\n\t\t\t    \t\t\t</div>\n\t\t\t\t\t    </b-form-row> \n\t\t\t\t\t    <b-form-row>\n\t\t\t\t    \t\t<div class="col">\n\t\t\t\t\t    \t\t<b-button class="float-right" variant="primary" type="submit">Rekisteröidy</b-button>\n\t\t\t\t\t    \t</div>\n\t\t\t\t    \t</b-form-row>\n\t\t\t\t  \t</b-form>\n\t\t\t\t  \t<success v-if="phase === \'success\'">\n\t\t\t\t  \t\t<template v-slot:message>\n\t\t\t\t\t    \t<h3>Tili luotu</h3><p>Voit nyt kirjautua.</p>\n\t\t\t\t\t  \t</template>\n\t\t\t\t  \t\t<template v-slot:link>\n\t\t\t\t  \t\t\t<b-button href="#" :to="{ name: \'login\'}" variant="info">Kirjautumiseen</b-button>\n\t\t\t\t\t  \t</template>\n\t\t\t\t  \t</success>\n\t\t  \t\t</b-card>\n        \t</div>\n    \t</div>\n\t'})),m={isLoggedIn:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l()({url:"/api/user/isloggedin",withCredentials:!0});case 2:return e=t.sent,t.abrupt("return","undefined"===typeof e.data.error);case 4:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()};i["default"].use(r["a"]);var h=new r["a"]({mode:"history",routes:[{path:"/login",name:"login",component:d},{path:"/register",name:"register",component:p},{path:"/",name:"index",component:c,beforeEnter:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e,n,i){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m.isLoggedIn();case 2:s=t.sent,s?i():i({path:"/login"});case 4:case"end":return t.stop()}}),t)})));function e(e,n,i){return t.apply(this,arguments)}return e}()}]}),f=h,v=n("9483");Object(v["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}}),i["default"].config.productionTip=!1,new i["default"]({router:f,render:function(t){return t(s)}}).$mount("#shoppinglist-app")},"7f2c":function(t,e,n){}});
//# sourceMappingURL=app.e76e3a27.js.map