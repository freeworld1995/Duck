var stage1 = {	

    preload: function() {
        game.load.spritesheet('player','pic/yosh2.png', 15.8, 18);
        game.load.image('glass', 'pic/glass.jpg');
        game.load.image('coins', 'pic/coin.png');
		game.load.image('background', 'pic/background2.jpg');
        game.load.image('brick', 'pic/brick.png');
        game.load.image('tool', 'pic/tool.png');
        game.load.image('portal', 'pic/portal.png');
		game.load.spritesheet('redo','pic/redo.png', 59, 51);
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
		game.load.audio('music', 'sound/Theme2.ogg');
		game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.audio('sfx2', 'sound/Eat2.ogg');
        game.load.spritesheet('submit','pic/submit.png', 289, 90);
		game.load.spritesheet('next','pic/next.png', 289, 90);
	},	
 
    create: function() {
		// Add Music
		this.sfx1 = game.add.audio('sfx1');
		this.sfx2 = game.add.audio('sfx2');
		this.music = game.add.audio('music');
    	this.music.play();
		
        // Add background
        game.stage.backgroundColor = '#3498db';
		game.add.sprite(0, 0, 'background');
        
        //Add physics mode
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.y = 250;
        
        // Add glass
        this.glass = game.add.sprite(0, 500, 'glass');
        
        // Add glass physics
        game.physics.arcade.enable(this.glass);
        
        this.glass.body.immovable = true;
		
        // Add player
        this.player = game.add.sprite(250, 450, 'player');
        
        // Add portal
        this.portal = game.add.sprite(0, 170, 'portal');
        game.physics.arcade.enable(this.portal);
        
        // Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        
        //animation
        this.player.animations.add('left', [3,2,1,0], 10, true);
        this.player.animations.add('right', [4,5,6,7], 10, true);
        
        // Tao group cho brick
        this.brick = game.add.group();
        this.brick.enableBody = true;
        // Brick right
        var ledges = this.brick.create(450, 400, 'brick');
        ledges.body.immovable = true;
        ledges = this.brick.create(420, 290, 'brick');
        ledges.body.immovable = true;
        //Brick left
        ledges = this.brick.create(50, 250, 'brick');
        ledges.body.immovable = true;
        
        //Tao group cho tool
        this.tools = game.add.group();
        this.tools.enableBody = true;
		
        //Create tool
        this.tool = this.tools.create(450, 330, 'tool');
        this.tool.body.collideWorldBounds = true;
		this.tool.body.gravity.y = 200;
		this.tool.body.bounce.y = 0.3;
		
        this.tool2 = this.tools.create(700, 400, 'tool');
        this.tool2.body.collideWorldBounds = true;
        this.tool2.body.gravity.y = 200;
		this.tool2.body.bounce.y = 0.3;
        
        game.add.text(16, 16, 'Stage 1', { fontSize: '32px', fill: '#000' });
        
        // Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();

// BUTTON
	game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
	game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
	game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
        
        this.counter = 0;
        
        this.text1 = game.add.text(200, 16, 'Time: 0s', { font: "32px Arial", fill: "#000", align: "center" });
        game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
	
    },

    update: function() {
             //Collide bird and coin
        game.physics.arcade.collide(this.player, this.glass);
        game.physics.arcade.collide(this.coins, this.glass);
        game.physics.arcade.collide(this.player, this.brick);
        game.physics.arcade.collide(this.player, this.tools);
        game.physics.arcade.collide(this.glass, this.tools);
        game.physics.arcade.collide(this.brick, this.tools);
        game.physics.arcade.collide(this.tools, this.tools);
        
         //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.portal, this.killPortal, null, this);

        // Reset meat velocity (movement) to 0 from the start
        this.player.body.velocity.x = 0;
        this.tool.body.velocity.x = 0;
        this.tool2.body.velocity.x = 0;
        this.tool.body.gravity.y = 100;

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
    
    killPortal: function() {
		this.sfx2.play();
		
    	this.portal.kill();
            this.bestScore = localStorage.getItem('bestScore');
        if (!this.bestScore || this.bestScore > this.counter) {
            this.bestScore = this.counter;
            localStorage.setItem('bestScore', this.bestScore);
        }
        else {
            this.bestScore = 'N/A';
        }
            game.add.text(250, 250, "Best Score: " + this.bestScore + "s", { fontSize: '32px', fill: '#000' });
		game.add.text(250, 225, "You took: " + this.counter + "s", { fontSize: '32px', fill: '#000' });
		game.add.button(100, 300,'submit', this.nextState, this, 1, 0, 2);
		game.add.button(400, 300,'next', this.nextState, this, 1, 0, 2);
        },
    
    nextState: function() {
		this.sfx1.play();
		game.state.start('stage2');
	},

	redoGame1: function() {
		this.sfx1.play();
        game.state.start('stage1');
		this.music.stop();
	},

	mainMenuReturn: function(){
		this.sfx1.play();
		game.state.start('mainmenu');
		this.music.stop();
	},

	soundOff: function(){
		this.music.stop();
	},
    
    updateCounter: function() {

    this.counter++;

    this.text1.setText('Time: ' + this.counter + 's');

    },
    


};
game.state.add('stage1', stage1);