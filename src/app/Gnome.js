define([
    "dojo/_base/declare",
    "./Circle",
    "app/imageLoad!./resources/images/gnome.png"
], function(declare, Circle, gnomeImg) {
    return declare(Circle, {
        // Turn on manual constructor chaining.
        "-chains-": {
          constructor: "manual"
        },

        width: 0,
        height: 0,

        image: gnomeImg,
        constructor: function(args) {
            var width = gnomeImg.width,
                height = gnomeImg.height;

            // TODO: Approximate with circles. For first iteration, just use a single circle.
            args.radius = Math.max(width, height);

            // Manually call super constructor.
            this.inherited(arguments);
        },

        draw: function(context) {
            context.drawImage(this.image, this.x + this.width / 2, this.y + this.height / 2);
        }
    });
});
