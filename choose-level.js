var chooseLevel = {
	preload: function() {
		game.load.image('main', 'pic/mainMenuTheme.jpg');
		game.load.spritesheet('mainmenubutton','pic/mainmenubutton.png', 59, 51);
		game.load.spritesheet('1','pic/1.png', 59, 51);
		game.load.spritesheet('2','pic/2.png', 59, 51);
		game.load.spritesheet('3','pic/3.png', 59, 51);
		game.load.spritesheet('4','pic/4.png', 59, 51);
		game.load.spritesheet('5','pic/5.png', 59, 51);
		game.load.spritesheet('6','pic/6.png', 59, 51);
		game.load.spritesheet('7','pic/7.png', 59, 51);
        game.load.spritesheet('8','pic/8.png', 59, 51);
        game.load.spritesheet('10','pic/10.png', 59, 51);
		game.load.audio('sfx1', 'sound/Eat.ogg');
	},
	
	create: function() {
		this.sfx1 = game.add.audio('sfx1');
		
		game.add.sprite(0, 0, 'main');
		
		game.add.button(630, 16,'mainmenubutton', this.mainMenuReturn, this, 1, 0, 2);
		
		game.add.button(200, 200,'1', this.one, this, 1, 0, 2);
		game.add.button(300, 200,'2', this.two, this, 1, 0, 2);
		game.add.button(400, 200,'3', this.three, this, 1, 0, 2);
		game.add.button(500, 200,'4', this.four, this, 1, 0, 2);
		game.add.button(200, 300,'5', this.five, this, 1, 0, 2);
		game.add.button(300, 300,'6', this.six, this, 1, 0, 2);
		game.add.button(400, 300,'7', this.seven, this, 1, 0, 2);
        game.add.button(500, 300,'8', this.eight, this, 1, 0, 2);
        
        game.add.button(200, 400,'10', this.ten, this, 1, 0, 2);
	},
	
	update: function() {
	},
	
	mainMenuReturn: function(){
		this.sfx1.play();
		game.state.start('mainmenu');
	},
	
	one: function(){
		this.sfx1.play();
		game.state.start('stage1');
	},
	two:function(){
		this.sfx1.play();
		game.state.start('chooseStage2');
	},
	three:function(){
		this.sfx1.play();
		game.state.start('stage3');
	},
	four:function(){
		this.sfx1.play();
		game.state.start('chooseStage4');
	},
	five:function(){
		this.sfx1.play();
		game.state.start('stage5');
	},
	six:function(){
		this.sfx1.play();
		game.state.start('stage6');
	},
	seven:function(){
		this.sfx1.play();
		game.state.start('stage7');	
	},
    eight:function(){
		this.sfx1.play();
		game.state.start('stage8');	
	},
    ten:function(){
		this.sfx1.play();
		game.state.start('stage10');	
	}
};

game.state.add('chooseLevel', chooseLevel);