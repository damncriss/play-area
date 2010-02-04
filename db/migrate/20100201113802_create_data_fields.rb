class CreateDataFields < ActiveRecord::Migration
	def self.up
		create_table :data_fields do |t|
			t.string :name
			t.integer :data_field_xtype_id, :depth
			t.timestamps
		end
	end

	def self.down
		drop_table :data_fields
	end
end
