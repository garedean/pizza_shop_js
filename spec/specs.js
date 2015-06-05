describe('Pizza', function() {
  it("initializes a new pizza with (currently blank) properties", function() {
    var pizza = new Pizza();
    expect(pizza instanceof Pizza).to.equal(true);
    expect(pizza.size).to.equal("");
    expect(pizza.toppings).to.eql({});
    expect(pizza.quantity).to.equal(1);
  });

  it("#updateSize sets the size property", function() {
    var pizza = new Pizza();
    pizza.updateSize("Large");
    expect(pizza.size).to.equal("Large");
  });

  it("#updateToppings sets the toppings property", function() {
    var pizza = new Pizza();
    var toppings = {"Olives": 1, "Bell Peppers": 1};
    pizza.updateToppings(toppings);
    expect(pizza.toppings).to.eql(toppings);
  });

  it("#updateQuantity sets the quantity property", function() {
    var pizza = new Pizza();
    pizza.updateQuantity(80);
    expect(pizza.quantity).to.equal(80);
  });

  it("#costOfSize returns the cost of a pizza based on size alone", function() {
    var pizza = new Pizza();
    pizza.updateSize("large")
    expect(pizza.costOfSize()).to.equal(15);
  });

  it("#costOfToppings returns the cost of all toppings", function() {
    var pizza = new Pizza();
    var toppings = {"Olives": 6, "Bell Peppers": 6};
    pizza.updateToppings(toppings);
    expect(pizza.costOfToppings()).to.equal(12);
  });

  it("#costOfOne returns the cost a single pizza", function() {
    var pizza = new Pizza();
    pizza.updateSize("large")
    var toppings = {"Olives": 6, "Bell Peppers": 6};
    pizza.updateToppings(toppings);
    expect(pizza.costOfOne()).to.equal(27);
  });

  it("#costOfAll returns the cost of all pizzas", function() {
    var testPizza = new Pizza();
    testPizza.updateSize("large");
    var toppings = {"Olives": 6, "Bell Peppers": 6};
    testPizza.updateToppings(toppings);
    testPizza.updateQuantity(2);
    expect(testPizza.costOfAll()).to.equal(54);
  });
});
