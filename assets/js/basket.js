// ------------------------------------BASKET-----------------------------------

let data = {
	count: 1,
	price: 300,
	0: {
		image: "./assets/img/pizza_img.png",
		name: "Пицца",
		type: "Вкусная",
		size: "30см",
		price: "300",
		count: "3"
	}
};

let basketSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.75 6H5.25L5.90993 15.8047C5.97132 16.8184 6.50848 17.5 7.39863 17.5H12.6014C13.4915 17.5 14.0133 16.8184 14.0901 15.8047L14.75 6Z" fill="#373535"></path>
<path d="M13.8498 3.00681L6.19643 3.00688C4.98382 2.88702 5.02127 4.36489 5 5L14.9917 4.99999C15.0165 4.38088 15.0624 3.12667 13.8498 3.00681Z" fill="#373535"></path>
</svg>`;

function addPizza(image, name, type, size, price, count) {
	data.count++;
	data.price = (Math.round(data.price*100) + Math.round(price*100))/100;
	data[data.count] = {
		image: image,
		name: name,
		type: type,
		size: size,
		price: price,
		count: count
	};
}

function generatePizza(image, name, type, size, price, count, id) {
	return `<div class="basket_item" data-type="pizza" data-id=${id} data-name=${name} data-type=${type} data-size=${size} data-price=${price} data-count="1">
  <div class="row">
  <div class="col-4 basket_img">
    <img src=${image} alt=${name}>
  </div>
  <div class="col-8 basket_content container">
    <div class="row">
      <div class="col-10">
        <h3 class="basket_title">${name}</h3>
        <h5 class="basket_subtitle">${type}, ${size}</h5>
      </div>
      <div data-id=${id} class="col-2 px-0 d-flex justify-content-center align-items-start basket_delete" onclick='deleteItem(${id})'>
        ${basketSvg}
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="row">
          <div class="col-6 amount_container d-flex justify-content-start align-items-center">
            <div class="amount_changer">
              <span>–</span>
            </div>
            <h6 class="mx-1">${count}</h6>
            <div class="amount_changer">
              <span>+</span>
            </div>
          </div>
          <div class="col-6">
            <p class="basket_popover-price text-right">${price} руб</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>`
}

function generateBasket() {
	if (data.count == 0) {
		return `<div class="container popover basket_popover">
		<div class="arrow"></div>
		<div class="basket_body d-flex justify-content-center align-items-center">
		<h6>Корзина пуста</h6>
		</div>
		</div>
		</div>`
	} else {
		let temp = $(`<div><div class="container popover basket_popover">
		<div class="arrow"></div>
		<div class="basket_body">
		</div>
		<div class="basket_footer">
		<div class="row">
		<div class="col-6"><p>Сумма заказа</p></div>
		<div class="col-6 text-right"><p>${data.price} руб.</p></div>
		</div>
		</div>
		</div>
		</div>`);
		for (let index = 0; index < data.count; index++) {
			const element = data[index];
			let item = generatePizza(element.image, element.name, element.type, element.size, element.price, element.count, index);
			$(temp).find('.basket_body').append(item);
		}
		return $(temp).html();
	}
}

// $('.basket_delete').click(function (event) {
// 	event.preventDefault();
// 	console.log(111111,$(`[data-id]=${this.dataset.id}`));
// 	// let item = $(`[data-id]=${this.dataset.id}`);
// 	// data.count--;
// 	// data.price;
// })

function deleteItem(index) {
	item = $('[data-id='+index+']').filter('.basket_item');
	data.count--;
	data.price = (Math.round(data.price*100) - Math.round(parseFloat($(item).attr('data-price'))*100))/100;
	$(item).remove();
	delete data[index];
	if (index == 0) {
		$('.basket_popover').html(`<div class="arrow"></div>
		<div class="basket_body d-flex justify-content-center align-items-center">
		<h6>Корзина пуста</h6>
		</div>
		</div>`);
	}
}

let basketTemplate = generateBasket();

$('#basket').popover({
  container: 'body',
  content: 'hellooooooooooooo',
  placement: 'bottom',
  title: 'hello',
  trigger: 'manual',
  template: basketTemplate,
  // boundary: document.getElementById('actions_slider').children[0]
})

$('#basket').mouseenter(
  function(){
    $('#basket').popover('show');
    $('.basket_popover').mouseleave(
      function(){
        $('#basket').popover('hide')
      }
    )
  }
)

// if (window.matchMedia("(max-width: 992px)").matches) {
// 	$('.btn_basket-mobile').removeClass('d-none');
// } else {
// 	$('.btn_basket-mobile').addClass('d-none');
// }

// -----------------BASKET END----------------------------


// let basketItem =
// `<div class="basket_item">
//   <div class="row">
//   <div class="col-4 basket_img">
//     <img src="./assets/img/pizza_img.png" alt="">
//   </div>
//   <div class="col-8 basket_content container">
//     <div class="row">
//       <div class="col-10">
//         <h3 class="basket_title">Барбекю</h3>
//         <h5 class="basket_subtitle">Традиционное, 32 см</h5>
//       </div>
//       <div class="col-2 px-0 d-flex justify-content-center align-items-start">
//         ${basketSvg}
//       </div>
//     </div>
//     <div class="row mt-2">
//       <div class="col-12">
//         <div class="row">
//           <div class="col-6 amount_container d-flex justify-content-start align-items-center">
//             <div class="amount_changer">
//               <span>–</span>
//             </div>
//             <h6 class="mx-1">1</h6>
//             <div class="amount_changer">
//               <span>+</span>
//             </div>
//           </div>
//           <div class="col-6">
//             <p class="basket_popover-price text-right">7,40 руб</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   </div>
// </div>`;
// let basketTemplate2 =
// `<div class="container popover basket_popover">
// <div class="arrow"></div>
// <div class="basket_body">
// <div class="basket_item">
//   <div class="row">
//   <div class="col-4 basket_img">
//     <img src="./assets/img/pizza_img.png" alt="">
//   </div>
//   <div class="col-8 basket_content container">
//     <div class="row">
//       <div class="col-10">
//         <h3 class="basket_title">Барбекю</h3>
//         <h5 class="basket_subtitle">Традиционное, 32 см</h5>
//       </div>
//       <div class="col-2 px-0 d-flex justify-content-center align-items-start">
//         ${basketSvg}
//       </div>
//     </div>
//     <div class="row mt-2">
//       <div class="col-12">
//         <div class="row">
//           <div class="col-6 amount_container d-flex justify-content-start align-items-center">
//             <div class="amount_changer">
//               <span>–</span>
//             </div>
//             <h6 class="mx-1">1</h6>
//             <div class="amount_changer">
//               <span>+</span>
//             </div>
//           </div>
//           <div class="col-6">
//             <p class="basket_popover-price text-right">7,40 руб</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   </div>
// </div>
// <div class="basket_item">
//   <div class="row">
//   <div class="col-4 basket_img">
//     <img src="./assets/img/pizza_img.png" alt="">
//   </div>
//   <div class="col-8 basket_content container">
//     <div class="row">
//     <div class="col-10">
//       <h3 class="basket_title">Барбекю</h3>
//       <h5 class="basket_subtitle">Традиционное, 32 см</h5>
//     </div>
//     <div class="col-12"></div>
//     </div>
//     <div class="row"></div>
//   </div>
//   </div>
// </div>
// <div class="basket_item">
//   <div class="row">
//   <div class="col-4 basket_img">
//     <img src="./assets/img/pizza_img.png" alt="">
//   </div>
//   <div class="col-8 basket_content container">
//     <div class="row">
//     <div class="col-10">
//       <h3 class="basket_title">Барбекю</h3>
//       <h5 class="basket_subtitle">Традиционное, 32 см</h5>
//     </div>
//     <div class="col-12"></div>
//     </div>
//     <div class="row"></div>
//   </div>
//   </div>
// </div>
// </div>
// <div class="basket_footer">
//   <div class="row">
//   <div class="col-6">Сумма заказа</div>
//   <div class="col-6 text-right">2,00 руб.</div>
//   </div>
// </div>
// </div>`;
