function SimpleStack(){
  this.top = null;
}

SimpleStack.prototype.push = function(value){
  this.top = {value, below: this.top};
}

SimpleStack.prototype.pop = function(){
  var node = this.top;
  this.top = this.top.below;
  return node.value;
}

SimpleStack.prototype.peek = function(){
  return this.top.value;
}

SimpleStack.prototype.fill = function(a){
  for (let i = 0; i < a.length; i++){
    this.push(a[i]);
  }
}

SimpleStack.prototype.fillWithValues = function(va){
  for (let i = 0; i < a.length; i++){
    this.pushValue(va[i]);
  }
}

SimpleStack.prototype.toArr = function(){
  var arr = [];
  var currentNode = this.top;
  while (currentNode != null){
    arr.push(currentNode);
    currentNode = currentNode.below;
  }
  return arr;
}

module.exports = SimpleStack;