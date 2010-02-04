package("shared.components.searchfield.searchfield", function(require){
	require({css:"shared.components.searchfield.searchfield"}, function(){
		
		var SearchField = Ext.extend(Ext.form.TwinTriggerField, {
		    initComponent : function(){
		        SearchField.superclass.initComponent.call(this);
		        this.on('specialkey', function(f, e){
		            if(e.getKey() == e.ENTER){
		                this.onTrigger2Click();
		            }
		        }, this);
		    },
		
		    validationEvent:false,
		    validateOnBlur:false,
		    trigger1Class:'x-form-clear-trigger',
		    trigger2Class:'x-form-search-trigger',
		    hideTrigger1:true,
		    width:180,
		    hasSearch : false,
		    fieldName : 'query',
		
		    onTrigger1Click : function(){
		        this.el.dom.value = '';
		        this.store.clearFilter()
		        this.triggers[0].hide();
		    },
		
		    onTrigger2Click : function(){
		        var v = this.getRawValue();
		        if( Ext.isEmpty(v.trim()) ){
		        	this.onTrigger1Click();
		        	return;
		        }
		        this.store.filter(this.fieldName, v, true, false)
		        this.triggers[0].show();
		    }
		});
		
		return{
			SearchField: SearchField
		}
		
	})
	
	
})

