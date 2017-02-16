console.log("test");

new (function() {
    var ext = this;
    var descriptor = {
        blocks: [
            ['b', '%n ≤ %n', 'loe'],
            ['b', '%n ≠ %n', 'net'],
            ['b', '%n ≥ %n', 'goe'],
            ['r', '%n ^ %n', 'exponent'],
            ['r', '%n √ %n', 'nthroot'],
            ['r', 'π', 'pi'],
            ['r', 'e', 'e'],
            ['r', 'log %n of %n', 'log'],
            ['r', '%n ° to radians', 'degrad'],
            ['r', '%n r to degrees', 'raddeg'],
            ['r', '%m.functions of %n', 'advanced'],
            ['b', 'is %n prime?', 'prime'],
            [' ', 'run %s', 'do'],
            ['r', 'set %n', 'calculate'],
            ['r', 'reset', 'reset'],
            ['r', 'answer', 'ans']
        ],
        menus: {
            functions: ['csc', 'sec', 'cot', 'asin', 'acos', 'atan']
        }
    };

    ext.store = 0;

    ext._shutdown = function() {
        store = 0;
    };

    ext._getStatus = function() {
        return {status:2, msg:'Ready'};
    };

    ext.loe = function(num1, num2) {
        return num1 <= num2;
    };

    ext.net = function(num1, num2) {
        return num1 != num2;
    };

    ext.goe = function(num1, num2) {
        return num1 >= num2;
    };

    ext.exponent = function(num1, num2) {
        return Math.pow(num1, num2);
    };

    ext.nthroot = function(n, x) {
        return Math.pow(x, (1 / n));
    };

    ext.pi = function() {
        return Math.PI;
    };

    ext.e = function() {
        return Math.E;
    };

    ext.log = function(base, num) {
        return Math.log(num) / Math.log(base);
    };

    ext.degrad = function(degs) {
        return (degs * Math.PI) / 180;
    };

    ext.raddeg = function(rads) {
        return (rads * 180) / Math.PI;
    };

    ext.advanced = function(func, num) {
        switch(func) {
            case 'csc':
                return 1 / Math.sin((num * Math.PI) / 180);
                break;
            case 'sec':
                return 1 / Math.cos((num * Math.PI) / 180);
                break;
            case 'cot':
                return 1 / Math.tan((num * Math.PI) / 180);
                break;
            case 'asin':
                return (Math.asin(num) * 180) / Math.PI;
                break;
            case 'acos':
                return (Math.acos(num) * 180) / Math.PI;
                break;
            case 'atan':
                return (Math.atan(num) * 180) / Math.PI;
                break;
        };
    };

    ext.prime = function(n) {
        if (n < 2) {
            return false;
        } else if (!(Math.round(n) === n)) {
            return false;
        } else if (n === 2) {
            return true;
        } else {
            var x = 2;
            while (x != n) {
                if (n % x === 0) {
                    return false;
                };
                x++;
            };
            return true;
        };
    };

    ext.do = function(string) {
        useless = string;
    };

    ext.calculate = function(num) {
        store = num;
        return num;
    };

    ext.reset = function() {
        store = 0;
        return 0;
    };

    ext.ans = function() {
        return store;
    };

    ScratchExtensions.register('More Math custom', descriptor, ext);
})();