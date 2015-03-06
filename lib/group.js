"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Item = require("./item");

var GroupIter = (function () {
  function GroupIter(iter, by) {
    _classCallCheck(this, GroupIter);

    this.iter = iter;
    this.by = by;
  }

  _prototypeProperties(GroupIter, null, {
    next: {
      value: function next() {

        var current = new Array(this.by);
        var len = 0;
        while (len < this.by) {
          var value = this.iter.next();
          if (value.done) {
            return new Item(current, true);
          }
          current[len++] = value.value;
        }
        return new Item(current);
      },
      writable: true,
      configurable: true
    }
  });

  return GroupIter;
})();

module.exports = GroupIter;
//# sourceMappingURL=group.js.map