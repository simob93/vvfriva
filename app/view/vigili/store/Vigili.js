Ext.define('vvf.view.vigili.store.Vigili', {
    extend: 'Ext.data.Store',
    alias: 'store.vigili',
    fields: [
       {name: 'id'},
       {name: 'nome'},
       {name: 'cognome'},
       {name: 'dataNascita', type: 'date'},
       {name: 'grado'},
       {name: 'qualifica'},
       {name: 'cercaPersone'}
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva2/ws/vigili/list',
        api: {
            read: '/vvfriva2/ws/vigili/list',
            create: '/vvfriva2/ws/vigili/save',
            destroy: '/vvfriva2/ws/vigili/delete',
            update: '/vvfriva2/ws/vigili/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
