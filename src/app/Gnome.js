define([
    "dojo/_base/declare",
    "./Circle",
    "app/imageLoad!./resources/images/gnome.png",
    "app/imageLoad!./resources/images/gnomesplosion1.png",
    "app/imageLoad!./resources/images/gnomesplosion2.png",
    "app/imageLoad!./resources/images/gnomesplosion3.png",
    "app/imageLoad!./resources/images/gnomesplosion1.png",
    "app/imageLoad!./resources/images/gnomesplosion2.png",
    "app/imageLoad!./resources/images/gnomesplosion3.png"
], function(declare, Circle, gnomeImg, exp1, exp2, exp3, d1, d2, d3) {
    return declare(Circle, {
        // Turn on manual constructor chaining.
        "-chains-": {
          constructor: "manual"
        },

        _relativeImageX: 0,
        _relativeImageY: 0,
        width: 0,
        height: 0,

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
            if (this.countDown) {
              if (this.countDown > 200) this.image = exp1
              else if (this.countDown > 100) this.image = exp2
              else this.image = exp3
            }
            if (this.death) {
              if (this.death> 200) this.image = gnomehit1
              else if (this.death> 100) this.image = gnomehit2
              else this.image = gnomehit3
            }
        }
    });
});
