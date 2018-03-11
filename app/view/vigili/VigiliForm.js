
Ext.define('vvf.view.vigili.VigiliForm',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.vigili.VigiliFormController',
        'vvf.componenti.CustomButton',
        'vvf.view.vigili.store.Grado',
        'vvf.view.vigili.store.Squadre',
        'vvf.view.vigili.VigiliForm',
        'vvf.componenti.Avatar'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,
    controller: 'vigiliform',
   
    items: [
        {
            xtype: 'form',
            reference: 'Form',
            trackResetOnLoad: true,
            fieldDefaults: {
                margin: '12 0 0 3'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'id',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nome',
                            allowBlank: false,
                            name: 'nome'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cognome',
                            allowBlank: false,
                            name: 'cognome'
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
                            fieldLabel: 'Data di nascita',
                            format: 'd/m/Y',
                            allowBlank: false,
                            name: 'dataNascita'
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
                            xtype: 'checkboxfield',
                            boxLabel: 'Caposquadra',
                            inputValue: '1',
                            uncheckedValue: '0',
                            name: 'capoSquadra',
                            listeners: {
                            	change: 'changeCheckCs'
                            }
                            
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
                            reference: 'CboxGrado',
                            store: {
                                type: 'grado'
                            },
                            fieldLabel: 'Grado',
                            allowBlank: false,
                            editable: false,
                            displayField: 'valore',
                            valueField: 'codice',
                            name: 'grado'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Qualifica',
                            name: 'qualifica'
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
                            reference: 'CboxSquadre',
                            store: {
                                type: 'squadre'
                            },
                            fieldLabel: 'Squadra',
                            displayField: 'valore',
                            valueField: 'codice',
                            name: 'idSquadra',
                            listeners: {
                                change: 'changeCboxSquadre'
                            }
                        },
                        {
                            xtype: 'textfield',
                            reference: 'TextLetteraVigile',
                            readOnly: true,
                            fieldLabel: 'Lettera vigile',
                            name: 'letteraVigile'
                        
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
                            labelAlign: 'top',
                            fieldLabel: 'Note',
                            name: 'note'
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
