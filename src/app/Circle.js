define([ "dojo/_base/declare" ], function(declare, lang) {
    function distance(p1, p2) {
        var x = p1.x - p2.x,
            y = p1.y - p2.y;
        return Math.sqrt(x*x + y*y);
    }

    return declare(null, {
        x: 0,
        y: 0,
        radius: 0,

        constructor: function(args) {
            // TODO: This may be unnecessary. dojo/_base/declare may mixin args by default.
            declare.safeMixin(this, args);
        },

        collidesWithPoint: function(p) {
            var d = distance(this, p);
            return d < this.radius;
        },

        collidesWithCircle: function(c) {
            var d = distance(this, c);
            return d < (this.radius + c.radius);
        }
    });
});
