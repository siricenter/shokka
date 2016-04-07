var EF = {
  // A "cheap" way to create an uid() - solution from online
  _uid: function(){
    return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); // jshint ignore:line
        return v.toString(16);
      });
  },
  _notify: function(e){
    var target = e.target.domHost,
      path = target.dataset.path;
    this.set(path, e.target.value);
  },
  // Change an object into an array, based on the properties of the original object
  _toArray: function(obj){
    if (obj)
      return Object.keys(obj).map(function(item){
        var newObj = obj[item];
        newObj["__firebaseKey__"] = item;
        return newObj;
      });
  },
  // If the firebase path we're trying to add does not exist, add the pre-required parents
  _blaze: function(path){
    path.split('.').reduce((last, item) => {
      if (last[item] === undefined) {
        last[item] = {};
      }
      return last[item];
    }, this);
  }
};
