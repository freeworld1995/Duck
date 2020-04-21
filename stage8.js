var stage8 = {
    preload: function() {
        game.load.image('background', 'pic/stage333.jpg');
		game.load.image('glass', 'pic/glass2.png');
		game.load.spritesheet('player','pic/yosh2.png', 15.8, 18);
		game.load.spritesheet('redo','pic/redo.png', 59, 51);
        game.load.image('movingBar', 'pic/gold.png');
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
		game.load.image('brick', 'pic/brick.png');
        game.load.image('tool', 'pic/tool.png');
        game.load.image('portal', 'pic/portal.png');
		game.load.image('portalBlue', 'pic/portalBlue.png');
		game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.audio('sfx2', 'sound/Eat2.ogg');
		game.load.audio('sfx3', 'sound/Explode.ogg');	
		game.load.audio('music', 'sound/Theme3.ogg');
        game.load.spritesheet('explode','pic/exp2.png', 65, 61);
        game.load.image('nam', 'pic/mussroom.png');
        game.load.image('sword', 'pic/sword.png');
        game.load.image('CrimsonSword', 'pic/CrimsonSword.png');
    },
    
    create: function() {
		// Add Sound
		this.sfx1 = game.add.audio('sfx1');
		this.sfx2 = game.add.audio('sfx2');
        this.sfx3 = game.add.audio('sfx3');
		this.music = game.add.audio('music');
    	this.music.play();
		//
       this.background = game.add.sprite(0, 0, 'background');
        
        // Add glass
        this.glass = game.add.sprite(0, 350, 'glass');
        
        // Add glass physics
        game.physics.arcade.enable(this.glass);
		this.glass.body.immovable = true;
        
        // Add player
        this.player = game.add.sprite(50, 300, 'player');
        
        // Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        
        // Add portal
        this.portal = game.add.sprite(750, 300, 'portal');
        game.physics.arcade.enable(this.portal);
        
        // Add sword 
        this.sword = game.add.sprite(680, 320, 'sword');
        game.physics.arcade.enable(this.sword);
        
        //animation
        this.player.animations.add('left', [3,2,1,0], 10, true);
        this.player.animations.add('right', [4,5,6,7], 10, true);
        
        // Add moving bar
        this.movingBars = game.add.group();
        this.movingBars.enableBody = true;
        
        this.movingBar = this.movingBars.create(100, -50, 'movingBar');
        this.movingBar = this.movingBars.create(350, -50, 'movingBar');
        this.movingBar = this.movingBars.create(250, 300, 'movingBar');
        this.movingBar = this.movingBars.create(450, 300, 'movingBar');
        this.movingBar = this.movingBars.create(570, 300, 'movingBar');
        this.movingBar = this.movingBars.create(520, -50, 'movingBar');
        
        game.add.tween(this.movingBars).to( { y: 400 }, 900, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
        
        this.fastMovingBar = game.add.sprite(700, 300, 'movingBar');
        game.physics.arcade.enable(this.fastMovingBar);
        
        this.stopMovingBar = game.add.tween(this.fastMovingBar).to( { y: 400 }, 250, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
    
        //	A mask is a Graphics object
        mask = game.add.graphics(-40, 250);

        //	Shapes drawn to the Graphics object must be filled.
        mask.beginFill(0xffffff);
        
        //	And apply it to the Sprite
		this.background.mask = mask;

        //	Here we'll draw a circle
        mask.drawCircle(100, 100, 100);

        //	And apply it to the Sprite
        //this.movingBars.mask = mask;
        this.glass.mask = mask;
        this.portal.mask = mask;
        this.sword.mask = mask;
        this.movingBars.mask = mask;
        this.fastMovingBar.mask = mask;
     
        // Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();
        
        // BUTTON
	    game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
	    game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
		game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
        //text
		game.add.text(16, 16, 'Stage 8', { fontSize: '32px', fill: '#FFF' });
        game.add.text(300, 150, 'Move Left & Right', { fontSize: '10px', fill: '#B7AB2D' });
        
        this.counter = 0;
        
        this.text1 = game.add.text(game.world.centerX, game.world.centerY, 'Counter: 0', { font: "64px Arial", fill: "#ffffff", align: "center" });
        game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
        
    },// End create
    
    update: function() {
        game.physics.arcade.collide(this.player, this.glass);
        
        //Eating!
		game.physics.arcade.overlap(this.player, this.movingBars, this.killmovingBar, null, this);
        game.physics.arcade.overlap(this.player, this.movingBars, this.killmovingBar, null, this);
        game.physics.arcade.overlap(this.player, this.CrimsonSword, this.killCrimsonSword, null, this);
        game.physics.arcade.overlap(this.player, this.sword, this.killSword, null, this);
        game.physics.arcade.overlap(this.player, this.portal, this.killPortal, null, this);
        
        // Reset meat velocity (movement) to 0 from the start
        this.player.body.velocity.x = 0;
        
        if (cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
        mask.x = this.player.x - 85;
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
        mask.x = this.player.x - 85;
    }
    else
    {
        //  Stand still
        this.player.animations.stop();

        this.player.frame = 4;
    }
        
    },// End update
    
    killPortal: function() {
		this.music.stop();
    	this.portal.kill();
    	this.sfx2.play();
        showTime();
    },
    
    killmovingBar: function() {
        this.player.kill();
		this.sfx3.play();
		this.music.stop();
		this.explode = game.add.sprite(this.player.x, this.player.y - 50, 'explode');
		game.physics.arcade.enable(this.explode);
		
		this.explode.animations.add('explode', null, 10, true);
		this.explode.animations.play('explode');
    },
    
     killfastMovingBar: function() {
        this.player.kill();
		this.sfx3.play();
		this.music.stop();
		this.explode = game.add.sprite(this.player.x, this.player.y - 50, 'explode');
		game.physics.arcade.enable(this.explode);
		
		this.explode.animations.add('explode', null, 10, true);
		this.explode.animations.play('explode');
    },
    
    killSword: function() {
        this.sfx1.play();
        this.sword.kill();
        
        this.CrimsonSword = game.add.sprite(634, 320, 'CrimsonSword');
        game.physics.arcade.enable(this.CrimsonSword);
    },
    
    killCrimsonSword: function() {
        this.sfx1.play();
        this.CrimsonSword.kill();
        this.stopMovingBar.stop();
    },

    redoGame1: function() {
		this.music.stop();
		this.sfx1.play();
        game.state.start('stage8');
    },

    mainMenuReturn: function(){
		this.music.stop();
		this.sfx1.play();
		game.state.start('mainmenu');
    },
	
	soundOff: function(){
		this.music.stop();
	},
    
    updateCounter: function() {

    this.counter++;

    this.text1.setText('Counter: ' + this.counter);

    },
    
    showTime: function() {
    alert('You Took :' + this.counter);
    }

};//End stage8

game.state.add('stage8', stage8);