class CreateVersionForXxx < ActiveRecord::Migration
  def self.up
  	sql = ActiveRecord::Base.connection();
  	sql.execute "drop table if exists xxx_versions"
	sql.execute "create table xxx_versions like xxxes";
	sql.execute "alter table xxx_versions add int parent_id after id"
  end

  def self.down
    drop_table  :xxx_versions
  end
end
