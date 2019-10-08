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
        
$('.akica_slider-container').slick({
  arrows: true
});

// $('#basket').hover(function(){
//     this.popover()
//   }, function() {

// })

// $('#basket').popover({
//   template: 'hellohellohello',
//   container: 'body'
// })

let basketTemplate = `			<div class="container">
<div class="tooltip_container">
  <div class="row">
    <div class="col-3"><img src=""></div>
    <div class="col-lg-7">
      <h3></h3>
    </div>
    <div class="col-lg-2">
      <img src="">
    </div>
    <hr>
    <div class="col-lg-12">
      <div class="d-flex justify-content-between align-items-center">
        <p>Сумма заказа</p>
        <p>0.00 руб</p>	
      </div>
    </div>
  </div>
</div>
</div>`

let basketTemplate2 =  `			<div class="container">
<div class="tooltip_container">
  <div class="row">
    <div class="col-3"><img src=""></div>
    <div class="col-lg-7">
      <h3></h3>
    </div>
    <div class="col-lg-2">
      <img src="">
    </div>
    <hr>
    <div class="col-lg-12">
      <div class="d-flex justify-content-between align-items-center">
        <p>Сумма заказа</p>
        <p>20.00 руб</p>	
      </div>
    </div>
  </div>
</div>
</div>`

$('#basket').popover({
  container: 'body',
  content: 'hellooooooooooooo',
  placement: 'bottom',
  title: 'hello',
  trigger: 'hover',
  template: basketTemplate
})

$('#basket').popover('dispose')

$('#basket').popover({
  container: 'body',
  content: 'hellooooooooooooo',
  placement: 'bottom',
  title: 'hello',
  trigger: 'hover',
  template: basketTemplate2
})

// data-container="body" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="hello"