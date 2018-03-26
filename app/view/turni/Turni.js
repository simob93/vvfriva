
Ext.define('vvf.view.turni.Turni',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.turni.TurniController',
        'vvf.view.turni.store.Turni',
        'vvf.componenti.StdWin'
    ],

    controller: 'turni',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,

    items: [
        {
        	xtype: 'container',
        	margin: '4 0 0 0',
        	layout: {
        		type: 'hbox',
        		align: 'stretch',
        		pack: 'center'
        	},
        	//padding: 6,
        	items: [
//        		{
//        			xtype: 'panel',
//        			hidden: true,
//        			width: 300,
//        			reference: 'BoxInfo',
//        			cls: 'shadow animated slideInLeft',
//        			layout: {
//        				type: 'vbox',
//        				align: 'middle',
//        				pack: 'center'
//        			},
//        			bodyStyle: {
//        				background: '#FFB74D',
//        				color: '#fff',
//        				textAlign: 'center',
//        			    fontSize: '15px;'
//        			}
//        		},
        	]
        },
        {
        	xtype: 'gridpanel',
        	margin: '10 0 0 0',
        	flex: 1,
        	disableSelection: true,
        	header: false,
        	//hideHeaders: true,
        	//rowLines: false,
        	store: {
        		type: 'turni'
        	},
        	reference: 'Grid',
        	columns: [
        		{
        			text: 'Turno',
        			dataIndex: 'giorno',
        			width: 160,
        			renderer: function(value, metaData, record) {
        				metaData.tdStyle = 'font-weight: bold; font-style: italic; text-decoration: underline;'
        				//return Standard.renderCellCalendar(value);
        				return value;
        			} 
        		},
        		{
        			xtyp: 'gridcolumn',
        			width: 160,
        			text: 'Data',
        			dataIndex: 'dataTurno',
        			renderer: function(value, metaData, record) {
        				return value;
        			} 
        		},
        		{
        			text: 'Nominativo',
        			width: 200,
        			dataIndex: 'nominativoVigile',
        			renderer: function(value, metaData, record) {
        				return value;
        			} 
        		},
        		{
        			text: 'Patente',
        			dataIndex: 'patente',
        			renderer: function(value, metaData, record) {
        				return value;
        			}
        		},
        		{
        			text: 'Note',
        			flex: 1,
        			dataIndex: 'note',
        			renderer: function(value, metaData, record) {
        				value = '';
        				return value;
        			}
        		}
        	],
        	tbar: [
        		'->',
        		{
					xtype: 'button',
					margin: '0 0 0 17',
					cls: 'no-background',
					iconCls: 'icon-print',
					scale: 'medium',
					tooltip: 'stampa turnario',
					handler: 'winFiltri'
				}
        	],
        	viewConfig: {
        		loadMask: false,
        		getRowClass: function(record, rowIndex, rowParams, store){
        	        return 'row-height-70'
        	    }
        	}
        }
    ]
});
