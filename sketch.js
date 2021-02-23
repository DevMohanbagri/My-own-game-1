var play=1;
var end=0;
var gameState = play;
var active_animal="bear";

var caveman,caveman_running,cavemanImage;
var animal,bear1_running;
var bground,bgroundImage,invisibleGround;
var trap,trapImage,trapGroup;
var tree,treeImage,treeGroup;
var gameover,gameoverImage;
var fruitGroup;
var win,winImage;
var score = 0;
var honey,honeyBee,honeyBeeImg ,honeyImg;

function preload(){
  caveman_running = loadAnimation("caveman1.png","caveman2.png","caveman3.png","caveman4.png");
  cavemanImage = loadAnimation("caveman_jump.png");
  bear1_running = loadAnimation("bear1.png","bear2.png","bear3.png","bear4.png","bear5.png");
  bear1Image = loadAnimation("bear_jump.png");
  bearDie = loadAnimation("bearDie.png");
  bgroundImage = loadImage("bg.jpg");
  treeImage = loadImage("tree.png");
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkeyImage = loadAnimation("Monkey_04.png");
  trapAnimation = loadAnimation("trap_1.png","trap_2.png","trap_3.png","trap_4.png","trap_5.png");
  trapImage = loadImage("trap_1.png");
  bananaImage = loadImage("banana.png");
  cherryImage = loadImage("cherry.png");
  // gameoverImage = loadImage("gameover.png");
  // winImage = loadImage("youwin.png");
  fox_running = loadAnimation("fox.png","fox_2.png","fox_3.png","fox_4.png","fox_5.png","fox_6.png","fox_7.png");
  foxImage = loadAnimation("fox_2.png");
  honeyBeeImg = loadAnimation("bee1.png","bee2.png");
  honeyImg = loadImage("honey.png");
}

function setup(){
  createCanvas(600,500);
  
  bground = createSprite(300,200,1200,500);
  bground.addImage(bgroundImage);
  bground.scale = 3;
  
  invisibleGround = createSprite(300,360,600,5);
  invisibleGround.shapeColor = "red";
  invisibleGround.visible = false;
  
  caveman = createSprite(100,340,50,50);
  caveman.addAnimation("c_running",caveman_running);
  caveman.addAnimation("c_rest",cavemanImage);
  caveman.scale = 0.3;
  
  animal = createSprite(250,340,50,50);
  
  animal.addAnimation("b_running",bear1_running);
  animal.addAnimation("b_rest",bear1Image);

  animal.addAnimation("f_running",fox_running);
  animal.addAnimation("f_rest",foxImage);

  animal.addAnimation("m_running",monkeyRunning);
  animal.addAnimation("m_rest",monkeyImage);
  

  animal.scale = 0.4;

  for(var h = 0; h<5; h++){
    honeyBee = createSprite(random(250,300),random(340,380),10,10);
    honeyBee.addAnimation("honeyBee", honeyBeeImg);
    honeyBee.scale = 0.2;
    honeyBee.visible = false;
  }
  
  gameover = createSprite(300,100,50,50);
 // gameover.addImage(gameoverImage);
  gameover.visible = false;
  
  win = createSprite(300,100,50,50);
 // win.addImage(winImage);
  win.visible = false;
  
  treeGroup = new Group();
  trapGroup = new Group();
  fruitGroup =new Group();
}
  

