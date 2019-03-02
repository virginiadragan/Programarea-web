window.onload = function(){
	pizzaPrice();
}
function pizzaPrice(){
	let sizeS = document.getElementById('inlineRadioS');
	let sizeL = document.getElementById('inlineRadioL');
	let sizeXL = document.getElementById('inlineRadioXL');
	sizeS.onfocus = function(){
		document.getElementById('totalPrice').innerHTML = Number(sizeS.value);	
	}
	sizeL.onfocus = function(){
		document.getElementById('totalPrice').innerHTML = Number(sizeL.value);	
	}
	sizeXL.onfocus = function(){
		document.getElementById('totalPrice').innerHTML = Number(sizeXL.value);	
	}
}