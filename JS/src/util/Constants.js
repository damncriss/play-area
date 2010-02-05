Ext.Constant = function(name){
	
	var ns=null
				
	ns = name.substring(0, name.lastIndexOf('.'))
	ns = Ext.ns(ns)
	
	this.name = name
	this.value = Ext.id()
	
	ns[name.substring(name.lastIndexOf('.')+1)] = this
	
	
	
	return{
		name: name,
		value: Ext.id()
	}
}

Ext.constants = (function() {
	var instance = null;
	var definedConstantNames = []

	function PrivateConstructor() {
		var rand = Math.round(Math.random() * 100);
		this.declare = function() {
			Ext.each( Ext.toArray(arguments), function(i){
				
				if( typeof i != 'string' ){
					throw new Error("string required for constant definition")
				}
				
				if( definedConstantNames.indexOf(i) != -1 ){
					throw new Error(["Constant",i,"already defined"].join(' '))
				}
				
				if( i.indexOf('.') == -1 ){
					throw new Error(["Use namespaces for declaring constants. Namespace",i, "invalid"].join(' '))
				}
				
				definedConstantNames.push(i)
				new Ext.Constant(i)

			})
		}
	}
	
	function getInstance(){
		
	}

	return new function() {
		this.getInstance = function() {
			if (instance == null) {
				instance = new PrivateConstructor();
				instance.constructor = null;
			}
			return instance;
		}
		this.declare = function(){
			this.getInstance().declare.apply(this, arguments)
		}
	}
})();

Ext.ct = function(name){
	Ext.constants.declare(name)
}