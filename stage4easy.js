var stage4easy = {
	preload: function() {
		game.load.spritesheet('player','pic/megaman.png', 160, 160);
		game.load.image('glass', 'pic/glass.jpg');
		game.load.image('boob', 'pic/boob.gif');
		game.load.image('background', 'pic/stage33.jpg');
		game.load.spritesheet('redo','pic/redo.png', 59, 51);
		game.load.spritesheet('explode','pic/exp2.png', 65, 61);
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.image('portal', 'pic/portal.png');
		game.load.image('portalBlue', 'pic/portalBlue.png');
		game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.audio('sfx2', 'sound/Eat2.ogg');
		game.load.audio('sfx3', 'sound/Explode.ogg');
		game.load.audio('music', 'sound/Theme4.ogg');
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
		game.load.image('sword', 'pic/sword.png');
	},
	
	create: function() {
		// Add Sound
		this.sfx1 = game.add.audio('sfx1');
		this.sfx2 = game.add.audio('sfx2');
		this.sfx3 = game.add.audio('sfx3');
		this.music = game.add.audio('music');
    	this.music.play();
		
		game.add.sprite(0, 0, 'background');
		
		// Add boobs
		this.boob = game.add.sprite(500, 20, 'boob');
		game.physics.arcade.enable(this.boob);
		this.boob.body.bounce.y = 0.3;
        this.boob.body.gravity.y = 800;
        this.boob.body.collideWorldBounds = true;
		
		// Add portal
        this.portal = game.add.sprite(745, 449, 'portal');
        game.physics.arcade.enable(this.portal);
		
		// Add glass
        this.glass = game.add.sprite(0, 500, 'glass');
        
        // Add glass physics
        game.physics.arcade.enable(this.glass);
		this.glass.body.immovable = true;
		
		// Add player
        this.player = game.add.sprite(30, 300, 'player');
		
		// Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        
        //animation
        this.player.animations.add('left', [2,1,0], 10, true);
        this.player.animations.add('right', [2,1,0], 10, true);
		// Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();
		
		// BUTTON
	game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
	game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
	game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
		//text
		game.add.text(16, 16, 'Stage 4', { fontSize: '32px', fill: '#FFF' });
		
		
		
		// RAINNNNNNNNNNNNNNNNNNNNNNNNN
		var emitter = game.add.emitter(game.world.centerX, 0, 400);

		emitter.width = game.world.width;
		// emitter.angle = 30; // uncomment to set an angle for the rain.
	
		emitter.makeParticles('sword');
	
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
	
		emitter.setYSpeed(300, 500);
		emitter.setXSpeed(-5, 5);
	
		emitter.minRotation = 0;
		emitter.maxRotation = 0;
	
		emitter.start(false, 1600, 5, 0);
		
	},
	
	update: function() {
		
		game.physics.arcade.collide(this.player, this.glass);
		game.physics.arcade.collide(this.glass, this.boob);
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

        this.player.frame = 0;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -400;
    }
	
	
	//Eating!
		game.physics.arcade.overlap(this.player, this.boob, this.killBoob, null, this);
		game.physics.arcade.overlap(this.player, this.portal, this.killPortal, null, this);
		
	},
	
	redoGame1: function() {
		this.music.stop();
		this.sfx1.play();
        game.state.start('stage4');
},

	mainMenuReturn: function(){
		this.music.stop();
		this.sfx1.play();
		game.state.start('mainmenu');
},

	killBoob: function() {
    	this.boob.kill();
		this.sfx3.play();
		this.explode = game.add.sprite(511, 445, 'explode');
		game.physics.arcade.enable(this.explode);
		
		this.explode.animations.add('explode', null, 10, true);
		this.explode.animations.play('explode');
		
		game.add.text(511, 300, 'Kaboom!', { fontSize: '32px', fill: '#FFF' });
	},

	killPortal: function() {
		this.music.stop();
    	this.portal.kill();
    	this.sfx2.play();
    	game.state.start('stage5');
	},
	
	soundOff: function(){
		this.music.stop();
	}

};

game.state.add('stage4easy', stage4easy);