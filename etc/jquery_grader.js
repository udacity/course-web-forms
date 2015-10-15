var comment, isCorrect;
comment = "";

// string _comment. adds new comment for grade results w/proper formatting
function commentizer (_comment) {
  comment = comment + _comment + "\n";
}
// string variable. returns true if the variable exists. modifies comment string and returns false otherwise.
function varStillExists (variable) {
  if (typeof variable !== undefined) return true;
  commentizer(variable + " doesn't exist. Did you accidentally change its name?");
  return false;
}
// jquery elem. returns true if elem is a jquery elem. modifies comment string and returns false otherwise.
function isjQuery (elem) {
  // could use obj.jquery, which will only return true if it is a jquery object
  if (elem instanceof $) return true;
  commentizer("Looks like you don't have a jQuery selector. Did you start your selector with the jQuery object, the $?");
  return false;
}
// jQuery elem, string tag. returns true if elem collection contains one instance of a tag. modifies comment string and returns false otherwise.
function hasCorrectTag (elem, tag) {
  if (elem.is(tag)) return true;
  commentizer("Expected to find an element with a tag of type: " + tag);
  return false;
}
// jquery elem. string className. returns true if elem includes an elem w/className. modifies comment and returns false otherwise.
function hasCorrectClass (elem, className) {
  // if (elem.is('.' + className)) return true;
  if (elem.hasClass(className)) return true;
  commentizer("Expected to find an element with class of type: " + className + ". Remember, class selectors start with '.'");
  return false;
}
// jquery elem. string id. returns true if elem includes an element w/id. modifies comment and returns false otherwise.
function hasCorrectId (elem, id) {
  if (elem.is('#' + id)) return true;
  commentizer("Expected to find an element with an id of " + id + ". Remember, id selectors start with '#'");
  return false;
}
// jquery elem. string text. returns true if elem has the right text. modifies comment and returns false otherwise
function hasCorrectText (elem, text) {
  // modify to point out specific changes?
  if (elem.text() === text) return true;
  commentizer("Incorrect text. This error could result from modifying the wrong element or changing the text.");
  return false;
}
// jquery elem. string attrName, string correctAttr. returns true if elem has attrName equal to correctAttr.
function hasCorrectAttr (elem, attrName, correctAttr) {
  if (elem.attr(attrName) === correctAttr) return true;
  commentizer("Expected attribute " + attrName + " to equal " + correctAttr);
  return false;
}
// jquery collection. int _length
function hasCorrectLength (collection, _length) {
  var cLength = collection.length;
  if (cLength === _length) return true;
  commentizer("Expected the collection to have a length of " + _length + ". Had " + cLength + " instead.");
  return false;
}
// jquery elem. jquery correctElem
function isCorrectElem (elem, correctElem) {
  if (elem.is(correctElem)) return true;
  commentizer("Selected the wrong element. Expected: " + correctElem + ". Instead saw: " + elem);
  return false;
}
// jquery collection. jquery correctCollection
function isCorrectCollection (collection, correctCollection) {
  if (collection.is(correctCollection)) return true;
  commentizer("Selected the wrong collection. Expected: " + correctCollection + ". Instead saw: " + collection);
  return false;
}
// jquery elem. string style. string _correctStyle. _style is the css class. _correctStyle is the expected value of _style.
function hasCorrectStyle (elem, _style, _correctStyle) {
  var currentStyle = elem.css(_style);
  if (currentStyle  === _correctStyle) return true;
  commentizer("Expected " + _style + " to be " + _correctStyle + ". Instead saw " + currentStyle);
  return false;
}
// string func. returns true if the method has been called inside the student code. false and comment otherwise
function hasCalledFunction (func) {
  var hasCalledFunction = false;
  $("script:contains(." + func + ")").each(function() {
    if ($(this).text().search("For this quiz") !== -1 && $(this).text().search("returns true if") === -1) hasCalledFunction = true;
  });
  if (hasCalledFunction === false) commentizer("Make sure you call the '" + func + "' function.");
  return hasCalledFunction;
}
// string css selector elem., parent. returns true if elem (or multiple elems) exists as a child (or deep child) of parent.
function doesExistInParent (elem, parent) {
  if ($(parent).find(elem).length > 0) return true;
  commentizer("There's at least one element missing from the page!");
  return false;
}
// string css selector elem, parent. returns true if elem does not exist as a child (or deep child) of parent.
function doesNotExistInParent (elem, parent) {
  if ($(parent).find(elem).length === 0) return true;
  commentizer("There's at least one element on the page that shouldn't be there!");
  return false;
}
// string css selector elem. returns true if there's at least one of the css selector elem
function doesExist (elem) {
  if ($(elem).length > 0) return true;
  commentizer("There's at least one element missing from the page!");
  return false;
}
// string css selector elem1 and elem2. returns true if elem1 and elem2 are siblings
function areSiblings (elem1, elem2) {
  if ($(elem1).siblings(elem2).length > 0) return true;
  commentizer(elem1 + " and " + elem2 + " need to be siblings!");
  return false;
}
// string css selector elem. jquery parent. returns true if elem (or multiple matched elems) exists as an immediate child of parent.
function isImmediateChild (elem, parent) {
  if ($(parent).children(elem).length > 0) return true;
  commentizer("There's at least one parent that's missing a child.");
  return false;
}