package("app.components.mainnav.mainnavbutton", function(require){
	require({css:["app.components.mainnav.mainnavbutton"]}, function(){
		
		var Button = Ext.extend(Ext.Button, {
			buttonSelector : 'button',
			template: new Ext.Template('<div class="main-nav-button"><div class="main-nav-icon"></div><div class="main-nav-button-overlay"></div><button></button></div>'),
			iconCls:'contacts_large',
			scale:'large',
			tooltip:'xxxxxx',
			menu:[{
					text:'xxx'
				},{
					text:'xxx'
				}],
			menuAlign:'tr',
			onRender: function(ct, position){
				
				var btn = this.template.append(ct, [], true);
				this.btnEl = btn.child(this.buttonSelector);
				this.iconEl = btn.child("div.main-nav-icon")
				this.mon(this.btnEl, {
				    scope: this,
				    focus: this.onFocus,
				    blur: this.onBlur
				});
				
				this.initButtonEl(btn, this.btnEl);
				
				Ext.ButtonToggleMgr.register(this);
				
			},
			setIconClass : function(cls){
				this.iconCls = cls;
				if(this.el){
					this.iconEl.dom.className = "";
					this.iconEl.addClass(['main-nav-icon', cls || '']);
				}
				
				return this;
			},
		})
		
		Ext.reg('mainnavbutton', Button)
		
		return{
			MainNavButton: Button
		}		
		
	})
})
