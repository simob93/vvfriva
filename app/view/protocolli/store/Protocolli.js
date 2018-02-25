Ext.define('vvf.view.protocolli.store.Protocolli', {
    extend: 'Ext.data.Store',
    alias: 'store.protocolli',
    pageSize: 50,
    fields: [
       {name: 'id'},
       {name: 'data'},
       {name: 'anno'},
       {name: 'numero'},
       {name: 'dataProtocollo'},
       {name: 'numProtocollo'},
       {name: 'dataMittente'},
       {name: 'descrFaldone'},
       {name: 'numFaldone'},
       {name: 'oggetto'},
       {name: 'tipologia'},
       {name: 'entePro'},
       {name: 'ragioneSociale'},
       {name: 'indirizzo'},
       {name: 'cap'},
       {name: 'citta'},
       {name: 'provincia'},
       {name: 'nazione'}
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva/ws/protocolli/list',
        api: {
            read: '/vvfriva/ws/protocolli/list',
            create: '/vvfriva/ws/protocolli/save',
            destroy: '/vvfriva/ws/protocolli/delete',
            update: '/vvfriva/ws/protocolli/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
