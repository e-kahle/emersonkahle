const canvas = document.querySelector('canvas'); //get canvas element
const c = canvas.getContext('2d'); //choosing 2d context because 2d game
const startBtn = document.getElementById('start');
let gameStarted = false;
let end = false;
console.log('line 5 index.js');
canvas.width = 1024;
canvas.height = 576;
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w:{
        pressed: false,
        count: 0
    },
    l: {
        pressed: false
    },
    j:{
        pressed: false
    },
    i:{
        pressed: false,
        count: 0
    }
    
}
c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.2;
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png"
});
const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: "./img/shop.png",
    scale: 2.75,
    numFrames: 6
});


let player = new Fighter({
    position:{
    x: 0,
    y: 200
    },
    velocity:{
        x:0,
        y:0
    },
    attackOffset:{
        x: 0,
        y: 0
    },
    imageSrc: "./img/samuraiMack/idle.png",
    numFrames: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 155
    },
    sprites: {
        idle: {
            imageSrc: "./img/samuraiMack/idle.png",
            numFrames: 8
        },
        run: {
            imageSrc: "./img/samuraiMack/run.png",
            numFrames: 8
        },
        jump: {
            imageSrc: "./img/samuraiMack/jump.png",
            numFrames: 2
        },
        fall: {
            imageSrc: "./img/samuraiMack/fall.png",
            numFrames: 2
        },
        attack1: {
            imageSrc: "./img/samuraiMack/Attack1.png",
            numFrames: 6
        },
        takeHit: {
            imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
            numFrames: 4
        },
        death: {
            imageSrc: "./img/samuraiMack/Death.png",
            numFrames: 6
        }

    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 100,
        height: 50
    }
    
});

let enemy = new Fighter({
    position:{
    x: 874,
    y: 200
    },
    velocity:{
        x:0,
        y:0
    },
    attackOffset:{
        x: -50,
        y: 0
    },
    imageSrc: "./img/kenji/idle.png",
    numFrames: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: "./img/kenji/idle.png",
            numFrames: 4
        },
        run: {
            imageSrc: "./img/kenji/run.png",
            numFrames: 8
        },
        jump: {
            imageSrc: "./img/kenji/jump.png",
            numFrames: 2
        },
        fall: {
            imageSrc: "./img/kenji/fall.png",
            numFrames: 2
        },
        attack1: {
            imageSrc: "./img/kenji/Attack1.png",
            numFrames: 4
        },
        takeHit: {
            imageSrc: "./img/kenji/Take hit.png",
            numFrames: 3
        },
        death: {
            imageSrc: "./img/kenji/Death.png",
            numFrames: 7
        }

    },
    attackBox: {
        offset: {
            x: -50,
            y: 0
        },
        width: 100,
        height: 50
    }
    
});
//console.log(enemy.sprites.idle.numFrames);

console.log(player);
let timer = 60;
let timerId;
console.log(gameStarted);



let lastKey;
function animate(){
    console.log(gameStarted);
    if(gameStarted){
        window.requestAnimationFrame(animate);
        c.fillStyle = 'black';
        c.fillRect(0,0,canvas.width, canvas.height);
        background.update();
        shop.update();
        c.fillStyle = 'rgba(255,255,255, 0.15)';
        c.fillRect(0,0, canvas.width, canvas.height);
        player.update();
        enemy.update();
        player.velocity.x = 0;
        if(player.position.y + player.height >= canvas.height -96){
            keys.w.count = 0;
        }
        if(keys.a.pressed && player.lastKey == 'a'){
            player.velocity.x = -4;
            player.switchSprite('run');
        }
        else if(keys.d.pressed && player.lastKey == 'd'){
            player.velocity.x = 4;
            player.switchSprite('run');
        }
        else if(keys.d.pressed){
            player.velocity.x = 4;
            player.switchSprite('run');
        }
        else if(keys.a.pressed){
            player.velocity.x =-4;
            player.switchSprite('run');
        }
        else{
            player.switchSprite('idle');
        }
        if(player.velocity.y <0){
            player.switchSprite('jump');
        }
        else if(player.velocity.y > 0){
            player.switchSprite('fall');
        }
        enemy.velocity.x = 0;
        if(enemy.position.y + enemy.height >= canvas.height -96){
            keys.i.count = 0;
        }
        if(keys.j.pressed && enemy.lastKey == 'j'){
            enemy.velocity.x = -4;
            enemy.switchSprite('run');
        }
        else if(keys.l.pressed && enemy.lastKey == 'l'){
            enemy.velocity.x = 4;
            enemy.switchSprite('run');
        }
        else if(keys.l.pressed){
            enemy.velocity.x = 4;
            enemy.switchSprite('run');
        }
        else if(keys.j.pressed){
            enemy.velocity.x =-4;
            enemy.switchSprite('run');
        }
        else{

            enemy.switchSprite('idle');
        }
        if(enemy.velocity.y < 0){
            enemy.switchSprite('jump');
        }
        else if(enemy.velocity.y > 0){
            enemy.switchSprite('fall');
        }
        /*if(keys.d.pressed && keys.a.pressed){
            player.velocity.x = 0;
        }*/
        //detect collision
        //console.log(player.position.x + ' | ' + enemy.position.x + enemy.width);
        /*if(player.attackBox.position.x + player.attackBox.width >= enemy.attackBox.position.x && player.position.x <= enemy.position.x + enemy.width &&  player.attackBox.position.y +player.attackBox.height >= enemy.position.y && player.attackBox.position.y <= enemy.position.y + enemy.height && player.isAttacking){
            player.isAttacking = false;
            console.log('player hits');
        
        }*/
        if(rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.frameCurrent ==4 && player.image == player.sprites.attack1.image){
            console.log(player.frameCurrent);
            player.isAttacking=false;
            console.log('player hits');
            enemy.takeHit();

            //console.log(enemy.image == enemy.sprites.death.image);
            //document.querySelector('#enemyHealth').style.width = enemy.health + '%';
            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
            })
        }
        //console.log(player.isAttacking + '|' + player.frameCurrent);
        /*if(player.isAttacking && player.frameCurrent ==7){
            player.isAttacking = false;
        }*/
        if(rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.frameCurrent ==2){
            //console.log(enemy.frameCurrent);
            enemy.isAttacking = false;
            console.log('enemy hits');
            player.takeHit();
            console.log(player.image == player.sprites.death.image);
            
            //document.querySelector('#playerHealth').style.width = player.health + '%';
            gsap.to('#playerHealth', {
                width: player.health + '%'
            });
        }
        if(enemy.isAttacking && enemy.frameCurrent ==2){
            enemy.isAttacking = false;
        }
        if((player.health <=0 || enemy.health <= 0) && !end ){
            end = true;
            determineWinner({
                player: player,
                enemy: enemy,
                timerId: timerId
            });
        }
    }
}




