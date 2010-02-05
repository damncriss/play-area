Ext.ns("App.packageLoader")

App.packageLoader.Package = Ext.extend(Ext.util.Observable, {
	
	inclusions: {},
	
	constructor: function(name, packageConstr, manager){
		
		this.packageConstr = packageConstr
		this.name = name.toLowerCase()
		this.addEvents("ready")
		this.dependencies = []
		this.manager = manager
		
		this.manager.registerPackage(this.name)
		
		this.dependenciesReady()
		
		
	},
	
	require: function(dependencies, callback){
		this.packageConstr = callback
		
		if( Ext.isObject(dependencies) ){
			Ext.applyIf(dependencies,{
				js:[],
				css:[]
			})
			if( typeof dependencies.css == 'string' ){
				dependencies.css = [dependencies.css]
			}
			if( typeof dependencies.js == 'string' ){
				dependencies.js = [dependencies.js]
			}
			Ext.each(dependencies.css, function(item, index){
				dependencies.css[index] = "css#"+dependencies.css[index]
			})
			
			dependencies = dependencies.css.concat(dependencies.js)
		}
		
		if( typeof dependencies == 'string' ){
			return this.require([dependencies], callback)
		}
		
		this.dependencies = dependencies
		
		Ext.each(this.dependencies, function(dependency){
			dependency = dependency.toLowerCase()
			this.manager.loadPackage(dependency, this.dependencyReady.createDelegate(this))
		}, this)
		
	},
	
	dependencyReady: function(name){
		
		var dep = this.manager.getPackageDefinition(name)
		
		if( Ext.isObject(dep) ){
			for(var key in dep){
				this.inclusions[key] = dep[key]
			}
		}
		
		this.dependencies.splice(this.dependencies.indexOf(name),1)
		if( this.dependencies.length == 0 ){
			this.dependenciesReady()
		}
	},
	
	dependenciesReady: function(){
		var res = this.packageConstr.call(this, this.require.createDelegate(this))
		if( typeof res != 'undefined' ){
			this.manager.initPackage(this.name, res)
			this.fireEvent("ready", this)
		}
	}
	
})


App.packageLoader.PackageManager = (function(){
	
	var obj = Ext.extend(Object,{
		
		loadingPackages: [], //  packages definition loading
		registeredPackages: [], // package definition loaded but not fully executed
		initializedPackages: [], // package definition usable
		
		packageExecCallbacks:{},
		
		provider: null,
		packageReferences: {},
		
		
		getPackageAvailableForLoading: function(name){

			
			if( this.loadingPackages.indexOf(name) !=-1 ){
				return false
			}
			
			if( this.registeredPackages.indexOf(name) !=-1 ){
				return false
			}
			
			if( this.initializedPackages.indexOf(name) !=-1 ){
				return false
			}

			return true
		},
		
		setPackageDefinition: function(name, def){
			this.packageReferences[name] = def
		},
		
		getPackageDefinition: function(name){
			return this.packageReferences[name]
		},
		
		getPackageType: function(name){
			return name.indexOf("css#") != -1 ? "css" : "js"
		},
		
		createPackageDefinition: function(name, constr){
			return new App.packageLoader.Package(name, constr, this)
		},
		
		constructor: function(){
			
			this.initProvider()
			
		},
		
		initProvider: function(){
			var providerNs = Ext.id();
	
			Ext.Direct.addProvider({
				type:"remoting",
				url:"/direct",
				actions:{
					"admin::main":[{
						"name":"load", // name of method
						"len":1
					}]
				},
				"namespace":providerNs
			})
			
			this.provider = Ext.ns(providerNs)["admin::main"]
			providerNs = null
		},
		
		registerPackage: function(name){
			this.registeredPackages.push(name)
			if( this.loadingPackages.indexOf(name) != -1 ){
				this.loadingPackages.splice( this.loadingPackages.indexOf(name), 1 )
			}
			
		},
		
		initPackage: function(name, packageDefinition){
			if( this.initializedPackages.indexOf(name) != -1 ){
				
				throw new Error(["package",name,"already defined"].join(" "))
			}
			
			this.setPackageDefinition(name, packageDefinition)
			
			this.initializedPackages.push(name)
			
			this.registeredPackages.splice( this.registeredPackages.indexOf(name), 1 )
			
			
		
			var ns = Ext.ns(name)
			
			for( var key in packageDefinition ){
				ns[key] = packageDefinition[key]
			}
			console.log(["package",name,"executed"].join(" "))

			this.runPackageExecCallbacks(name)
			
		},
		
		loadPackage: function(name, successCallback, failureCallback){
			
			this.addPackageExecCallbacks(name, successCallback)

			if( !this.getPackageAvailableForLoading(name) ){
				if( this.initializedPackages.indexOf(name) != -1 ){
					this.runPackageExecCallbacks(name);
					return
				}else{
					return
				}
			}
			
			this.loadingPackages.push(name)
			
			this.provider.load({name:name.replace("css#",""),type:this.getPackageType(name)}, function(result, e){
			
				this[e.status ? "handlePackageLoadSucceeded" : "handlePackageLoadFailure"](name, result, e.status ? successCallback : failureCallback )
				
				
			}.createDelegate(this))
		},
		
		handlePackageLoadSucceeded: function(name, result, callback){
			if( result ){
				if( this.getPackageType(name) == "js" ){
					this.createJsReference(result.content)
				}else{
					this.createCssReference(result.content)
					this.runPackageExecCallbacks(name);
					this.initializedPackages.push(name)
					this.loadingPackages.remove(name)
				}
				
			}
			
			if( typeof callback == 'function' ){
		//		callback.call(name)
			}
			
		},
		
		handlePackageLoadFailure: function(name, result, callback){
			
			if( typeof callback == 'function' ){
		//		callback.call(name)
			}
		},
		
		createJsReference: function(content){
			var scriptRef = document.createElement("script")
			scriptRef.type = "text/javascript"
			scriptRef.innerHTML = content
			document.body.appendChild(scriptRef)
		},
		
		createCssReference: function(content){
			var cssRef = document.createElement("style")
			cssRef.type = "text/css"
			cssRef.innerHTML = content
			document.body.appendChild(cssRef)
		},
		
		runPackageExecCallbacks: function(name){
			if( this.packageExecCallbacks[name] ){
				while(this.packageExecCallbacks[name].length > 0){
					var callback = this.packageExecCallbacks[name].shift()
					callback.call(callback, name)
				}
			}
			
		},
		
		addPackageExecCallbacks: function(name, callback){
			if( !this.packageExecCallbacks[name] ){
				this.packageExecCallbacks[name] = []
			}
			this.packageExecCallbacks[name].push(callback)
		}
		
		
		
	})
	
	return new obj();
	
})()


function package(name, constr){
	return App.packageLoader.PackageManager.createPackageDefinition(name, constr)
}


function require(inclusionDef, constr){
	var tempPackageName = Ext.id()
	
	
	var  p = package(tempPackageName, function(require){
		require(inclusionDef,function(){
			return{}
		})
	})
	
	
	p.on('ready', function(){
		
	
		constr.call(p)
		delete window[tempPackageName]
	})
	
	
	
}