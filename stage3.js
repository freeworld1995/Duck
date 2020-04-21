var stage3 = {
    preload: function() {
        game.load.image('background', 'pic/stage333.jpg');
		game.load.image('glass', 'pic/glass.jpg');
		game.load.spritesheet('player','pic/yosh2.png', 15.8, 18);
		game.load.spritesheet('redo','pic/redo.png', 59, 51);
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
		game.load.image('brick', 'pic/brick.png');
        game.load.image('tool', 'pic/tool.png');
        game.load.image('portal', 'pic/portal.png');
		game.load.image('portalBlue', 'pic/portalBlue.png');
		game.load.image('bar', 'pic/bar.png');
		game.load.image('sword', 'pic/sword.png');
        game.load.image('LittleBrick', 'pic/LittleBrick.png');
        game.load.image('pipe', 'pic/pipe.png');
        game.load.image('BigPipe', 'pic/BigPipe.png');
        game.load.image('NoPass', 'pic/NoPass.png');
        game.load.image('GoldenSword', 'pic/GoldenSword2.png');
        game.load.image('SexySword', 'pic/SexySword.png');
		game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.audio('sfx2', 'sound/Eat2.ogg');
		game.load.audio('music', 'sound/Theme3.ogg');
    },
    
    create: function() {
		// Add Sound
		this.sfx1 = game.add.audio('sfx1');
		this.sfx2 = game.add.audio('sfx2');
		this.music = game.add.audio('music');
    	this.music.play();
		//
        game.add.sprite(0, 0, 'background');
        
        // Add glass
        this.glass = game.add.sprite(0, 500, 'glass');
        
        // Add glass physics
        game.physics.arcade.enable(this.glass);
		this.glass.body.immovable = true;
        
        // Add player
        this.player = game.add.sprite(0, 450, 'player');
        
        // Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        
        // Add portal
        this.portal = game.add.sprite(700, 0, 'portal');
        game.physics.arcade.enable(this.portal);
        this.portal.body.gravity.y = 4;
        
        // Add Sword
		this.sword = game.add.sprite(50, 343, 'sword');
		game.physics.arcade.enable(this.sword);
        
        // Add GoldenSword
		this.GoldenSword = game.add.sprite(720, 82, 'GoldenSword');
		game.physics.arcade.enable(this.GoldenSword);
        
        // Add SexySword
		this.SexySword = game.add.sprite(315, 462, 'SexySword');
		game.physics.arcade.enable(this.SexySword);
        
        // Add pipe 
        this.pipe = game.add.sprite(200, 230, 'pipe');
        game.physics.arcade.enable(this.pipe);
        this.pipe.body.immovable = true;
        
        // Add pipe 
        this.pipe2 = game.add.sprite(200, -130, 'pipe');
        game.physics.arcade.enable(this.pipe2);
        this.pipe2.body.immovable = true;
        
        // Add BIG pipe 
        this.BigPipe = game.add.sprite(410, 50, 'BigPipe');
        game.physics.arcade.enable(this.BigPipe);
        this.BigPipe.body.immovable = true;
        
        // Add YOU SHALL NOT PASS !!!
        this.NoPass = game.add.sprite(450, 200, 'NoPass');
        game.physics.arcade.enable(this.NoPass);
        this.NoPass.body.immovable = true;
        
        //animation
        this.player.animations.add('left', [3,2,1,0], 10, true);
        this.player.animations.add('right', [4,5,6,7], 10, true);
        
        // Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();
        
        // BUTTON
	    game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
	    game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
		game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
        //text
		game.add.text(16, 16, 'Stage 3', { fontSize: '32px', fill: '#FFF' });
        
        // Tao group cho tool
        this.tools = game.add.group();
        this.tools.enableBody = true;
        
        this.tool = this.tools.create(50, 380, 'tool');
        this.tool.body.collideWorldBounds = true;
		this.tool.body.gravity.y = 200;
		this.tool.body.bounce.y = 0.3;
        
        // Tao group cho brick 
        this.bricks = game.add.group();
        this.bricks.enableBody = true;
        
        this.brick = this.bricks.create(0, 380, 'LittleBrick');
        this.brick.body.immovable = true;
        
        this.brick = this.bricks.create(240, 120, 'LittleBrick');
        this.brick.body.immovable = true;
        
        this.brick = this.bricks.create(710, 120, 'LittleBrick');
        this.brick.body.immovable = true;
        
        
    },// End create
    
    update: function() {
        game.physics.arcade.collide(this.player, this.tools);
        game.physics.arcade.collide(this.player, this.glass);
        game.physics.arcade.collide(this.player, this.bricks);
        game.physics.arcade.collide(this.glass, this.tools);
        game.physics.arcade.collide(this.tools, this.pipe);
        game.physics.arcade.collide(this.player, this.pipe);
        game.physics.arcade.collide(this.player, this.pipe2);
        game.physics.arcade.collide(this.player, this.BigPipe);
        game.physics.arcade.collide(this.player, this.NoPass);
        
        
         //Eating!
		game.physics.arcade.overlap(this.player, this.sword, this.killSword, null, this);
        game.physics.arcade.overlap(this.player, this.GoldenSword, this.killGoldenSword, null, this);
        game.physics.arcade.overlap(this.player, this.SexySword, this.killSexySword, null, this);
		game.physics.arcade.overlap(this.player, this.portal, this.killPortal, null, this);
        
        
        // Reset meat velocity (movement) to 0 from the start
        this.player.body.velocity.x = 0;
        this.tool.body.velocity.x = 0;
        
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
        
    },// End update
    
    killPortal: function() {
		this.music.stop();
    	this.portal.kill();
    	this.sfx2.play();
    	game.state.start('chooseStage4');
    },
    
    killSword: function() {
        this.sword.kill();
        
        this.tool = this.tools.create(141, 300, 'tool');
        this.tool.body.immovable = true;
		
		this.sfx1.play();
    },
    
    killGoldenSword: function() {
        this.GoldenSword.kill();
        
        this.NoPass.destroy();
		
		this.sfx1.play();
        
    },
    
    killSexySword: function() {
        this.SexySword.kill();
        
        this.brick = this.bricks.create(320, 210, 'LittleBrick');
        this.brick.body.immovable = true;
        
        this.brick = this.bricks.create(320, 410, 'LittleBrick');
        this.brick.body.immovable = true;
        
        this.brick = this.bricks.create(242, 320, 'LittleBrick');
        this.brick.body.immovable = true;
		
		this.sfx1.play();
        
    },

    redoGame1: function() {
		this.music.stop();
		this.sfx1.play();
        game.state.start('stage3');
    },

    mainMenuReturn: function(){
		this.music.stop();
		this.sfx1.play();
		game.state.start('mainmenu');
    },
	
	soundOff: function(){
		this.music.stop();
	}
};//End stage3

game.state.add('stage3', stage3);