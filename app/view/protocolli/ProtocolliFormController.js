Ext.define('vvf.view.protocolli.ProtocolliFormController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.protocolliform',


    loadStore(store) {
        return new Promise((resolve, reject) => {
            store.load({
                callback: (records, operation, success) => {
                    if (success) {
                        resolve();
                    } else {
                        reject(operation.getError())
                    }
                }
            });
        });
    },

    gestioneForm() {
        let cnt = this.lookupReference('CntBottoni'),
            form = this.lookupReference('Form');

        form.store = Ext.create('vvf.view.protocolli.store.Protocolli');
        form.controller = this;
        
        cnt.add( Ext.create('vvf.componenti.CustomButton', {
            vvfConfig: {
                conferma_callBack: () => {
                    this.salvaForm();
                },
                verificaCampi: () => {
                    return this.verificaCampiForm()
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

    verificaCampiForm() {
        let form = this.lookupReference('Form'),
            messaggi = [];
        if (!form.isValid()) {
            Standard.addErrorMsg(messaggi, Config.MSG_CAMPI_OBBLIGATORI);
        }
        return Standard.showErrorMsg(messaggi);
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
    
    dirtyChangeForm(th, isDrity) { debugger;
    	this.lookupReference('BtnConferma').setDisabled(!isDrity)
    },
    
    launch() {

        let form = this.lookupReference('Form'),
            cboxComuni = this.lookupReference('CboxComuni'),
            cboxProvince = this.lookupReference('CboxProvince'),
            cboxTipologia = this.lookupReference('CboxTipologia'),
            cboxEnti = this.lookupReference('CboxEnti'),
            cboxFaldoni = this.lookupReference('CboxFaldoni');
            storeTipologia = new Ext.data.ArrayStore({
                fields: [
                    'codice', 'valore'
                ],
                data: [
                    ['E', 'Entrata'],
                    ['U', 'Uscita']
                ],
                autoDestroy: true
            });

        this.gestioneForm();
    
        cboxTipologia.setStore(storeTipologia);

       
        this.loadStore(cboxComuni.getStore())
            .then(() => this.loadStore(cboxProvince.getStore()))
            .then(() => this.loadStore(cboxFaldoni.getStore()))
            .then(() => this.loadStore(cboxEnti.getStore()))
            .then(() => {
                if (!this.vvfConfig.record) {
                    let dataReg = this.lookupReference('DataReg');
                    dataReg.setValue(new Date());
                    form.isValid();
                } else {
                    form.loadRecord(this.vvfConfig.record);
                }
            })
            .catch(error => Standard.messaggio('Attenzione',error));

    }

});
