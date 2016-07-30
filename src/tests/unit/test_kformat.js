'use strict';

var should = require('should');
var kFormat = require('../../modules/components/kFormat/');

describe('kFormat component', function() {
    var $filter;
    beforeEach(angular.mock.module(kFormat.name));
    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));
    it('should format to K unit for numbers > 10000', function() {
        var num = 10001, result,
        result = $filter('kFormat')(num, 'kFormat');
        result.should.containEql('10.0K');
    });
    it('should format to K unit for number = 10000', function() {
        var num = 10000, result,
        result = $filter('kFormat')(num, 'kFormat');
        result.should.containEql('10.0K');
    });
    it('should not format to K unit for numbers < 10000', function() {
        var num = 9999, result,
        result = $filter('kFormat')(num, 'kFormat');
        result.should.containEql(9999);
    });
    it('should floor succeeding decimal digit >= 5', function() {
        var num = 12354, result,
        result = $filter('kFormat')(num, 'kFormat');
        result.should.containEql('12.4K');
    });
    it('should floor succeeding decimal digit < 5', function() {
        var num = 12345, result,
        result = $filter('kFormat')(num, 'kFormat');
        result.should.containEql('12.3K');
    });
})
