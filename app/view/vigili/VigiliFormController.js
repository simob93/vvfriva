Ext.define('vvf.view.vigili.VigiliFormController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.vigiliform',

    gestioneForm() {
        let cnt = this.lookupReference('CntBottoni'),
            form = this.lookupReference('Form');

        form.store = Ext.create('vvf.view.vigili.store.Vigili');
        
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

    changeCboxSquadre(th, newValue, oldValue) {
        if (this.onLoad){
            return false;
        }
        let txtLetteraVigile = this.lookupReference('TextLetteraVigile');
        if (newValue) {
            Ext.Ajax.request({
                method: 'GET',
                params: {
                    idSquadra: newValue
                },
                url: '/vvfriva2/ws/vigili/getLettere',
                success: (response) => {
                    let risposta = Ext.decode(response.responseText);
                    if (risposta.success) {
                        txtLetteraVigile.setValue(risposta.data[0].valore);
                    } else {

                    }
                }
            })
        } else {
            txtLetteraVigile.setValue(null);
        }
    },
    
    changeCheckCs(th, newValue) {
    	let cboxGrado = this.lookup('CboxGrado');
    	if (newValue)
    		cboxGrado.setValue('Caposquadra');
    	else if (!this.onLoad)
    		cboxGrado.setValue(null);
    },

    caricaDati() {
        let form = this.lookupReference('Form');
        if (this.vvfConfig.record) {
            this.onLoad = true;
            form.getForm().loadRecord(this.vvfConfig.record);
            this.onLoad = false;
        }
    },
    
    dirtyChangeForm(th, isDirty) {
    	this.lookupReference('BtnConferma').setDisabled(!isDirty)
    },

    launch() {
        let cboxSquadre = this.lookupReference('CboxSquadre'),
            form = this.lookupReference('Form');
        form.controller = this;
        
        this.gestioneForm();
        if (!this.vvfConfig.record) {
            form.isValid();
        }
        cboxSquadre.getStore().load({
            callback: (record, operation, success) => {
                if (success) {
                    this.caricaDati();
                }
            }
        });

    }

});
