var pizza = new Pizza();

function Pizza() {
  this.size     = "";
  this.toppings = {};
  this.quantity = 1;
}

Pizza.prototype.costOfToppings = function() {
  var total = 0;

  if (this.toppings === null) {
    return 0;
  }

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
  } else {
    // if size is not yet selected
    return 0;
  }
}

Pizza.prototype.updateSize = function(size) {
  this.size = size;
}

Pizza.prototype.updateToppings = function(toppings) {
  this.toppings = toppings;
}

Pizza.prototype.updateQuantity = function(quantity) {
  this.quantity = quantity;
}

Pizza.prototype.costOfOne = function() {
  return this.costOfSize() + this.costOfToppings();
}

Pizza.prototype.costOfAll = function() {
  // if the user has selected a size, calculate cost
  if (this.size) {
    return this.costOfOne() * this.quantity;
  } else {
  // if a size has not been selected, don't talley
  // up cost of toppings alone. User must select a size
  // before getting a total
    return 0;
  }
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

function getDesiredQuantity() {
  var quantity = parseInt($('#pizza-quantity').val());

  if (quantity) {
    return quantity;
  } else {
    return pizza.quantity;
  }
}

function updateTotalPrice() {
  var orderTotal = pizza.costOfAll();

  debugger;
  if (orderTotal >= 0 && orderTotal < 10000) {
    $("#cost-wrapper > span").text("$" + orderTotal);
  } else if (orderTotal > 10000) {
    $("#cost-wrapper > span").text("you must like pizza!");
  } else {
    $("#cost-wrapper > span").text("");
  }
}

function resetQuantity() {
  pizza.updateQuantity(1);
  $('#pizza-quantity').val("1");
  updateTotalPrice();
}

function validateRange(field) {
  if (field.val() < 1) {
    field.parent().addClass("has-error");
  } else {
    field.parent().removeClass("has-error");
  }
}

function validatePresence(field) {
  if (!field.val()) {
    field.parent().addClass("has-error");
  }
}

function validateForm() {
  validatePresence($("#pizza-size"));
  validatePresence($("#pizza-quantity"));
  validateRange($("#pizza-quantity"));
}

function removeValidation(dropdown) {
  dropdown.parent().removeClass("has-error");
}

$(function() {
  $("form").submit(function() {
    alert("success!");
  });

  $("#pizza-size").change(function() {
    pizza.updateSize(getSelectedSize());
    updateTotalPrice(pizza);
    removeValidation($(this));
  });

  $("#pizza-toppings").find("option").click(function() {
    pizza.updateToppings(getSelectedToppings());
    updateTotalPrice(pizza);
  });

  $("#pizza-quantity").keyup(function() {
    pizza.updateQuantity(getDesiredQuantity());
    validateRange($(this));
    updateTotalPrice();
  });

  $("#submit").click(function() {
    validateForm();
  });
});
