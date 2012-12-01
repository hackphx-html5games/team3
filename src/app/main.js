require([ 'frozen/GameCore', 'frozen/ResourceManager' ], function(GameCore, ResourceManager){
    var x = 0;
    var y = 0;
    var speed = 1;

    //setup a ResourceManager to use in the game
    var rm = new ResourceManager();
    var backImg = rm.loadImage('app/resources/images/GameBack.png');
    var gnome = rm.loadImage('app/resources/images/gnome.png');

    //setup a GameCore instance
    var game = new GameCore({
        canvasId: 'canvas',
        resourceManager: rm,
        draw: function(context){
            context.drawImage(backImg, 0, 0, this.width, this.height);
            context.drawImage(gnome, x, y);
        },
        update: function(millis){
            x += speed;
            y += speed;
        }
    });

    //launch the game!
    game.run();
});
