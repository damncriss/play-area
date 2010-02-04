module ModelHistory

  def after_create_with_save_create_changes
    h = self.history.new(:operation_id => 1)
    h.save if before_create_history(h) != false
    after_create_without_save_create_changes
  end
  
  def after_update_with_save_update_changes
    self.class.columns_hash.keys.each do |column|
      if self.class.history_fields.map{|key| key.to_s}.include?(column.to_s) && self.send(column+"_changed?")
        h = self.history.new(:modified_field => column.to_s, :modified_value => self.send(column+"_was"), :operation_id => 2)
        h.save if before_create_history(h) != false
      end
    end
    after_update_without_save_update_changes
  end
  
  def after_destroy_with_save_destroy_changes
    self.history.new(:operation_id => 1)
    h.save if before_create_history(h) != false
    after_destroy_without_save_destroy_changes
  end
	
	module ClassMethods
		
		attr_reader :history_fields
    
    def before_create_history(historyInstance)
      
    end

  def keep_history(options={})
    if !options[:fields].nil?
      @history_fields = options[:fields]
      send :include, InstanceMethods
      
      alias_method_chain :after_create, :save_create_changes
      alias_method_chain :after_update, :save_update_changes
      alias_method_chain :after_destroy, :save_destroy_changes
    end
  end
		
		
		
		
	end
	
	module InstanceMethods
		def history
			if !Object.const_defined?(historyClassName)
				klass = Object.const_set(historyClassName, Class.new(ActiveRecord::Base))
				klass.table_name = historyTableName
			end
			historyClassName.constantize
		end
	end
	
	def self.included(base)
		base.send :extend, ClassMethods
		
		
	end
	
	
	private
		
	def historyClassName
		self.class.name+'History'
	end
	
	def historyTableName
		 ((ActiveRecord::Base.pluralize_table_names ? self.class.name.pluralize : self.class.name)+"History").underscore
	end
	
end

class ActiveRecord::Base
	include ModelHistory
end
