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
        url: '/vvfriva/ws/rubrica/list',
        api: {
            read: '/vvfriva/ws/rubrica/list',
            create: '/vvfriva/ws/rubrica/save',
            destroy: '/vvfriva/ws/rubrica/delete',
            update: '/vvfriva/ws/rubrica/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
