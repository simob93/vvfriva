Ext.define('vvf.componenti.FloatingPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.floatingPanel',
    alternateClassName: 'floatingPanel',
    padding: 4,
    modal: true,
    floating: true,
    width: 300,
    shadow: false,
    style: {
        //background: '#fff',
    },
    layout: 'fit',
    items: [
    	{
    		xtype: 'container',
    		flex:1,
    		layout: {
    			type: 'vbox',
    			align: 'middle',
    			pack: 'center'
    		},
    		items: [
    			{
    				xtype: 'image',
    				src: 'resources/images/loading.svg'
    			}
    		]
    	}
    ],
    bodyPadding: 6,
	initComponent: function( config ) {
        this.callParent();
	}
});