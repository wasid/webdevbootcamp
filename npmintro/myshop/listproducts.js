var fakeGen = require('faker');



for (var i = 0; i < 10;  i++ ) {
    
    var product = fakeGen.commerce.productName();
    var price = fakeGen.commerce.price(); 
    // console.log(fakeGen.fake("{{commerce.productName}} - ${{commerce.price}}"));
    console.log(product +" - €"+ price);
}
