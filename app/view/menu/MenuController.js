Ext.define('vvf.view.menu.MenuController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.menu',

    generaMenu() {
        let cnt =  this.lookupReference('CntMenu');
        this.store.each(record => {
            cnt.add({
                xtype: 'button',
                itemId: record.get('type'),
                margin: '0 0 0 3',
                height: 40,
                width: 125,
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
            xtype: 'button',
            hidden: true,
            itemId: 'BtnBirthday', reference: 'BtnBirthday',
            margin: '0 10 0 0',
            iconCls: 'icon-compleanno',
            width: 40,
            height: 40,
            scale: 'large',
            tooltip: 'Compleanno in arrivo!',
            cls: 'no-background',
            handler: Ext.bind(this.clickBtnBirthday, this)
        });
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
    
    clickBtnBirthday(th) {
    	
    	let win = Ext.create('stdWin',{
    		title: 'Compleanni VVF',
    		width: 400,
    		height: 150,
    		layout: 'fit',
    		items: [
    			{
    				xtype: 'dataview',
    				itemId: 'List',
    				flex: 1,
    				itemSelector : 'thumb-wra',
    				tpl: new Ext.XTemplate(
				    '<tpl for=".">',
				        '<div class="shadow" style="margin: 3px; padding: 8px;">',
				          '<span><img style="margin-right: 5px;" src="resources/images/fireman.svg" align="center" width="24" height="24" /></span><span>{nome}</span> <span>{cognome}</span>',
				        '</div>',
				    '</tpl>'
    			    ),
    				store: Ext.create('Ext.data.Store', {
    					fields: [
    						{name: 'nome'},
    						{name: 'cognome'}
    					],
    					autoLoad: true,
    					autoDestroy: true
    				})
    			}
    		]
    	});
    	
    	let store = win.down('#List').getStore();
    	store.removeAll();
    	store.loadData(this.listBirthday);
    	
    	win.showBy(th, 'bl',[-win.width]);
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
    	this.lookup('ShortMenu').hide();
        let tabPanel = this.lookupReference('TabMenu');
        tabPanel.show();
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
            url: '/vvfriva2/ws/general/session',
            success: (response) => { 
                let risposta = Ext.decode(response.responseText);
                if (risposta.success) {
	                localStorage.setItem('isLogin', risposta.data)
	                this.sbloccaBtn(risposta.data);
                }
            }
        });
    },
    
    clickShortMenu(th) {
    	let menu = this.lookup('CntMenu'),
    		btn = null;
    	if (th.getReference() === 'BoxRubrica') {
    		btn = menu.down('#_rubrica');
    	} else if (th.getReference() === 'BoxTurnario') {
    		btn = menu.down('#_turni');
    	}
    	btn.handler(btn);
    },
    
    afterenderBox(th) {
    	th.getEl().on('click', () => this.clickShortMenu(th))
    },
    
    checkBirthdays() {
    	this.listBirthday = [];
    	let btnBirthday = this.lookup('CntMenu').down('#BtnBirthday')
    	Ext.Ajax.request({
            method: 'GET',
            url: '/vvfriva2/ws/general/checkbirthdays',
            success: response => { 
                let risposta = Ext.decode(response.responseText);
                if (risposta.success) { 
                	btnBirthday.setHidden(Ext.isEmpty(risposta.data));
                	if (risposta.data && risposta.data.length > 0) {
                		this.listBirthday = risposta.data;
                	}
                }
            }
        });
    },
    
    launch() {
    	this.listBirthday = [];
        this.store = Ext.create('vvf.view.menu.store.Menu');
        this.generaMenu();
        this.existSession();
        this.checkBirthdays();
        setInterval(() => {
        	//mezzanotte 
        	let now = new Date();
			if (now.getHours() === 0 && now.getMinutes() === 0) {
				this.checkBirthdays();
			}
		}, 60000);
        
       
    }
});
