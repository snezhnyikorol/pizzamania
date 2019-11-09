// // constructor
// let stateList = {
//     1: 'lunch_first',
//     2: 'lunch_second',
//     3: 'lunch_salad',
//     4: 'lunch_soup'
// }

// let state = 1;

// function getPosition(param) {
//     return(param.slice(6));
// }

// // let pickedItem = '';

// $('#lunch_second').toggle();
// $('#lunch_salad').toggle();
// $('#lunch_soup').toggle();

// $('#first').click(function() {
//     if (state != 1) {
//         $('#' + stateList[state]).fadeToggle('fast');
//         $('#lunch_first').fadeToggle('fast');
//         state = 1;
//         $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
//         // pickedItem = '';
//     }
// })

// $('#second').click(function() {
//     if (state != 2) {
//         $('#' + stateList[state]).fadeToggle('fast');
//         $('#lunch_second').fadeToggle('fast');
//         state = 2;
//         $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
//         // pickedItem = '';
//     }
// })

// $('#salad').click(function() {
//     if (state != 3) {
//         $('#' + stateList[state]).fadeToggle('fast');
//         $('#lunch_salad').fadeToggle('fast');
//         state = 3;
//         $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
//         // pickedItem = '';
//     }
// })

// $('#soup').click(function() {
//     if (state != 4) {
//         $('#' + stateList[state]).fadeToggle('fast');
//         $('#lunch_soup').fadeToggle('fast');
//         state = 4;
//         $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
//         // pickedItem = '';
//     }
// })

// // item

// $('.lunch_menu-card').click(function(e) {
//     // pickedItem = $(this).find('img').attr('src');
// 		// $('#' + getPosition(stateList[state])).attr('src', pickedItem.slice(0, -4) + '_' + '.jpg');
// 		if (!$(e.target).hasClass('menu_info')) {
// 			$('#' + getPosition(stateList[state])).attr('src', $(this).find('img').attr('src').slice(0, -4) + '_' + '.jpg');
// 		}
// })

// $('.lunch_next').click(function(event) {
//     // if (pickedItem != '') {
//         if (state < 4) {
//             $('#' + stateList[state]).fadeToggle('fast');
//             state++;
//             $('#' + stateList[state]).fadeToggle('fast');
//             // pickedItem = '';
//             $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
//         }
//     // }
//     event.preventDefault();
// })

// $('.lunch_prev').click(function(event) {
//     if (state > 1) {
//         $('#' + stateList[state]).fadeToggle('fast');
//         state--;
//         $('#' + stateList[state]).fadeToggle('fast');
//         // pickedItem = '';
//         $('.launch_view').css('height', $('#' + stateList[state]).outerHeight());
//     }

//     event.preventDefault();
// })


// // TODO: добавить проверку обязательного выьора первых двух блюд и возможность добавки в корзину без опциональных


var currentStep = 0;
let steps = $('.step');
let titles = ['Выберите гарнир', 'Выберите горячее', 'Выберите салат', 'Выберите суп', 'Выберите хлеб', 'Выберите напиток'];
let currentItems = {
	0: null,
	1: null,
	2: null,
	3: null,
	4: null,
	5: null
}

let info = {
	weight: 0,
	price: 0,
}

let buttonNext = $('#next-button');
let buttonEnd = $('.lunch_basket').clone(true);

$(buttonEnd).attr('class', 'btn btn-primary lunch_basket ml-2 mr-0 mr-sm-3 mr-lg-0');

showStep(currentStep);

function showStep(n, t = 'forward') {
 if(n==0){
  $('#back-button').addClass('disabled');
 }
 else{
  $('#back-button').removeClass('disabled');
  steps.eq(n-1).slideUp(400);

 }

 if ((n===0 && currentItems[0] === null) || (n===1 && currentItems[1] === null)) {
	$('#next-button').addClass('disabled');
	}  else {
		$('#next-button').removeClass('disabled');
	}

 if(t == 'back'){
  steps.eq(n+1).slideUp(400);

 }
 steps.eq(n).slideDown({
  start: function () {
    $(this).css({
      display: "flex"
    })
  }
});



 if(currentStep+1 == steps.length){
  // $('.quiz-block-header').slideUp();
	// $('.quiz-block-footer').slideUp();

		$(buttonNext).detach();
		$('#back-button').after(buttonEnd);

  // $('.quiz-block-footer').find('.col-lg-9').removeClass('col-lg-9').addClass('col-lg-12')
  // $('.quiz-block-footer').find('.col-lg-3').addClass('d-none')

 }

 if(t == 'back' && currentStep+2 == steps.length) {
	$('#back-button + .lunch_basket').remove();
	$('#back-button').after(buttonNext);
 }

}

