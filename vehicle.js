class Vehicle{
    constructor(x,y,p){
        this.p = p;
        this.pos = this.p.createVector(this.p.random(400),this.p.random(400));
        this.target = this.p.createVector(x,y);
        this.vel = p5.Vector.random2D();
        this.acc = this.p.createVector();
        this.r = 8;
        this.maxSpeed = 5;
        this.maxForce = 1;
        
    }

    behaviour() {
        var seek = this.arrive();
        var m = this.p.createVector(this.p.mouseX,this.p.mouseY);
        var flee = this.flee(m);

        seek.mult(1);
        flee.mult(2);

        this.applyForce(seek);
        this.applyForce(flee);

    }

    applyForce(f){
        this.acc.add(f);
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show(){
        this.p.stroke(255);
        this.p.strokeWeight(2);
        this.p.point(this.pos.x, this.pos.y);
    }

    arrive(){
        var desired = p5.Vector.sub(this.target,this.pos);
        var d = desired.mag();
        var speed = this.maxSpeed;
        if (d<100){
            var speed = this.p.map(d,0,100,0,this.maxSpeed);
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired,this.vel);
        steer.limit(this.maxForce);
        return steer;
    }


    flee(target){
        var desired = p5.Vector.sub(target,this.pos);
        var d = desired.mag();
        if(d<50){
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired,this.vel);
            steer.limit(this.maxForce);
            return steer;
        }else{
            return this.p.createVector(0,0);
        }
        
    }
}


