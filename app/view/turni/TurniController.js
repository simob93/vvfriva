Ext.define('vvf.view.turni.TurniController', {
    extend: 'vvf.componenti.MyController',
    alias: 'controller.turni',

    aggiornaStore() {
        let grid = this.lookup('Grid'),
        	store = grid.getStore();
        
     store.load({
            params: {
                data: new Date(),
                type: 1 //calcolo sempre il turno settimanale
            },
            callback: (records, operation, success) => {
                if (success) {
                    if (!Ext.isEmpty(records)) {
                        
                    }
                }
            }
        })
    },
    
    winFiltri(th) {
    	
    	this.winStampa = Ext.create('stdWin', {
    		width: 400,
    		height: 300,
    		title: 'Stampa turnario',
    		items: [
    			{
    				xtype: 'form',
    				layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
    				items: [
    					{
    						xtype: 'fieldset',
    						title: 'Periodo',
    						layout: {
    							type: 'vbox',
    							align: 'stretch'
    						},
    						flex: 1,
    						items: [
    							{
    	    						xtype: 'datefield',
    	    						format: 'd/m/Y',
    	    						itemId: 'DataDal',
    	    						fieldLabel: 'Data',
    	    						maxWidth: 220,
    	    						value: new Date()
    	    					},
    	    					{
    	    						xtype: 'label',
    	    						html: 'Frequenza:'
    	    					},
    	    					{
    	    						xtype: 'segmentedbutton',
    	    						margin: '10 0 0 0',
    	    						heigth: 60,
    	    						itemId: 'BtnOptions', reference: 'BtnOptions',
    	    						layout: {
    	    							type: 'hbox',
    	    						},
    	    						defaults: {
    	    							margin: '4 0 0 0',
    	    						},
	    				            items: [
	    				            	{
	    				            		text: 'Settimana',
	    				            		pressed: true,
	    				            		value: 1
	    				            	}, 
	    				            	{
	    				            		text: 'Mensile',
	    				            		value: 2
	    				            	}, 
	    				            	{
	    				            		text: '6 Mesi',
	    				            		value: 4
	    				            	},
	    				            	{
	    				            		text: '1 anno',
	    				            		value: 5
	    				            	}
    				            	]
    	    					}
    						]
    					}
    				],
    				dockedItems: [
    					{
    						xtype: 'toolbar',
    						ui: 'footer',
    						dock: 'bottom',
    						items: [
    							{
    								xtype: 'tbfill'
    							},
    							{
    								xtype: 'button',
    								text: 'Stampa',
    								handler: th => {
    									this.clickBtnStampa();
    								}
    							}
    						]
    					}
    				]
    			}
    		]
    	});
    	this.winStampa.show();
    },
    
    clickBtnStampa() {
    	let type = this.winStampa.down('#BtnOptions').getValue(),
    		data = this.winStampa.down('#DataDal').getValue();
    	
    	if (!type) {
    		Standard.messaggio('Attenzione', 'Selezionare la frequenza di generazione turnario','OK','WARNING');
    		return false;
    	}
    	if (!data) {
    		Standard.messaggio('Attenzione', 'Selezionare la data di generazione turnario','OK','WARNING');
    		return false;
    	}
    	Standard.doPrint({
    		url: '/vvfriva2/ws/turni/print',
    		dal: this.winStampa.down('#DataDal').getValue(),
    		type: this.winStampa.down('#BtnOptions').getValue(),
    		title: 'Stampa turnario'
    	}, () => this.winStampa.close());
    },
    /**
     *  metodo che ritorna informazioni sulla squadra 
     *  di turno nel periodo indicato
     */
    whoIs() {
    	
    	let today = new Date();// recupero la data di oggi
    	let boxInfo = this.lookup('BoxInfo');
    	Ext.Ajax.request({
            method: 'GET',
            url: '/vvfriva2/ws/turni/whois',
            params: {
            	data: today
            },
            success: (response, opts) => {
                let risposta = JSON.parse(response.responseText);
                if (risposta.success) {
                    
                	let data = risposta.data;
                	data.forEach((info, idx) => {
                		if (idx !== 2){
	                		boxInfo.add({
	                			xtype: 'label',
	                			margin: '10 0 0 0',
	                			html: info,
	                		});
                		}
                	});
                	
                } else { 
                    this.showErrorMsg(risposta.message);
                }
            }
        });
    },
    
    launch() {
        this.whoIs();
        this.aggiornaStore();
        
        let label = this.lookup('LabelInfoTurno'),
        	today = new Date();
        
//        label.setHtml(
//        	Standard.formattaData(Standard.getFirstDayOfWeek(today)) + ' - ' + Standard.formattaData(Standard.getLastDayOfWeek(today))
//        );
    }

});
