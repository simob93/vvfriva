Ext.override(Ext.grid.column.Column, {
	align: 'start',
	initComponent: function () {
		this.callParent(arguments);	
     }
 });

Ext.override(Ext.grid.Panel, {
	viewConfig: {
		loadMask: false
	},
	initComponent: function () {
		this.callParent(arguments);	
     }
 });


 Ext.override(Ext.grid.RowEditor, {
	autoCancel: false,
	saveBtnText: 'Conferma',
	cancelBtnText: 'Ripristina',
	errorSummary: false,
	
	initComponent: function () {
		this.callParent(arguments);	
     }
 });
