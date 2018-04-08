Ext.define('vvf.view.protocolli.ProtocolliController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.protocolli',

    aggiornaStore() {
    	
        let grid = this.lookupReference('Grid'),
            store = grid.getStore(),
            searchText = this.lookup('TxtSearch').getValue();
        
        store.removeAll();
        store.load({
        	params: {
        		oggetto: searchText
        	},
            callback: (records, operation, success) => {
                if (success) {

                } else {

                }
            }
        });
    },

    selectionchangeGrid(th, selection) {
        this.lookupReference('BtnElimina').setDisabled(selection && selection.length === 0);
    },
    
    clickBtnElimina() {
        let grid = this.lookupReference('Grid'),
            rec = grid.getSelectionModel().getSelection()[0];
        
        if (rec) {
            Standard.eliminaRecord(grid.getStore(), rec.get('id'), () => this.aggiornaStore());
        }
    },

    itemdblclickGrid(th, record) {
        let win = Ext.create('vvf.componenti.StdWin', {
        	width: 900,
            height: 650,
            title: 'Modifica Protocollo',
            view: 'vvf.view.protocolli.ProtocolliForm',
            vvfConfig: {
                controllerMain: this,
                record: record
            }
        });
        win.show();
    },
    
    clickBtnFind() {
    	this.aggiornaStore();
    },

    creaWinArchivi() {
        let win = Ext.create('vvf.componenti.StdWin', {
            width: 820,
            height: 500,
            title: 'Faldoni',
            view: 'vvf.view.archivi.Archivi',
            vvfConfig: {
                controllerMain: this
            }
        });
        win.show();
    },

    creaWinEnti() {
        let win = Ext.create('vvf.componenti.StdWin', {
            width: 820,
            height: 500,
            title: 'Enti',
            view: 'vvf.view.enti.Enti',
            vvfConfig: {
                controllerMain: this
            }
        });
        win.show();
    },

    creaWin() {
        
        let win = Ext.create('vvf.componenti.StdWin', {
            width: 900,
            height: 650,
            closable: false,
            title: 'Nuovo Protocollo',
            view: 'vvf.view.protocolli.ProtocolliForm',
            vvfConfig: {
                controllerMain: this
            }
        });
        win.show();
    },

    creaAvatar(value) {
        let cnt = Ext.create('vvf.componenti.Avatar', {
            background: value === 'U' ? '#80CBC4' : '#D4E157',
            color: '#fff',
            round: true,
            html: value,
            style: 'line-height: 2.2;'
        });
        return cnt;
    },


    launch() {
        this.aggiornaStore()
        let grid = this.lookupReference('Grid'),
       		store = grid.getStore();
        
        store.on('beforeload', (store, op) => { 
        	let searchText = this.lookup('TxtSearch').getValue();
        	Ext.apply(store.proxy.extraParams, {
        		oggetto: searchText
        	})
        });
        
    }

});
