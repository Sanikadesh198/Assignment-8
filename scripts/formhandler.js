var $ = window.jQuery;
var coffee;

(function(window) {
    'use strict';
    var App = window.App || {};


    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        /*    try {
                myTruck.createOrder(function(error) {
                    if (error) {
                        throw new Exception(error)
                    } else {
                        try {
                            saveOnServer(function(error) {
                                if (error) {
                                    throw new Exception({
                                        message: 'server error'
                                    });
                                } else {
                                    try {
                                        checkList.addRow();
                                    } catch (e2) {
                                        handleDomError(e2);
                                    }
                                }
                            })
                        } catch (e) {
                            handleServerError(e, function() {
                                // Try adding the row again
                                try {
                                    checkList.addRow();
                                } catch (e3) {
                                    handleDomError(e3);
                                }
                            });
                        }
                    }
                });
            } catch (e) {
                alert('Something bad happened');
            }
        });*/
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);

            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };


    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            console.log(fn(emailAddress));
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + 'is not authorized email address!';
                event.target.setCustomValidity(message);
            }
        });


        //Coffee decaf greater than 20 caffine percentage
        FormHandler.prototype.addInputValidCoffeeOrderHandler = function(fn) {
            this.$formElement.on('input', '[name="coffee"]', function(event) {
                var coffeeValue = $('#coffeeOrder').val();
                var strengthValue = $('#strengthLevel').val();
                var message = '';
                coffee = event.target;
                event.target.setCustomValidity('');
                if (!(fn(coffeeValue, strengthValue))) {
                    message = coffeeValue + ' is not a valid coffee Order and has high caffeine strength.';
                    event.target.setCustomValidity(message);
                }
            });
        };
        FormHandler.prototype.addInputValidCoffeeStrengthHandler = function(fn) {
            this.$formElement.on('input', '[name="strength"]', function(event) {
                var coffeeValue = $('#coffeeOrder').val();
                var strengthValue = $('#strengthLevel').val();
                var message = '';
                event.target.setCustomValidity('');
                coffee.setCustomValidity('');
                if (!(fn(coffeeValue, strengthValue))) {
                    message = ' High caffeine strength.';
                    event.target.setCustomValidity(message);
                }
            });
        };

    };
    App.FormHandler = FormHandler;
    window.App = App;
})(window);

$('#strengthLevel').change(function() {
    document.getElementById('[strength-range]');
    $('#strength-range').empty();
    $('#strength-range').append('Caffeine percentage: ' + this.value);
    if (this.value <= 33) {
        $('#strength-range').css('color', 'green');
    } else if (this.value > 33 && this.value <= 85) {
        $('#strength-range').css('color', 'yellow');
    } else {
        $('#strength-range').css('color', 'red');
    }
});

$('#powerUpClaim').on('click', function() {
    $('#myModal').modal('hide');
    $('#powerUpComboBox').show();
});

$('#noPowerup').on('click', function() {
    $('#myModal').modal('hide');
});
