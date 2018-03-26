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
                tooltip: 'Nuovo',
                reference: 'BtnNuovo',
                text: 'Nuovo'
            },
            {
                xtype: 'button',
                reference: 'BtnConferma',
                scale: 'medium',
                tooltip: 'conferma',
                cls: 'no-background',
                iconCls: 'icon-confirm',
                disabled: true,
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
                tooltip: 'elimina',
                text: 'Elimina',
            },
            {
                xtype: 'button',
                iconCls: 'icon-exit',
                cls: 'no-background',
                scale: 'medium',
                reference: 'BtnEsci',
                tooltip: 'Esci',
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