function draw(){
  background("white");
  
  spawntree();
  spawnfruit();
 animal.debug = true
  if(gameState===play){
    bground.velocityX = -(5+0.5*score/100);
    if (bground.x < 0)
        bground.x = bground.width/2; 
  
    if(keyDown(UP_ARROW)&& animal.y>320){
      console.log("up" + gameState);
      animal.velocityY = -(12+0.1*score/100);
    }

    if(caveman.y<320){
      caveman.changeAnimation("c_rest",cavemanImage);
    }
    else{
    caveman.changeAnimation("c_running",caveman_running);
    }
    
   if(keyDown("b")){
      animal.changeAnimation("b_running",bear1_running);
      animal.scale = 0.3;
      active_animal = "bear";
    }
    else if(keyDown("f")){
      animal.changeAnimation("f_running",fox_running);
      animal.scale = 0.4;
      active_animal = "fox";
    }
    else if(keyDown("m")){
      animal.changeAnimation("m_running",monkeyRunning);
      animal.scale = 0.08;
      active_animal = "monkey";
  }

    score = score + Math.round(frameRate()/60);
    
    if(trapGroup.isTouching(animal)){ 
      gameState = end;
    //  bear1.velocityY = bear1.velocityY-(1+0.4*score/100);
    }
    
    if(treeGroup.isTouching(animal)){
      gameState = end;
     // bear1.velocityY = bear1.velocityY-(1+0.08*score/100);
    }

    if(trapGroup.isTouching(caveman)){
      caveman.velocityY = -15;  // to go up
      caveman.changeAnimation("c_rest",cavemanImage);
      console.log("jump");
    }
    
    
    if(treeGroup.isTouching(caveman)){
      caveman.velocityY = -(1+0.08*score/100);
      
    }

    if(fruitGroup.isTouching(animal)){
      fruitGroup.destroyEach();
      animal.scale += 0.1;
      score += 100;
     
    }


    if(animal.y<320 && active_animal === "bear"){
      animal.changeAnimation("b_rest",bear1Image);
    }
    else{
     animal.changeAnimation("b_running",bear1_running);
    }
  
    if(animal.y<320 && active_animal === "fox"){
      animal.changeAnimation("f_rest",foxImage);
    }
    else{
     animal.changeAnimation("f_running",fox_running);
    }
  
    if(animal.y<320 && active_animal === "monkey"){
      animal.changeAnimation("m_rest",monkeyImage);
    }
    else{
      animal.changeAnimation("m_running",monkeyRunning);
    }

  //bear1.velocityX = bear1.velocityX - 0.00001;
  
  }
  
/*
  
  */
    
 
  if(gameState===end){
    score = 0;
    console.log(active_animal)
    if(active_animal === "bear")
      animal.changeAnimation("b_rest",bear1Image);
    else if(active_animal=== "fox")
      animal.changeAnimation("f_rest", foxImage);
    else if(active_animal ==="monkey")
      animal.changeAnimation("m_rest", monkeyImage);

   // caveman.debug = true;
    caveman.setCollider("rectangle",0,0,100,240);
    
    treeGroup.setLifetimeEach(-1);
    treeGroup.setVelocityXEach(0);
    
    trapGroup.setLifetimeEach(-1);
    trapGroup.setVelocityXEach(0);

    fruitGroup.setLifetimeEach(-1);
    fruitGroup.setVelocityXEach(0);
    
    gameover.visible = true;



    caveman.velocityX = caveman.velocityX+0.2;
    caveman.collide(animal);

    bground.velocityX = 0;
    
  

  }

  caveman.collide(invisibleGround);
  animal.velocityY = animal.velocityY + 0.5+0.05*score/100;
  animal.collide(invisibleGround);
  caveman.velocityY = caveman.velocityY + 0.5+0.02*score/100;
  caveman.debug = true;
  console.log(caveman.y);
  
 /* if(caveman.isTouching(bear1)){
    win.visible = true;
    score = 0;
    bground.velocityX = 0;
    
    bear1.velocityX = 0;
    caveman.velocityX = 0;
    
    treeGroup.setLifetimeEach(-1);
    treeGroup.setVelocityXEach(0);
    
    trapGroup.setLifetimeEach(-1);
    trapGroup.setVelocityXEach(0);
    
    
  }*/


  
 // caveman.debug = true;
 // bear1.debug = true;
 
  caveman.setCollider("rectangle",100,0,350,240)
  animal.setCollider("rectangle",0,0,140,130);

  console.log(active_animal);
  
  drawSprites();
  
  textSize(25);
  stroke("black");
  fill("black");
  text("Score:"+score,420,50);
}

function spawntree(){
  if (frameCount % 250===0){
    var rand=Math.round(random(1,2))
    switch(rand){
      case 1:
        tree = createSprite(random(700,800),355,50,50);
        tree.addImage(treeImage);
        tree.velocityX = -(5+0.5*score/100);
        tree.scale = 0.3;
        tree.depth = caveman.depth;
        caveman.depth = caveman.depth+1;     
        tree.lifetime = 300; 
        treeGroup.add(tree);
        break;
      case 2: 
        trap = createSprite(random(1000,1100),355,50,50);
        trap.addImage(trapImage);
        trap.velocityX = -(5+0.5*score/100);       
        trap.scale = 0.2;
        //trap.depth = caveman.depth;
        //caveman.depth = caveman.depth+1;
        //trap.depth = bear1.depth;
        //bear1.depth = bear1.depth+1;
        trap.lifetime = 300;
        trapGroup.add(trap);

    }
    

   
  }
}

function spawnfruit(){
  if(frameCount % 400===0){
  fruit = createSprite(700,355,50,50);
  fruit.velocityX = -(5+0.5*score/100);
  fruit.lifetime = 500;
  switch(active_animal){
    case "bear" : 
      fruit.addImage(honeyImg);
      fruit.scale = 0.2;
    break;

    case "fox" :
      fruit.addImage(cherryImage);
      fruit.scale = 0.2;
    break;

    case "monkey" :
      fruit.addImage(bananaImage);
      fruit.scale = 0.2;
    break;
  }
    fruitGroup.add(fruit);
  }
}












































