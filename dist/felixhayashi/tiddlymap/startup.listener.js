/*\

title: $:/plugins/felixhayashi/tiddlymap/startup/listener.js
type: application/javascript
module-type: startup

@preserve

\*/
(function(){"use strict";exports.name="tmap.listener";exports.platforms=["browser"];exports.after=["rootwidget","tmap.caretaker"];exports.before=["story"];exports.synchronous=true;var e=require("$:/plugins/felixhayashi/tiddlymap/utils.js").utils;var t=require("$:/plugins/felixhayashi/tiddlymap/edgetype.js").EdgeType;var a=function(){this.adapter=$tw.tmap.adapter;this.wiki=$tw.wiki;this.logger=$tw.tmap.logger;this.opt=$tw.tmap.opt;e.addListeners({"tmap:tm-remove-edge":this.handleRemoveEdge,"tmap:tm-fill-edge-type-form":this.handleFillEdgeTypeForm,"tmap:tm-save-edge-type-form":this.handleSaveEdgeTypeForm,"tmap:tm-create-edge-type":this.handleCreateEdgeType,"tmap:tm-create-edge":this.handleCreateEdge,"tmap:tm-suppress-dialog":this.handleSuppressDialog,"tmap:tm-generate-widget":this.handleGenerateWidget},$tw.rootWidget,this)};a.prototype.handleSuppressDialog=function(t){if(e.isTrue(t.paramObject.suppress,false)){e.setEntry(this.opt.ref.sysUserConf,"suppressedDialogs."+t.paramObject.dialog,true)}};a.prototype.handleGenerateWidget=function(e){if(!e.paramObject)e.paramObject={};var t={dialog:{buttons:"ok",preselects:{view:e.paramObject.view||"Default"}}};$tw.tmap.dialogManager.open("getWidgetCode",t)};a.prototype.handleRemoveEdge=function(e){this.adapter.deleteEdge(e.paramObject)};a.prototype.handleCreateEdge=function(e){var t={from:this.adapter.makeNode(e.paramObject.from).id,to:this.adapter.makeNode(e.paramObject.to).id,type:e.paramObject.label};this.adapter.insertEdge(t);$tw.tmap.notify("Edge inserted")};a.prototype.handleSaveEdgeTypeForm=function(a){var i=e.getTiddler(a.paramObject.output);var p=new t(i.fields.id);if(e.isTrue(i.fields["temp.deleteType"],false)){this.logger("debug","Deleting type",p);this.adapter._processEdgesWithType(p,{action:"delete"});this.wiki.addTiddler(new $tw.Tiddler({title:a.paramObject.output}));$tw.tmap.notify("Deleted type")}else{p.loadDataFromTiddler(i);p.persist();if(!i.fields["temp.newId"]){e.setField(i,"temp.newId",i.fields["id"])}else if(i.fields["temp.newId"]!==i.fields["id"]){this.adapter._processEdgesWithType(p,{action:"rename",newName:i.fields["temp.newId"]});e.setField(i,"id",i.fields["temp.newId"])}$tw.tmap.notify("Saved type data")}};a.prototype.handleFillEdgeTypeForm=function(a){var i=new t(a.paramObject.id);var p=a.paramObject.output;i.persist(p,true);var r=e.startsWith(i.getId(),"tmap:")?"true":"";e.setField(p,"temp.idImmutable",r);e.setField(p,"temp.newId",i.getId());e.deleteByPrefix("$:/state/tabs/edgeTypeManager")};a.prototype.handleCreateEdgeType=function(a){var i=this.wiki.generateNewTitle(this.opt.path.edgeTypes+"/New Type");var p=new t(e.getBasename(i));p.persist();this.handleFillEdgeTypeForm({paramObject:{id:p.getId(),output:a.paramObject.output}})};exports.startup=function(){new a}})();