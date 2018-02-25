Ext.define('vvf.view.protocolli.store.Comuni', {
    extend: 'Ext.data.Store',
    alias: 'store.comuni',
    fields: [
       {name: 'id'},
       {name: 'nome'},
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva/ws/general/comuni/list',
        api: {
           read: '/vvfriva/ws/general/comuni/list'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    },
    autoLoad: false,
    autoDestroy: true

});
