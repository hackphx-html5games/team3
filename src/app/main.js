require([ 'frozen/GameCore', 'frozen/ResourceManager', 'app/Gnome' ], function(GameCore, ResourceManager, Gnome){
    var speed = 1;

    //setup a ResourceManager to use in the game
    var rm = new ResourceManager();
    var backImg = rm.loadImage('app/resources/images/GameBack.png');
    var gnome = new Gnome({ x: 0, y: 0 });


    //setup a GameCore instance
    var game = new GameCore({
        canvasId: 'canvas',
        resourceManager: rm,
        draw: function(context){
            context.drawImage(backImg, 0, 0, this.width, this.height);
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
