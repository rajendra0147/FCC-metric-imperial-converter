const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("Function convertHandler.getNum(input)", function(){
        test("Whole number input", function(done){
            let input="32L"
            assert.equal(convertHandler.getNum(input), 32);
            done();
        })

        test("Decimal number input", function(done){
            let input="3.2L"
            assert.equal(convertHandler.getNum(input), 3.2);
            done();
        })

        test("Fractional input", function(done){
            let input="3/2L"
            assert.equal(convertHandler.getNum(input),3/2)
            done()
        })

        test("Fractional input with decimal", function(done){
            let input="3.2/2l";
            assert.equal(convertHandler.getNum(input), 3.2/2)
            done()
        })

        test("Double fractional input i.e 3/2/2", function(done){
            let input="3/2/2l"
            assert.equal(convertHandler.getNum(input), undefined)
            done()
        })

        test("no numerical provided", function(done){
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
            done()
        })
    })

    suite("Function convertHandler.getUnit(input)", function(){
        test("for each valid input unit", function(done){
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            let output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg','gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            input.forEach(function(ele, idx) {
                assert.equal(convertHandler.getUnit(ele), output[idx])
            })
            done();
        })

        test("invalid input unit", function(done){
            let input = "Li";
            assert.equal(convertHandler.getUnit(input), undefined);
            done();
        })
    })

    suite("Function convertHandler.getReturnUnit(input)", function(){
        test("for each valid input unit", function(done){
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            let output = ['L', 'gal', 'km', 'mi', 'kg', 'lbs','L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function(ele, idx) {
                assert.equal(convertHandler.getReturnUnit(ele), output[idx]);
            })
            done()
        })
    })

    suite("function convertHandler.spelloutUnit(input)", function(){
        test("for each valid input unit", function(done){
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
            let output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            input.forEach(function(ele, idx){
                assert.equal(convertHandler.spellOutUnit(ele), output[idx]);
            })
            done()
        })
    })

    suite("Function convertHandler.convert(input)", function(){
        test("GAL to L", function(done){
            let input = ['5', 'gal'];
            let output = 18.92705;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done()
        })
        test("L to GAL", function(done){
            let input = ['5', 'L'];
            let output = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done()
        })
        test("MI to KM", function(done){
            let input = ['5', 'mi'];
            let output = 8.04670;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done()
        })
        test("KM to MI", function(done){
            let input = ['5', 'km'];
            let output = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done()
        })
        test("LBS to KG", function(done){
            let input = ['5', 'lbs'];
            let output = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done()
        })
        test("KG to LBS", function(done){
            let input = ['5', 'kg'];
            let output = 11.02312;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done()
        })
    })
});