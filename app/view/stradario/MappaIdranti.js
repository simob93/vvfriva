Ext.define('vvf.view.stradario.MappaIdranti',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.stradario.MappaIdrantiController',
        'vvf.view.stradario.store.Idranti'
    ],

    controller: 'mappaidrantiController',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
    		xtype: 'container',
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		height: 150,
    		items: [
    			{
    	    		xtype: 'container',
    	    		reference: 'BoxAddress',
    	    		layout: {
    	    			type: 'vbox',
    	    			align: 'stretch',
    	    		},
    	    		margin: '5 5 0 5',
    	    		width: 300,
    	    		cls: 'shadow',
    	    		style: {
    	    			background: '#fff',
    	    		},
    	    		items: [
    	    			{
    	    				xtype: 'container',
    	    				layout: {
    	    					type: 'vbox',
    	    					pack: 'center'
    	    				},
    	    				height: 30,
    	    				style: {
    	    					background: '#b71c1c',
    	    					color: '#fff',
    	    					fontSize: '16px'
    	    				},
    	    				items: [
    	    					{
    	    						xtype: 'label',
    	    						margin: '0 0 0 3',
    	    						html: 'Ricerca percorso'
    	    					}
    	    				]
    	    			},
    	    			{
    	    				xtype: 'container',
    	    				padding: 8,
    	    				reference: 'CntSearch',
    	    				emptyText: 'Search Box',
    	    				html: '<input style="height: 30px; width: 100%" id="pac-input" class="controls" type="text"/>'
    	    			},
    	    			{
    	    				xtype: 'container',
    	    				margin: '3 0 0 8',
    	    				layout: {
    	    					type: 'hbox'
    	    				},
    	    				items: [
    	    					{
    	    	    				xtype: 'checkboxfield',
    	    	    				reference: 'CkbIdranti',
    	    	    				boxLabel: 'Idranti',
    	    	    			},
    	    	    			{
    	    	    				xtype: 'checkbox',
    	    	    				margin: '0 0 0 5',
    	    	    				boxLabel: 'Percorso',
    	    	    				reference: 'CkbPercorso',
    	    	    			}
    	    				]
    	    			},
    	    			{
    	    				xtype: 'container',
    	    				margin: '0 5 5 0',
    	    				layout: {
    	    					type: 'vbox',
    	    					align: 'bottom'
    	    				},
    	    				flex: 1,
    	    				items: [
    	    					{
    	    						xtype: 'button',
    	    						text: 'Trova',
    	    						handler: 'clickBtnFind'
    	    					}
    	    				]
    	    			}
    	    		]
    	    	}
    		]
    	},
    	{
    		xtype: 'gmappanel',
    		reference:  'Map',
    		flex: 1,
            gmapType: 'map',
            center: {
                geoCodeAddr: "Viale Rovereto, 19, 38066 Riva del Garda TN",
                marker: {
                    title: 'Caserma'
                },
                
            },
            mapOptions : {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 16,
            }
    	}
    ]
});
