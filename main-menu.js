var mainmenu = {
	preload: function() {
		game.load.image('main', 'pic/stage32.jpg');
		game.load.image('brick', 'pic/brick.png');
		game.load.spritesheet('button','pic/buttonhover.png', 289, 90);
		game.load.spritesheet('player','pic/yolo.png', 61, 71);
		game.load.spritesheet('think','pic/think.png', 59, 62);
		game.load.audio('music', 'sound/Dubstep 8bit.ogg');
		game.load.audio('sfx1', 'sound/Eat.ogg');
		game.load.spritesheet('soundbutton','pic/soundbutton.png', 59, 51);
		
	},
	
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.add.sprite(0, 0, 'main');
		
		this.player = game.add.sprite(500, 0, 'player');
		// Add physic for player
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.5;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
		
		//start but
		this.button = game.add.sprite(419, 387, 'brick'); 
		game.add.button(419, 387,'button', this.startGame, this, 1, 0, 2);
		game.physics.arcade.enable(this.button);
		this.button.body.immovable = true;
		
		//choose level
		game.add.button(680, 250,'think', this.chooseLevel, this, 1, 0);
	
		//Soundtrack
    this.music = game.add.audio('music');
    this.music.play();
	this.sfx1 = game.add.audio('sfx1');		
	
	//BUTTON SOUND
	game.add.button(560, 16,'soundbutton', this.soundOff, this, 1, 0, 2);
	
	},	
	
	update: function() {
             //Collide bird and coin
        game.physics.arcade.collide(this.player, this.button);
		},
	
	chooseLevel: function(){
		this.sfx1.play();
		this.music.stop();
		game.state.start('chooseLevel');
	},
	
    startGame: function() {
		this.sfx1.play();
		this.music.stop();
        game.state.start('stage1');
    },
	
	soundOff: function(){
		this.music.stop();
	}
}
game.state.add('mainmenu', mainmenu);
game.state.start('mainmenu');