(function(window) {
    'use strict';
    var App = window.App || {};
    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        isValidCoffeeOrder: function(coffeeValue, strengthValue) {
            if (coffeeValue.includes('decaf') && strengthValue > 20) {
                return false;
            }
            return true;
        }

    };
    App.Validation = Validation;
    window.App = App;
})(window);
