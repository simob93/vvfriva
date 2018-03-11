Ext.define('vvf.view.protocolli.store.Province', {
    extend: 'Ext.data.Store',
    alias: 'store.province',
    fields: [
       {name: 'id'},
       {name: 'nome'},
       {name: 'sigla'}
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva2/ws/general/province/list',
        api: {
           read: '/vvfriva2/ws/general/province/list'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
