Ext.define('vvf.view.vigili.store.Squadre', {
    extend: 'Ext.data.Store',
    alias: 'store.squadre',
    fields: [
       {name: 'id'},
       {name: 'ordine'}
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva/ws/squadre/list',
        api: {
            read: '/vvfriva/ws/squadre/list',
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true

});
