var stage5 = {
	preload: function() {
		game.load.image('background', 'pic/stage5.jpg');
		game.load.spritesheet('redo','pic/redo.png', 59, 51);
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
		game.load.image('bar', 'pic/bar.png');
		game.load.image('barNgang', 'pic/bar-ngang.png');
		game.load.image('barMini', 'pic/bar-mini.png');
		game.load.image('sword', 'pic/sword.png');
		game.load.spritesheet('player','pic/yosh.png', 15.8, 18);
		game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.audio('sfx2', 'sound/Eat2.ogg');
		game.load.audio('sfx3', 'sound/Explode.ogg');
		game.load.audio('music', 'sound/Theme5.ogg');
		game.load.image('portalBlue', 'pic/portalBlue.png');
		game.load.image('GoldenSword', 'pic/GoldenSword2.png');
		game.load.image('heart', 'pic/heart.png');
		game.load.spritesheet('explode','pic/exp2.png', 65, 61);
		game.load.image('fire', 'pic/Chalizard.gif');
		game.load.image('portal', 'pic/portal.png');
	},
	
	create: function() {
		game.add.sprite(0, 0, 'background');
		
		// Add Sound
		this.sfx1 = game.add.audio('sfx1');
		this.sfx2 = game.add.audio('sfx2');
		this.sfx3 = game.add.audio('sfx3');
		this.music = game.add.audio('music');
    	this.music.play();

        // Add GoldenSword
		this.GoldenSword = game.add.sprite(280, 170, 'GoldenSword');
		game.physics.arcade.enable(this.GoldenSword);
		
		// Add heart
		this.heart = game.add.sprite(650, 430, 'heart');
		game.physics.arcade.enable(this.heart);
		
		// Add Chalizard
		this.fire = game.add.sprite(760, 425, 'fire');
		game.physics.arcade.enable(this.fire);
		this.fire.body.immovable = true;
		
		// BUTTON
		game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
		game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
		
		// Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();
		
		// Add portal
		this.portalBlue = game.add.sprite(58, 412, 'portalBlue');
		game.physics.arcade.enable(this.portalBlue);
		
		// Add player
        this.player = game.add.sprite(65, 30, 'player');
		
		// Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 800;
		
		//animation
        this.player.animations.add('left', [3,2,1,0], 10, true);
        this.player.animations.add('right', [4,5,6,7], 10, true);
		
		//sword
		this.sword = game.add.sprite(190, 200, 'sword');
		game.physics.arcade.enable(this.sword);		
		
		//bar
        this.bars = game.add.group();
        this.bars.enableBody = true;
		
		this.bar = this.bars.create(-80, 80, 'barNgang');
		this.bar.body.immovable = true;
		
		this.bar = this.bars.create(240, -100, 'bar');
		this.bar.body.immovable = true;
		
		this.bar = this.bars.create(0, -180, 'bar');
		this.bar.body.immovable = true;
		
		this.barM = this.bars.create(205, 272, 'barMini');
		this.barM.body.immovable = true;
	
		this.bar = this.bars.create(555, 452, 'barNgang');
		this.bar.body.immovable = true;	
		
		//text
		game.add.text(16, 16, 'Stage 5', { fontSize: '32px', fill: '#FFF' });
        
        this.counter = 0;
        this.reload = game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
        this.reload.inputEnabled = true;
        this.text1 = game.add.text(250, 16, '', { fill: '#FFF' });
        this.reload.events.onInputDown.add(this.listener, this);
	
	},
	
	update: function() {
		game.physics.arcade.collide(this.player, this.bars);
		game.physics.arcade.collide(this.player, this.heart);
		
		//Eating!
		game.physics.arcade.overlap(this.player, this.sword, this.killSword, null, this);
		game.physics.arcade.overlap(this.player, this.GoldenSword, this.killGoldenSword, null, this);
		game.physics.arcade.overlap(this.player, this.fire, this.killFire, null, this);
		game.physics.arcade.overlap(this.heart, this.portalBlue, this.killBlue, null, this);
		game.physics.arcade.overlap(this.player, this.portal, this.killPortal, null, this);
		
		
		//Stop Moving when standing
		this.player.body.velocity.x = 0;
		
		//Ketboard putin
		if (cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();

        this.player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -400;
    }
	
	
	},
	
	redoGame1: function() {
		this.music.stop();
		this.sfx1.play();
         game.state.start('stage5',false,true,this.listener);
},

	mainMenuReturn: function(){
		this.music.stop();
		this.sfx1.play();
		game.state.start('mainmenu');
},

    killSword: function() {
        this.sword.kill();
		this.barM.kill();
		this.sfx1.play();
        
    },
	
    killGoldenSword: function() {
        this.GoldenSword.kill();		
		this.sfx1.play();
		
		this.barMM = this.bars.create(360, 272, 'barMini');
        
    },
	
	killBlue: function() {
        this.portalBlue.kill();
		this.heart.kill();
		this.sfx3.play();
		
		this.portal = game.add.sprite(730, -800, 'portal');
        game.physics.arcade.enable(this.portal);
		this.portal.body.gravity.y = 800;
		
        
    },
	
	killFire: function() {
		this.music.stop();
    	this.fire.kill();
		this.player.kill();
		this.sfx3.play();
		this.explode = game.add.sprite(760, 390, 'explode');
		game.physics.arcade.enable(this.explode);
		
		this.explode.animations.add('explode', null, 10, true);
		this.explode.animations.play('explode');
		
		game.add.text(511, 300, 'Gotcha !!', { fontSize: '32px', fill: '#FFF' });
	},
	
	killPortal: function() {
		this.music.stop();
    	this.portal.kill();
    	this.sfx2.play();
    	game.state.start('stage6');
	},
	
	soundOff: function(){
		this.music.stop();
	},
    
    listener: function() {
    this.counter++;
    this.text1.text = "Respawn: " + this.counter;

    },
    
    
};

game.state.add('stage5', stage5);