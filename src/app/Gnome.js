define([
    "dojo/_base/declare",
    "./Circle",
    "app/imageLoad!./resources/images/gnome.png"
], function(declare, Circle, gnomeImg) {
    return declare(null, {
        x: 0,
        y: 0,
        width: 0,
        height: 0,

        image: gnomeImg,

        // Array of shapes to use for collision detection. Each shape is relative to the object location.
        collisionShapes: null,

        constructor: function(args) {
            var width = gnomeImg.width,
                height = gnomeImg.height;

            this.x = args.x;
            this.y = args.y;

            // TODO: Approximate with circles. For first iteration, just use a single circle.
            var radius = Math.max(width, height);
            this.collisionShapes = [
                new Circle({
                    x: width / 2,
                    y: height / 2,
                    radius: radius
                })
            ];
        },

        draw: function(context) {
            context.drawImage(this.image, this.x, this.y);
        }
    });
});
