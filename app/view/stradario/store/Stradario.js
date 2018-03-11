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
        url: '/vvfriva2/ws/coordinate/list',
        api: {
            read: '/vvfriva2/ws/coordinate/list',
            
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
