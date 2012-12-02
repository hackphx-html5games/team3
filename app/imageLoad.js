define([], function() {
    function reportError(error) {
        // NOTE: This may not be according to AMD spec and was learned by reading the dojo loader code.
        require.signal("error", lang.mixin(error, { src: "imageInfo" }));
    }

    return {
        load: function(id, require, load) {
            try {
                var url = require.toUrl(id);
                var img = new Image();
                img.onload = function() {
                    load(img);
                };
                img.onerror = function() {
                    reportError(new Error("Unable to load image: " + url));
                };
                img.src = url;
            } catch(err) {
                reportError(err);
            }
        }
    };
});
