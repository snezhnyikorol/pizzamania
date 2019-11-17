var $root = $('html, body');

$(window).scroll(function(){
	scroll = $(window).scrollTop();
	if (scroll >= 108) {
		$('.sticky').removeClass('fixed');

	}
	else {
		$('.sticky').addClass('fixed');

	}
	if (scroll>10) {
		$('header').addClass('h-sticky');
		$('body').addClass('b-sticky');
	} else {
		$('header').removeClass('h-sticky');
		$('body').removeClass('b-sticky');
	}
});


$('.nav_item').click(function () {

    $root.animate({
        scrollTop: $( $.attr(this, 'href').slice($.attr(this, 'href').indexOf('#')) ).offset().top - 30
    }, 500);

    return false;
});

$('.map_item').click(function () {

	$root.animate({
		scrollTop: $( $.attr(this, 'href').slice($.attr(this, 'href').indexOf('#')) ).offset().top - 30
}, 500);

	return false;
});


let menuState = false;

$('.menu_btn').click(function () {
  menuState = !menuState;
  if (menuState) {
    $('.map_wrapper').animate({right: '0px'}, 500, function () {
      $('.substrate').animate({opacity: '0.5'}, 200)
    })
  }
})

$('.map_close').click(function () {
  menuState = !menuState;
  if (!menuState) {
    $('.substrate').animate({opacity: '0'}, 200, function () {
      $('.map_wrapper').animate({right: '-3000px'}, 500)
    })
  }
})

$('.substrate').click(function () {
  menuState = !menuState;
  if (!menuState) {
    $('.substrate').animate({opacity: '0'}, 200, function () {
      $('.map_wrapper').animate({right: '-3000px'}, 500)
    })
  }
})

$('.map_item').click(function () {
  menuState = !menuState;
  if (!menuState) {
    $('.substrate').animate({opacity: '0'}, 200, function () {
      $('.map_wrapper').animate({right: '-3000px'}, 500)
    })
  }
})

$(document).ready(function() {
  // $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  // $(function () {
  //   $('[data-toggle="popover"]').popover()
  // })
});

// $('.btn_basket').tooltip({
// 	'data-html': true,
// 	template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div><div class="container"><div class="row"><div class="col-lg-2"></div>hsfgfsatssgfhgs</div></div></div>'
// })

$(function () {
	$('.menu_info').popover({
		// container: 'body',
		trigger: 'hover',
		html: true,
		content: '<div class="tooltip_content"><h6>Пищевая ценность на 100г</h6><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p>				</div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div></div>'
  })
})

$('.actions_slider-container').slick({
	arrows: true,
	autoplay: true,
  autoplaySpeed: 5000,
	responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        dots: true
      }
    }
  ]
});

// data-container="body" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="hello"

dataItem = {
	image: "",
	name: "",
	size: 0,
	price: 0,
	count: 1
}

let price;
let priceAlt;

$("input[name='size']").change(function() {
  if ($(this).val() == 2) {
		$('.size_indicator').css('margin-left', 'calc(50% + 1px)')
		$('#choseModal').find('.price').text(priceAlt.replace('.', ','))
		dataItem.price = priceAlt
		dataItem.size = '1м'
  } else {
		$('.size_indicator').css('margin-left', 'calc(0% + 1px)')
		$('#choseModal').find('.price').text(price.replace('.', ','))
		dataItem.price = price
		dataItem.size = '30см'
  }
})

// $('#modal_accept').on('click', function (e) {
//   e.preventDefault();
//   let food = $("input[name='food_name']").val();
//   let size = $("input:checked[name='size']").val();
// })


$('#choseModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget) // Button that triggered the modal
	let description = $(button[0].parentElement.parentElement).find('p').text()
	$("input[name='size'][value='1']").prop('checked', true)
	$('.size_indicator').css('margin-left', 'calc(0% + 1px)')
	price = button.data('price')
	priceAlt = button.data('pricealt')
	dataItem.price = price
	dataItem.size = '30см'
	dataItem.name = button.data('name')
	dataItem.image = button.data('img')
	dataItem.id = button.data('id')
	var modal = $(this)
	let span = $('<div/>').append(modal.find('.modal_title').children('span').clone(true))
	modal.find('.modal_title').html(`${dataItem.name}${$(span).html()}`)
	$('.menu_info').popover('dispose')
	$('.menu_info').popover({
		// container: 'body',
		trigger: 'hover',
		html: true,
		content: '<div class="tooltip_content"><h6>Пищевая ценность на 100г</h6><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p>				</div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div></div>'
  })
	modal.find('.description').text(description)
	if ($("input[name='size']").val()==1) {
		modal.find('.price').text(price.replace('.', ','))
	} else {
		modal.find('.price').text(priceAlt.replace('.', ','))
	}
})

$('#modal_accept').click(function (event) {
	event.preventDefault();
	cart.addItem({
		image : dataItem.image,
		name : dataItem.name,
		size : dataItem.size,
		price : dataItem.price,
		count : dataItem.count,
		id : dataItem.id,
	});
	updateBasket();
	$('#choseModal').modal('hide');
})

