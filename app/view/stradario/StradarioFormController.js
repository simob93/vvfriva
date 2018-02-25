Ext.define('vvf.view.stradario.StradarioFormController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.stradarioform',

    gestioneForm() {
        let cnt = this.lookupReference('CntBottoni'),
            form = this.lookupReference('Form');

        form.store = Ext.create('vvf.view.stradario.store.Stradario');
        
        cnt.add( Ext.create('vvf.componenti.CustomButton', {
            vvfConfig: {
                conferma_callBack: () => {
                    this.salvaForm();
                },
                verificaCampi: () => {
                    return  this.verificaCampiForm()
                },
                esci_callBack: () => {
                    this.vvfConfig.controllerMain.aggiornaStore();
                    this.view.up('window').close();
                    
                }
            }
        }) );
        this.lookupReference('BtnElimina').hide();
        this.lookupReference('BtnNuovo').hide();
    },

    salvaForm() {
        let form = this.lookupReference('Form'),
            record = form.getForm().getFieldValues();
        
        Standard.salvaRecord(form, record);
        
    },

    aggiornaStore() {
        this.vvfConfig.controllerMain.aggiornaStore();       
        this.view.up('window').close();
    },

    verificaCampiForm() {
        let form = this.lookupReference('Form'),
            messaggi = [];
        if (!form.isValid()) {
            Standard.addErrorMsg(messaggi, Config.MSG_CAMPI_OBBLIGATORI);
        }
        return Standard.showErrorMsg(messaggi);
    },

    caricaDati() {
        let form = this.lookupReference('Form');
        if (this.vvfConfig.record) {
            this.onLoad = true;
            form.getForm().loadRecord(this.vvfConfig.record);
            this.onLoad = false;
        } else {
            form.isValid();
        }
    },

    launch() {
    
        let form = this.lookupReference('Form');
        form.controller = this;
        
        this.gestioneForm();
        this.caricaDati();
    }

});
