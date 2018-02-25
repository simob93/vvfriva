Ext.define('vvf.view.vigili.store.Grado', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.grado',
    fields: [
        'codice', 'valore'
    ],

    data: [
        ['Vigile', 'Vigile'],
        ['Capoplotone', 'Capoplotone'],
        ['Caposquadra', 'Caposquadra'],
        ['Vice comandante', 'Vice comandante'],
        ['Ispettore', 'Ispettore'],
    ]
});
