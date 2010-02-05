Ext.ux.ListLoader = function(config){
	Ext.apply(this, config)
}

Ext.extend(Ext.ux.ListLoader, Ext.tree.TreeLoader, {
	keyAttribute: 'id',
	keyField: 'parent_id',

	load: function(node, callback, scope){
		var key = this.keyField;


		var v = node.attributes[this.keyAttribute] == 0 ? '' : node.attributes[this.keyAttribute]
		var rs = this.store.queryBy(function(r){
			if( r.data[key] == null || r.data[key] == '' )
				r.data[key] = 0
			if ( r.data[key] == v ){
				return r.data
			}

			return
		})

		if( rs.items.length > 0 )
		
        for (var i = 0, d = rs.items, len = d.length; i < len; i++) {
        	
			var n = this.createNode(d[i].data);
			if (n) {
				node.appendChild(n);
			}
		}
		node.endUpdate();
		if(typeof callback == "function"){
            callback(this, node);
        }
	},
	createNode: function(attr) {
            	console.log(attr)
                if (!attr.uiProvider) {
                    attr.uiProvider = Ext.tree.ColumnNodeUI

                }
                return Ext.tree.TreeLoader.prototype.createNode.call(this, attr);
            }
})