class <%= class_name %> < ActiveRecord::Migration
  def self.up
  	sql = ActiveRecord::Base.connection();
  	sql.execute "drop table if exists <%=table_name %>"
	sql.execute "create table <%= table_name %> like <%=original_table_name%>";
	sql.execute "alter table <%=table_name%> add parent_id after id"
	sql.execute "alter table <%=table_name%> add version_no not null auto_increment default 0"
  end

  def self.down
    drop_table  :<%= table_name %>
  end
end
