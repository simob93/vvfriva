
Ext.define('vvf.view.rubrica.Rubrica',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.rubrica.RubricaController',
        'vvf.view.rubrica.store.Rubrica'
    ],

    controller: 'rubrica',

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
                type: 'rubrica'
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
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Telefono',
                    dataIndex: 'telefono',
                    width: 170,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Evento',
                    dataIndex: 'evento',
                    width: 370,
                    editor: {
                        xtype: 'textarea',
                        allowBlank: false
                    }
                }
            ],
            plugins: [{
                ptype: 'rowediting',               
            }],
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
                        scale: 'medium',
                        handler: 'deleteRecord',
                      
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
