Ext.define('vvf.view.protocolli.store.Faldoni', {
    extend: 'Ext.data.Store',
    alias: 'store.faldoni',
    fields: [
       {name: 'id'},
       {name: 'extra'},
       {name: 'numero'},
       
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva/ws/faldoni/list',
        api: {
            read: '/vvfriva/ws/faldoni/list',
            create: '/vvfriva/ws/faldoni/save',
            destroy: '/vvfriva/ws/faldoni/delete',
            update: '/vvfriva/ws/faldoni/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
            }
    },
    autoLoad: false,
    autoDestroy: true,

});
