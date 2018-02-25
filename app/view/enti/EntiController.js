Ext.define('vvf.view.enti.EntiController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.enti',

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

    validateeditGrid(context, editor) {
        return true;
    }, 

    editGrid(editor, context) {
        let record = context.record.data,
            grid = this.lookup('Grid');
        Ext.apply(record, {
            id: Ext.isString(record.id) ? null : record.id
        });
        Standard.salvaRecord(grid, record);
    }, 
    
    canceleditGrid(context, editor) {
       this.aggiornaStore(); 
    }, 

    addRecord() {
        let grid = this.lookup('Grid'),
            store = grid.getStore();
        store.insert(0, {
            id: null
        });
        grid.getPlugin().startEdit(0,0);
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
