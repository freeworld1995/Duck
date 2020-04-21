var stage6 = {
    preload: function() {
        game.load.image('background', 'pic/stage333.jpg');
		game.load.image('glass', 'pic/glass.jpg');
		game.load.spritesheet('player','pic/yosh2.png', 15.8, 18);
		game.load.spritesheet('redo','pic/redo.png', 59, 51);
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
        game.load.image('tool', 'pic/tool.png');
        game.load.image('portal', 'pic/portal.png');
        game.load.image('brick', 'pic/thebar.png');
        game.load.image('sword', 'pic/sword.png');
        game.load.image('GoldenSword', 'pic/GoldenSword2.png');
        game.load.image('SexySword', 'pic/SexySword.png');
        game.load.image('box', 'pic/failBox.png');
        game.load.image('tinyBar', 'pic/tinyBar.png');
        game.load.image('CrimsonSword', 'pic/CrimsonSword.png');
        

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
        this.player = game.add.sprite(0, 230, 'player');
		
        //animation
        this.player.animations.add('left', [3,2,1,0], 10, true);
        this.player.animations.add('right', [4,5,6,7], 10, true);		
        
        // Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        
        // Add portal
        this.portal = game.add.sprite(0, 80, 'portal');
        game.physics.arcade.enable(this.portal);
        this.portal.body.velocity.x = 25;
        
        // Add sword 
        this.sword = game.add.sprite(240, 238, 'sword');
        game.physics.arcade.enable(this.sword);
        
        // Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();
        
        // BUTTON
	    game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
	    game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
		game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
        //text
		game.add.text(16, 16, 'Stage 6', { fontSize: '32px', fill: '#000' });
        
        // Tao group cho tool
        this.tools = game.add.group();
        this.tools.enableBody = true;
        
        this.tool = this.tools.create(381, 50, 'tool');
        this.tool.body.collideWorldBounds = true;
		this.tool.body.gravity.y = 200;
		this.tool.body.bounce.y = 0.3;
        
        // Tao group cho brick 
        this.bricks = game.add.group();
        this.bricks.enableBody = true;
        
        this.brick = this.bricks.create(0, 270, 'brick');
        this.brick.body.immovable = true;
        
        this.brick = this.bricks.create(240, 270, 'brick');
        this.brick.body.immovable = true;
        
        // Tao group cho BOX
        this.boxes = game.add.group();
        this.boxes.enableBody = true;
		
        // Add Fuck up box 
        this.box1 = this.boxes.create(80, 270, 'box');
        this.box2 = this.boxes.create(120, 270, 'box');
        
        // Tao group cho TinyBar
        this.tinyBars = game.add.group();
        this.tinyBars.enableBody = true;
        
    },// End create
    
    update: function() {
        game.physics.arcade.collide(this.player, this.tools);
        game.physics.arcade.collide(this.player, this.glass);
        game.physics.arcade.collide(this.player, this.bricks);
        game.physics.arcade.collide(this.glass, this.tools);
        game.physics.arcade.collide(this.player, this.boxes);
        game.physics.arcade.collide(this.player, this.tinyBars);
        
        
         //Eating!
		game.physics.arcade.overlap(this.player, this.sword, this.killSword, null, this);
        game.physics.arcade.overlap(this.player, this.GoldenSword, this.killGoldenSword, null, this);
        game.physics.arcade.overlap(this.player, this.SexySword, this.killSexySword, null, this);
        game.physics.arcade.overlap(this.player, this.CrimsonSword, this.killCrimsonSword, null, this);
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
        this.player.body.velocity.y = -350;
    }
        
    },// End update

		redoGame1: function() {
			this.sfx1.play();
            this.player.reset(0, 230);
            this.box1.reset(80, 270);
            this.box2.reset(120, 270);
            this.sword = game.add.sprite(240, 238, 'sword');
            this.CrimsonSword.kill();
            this.GoldenSword.kill();
            
		},
	
		mainMenuReturn: function(){
			this.music.stop();
			this.sfx1.play();
			game.state.start('mainmenu');
		},
		
		soundOff: function(){
			this.music.stop();
		},
		
		killPortal: function() {
			this.music.stop();
			this.portal.kill();
			this.sfx2.play();
			game.state.start('stage7');
		},
    
		killSword: function() {
			this.sfx1.play();
			this.sword.kill();
			
			this.brick = this.bricks.create(400, 270, 'brick');
			this.brick.body.immovable = true;
			
			this.GoldenSword = game.add.sprite(0, 235, 'GoldenSword');
			game.physics.arcade.enable(this.GoldenSword);    
			
			this.box = this.boxes.create(80, 270, 'box');
			this.box = this.boxes.create(120, 270, 'box');
		},
		
		killGoldenSword: function() {
			this.GoldenSword.kill();
				
			this.SexySword = game.add.sprite(600, 450, 'SexySword');
			game.physics.arcade.enable(this.SexySword);
   		 },
    
		killSexySword: function() {
			this.sfx1.play();
			this.SexySword.kill();
				
			this.brick = this.bricks.create(140, 270, 'brick');
			this.brick.body.immovable = true;
			
			this.tinyBar = this.tinyBars.create(30, 300, 'tinyBar');
			this.tinyBar.body.immovable = true;
			
			this.tinyBar = this.tinyBars.create(30, 390, 'tinyBar');
			this.tinyBar.body.immovable = true;
				
			this.tinyBar = this.tinyBars.create(100, 370, 'tinyBar');
			this.tinyBar.body.immovable = true;
				
			this.CrimsonSword = game.add.sprite(400, 238, 'CrimsonSword');
			game.physics.arcade.enable(this.CrimsonSword);
		},
		
		killCrimsonSword: function() {
			this.sfx1.play();
			this.CrimsonSword.kill();
			
			this.tinyBar = this.tinyBars.create(500, 260, 'tinyBar');
			
			
			this.tinyBar = this.tinyBars.create(570, 230, 'tinyBar');
		   
			
			this.tinyBar = this.tinyBars.create(640, 200, 'tinyBar');

    
    }
    
};

game.state.add('stage6', stage6);