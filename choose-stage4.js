var chooseStage4 = {
	preload: function() {
		game.load.image('main', 'pic/mainMenuTheme.jpg');
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('easy','pic/easy.png', 289, 90);
		game.load.spritesheet('hard','pic/hard.png', 289, 90);
		game.load.audio('sfx1', 'sound/Eat.ogg');
	},
	
	create: function() {
		this.sfx1 = game.add.audio('sfx1');
		
		game.add.sprite(0, 0, 'main');
		
		game.add.button(400, 100,'easy', this.startEasy, this, 1, 0, 2);
		
		game.add.button(400, 300,'hard', this.startHard, this, 1, 0, 2);
		
		game.add.text(100, 240, 'Choose Stage 4:', { fontSize: '32px', fill: '#000' });
	},
	
	update: function() {
	},
	
	mainMenuReturn: function(){
		this.sfx1.play();
		game.state.start('mainmenu');
	},
	
	startEasy: function(){
		this.sfx1.play();
		game.state.start('stage4easy');
	},
	
	startHard: function(){
		this.sfx1.play();
		game.state.start('stage4');
	},	
};

game.state.add('chooseStage4', chooseStage4);