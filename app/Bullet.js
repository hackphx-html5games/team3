define([
    "dojo/_base/declare",
    "./Circle",
    "app/imageLoad!./resources/images/rock.png"
], function(declare, Circle, gnomeImg) {
    return declare(Circle, {
        // Turn on manual constructor chaining.
        "-chains-": {
          constructor: "manual"
        },

        _relativeImageX: 0,
        _relativeImageY: 0,
        width: 0,
        height: 0,
        dx: .2,
        dy: .2,

        image: gnomeImg,
        constructor: function(args) {
            var width = gnomeImg.width,
                height = gnomeImg.height;

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
