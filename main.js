Game.registerMod("luna_skin",{
	init:function(){		
		Game.Notify(`LunaSkin loaded!`,`Shine on, luna :3`,[30,8]);
		this.buttonClicks=0;

		l('storeTitle').insertAdjacentHTML('beforeend','<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="storeClicker"></a>');
		this.updateScore();

		let MOD=this;
		

		AddEvent(l('storeClicker'),'click',function(){
			PlaySound('snd/pop'+Math.floor(Math.random()*3+1)+'.mp3',0.5);
			MOD.buttonClicks+=1;
			MOD.updateScore();
			if (MOD.buttonClicks%20==0 && MOD.buttonClicks>0) Game.Notify(choose([`Splendid!`,`Keep going!`,`Amazing!`,`Incredible!`,`Outstanding!`]),'',0,2);
		});
		
		Game.registerHook('reset',function(hard){
			if (hard)
			{
				MOD.buttonClicks=0;
				MOD.updateScore();
			}
		});

		fetch('https://github.com/Umato/Umato.github.io/config.json')
		  .then(r => r.json())
		  .then(cfg => {
		    const path = cfg.Web.ImagesPath;
		    for (let k in cfg.Images) {
		      Game.Loader.Replace(k, path + cfg.Images[k]);
		    }
		    document.getElementById('bakeryName').textContent = 'luna Bakery';
		  });
	},
	save:function(){

		return String(this.buttonClicks);
	},
	load:function(str){
		this.buttonClicks=parseInt(str||0);
		this.updateScore();
	},
	updateScore:function()
	{
		l('storeClicker').innerHTML='Click me!<br>'+Beautify(this.buttonClicks);
	},
});
