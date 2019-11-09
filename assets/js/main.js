var $root = $('html, body');

// $('a[href^="#"]').click(function () {
//     $root.animate({
//         scrollTop: $( $.attr(this, 'href') ).offset().top - 100
//     }, 500);

//     return false;
// });

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
  $("body").tooltip({ selector: '[data-toggle=tooltip]' });
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
	  container: 'body',
		html: true,
		content: '<div class="tooltip_content"><h6>Пищевая ценность на 100г</h6><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p>				</div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div><div class="tooltip_content-container"><p>Энерг. ценность</p><p>214,3 ккал</p></div></div>'
  })
})

$('.akcia_slider-container').slick({
  arrows: true
});

// data-container="body" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="hello"

$("input[name='size']").change(function() {
  if ($(this).val() == 2) {
    $('.size_indicator').css('margin-left', 'calc(50% + 1px)')
  } else {
    $('.size_indicator').css('margin-left', 'calc(0% + 1px)')
  }
})

$('#modal_accept').on('click', function (e) {
  e.preventDefault();
  let food = $("input[name='food_name']").val();
  let size = $("input:checked[name='size']").val();
})


// ------------------------------------BASKET-----------------------------------

// $('#basket').hover(function(){
//     this.popover()
//   }, function() {

// })

// $('#basket').popover({
//   template: 'hellohellohello',
//   container: 'body'
// })

let basketTemplate = `<div class="container popover basket_popover">
<div class="arrow"></div>
<div class="basket_item">
  <div class="row">
  <div class="col-4 basket_img">
    <img src="./assets/img/pizza_img.png" alt="">
  </div>
  <div class="col-8 basket_content container">
    <div class="row">
      <div class="col-10">
        <h3 class="basket_title">Барбекю</h3>
        <h5 class="basket_subtitle">Традиционное, 32 см</h5>
      </div>
      <div class="col-2">
        <img src="" alt="" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="row">
          <div class="col-6 amount_container d-flex justify-content-start align-items-center">
            <div class="amount_changer">
              <span>–</span>
            </div>
            <h6 class="mx-1">1</h6>
            <div class="amount_changer">
              <span>+</span>
            </div>
          </div>
          <div class="col-6">
            <p class="basket_popover-price text-right">7,40 руб</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
<div class="basket_item">
  <div class="row">
  <div class="col-4 basket_img">
    <img src="./assets/img/pizza_img.png" alt="">
  </div>
  <div class="col-8 basket_content container">
    <div class="row">
    <div class="col-10">
      <h3 class="basket_title">Барбекю</h3>
      <h5 class="basket_subtitle">Традиционное, 32 см</h5>
    </div>
    <div class="col-12"></div>
    </div>
    <div class="row"></div>
  </div>
  </div>
</div>
<div class="basket_item">
  <div class="row">
  <div class="col-4 basket_img">
    <img src="./assets/img/pizza_img.png" alt="">
  </div>
  <div class="col-8 basket_content container">
    <div class="row">
    <div class="col-10">
      <h3 class="basket_title">Барбекю</h3>
      <h5 class="basket_subtitle">Традиционное, 32 см</h5>
    </div>
    <div class="col-12"></div>
    </div>
    <div class="row"></div>
  </div>
  </div>
</div>
<div class="basket_footer">
  <div class="row">
  <div class="col-6">Сумма заказа</div>
  <div class="col-6 text-right">2,00 руб.</div>
  </div>
</div>
</div>`

function addBasketItem(name, size) {

}

$('#basket').popover({
  container: 'body',
  content: 'hellooooooooooooo',
  placement: 'bottom',
  title: 'hello',
  trigger: 'manual',
  template: basketTemplate,
  // boundary: document.getElementById('akcia_slider').children[0]
})

$('#basket').mouseenter(
  function(){
    $('#basket').popover('show');
    $('.basket_popover').mouseleave(
      function(){
        $('#basket').popover('hide')
        console.log("ou")
      }
    )
  }
)

if (window.matchMedia("(max-width: 992px)").matches) {
	$('.btn_basket-mobile').removeClass('d-none');
} else {
	$('.btn_basket-mobile').addClass('d-none');
}

// -----------------BASKET END----------------------------
