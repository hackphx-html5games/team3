define([ "dojo/_base/declare", "frozen/Sprite", "frozen/Animation" ], function(declare, Sprite, Animation) {
    function distance(p1, p2) {
        var x = p1.x - p2.x,
            y = p1.y - p2.y;
        return Math.sqrt(x*x + y*y);
    }

    return declare(Sprite, {
        x: 0,
        y: 0,
        dx: .1,
        dy: .1,
        wp: 0,
        radius: 0,
        hp: 100,
        dmg: 10,
        target: null,

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
        },

        move: function (path, ms) {
          var dest = path[this.wp]
          if (!dest) {
            this.hp = -10
            return false
          }
          this.target = dest
          var diffX = this.x - dest.x
          var diffY = this.y - dest.y
          var relX = ms*this.dx
          var relY = ms*this.dy

          if (diffX > 0) this.x -= relX
          else if (diffX < 0) this.x += relX

          if (diffY > 0) this.y -= relY
          else if (diffY < 0) this.y += relY

          if (this.collidesWithCircle(dest)) {
            this.wp += 1
          }
          return true
        },

        shoot: function (path, ms) {
          var dest = path[this.wp]
          if (!dest) return this.hp = -10
          this.target = dest
          var diffX = this.x - dest.x
          var diffY = this.y - dest.y
          var relX = ms*this.dx
          var relY = ms*this.dy

          if (diffX > 0) this.x -= relX
          else if (diffX < 0) this.x += relX

          if (diffY > 0) this.y -= relY
          else if (diffY < 0) this.y += relY

          if (this.collidesWithCircle(dest)) {
            this.target.hp -= 10
            this.hp = -10
          }
        },


        isAlive: function () {
          if (this.hp > 0) return true
        },

        hit: function () {
          if (this.collidesWithCircle(this.target)) {
            this.target.hp -= this.dmg
            this.hp = -10
          }
        }

    });
});
