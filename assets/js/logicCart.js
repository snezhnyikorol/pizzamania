;(function() {

	let data = {};

	if((!localStorage.getItem('cart')) || localStorage.getItem('cart') === '{}' || localStorage.getItem('cart') === "null")  {
		data = {
			price: 0,
			count: 0,
			items: {

			}
		};
			// document.dispatchEvent(cartLoaded);

	} else{
		data = JSON.parse(localStorage.getItem('cart'));

			// document.dispatchEvent(cartLoaded);
	}

	// let cartLoaded = new Event('cartAvailable');

	window.addEventListener('storage', function(e) {
		data = JSON.parse(localStorage.getItem('cart'));
	});


		// if (storageAvailable('localStorage')) {
		// 	if((!localStorage.getItem('cart'))) {
		// 		data = {
		// 			price: 0,
		// 			count: 0,
		// 			items: {

		// 			}
		// 		};
		// 		$(document).ready(function() {
		// 			document.dispatchEvent(cartLoaded);
		// 		})
		// 	} else{
		// 		data = JSON.parse(localStorage.getItem('cart'));
		// 		$(document).ready(function() {
		// 			document.dispatchEvent(cartLoaded);
		// 		})
		// 	}
		// } else {
		// 	data = {
		// 		price: 0,
		// 		count: 0,
		// 		items: {

		// 		}
		// 	};
		// 	$(document).ready(function() {
		// 		document.dispatchEvent(cartLoaded);
		// 	})
		// }




  function cart() {
    // ...
  }

	function storageAvailable(type) {
		try {
			var storage = window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return false;
		}
	}

	function addItem(item) {
		if (getItemById(item.id) === "empty") {
			data.items[data.count] = item;
			data.count++;
			data.price = (Math.round(data.price*100) + Math.round(item.price*100))/100;
		} else {
			updateItemCountById(item.id, getItemById(item.id).count + 1);
		}
		checkAndWrite();
	}

	function deleteItemById(id) {
		const index = getItemIndexById(id);
		let item = data.items[index];
		data.count--;
		data.price = Math.round(Math.round(data.price*100) - Math.round(item.price*100)*item.count)/100;
		delete data.items[index];
		checkAndWrite();
	}

	function updateItemCountById(id, count) {
		const item = data.items[getItemIndexById(id)];
		data.price = Math.round(Math.round(data.price*100) - Math.round(item.price*100)*item.count)/100;
		item.count = count;
		data.price = Math.round(Math.round(data.price*100) + Math.round(item.price*100)*item.count)/100;
		checkAndWrite();
	}

	function getItemIndexById(id) {
		const items = data.items;
		for (const index in items) {
			if (items.hasOwnProperty(index)) {
				const item = items[index];
				if (item.id === id) {
					return index;
				}
			}
		}
		return "empty";
	}

	function getItemById(id) {
		const items = data.items
		for (const index in items) {
			if (items.hasOwnProperty(index)) {
				const item = items[index];
				if (item.id === id) {
					return item;
				}
			}
		}
		return "empty";
	}

	function checkAndWrite() {

			this.localStorage.setItem('cart', JSON.stringify(data));

	}

	window.addEventListener("beforeunload", function( event ) {
		this.localStorage.setItem('cart', JSON.stringify(data));
	});

	cart.addItem = addItem;
	cart.deleteItemById = deleteItemById;
	cart.updateItemCountById = updateItemCountById;
	cart.getItemById = getItemById;
	cart.data = data;

  window.cart = cart;
}());
