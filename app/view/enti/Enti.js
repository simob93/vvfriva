
Ext.define('vvf.view.enti.Enti',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.enti.EntiController',
        'vvf.view.protocolli.store.Enti'
    ],

    controller: 'enti',

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
                type: 'enti'
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
                    dataIndex: 'descrizione',
                    text: 'Descrizione',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
            ],
            plugins: [{
                ptype: 'rowediting',
                clicksToMoveEditor: 2,
               
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
