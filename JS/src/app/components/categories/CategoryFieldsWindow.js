package("app.components.categories.categoryfieldswindow", function(require){
	require({
		js:["shared.ui.layout.columnFitLayout", "shared.ui.view.BufferView", "app.components.XTypeCombo", "shared.components.searchfield.SearchField", "shared.components.roweditor.RowEditor", "shared.plugins.sortablelist.sortablelist"], 
		css:["shared.ui.styles.icons"]}, function(){
	

	var pkg = this



    
    
	    var CategoryFieldsWin = function(config){
	    	
	    	this.store = config.store
	    	
	    	var editor = new pkg.inclusions.RowEditor({
				saveText: 'Update'
			});
	    	
	    	config = Ext.apply({
				title:'test',
				layout:'columnfit',
				width:750,
				height:500,
				split:true,
				border:false,
		//		subscribers:[comp.TestEvent],
				respondToTestEvent: function(x){
					console.log(x)
				},
				bodyStyle:{
					background:'#ced9e7'
				},
				
				buttonAlign:'center',
		    	items: [{
					title: 'Available items',
					columnWidth: .6,
					xtype:'grid',
					store:this.store,
					plugins:[editor],
					autoExpandColumn: 'name',
					enableDragDrop:true,
		
			        columns: [
		        new Ext.grid.RowNumberer(),
		        {
		            id: 'name',
		            header: 'Name',
		            dataIndex: 'name',
		            width: 220,
		            sortable: true,
		            editor: {
		                xtype: 'textfield',
		                allowBlank: false
		            }
		        },{
		            header: 'Xtype',
		            dataIndex: 'xtype',
		            width: 70,
		            sortable: true,
		            editor: {
		                xtype: 'xtypecombo',
		                allowBlank: false
		            }
		        },{
		            header: 'Active',
		            dataIndex: 'mandatory',
		            align: 'center',
		            width: 50,
		            trueText: 'Yes',
		            falseText: 'No',
		            editor: {
		                xtype: 'checkbox'
		            }
		        }],
		
					bbar:{
						items:[{
							text:'Add item',
							tooltip:'Add new item',
							iconCls:'plus_circle_frame'
						},'-',{
							text:'Remove item',
							tooltip:'remove selected item',
							iconCls:'minus_circle_frame'
						},'->',{
							text:'Refresh',
							iconCls:'refresh',
							tooltip:'Refresh available list'
						}]
					},
					tbar: {
						layout:'columnfit',
						items:[{
							text:'Search',
							xtype:'tbtext',
							width:60
						},
							new pkg.inclusions.SearchField({
								store:this.store,
								columnWidth:1,
								fieldName:'email'
							})
		
						]
						
					}
				},{
					layout:'vbox',
					layoutConfig:{
						padding:10,
						pack:'center',
						align:'center'
					},
					width:40,
					defaults:{
						xtype:'button',
						margins:'0 0 5 0',
		
					},
					bodyStyle:{
						background:'transparent'
					},
		        	border:false,
		        	items:[{
						iconCls:'arrow_up_stop',
						tooltip:'Move top'
					},{
						iconCls:'arrow_up',
						tooltip:'Move up'
					},{
						iconCls:'arrow_right',
						tooltip:'Add'
					},{
						iconCls:'arrow_left',
						tooltip:'Remove'
					},{
						iconCls:'arrow_down',
						tooltip:'Move down'
					},{
						iconCls:'arrow_down_stop',
						tooltip:'Move bottom',
						handler: function(){
						//	this.broadcastEvent(comp.TestEvent,"asd")
						}
					}]
			    },{
			        title: 'Selected items',
			        columnWidth: .4,
			        layout:'fit',
			        items:[{
			        	xtype:'listview',
				        multiSelect: true,
						store: this.store,
						columns: [{ header: 'Value', width: 1, dataIndex: 'name' }],
						hideHeaders:true,
						ddReorder:true,
						plugins:[ new pkg.inclusions.SortableListPlugin() ]
			    	}]
					
			    }],
			    buttons:[{
			    	text:'Save'
				},{
					text:'Cancel'
				}]
			}, config)
			
			
			CategoryFieldsWin.superclass.constructor.call(this, config)
		}
	
			
		Ext.extend(CategoryFieldsWin, Ext.Window,{
			
		})
		
		return{
			CategoryFieldsWin:CategoryFieldsWin
		}

		
	})
	
})