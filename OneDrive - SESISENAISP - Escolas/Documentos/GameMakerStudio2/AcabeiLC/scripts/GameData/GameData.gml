global.actionLibrary = 
{
	fraco: 
	{
		name : "Fraco",
		description : "{0} usou o ataque fraco!",
		subMenu : -1,
		targetRequired: true,
		targetEnemyByDefault : true,
		targetAll : MODE.NEVER,
		userAnimation: "attack",
		effectSprite : sAttackBonk,
		effectOnTarget : MODE.ALWAYS,
		func : function(_user, _targets)
		{
			var _damage = ceil(_user.strength + random_range(- _user.strength * 0.50, _user.strength * 0.50 ));
			BattleChangeHP(_targets[0], -_damage,0);
		}
	},
	fracoBoss: 
	{
		name : "Fraco",
		description : "{0} usou o ataque fraco!",
		subMenu : -1,
		targetRequired: true,
		targetEnemyByDefault : true,
		targetAll : MODE.NEVER,
		userAnimation: "attack",
		effectSprite : sSlimeAttack,
		effectOnTarget : MODE.ALWAYS,
		func : function(_user, _targets)
		{
			var _damage = ceil(_user.strength + random_range(- _user.strength * 0.50, _user.strength * 0.50 ));
			BattleChangeHP(_targets[0], -_damage,0);
		}
	},
	Normal: 
	{
		name : "Normal",
		description : "{0} usou o ataque normal!",
		subMenu : -1,
		mpCost: 3,
		targetRequired: true,
		targetEnemyByDefault : true,
		targetAll : MODE.NEVER,
		userAnimation: "attack",
		effectSprite : sAttackBonk,
		effectOnTarget : MODE.ALWAYS,
		func : function(_user, _targets)
		{
			var _damage = ceil(_user.strength + random_range(- _user.strength * 0.75, _user.strength * 0.75));
			BattleChangeHP(_targets[0], -_damage,0);
		}
	},
	NormalBoss: 
	{
		name : "Normal",
		description : "{0} usou o ataque normal!",
		subMenu : -1,
		mpCost: 10,
		targetRequired: true,
		targetEnemyByDefault : true,
		targetAll : MODE.NEVER,
		userAnimation: "attack",
		effectSprite : sSlimeAttack,
		effectOnTarget : MODE.ALWAYS,
		func : function(_user, _targets)
		{
			var _damage = ceil(_user.strength + random_range(- _user.strength * 0.75, _user.strength * 0.75));
			BattleChangeHP(_targets[0], -_damage,0);
		}
	},
	
	forte: 
	{
		name : "Forte",
		description : "{0} usou o ataque forte!",
		subMenu : -1,
		mpCost: 7,
		targetRequired: true,
		targetEnemyByDefault : true,
		targetAll : MODE.NEVER,
		userAnimation: "attack",
		effectSprite : sAttackBonk,
		effectOnTarget : MODE.ALWAYS,
		func : function(_user, _targets)
			{
			var _damage = irandom_range(10,15);
			 BattleChangeHP(_targets[0], -_damage);
			}
	},
	forteBoss: 
	{
		name : "Forte",
		description : "{0} usou o ataque forte!",
		subMenu : -1,
		mpCost: 15,
		targetRequired: true,
		targetEnemyByDefault : true,
		targetAll : MODE.NEVER,
		userAnimation: "attack",
		effectSprite : sSlimeAttack,
		effectOnTarget : MODE.ALWAYS,
		func : function(_user, _targets)
			{
			var _damage = irandom_range(10,15);
			 BattleChangeHP(_targets[0], -_damage);
			}
	},
	ice:
	{
		name: "Água",
		description: "{0} utilizou o medalhão!",
		subMenu: "Magic",
		mpCost: 10,
		targetRequired: true,
		targetEnemyByDefault: true,
		targetAll: MODE.VARIES,
		userAnimation: "cast",
		effectSprite: sAttackIce,
		effectOnTarget: MODE.ALWAYS,
		func: function(_user, _targets)
		{
			// Verificar se o usuário é Noah
			if (_user.name == "Noah") {
				// Tocar o efeito de som
				audio_play_sound(sndagua, 1, false);
			}
			var _damage = irandom_range(10,15);
			 BattleChangeHP(_targets[0], -_damage);
		}
},
	Fogo:
	{
		name: "Fogo",
		description: "{0} utilizou o ataque de fogo!",
		subMenu: "Magic",
		mpCost: 20,
		targetRequired: true,
		targetEnemyByDefault: true,
		targetAll: MODE.VARIES,
		userAnimation: "cast",
		effectSprite: sSlimeAttack,
		effectOnTarget: MODE.ALWAYS,
		func: function(_user, _targets)
		{
			if (_user.name == "Boss") {
				// Tocar o efeito de som
				audio_play_sound(sndfogo, 1, false);
			}
			var _damage = irandom_range(10,15);
			 BattleChangeHP(_targets[0], -_damage);
		}
	},
	defense:
	{
		
	    name: "Defender",
	    description: "{0} se defende!",
	    subMenu: -1,
	    mpCost: 3,
	    targetRequired: false,
	    effectOnTarget: MODE.NEVER,
	    userAnimation: "defend",
	    effectSprite: sLuluDefend,
	    func: function(_user, _targets) {
	        _user.isDefending = true; // Define isDefending como verdadeira
	        _user.sprite_index = _user.sprites.defend; // Atualiza a sprite para a sprite de defesa
	    
		}


	},
	regeneracao: {
	    name: "Cura",
	    description: "{0} recupera HP!",
	    subMenu: -1,
	    mpCost: 5, 
	    targetRequired: false, 
	    targetEnemyByDefault: false, 
	    targetAll: MODE.NEVER,
	    userAnimation: "cast", 
	    effectSprite: sAttackCure, 
	    effectOnTarget: MODE.NEVER,
	    func: function(_user, _targets) {
	    
	        var regenPercent = random_range(0.1, 0.25);
	        var regenAmount = ceil(_user.hpMax * regenPercent);
	       
	        _user.hp += regenAmount;
	 
	        if (_user.hp > _user.hpMax) _user.hp = _user.hpMax;
		}
	},
	regeneracaoboss: {
	    name: "Cura",
	    description: "{0} recupera HP!",
	    subMenu: -1,
	    mpCost: 5,
	    targetRequired: false,
	    targetEnemyByDefault: false, 
	    targetAll: MODE.NEVER, 
	    userAnimation: "cast", 
	    effectSprite: sAttackCure, 
	    effectOnTarget: MODE.NEVER, 
	    func: function(_user, _targets) {
			var regenPercent = random_range(0.05, 0.1);
	        var regenAmount = ceil(_user.hpMax * regenPercent);
	        
	        _user.hp += regenAmount;
	        if (_user.hp > _user.hpMax) _user.hp = _user.hpMax;
		}
	}
}



