Ext.define('vvf.standard.Standard',{
    alternateClassName: 'Standard',
    requires: [
    	'vvf.componenti.FloatingPanel'
    ],
    
    statics: {
       
        showErrorMsg(arrayErrorMsg) {

            if (arrayErrorMsg.length > 0) {
                let str = `<span><b>Attenzione</b></span><ul>`
                arrayErrorMsg.forEach(rec => {
                    str+=`<li>${rec}</li>`;
                });
                str += `</ul>`;
                this.messaggio(`<center>errori trovati: ${arrayErrorMsg.length}</center>`, str,'OK','ERROR');
            }
            return !arrayErrorMsg.length > 0
        },

        addErrorMsg(messaggi, textMessage) {
            messaggi.push(textMessage);
        },

        messaggio(title, text, buttons, icon, callback_ok, callback_yes, callback_no) {
            
            Ext.Msg.show({
                title: title,
               // width: 600,
                message: text,
                buttons: Ext.Msg[buttons],
                icon: Ext.Msg[icon],
                fn: function(btn) {
                    if (btn === 'ok') {
                        if (callback_ok) {
                            callback_ok();
                        }
                    } else if (btn === 'no') {
                        if (callback_no) {
                            callback_no();
                        }
                    } else if(btn === 'yes') {
                        if (callback_yes) {
                            callback_yes();
                        }
                    }
                }
            });
            
        },

        onAjaxRequest() {
            Ext.Ajax.on('requestexception', function(conn, response, options) {
               this.messaggio('Attenzione', response.responseText, 'OK','ERROR');
               this.endLoading();
            }, this);
            
            Ext.Ajax.on('requestcomplete', function(conn, response, options) {
            	this.endLoading();
            }, this);
            
            Ext.Ajax.on('beforerequest', function(conn, response, options) {
            	this.startLoading();
            }, this);
        },
        
        startLoading() {
         	//Ext.getBody().mask(' ');
        	let bodyEl = Ext.getBody(),
        		bodyCmp = Ext.getBody().component;
        	
        	bodyCmp.panel = bodyCmp.add(
        		Ext.create('floatingPanel', {})
			)
			bodyCmp.panel.showBy(bodyEl);
        },
        
        endLoading() {
        	let body = Ext.getBody().component;
        	if(body.panel)
        		body.panel.hide();
        },

        salvaRecord(component = null, record = null) {
            let store = component.store,
                controller = component.controller;
            
            if (!store)
                throw "nessuno store passato al componente";
            
            if (!controller)
                throw "nessuno store passato al componente";
            
            let {id} = record,
                url = '';
           
            if (Ext.isEmpty(id) || id === -9999) {
                url = store.getProxy().api.create;
                
                if (id === -9999) record.id = null;
                
            } else {
                url = store.getProxy().api.update;
            } 
            
            Ext.Ajax.request({
                method: 'POST',
                url: url,
                jsonData: record,
                success: (response, opts) => {
                    let risposta = JSON.parse(response.responseText);
                    if (risposta.success) {
                         let newId = risposta.data.id;
                         controller.aggiornaStore(newId);
                         this.toastMsgShow('Attenzione', risposta.message[0]);
                    } else { 
                        this.showErrorMsg(risposta.message);
                    }
                }
            });
        },
        toastMsgShow(title, messagge) {
            Ext.toast({
                title: 'Attenzione',
                width: 400,
                height: 130,
                html: '<div style="vertical-align: middle;line-height: 6;text-align:center; font-weight: bold;">' + messagge + '</div>',
                align: 't'
            });
        },
        eliminaRecord(store, id = null, callBackFnAfterDelete = null) {
            
            if (!store)
                throw "nessuno store passato al componente";
            
            if (id) {
                
                let url = store.getProxy().api.destroy;
                
                this.messaggio('Attenzione', 'Confermare l\'eliminazione del dato?','YESNO', 'QUESTION',false, () => {
                        Ext.Ajax.request({
                            method: 'GET',
                            url: url,
                            params: { id },
                            success: (response, opts) => {
                                
                                let risposta = JSON.parse(response.responseText);
                                if (risposta.success) {
                                   
                                    this.toastMsgShow('Attenzione', risposta.message[0]);
                                   
                                    if (callBackFnAfterDelete) {
                                        callBackFnAfterDelete();
                                    }
                                } else {
                                    this.showErrorMsg(risposta.message);
                                }
                            }
                        });
                    });
            } 
        },
        trovaRecord(store, field, value) {
            return store.findRecord(field, value);
        },
        doLogout() {
        	
        	Ext.Ajax.request({
                method: 'GET',
                url: '/vvfriva2/ws/auth/logout',
                success: (response) => { 
                    let risposta = Ext.decode(response.responseText);
                    if (risposta.success) {
                    	localStorage.setItem('isLogin', false); 
                        window.location.href = ''
                    } 
                }
            });
        },
        doLogin(username, password, callback_login) {
        	Ext.Ajax.request({
                method: 'POST',
                url: '/vvfriva2/ws/auth/login',
                params: {
                	username: username,
                	password: password
                },
                success: (response) => { 
                    let risposta = Ext.decode(response.responseText);
                    if (risposta.success) {
                    	localStorage.setItem('isLogin', true);
                        if (callback_login) {
                            callback_login();
                       }
                        
                    }else { 
                        this.showErrorMsg(risposta.message);
                    }
                }
            });
        },
        
        renderCellCalendar(value, metaData) {
        	return '<div class="table"><div class="table-inner"><p style="margin-left: 12px;">' + value + '<p></div></div>';
        },
        
        getFirstDayOfWeek(date) {
          let d = new Date(date);
   		 	  day = d.getDay(),
   		      diff = d.getDate() - day + (day === 0 ? -6 : 1); 
   		 	  
   		  return new Date(d.setDate(diff));
        },
        
        getLastDayOfWeek(date) {
	    	let first = this.getFirstDayOfWeek(date),
	 		    diff = first.getDate() + 6; 
	 		  return new Date(first.setDate(diff));
        },
        
        formattaData(data) {
        	return Ext.Date.format(data, 'd/m/Y');
        },
        
        doPrint(config, callback) {
        	
        	let url = config.url,
        		title = config.title
        	delete config.url; 
        	delete config.title;
        	Ext.Ajax.request({
                method: 'GET',
                url: url,
                params: config,
                success: (response, opts) => {
                    let risposta = JSON.parse(response.responseText);
                    if (risposta.success) {
                    	
                    	let win = Ext.create('stdWin', {
                       	 width: 1024,
                       	 height: 600,
                       	 title: title,
                       	 items: [
                       		 {
                       			 xtype: 'container',
                       			 layout: {
                       				 type: 'vbox',
                       				 align: 'stretch'
                       			 },
                       			 flex: 1,
                       			 items: [
                       				 {
                       					 xtype: 'container',
                       					 flex: 1,
                       					 html: `<iframe src=${risposta.data.path} width="100%" height="100%"></iframe>`
                       				 }
                       			 ]
                       		 }
                       	 ]
                        });
                        win.show();
                    	
                         if (callback)
                        	 callback();
                         
                         
                         
                    } else { 
                        this.showErrorMsg(risposta.message);
                    }
                }
            });
        }
    }
});