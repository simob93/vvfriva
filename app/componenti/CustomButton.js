Ext.define('vvf.componenti.CustomButton', {
    extend: 'Ext.container.Container',
    alias: 'widget.customButton',
    alternateClassName: 'customButton',

    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'end'
    },
    flex: 1,
    defaults: {
        margin: '0 0 0 8',
    },
	initComponent: function( config ) {
        this.items = [
            {
                xtype: 'button',
                reference: 'BtnNuovo',
                text: 'Nuovo'
            },
            {
                xtype: 'button',
                reference: 'BtnConferma',
                scale: 'medium',
                cls: 'no-background',
                iconCls: 'icon-confirm',
                listeners: {
                    click: th => {

                        let valid = null;
                        if (this.vvfConfig.verificaCampi) {
                            valid = this.vvfConfig.verificaCampi();
                        }
                        if (valid) {
                            if (this.vvfConfig.conferma_callBack) {
                                this.vvfConfig.conferma_callBack();
                            }
                        }
                    }
                }
            },
            {
                xtype: 'button',
                reference: 'BtnElimina',
                text: 'Elimina'
            },
            {
                xtype: 'button',
                reference: 'BtnEsci',
                text: 'Esci',
                listeners: {
                    click: th => {
                       
                        if (this.vvfConfig.esci_callBack) {
                            this.vvfConfig.esci_callBack();
                        }
                    }
                }
            }
        ];
		this.callParent();
	}
});