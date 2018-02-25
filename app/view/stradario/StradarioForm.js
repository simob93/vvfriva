
Ext.define('vvf.view.stradario.StradarioForm',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.stradario.StradarioFormController',
    ],

    controller: 'stradarioform',
   
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,

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
                    xtype: 'textfield',
                    fieldLabel: 'Indirizzo',
                    name: 'nome'
                },
                {
                    xtype: 'textarea',
                    flex: 1,
                    fieldLabel: 'Percorso',
                    name: 'percorso'
                },
                {
                    xtype: 'textarea',
                    flex: 1,
                    fieldLabel: 'Idrante',
                    name: 'idrante'
                }
            ],
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
