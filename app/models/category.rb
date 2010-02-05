class Category < ActiveRecord::Base
	keep_history
	acts_as_nested_set
end
