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
      , backImg = rm.loadImage('app/resources/images/gamebackround.png')
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
            context.drawImage(backImg, 0, 0, this.width, this.height);

            context.beginPath();

            // Draw collision test circle
            var color = gnomes[0].collidesWithCircle(circle) ? "red" : "green";
            context.fillStyle = color;
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI + 1);

            // Draw the gnome's collision circle.
            context.closePath();
            context.fill();

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
            return gnome.isAlive()
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
            gnome.move(path, millis)
          gnomify()
          })
        }
    });

    var lastShot = Date.now()

    function shoot (tower) {
      var now = Date.now()
      if (now > lastShot + 500) {
        bullets.push(new Bullet({ x: tower.x, y: tower.y, radius: 5 }))
        lastShot = now
      }
    }

    var lastTower = Date.now()

    function towerify (obj) {
      var now = Date.now()
      if (now > lastTower + interval) {
        towers.push(new Tower(obj))
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
