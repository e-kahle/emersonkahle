function rectangularCollision({rectangle1, rectangle2}){
    return rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.attackBox.position.y +rectangle1.attackBox.height >= rectangle2.position.y 
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
        && rectangle1.isAttacking;
    
}
function showStart(){
    document.querySelector('#displayText').style.display = 'none';
    gameStarted = false; 
    console.log('line 12 utils.js');
    startBtn.style.display = 'block';
    
}
function determineWinner({player, enemy, timerId}){
    if(gameStarted){
        console.log('hi');
        clearTimeout(timerId);
        if(player.health == enemy.health){
            document.querySelector('#displayText').innerHTML = 'Tie!';
        
        } 
        else if(player.health > enemy.health){
            document.querySelector('#displayText').innerHTML = 'Player 1 Wins!';
        
        }
        else if(player.health < enemy.health){
            document.querySelector('#displayText').innerHTML = 'Enemy Wins!';
        }
        document.querySelector('#displayText').style.display = 'flex';
        document.querySelector('#enemyHealth').style.width = 100+ '%';
        document.querySelector('#playerHealth').style.width = 100+ '%';
        setTimeout(showStart, 3000);
    }
}
function decreaseTimer(){
    
    if(timer > 0){
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    } 
    if(timer == 0){
        determineWinner({
            player: player,
            enemy: enemy,
            timerId: timerId
        });
    }
}