Ext.define('vvf.view.stradario.MappaIdrantiController', {
	 extend: 'vvf.componenti.MyController',
    alias: 'controller.mappaidrantiController',
  
    clearMap() {
    	 this.directionsDisplay.set('directions', null);
    	 if (this.array_idranti.length > 0) {
			 this.array_idranti.forEach(marker => {
				 marker.setMap(null);
			 });
			 this.array_idranti = [];
    	 }
    },
    
    calculateAndDisplayRoute(to) {
    	
    	this.directionsService.route({
            origin: 'Viale Rovereto, 19, 38066 Riva del Garda TN',
            destination: to,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
              this.directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    },
    
    insertIdrante(record) {
    	let win = Ext.create('vvf.componenti.StdWin', {
            width: 300,
            height: 600,
            maximizable: true,
            title: 'Nuovo idrante',
            items: [
            	{
            		xtype: 'form',
            		itemId: 'Form',
            		layout: {
            			type: 'vbox',
            			align: 'middle',
            			pack: 'center'
            		},
            		defaults: {
            			labelAlign: 'top'
            		},
            		flex: 1,
            		items: [
            			{
            				xtype: 'textfield',
            				name: 'id',
            				hidden: true
            			},
            			{
            				xtype: 'numberfield',
            				name: 'latitudine',
            				decimalPrecision: 20,
            				fieldLabel: 'Latitudine',
            			},
            			{
            				xtype: 'numberfield',
            				decimalPrecision: 20,
            				itemId: 'Long',
            				name: 'longitudine',
            				fieldLabel: 'Longitudine',
            			},
            			{
            				xtype: 'textfield',
            				name: 'tipo',
            				fieldLabel: 'Tipo',
            			},
            			{
            				xtype: 'textfield',
            				name: 'attacco',
            				fieldLabel: 'Attacco',
            			},
            			{
            				xtype: 'textfield',
            				name: 'uscita',
            				fieldLabel: 'Uscita',
            			},
            			{
            				xtype: 'textfield',
            				name: 'posizione',
            				fieldLabel: 'Posizione',
            			},
            			{
            				xtype: 'textfield',
            				name: 'frazione',
            				fieldLabel: 'Frazione',
            			},
            			{
            				xtype: 'textfield',
            				name: 'comune',
            				fieldLabel: 'Comune',
            			}
            		],
            		dockedItems: [
            			{
            				xtype: 'toolbar',
            				dock: 'bottom',
            				ui: 'footer',
            				items: [
            					{
            						xtype: 'tbfill'
            					},
            					{
            						xtype: 'button',
            						text: 'Inserisci',
            						handler: () => {
            							let params = {
            								id: win.down('#Id').getValue(),
            								latitudine: win.down('#Lat').getValue(), 
            								longitudine: win.down('#Long').getValue()
            							}
            							this.saveOrUpdatePosition(params);
        							}
            					}
            				]
            			}
            		]
            	}
            ]
        });
        win.show();
        //se ho l'id
        if (!record.id) {
        	win.down('#Form').getForm().setValues(record);
        }
    },
    
    saveOrUpdatePosition(config) {
    	//Standard.salvaRecord()
//    	if (config.id !== null) {
//    		this.storeIdranti.create(config);
//    	} else this.storeIdranti.update(config);
    	
    	let operation =  !Ext.isEmpty(config.id)? 'update' : 'save';
    	
    	Ext.Ajax.request({
            method: 'POST',
            url: '/vvfriva2/ws/coordinate/' + operation,
            jsonData: config,
            success: (response, opts) => {
                let risposta = JSON.parse(response.responseText);
                if (risposta.success) {
                     this.toastMsgShow('Attenzione', risposta.message[0]);
                } else { 
                    Standard.showErrorMsg(risposta.message);
                }
            }
        });
    	
    },
    
    caricaIdranti() {
    	this.storeIdranti.load({
    		callback: (records, operation, success) => {
    			if (success) {
    				if (!Ext.isEmpty(records)) {
    					records.forEach(rec => this.createMarker(rec.data));
    				}
    			} else {
    				Standard.showErrorMsg(risposta.message);
    			}
    		}
    	});
    },
    
    createMarker(record) {
    	let map = this.lookup('Map').gmap;
    	const marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(record.latitudine, record.longitudine),
            title : 'prova',
            draggable:false,
            icon: "resources/images/idrante.svg"
        });
    	this.array_idranti.push(marker);
    	//aggiugno sul click dell'idrante le informazioni aggiuntive 
    	marker.addListener('click', () =>  {
    		
    		let text = '<h2>Informazioni</h2><br><p><b>Tipo:</b> '+ record.tipo +'</p>' +
    		'<p><b>Attacco:</b> '+ record.attacco +'</p>' +
    		'<p><b>Uscita:</b> '+ record.uscita +'</p>' +
    		'<p><b>Via:</b> '+ record.via +'</p>' +
    		'<p><b>Frazione:</b> '+ record.frazione +'</p>' +
    		'<p><b>Comune:</b> '+ record.comune +'</p>'
        	this.infoWindow.setContent(text);
    		
    		this.infoWindow.open(map, marker);
    	});
    },
    
    clickBtnFind() {
    	let place = this.searchBox.getPlace(),
    	  	percorso = this.lookup('CkbPercorso').getValue(),
    	  	showIdranti = this.lookup('CkbIdranti').getValue(),
    	  	map = this.lookup('Map');
    	
    	//azzero 
	    this.clearMap();
	    this.markerDest.setVisible(false);
    	
    	if (showIdranti) {
    		this.caricaIdranti();
    	}
	    if (place && !Ext.isEmpty(place.formatted_address)) {
	    	if (percorso) {
	  	  	  this.calculateAndDisplayRoute(place.formatted_address);
	  	    } 
	  	    else if (!Ext.isEmpty(place.formatted_address)) {
	  	    	this.markerDest.setVisible(true);
	  	    	if (place.geometry.viewport) {
	  	    		map.gmap.fitBounds(place.geometry.viewport);
	  	        } else {
	  	        	map.gmap.setCenter(place.geometry.location);
	  	        	map.gmap.setZoom(17); 
	  	    	}
	  	    	this.markerDest.setPosition(place.geometry.location);
	  	    }
	     
	    }
    },
    
    launch() {
    	
    	this.directionsDisplay = new google.maps.DirectionsRenderer;
    	this.directionsService = new google.maps.DirectionsService;
    	this.infoWindow = new google.maps.InfoWindow();
    	//vengono caricati gli idranti
    	this.array_idranti = [];
    	
    	this.storeIdranti = Ext.create('vvf.view.stradario.store.Idranti');
    	let map = this.lookup('Map'),
    		boxAddress = this.lookup('BoxAddress');
    	
        this.interval = setInterval(() => {
        	
			if (Ext.isDefined(map.gmap)) {
				
				this.searchBox = new google.maps.places.Autocomplete(document.getElementById('pac-input'));
				this.searchBox.bindTo('bounds', map.gmap);
				//map.gmap.controls[google.maps.ControlPosition.TOP_RIGHT].push(boxAddress.getEl().dom);
				this.directionsDisplay.setMap(map.gmap);
				this.markerDest = new google.maps.Marker({
	                 map: map.gmap,
	                 anchorPoint: new google.maps.Point(0, -29)
	            });
				
//				 this.searchBox.addListener('place_changed', () => {
//			     });
//				
        	   //this.caricaIdranti();
        	    
//        	    google.maps.event.addListener(map.gmap, 'click', (event) => {
//	        	    this.insertIdrante({
//	        	    	latitudine:event.latLng.lat(), 
//	        	    	longitudine: event.latLng.lng()
//	        	    })
//	        	    
//	        	});
				clearInterval(this.interval);
			}
		}, 300);
      
    	
    }

});
