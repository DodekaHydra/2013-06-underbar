var _ = {};

(function() {

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  _.last = function(array, n) {
    if (Array.isArray(array) == false) { //if array is not an array, make array from arguments
      array = Array.prototype.slice.call(array);
    }
    // cases of n; would switch/case be more optimal? nested pattern matching? this seems messy
    if (n == null){ return array[array.length-1]; }
    else if (n == 0){ return []; }
    return ( n > array.length ? array : array.slice(array.length-n, array.length) );
  };

  // Like last, but for the first elements
  _.first = function(array, n) {
    if (Array.isArray(array) == false) { // same as in _.last; is there a way to remove this part? 
      array = Array.prototype.slice.call(array);      
    }
    if (n == null){ 
      return array[0];
    }
    return _.last(array.reverse(), n).reverse();
  };


  // Call iterator(value, key, collection) for each element of collection
  _.each = function(obj, iterator) {
    for (var index = 0; index < obj.length; index++) {
      iterator(obj[index], index, obj);
    };
    return iterator;
  };

  /*
   * TIP: Here's an example of a function that needs to iterate, which we've
   * implemented for you. Instead of using a standard `for` loop, though,
   * it uses the iteration helper `each`, which you will need to write.
   */

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var result = [];
    _.each(collection, function(val, index, arr){ // for each in collection
      if (iterator.call(collection, val, index, arr)) { result.push(val); } // call iterator with data; if true, assign res
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(val, index, arr){ //call filter on iterator
      return !iterator.call(collection, val, index, arr); //returns all false matches
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [], innerIndex = 0, innerArray = [], dupe = false;
    _.each(array, function(value, index, array){                           //for val[ind] in arr
      result.push(value);                                                  //push each conseq element into array
      _.each(innerArray, function(innerValue, innerIndex, innerArray){     //for innerVal[innerInd] in innerArr
        if (innerValue == value) { dupe=true; } //seems awkward
      });
      if (dupe) { result.pop(); dupe=false; }
      innerIndex = index;
      innerArray.push(value);
    });
    return result;
  };


  /*
   * map() is a useful primitive iteration function that works a lot
   * like each(), but in addition to running the operation on all
   * the members, it also maintains an array of results.
   */

  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var result=[];
    _.each(array, function(value, index, array){
      result.push(iterator.call(iterator, value, index, array));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(obj, propertyName) {
    return _.map(obj, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName) {
    
    var args = Array.prototype.slice.apply(arguments);
    return _.map(list, function(value){
      return (typeof value[methodName] !== 'undefined' ? value[methodName].apply(value,args) : methodName.apply(value,args)); 
    });
  };

// Reduces an array or object to a single value by repetitively calling
// iterator(previousValue, item) for each item. previousValue should be
// the return value of the previous iterator call.
//
// You can pass in an initialValue that is passed to the first iterator
// call. If there's no initialValue, we should use the first element in
// our input `obj`.

  _.reduce = function(obj, iterator, initialValue) {
    var result = 0;
    if (typeof initialValue != 'undefined') { result = initialValue; }
    _.each(obj, function(val, ind, obj){
      result = iterator(result, val);
    });
   return result;


 /**   var initialExists = (initialValue !== undefined);
    var result;
    result = (initialExists) ? initialValue : obj[0]; 
    _.each(obj, function(val, ind, obj){
      result = (initialExists && ind==0) ? iterator.call(result, ind, obj) : iterator.call(result, val, ind, obj);
    });
    return result;

  /**  var initialExists = (initialValue !== undefined);
    var result;
    _.each(obj, function(val, ind, obj) {
      if (!initialExists && ind==0) result = val;
      result = iterator.call(result, val, ind, obj);
    });
    return result; **/
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: A lot of iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item){
      if(wasFound){
        return true;
      };
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(obj, iterator) {
    // TIP: use reduce on this one!
    // reduce(obj, iterator, initial)
    return _.reduce(obj, function(test, item){
      if(!test) return false;
      return (typeof iterator(item) === "boolean") ? iterator(item) : iterator == item;
    }, true);       
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.any = function(obj, iterator) {
    // TIP: re-use every() here
  };


  /*
   * These are a couple of helpers for merging objects
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  _.extend = function(obj) {
    _.each(Array.prototype.slice.call(arguments), function(val, ind, arr){
      obj[ind] = arr[ind];
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  };


  /*
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a `closure scope` (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  //
  // use .apply(this, arguments) possibly
  
  _.memoize = function(func) {
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /*
   * Advanced collection operations
   */

  // Shuffle an array.
  _.shuffle = function(obj) {
  };

  /* (End of pre-course curriculum) */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  _.zip = function() {
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  _.flatten = function(nestedArray, result) {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /*
   * Offroad
   */

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  _.throttle = function(func, wait) {
  };

}).call(this);
