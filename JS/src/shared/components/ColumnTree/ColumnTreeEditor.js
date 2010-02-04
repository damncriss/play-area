Ext.tree.ColumnTreeEditor = function(tree, colIndex, editorConfig)
{
    var field;

    if (editorConfig.xtype)
    {
        field = new Ext.ComponentMgr.create(editorConfig);
        Ext.tree.ColumnTreeEditor.superclass.constructor.call(this, field);
    }
    else
    {
        field = {};
    }

    this.tree = tree;
    this.columnIndex = colIndex;

    if (! this.tree.rendered)
    {
        this.tree.on('render', this.initEditor, this);
    }
    else
    {
        this.initEditor(this.tree);
    }
};

Ext.extend(Ext.tree.ColumnTreeEditor, Ext.Editor,
{
    onTargetBeforeClick: function(node, event)
    {
        var sinceLast = (this.lastClick ? this.lastClick.getElapsed() : 0);
        this.lastClick = new Date();

        if (sinceLast <= this.editDelay || !this.tree.getSelectionModel().isSelected(node))
        {
            this.completeEdit();
        }
        var obj = event.target;

        if (Ext.select('.x-tree-node-anchor', false, obj).getCount() == 1)
        {
            obj = Ext.select('.x-tree-node-anchor', false, obj).elements[0].firstChild;
        }

        if (obj.nodeName != 'SPAN' && obj.nodeName != 'DIV')
        {
            return true;
        }
        var colIndex = 0;

        if (this.tree.fireEvent('beforecelledit', this.tree, node, this.columnIndex) === false)
        {
            return true;
        }

        var elt = Ext.Element.fly(obj);
        if (elt.hasClass('x-tree-col-' + this.columnIndex))
        {
            this.triggerEdit(node, event, this.columnIndex);
            event.stopEvent();
            return false;
        }
        else
        {
            return true;
        }
    },
    alignment: 'l-l',
    autoSize: false,
    hideEl: false,
    cls: 'x-small-editor x-tree-editor',
    shim: false,
    shadow: 'frame',
    maxWidth: 250,
    editDelay: 0,
    initEditor: function(tree)
    {
        this.tree.on('beforeclick', this.onTargetBeforeClick, this);
        this.on('complete', this.updateNode, this);
        //this.on('beforestartedit', this.fitToTree, this);
        this.on('startedit', this.bindScroll, this,
        {
            delay: 10
        });

        this.on('specialkey', this.onSpecialKey, this);
    },
    fitToTree: function(ed, el)
    {
        var td = this.tree.getTreeEl().dom, nd = el.dom;

        if (td.scrollLeft > nd.offsetLeft)
        {
            td.scrollLeft = nd.offsetLeft;
        }
        var w = Math.min(this.maxWidth, (td.clientWidth > 20 ? td.clientWidth : td.offsetWidth) - Math.max(0, nd.offsetLeft - td.scrollLeft) - 5);
        this.setSize(w, '');
    },
    triggerEdit: function(node, e, colIndex)
    {
        var obj = e.target;

        if (Ext.select('.x-tree-node-anchor', false, obj).getCount() == 1)
        {
            obj = Ext.select('.x-tree-node-anchor', false, obj).elements[0].firstChild;
        }
        else if (obj.nodeName == 'SPAN' || obj.nodeName == 'DIV')
        {
            obj = e.target;
        }
        else
        {
            return false;
        }

        this.completeEdit();
        this.editNode = node;
        this.editCol = obj;
        this.editColIndex = colIndex;
        this.startEdit(obj);

        if (obj.nodeName == 'DIV')
        {
            var width = obj.offsetWidth;
            this.setSize(width);
        }
      },
      bindScroll: function()
      {
          this.tree.getTreeEl().on('scroll', this.cancelEdit, this);
      },
      beforeNodeClick: function(node, e)
      {
          var sinceLast = (this.lastClick ? this.lastClick.getElapsed() : 0);
          this.lastClick = new Date();

          if (sinceLast > this.editDelay && this.tree.getSelectionModel().isSelected(node))
          {
              e.stopEvent();
              this.triggerEdit(node, e);
              return false;
          }
          else
          {
              this.completeEdit();
          }
      },
      updateNode: function(ed, value)
      {
          if (value != '' && value != this.editCol.innerHTML)
          {
              value = (this.editNode.renderers[this.editColIndex].renderer ? this.editNode.renderers[this.editColIndex].renderer(value) : value);
              this.tree.getTreeEl().un('scroll', this.cancelEdit, this);
              this.editNode.cols[this.editColIndex] = value;       //for internal use only
              this.editNode.attributes[this.editColIndex] = value; //duplicate into array of node attributes
              this.editCol.innerHTML = value;
          }
      },

      onHide: function()
      {
          Ext.tree.ColumnTreeEditor.superclass.onHide.call(this);
          if (this.editNode)
          {
              this.editNode.ui.focus();
          }
      },
      onSpecialKey: function(field, e)
      {
          var k = e.getKey();

          if (k == e.ESC)
          {
              e.stopEvent();
              this.cancelEdit();
          }
          else if (k == e.ENTER && !e.hasModifier())
          {
              e.stopEvent();
              this.completeEdit();
          }
      }
});