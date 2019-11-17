let data =  cart.data;

let drink = `
<div class="row">
	<div class="col-8 col-sm-6 order-1 product_text-container">
		<h5>Вы забыли добавить напиток.<br>Желаете выбрать?</h5>
	</div>
	<div class="col-4 offset-sm-3 col-sm-3 d-flex align-items-center justify-content-sm-start justify-content-end order-2 order-sm-3">
		<h4 class="cart_price"><a class="btn btn-primary mt-2" href="index.html#drinks">Выбрать</a></h4>
	</div>
</div>`

function increaseItem(id) {
	let count = cart.getItemById(id).count;
	count++;
	cart.updateItemCountById(id, count);
	$('[data-id='+id+']').filter('.row').find('.basket_count').text(count);
	$('[data-id='+id+']').filter('.row').find('.price_value').text((cart.getItemById(id).price * count).toString().replace('.', ','));
	updateBasket();
}

function decreaseItem(id) {
	let count = cart.getItemById(id).count;
	count--;
	if (count === 0) {
		deleteItem(id);
	} else {
		cart.updateItemCountById(id, count);
		$('[data-id='+id+']').filter('.row').find('.basket_count').text(count);
		$('[data-id='+id+']').filter('.row').find('.price_value').text((cart.getItemById(id).price * count).toString().replace('.', ','));
		updateBasket();
	}
}

function generateItem(item) {
	let subtitle = "";
	if (item.hasOwnProperty('components')) {
		for (const index in item.components) {
			if (item.components.hasOwnProperty(index)) {
				const component = item.components[index];
				subtitle = subtitle + `${component.name}<br>`;
			}
		}
		subtitle = subtitle.slice(0, subtitle.length - 4);
	} else {
		if (item.hasOwnProperty('size')) {
			subtitle = item.size;
		} else {
			subtitle = '';
		}

	}
	return `
	<div class="row" data-id="${item.id}">
		<div class="col-10 col-sm-6 order-1 product_text-container">
			<h5>${item.name}</h5>
			<p class="pt-1 pb-0">${subtitle}</p>
		</div>
		<div class="col-4 col-sm-2 amount_container d-flex justify-content-start align-items-center order-3 order-sm-2 mt-2 mt-sm-0">
			<div class="amount_changer" onclick="decreaseItem('${item.id}')">
				<span>–</span>
			</div>
			<h6 class="mx-2 basket_count">${item.count}</h6>
			<div class="amount_changer" onclick="increaseItem('${item.id}')">
				<span>+</span>
			</div>
		</div>
		<div class="col-8 col-sm-3 d-flex align-items-center justify-content-sm-start justify-content-end order-4 order-sm-3">
			<h4 class="cart_price"><span class="price_value">${(Math.round(item.price*100) * item.count / 100).toString().replace('.', ',')}</span> руб.</h4>
		</div>
		<div class="col-2 col-sm-1 d-flex align-items-start align-items-sm-center order-2 order-sm-4 mt-2 mt-sm-0">
			<div class="cart__line-delete-icon" onclick="deleteItem('${item.id}')"></div>
		</div>
	</div>`
}


function deleteItem(id) {
	let item = $('[data-id='+id+']').filter('.row');
	cart.deleteItemById(id);
	$('#totalPrice').text(data.price.toString().replace('.', ','))
	$(item).remove();
	if (data.count == 0) {
		$('.cart_list').html(`
			<div class="row"><div class="col text-center"><h3>Корзина пуста</h3></div></div>
		`);
	}
	updateBasket();
}

function updateBasket() {
	data = JSON.parse(localStorage.getItem('cart'));
	const items = data.items;
	$('.cart_list').html('');
	for (const index in items) {
		if (items.hasOwnProperty(index)) {
			const item = items[index];
			let busketItem = generateItem(item);
			$('.cart_list').append(busketItem);
		}
	}
	$('.cart_list').append(drink);
	if (data.count == 0) {
		$('.cart_list').html(`
			<div class="row"><div class="col text-center"><h3>Корзина пуста</h3></div></div>
		`);
		$('[data-target="#orderModal"]').addClass('disabled');
	} else {
		$('[data-target="#orderModal"]').removeClass('disabled');
	}
	$('#totalPrice').text(data.price.toString().replace('.', ','));
}

updateBasket();

$('.cart_souces').find('.btn_basket').click(function(e) {
	e.preventDefault();
	cart.addItem({
		image : $(this).data('image'),
		name : $(this).data('name'),
		price : $(this).data('price'),
		count :	1,
		id : $(this).data('id'),
	});
	updateBasket();
})

window.addEventListener('storage', function(e) {
	updateBasket();
})

let lastResStreet = {};
let lastResBuilding = {};

$('[name="street"]').on('input', function(e) {
	$('.warning').addClass('closed');
	$('[name="building"]').attr('disabled', 'disabled');
	$('[name="building"]').val('')
	url = ''
	if ($(this).val().length > 1) {
		$.ajax({
			type: 'GET',
			url: url,
			data: {
				'name': $(this).val(),
			},
			success: streetSuccess,
			dataType: 'json'
		});
	}

})

function streetSuccess(data) {
	lastResStreet = data;
	$('#inputStreetWrapper').removeClass('closed');
	$('#inputStreetWrapper').html('');
	for (const id in data) {
		if ($('[name="street"]').val() == data[id]) {
		}
		if (data.hasOwnProperty(id)) {
			const name = data[id];

			$('#inputStreetWrapper').append(streetItem(name));
		}
	}
}

function streetItem(name) {
	return $('<div/>', {
		text: name,
		on:{
			click: function () {
				$('#inputStreetWrapper').addClass('closed')
				$('[name="street"]').val(name);
				$('[name="building"]').removeAttr('disabled', 'disabled');
			}
		}
	})
}

$('[name="street"]').on('blur', function (event) {
	// $('#inputStreetWrapper').addClass('closed');
})



$('[name="building"]').on('input', function(e) {
	$('.warning').addClass('closed');
	url = ''
		$.ajax({
			type: 'GET',
			url: url,
			data: {
				'name': $(this).val(),
			},
			success: buildingSuccess,
			dataType: 'json'
		});

})

function buildingSuccess(data) {
	lastResBuilding = data;
	$('#inputBuildingWrapper').removeClass('closed');
	$('#inputBuildingWrapper').html('');
	for (const id in data) {
		if ($('[name="building"]').val() == data[id]) {
		}
		if (data.hasOwnProperty(id)) {
			const name = data[id];

			$('#inputBuildingWrapper').append(buildingItem(name));
		}
	}
}

function buildingItem(name) {
	return $('<div/>', {
		text: name,
		on:{
			click: function () {
				$('#inputBuildingWrapper').addClass('closed')
				$('[name="building"]').val(name);

			}
		}
	})
}

$('[name="building"]').on('blur', function (event) {
	// $('#inputStreetWrapper').addClass('closed');
})

$('[data-target="#phoneModal"]').click(function (e) {
	e.preventDefault();
	$('[name="street"]');
	$('[name="building"]');
	let isCorrectStreet = Object.values(lastResStreet).includes($('[name="street"]').val());
	let isCorrectBuilding = Object.values(lastResBuilding).includes($('[name="building"]').val());



	if (isCorrectStreet && isCorrectBuilding) {
		$('#phoneModal').modal('show');
	} else {
		$('.warning').removeClass('closed');
		console.log('wtf');
	}

})
