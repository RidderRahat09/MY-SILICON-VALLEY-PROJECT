var player, playershootsimg, playerdieimg, playerwalkimg
var enemy, enemyimg
var gameState = "wait"

var bgimg
var obs, obsimg, obstacle, obsgroup

function preload() {
    obsimg = loadAnimation("bg_removed/obs/1.png"/*,"bg_removed/obs/2.png","bg_removed/obs/3.png","bg_removed/obs/4.png"*/)
    playershootsimg = loadAnimation("bg_removed/player/1.png", "bg_removed/player/2.png")
    playerdieimg = loadAnimation("bg_removed/player/3.png", "bg_removed/player/4.png", "bg_removed/player/5.png", "bg_removed/player/6.png", "bg_removed/player/7.png")
    playerwalkimg = loadAnimation("bg_removed/player/8.png", "bg_removed/player/9.png", "bg_removed/player/10.png")

    enemyimg = loadAnimation("bg_removed/enemy/11.png", "bg_removed/enemy/12.png", "bg_removed/enemy/13.png", "bg_removed/enemy/14.png", "bg_removed/enemy/15.png")

    bgimg = loadImage("backgroung.gif")
startimg=loadImage("home_screen.jpg")

}

function setup() {
    createCanvas(windowWidth, windowHeight)
    player = createSprite(width / 2, height - 220)
    player.addAnimation("walk", playerwalkimg)
    player.addAnimation("shoot", playershootsimg)
    player.addAnimation("die", playerdieimg)
    player.scale = 2
    //player.debug=true
    player.setCollider("rectangle", 0, 0, player.width - 30, player.height - 10)

    invisibleground = createSprite(width / 2, height - 80, width, 50)
    invisibleground.visible = false


    enemy = createSprite(100, height - 200)
    enemy.addAnimation("walk", enemyimg)
    enemy.scale = 2.5
    //enemy.debug=true
    enemy.setCollider("rectangle", 0, 0, enemy.width - 30, enemy.height - 10)


    obsgroup = new Group()
    // enemy.addAnimation("hit",enemyimg)

startbutton=createImg("start_button.png")
startbutton.size(300,300)
startbutton.position( width/2.5,height/2)


}

function draw() {
    if (gameState=="wait"){
        background(startimg)
        startbutton.show()
        player.visible=false
        enemy.visible =false
        
    }
    
    if(startbutton.mousePressed(()=>{
        gameState="play"
        }))

    player.collide(invisibleground)

    if (gameState === "play") {
        background(bgimg)
        startbutton.hide()
        player.visible=true
        enemy.visible =true
        if (keyDown("a")) {
            player.x -= 15
        }


        if (keyDown("d")) {
            player.x += 15
        }

       /* if (gameState === "play" && keyDown("s") && player.y >= 724) {
            player.velocityY = -15
        }*/

        if (gameState === "play" && keyDown("w") && player.y >= 724) {
            player.velocityY = -13
        }
        player.velocityY += .5
        console.log(player.y)




        if (frameCount % 50 == 0) {
            //y=Math.round(random(50,height-50))
            obstacle = createSprite(width, height - 150)
            obstacle.scale = .75
            obstacle.velocityX = -20
            obstacle.addAnimation("weapon", obsimg)
            obstacle.setCollider("circle", 0, 0, 80)
            obsgroup.add(obstacle)
            // obstacle.debug=true
        }



        

        if (player.isTouching(enemy) || player.isTouching(obsgroup)) {
            gameState = "die"
            obsgroup.destroyEach()
            enemy.destroy()
            player.destroy()
        }


    }




    if (gameState === "die") {
        gameOver()

    }


    if (gameState=="wait"){
        fill("red")
        textSize(80)
        textAlign(CENTER, CENTER);
        text("START THE ADVENTURE",width/2,height/2-50)

    }
    drawSprites()
}


function gameOver() {

    swal(
        {
            title: `Game Over !!!`,
            text: "\t\tThanks for playing!! \n ",
            imageUrl: "game_over_pic.png",
            imageSize: "400x400",
            confrimButtonText: "Restart"
        },
        function (isConfirm) {
            if (isConfirm) {
                location.reload()
            }
        }
    )

}