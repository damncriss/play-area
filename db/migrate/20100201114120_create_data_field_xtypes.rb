class CreateDataFieldXtypes < ActiveRecord::Migration
	def self.up
		create_table :data_field_xtypes do |t|
			t.string :name, :code
			t.timestamps
		end
		
		DataFieldXtype.create(:name => "Number", :code => "NO")
		DataFieldXtype.create(:name => "String", :code => "STR")
		DataFieldXtype.create(:name => "HTML", :code => "HTML")
		DataFieldXtype.create(:name => "Text", :code => "TEXT")
		DataFieldXtype.create(:name => "Date", :code => "DATE")
	end

	def self.down
		drop_table :data_field_xtypes
	end
end
