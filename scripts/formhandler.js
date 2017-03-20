var claim_reward =false;
var $ = window.jQuery;

(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

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
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var strength = $('#strengthLevel').val();
            var flavor = $('#flavorshot').find(':selected').val();
            var size = $('input[name=size]:checked').val();
            if (strength > 70 && flavor != '' && size === 'coffeezilla' && claim_reward === false) {

                console.log('Modal should be showing now');
                claim_reward = true;
                $('#myModal').modal('show');
            } else {
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
                claim_reward = false;
                $('#coffeeStrngthBar').hide();
                $('#caffeine-range-lbl').empty();
                $('#caffeine-range-lbl').append('Caffeine Strength: 30');
                $('#caffeine-range-lbl').css('color', 'green');
            }
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;

            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + 'is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
            //console.log(fn(emailAddress));
        });
    };

    FormHandler.prototype.addDecafStengthInputHandler = function(fn) {
        console.log('Setting coffee input handler for decaf and 20 strength ');
        this.$formElement.on('input', '[name="coffee"]', '[name="strength"]', function(event) {
            var coffee1 = $('[data-coffee-order="coffeeOrder"]').val();
            var strength1 = $('[data-coffee-order="strength"]').val();
            var message = '';
            if (fn(coffee1, strength1)) {
                event.target.setCustomValidity('');
            } else {
                message = coffee1 + ' has high caffein strength ';
                event.target.setCustomValidity(message);
            }
        });
    };
    App.FormHandler = FormHandler;
    window.App = App;
})(window);
$('#strengthLevel').change(function() {
    document.getElementById('[caffeine-range-lbl]');
    $('#caffeine-range-lbl').empty();
    $('#caffeine-range-lbl').append('Caffeine Strength: ' + this.value);
    if (this.value <= 33) {
        $('#caffeine-range-lbl').css('color', 'green');
    } else if (this.value > 30 && this.value <= 70) {
        $('#caffeine-range-lbl').css('color', '#ff8000');
    } else {
        $('#caffeine-range-lbl').css('color', 'red');
    }
});

$('#reward-accepted').on('click', function() {
    $('#myModal').modal('hide');
    $('#coffeeStrngthBar').show();
});

$('#reward-rejected').on('click', function() {
    $('#myModal').modal('hide');
});
