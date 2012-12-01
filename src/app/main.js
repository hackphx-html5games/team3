require(['frozen/GameCore'], function(GameCore){
    // game state
    var x = 0;
    var y = 0;

    //setup a GameCore instance
    var game = new GameCore({
        canvasId: 'canvas',
        draw: function(context){
            context.clearRect(0, 0, this.width, this.height);
            context.fillRect(x, y, 50, 50);
        },
        update: function(millis){
            x += 1;
            y += 1;
        }
    });

    //launch the game!
    game.run();
});
