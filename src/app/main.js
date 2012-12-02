require([
    'frozen/GameCore',
    'frozen/ResourceManager',
    'app/Gnome',
    'app/Circle',
    'app/Tower',
    'app/Bullet',
    'dojo/keys'

], function(GameCore, ResourceManager, Gnome, Circle, Tower, Bullet, keys) {
  //setup a ResourceManager to use in the game
  var rm = new ResourceManager()
    , backImg = rm.loadImage('app/resources/images/gamebackroundhome.png')
    , otherBkg = rm.loadImage('app/resources/images/gameover.png')

    , hole = { x: 800, y: 0, hp: 200 }
    , interval = 1000
    , gnomes = []
    , towers = []
    , bullets = []

  var path =
    [ { x: 790, y: 20}
    , { x: 150, y: 60 }
    , { x: 60, y: 125 }
    , { x: 75, y: 175 }
    , { x: 725, y: 175 }
    , { x: 775, y: 225 }
    , { x: 750, y: 275 }
    , { x: 70, y: 320 }
    , { x: 25, y: 360 }
    , { x: 25, y: 420 }
    , { x: 100, y: 425 }
    , { x: 750, y: 420 }
    , { x: 775, y: 450 }
    , { x: 725, y: 475 }
    , { x: 425, y: 500 }
    , { x: 425, y: 600 }
    ]

  player =
    { hp: 1000 }

  path = path.map(function (obj) {
    obj.radius = 10
    return new Circle(obj)
  })

  gnomes.push(new Gnome(hole))

    var circle = new Circle({
        x: 400,
        y: 600,
        radius: 100
    });

    //setup a GameCore instance
    var game = new GameCore({
        canvasId: 'canvas',
        resourceManager: rm,
        initInput: function (im) {
          im.addKeyAction(keys.SPACE)
        },
        handleInput: function(im){
          if(im.keyActions[keys.SPACE].isPressed()) {
            if(im.mouseAction.position){
              towerify({ x: im.mouseAction.position.x, y: im.mouseAction.position.y})
            }
          }
        },
        draw: function(context){
            if (player.hp <= 0) {
              context.drawImage(otherBkg, 0, 0, this.width, this.height);
              return
            }
            context.drawImage(backImg, 0, 0, this.width, this.height);

            context.beginPath();

            // Draw collision test circle

            towers.forEach(function (tower) {
              tower.draw(context);
            })

            gnomes.forEach(function (gnome) {
              gnome.draw(context);
              //context.arc(gnome.x, gnome.y, gnome.radius, 0, 2 * Math.PI + 1);
            })

            bullets.forEach(function (bullet) {
              bullet.draw(context);
            })
        },
        update: function(millis){
          gnomes = gnomes.filter(function (gnome) {
            if (gnome.countDown && gnome.countDown > 0) return true
            if (gnome.death && gnome.death > 0) return true
            if (gnome.isAlive()) return true
            if (!gnome.dead) {
              gnome.dead = true
              gnome.death = 300
              return true
            }
          })

          bullets.forEach(function (bullet) {
            bullet.shoot(gnomes, millis)
          })

          bullets = bullets.filter(function (bullet) {
            return bullet.isAlive()
          })

          towers.forEach(function (tower) {
            shoot(tower)
          })

          gnomes.forEach(function (gnome) {
            if (gnome.countDown) gnome.countDown -= millis
            if (gnome.death) gnome.death -= millis
            else if (!gnome.move(path, millis)) {
              player.hp -= 50
              gnome.countDown = 300
              console.log(player.hp)
            }
          })
          gnomify()
        }
    });

    function shoot (tower) {
      var now = Date.now()
      if (now > tower.lastShot + 1000) {
        bullets.push(new Bullet({ x: tower.x, y: tower.y, radius: 5 }))
        tower.lastShot = now
      }
    }

    var lastTower = Date.now()

    function towerify (obj) {
      var now = Date.now()
      obj.lastShot = now
      if (now > lastTower + interval) {
        towers.push(new Tower(obj))
        if (towers.length >= 10) towers.shift()
        lastTower = now
      }
    }

    var lastGnome = Date.now()

    function gnomify () {
      var now = Date.now()
      if (now > lastGnome + interval) {
        gnomes.push(new Gnome(hole))
        lastGnome = now
      }
    }

    //launch the game!
    game.run()

});
