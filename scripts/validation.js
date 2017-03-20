(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+bignerdranch\.com$/.test(email);
        },

        isDecafStength: function(coffee1, strength1) {
            if (coffee1.includes('decaf') && strength1 > 20) {
                return false;
            }
        }
    };


    App.Validation = Validation;
    window.App = App;

})(window);
