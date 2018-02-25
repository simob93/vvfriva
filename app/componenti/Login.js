Ext.define('vvf.componenti.Login', {
    extend: 'Ext.container.Container',
    alias: 'widget.loginWin',
    alternateClassName: 'loginWin',
    padding: 4,
    modal: true,
    floating: true,
    //width: 530,
    style: {
        background: '#fff',
        borderTop: '6px solid #B71C1C',
        
    },
    layout: 'fit',
    bodyPadding: 6,
	initComponent: function( config ) {
        
        this.items = [
            {
                xtype: 'label',
                margin: '4 0 0 6',
                cls: 'label-info',
                html: 'Accesso riservato'
            },
            {
                xtype: 'panel',
                margin: '6 0 0 0',
                height: 160,
                layout: {
                    type: 'vbox',
                    align: 'middle'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'textfield',
                        width: 250,
                        itemId:'Username', reference: 'Username',
                        allowBlank: false,
                        fieldLabel: 'Nome utente',
                        labelAlign: 'top',
                    },
                    {
                        xtype: 'textfield',
                        labelAlign: 'top',
                        width: 250,
                        itemId:'Pwd', reference: 'Pwd',
                        allowBlank: false,
                        margin: '0 0 0 5',
                        inputType: 'password',
                        fieldLabel: 'Password'
                    }
                ],
                buttons: [
                    {
                        xtype: 'button',
                        ui: 'login',
                        text: 'Accedi',
                        handler: () => {
                        	
                        	let username = this.down('#Username').getValue(),
                     			password = this.down('#Pwd').getValue()
                         	
                            Standard.doLogin(username, password, () => {
                            	this.callback_login();
                            	this.destroy();
                            });
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Esci',
                        handler:()=> this.hide()
                    }
                ]
            }
        ]
        this.callParent();
	}
});