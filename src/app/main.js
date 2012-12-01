require([
    'frozen/GameCore',
    'frozen/ResourceManager',
    'app/Gnome',
    'app/Circle'
], function(GameCore, ResourceManager, Gnome, Circle) {
    var speed = 1;

    //setup a ResourceManager to use in the game
    var rm = new ResourceManager();
    var backImg = rm.loadImage('app/resources/images/GameBack.png');
    var gnome = new Gnome({ x: 0, y: 0 });
    var circle = new Circle({
        x: 400,
        y: 400,
        radius: 150
    });

    //setup a GameCore instance
    var game = new GameCore({
        canvasId: 'canvas',
        resourceManager: rm,
        draw: function(context){
            context.drawImage(backImg, 0, 0, this.width, this.height);

            context.beginPath();

            // Draw collision test circle
            var color = gnome.collidesWithCircle(circle) ? "red" : "green";
            context.fillStyle = color;
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI + 1);
            
            // Draw the gnome's collision circle.
            context.arc(gnome.x, gnome.y, gnome.radius, 0, 2 * Math.PI + 1);
            context.closePath();
            context.fill();

            gnome.draw(context);
        },
        update: function(millis){
            gnome.x += speed;
            gnome.y += speed;
        }
    });

    //launch the game!
    game.run();
});
