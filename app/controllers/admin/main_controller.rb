class Admin::MainController < ApplicationController
	include Rails::ExtJS::Direct::Controller
	
	def index
		#render :text => DataFieldXtype.all.to_json
	end
	
	def load
		
		content = get_package_content
		
		res = XResponse.new(@xrequest)
		res.status = !content.blank?
		res.message = "admin::main#load"
		res.result = {:content => content}
		render(:json => res)

	end
	
	private
	
	def get_package_content()
		
		filename = [RAILS_ROOT, 'js','src'].concat( @xrequest.params["name"].to_s.split('.') ).join('/')+'.'+@xrequest.params["type"]

		if File.exists?(filename) 
			data = ''
			f = File.open(filename, "r") 
			f.each_line do |line|
				data += line
			end
		end
		
		return data

	end

end
