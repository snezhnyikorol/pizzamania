;(function() {

	let data = {
		price: 0,
		count: 0,
		items: {

		}
	}

  function cart() {
    // ...
  }

	function addItem(item) {
		if (getItemById(item.id) === "empty") {
			data.items[data.count] = item;
			data.count++;
			data.price = (Math.round(data.price*100) + Math.round(item.price*100))/100;
		} else {
			updateItemCountById(item.id, getItemById(item.id).count + 1);
		}
	}

	function deleteItemById(id) {
		const index = getItemIndexById(id);
		let item = data.items[index];
		data.count--;
		data.price = Math.round(Math.round(data.price*100) - Math.round(item.price*100)*item.count)/100;
		delete data.items[index];
	}

	function updateItemCountById(id, count) {
		const item = data.items[getItemIndexById(id)];
		data.price = Math.round(Math.round(data.price*100) - Math.round(item.price*100)*item.count)/100;
		item.count = count;
		data.price = Math.round(Math.round(data.price*100) + Math.round(item.price*100)*item.count)/100;
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

	cart.addItem = addItem;
	cart.deleteItemById = deleteItemById;
	cart.updateItemCountById = updateItemCountById;
	cart.getItemById = getItemById;
	cart.data = data;

  window.cart = cart;
}());
