class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
	t.integer :lft, :rgt, :user_id, :parent_id
	t.string :name
	
      t.timestamps
    end
  end

  def self.down
    drop_table :categories
  end
end
