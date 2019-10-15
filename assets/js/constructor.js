// constructor
let stateList = {
    1: 'lunch_first',
    2: 'lunch_second',
    3: 'lunch_salad',
    4: 'lunch_soup'
}

let state = 1;

function getPosition(param) {
    return(param.slice(6));
}

let pickedItem = '';

$('#lunch_second').toggle();
$('#lunch_salad').toggle();
$('#lunch_soup').toggle();

// $('.launch_view .row').click(function() {
//     if ($(this).attr('id') != state) {
//         $('#' + state).fadeToggle('fast');
//         $(this).fadeToggle('fast');
//         state = $(this).attr();
//     }
// })


$('#first').click(function() {
    if (state != 1) {
        $('#' + stateList[state]).fadeToggle('fast');
        $('#lunch_first').fadeToggle('fast');
        state = 1;
        $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
        pickedItem = '';
    }
})

$('#second').click(function() {
    if (state != 2) {
        $('#' + stateList[state]).fadeToggle('fast');
        $('#lunch_second').fadeToggle('fast');
        state = 2;
        $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
        pickedItem = '';
    }
})

$('#salad').click(function() {
    if (state != 3) {
        $('#' + stateList[state]).fadeToggle('fast');
        $('#lunch_salad').fadeToggle('fast');
        state = 3;
        $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
        pickedItem = '';
    }
})

$('#soup').click(function() {
    if (state != 4) {
        $('#' + stateList[state]).fadeToggle('fast');
        $('#lunch_soup').fadeToggle('fast');
        state = 4;
        $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
        pickedItem = '';
    }
})

// item

$('.lunch_menu-card').click(function() {
    pickedItem = $(this).find('img').attr('src');
})

$('.lunch_next').click(function(event) {
    if (pickedItem != '') {
        $('#' + getPosition(stateList[state])).attr('src', pickedItem.slice(0, -4) + '_' + '.jpg');
        if (state < 5) {
            $('#' + stateList[state]).fadeToggle('fast');
            state++;
            $('#' + stateList[state]).fadeToggle('fast');
            pickedItem = '';
            $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
        }
    }
    event.preventDefault();
})


// TODO: добавить проверку обязательного выьора первых двух блюд и возможность добавки в корзину без опциональных


