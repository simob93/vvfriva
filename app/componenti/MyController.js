Ext.define('vvf.componenti.MyController', {
	alias: 'widget.MyController',
	extend: 'Ext.app.ViewController',
	init: function( config ) {
		if (Ext.isDefined(config.vvfConfig)) {
			this.vvfConfig = config.vvfConfig;
		} else {
			this.vvfConfig = {};
		}
		this.launch();
	},
	initComponent: function() {
		this.callParent();
	}
});