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
        url: '/vvfriva/ws/vigili/list',
        api: {
            read: '/vvfriva/ws/vigili/list',
            create: '/vvfriva/ws/vigili/save',
            destroy: '/vvfriva/ws/vigili/delete',
            update: '/vvfriva/ws/vigili/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
