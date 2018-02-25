
Ext.define('vvf.view.menu.Menu',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.menu.MenuController',
        'vvf.view.menu.store.Menu'
    ],

    controller: 'menu',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            cls: 'menu',
            shadow: true,
            padding: 6,
            margin: '3 0 0 0',
            reference: 'CntMenu', 
            height: 70,
            items: [
                {
                    xtype: 'image',
                    width: 32,
                    height: 32,
                    margin: '0 10 0 0 ',
                    src: 'resources/images/fiamma.svg'
                },
                {
                    xtype: 'label',
                    html: 'Portale del vigile del fuoco',
                    style: {
                        color: '#ef5350',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            padding: 8,
            margin: '3 0 0 0',
            items: [
                {
                    xtype: 'tabpanel',
                    plain: true,
                    hidden: true,
                    flex: 1,
                    reference: 'TabMenu',
                    defaults: {
                        closable: true
                    }
                },
                {
                	xtyp: 'container',
                	flex: 1,
                	reference: 'ShortMenu',
                	layout: {
                		type: 'hbox',
                		align: 'middle',
                		pack: 'center'
                	},
                	items: [
                		{
                			xtype: 'container',
                			margin: '5 0 5 0',
                			layout: {
                				type: 'vbox',
                				align: 'middle',
                				pack: 'center'
                			},
                			width: 500,
                			height: 500,
                			cls: 'shadow',
                			style: {
                				cursor: 'pointer'
                			},
                			items:[
                				{
                        			xtype: 'image',
                        			width: 400,
                        			height: 500,
                        			src: 'resources/images/phone_red.svg',
                        		},
                			]
                		},
                		{
                			xtype: 'container',
                			margin: '5 0 5 5',
                			layout: {
                				type: 'vbox',
                				align: 'middle',
                				pack: 'center'
                			},
                			width: 500,
                			height: 500,
                			cls: 'shadow',
                			style: {
                				cursor: 'pointer'
                			},
                			items:[
                        		{
                        			xtype: 'image',
                        			width: 300,
                        			height: 400,
                        			src: 'resources/images/calendar_red.svg',
                        		}
                			]
                		}
                		
                	]
                }
            ]
        },

    ]
});
