Ext.define('vvf.view.rubrica.store.Rubrica', {
    extend: 'Ext.data.Store',
    alias: 'store.rubrica',
    fields: [
       {name: 'id'},
       {name: 'nome'},
       {name: 'telefono'},
       {name: 'evento'},
       
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva2/ws/rubrica/list',
        api: {
            read: '/vvfriva2/ws/rubrica/list',
            create: '/vvfriva2/ws/rubrica/save',
            destroy: '/vvfriva2/ws/rubrica/delete',
            update: '/vvfriva2/ws/rubrica/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
