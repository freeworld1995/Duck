var stage10 = {
    preload: function() {
        game.load.spritesheet('player','pic/yosh4.png',20, 22);
        game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
        game.load.spritesheet('redo','pic/redo.png', 59, 51);
        game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.audio('sfx2', 'sound/Eat2.ogg');
		game.load.audio('sfx3', 'sound/Explode.ogg');	
		game.load.audio('music', 'sound/Theme3.ogg');
        game.load.image('portal', 'pic/portal.png');
        game.load.image('glass', 'pic/glass3.png');
        game.load.image('tool', 'pic/tool.png');
        game.load.image('saw', 'pic/saw.png');
        game.load.image('fence', 'pic/fence.png');
        game.load.spritesheet('explode','pic/exp2.png', 65, 61);
        game.load.image('portal', 'pic/portal.png');
        game.load.image('sword', 'pic/sword.png');
        game.load.image('elevator', 'pic/elevator.png');
        game.load.image('brick', 'pic/sBrick.png');
        game.load.image('octo', 'pic/octo.png');
    },
    
    create: function() {
        // Add Sound
		this.sfx1 = game.add.audio('sfx1');
		this.sfx2 = game.add.audio('sfx2');
        this.sfx3 = game.add.audio('sfx3');
		this.music = game.add.audio('music');
    	this.music.play();
        
        // Expand world
        game.world.setBounds(0, 0, 1500, 1000);
        
        // Add background 
        game.stage.backgroundColor = '#FFF';
        
        // Add player
        this.player = game.add.sprite(50, 700, 'player');
        
        // Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.3;
        this.player.body.gravity.y = 700;
        this.player.body.collideWorldBounds = true;
        
        //Player animation
        this.player.animations.add('left', [3,2,1,0], 10, true);
        this.player.animations.add('right', [4,5,6,7], 10, true);
        
         // Camera follow player
        game.camera.follow(this.player);
        
         // Add moving bar
        this.saws = game.add.group();
        this.saws .enableBody = true;
        
        this.saw = this.saws .create(600, 965, 'saw');
        
        this.stopSaw = game.add.tween(this.saw).to( { x: 1500}, 1900, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
        
        this.saw.anchor.setTo(0.5, 0.5);
        
        // Add Sword
        this.sword = game.add.sprite(1270, 890, 'sword');
        game.physics.arcade.enable(this.sword);
        
        // Add elevator
        this.elevators = game.add.group();
        this.elevators.enableBody = true;
        this.elevator = this.elevators.create(1230, 925, 'elevator');
        this.elevator.body.immovable = true;
        
        // Add fence
        this.fences = game.add.group();
        this.fences.enableBody = true;
        
        this.fence = this.fences.create(780, 913,'fence');
        this.fence = this.fences.create(1193 , 913,'fence');
        this.fence = this.fences.create(1372, 913,'fence');
        
        // Add brick
        this.bricks = game.add.group();
        this.bricks.enableBody = true;
        
        this.brick = this.bricks.create(1130, 600, 'brick');
        this.brick.body.immovable = true;
        
        this.brick = this.bricks.create(960, 600, 'brick');
        this.brick.body.immovable = true;
        
        this.brick = this.bricks.create(780, 600, 'brick');
        this.brick.body.immovable = true;
        
        // Add moving Octo
        this.octos = game.add.group();
        this.octos.enableBody = true;
        
        // Add glass
        this.glass = game.add.sprite(0, 950, 'glass');
        
        // Add glass physics
        game.physics.arcade.enable(this.glass);
		this.glass.body.immovable = true;
        
        // Add cursors mode 
        cursors = game.input.keyboard.createCursorKeys();
        
        // BUTTON
	    game.add.button(700, 16,'redo', this.redoGame1, this, 1, 0, 2);
	    game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
		game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
        //text
		game.add.text(16, 16, 'Stage 8', { fontSize: '32px', fill: '#FFF' });
    },
    
    update: function() {
        // Collide
        game.physics.arcade.collide(this.player, this.glass);
        game.physics.arcade.collide(this.player, this.tool);
        game.physics.arcade.collide(this.player, this.elevators);
        game.physics.arcade.collide(this.player, this.bricks);
        
        //Eating!
        game.physics.arcade.overlap(this.player, this.saw, this.killPlayer, null, this);
        game.physics.arcade.overlap(this.player, this.fences, this.killPlayer, null, this);
        game.physics.arcade.overlap(this.player, this.sword, this.killSword, null, this);
        game.physics.arcade.overlap(this.player, this.octos, this.killPlayer, null, this);
        
        // Reset velocity (movement) to 0 from the start
        this.player.body.velocity.x = 0;
        
        // Angle of saw
        this.saw.angle+= -3;
        
        if (cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -180;

        this.player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 180;

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
    
    killPlayer: function() {
        this.player.kill();
        this.sfx3.play();
		this.music.stop();
        this.explode = game.add.sprite(this.player.x, this.player.y - 50, 'explode');
		game.physics.arcade.enable(this.explode);
        this.explode.animations.add('explode', null, 10, true);
		this.explode.animations.play('explode');
    },
    
    killSword: function() {
        this.sword.kill();
        
        this.stopSaw.stop();
        this.elevator.body.velocity.y = -50;
        
        this.octo1 = this.octos.create(1080, 200, 'octo');
        this.octo2 = this.octos.create(910, 700, 'octo');
        this.octo3 = this.octos.create(730, 200, 'octo');
        
        game.add.tween(this.octo1).to( { y: 800 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
        game.add.tween(this.octo3).to( { y: 800 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
        game.add.tween(this.octo2).to( { y: 200 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
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
    
};//End stage10

game.state.add('stage10', stage10);