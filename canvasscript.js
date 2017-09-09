
    var stage;
    var monsters; //array with all the monsters. each monster has color string, "defeated" boolean, x coordinate int 
    var speed = 10; //pixel per second movement of monsters
    var colors = ["pink", "orange", "yellow", "green", "blue", "purple", "black"]

    //initiation functions
    function init(){
        stage =  new createjs.Stage("demoCanvas");
        monsters = []; 
        //creating the main character
        var circle = new createjs.Shape();
        loadCharacter(); 
//        circle.graphics.beginFill("DeepSkyBlue").drawRect(20, 20, 100, 50);
//        circle.x = 100;
//        circle.y = 600;
//        stage.addChild(circle);
        stage.update();
    }

    //main koala character
    function loadCharacter(){
        var data = {
            images: ["sprites1.png"],
            frames: {width:50, height:50},
            animations: {
                stand:0,
                run:[1,5],
                jump:[6,8,"run"]
            }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var animation = new createjs.Sprite(spriteSheet);
        animation.x = 100; 
        animation.gotoAndPlay("run");                         
        animation.y = 600; 
        animation.currentFrame = 0; 
        stage.addChild(animation); 
    }
    
     createjs.Ticker.addEventListener("tick", handleTick);
     function handleTick(event) {
         // Actions carried out each tick (aka frame)
         for(i=0; i<monsters.length; i++){
             if(!monsters[i].defeated){
                if(monsters[i].x <= 200 && !monsters[i].defeated){
                     monsterwarning(i); 
                 }
                 monsters[i].x -= speed; 

                 monsterShape = monsters[i].shape; 
                 monsters[i].shape.x = monsters[i].x
                 stage.addChild(monsters[i].shape); 
             }
         }
         stage.update(); 
         if (!event.paused) {
             // Actions carried out when the Ticker is not paused.
         }
    }
    //called when monsters reach a certain point 
    function monsterwarning(i){
        monsters[i].defeated = true; 
        monsters[i].color = "#FF0000"; 
        monsters[i].command.style = monsters[i].color; 
        console.log("lost a life"); 
    }
    function newmonster(){
        var monster = {color:getRandomColor(), x: 1050, defeated: false, shape: null, command: null }
        var monsterShape = new createjs.Shape();
        monster.command = monsterShape.graphics.beginFill(monster.color).command;
        monsterShape.graphics.drawCircle(0, 0, 50);
        monsterShape.x = monster.x;
        monsterShape.y = 600;
        monster.shape = monsterShape; 
        stage.addChild(monsterShape);
        stage.update();
        monsters.push(monster); 
    }

    function getRandomColor() {
        return colors[Math.floor(Math.random() * 8)];
    }

    //goes through list of monsters from beginning, changes color of first non-defeated one to white
    function defeatmonster(){
        var i = 0; 
        while(i < monsters.length && monsters[i].defeated){
            console.log(monsters[i]); 
            i++; 
        }
        if(i < monsters.length){
            monsters[i].defeated = true; 
            monsters[i].color = "#DDDDDD"; 
            monsters[i].command.style = monsters[i].color; 
            stage.addChild(monsters[i].shape);
            stage.update();

        }
    }


    

