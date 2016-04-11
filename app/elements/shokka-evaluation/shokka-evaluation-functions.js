var EF = { //jshint ignore:line
  // A 'cheap' way to create an uid() - solution from online
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
    if (obj) {
      return Object.keys(obj).map(function(item){
        var newObj = obj[item];
        newObj.__firebaseKey__ = item;
        return newObj;
      });
    }
  },
  // If the firebase path we're trying to add does not exist, add the pre-required parents
  _blaze: function(path){
    path.split('.').reduce((last, item) => {
      if (last[item] === undefined) {
        last[item] = {};
      }
      return last[item];
    }, this);
  },
  _getDeep: function(path, obj) {
    var token = path.split('.'),
      root = obj;
    for (var i = 0, l = token.length; i < l; i++) {
      if (root[token[i]]) {
        root = root[token[i]];
      } else {
        root = null;
        break;
      }
    }
    if (root !== obj) {
      return root;
    }
  },
  // Copied from: https://gist.github.com/hurjas/2660489
  timeStamp: function() {
    var now = new Date();
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    var suffix = ( time[0] < 12 ) ? 'AM' : 'PM';
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = '0' + time[i];
      }
    }
    return date.join('/') + ' ' + time.join(':') + ' ' + suffix;
  }
};
