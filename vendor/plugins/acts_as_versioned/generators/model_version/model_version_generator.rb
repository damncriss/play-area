class ModelVersionGenerator < Rails::Generator::NamedBase
	def manifest
		record do |m|
			m.migration_template 'migrate/create_version.rb', "db/migrate", {:assigns => local_assigns,
				:migration_file_name => migration_file_name
			}
		end
	end
	
	private
	
	def migration_file_name
		"create_version_for_#{class_name.underscore.downcase}"
	end
	
	def migration_class_name
		migration_file_name.split('_').collect { |word| word.capitalize }.join
	end
	
	def migration_table_name
		(class_name+"Versions").underscore
	end
	
	def original_table_name
		(ActiveRecord::Base.pluralize_table_names ? class_name.pluralize : class_name).underscore
	end
  
	def local_assigns
		returning(assigns = {}) do
			assigns[:migration_action] = "create"
			assigns[:class_name] = migration_class_name
			assigns[:table_name] = migration_table_name
			assigns[:original_table_name] = original_table_name
		end
	end
end
