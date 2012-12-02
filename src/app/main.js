require([
    'frozen/GameCore',
    'frozen/ResourceManager',
    'app/Gnome',
    'app/Circle'
], function(GameCore, ResourceManager, Gnome, Circle) {
    var speed = 1;

    //setup a ResourceManager to use in the game
    var rm = new ResourceManager()
      , backImg = rm.loadImage('app/resources/images/gamebackround.png')
      , hole = { x: 800, y: 0, hp: 200 }
      , interval = 1000
      , gnomes = []

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

            gnomes.forEach(function (gnome) {
              gnome.draw(context);
              //context.arc(gnome.x, gnome.y, gnome.radius, 0, 2 * Math.PI + 1);
            })
        },
        update: function(millis){
          gnomes = gnomes.filter(function (gnome) {
            return gnome.isAlive()
          })
          gnomes.forEach(function (gnome) {
            gnome.move(path, millis)
          gnomify()
          })
        }
    });

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
