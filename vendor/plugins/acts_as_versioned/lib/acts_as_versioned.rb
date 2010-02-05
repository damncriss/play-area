module ModelVersion
	
	def after_create_with_save_create_changes
		h = self.history.new(:operation_id => 1)
		h.save if before_create_history(h) != false
		after_create_without_save_create_changes
	end
	
	def copy_fields(from_model, to_model)
		
	end
	
end