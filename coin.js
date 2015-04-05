(function () {
    'use strict';
    
    function flipcoin() {
        return (Math.random() > 0.5) ? 1 : 0;
    }
    
    function flipcoins() {
        var results = 0;
        
        for (var i = 0; i < 10; i += 1) {
            results += flipcoin();
        }
        
        return results;
    }
    
    function coinset() {
        var coinset = [];
        
        for (var i = 0; i < 1000; i += 1) {
            coinset.push(flipcoins());
        }
        
        return coinset;
    }
    
    function findcoins() {
        var set = coinset(),
            min = 10,
            rand = set[Math.floor(Math.random()*1000)],
            first = set[0];
        
        for (var i = 0; i < 1000; i += 1) {
            min = (min > set[i]) ? set[i] : min;
        }
        
        return [first, rand, min];
    }
    
    function run() {
        var min = 0;
        
        for (var i = 0; i < 100000; i += 1) {
            min += (findcoins())[2];
        }
        
        return min / 1000000;
    }
    
    console.log(run());
    
}());