package("shared.plugins.sortablelist.sortablelist", function(require){
	require({
		css:["shared.plugins.sortablelist.sortablelist"],
		js:["shared.plugins.sortablelist.dragzone", "shared.plugins.sortablelist.dropzone"]
	}, function(){
		
		var DragZone = this.inclusions.DragZone
		var DropZone = this.inclusions.DropZone
		
	    var Plugin = Ext.extend(Object,{
    	
	    	comp:null,
	    	
	    	init: function(comp){
	    		
	    		if(!(comp instanceof Ext.list.ListView) ){
	    			throw new Error("This plugin is usable for Ext.list.ListView instances")
	    		}
	    		this.comp = comp
	    		
	    		this.comp.mon(comp, 'afterrender', this.onAfterRender, this.comp)
	    		Ext.applyIf(this.comp, {
	    			ddReorder:true
	    		})
	    		
	    	},
	    	
	    	onAfterRender: function(list){
	    		list.getEl().child('.x-list-body').setStyle({float:'none'})
	    		
	    		if (this.ddReorder && !this.dragGroup && !this.dropGroup){
	            this.dragGroup = this.dropGroup = 'MultiselectDD-' + Ext.id();
	        }
	
	        if (this.draggable || this.dragGroup){
	            this.dragZone = new DragZone(this, {
	                ddGroup: this.dragGroup
	            });
	        }
	        if (this.droppable || this.dropGroup){
	            this.dropZone = new DropZone(this, {
	                ddGroup: this.dropGroup
	            });
	        }
	
	
	
	    	}
	    })

		return{
			SortableListPlugin:Plugin
		}

		
	})
})