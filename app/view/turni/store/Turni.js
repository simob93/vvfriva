Ext.define('vvf.view.turni.store.Turni', {
    extend: 'Ext.data.Store',
    alias: 'store.turni',
    fields: [
       {name: 'nominativo'},
       {name: 'dataTurno'},
       {name: 'turno'},
       {name: 'numeroSquadra'}
    ],
    proxy: {
        type: 'ajax',
        url: '/vvfriva/ws/turni/get',
        api: {
           read: '/vvfriva/ws/turni/get',
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