$('[data-target="cart"]').click(function (event) {
	event.preventDefault();
	cart.addItem({
		image : $(this).data('img'),
		name : $(this).data('name'),
		size : '30см',
		price : $(this).data('price'),
		count :	1,
		id : $(this).data('id'),
	});
	let element = cart.getItemById( $(this).data('id'));
	let productContainer = $(`[data-id=${element.id}]`);
	let priceContainer = $(productContainer).find('.product_price-container');
	$(priceContainer).find('.btn').remove()
	$(priceContainer).find('h6').after(`								<div class="counter d-flex flex-row">
	<div class="amount_changer" onclick="decrease('${element.id}')">
			<span>–</span>
		</div>
		<h6 class="mx-3 my-2"><span class="basket_count">${element.count}</span></h6>
		<div class="amount_changer" onclick="increase('${element.id}')">
			<span>+</span>
		</div>
</div>`)


	showToast($(this).data('name') + ', ' + $(this).data('size'));
	updateBasket();
})

$("#phoneInput").mask("+375 (99) 999-99-99");

$('#phoneModal').on('show.bs.modal', function (e) {
	$('#orderModal').modal('hide')
})

$('.promocode_button').click(function(e) {
	e.preventDefault();
  let form_data = $('.promocode_input').val();
  let url;
  let posting = $.post(url, form_data);
  posting.done(function(data) {

	})
	if (true) {
		$('.promocode_input').popover({
			container: 'body',
			content: 'Промокод не найден',
			placement: 'bottom',
			trigger: 'manual',
		})
	} else {
		$('.promocode_input').popover({
			container: 'body',
			content: 'Промокод уже активирован',
			placement: 'bottom',
			trigger: 'manual',
		})
	}
})

function showToast(name) {

	if(window.matchMedia('(min-width: 992px)').matches){
		$.toast({
			text: name, // Text that is to be shown in the toast
			heading: 'Добавлено:', // Optional heading to be shown on the toast

			showHideTransition: 'fade', // fade, slide or plain
			allowToastClose: false, // Boolean value true or false
			hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
			stack: 2, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
			position: {
				top: 70,
				left: $('#basket').offset().left - 150,
			}, // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values

			bgColor: '#444444',  // Background color of the toast
			textColor: '#eeeeee',  // Text color of the toast
			textAlign: 'left',  // Text alignment i.e. left, right or center
			loader: false,  // Whether to show loader or not. True by default
			loaderBg: '#9EC600',  // Background color of the toast loader
			beforeShow: function () {}, // will be triggered before the toast is shown
			afterShown: function () {}, // will be triggered after the toat has been shown
			beforeHide: function () {}, // will be triggered before the toast gets hidden
			afterHidden: function () {}  // will be triggered after the toast has been hidden
		});
	}
}

$(document).ready(function () {
	for (const key in data.items) {
		if (data.items.hasOwnProperty(key)) {
			const element = data.items[key];
			let productContainer = $(`[data-id=${element.id}]`);
			let priceContainer = $(productContainer).find('.product_price-container');
			$(priceContainer).find('.btn').remove()
			$(priceContainer).find('h6').after(`								<div class="counter d-flex flex-row">
			<div class="amount_changer" onclick="decrease('${element.id}')">
					<span>–</span>
				</div>
				<h6 class="mx-3 my-2"><span class="basket_count">${element.count}</span></h6>
				<div class="amount_changer" onclick="increase('${element.id}')">
					<span>+</span>
				</div>
	</div>`)
		}
	}
})

function increase(id) {
	let count = cart.getItemById(id).count;
	count++;
	cart.updateItemCountById(id, count);
	$('[data-id='+id+']').filter('article').find('.basket_count').text(count);
	// $('[data-id='+id+']').filter('article').find('.price_value').text((cart.getItemById(id).price * count).toString().replace('.', ','));
	// $('#totalPrice').text(data.price.toString().replace('.', ','));
	updateBasket()
}
let a
function decrease(id) {
	let count = cart.getItemById(id).count;
	count--;
	if (count === 0) {
		let item = cart.getItemById(id);
		let productContainer = $(`[data-id=${id}]`);
		let priceContainer = $(productContainer).find('.product_price-container');
		$(priceContainer).find('.counter').remove()
		$(priceContainer).find('h6').after(`<a href="" class="btn btn-primary" data-size="${item.size}" data-target="cart" data-name="${item.name}" data-id="${item.id}" data-price="${item.price}" data-img="${item.image}">В корзину</a>`);
	a = $('[data-target="cart"]')
	b=item.id
		console.log(a)
		$('[data-target="cart"]').filter(`[data-id=${item.id}]`).click(function (event) { //ПЕРЕДЕЛАТЬ БЛЯТЬ
			event.preventDefault();
			cart.addItem({
				image : $(this).data('img'),
				name : $(this).data('name'),
				size : '30см',
				price : $(this).data('price'),
				count :	1,
				id : $(this).data('id'),
			});
			let element = cart.getItemById( $(this).data('id'));
			let productContainer = $(`[data-id=${element.id}]`);
			let priceContainer = $(productContainer).find('.product_price-container');
			$(priceContainer).find('.btn').remove()
			$(priceContainer).find('h6').after(`								<div class="counter d-flex flex-row">
			<div class="amount_changer" onclick="decrease('${element.id}')">
					<span>–</span>
				</div>
				<h6 class="mx-3 my-2"><span class="basket_count">${element.count}</span></h6>
				<div class="amount_changer" onclick="increase('${element.id}')">
					<span>+</span>
				</div>
		</div>`)


			showToast($(this).data('name') + ', ' + $(this).data('size'));
			updateBasket();
		})
		deleteItem(id);
	} else {
	cart.updateItemCountById(id, count);
	$('[data-id='+id+']').filter('article').find('.basket_count').text(count);
	}

	updateBasket()
}


