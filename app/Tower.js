define([
    "dojo/_base/declare",
    "./Circle",
    "app/imageLoad!./resources/images/rocktower.png"
], function(declare, Circle, tower) {
    return declare(Circle, {
        // Turn on manual constructor chaining.
        "-chains-": {
          constructor: "manual"
        },

        _relativeImageX: 0,
        _relativeImageY: 0,
        width: 0,
        height: 0,
        dmg: 10,
        speed: 1000,

        image: tower,
        constructor: function(args) {
            var width = tower.width,
                height = tower.height;
            this._relativeImageX = -width / 2;
            this._relativeImageY = -height / 2;

            // TODO: Approximate with circles. For first iteration, just use a single circle.
            args.radius = Math.max(width, height) / 2;

            // Manually call super constructor.
            this.inherited(arguments);
        },

        draw: function(context) {
            context.drawImage(this.image, this.x + this._relativeImageX, this.y + this._relativeImageY);
        }
    });
});
