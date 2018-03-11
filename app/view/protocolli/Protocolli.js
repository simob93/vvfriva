
Ext.define('vvf.view.protocolli.Protocolli',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.protocolli.ProtocolliController',
        'vvf.view.protocolli.store.Protocolli',
        'vvf.view.archivi.Archivi',
        'vvf.view.enti.Enti',
        'vvf.view.protocolli.ProtocolliForm'
    ],

    controller: 'protocolli',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,
    margin: '5 0 0 0',
    
    items: [
        {
            xtype: 'gridpanel',
            reference: 'Grid',
            store: {
                type: 'protocolli'
            },
            title: 'Gestione protocolli',
            flex: 1,
            scrollable: true,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'tipo',
                    text: 'Tipo',
                    width: 52,
                    renderer: function(value, metaData, record) {
                    	 let id = 'prot-' + Ext.id(),
                         avatar = this.lookupController().creaAvatar(value),
                         str = `<div id="${id}"></div>`;
                 
	                     Ext.defer(() =>{
	                     	let el = Ext.get(id);
	                     	if (el)
	                     		avatar.render(el, id);                            
	                     }, 50)
	                     return str
                                               
                        
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'numero',
                    text: 'Numero',
                    width: 100,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'oggetto',
                    text: 'Oggettto',
                    flex: 1
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            },
            dockedItems: [{
                xtype: 'toolbar',
                ui: 'footer',
                dock: 'top',
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'TxtSearch',
                        emptyText: 'Ricerca per oggetto...'
                    },
                    {
                        xtype: 'button',
                        text: 'Trova',
                        handler: 'clickBtnFind'
                    },
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        width: 100,
                        text: 'Archivio',
                        handler: 'creaWinArchivi'
                    },
                    {
                        xtype: 'button',
                        width: 100,
                        text: 'Enti',
                        handler: 'creaWinEnti'
                    },
                    {
                        xtype: 'button',
                        cls: 'no-background',
                        iconCls: 'icon-add',
                        handler: 'creaWin',
                        scale: 'medium'
                    },
                    {
                        xtype: 'button',
                        reference: 'BtnElimina',
                        cls: 'no-background',
                        iconCls: 'icon-delete',
                        handler: 'clickBtnElimina',
                        scale: 'medium'
                    }
                ]
            }],
            listeners: {
                itemdblclick: 'itemdblclickGrid',
                selectionchange: 'selectionchangeGrid'
            }
        }
    ]
    
});
