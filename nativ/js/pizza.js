var json = null;
var toppingSum = 0;
var totalSum = 0;
var containerHTML = ' ';
var addIngedientsHTML = ' ';
var newOrder = ' ';
window.onload = function(){
    (async () => {
        const response = await fetch('data/pizza.json');
        json = await response.json();
        var configurator = new Configurator();
        configurator.renderPizzaList();
        configurator.renderToppingList();
        configurator.originalPizzaPrice();
        configurator.selectTopping();
        configurator.handleAddToppingsBtn();    
        configurator.addNewOrder();
        configurator.showFullCar();
        configurator.makeOrder();
    })()
   
}



class Configurator{
    constructor(){

    }

    loadData(){     
    }

    renderPizzaList(){
        for(let i = 0; i < json.interface.length; i++){
            containerHTML = containerHTML +`
                <div class="col-sm-6 col-md-4">
                    <div class="thumbnail">
                        <img src="${json.interface[i].image}"></img>
                        <div class="caption">
                            <h3>${json.interface[i].name}</h3>
                            <p>${json.interface[i].ingredients}</p>
                            <label>Marimea:</label>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label" for="inlineRadioS">S</label>
                                <input class="form-check-input1" type="radio" name="inlineRadioOptions1" id="inlineRadioS" value="65">
                                <label class="form-check-label" for="inlineRadioL">L</label>
                                <input class="form-check-input2" type="radio" name="inlineRadioOptions1" id="inlineRadioL" value="85">
                                <label class="form-check-label" for="inlineRadioXL">XL</label>
                                <input class="form-check-input3" type="radio" name="inlineRadioOptions1" id="inlineRadioXL" value="100">
                            </div>
                            <label>Forma:</label>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label" for="inlineRadio1">Rotund</label>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio1" value="option1">
                                <label class="form-check-label" for="inlineRadio2">Oval</label>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="option2">	  
                            </div>
                            <label>Tipul:</label>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label" for="inlineRadio1">Subtire</label>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio1" value="option1">
                                <label class="form-check-label" for="inlineRadio2">Gros</label>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio2" value="option2">	  
                            </div>
                            <p>
                                Total price:<span class="pricePizza">0</span>
                                <button type="button" class="btn btn-default" id="${i}">Add ingredients</button>
                                <button type="button" class="btn btn-danger" id ="${i}">Add to car</button>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('card').innerHTML = containerHTML;
    }

    renderToppingList(){
        for(let i = 0; i < json.ingredient.length; i++){
            addIngedientsHTML = addIngedientsHTML +`
                <ul class="additionalIngredients">	
                    <li>
                        <div class="name">${json.ingredient[i].name}</div>
                        <div class="price">${json.ingredient[i].price}</div>
                        <span class="active">
                            <button class="minusAditionalIngredients">-</button>
                            <input type="text" class="inp" readonly value="0">
                            <button class="plusAditionalIngredients">+</button>
                        </span>
                    </li>			
                </ul>
                
            `;
        }
        addIngedientsHTML = addIngedientsHTML +`
            <label for="priceAditionalIngredients" class="abc">Pret adaos:</label>
            <span class="priceAditionalIngredients">0</span>
            <br>
            <button id="okBtn">OK</button>
        `;
        document.getElementById('aditional').innerHTML = addIngedientsHTML;
    }

    renderJuicesList(){
        
    }

    originalPizzaPrice(){
        let sizeS = document.getElementsByClassName("form-check-input1");
        let sizeL = document.getElementsByClassName("form-check-input2");
        let sizeXL = document.getElementsByClassName("form-check-input3");
        let pricePizza = document.getElementsByClassName("pricePizza");
        for(let i = 0; i < sizeS.length; i++){
            sizeS[i].onfocus = function(){
                pricePizza[i].innerHTML = Number(sizeS[i].value);	
            }
            sizeL[i].onfocus = function(){
                pricePizza[i].innerHTML = Number(sizeL[i].value);	
            }
            sizeXL[i].onfocus = function(){
                pricePizza[i].innerHTML = Number(sizeXL[i].value);	
            }
        }
    }

    handleSelectPizza(){

    }

    handleAddToppingsBtn(){
        let add = document.getElementById('aditional');
        let btn = document.getElementById('okBtn');
        let addBtn = document.getElementsByClassName('btn btn-default');
        let span = document.getElementsByClassName('priceAditionalIngredients');
        let input = document.getElementsByClassName('inp');
        btn.onclick = function(){
            add.classList.add('hide');
            for(let i = 0; i < input.length; i++){
                input[i].value = 0;
            }
            toppingSum = 0;
            span[0].textContent = 0;
        }
        for(let i = 0; i < addBtn.length; i++){
    
            addBtn[i].onclick = function(){
                add.classList.remove('hide');
            }
        }
    }    

    selectPizza(){

    }

    selectTopping(){
        let plusButton = document.getElementsByClassName("plusAditionalIngredients");
        let minusButton = document.getElementsByClassName('minusAditionalIngredients');
        let span = document.getElementsByClassName('priceAditionalIngredients');
        let input = document.getElementsByClassName('inp');
        for(let i = 0; i < plusButton.length; i++){
            plusButton[i].onclick = function(){
                input[i].value++; 
                toppingSum = toppingSum + json.ingredient[i].price;
                span[0].textContent = toppingSum;
            }
            minusButton[i].onclick = function(){
                if(input[i].value == 0) input[i].value = 0;
                else{
                    toppingSum = toppingSum - json.ingredient[i].price;
                    span[0].textContent = toppingSum;
                    input[i].value--;
                }
            }   
        }
    }

    addNewOrder(){
        let addToCarBtn = document.getElementsByClassName('btn btn-danger');
        let totalPriceEmpty = document.getElementById("totalPriceEmpty");
        let pricePizza = document.getElementsByClassName("pricePizza");
        newOrder = newOrder +`
            <img src="img/car.png">
            <label for="totalPriceFull" class="abc">Total:</label>
            <span id="totalPriceFull">0</span>
            <button type="button" class="btn btn-default1">Comanda</button>
        `;
        for(let i = 0; i < addToCarBtn.length; i++){
            addToCarBtn[i].onclick = function(){
                totalSum += Number(pricePizza[i].innerHTML);
                totalPriceEmpty.innerHTML = totalSum;
            newOrder = newOrder +`
                    <div id="fullCar1">
                    <hr> 
                        <span>${json.interface[i].name}</span> 
                        <button type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br>    
                        <span class="active">
                            <button class="minusAditionalIngredients">-</button>
                            <input type="text" class="inp" readonly value="0">
                            <button class="plusAditionalIngredients">+</button>
                        </span> 
                        <span>pret: ${pricePizza[i].innerHTML} lei</span>
                    </div>
                `;               
                document.getElementById('fullCar').innerHTML = newOrder;
            }               
        }
        
        document.getElementById('fullCar').innerHTML = newOrder;
    }

    showFullCar(){
        let emptyCar = document.getElementById('emptyCar');
        let fullCar = document.getElementById('fullCar');
        emptyCar.onclick = function(){
            let closeBtn = document.getElementsByClassName("close");
            let totalPriceFull = document.getElementById("totalPriceFull");
            fullCar.classList.remove('hide');
            emptyCar.classList.add('hide');  
            totalPriceFull.innerHTML = totalSum;
            closeBtn.onclick = function(){

            }
            
        }
    }
    makeOrder(){
        let makeOrder = document.getElementById('makeOrderbtn');
        makeOrder.addEventListener('click', function(event){
            event.stopPropagation();
        })
        
    }
    saveOrder(){

    }


}