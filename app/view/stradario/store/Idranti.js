Ext.define('vvf.view.stradario.store.Idranti', {
    extend: 'Ext.data.Store',
    model: 'vvf.model.Idranti',
    proxy: {
        type: 'ajax',
        url: '/vvfriva2/ws/coordinate/list',
        api: {
            create: '/vvfriva2/ws/coordinate/save',
            destroy: '/vvfriva2/ws/coordinate/delete',
            update: '/vvfriva2/ws/coordinate/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
        	writeRecordId: false
        }
    },
    autoLoad: false,
    autoDestroy: true,

});
