Ext.ns('Ext.event')

Ext.event.Broadcast = new Ext.util.Observable()

Ext.override(Ext.util.Observable, {


    subscribeEvents: function() {
    	Ext.each(this.subscribers, function(item){

    		if( !(item instanceof Ext.Constant) ){
	    		throw new Error( "Use Ext.Constant instances for defining subscribed events" )
	    	}
	    	
	    	Ext.event.Broadcast.addEvents(item.value);

	    	var methodName = "respondTo"+item.name.substring(item.name.lastIndexOf('.')+1)

	    	if( this[methodName] ){
	    		Ext.event.Broadcast.on(item.value, this[methodName], this);
	    		
	    		if (this instanceof Ext.Component) this.on('destroy', function() {
		            Ext.event.Broadcast.removeListener(item.value, this[methodName], this);
		        }, this);
	    	}
	    	
    	}, this)
    	
        
	},

	broadcastEvent: function(ev, args){
		
		if( !(ev instanceof Ext.Constant) ){
    		throw new Error( "Use Ext.Constant instances for broadcasting events" )
    	}
		
		Ext.event.Broadcast.fireEvent.apply(Ext.event.Broadcast, [ev.value, args])
	}
})


Ext.util.Observable.prototype.constructor = Ext.util.Observable.prototype.constructor.createSequence(function(){
	this.subscribeEvents()
})

Ext.util.Observable.prototype.constructor = Ext.util.Observable.prototype.constructor.createInterceptor(function(){
	this.subscribers = this.subscribers || []
})

