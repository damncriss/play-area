package("shared.plugins.sortablelist.dragzone", function(require){

		
    var DragZone = Ext.extend(Ext.dd.DragZone,{
    	
    	constructor: function(comp, config){
    		this.comp = comp
    		var ddGroup = config.ddGroup || "SortableListDD"
    		
    		DragZone.superclass.constructor.call(this, this.comp.getEl(), { containerScroll: true, ddGroup: ddGroup });
    	},
    	
    	onInitDrag: function(x, y){
    		console.log(arguments)
			var el = Ext.get(this.dragData.ddel.cloneNode(true));
			this.proxy.update(el.dom);
			el.setWidth(el.child('em').getWidth());
		//	this.onStartDrag(x, y);
		
			return true;
    	},
    	
		onEndDrag: function(data, e) {
			var d = Ext.get(this.dragData.ddel);
			if (d && d.hasClass("multi-proxy")) {
				d.remove();
			}
		},
		
		getRepairXY : function(e){
			return this.dragData.repairXY;
		},
		
		getDragData: function(e){
			
			var target = this.comp.findItemFromChild(e.getTarget());
			if(target) {
				if (!this.comp.isSelected(target) && !e.ctrlKey && !e.shiftKey) {
					this.comp.select(target);
//					this.comp.setValue(this.comp.getValue());
				}
				if (this.comp.getSelectionCount() == 0 || e.ctrlKey || e.shiftKey){
					return false
				}
				
				var dragData = {
					sourceView: this.comp,
					viewNodes: [],
					records: []
				};
				
				if (this.comp.getSelectionCount() == 1) {
					var i = this.comp.getSelectedIndexes()[0];
					var n = this.comp.getNode(i);
					dragData.viewNodes.push(dragData.ddel = n);
					dragData.records.push(this.comp.store.getAt(i));
					dragData.repairXY = Ext.fly(n).getXY();
				} else {
					dragData.ddel = document.createElement('div');
					dragData.ddel.className = 'multi-proxy';
					this.collectSelection(dragData);
				}
				return dragData;
			}
			return false;
		},
		
		collectSelection: function(data) {
			data.repairXY = Ext.fly(this.comp.getSelectedNodes()[0]).getXY();
			var i = 0;
			this.comp.store.each(function(rec){
				if (this.comp.isSelected(i)) {
					var n = this.comp.getNode(i);
					var dragNode = n.cloneNode(true);
					dragNode.id = Ext.id();
					data.ddel.appendChild(dragNode);
					data.records.push(this.comp.store.getAt(i));
					data.viewNodes.push(n);
				}
				i++;
			}, this);
		}
    })
    
    return{
    	DragZone:DragZone
    }
		
})