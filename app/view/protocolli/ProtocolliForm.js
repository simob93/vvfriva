
Ext.define('vvf.view.protocolli.ProtocolliForm',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.protocolli.ProtocolliFormController',
        'vvf.view.protocolli.store.Comuni',
        'vvf.view.protocolli.store.Province',
        'vvf.view.protocolli.store.Faldoni',
        'vvf.view.protocolli.store.Enti'
    ],

    controller: 'protocolliform',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,
    items: [
        {
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            trackResetOnLoad: false,
            reference: 'Form',
            defaults: {
                margin: '4 0 0 0'
            },
            fieldDefaults: {
                margin: '0 0 0 6',
                //width: 320,
            },
            items: [
            	{
            		xtype: 'fieldset',
                	fieldDefaults: {
                		margin: '5 0 0 5'
                	},
                	padding: 6,
                	items: [
                		{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'id',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'numero',
                                    hidden: true
                                },
                                {
                                    xtype: 'datefield',
                                    reference: 'DataReg',
                                    fieldLabel: 'Data reg',
                                    format: 'd/m/Y',
                                    name: 'data',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'combobox',
                                    queryMode: 'local',
                                    reference: 'CboxTipologia',
                                    displayField: 'valore',
                                    valueField: 'codice',
                                    fieldLabel: 'Tipo',
                                    name: 'tipo',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    format: 'd/m/Y',
                                    fieldLabel: 'Data protocollo',
                                    name: 'dataProtocollo'
                                },
                                {
                                    xtype: 'combobox',
                                    width: 400,
                                    reference: 'CboxFaldoni',
                                    store: {
                                        type: 'faldoni'
                                    },
                                    queryMode: 'local',
                                    displayField: 'tmp',
                                    valueField: 'id',
                                    fieldLabel: 'Faldone',
                                    name: 'idFaldone',
                                    allowBlank: false,
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                            	{
                                    xtype: 'datefield',
                                    format: 'd/m/Y',
                                    fieldLabel: 'Data prot Mitt',
                                    name: 'dataMittente'
                                },
                                {
                                    xtype: 'combobox',
                                    queryMode: 'local',
                                    width: 400,
                                    store: {
                                        type: 'enti'
                                    },
                                    reference: 'CboxEnti',
                                    displayField: 'descrizione',
                                    valueField: 'id',
                                    fieldLabel: 'Ente',
                                    name: 'idEnte',
                                    allowBlank: false,
                                }
                            ]
                        },
                        {
                        	xtype: 'combobox',
                        	fieldLabel: 'Tipologia',
                        	displayField: 'value',
                        	valueField: 'key',
                        	name: 'tipologia',
                        	allowBlank: false,
                        	store: Ext.create('Ext.data.Store',{
                    			fields: ['key', 'value'],
                    	        data: [
                    	            [1 ,'Fax'],
                    	            [2 ,'Lettera'],
                    	            [3 ,'Circolare'],
                    	            [4 ,'Raccomandata'],
                    	            [5 ,'Modulo'],
                    	            [6 ,'Allegato'],
                    	            [7 ,'Email'],
                    	            [8 ,'Depliant'],
                    	            [9 ,'Telegramma'],
                    				[10 ,'Cartolina'],
                    				[11 ,'Invito'],
                    				[12 ,'Espresso'],
                    				[13 ,'Varie'],
                    				[14 ,'Verbale'],
                    				[15 ,'Fascicolo'],
                    				[16 ,'Tabella']
                    	        ]
                    		})
                        }
                	]
            	},
                {
                	xtype: 'fieldset',
                	padding: 6,
                	flex: 1,
                	layout: {
                		type: 'vbox',
                		align: 'stretch'
                	},
                	fieldDefaults: {
                		margin: '5 0 0 5'
                	},
                	items: [
                		{
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ragione soc',
                                    name: 'ragioneSociale'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Indirizzo',
                                    name: 'indirizzo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    //labelWidth: 40,
                                    //width: 90,
                                    fieldLabel: 'Cap',
                                    name: 'cap'
                                },
                                {
                                    xtype: 'combobox',
                                    queryMode: 'local',
                                    reference: 'CboxComuni',
                                    store: {
                                        type: 'comuni'
                                    },
                                    displayField: 'nome',
                                    valueField: 'id',
                                    fieldLabel: 'Città',
                                    name: 'citta'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    queryMode: 'local',
                                    reference: 'CboxProvince',
                                    store: {
                                        type: 'province'
                                    },
                                    displayField: 'nome',
                                    valueField: 'id',
                                    fieldLabel: 'Provincia',
                                    name: 'provincia'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textarea',
                                    flex: 1,
                                    allowBlank: false,
                                    labelAlign: 'top',
                                    fieldLabel: 'Oggetto',
                                    name: 'oggetto'
                                }
                            ]
                        }
            		]
                }
            ],
            listeners: {
            	dirtychange: 'dirtyChangeForm'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            reference: 'CntBottoni'
                        }
                    ]
                }
            ]
        }
    ]
});
