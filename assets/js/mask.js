function mask_init() {
    $('input').each(function () {
        var el = $(this);
        var attr_el = el.attr('data-mask');
        var type_event = el.attr('data-type-event');
        if (attr_el != '') {
            if (type_event) {
                $(el).on('' + type_event, function () {
                    sort_mask($(el), attr_el);
                });
            } else {
                $(el).on('keyup focusout focusin load', function () {
                    sort_mask($(el), attr_el);
                });
            }
        }
    });
}
function sort_mask(el, type) {
    switch (type) {
        case 'phone':
            maskPhone($(el));
            var phone = $(el).val().replace(/\s+/g, '').replace(/-/g, '');
            $(el).parent().children('input[name=phone]').val(phone);
            break;
    }
}

function maskEmail($this) {
    var regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    var checkedValue = $($this).val();
    if (!regex.test(checkedValue) || checkedValue === '') {
        $($this).parent().addClass('has-error');
        $('input[name=email]').siblings('.description').children('span:eq(1)').text('Неправильная электронная почта');
    }
}

function maskPhone($this) {
    var firstThree = '';
    var secondThree = '';
    var firstTwo = '';
    var ending = '';
    if ($($this).val().length === 0) {
        // Adding country number if field is empty.
        $($this).val('+7 ');
    } else {
        // Removing any non numeric charachters.
        var val = $($this).val().replace(/[^0-9]+/g, '');
        // Returning text to form.
        $($this).val(val);
        // Getting parsed string.
        var str = val.toString();
        //if (str.length > 11){
        //    return true;
        //}
        // Checking string length.
        if (str.length > 8) {
            // Getting first triad of phone number digits.
            firstThree = str.substr(1, 3);
            // Getting second triad of phone number digits.
            secondThree = str.substr(4, 3);
            // Getting first pair of phone number digits.
            firstTwo = str.substr(7, 2);
            // Getting all digits after 9th.
            ending = str.substr(9);
            if (ending === '') {
                $($this).val('+7 ' + firstThree + ' ' + secondThree + '-' + firstTwo);
            } else {
                $($this).val('+7 ' + firstThree + ' ' + secondThree + '-' + firstTwo + '-' + ending);
            }
        } else if (str.length > 6) {
            // Getting first triad of phone number digits.
            firstThree = str.substr(1, 3);
            // Getting second triad of phone number digits.
            secondThree = str.substr(4, 3);
            // Getting all digits after 7th.
            ending = str.substr(7);
            if (ending === '') {
                $($this).val('+7 ' + firstThree + ' ' + secondThree);
            } else {
                $($this).val('+7 ' + firstThree + ' ' + secondThree + '-' + ending);
            }
        } else if (str.length > 3) {
            // Getting first triad of phone number digits.
            var beginning = str.substr(1, 3);
            // Getting all digits after 4th.
            ending = str.substr(4);
            if (ending === '') {
                $($this).val('+7 ' + beginning);
            } else {
                $($this).val('+7 ' + beginning + ' ' + ending);
            }
        } else if (str.length > 0) {
            // Getting all phone number digits.
            ending = str.substr(1);
            $($this).val('+7' + ' ' + ending);
        }
    }
}
