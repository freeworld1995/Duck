var stage7 = {
	preload: function() {
		game.load.image('background', 'pic/stage4.jpg');
		game.load.image('glass', 'pic/glass.jpg');
		game.load.image('edge', 'pic/BigPipe-ngang.png');
		game.load.image('tool', 'pic/tool.png');
		game.load.image('tool-caohon', 'pic/tool-caohon.jpg');
		game.load.image('nam', 'pic/mussroom.png');
		game.load.image('enemy', 'pic/thebar-fire.png');
		game.load.spritesheet('player','pic/yosh2.png', 15.8, 18);
		game.load.spritesheet('redo','pic/redo.png', 59, 51);
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
		game.load.spritesheet('explode','pic/exp2.png', 65, 61);
		game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.audio('sfx2', 'sound/Eat2.ogg');
		game.load.audio('sfx3', 'sound/Explode.ogg');	
		game.load.image('heart', 'pic/heart.png');	
		game.load.image('GoldenSword', 'pic/GoldenSword2.png');
		game.load.image('portal', 'pic/portal.png');
	},
	
	create: function() {
		
		// Add Sound
		this.sfx1 = game.add.audio('sfx1');
		this.sfx2 = game.add.audio('sfx2');
		this.sfx3 = game.add.audio('sfx3');
		this.music = game.add.audio('music');
    	this.music.play();
		
		//background
        this.background = game.add.sprite(0, 0, 'background');
		
		//	A mask is a Graphics object
		this.mask = game.add.graphics(0, 0);
		
	
		//	Shapes drawn to the Graphics object must be filled.
		this.mask.beginFill(0xffffff);
	
		//	Here we'll draw a circle
		this.mask.drawCircle(100, 100, 100);
	
		//	And apply it to the Sprite
		this.background.mask = this.mask;
	
		//	As you move the mouse / touch, the circle will track the sprite
		game.input.addMoveCallback(this.move, this);
		
		//Add physics mode
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.y = 250;
		
		// Add portal
        this.portal = game.add.sprite(726, 140, 'portal');
        game.physics.arcade.enable(this.portal);
		this.portal.body.immovable = true;
		this.portal.mask = this.mask;

		// Add glass
        this.glass = game.add.sprite(0, 530, 'glass');
		
		// Add glass physics
        game.physics.arcade.enable(this.glass);
		this.glass.body.immovable = true;
		
		// Add player
        //this.player = game.add.sprite(0, 500, 'player');
		this.player = game.add.sprite(26, 352, 'player');
		
        //animation
        this.player.animations.add('left', [3,2,1,0], 10, true);
        this.player.animations.add('right', [4,5,6,7], 10, true);		
        
        // Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
		
		//sword
		this.GoldenSword = game.add.sprite(10, 200, 'GoldenSword');
        game.physics.arcade.enable(this.GoldenSword);
		this.GoldenSword.mask = this.mask;
		
		//Add Nam
		this.nams = game.add.group();
        this.nams.enableBody = true;
		
		this.nam = this.nams.create(600, 450, 'nam');
		this.nam.body.velocity.x = -100;
		this.nam.body.gravity.y = 200;
		this.nam.mask = this.mask;
		
		this.nam = this.nams.create(600, 450, 'nam');
		this.nam.body.velocity.x = -70;
		this.nam.body.gravity.y = 200;
		this.nam.mask = this.mask;
		
		this.nam = this.nams.create(600, 450, 'nam');
		this.nam.body.velocity.x = -40;
		this.nam.body.gravity.y = 200;
		this.nam.mask = this.mask;
		
		this.nam = this.nams.create(750, 450, 'nam');
		this.nam.body.gravity.y = 200;
		this.nam.mask = this.mask;
		
		this.nam = this.nams.create(492, 345, 'enemy');
		this.nam.body.immovable = true;
		this.nam.mask = this.mask;
		
		this.nam = this.nams.create(492, 240, 'enemy');
		this.nam.body.immovable = true;
		this.nam.mask = this.mask;
		
		this.nam = this.nams.create(350, 345, 'enemy');
		this.nam.body.immovable = true;
		this.nam.mask = this.mask;
		
		this.nam = this.nams.create(350, 240, 'enemy');
		this.nam.body.immovable = true;	
		this.nam.mask = this.mask;	
		
		this.nam = this.nams.create(200, 345, 'enemy');
		this.nam.body.immovable = true;
		this.nam.mask = this.mask;

		this.nam = this.nams.create(200, 240, 'enemy');
		this.nam.body.immovable = true;		
		this.nam.mask = this.mask;
		
		this.nam = this.nams.create(722, 322, 'heart');
		this.nam.body.immovable = true;		
		this.nam.mask = this.mask;
		
		// BUTTON
	    game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
	    game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
		game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
        //text
		game.add.text(16, 16, 'Stage 7', { fontSize: '32px', fill: '#fff' });
		
		// Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();
       
		// Tao group cho Edge
        this.edges = game.add.group();
        this.edges.enableBody = true;
		
		this.edge = this.edges.create(0, 400, 'edge');
		this.edge.body.immovable = true;
		
		this.edge = this.edges.create(200, 200, 'edge');
		this.edge.body.immovable = true;
		
		this.edge = this.edges.create(-600, 283, 'edge');
		this.edge.body.immovable = true;		
		
        // Tao group cho tool
        this.tools = game.add.group();
        this.tools.enableBody = true;
		
		this.tool1 = this.tools.create(570, 450, 'tool');
		this.tool1.body.collideWorldBounds = true;
		this.tool1.body.gravity.y = 200;
		this.tool1.body.bounce.y = 0.3;
		this.tool1.mask = this.mask;
		
		this.tool2 = this.tools.create(105, 321, 'tool');
		this.tool2.body.collideWorldBounds = true;
		this.tool2.body.gravity.y = 200;
		this.tool2.body.bounce.y = 0.3;
		this.tool2.mask = this.mask;
		
		this.tool3 = this.tools.create(245, 127, 'tool-caohon');
		this.tool3.body.collideWorldBounds = true;
		this.tool3.body.gravity.y = 200;
		this.tool3.body.bounce.y = 0.3;
		this.tool3.mask = this.mask;
		
		
	},
	
	update: function() {

        game.physics.arcade.collide(this.player, this.tools);
		game.physics.arcade.collide(this.player, this.edges);
        game.physics.arcade.collide(this.player, this.glass);
		game.physics.arcade.collide(this.glass, this.tools);
		game.physics.arcade.collide(this.edges, this.tools);
		game.physics.arcade.collide(this.tools, this.tools);	
		game.physics.arcade.collide(this.glass, this.nams);
		game.physics.arcade.collide(this.tools, this.nams);
		game.physics.arcade.collide(this.edges, this.nams);
		
		
		//Eating
		game.physics.arcade.overlap(this.player, this.nams, this.killNam, null, this);
		game.physics.arcade.overlap(this.player, this.GoldenSword, this.killGoldenSword, null, this);
		game.physics.arcade.overlap(this.player, this.portal, this.killPortal, null, this);	
	
		
		// Reset meat velocity (movement) to 0 from the start
        this.player.body.velocity.x = 0;
        this.tool1.body.velocity.x = 0;
		this.tool2.body.velocity.x = 0;
		
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
        
		
	},//end update
	
	move: function(pointer, x, y){

		this.mask.x = x - 100;
		this.mask.y = y - 100;

	},
	
    redoGame1: function() {
		this.music.stop();
		this.sfx1.play();
        game.state.start('stage7');
    },

    mainMenuReturn: function(){
		this.music.stop();
		this.sfx1.play();
		game.state.start('mainmenu');
    },
	
	soundOff: function(){
		this.music.stop();
	},
	
	killNam: function(){
		this.player.kill();
		this.sfx3.play();
		this.music.stop();
		this.explode = game.add.sprite(this.player.x, this.player.y - 50, 'explode');
		game.physics.arcade.enable(this.explode);
		
		this.explode.animations.add('explode', null, 10, true);
		this.explode.animations.play('explode');
	},
	
	killGoldenSword: function() {
		this.GoldenSword.kill();
				
		this.tool3.body.velocity.x = -50;
		
		this.nam2 = this.nams.create(700, 120, 'nam');
		this.nam2.body.velocity.x = -40;
		this.nam2.body.gravity.y = 200;
		this.nam2.mask = this.mask;
		
   	},
	
	killPortal: function() {
			this.music.stop();
			this.portal.kill();
			this.sfx2.play();
			game.state.start('chooseStage4');
	},
};

game.state.add('stage7', stage7);