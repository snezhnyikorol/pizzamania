var $root = $('html, body');

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
		id : dataItem.id + dataItem.size,
	});
	updateBasket();
	$('#choseModal').modal('hide');
})

$("#phoneInput").mask("+375 (99) 999-99-99");

$('#phoneModal').on('show.bs.modal', function (e) {
	$('#orderModal').modal('hide')
})
