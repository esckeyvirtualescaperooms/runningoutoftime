!function(){var e={},c=0;pc.timer={},pc.timer.add=function(t,i,n){if(t>0){var a={};return a.id=c,e[c]={secsLeft:t,callback:i,scope:n},c+=1,a}return null},pc.timer.remove=function(c){c&&delete e[c.id]},pc.timer.update=function(c){for(var t in e){var i=e[t];i.secsLeft-=c,i.secsLeft<=0&&(i.callback.call(i.scope),delete e[t])}};var t=pc.Application.getApplication();t&&t.on("update",(function(e){pc.timer.update(e)}))}();var autoTP=pc.createScript("teleport"),threes=[3,-3];autoTP.attributes.add("durationSecs",{type:"number"}),autoTP.prototype.initialize=function(){this._paused=!1,this._timerHandle=pc.timer.add(this.durationSecs,this.moveToRandomPosition,this),this.on("destroy",(function(){pc.timer.remove(this._timerHandle)}),this)},autoTP.prototype.moveToRandomPosition=function(){this.entity.setPosition(threes[Math.floor(Math.random()*threes.length)],1.5,threes[Math.floor(Math.random()*threes.length)]),this._timerHandle=pc.timer.add(this.durationSecs,this.moveToRandomPosition,this)};var LookCamera=pc.createScript("look");LookCamera.attributes.add("camera",{type:"entity",description:"Optional, assign a camera entity, otherwise one is created"}),LookCamera.attributes.add("power",{type:"number",default:2500,description:"Adjusts the speed of player movement"}),LookCamera.attributes.add("lookSpeed",{type:"number",default:.25,description:"Adjusts the sensitivity of looking"}),LookCamera.prototype.initialize=function(){this.force=new pc.Vec3,this.eulers=new pc.Vec3;var e=this.app;e.mouse.on("mousemove",this._onMouseMove,this),e.mouse.on("mousedown",(function(){e.mouse.enablePointerLock()}),this),this.entity.collision||console.error("First Person Movement script needs to have a 'collision' component"),this.entity.rigidbody&&this.entity.rigidbody.type===pc.BODYTYPE_DYNAMIC||console.error("First Person Movement script needs to have a DYNAMIC 'rigidbody' component")},LookCamera.prototype.update=function(e){this.camera||this._createCamera();this.force,this.app,this.camera.forward,this.camera.right;this.camera.setLocalEulerAngles(this.eulers.y,this.eulers.x,0)},LookCamera.prototype._onMouseMove=function(e){(pc.Mouse.isPointerLocked()||e.buttons[0])&&(this.eulers.x-=this.lookSpeed*e.dx,this.eulers.y-=this.lookSpeed*e.dy)},LookCamera.prototype._createCamera=function(){this.camera=new pc.Entity,this.camera.setName("First Person Camera"),this.camera.addComponent("camera"),this.entity.addChild(this.camera),this.camera.translateLocal(0,.5,0)};