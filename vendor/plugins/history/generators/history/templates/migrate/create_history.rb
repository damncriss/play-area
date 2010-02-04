class <%= class_name %> < ActiveRecord::Migration
  def self.up
    create_table :<%= table_name %> do |t|
		t.string :modified_field, :modified_value
		t.integer :user_id, :operation_id
		t.timestamps
    end
  end

  def self.down
    drop_table  :<%= table_name %>
  end
end
