/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('Ext.ux.tree');

/**
 * @class Ext.ux.tree.ColumnTree
 * @extends Ext.tree.TreePanel
 * 
 * @xtype columntree
 */
Ext.ux.tree.ColumnTree = Ext.extend(Ext.tree.TreePanel, {
    lines : false,
    borderWidth : Ext.isBorderBox ? 0 : 2, // the combined left/right border for each cell
    cls : 'x-column-tree',

    onRender : function(){
        Ext.ux.tree.ColumnTree.superclass.onRender.apply(this, arguments);
        this.headers = this.header.createChild({cls:'x-tree-headers'});

        var cols = this.columns, c;
        var totalWidth = 0;
        var scrollOffset = 19; // similar to Ext.grid.GridView default

        for(var i = 0, len = cols.length; i < len; i++){
             c = cols[i];
             totalWidth += c.width;
             this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     html: c.header
                 },
                 style:'width:'+(c.width-this.borderWidth)+'px;'
             });
        }
        this.headers.createChild({cls:'x-clear'});
        // prevent floats from wrapping when clipped
        this.headers.setWidth(totalWidth+scrollOffset);
        this.innerCt.setWidth(totalWidth);
    },
    
    initComponent: function()
      {
          Ext.ux.tree.ColumnTree.superclass.initComponent.apply(this, arguments);
          this.addEvents('beforecelledit');
          for (var i = 0; i < this.columns.length; i++)
          {
              var col = this.columns[i];

              if (col.editor)
              {
                  var editor = new Ext.tree.ColumnTreeEditor(this, col.dataIndex, col.editor);
                  this.editor = editor;
              }
          }
      }

});

Ext.reg('columntree', Ext.ux.tree.ColumnTree);



