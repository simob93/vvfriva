Ext.define('vvf.view.vigili.VigiliController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.vigili',

    aggiornaStore() {
        let grid = this.lookupReference('Grid'),
            store = grid.getStore(),
            lblTotaleVigili = this.lookup('LblTotaleVigili'),
            lblVigiliAttesa =  this.lookup('LblVigiliAttesa'),
            ckbNonAttivi = this.lookup('CkbNonAttivi');
            count = 0;
        
        store.load({
            params: {
                nonAttivi: ckbNonAttivi.getValue()
            },
            callback: (records, operation, success) => {
                if (success) {
                    lblTotaleVigili.setHtml(records.length);

                    for(let vigile of records) {
                        if (!vigile.get('squadra')) {
                            count++;
                        }
                    }
                    lblVigiliAttesa.setHtml(count);

                } else {

                }
            }
        });
        
    },

    changeCkbNonAttivi(th, newValue) {
        this.aggiornaStore();
    },

    changeCerca(th, newValue) {
        let store = this.lookup('Grid').getStore();
        store.clearFilter();
        store.filterBy(rec => rec.get('nome').toUpperCase().includes(newValue.toUpperCase()) || rec.get('cognome').toUpperCase().includes(newValue.toUpperCase()))
    },

    itemdblclickGrid(th, record) {
        let win = Ext.create('vvf.componenti.StdWin', {
            width: 600,
            closable: false,
            height: 450,
            title: 'Nuovo vigile',
            view: 'vvf.view.vigili.VigiliForm',
            vvfConfig: {
                record: record,
                controllerMain: this
            }
        });
        win.show();
    },

    creaWin() {

        let win = Ext.create('vvf.componenti.StdWin', {
            width: 600,
            height: 450,
            title: 'Vigile',
            closable: false,
            view: 'vvf.view.vigili.VigiliForm',
            vvfConfig: {
                controllerMain: this
            }
        });
        win.show();
    },

    creaAvatar(value) { 
        let str = '';
        if (Ext.isEmpty(value)) {
            return '';
        }
        switch(value) {
            case 'Vigile': str = 'V'; break;
            case 'Capo squadra': str = 'CS'; break;
            case 'Capo polotone': str = 'CP'; break;
            case 'Vice comandante': str= 'VC'; break;
            default: break;
        }

        let cnt = Ext.create('vvf.componenti.Avatar', {
            background: '#E57373',
            color: '#fff',
            round: true,
            html: str,
            style: 'line-height: 2.2;'
        });
        return cnt;
    },
    
    clickBtnStampa() {
    	
    	Standard.doPrint({
    		url: '/vvfriva2/ws/vigili/print',
    		title: 'Stampa elenco vigili',
    		nonAttivi: this.lookup('CkbNonAttivi').getValue()
    	});
    },

    clickBtnElimina() {
        let grid = this.lookupReference('Grid'),
            rec = grid.getSelectionModel().getSelection()[0];
        
        if (rec) {
            Standard.eliminaRecord(grid.getStore(), rec.get('id'), () => this.aggiornaStore());
        }
    },

    launch() {
        this.aggiornaStore();
    }

});
