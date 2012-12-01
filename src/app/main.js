require([
    'frozen/GameCore',
    'frozen/ResourceManager',
    'app/Gnome',
    'app/Circle'
], function(GameCore, ResourceManager, Gnome, Circle) {
    var speed = 1;

    //setup a ResourceManager to use in the game
    var rm = new ResourceManager()
      , backImg = rm.loadImage('app/resources/images/GameBack.png')
      , hole = { x: 800, y: 0 }
      , interval = 1000
      , gnomes = []

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
          gnomes.forEach(function (gnome) {
            gnome.x -= speed/1.75;
            gnome.y += speed;
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
