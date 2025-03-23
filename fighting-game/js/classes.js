class Sprite{
    constructor({position, imageSrc, scale = 1, numFrames = 1, offset = {x: 0, y: 0}}){
        this.position = position;
        this.height = 150;
        this.width =50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.numFrames = numFrames;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
        this.dead = false;
    }
    draw(){
        c.drawImage(
            this.image, 
            this.frameCurrent * (this.image.width/this.numFrames),
            0,
            this.image.width/this.numFrames,
            this.image.height,
            this.position.x-this.offset.x, 
            this.position.y-this.offset.y, 
            (this.image.width/this.numFrames )* this.scale, 
            this.image.height* this.scale);
    }
    update(){
        this.draw();
        this.animateFrames();
    }
    animateFrames(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold == 0){
            //console.log(this.numFrames);
            if(this.frameCurrent < this.numFrames-1){
                this.frameCurrent++;
            }
            else{
                this.frameCurrent = 0;
            }
        }
    }
}
class Fighter extends Sprite{
    constructor({position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        numFrames = 1, 
        offset = {x: 0, y: 0}, 
        sprites, 
        attackBox = {offset: {}, width: undefined, height: undefined}}){
        super({
            position,
            imageSrc,
            scale,
            numFrames,
            offset
        });
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.velocity = velocity;
        this.height = 150;
        this.width =50;
        this.lastKey;
        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
        this.sprites = sprites;
        for (const sprite in this.sprites){
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
        console.log(this.sprites)
    }
    /*draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //attack box
        if(this.isAttacking){
            c.fillStyle = 'green';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }*/
    update(){
        this.attackBox.position.x = this.position.x+this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        this.draw();
        if(!this.dead){
            console.log(this.frameCurrent);
            this.animateFrames();
        }
        
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height >= canvas.height-96){
            //console.log('this pos ' + (this.position.y+this.height));
            //console.log('canvas' + canvas.height);
            this.velocity.y = 0;
            this.position.y = canvas.height-this.height -96;
        }
        else{
            this.velocity.y += gravity;
        }
        
    }
    attack(){
        
        this.switchSprite('attack1');
        this.isAttacking = true;
    }
    takeHit(){
        this.health -= 10;
        if(this.health <= 0){
            this.switchSprite('death');
        }
        else{
            this.switchSprite('takeHit');
        }
  
    }
    switchSprite(sprite){
        //console.log(this.image);
        if(this.image == this.sprites.death.image) {
            if(this.frameCurrent == this.sprites.death.numFrames-1){
                this.dead = true;
               // console.log('this.dead '+ this.dead);
            }
            return;
        }
        if(this.image == this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.numFrames -1) return;
        if(this.image == this.sprites.attack1.image){
            //console.log(this.frameCurrent + ' | ' + this.isAttacking);
        }
        if(this.image == this.sprites.takeHit.image && this.frameCurrent < this.sprites.takeHit.numFrames-1) return;
        
        switch(sprite){
            case 'idle':
                if(this.image != this.sprites.idle.image){
                    this.image = this.sprites.idle.image;
                    //console.log(this.position.x + " | " + this.sprites.idle.numFrames);
                    this.numFrames = this.sprites.idle.numFrames;
                    this.frameCurrent = 0;
                }
                break;
            case 'run':
                if(this.image != this.sprites.run.image){
                    this.image = this.sprites.run.image;
                    this.numFrames = this.sprites.run.numFrames;
                    this.frameCurrent = 0;
                }
                break;
            case 'jump':
                if(this.image != this.sprites.jump.image){
                    this.image = this.sprites.jump.image;
                    this.numFrames = this.sprites.jump.numFrames;
                    this.frameCurrent = 0;
                }
                break;
            case 'fall':
                if(this.image != this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.numFrames = this.sprites.fall.numFrames;
                    this.frameCurrent=0;
                }
                break;
            case 'attack1':
                if(this.image != this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image;
                    this.numFrames = this.sprites.attack1.numFrames;
                    this.frameCurrent=0;
                }
                break;
            case 'takeHit':
                if(this.image != this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image;
                    this.numFrames = this.sprites.takeHit.numFrames;
                    this.frameCurrent=0;
                }
                break;
            case 'death':
                if(this.image != this.sprites.death.image){
                    this.image = this.sprites.death.image;
                    this.numFrames = this.sprites.death.numFrames;
                    this.frameCurrent=0;
                }
                break;

        }
    }
}