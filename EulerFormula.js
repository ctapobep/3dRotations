'use strict'

class EulerFormula {
    constructor(radians) {
        this.radians = radians;
    }

    toComplexNumber() {
        let re = Math.cos(radians);
        let im = Math.sin(radians);
        return new ComplexNumber(re, im);
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = EulerFormula;
}