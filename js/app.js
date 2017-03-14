// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed = 300;
    this.x = 0;
    this.y = 0;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    //console.log("update enemy " + dt);
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = (this.x + this.speed * dt) % 505
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//判断是否系相交
Enemy.prototype.isInsideRect = function (rect) {
    return (this.isPointInsideRect(this.x,this.y,rect)
    || this.isPointInsideRect(this.x + 101, this.y, rect)
    || this.isPointInsideRect(this.x, this.y + 83, rect)
    || this.isPointInsideRect(this.x + 101, this.y + 83, rect));
};
Enemy.prototype.isPointInsideRect = function(px,py,rect){
    return px > rect[0] && px< (rect[0] + rect[2]) && py > rect[1] && py < (rect[1] + rect[3]);
};


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.ysteps = [-10, 70, 155,235, 320, 405 ];
    this.xsteps = [0, 101, 202, 303, 404];
    this.sprites =['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
    this.reset();
};

Player.prototype.changeStyle = function (idx) {
    this.sprite = this.sprites[idx % this.sprites.length];
};

Player.prototype.reset = function() {
    this.xidx = parseInt(this.xsteps.length / 2);
    this.yidx = this.ysteps.length - 1;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function () {
    var x = Resources.get(this.sprite);
    ctx.drawImage(x, this.xsteps[this.xidx], this.ysteps[this.yidx]);
};

Player.prototype.playerRect = function () {
    return [this.xsteps[this.xidx], this.ysteps[this.yidx], 101, 83];
};

Player.prototype.handleInput = function (key) {
    switch(key){
        case "left":
            this.xidx = (this.xidx - 1 + this.xsteps.length) % this.xsteps.length;
            break;
        case "right":
            this.xidx = (this.xidx + 1) % this.xsteps.length;
            break;
        case "up":
            this.yidx = (this.yidx - 1 + this.ysteps.length) % this.ysteps.length;
            break;
        case "down":
            this.yidx = (this.yidx + 1) % this.ysteps.length;
            break;
    }
};

Player.prototype.isWin = function () {
    return this.yidx === 0;
};

var Score = function(){
    this.mi = 1;
    this.gr = 0;
    this.di = 0;
};

Score.prototype.incMission = function () {
    this.mi = this.mi + 1;
};

Score.prototype.incGrade = function () {
    this.gr = this.gr + 1;
};
Score.prototype .incDiamond = function(){
    this.di = this.di + 1;
};

Score.prototype.reset = function () {
    this.gr = 0;
    this.mi = 1;
    this.di = 0;
};

Score.prototype.render = function(){
    ctx.font = "bold 10px Arial";
    ctx.fillText("grade:" + this.gr, 10,550);
    ctx.fillText("mission:"+this.mi,10,570);
    ctx.fillText("diamond:"+this.di,110,550);
};

var Diamond = function(){
    this.gem = "images/Gem Blue.png";
    this.gems = ["images/Gem Blue.png","images/Gem Green.png","images/Gem Orange.png"];
    this.x = 0;
    this.y = 0;

};
Diamond.prototype.chooseGem = function(ind){
    this.gem = this.gems[ind % this.gems.length];
};
Diamond.prototype.render = function(){
    ctx.drawImage(Resources.get(this.gem),this.x,this.y);
};
Diamond.prototype.isGet= function(){
    allDiamonds.forEach(function(diamond){
         return this.x === player.xsteps[xidx] && this.y === player.ysteps[yidx];
        })
};



// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies = [];
var enemy1 = new Enemy();
enemy1.y = 155;
enemy1.x = 0;
enemy1.speed = 200;
var enemy2 = new Enemy();
enemy2.y = 75;
enemy2.x = 50;
enemy2.speed = 180;
var enemy3 = new Enemy();
enemy3.y = 235;
enemy3.x = 0;
var enemy4 = new Enemy();
enemy4.x = 50;
enemy4.y = 75;
enemy4.speed = 300;


allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

var player = new Player();
player.changeStyle(3);

var score = new Score();

var allDiamonds = [];
var diamond1 = new Diamond();
diamond1.x = 0;
diamond1.y = 70;
diamond1.chooseGem(0);

var diamond2 = new Diamond();
diamond2.x = 202;
diamond2.y = 155;
diamond2.chooseGem(1);

var diamond3 = new Diamond();
diamond3.x = 303;
diamond3.y = 320;
diamond3.chooseGem(2);

allDiamonds.push(diamond1);
allDiamonds.push(diamond2);
allDiamonds.push(diamond3);




// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* var playerImage = document.getElementsByTagName("img");
var context = document.getElementsByTagName("span");
function dip(){
    for(var i = 0; i< playerImage.length; i++){
        playerImage[i].onmouseover = function(){
            context[i].style.display = "block";
    }
}
}
dip();
 */