$('#next-button').click(function(event) {
	event.preventDefault();
	$(currentItems[currentStep]).removeClass('active');
	currentStep++;
	$(currentItems[currentStep]).addClass('active');
	$('.lunch_selection-title').text(titles[currentStep]);
	showStep(currentStep);
});

$('#back-button').click(function(event) {
	event.preventDefault();
	$(currentItems[currentStep]).removeClass('active');
	currentStep--;
	$(currentItems[currentStep]).addClass('active');
	$('.lunch_selection-title').text(titles[currentStep]);
	showStep(currentStep, 'back');
});

$('.lunch_menu-card').click(function(event) {
	event.preventDefault();
	if (currentItems[currentStep] != null) {
		$(currentItems[currentStep]).removeClass('active');
	}
	if (!(currentItems[currentStep] == event.currentTarget)) {
		if (currentItems[currentStep] != null) {
			deleteInfo(currentItems[currentStep]);
		}
		$(event.currentTarget).addClass('active');
		currentItems[currentStep] = event.currentTarget;
		addInfo(currentItems[currentStep]);
		// переход
		if (currentStep+1<steps.length) {
			setTimeout(function () {
				$(currentItems[currentStep]).removeClass('active');
				currentStep++;
				$(currentItems[currentStep]).addClass('active');
				$('.lunch_selection-title').text(titles[currentStep]);
				showStep(currentStep);
			}, 1000)
		}
	} else {
		deleteInfo(currentItems[currentStep]);
		currentItems[currentStep] = null;
	}
	if (currentItems[0] === null || currentItems[1] === null) {
		$('.lunch_basket').addClass('disabled');
	} else {
		$('.lunch_basket').removeClass('disabled');
	}

	if ((currentStep===0 && currentItems[0] === null) || (currentStep===1 && currentItems[1] === null)) {
		$('#next-button').addClass('disabled');
	} else {
		$('#next-button').removeClass('disabled');
	}
	checkText();
});


function addInfo(item) {
	info.price = (Math.round(info.price*100) + Math.round(parseFloat($(item).find('.lunch_menu-price').text().replace(',', '.'))*100))/100;
	info.weight = (Math.round(info.weight*100) + Math.round(parseFloat($(item).attr('data-weight'))*100))/100;
	switch (currentStep) {
		case 0:
			$('#first').attr('src', $(item).find('img').attr('src'));
			break;
		case 1:
			$('#second').attr('src', $(item).find('img').attr('src'));
			break;
		case 2:
			$('#salad').attr('src', $(item).find('img').attr('src'));
			break;
		case 3:
			$('#soup').attr('src', $(item).find('img').attr('src'));
			break;

		default:
			break;
	}


	$('#currentPrice').text(info.price.toString().replace('.', ','));
	$('#currentWeight').text(info.weight.toString().replace('.', ','));
}

function deleteInfo(item) {
	info.price = (Math.round(info.price*100) - Math.round(parseFloat($(item).find('.lunch_menu-price').text().replace(',', '.'))*100))/100;
	info.weight = (Math.round(info.weight*100) - Math.round(parseFloat($(item).attr('data-weight'))*100))/100;
	switch (currentStep) {
		case 0:
			$('#first').attr('src', $('#first').attr('data-defaultSrc'));
			break;
		case 1:
			$('#second').attr('src', $('#second').attr('data-defaultSrc'));
			break;
		case 2:
			$('#salad').attr('src', $('#salad').attr('data-defaultSrc'));
			break;
		case 3:
			$('#soup').attr('src', $('#soup').attr('data-defaultSrc'));
			break;

		default:
			break;
	}


	$('#currentPrice').text(info.price.toString().replace('.', ','));
	$('#currentWeight').text(info.weight.toString().replace('.', ','));
}


function checkText() {
	let text = $('#lunch_required');
	if (currentItems[0] === null && currentItems[1] === null) {
		$(text).text('Вы не выбрали обязательное блюдо для комплекта — гарнир, горячее.');
	} else if (currentItems[0] === null) {
		$(text).text('Вы не выбрали обязательное блюдо для комплекта — гарнир.');
	} else if (currentItems[1] === null) {
		$(text).text('Вы не выбрали обязательное блюдо для комплекта — горячее.');
	} else {
		$(text).text('');
	}
}
