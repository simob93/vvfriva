Ext.define('vvf.view.protocolli.store.Faldoni', {
    extend: 'Ext.data.Store',
    alias: 'store.faldoni',
    fields: [
       {name: 'id'},
       {name: 'extra'},
       {name: 'numero'},
       {name: 'tmp', convert:(value, record) => record.get('numero') + " - " + record.get('descrizione')},
       
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva2/ws/faldoni/list',
        api: {
            read: '/vvfriva2/ws/faldoni/list',
            create: '/vvfriva2/ws/faldoni/save',
            destroy: '/vvfriva2/ws/faldoni/delete',
            update: '/vvfriva2/ws/faldoni/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
            }
    },
    autoLoad: false,
    autoDestroy: true,

});
