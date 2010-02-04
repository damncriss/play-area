package("moduels.startpage", function(require){
	
	var Module = Ext.extend(Ext.Panel,{
		layout:'border',
		border:false,
		
		defaults:{
			split:true
		},
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			region:'center',
			items:[{
				title:'Comenzi noi'
			}]
		},{
			xtype:'tabpanel',
			region:'south',
			height:300,
			activeItem:0,
			items:[{
				title:'Mesaje noi'
			},{
				title:'Review-uri noi'
			},{
				title:'Utilizatori noi'
			}]
		}]
	})
	
})