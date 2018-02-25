Ext.define('vvf.view.stradario.store.Stradario', {
    extend: 'Ext.data.Store',
    alias: 'store.stradario',
    fields: [
       {name: 'id'},
       {name: 'nome'},
       {name: 'percorso'},
       {name: 'idrante'},
       
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva/ws/strade/list',
        api: {
            read: '/vvfriva/ws/strade/list',
            create: '/vvfriva/ws/strade/save',
            destroy: '/vvfriva/ws/strade/delete',
            update: '/vvfriva/ws/strade/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