window.addEventListener('keydown', (event)=> {
    if(!player.dead){
        switch (event.key){
        
            case 'd': 
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a': 
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                console.log(keys.w.count);
                if(keys.w.count < 2){
                    player.velocity.y -=8;
                }
                keys.w.count++;
                break;
            case ' ':
                player.attack();
                break;  
        }
    }
    console.log('event dead ' + event.dead);
    if(!enemy.dead){
        switch (event.key){
            case 'l':
                keys.l.pressed = true;
                enemy.lastKey = 'l';
                break;
            case 'j':
                keys.j.pressed = true;
                enemy.lastKey = 'j';
                break;
            case 'i':
                //console.log(keys.i.count);
                if(keys.i.count < 2){
                    enemy.velocity.y -=8;
                }
                keys.i.count++;
                break;
            case 'n':
                enemy.attack();
                break;
        }
    }
    
    //.log(event.key);
})
window.addEventListener('keyup', (event)=> {
    switch (event.key){
        case 'd': 
            keys.d.pressed = false;
            break;
        case 'a': 
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 'l':
            keys.l.pressed = false;
            break;
        case 'j':
            keys.j.pressed = false;
            break;
        case 'i':
            keys.i.pressed = false;
            break;
    }
    //console.log(event.key);
})

startBtn.addEventListener("click", function(e){
    gameStarted = true;
    timer = 60;
    document.querySelector('#enemyHealth').style.width = 100 + '%';
    document.querySelector('#playerHealth').style.width = 100 + '%';
    player = new Fighter({
        position:{
        x: 100,
        y: 200
        },
        velocity:{
            x:0,
            y:0
        },
        attackOffset:{
            x: 0,
            y: 0
        },
        imageSrc: "./img/samuraiMack/idle.png",
        numFrames: 8,
        scale: 2.5,
        offset: {
            x: 215,
            y: 155
        },
        sprites: {
            idle: {
                imageSrc: "./img/samuraiMack/idle.png",
                numFrames: 8
            },
            run: {
                imageSrc: "./img/samuraiMack/run.png",
                numFrames: 8
            },
            jump: {
                imageSrc: "./img/samuraiMack/jump.png",
                numFrames: 2
            },
            fall: {
                imageSrc: "./img/samuraiMack/fall.png",
                numFrames: 2
            },
            attack1: {
                imageSrc: "./img/samuraiMack/Attack1.png",
                numFrames: 6
            },
            takeHit: {
                imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
                numFrames: 4
            },
            death: {
                imageSrc: "./img/samuraiMack/Death.png",
                numFrames: 6
            }
            
        },
        attackBox: {
            offset: {
                x: 75,
                y: 50
            },
            width: 150,
            height: 50
        }
        
    });
    enemy = new Fighter({
        position:{
        x: 874,
        y: 200
        },
        velocity:{
            x:0,
            y:0
        },
        attackOffset:{
            x: -50,
            y: 0
        },
        imageSrc: "./img/kenji/idle.png",
        numFrames: 4,
        scale: 2.5,
        offset: {
            x: 215,
            y: 167
        },
        sprites: {
            idle: {
                imageSrc: "./img/kenji/idle.png",
                numFrames: 4
            },
            run: {
                imageSrc: "./img/kenji/run.png",
                numFrames: 8
            },
            jump: {
                imageSrc: "./img/kenji/jump.png",
                numFrames: 2
            },
            fall: {
                imageSrc: "./img/kenji/fall.png",
                numFrames: 2
            },
            attack1: {
                imageSrc: "./img/kenji/Attack1.png",
                numFrames: 4
            },
            takeHit: {
                imageSrc: "./img/kenji/Take hit.png",
                numFrames: 3
            },
            death: {
                imageSrc: "./img/kenji/Death.png",
                numFrames: 7
            }
    
        },
        attackBox: {
            offset: {
                x: -170,
                y: 50
            },
            width: 150,
            height: 50
        }
        
    });
    end = false;
    console.log(enemy.sprites.idle.numFrames);
    startBtn.style.display = 'none';
    decreaseTimer();
    animate();
});

