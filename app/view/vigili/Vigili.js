
Ext.define('vvf.view.vigili.Vigili',{
    extend: 'Ext.panel.Panel',

    requires: [
        'vvf.view.vigili.VigiliController',
        'vvf.view.vigili.store.Vigili',
        'vvf.componenti.Avatar',
        'vvf.view.vigili.VigiliForm',
        'vvf.componenti.StdWin'
    ],
    controller: 'vigili',

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
                type: 'vigili'
            },
            title: 'Elenco vigili',
            //scrollable: true,
            flex: 1,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nome',
                    flex: 1,
                    text: 'Nominativo',
                    renderer: function(value, metaData, record) {
                        return value + ' ' + record.get('cognome')
                    }
                },
                {
                    xtype: 'datecolumn',
                    format: 'd/m/Y',
                    dataIndex: 'dataNascita',
                    width: 118,
                    text: 'Data di nascita'
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    dataIndex: 'grado',
                    text: 'Grado',
                    renderer: function(value, metaData, record) {
                        if (Ext.isEmpty(value))
                            return '';

                        let id = 'grado-' + Ext.id(),
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
                    dataIndex: 'qualifica',
                    text: 'Qualifica',
                    width: 150,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'patente',
                    text: 'Patente'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cercaPersone',
                    text: 'Cerc. P'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'note',
                    flex: 1,
                    text: 'Note',
                    width: 300,
                },
            ],
            dockedItems: [{
                xtype: 'toolbar',
                ui: 'footer',
                dock: 'top',
                items: [
                    {
                        xtype: 'textfield',
                        emptyText: 'Ricerca per nominativo...',
                        listeners: {
                            change: 'changeCerca'
                        }
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'CkbNonAttivi',
                        boxLabel: 'Visualizza non attivi',
                        listeners: {
                            change: 'changeCkbNonAttivi'
                        }
                    },
                    {
                        xtype: 'tbseparator',
                       
                    },
                    {
                        xtype: 'label',
                        html: 'Totale vigili:'
                    },
                    {
                        xtype: 'label',
                        reference: 'LblTotaleVigili'
                    },
                    {
                        xtype: 'label',
                        html: 'Vigili in attesa:'
                    },
                    {
                        xtype: 'label',
                        reference: 'LblVigiliAttesa'
                    },
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        cls: 'no-background',
                        iconCls: 'icon-add ',
                        handler: 'creaWin',
                        scale: 'medium'
                    },
                    {
                        xtype: 'button',
                        cls: 'no-background',
                        iconCls: 'icon-delete',
                        handler: 'clickBtnElimina',
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
