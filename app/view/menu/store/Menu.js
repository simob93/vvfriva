Ext.define('vvf.view.menu.store.Menu', {
    extend: 'Ext.data.ArrayStore',
    fields: [
        'descrizione', 'view', 'iconCls', 'admin'
    ],

    data: [
        ['Vigili', 'vvf.view.vigili.Vigili', 'icon-user', true],
        ['Protocolli', 'vvf.view.protocolli.Protocolli', 'icon-email', true],
        ['Rubrica','vvf.view.rubrica.Rubrica', 'icon-phone'],
        ['Vie-Idranti', 'vvf.view.stradario.Stradario'],
        ['Turni', 'vvf.view.turni.Turni', 'icon-turni-white'],
    ]
});
