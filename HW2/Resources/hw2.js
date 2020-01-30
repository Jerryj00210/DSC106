// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
let store = {
  orderHistory: generateEntries(),
  currentID: generateEntries().length,
  totalDingusQuantity: 0,
  totalWidgetQuantity: 0,
  totalSales: 0,
  currentDingusQuantity: 0,
  currentWidgetQuantity: 0,
  currentSales: 0
};

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]
	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}

function insertEntries(array) {
	tbody = document.querySelector("tbody")
	for (var i = 0; i < array.length; i++) {
		var row = tbody.insertRow(-1);
		for (var j = 0; j < array[i].length; j++) {
			var cell = row.insertCell(j);
			let dingusSales = array[i][array[i].length - 2] * DINGUS_PRICE;
			let widgetSales = array[i][array[i].length - 1] * WIDGET_PRICE;
			cell.innerHTML = array[i][j]
			if (j == array[i].length - 1) {
				row.insertCell(array[i].length).innerHTML = '$' + (dingusSales + widgetSales).toFixed(2);
				store.totalSales += (dingusSales + widgetSales);
			}
		}
		store.totalDingusQuantity += Number(array[i][array[i].length - 2]);
		store.totalWidgetQuantity += Number(array[i][array[i].length - 1]);
	}
	insertScoreboard([store.totalDingusQuantity, store.totalWidgetQuantity, (store.totalSales).toFixed(2)]);
}

function insertScoreboard(array) {
	var dingus = document.getElementById('grid-number-1');
	dingus.innerHTML = array[0];
	var widget = document.getElementById('grid-number-2');
	widget.innerHTML = array[1];
	var total = document.getElementById('grid-number-3');
	total.innerHTML = '<span>$</span>' + array[2];
}

function dingusTotalPrice(quantity) {
	if (quantity < 0) {
		return;
	}
	var dField = document.getElementById('dingusField').value;
	var wField = document.getElementById('widgetField').value;
	if ((dField == 0 && wField == 0) || (dField < 0) || (typeof dField != "number")) {
		document.getElementsByClassName('button-success pure-button')[0].disabled = true;
	}
	if (quantity > 0) {
		document.getElementsByClassName('button-success pure-button')[0].disabled = false;
	}
	var field = document.getElementById('dingusTotalField');
	field.value = quantity * DINGUS_PRICE;
	updateTotal(Number(quantity * DINGUS_PRICE), Number(document.getElementById('widgetTotalField').value));
	store.currentDingusQuantity = quantity;
}

function widgetTotalPrice(quantity) {
	if (quantity < 0) {
		return 0;
	}
	var dField = document.getElementById('dingusField').value;
	var wField = document.getElementById('widgetField').value;
	if ((dField == 0 && wField == 0) || (wField < 0) || (typeof wField != "number")) {
		document.getElementsByClassName('button-success pure-button')[0].disabled = true;
	}
	if (quantity > 0) {
		document.getElementsByClassName('button-success pure-button')[0].disabled = false;
	}
	var field = document.getElementById('widgetTotalField');
	field.value = quantity * WIDGET_PRICE;	
	updateTotal(Number(document.getElementById('dingusTotalField').value), Number(quantity * WIDGET_PRICE));
	store.currentWidgetQuantity = quantity;
	
}

function updateTotal(quantity1, quantity2) {
	var field = document.getElementById('totalField');
	field.value = (quantity1 + quantity2).toFixed(2);
	store.currentSales = (quantity1 + quantity2).toFixed(2);
}

function appendRow() {
	store.currentID += 1;
	var d = new Date();
  	var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
	arr = [store.currentID, month+"/"+date+"/"+year, store.currentDingusQuantity, 
		   store.currentWidgetQuantity];
	(store.orderHistory).push(arr);
	insertEntries([arr]);
	clearForm();
	saveData();
}

function clearForm() {
	var dingusField = document.getElementById('dingusField');
	var widgetField = document.getElementById('widgetField');
	var dingusTotalField = document.getElementById('dingusTotalField');
	var widgetTotalField = document.getElementById('widgetTotalField');
	var totalField = document.getElementById('totalField');
	dingusField.value = 0;
	widgetField.value = 0;
	dingusTotalField.value = 0;
	widgetTotalField.value = 0;
	totalField.value = 0;
	document.getElementsByClassName('button-success pure-button')[0].disabled = true;
}



function loadData() {
	for (var i = 0; i < localStorage.length; i++) {
		var currentKey = localStorage.key(i).toString();
		var currentVal = JSON.parse(localStorage.getItem(currentKey));
		console.log(currentKey + ": " + currentVal);
		store[currentKey] = currentVal;
		
	}
	insertEntries(store.orderHistory);
}

function saveData() {
	if (typeof(Storage) !== "undefined") {
		// Store
		
		localStorage.setItem("orderHistory", JSON.stringify(store.orderHistory));
		localStorage.setItem("currentID", JSON.stringify(store.currentID));
		
		
	  } else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}

loadData();




 




