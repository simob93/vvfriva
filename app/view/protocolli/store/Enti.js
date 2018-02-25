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
        url: '/vvfriva/ws/enti/list',
        api: {
            read: '/vvfriva/ws/enti/list',
            create: '/vvfriva/ws/enti/save',
            destroy: '/vvfriva/ws/enti/delete',
            update: '/vvfriva/ws/enti/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
