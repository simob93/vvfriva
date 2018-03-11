Ext.define('vvf.view.menu.store.Menu', {
    extend: 'Ext.data.ArrayStore',
    fields: [
        'descrizione', 'view', 'iconCls', 'admin', 'type'
    ],

    data: [
        ['Vigili', 'vvf.view.vigili.Vigili', 'icon-user', true, '_vigili'],
        ['Protocolli', 'vvf.view.protocolli.Protocolli', 'icon-email', true, '_prott'],
        ['Rubrica','vvf.view.rubrica.Rubrica', 'icon-phone', false, '_rubrica'],
        ['Vie-Idranti', 'vvf.view.stradario.MappaIdranti', 'icon-earth-white', false, '_vie'],
        ['Turni', 'vvf.view.turni.Turni', 'icon-turni-white', false, '_turni'],
    ]
});
