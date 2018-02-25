
Ext.define('vvf.view.stradario.Stradario',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.stradario.StradarioController',
        'vvf.view.stradario.store.Stradario',
        'vvf.view.stradario.StradarioForm'
    ],

    controller: 'stradario',

    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,
    items: [
        {
            xtype: 'gridpanel',
            reference: 'Grid',
            title: 'Elenco telefonico',
            flex: 1,
            store: {
                type: 'stradario'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Nome',
                    dataIndex: 'nome',
                    width: 200
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Percorso',
                    dataIndex: 'percorso',
                    flex: 1,
                    //width: 170,
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Idrante',
                    hidden: true,
                    dataIndex: 'idrante',
                    flex: 1
                }
            ],
            dockedItems: [{
                xtype: 'toolbar',
                ui: 'footer',
                dock: 'top',
                items: [
                    {
                        xtype: 'textfield',
                        emptyText: 'Ricerca...',
                        listeners: {
                            change: 'changeCerca'
                        }
                    },
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        cls: 'no-background',
                        iconCls: 'icon-add',
                        handler: 'addRecord',
                        scale: 'medium'
                    },
                    {
                        xtype: 'button',
                        reference: 'BtnElimina',
                        cls: 'no-background',
                        iconCls: 'icon-delete',
                        handler: 'deleteRecord',
                        scale: 'medium'
                    }
                ]
            }],
            listeners: {
                itemdblclick: 'itemdblclickGrid'
            }
        }
    ]
});
