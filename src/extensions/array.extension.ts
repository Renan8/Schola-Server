interface Array<T> {
    isEmpty() : Boolean;
}

Array.prototype.isEmpty = function() {
    return this.length == 0;
}