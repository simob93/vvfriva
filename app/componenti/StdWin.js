Ext.define('vvf.componenti.StdWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.stdWin',
    alternateClassName: 'stdWin',

    maximizable: false,
    padding: 4,
    modal: true,
    layout: 'fit',
    //cls: 'animated bounceInDown',

	initComponent: function( config ) {
        
        if (this.view) {
            let view = Ext.create(this.view, {
                vvfConfig: this.vvfConfig || {}
            });
            this.items = [view];
        }
		this.callParent();
	}
});