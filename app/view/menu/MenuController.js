Ext.define('vvf.view.menu.MenuController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.menu',

    generaMenu() {
        let cnt =  this.lookupReference('CntMenu');
        this.store.each(record => {
            cnt.add({
                xtype: 'button',
                margin: '0 0 0 3',
                height: 40,
                width: 120,
                ui: record.get('admin') ? 'menu-superUser': 'menu',
                scale: 'medium',
                admin: record.get('admin') === true,
                hidden:  record.get('admin') === true,
                iconCls: record.get('iconCls'),
                text: record.get('descrizione'),
                vvfConfig: {
                    descrizione: record.get('descrizione'),
                    view: record.get('view'),
                    admin:  record.get('admin')
                },
                handler: th => this.cickBtnMenu(th),
            });
        });
        cnt.add({
            xtype: 'tbfill'
        });
        
//        cnt.add({
//            xtype: 'button',
//            scale: 'medium',
//            cls: 'no-background',
//            iconCls: 'icon-notification',
//        });
        cnt.add({
            xtype: 'tbseparator',
        });
        cnt.add({
            xtype: 'button',
            itemId: 'BtnLogin', reference: 'BtnLogin',
            margin: '0 0 0 3',
            height: 40,
            text: 'Login',
            ui: 'login',
            handler: th => this.logIn(th)
            //scale: 'medium',
        });
    },
    
    sbloccaBtn(sblocca) { 
        let cnt =  this.lookupReference('CntMenu'),
            tabPanel = this.lookupReference('CntMenu'),
            adminButton = cnt.query('[admin]'),
            btnLogin = tabPanel.down('#BtnLogin');

        adminButton.forEach(btn => btn.setHidden(!sblocca))
        
        if (sblocca) {
            btnLogin.setText('Logout');
        } else {
            btnLogin.setText('Login');
        }
    
    },

    logIn(th) {
        let isLogin = localStorage.getItem('isLogin') === 'false' || !localStorage.getItem('isLogin');
        
        if (isLogin) {
           let winLogin =  Ext.create('loginWin', {
                modal: false,
                callback_login: () => this.sbloccaBtn(true)
            });
            winLogin.showBy(th, 'bl', [-220]);
        } else {
            localStorage.setItem('isLogin', false);
            this.sbloccaBtn(false)
            Standard.doLogout();
        }
    },

    cickBtnMenu(th) {
        let tabPanel = this.lookupReference('TabMenu');
        tabPanel.removeAll(true); 
        tabPanel.add({
            closable: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            title: th.vvfConfig.descrizione,
            items: th.vvfConfig.view ? [Ext.create(th.vvfConfig.view)]: []
        });
        tabPanel.setActiveTab(0);
      
    },
    
    existSession() {
    	Ext.Ajax.request({
            method: 'GET',
            url: '/vvfriva/ws/general/session',
            success: (response) => { 
                let risposta = Ext.decode(response.responseText);
                if (risposta.success) {
	                localStorage.setItem('isLogin', risposta.data)
	                this.sbloccaBtn(risposta.data);
                }
            }
        });
    },
    
    launch() {
        this.store = Ext.create('vvf.view.menu.store.Menu');
        this.generaMenu();
        
        this.existSession();
        
       
    }
});
