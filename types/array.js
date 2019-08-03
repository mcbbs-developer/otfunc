const Type = require("./type");
const Weights = require("../weight");

module.exports = class Array_ extends Type {
  constructor(type) {
    super("array");
    this.type = type;

    this.equals.bind(this);
    this.match.bind(this);
    this.weight.bind(this);
    this.depth.bind(this);
  }

  equals(n) {
    if (n.name !== this.name) return false;

    if (this.type instanceof Type) return this.type.equals(n.type);

    else return this.type === n.type;
  }

  match(n) {
    if (!Array.isArray(n)) return false;

    if (this.type instanceof Type) {
      for (let i of n) {
        if (!this.type.match(i)) return false;
      }
    } else {
      for (let i of n) {
        if (i.__proto__.constructor !== this.type) return false;
      }
    }
    return true;
  }

  weight() {
    return (this.type instanceof Type) ? this.type.weight() : Weights.Normal;
  }

  depth() {
    return 1 + (this.type instanceof Type) ? this.type.depth() : 1;
  }
}