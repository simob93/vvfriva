Ext.define('vvf.view.stradario.StradarioController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.stradario',

    aggiornaStore(idRecord) {
        let grid = this.lookupReference('Grid'),
            store = grid.getStore();
        store.load({
            callback: (records, operation, success) => {
                if (success) {
                    if(!Ext.isEmpty(records)) {
                        let record = null;
                        if (idRecord) {
                            record = Standard.trovaRecord(store, 'id', idRecord);
                        }
                        grid.getSelectionModel().deselectAll();
                        grid.getSelectionModel().select(record ?[record] : 0);
                    }
                }
            }
        });
    },
    
    showMap() {
    	let win = Ext.create('vvf.componenti.StdWin', {
            width: 1024,
            height: 600,
            maximizable: true,
            title: 'Posizione idranti',
            view: 'vvf.view.stradario.MappaIdranti', //AIzaSyDFqWlkpL1vqjkqkUtjGKwjRbFE_gquukA
        });
        win.show();
    },

    changeCerca(th, newValue) {
        let store = this.lookup('Grid').getStore();
        store.clearFilter();
        store.filterBy(rec => rec.get('nome').toUpperCase().includes(newValue.toUpperCase()))
    },

    itemdblclickGrid(th, record) {
        let win = Ext.create('vvf.componenti.StdWin', {
            width: 600,
            height: 450,
            title: 'Modifica indirizzo',
            view: 'vvf.view.stradario.StradarioForm',
            vvfConfig: {
                record: record,
                controllerMain: this
            }
        });
        win.show();
    },

    addRecord() {
        let win = Ext.create('vvf.componenti.StdWin', {
            width: 600,
            height: 450,
            title: 'Nuovo indirizzo',
            view: 'vvf.view.stradario.StradarioForm',
            vvfConfig: {
                controllerMain: this
            }
        });
        win.show();
    },

    deleteRecord() {
        let grid = this.lookupReference('Grid'),
        rec = grid.getSelectionModel().getSelection()[0];
    
        if (rec) {
            Standard.eliminaRecord(grid.getStore(), rec.get('id'), () => this.aggiornaStore());
        }
    },

    launch() {
        this.lookup('Grid').controller = this;
        this.aggiornaStore();
    }

});
