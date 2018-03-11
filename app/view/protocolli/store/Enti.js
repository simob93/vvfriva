Ext.define('vvf.view.protocolli.store.Enti', {
    extend: 'Ext.data.Store',
    alias: 'store.enti',
    fields: [
       {name: 'id'},
       {name: 'extra'},
       {name: 'numero'},
       {name: 'descrizione'},
       
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva2/ws/enti/list',
        api: {
            read: '/vvfriva2/ws/enti/list',
            create: '/vvfriva2/ws/enti/save',
            destroy: '/vvfriva2/ws/enti/delete',
            update: '/vvfriva2/ws/enti/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
