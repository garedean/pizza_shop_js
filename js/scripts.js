function Order() {
  this.pizzas = [];
}

function Pizza(size) {
  this.size     = getSelectedSize();
  this.toppings = getSelectedToppings();
}

Pizza.prototype.costOfToppings = function() {
  var total = 0;

  for(var key in this.toppings) {
    var value = this.toppings[key];
    total += value;
  }

  return total;
}

Pizza.prototype.costOfSize = function() {
  if (this.size === "small") {
    return 5;
  } else if (this.size === "medium") {
    return 10;
  } else if (this.size === "large") {
    return 15;
  } else if (this.size === "extra-large") {
    return 20;
  }
}

Pizza.prototype.totalCost = function() {
  return this.costOfSize() + this.costOfToppings();
  debugger;
}

function getSelectedSize() {
  return $('#pizza-size :selected').val();
}

function getSelectedToppings() {
  var selectedToppings = {};

  $('#pizza-toppings :selected').each(function(){
    selectedToppings[$(this).text()] = parseInt($(this).val());
  });

  return selectedToppings;
}

function updateTotalPrice(pizza) {
  $("#cost-wrapper").addClass("show");
  $("#cost-wrapper > span").text("$" + pizza.totalCost());
}

$(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var pizza = new Pizza();
    updateTotalPrice(pizza);
  });
});
