Ext.define('vvf.componenti.Avatar', {
    extend: 'Ext.container.Container',
    alias: 'widget.avatar',
    alternateClassName: 'avatar',
    
	initComponent: function( config ) {
        this.height = this.height || 30;
        this.width = this.width || 30;
        this.style = {};
       
        Ext.apply(this.style, {
            background: this.background,
            color: this.color,
            border: '1px solid ' + this.color,
            textAlign: 'center'
        });

        if (this.round) {
            Ext.apply(this.style, {
                borderRadius : '50%'
            });
        }

       
		this.callParent();
	}
});