Ext.define('vvf.view.archivi.Archivi',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.archivi.ArchiviController',
        'vvf.view.protocolli.store.Faldoni'
    ],

    controller: 'archivi',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,
    
    items: [
        {
            xtype: 'gridpanel',
            reference: 'Grid',
            store: {
                type: 'faldoni'
            },
            flex: 1,
            //scrollable: true,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'numero',
                    text: 'Numero',
                    width: 100,
                    editor: {
                        xtype: 'textfield',
                        name: 'numero',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'descrizione',
                    text: 'Descrizione',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        name: 'descrizione',
                        allowBlank: false
                    }
                }
            ],
            plugins: [{
                ptype: 'rowediting', 
                errorSummary: false,
            }],
            dockedItems: [{
                xtype: 'toolbar',
                ui: 'footer',
                dock: 'top',
                items: [
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        cls: 'no-background',
                        iconCls: 'icon-add',
                        scale: 'medium',
                        handler: 'addRecord'
                    },
                    {
                        xtype: 'button',
                        reference: 'BtnElimina',
                        cls: 'no-background',
                        iconCls: 'icon-delete',
                        scale: 'medium',
                        handler: 'deleteRecord'
                    }
                ]
            }],
            listeners: {
                edit: 'editGrid',
                canceledit: 'canceleditGrid',
                validateedit: 'validateeditGrid'
            }
        }
    ]
});