enum MODE
{
	NEVER = 0,
	ALWAYS = 1,
	VARIES = 2
}


//Dados dos personagens, assim como a separação se suas sprites
//personagens data
global.party = 
[
	{
		name: "Noah",
	    hp: 70,
	    hpMax: 70,
	    mp: 30,
	    mpMax: 30,
	    strength: 6,
	    sprites: { idle: sLuluIdle, attack: sLuluAttack, defend: sLuluDefend, down: sLuluDown, cast: sQuestyCast},
	    actions: [global.actionLibrary.fraco,  global.actionLibrary.Normal, global.actionLibrary.forte, global.actionLibrary.ice, global.actionLibrary.defense,  global.actionLibrary.regeneracao],
	    isDefending: false,
		animationTime: 0.40
		
}

	,
	{
		name: "Questy",
		hp: 28,
		hpMax: 44,
		mp: 20,
		mpMax: 30,
		strength: 4,
		sprites : { idle: sQuestyIdle, attack: sQuestyCast, cast: sQuestyCast, down: sQuestyDown},
		actions : [global.actionLibrary.fraco, global.actionLibrary.ice]
	}
]

//Inimigos Data
global.enemies =
{
	slimeG: 
	{
		name: "Boss",
		hp: 80,
		hpMax: 100,
		mp: 55,
		mpMax: 100,
		strength: 5,
		sprites: { idle: sSlime, attack: sSlime, defend: sSlime, cast: sSlime},
		actions: [global.actionLibrary.fracoBoss, global.actionLibrary.defense, global.actionLibrary.forteBoss, global.actionLibrary.NormalBoss,global.actionLibrary.Fogo, global.actionLibrary.regeneracaoboss],
		xpValue : 15,
		animationTime: 0.5,
		AIscript : function()
		{
			// Escolher uma ação aleatória do Boss
			var _action = self.actions[irandom(array_length(self.actions) - 1)];
			var _possibleTargets = array_filter(oBattle.partyUnits, function(_unit, _index)
			{
				return (_unit.hp > 0);
			});
			var _target = _possibleTargets[irandom(array_length(_possibleTargets) - 1)];
			return [_action, _target];
		}
	}
	,
	bat: 
	{
		name: "Bat",
		hp: 15,
		hpMax: 15,
		mp: 0,
		mpMax: 0,
		strength: 4,
		sprites: { idle: sBat, attack: sBatAttack},
		actions: [global.actionLibrary.Normal],
		xpValue : 18,
		AIscript : function()
		{
			//Ataque random
			var _action = actions[0];
			var _possibleTargets = array_filter(oBattle.partyUnits, function(_unit, _index)
			{
				return (_unit.hp > 0);
			});
			var _target = _possibleTargets[irandom(array_length(_possibleTargets)-1)];
			return [_action, _target];
		}
		
		
	}

}