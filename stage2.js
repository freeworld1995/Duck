var stage2 = {
	preload: function() {
		game.load.image('background', 'pic/stage4.jpg');
		game.load.image('glass', 'pic/glass2.jpg');
		game.load.spritesheet('player','pic/yosh.png', 15.8, 18);
		game.load.spritesheet('redo','pic/redo.png', 59, 51);
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.image('brick', 'pic/brick.png');
        game.load.image('tool', 'pic/tool.png');
		game.load.image('tool2', 'pic/tool2.png');
        game.load.image('portal', 'pic/portal.png');
		game.load.image('portalBlue', 'pic/portalBlue.png');
		game.load.image('bar', 'pic/bar.png');
		game.load.image('sword', 'pic/sword.png');
		game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.audio('sfx2', 'sound/Eat2.ogg');
		game.load.audio('music', 'sound/Theme1.ogg');
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
	},
	create: function(){
		//Add Sound
		this.sfx1 = game.add.audio('sfx1');
		this.sfx2 = game.add.audio('sfx2');
		this.music = game.add.audio('music');
    	this.music.play();
		
		game.add.sprite(0, 0, 'background');
		
		// Add glass
        this.glass = game.add.sprite(0, 500, 'glass');
        
        // Add glass physics
        game.physics.arcade.enable(this.glass);
		this.glass.body.immovable = true;
		
		// Add Sword
		this.sword = game.add.sprite(386, 230, 'sword');
		game.physics.arcade.enable(this.sword);
		
		// Add player
        this.player = game.add.sprite(30, 450, 'player');
		
		// Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        
        //animation
        this.player.animations.add('left', [3,2,1,0], 10, true);
        this.player.animations.add('right', [4,5,6,7], 10, true);
		// Add portal

        this.portal = game.add.sprite(745, 449, 'portal');
        game.physics.arcade.enable(this.portal);
		
		// Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();
		
		// BUTTON
	game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
	game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
	game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
	
		//text
		game.add.text(16, 16, 'Stage 2', { fontSize: '32px', fill: '#FFF' });
		
		 //Tao group cho bar1
        this.bars1 = game.add.group();
        this.bars1.enableBody = true;
		
		this.bar1 = this.bars1.create(87, 417, 'tool');
		this.bar1.body.immovable = true;
		
		this.bar1 = this.bars1.create(180, 330, 'tool');
		this.bar1.body.immovable = true;
		
		this.bar1 = this.bars1.create(284, 245, 'tool');
		this.bar1.body.immovable = true;
		
		this.bar1 = this.bars1.create(381, 160, 'tool');
		this.bar1.body.immovable = true;
		
		this.bar1 = this.bars1.create(381, 270, 'tool');
		this.bar1.body.immovable = true;
		
		//bar2
		this.bars2 = game.add.group();
		this.bars2.enableBody = true;
		
		this.bar2 = this.bars2.create(675, 239, 'bar');
		this.bar2.body.immovable = true;
		this.bar2.body.collideWorldBounds = true
		
		//tools
		this.tools = game.add.group();
        this.tools.enableBody = true;
		
		this.tool = this.tools.create(381, 50, 'tool2');
        this.tool.body.collideWorldBounds = true;
		this.tool.body.gravity.y = 200;
		this.tool.body.bounce.y = 0.3;
	
	},
	update: function(){
		
		game.physics.arcade.collide(this.player, this.bars1);
		game.physics.arcade.collide(this.player, this.glass);
		game.physics.arcade.collide(this.player, this.bars2);
		game.physics.arcade.collide(this.tools, this.bars2);
		game.physics.arcade.collide(this.tools, this.glass);
		game.physics.arcade.collide(this.tools, this.bars1);
		game.physics.arcade.collide(this.tools, this.player);
		game.physics.arcade.collide(this.tools, this.tools);
		//Eating!
		game.physics.arcade.overlap(this.player, this.sword, this.killSword, null, this);
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
		this.sfx1.play();
		this.music.stop();
        game.state.start('stage2');
},

	mainMenuReturn: function(){
		this.sfx1.play();
		this.music.stop();
		game.state.start('mainmenu');
},
	
	killSword: function() {
    	this.sword.kill();
		
		this.tool = this.tools.create(614, 230, 'tool2');
        this.tool.body.collideWorldBounds = true;
		this.tool.body.gravity.y = 200;
		this.tool.body.bounce.y = 0.3;
		
		this.bar2.body.velocity.y = 200;
	
		this.sfx1.play();
	},

	killPortal: function() {
		this.music.stop();
		
		this.sfx2.play();	
			
		this.portal.kill();
		
		game.state.start('stage3');
	},
	
	soundOff: function(){
		this.music.stop();
	}
};

game.state.add('stage2', stage2);