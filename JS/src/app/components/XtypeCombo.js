
package("app.components.xtypecombo", function(){
	
	var XtypeCombo = function(config){
		Ext.apply(this, config)
		XtypeCombo.superclass.constructor.call(this)
	}
	
	Ext.extend(XtypeCombo, Ext.form.ComboBox,{
		store: new Ext.data.SimpleStore({
	        	fields: [
	           		{name: 'id', type: 'int'},
	           		{name: 'text', type: 'string'},
	           		{name: 'value', type: 'string'}
	        	],
	        	data:[
	        		["0", "String", "combo"],
					["1", "Numar", "numberfield"],
					["2", "Data", "datefield"],
					["3", "Text", "textarea"],
					["4", "HTML", "htmleditor"],
	        	]
	    	}),
		triggerAction:'all',
		mode:'local',
		displayField:'text',
		valueField:'text',
		editable:false
	})
	
	Ext.reg('xtypecombo',XtypeCombo)
	
	return{
		XtypeCombo: XtypeCombo
	}
	
})

