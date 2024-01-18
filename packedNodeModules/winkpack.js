require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( './its.js' );
var as = require( './as.js' );
var allowed = Object.create( null );

allowed.its4token = new Set( [
  its.case,
  its.uniqueId,
  its.negationFlag,
  its.normal,
  its.contractionFlag,
  its.pos,
  its.precedingSpaces,
  its.prefix,
  its.shape,
  its.stopWordFlag,
  its.abbrevFlag,
  its.suffix,
  its.type,
  its.value,
  its.stem,
  its.lemma
] );

allowed.its4tokens = allowed.its4token;

allowed.its4selTokens = allowed.its4token;

allowed.as4tokens = new Set( [
  as.array,
  as.set,
  as.text,
  as.bow,
  as.freqTable,
  as.bigrams,
  as.unique,
  as.markedUpText
] );

// NOTE: it should exclude `as.markedUpText`, whenever this is included in the above.
allowed.as4selTokens = new Set( [
  as.array,
  as.set,
  as.text,
  as.bow,
  as.freqTable,
  as.bigrams,
  as.unique
] );

allowed.its4entity = new Set( [
  its.value,
  its.normal,
  its.type,
  its.detail,
  its.span
] );

allowed.as4entities = new Set( [
  as.array,
  as.set,
  as.bow,
  as.freqTable,
  as.unique
] );

allowed.as4selEntities = allowed.as4entities;

allowed.its4sentence = new Set( [
  its.value,
  its.normal,
  its.span,
  its.markedUpText,
  its.negationFlag,
  its.sentiment,
  its.stem
] );

allowed.its4document = new Set( [
  its.value,
  its.normal,
  its.span,
  its.markedUpText,
  its.negationFlag,
  its.sentiment,
  its.stem,
  its.readabilityStats,
  its.sentenceWiseImportance
] );


module.exports = allowed;

},{"./as.js":19,"./its.js":32}],2:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## colEach
/**
 * Iterator for collections.
 * @param  {function} f      Call back function that is called on each item.
 * @param  {number}   start  The start index in the collection.
 * @param  {number}   end    The end index.
 * @param  {function} itemFn Item function to create chainable-methods of the item.
 * @return {void}            Nothing!
 * @private
 */
var colEach = function ( f, start, end, itemFn ) {
  for ( let k = start; k <= end; k += 1 ) {
    // Use relative indexing by adding `start` from `k`.
    f( itemFn( k ), ( k - start ) );
  }
}; // colEach()

module.exports = colEach;

},{}],3:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( '../its.js' );
var as = require( '../as.js' );
var allowed = require( '../allowed.js' );
var itmEntityOut = require( './itm-entity-out.js' );

// ## colEntitiesOut
/**
 * Out for collection of entities. Note: the out always returns a Javascript
 * data type or data structure. Word vectors do not apply to entities.
 * @param  {obejct}   entities entities from `rdd`; could be customEntities.
 * @param  {obejct}   rdd      Raw document data structure.
 * @param  {function} itsf     Desired `its` mapper.
 * @param  {function} asf      Desired `as` reducer.
 * @return {*}                 Reduced value.
 * @private
 */
var colEntitiesOut = function ( entities, rdd, itsf, asf ) {
  var ents = [];
  for ( let i = 0; i < entities.length; i += 1 ) {
    ents.push( itmEntityOut( i, entities, rdd, itsf ) );
  }
  // No application of allowed function if detail or span is needed, fall back to `as.array`.
  var asfn = ( allowed.as4entities.has( asf ) && itsf !== its.detail && itsf !== its.span ) ? asf : as.array;
  return asfn( ents );
}; // colEntitiesOut()

module.exports = colEntitiesOut;

},{"../allowed.js":1,"../as.js":19,"../its.js":32,"./itm-entity-out.js":10}],4:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## colFilter
/**
 * Filter for collections.
 * @param  {function} f             Predicate function to test each item of
 *                                  the array. Return true to select the item,
 *                                  false to reject or exclude.
 * @param  {number}   start         The start index.
 * @param  {number}   end           The end index.
 * @param  {function} itemFn        Item function to create chainable-methods of the item.
 * @param  {function} colSelectedFn The function to create chainable-methods for
 *                                  the collection of selection, which are returned.
 * @return {object}                 Object containing the applicable chainable-methods.
 */
var colFilter = function ( f, start, end, itemFn, colSelectedFn ) {
  var filtered = [];
  for ( let k = start; k <= end; k += 1 ) {
    // Use relative indexing by adding `start` from `k`.
    if ( f( itemFn( k ), ( k - start ) ) ) filtered.push( k );
  }
  return colSelectedFn( filtered );
}; // colFilter()

module.exports = colFilter;

},{}],5:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## colGetItemAt
/**
 * Obtains an item at the specified index from a collection.
 * @param  {number}   k      Relative index of the required item.
 * @param  {number}   start  The start index of collection.
 * @param  {number}   end    The end index of the collection.
 * @param  {function} itemFn Item function to create chainable-methods of the item.
 * @return {object}          Object containing the applicable chainable-methods
 *                           for the item found at `k`; otherwise `undefined`.
 * @private
 */
var colGetItemAt = function ( k, start, end, itemFn ) {
  // To handle relative indexing, compute actual `k` by adding `start`.
  var ak = k + start;
  return ( ( ak < start || ak > end ) ? undefined : itemFn( ak ) );
}; // colGetItemAt()

module.exports = colGetItemAt;

},{}],6:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var itmSentenceOut = require( './itm-sentence-out.js' );

// ## colSentencesOut
/**
 * Out for collection of sentences. Note: the out always returns a Javascript
 * data type or data structure.
 * @param  {object}   rdd          Raw Document Data-structure.
 * @param  {function} itsf         Desired `its` mapper.
 * @param  {object}   addons       The model's addons.
 * @return {*}                     Mapped sentences.
 * @private
 */
var colSentencesOut = function ( rdd, itsf, addons ) {
  var sents = [];
  for ( let i = 0; i < rdd.sentences.length; i += 1 ) {
    sents.push( itmSentenceOut( i, rdd, itsf, addons ) );
  }
  return sents;
}; // colSentencesOut()

module.exports = colSentencesOut;

},{"./itm-sentence-out.js":11}],7:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( '../its.js' );
var as = require( '../as.js' );
var allowed = require( '../allowed.js' );
var constants = require( '../constants.js' );
// Size of a single token.
var tkSize = constants.tkSize;
// Mask for preceding spaces.
var psMask = constants.psMask;

// ## colTokensOut
/**
 * Out for collection of tokens. Note: the out always returns a Javascript
 * data type or data structure.
 * @param  {number}   start       The start index of the collection.
 * @param  {number}   end         The end index of the collection.
 * @param  {object}   rdd         Raw Document Data-structure.
 * @param  {function} itsf        Desired `its` mapper.
 * @param  {function} asf         Desired `as` reducer.
 * @param  {object}   addons      The model's addons.
 * @return {*}                    Map-reduced collection of tokens.
 * @private
 */
var colTokensOut = function ( start, end, rdd, itsf, asf, addons ) {
  // Vectors require completely different handling.
  if ( itsf === its.vector ) {
    return its.vector( start, end, rdd.tokens, addons );
  }

  // Not a vector request, perform map-reduce.
  var mappedTkns = [];
  var itsfn = ( itsf && allowed.its4tokens.has( itsf ) ) ? itsf : its.value;
  var asfn = ( asf && allowed.as4tokens.has( asf ) ) ? asf : as.array;
  // Note, `as.text/markedUpText` needs special attention to include preceeding spaces.
  if ( asfn === as.text || asfn === as.markedUpText ) {
    for ( let i = start; i <= end; i += 1 ) {
      mappedTkns.push( ''.padEnd( rdd.tokens[ ( i * tkSize ) + 1 ] & psMask ), itsf( i, rdd.tokens, rdd.cache, addons ) );  // eslint-disable-line no-bitwise
    }
  } else {
    for ( let i = start; i <= end; i += 1 ) {
      mappedTkns.push( itsfn( i, rdd.tokens, rdd.cache, addons ) );
    }
  }

  return asfn( mappedTkns, rdd.markings, start, end );
}; // colTokensOut()

module.exports = colTokensOut;

},{"../allowed.js":1,"../as.js":19,"../constants.js":24,"../its.js":32}],8:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var search = require( '../search.js' );

// ## getParentItem
/**
 * Obtains the parent of the required item from a parent collection of spans.
 * @param  {number}   currItemIndex    Index of the item whose parent is needed.
 * @param  {array[]}  parentCollection Parent collection of spans.
 * @param  {function} parentItemFn     Required to instantiate the found parent item.
 * @return {object}                    Object containing the applicable chainable-methods
 *                                     of parent item, if found; otherwise `undefined`.
 * @private
 */
var getParentItem = function ( currItemIndex, parentCollection, parentItemFn ) {
  var k = search( currItemIndex, parentCollection );
  if ( k === null ) return undefined;
  return parentItemFn( k );
}; // getParentItem()

module.exports = getParentItem;

},{"../search.js":35}],9:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( '../its.js' );
var as = require( '../as.js' );
var allowed = require( '../allowed.js' );
var colTokensOut = require( './col-tokens-out.js' );

// ## itmDocumentOut
/**
 * Out method for the document. Note: the out always returns a Javascript
 * data type or data structure.
 * @param  {Object}   rdd         Raw Document Data-structure.
 * @param  {function} itsf        Desired `its` mapper.
 * @param  {Object}   addons      The model's addons.
 * @return {*}                    Mapped value.
 * @private
 */
var itmDocumentOut = function ( rdd, itsf, addons ) {
  var document = rdd.document;
  // Vectors require completely different handling.
  if ( itsf === its.vector ) {
    return its.vector( document, rdd, addons );
  }

  var itsfn = ( itsf && allowed.its4document.has( itsf ) ) ? itsf : its.value;

  if ( itsfn === its.span || itsfn === its.sentiment ) {
    return itsfn( document );
  }

  // Handle its.negationFlag seprately here.
  if ( itsfn === its.negationFlag ) {
    return ( document[ 2 ] === 1 );
  }

  if ( itsfn === its.readabilityStats ) {
    return itsfn( rdd, addons );
  }

  if ( itsfn === its.sentenceWiseImportance ) {
    return itsfn( rdd );
  }

  // Setup the correct `as.fn` becuase the current markedup text would have
  // returned the `value`. Refer to `its.markedUpText`.
  var asfn = ( itsfn === its.markedUpText ) ? as.markedUpText : as.text;

  return colTokensOut( document[ 0 ], document[ 1 ], rdd, itsfn, asfn, addons );
}; // itmDocumentOut()

module.exports = itmDocumentOut;

},{"../allowed.js":1,"../as.js":19,"../its.js":32,"./col-tokens-out.js":7}],10:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( '../its.js' );
var as = require( '../as.js' );
var allowed = require( '../allowed.js' );
var colTokensOut = require( './col-tokens-out.js' );

// ## itmEntityOut
/**
 * Out method for an entity. Note: the out always returns a Javascript
 * data type or data structure. There is no word vector support for entity.
 * @param  {number}   index       The index of desired entity.
 * @param  {Object}   entities    The entities from the `rdd`; could be custom.
 * @param  {Object}   rdd         Raw Document Data-structure.
 * @param  {function} itsf        Desired `its` mapper.
 * @return {*}                    Mapped value.
 * @private
 */
var itmEntityOut = function ( index, entities, rdd, itsf ) {
  var entity = entities[ index ];
  var itsfn = ( itsf && allowed.its4entity.has( itsf ) ) ? itsf : its.value;
  var detail;

  if ( itsfn === its.detail ) {
    // In case of `detail`, return an object containing entity's `text` & `type`.
    detail = Object.create( null );
    detail.value = colTokensOut( entity[ 0 ], entity[ 1 ], rdd, its.value, as.text );
    detail.type = entity[ 2 ];
    return detail;
  }

  if ( itsfn === its.type ) {
    // Extract `type` and return directly.
    return entity[ 2 ];
  }

  if ( itsfn === its.span ) {
    // Extract span and return.
    return its.span( entity );
  }

  // Balance cases ( i.e. value, normal, and type ) are handled via `colTokensOut()`.
  return colTokensOut( entity[ 0 ], entity[ 1 ], rdd, itsfn, as.text );
}; // itmEntityOut()

module.exports = itmEntityOut;

},{"../allowed.js":1,"../as.js":19,"../its.js":32,"./col-tokens-out.js":7}],11:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( '../its.js' );
var as = require( '../as.js' );
var allowed = require( '../allowed.js' );
var colTokensOut = require( './col-tokens-out.js' );

// ## itmSentenceOut
/**
 * Out method for a sentence. Note: the out always returns a Javascript
 * data type or data structure.
 * @param  {number}   index       The index of desired sentence.
 * @param  {Object}   rdd         Raw Document Data-structure.
 * @param  {function} itsf        Desired `its` mapper.
 * @param  {object}   addons      The model's addons.
 * @return {*}                    Mapped value.
 * @private
 */
var itmSentenceOut = function ( index, rdd, itsf, addons ) {
  var sentence = rdd.sentences[ index ];
  // Vectors require completely different handling.
  if ( itsf === its.vector ) {
    return its.vector( sentence, rdd, addons );
  }

  var itsfn = ( itsf && allowed.its4sentence.has( itsf ) ) ? itsf : its.value;

  if ( itsfn === its.span || itsfn === its.sentiment ) {
    return itsfn( sentence );
  }

  // Handle `its.negationFlag` seprately here.
  if ( itsfn === its.negationFlag ) {
    return ( sentence[ 2 ] === 1 );
  }

  // Setup the correct `as.fn` becuase the current markedup text would have
  // returned the `value`. Refer to `its.markedUpText`.
  var asfn = ( itsfn === its.markedUpText ) ? as.markedUpText : as.text;

  return colTokensOut( sentence[ 0 ], sentence[ 1 ], rdd, itsfn, asfn, addons );
}; // itmSentenceOut()

module.exports = itmSentenceOut;

},{"../allowed.js":1,"../as.js":19,"../its.js":32,"./col-tokens-out.js":7}],12:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( '../its.js' );
var allowed = require( '../allowed.js' );

// ## itmTokenOut
/**
 * Out method for a token. Note: the out always returns a Javascript
 * data type or data structure.
 * @param  {number}   index       The index of desired token.
 * @param  {Object}   rdd         Raw Document Data-structure.
 * @param  {function} itsf        Desired `its` mapper.
 * @param  {object}   addons      The model's addons.
 * @return {*}                    Mapped value.
 * @private
 */
var itmTokenOut = function ( index, rdd, itsf, addons ) {
  // Vectors require completely different handling.
  if ( itsf === its.vector ) {
    return its.vector( index, rdd, addons );
  }
  // Not a vector request, map using `itsf`.
  var f = ( allowed.its4token.has( itsf ) ) ? itsf : its.value;
  return f( index, rdd.tokens, rdd.cache, addons );
}; // itmTokenOut()

module.exports = itmTokenOut;

},{"../allowed.js":1,"../its.js":32}],13:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var constants = require( '../constants.js' );
// Size of a single token.
var tkSize = constants.tkSize;
// Mask for preceding spaces.
var psMask = constants.psMask;
// Bits reserved for `lemma`.
var bits4lemma = constants.bits4lemma;
// Mask for extracting pos
var posMask = constants.posMask;


// ### printTokens
/**
 *
 * Prints a table of tokens along with their properties on console.
 *
 * @param {number[]} tokens The tokens.
 * @param {object} cache The language `cache`.
 * @returns {void} Nothing!
 * @private
*/
var printTokens = function ( tokens, cache ) {
  var imax = tokens.length;
  var i, j;
  var t, tv;
  var pad = '                         ';
  var str;
  var props = [ 'prefix', 'suffix', 'shape', 'lutCase', 'nerHint', 'tokenType' ];

  // Print header.
  console.log( '\n\ntoken      p-spaces   prefix  suffix  shape   case    nerHint type     normal/pos' );
  console.log( '———————————————————————————————————————————————————————————————————————————————————————' );
  for ( i = 0; i < imax; i += tkSize ) {
    str = '';
    t = tokens[ i ];
    tv = cache.value( t );
    str += ( JSON.stringify( tv ).replace( /"/g, '' )  + pad ).slice( 0, 18 );
    str += ( ( tokens[ i + 1 ] & psMask ) + pad ).slice( 0, 4 );  // eslint-disable-line no-bitwise
    for ( j = 0; j < props.length; j += 1 ) {
      str += ( JSON.stringify( cache.property( t, props[ j ] ) ).replace( /"/g, '' ) + pad ).slice( 0, 8 );
    }
    if ( tokens[ i + 1 ] > 65535 ) {
      str += ' ' + cache.value( cache.nox( tokens[ i + 1 ] ) ); // eslint-disable-line no-bitwise
      str += ' / ' + cache.valueOf( 'pos', ( tokens[ i + 2 ] & posMask ) >>> bits4lemma ); // eslint-disable-line no-bitwise
    } else {
      str += ' ' + JSON.stringify( cache.value( cache.normal( t ) ) ).replace( /"/g, '' );
      str += ' / ' + cache.property( t, 'pos' );
    }

    // str += '/' + cache.property( t, 'nerHint' );  // eslint-disable-line no-bitwise
    console.log( str );
    // Not being used as of now; to use move it before the console.log!
    str += ' / ' + cache.valueOf( 'pos', ( tokens[ i + 2 ] & posMask ) >>> bits4lemma );  // eslint-disable-line no-bitwise
  }

  // Print total number of tokens.
  console.log( '\n\ntotal number of tokens: %d', tokens.length / tkSize );
}; // printTokens()

module.exports = printTokens;

},{"../constants.js":24}],14:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## selEach
/**
 * Iterator for selection.
 * @param  {function} f         Call back function that is called on each item.
 * @param  {number[]} selection Array containing indexes to the selected items.
 * @param  {function} itemFn    Item function to create chainable-methods of the item.
 * @return {void}               Nothing!
 * @private
 */
var selEach = function ( f, selection, itemFn ) {
  for ( let k = 0; k < selection.length; k += 1 ) {
    f( itemFn( selection[ k ] ), k );
  }
}; // selEach()

module.exports = selEach;

},{}],15:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( '../its.js' );
var as = require( '../as.js' );
var allowed = require( '../allowed.js' );
var itmEntityOut = require( './itm-entity-out.js' );

// ## selEntitiesOut
/**
 * Out for selection of entities. Note: the out always returns a Javascript
 * data type or data structure. Word vectors do not apply to entities.
 * @param  {number[]} selEntities Array containing indexes to the selected entities.
 * @param  {obejct}   entities    Entities from `rdd`; could be customEntities.
 * @param  {obejct}   rdd         Raw document data structure.
 * @param  {function} itsf        Desired `its` mapper.
 * @param  {function} asf         Desired `as` reducer.
 * @return {*}                    Reduced value.
 * @private
 */
var selEntitiesOut = function ( selEntities, entities, rdd, itsf, asf ) {
  var ents = [];
  for ( let i = 0; i < selEntities.length; i += 1 ) {
    ents.push( itmEntityOut( selEntities[ i ], entities, rdd, itsf ) );
  }
  // No application of allowed function if detail or span is needed, fall back to `as.array`.
  var asfn = ( allowed.as4selEntities.has( asf ) && itsf !== its.detail && itsf !== its.span ) ? asf : as.array;
  return asfn( ents );
}; // selEntitiesOut()

module.exports = selEntitiesOut;

},{"../allowed.js":1,"../as.js":19,"../its.js":32,"./itm-entity-out.js":10}],16:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
// ## selFilter
/**
 * Filter for selection.
 * @param  {function} f             Predicate function to test each item of
 *                                  the array. Return true to select the item,
 *                                  false to reject or exclude.
 * @param  {number[]} selection     Array containing indexes to the selected items.
 * @param  {function} itemFn        Item function to create chainable-methods of the item.
 * @param  {function} colSelectedFn The function to create chainable-methods for
 *                                  the collection of selection, which are returned.
 * @return {object}                 Object containing the applicable chainable-methods.
 * @private
 */
var selFilter = function ( f, selection, itemFn, colSelectedFn ) {
  var filtered = [];
  for ( let k = 0; k < selection.length; k += 1 ) {
    if ( f( itemFn( selection[ k ] ), k ) ) filtered.push( selection[ k ] );
  }
  return colSelectedFn( filtered );
}; // selFilter()

module.exports = selFilter;

},{}],17:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## selGetItemAt
/**
 * Obtains an item at the specified index from a collection.
 * @param  {number}   k         Relative index of the required item.
 * @param  {number[]} selection Array containing indexes to the selected items.
 * @param  {function} itemFn    Item function to create chainable-methods of the item.
 * @return {object}             Object containing the applicable chainable-methods
 *                              for the item found at `k`; otherwise `undefined`.
 * @private
 */
var selGetItemAt = function ( k, selection, itemFn ) {
  return ( ( k < 0 || k >= selection.length ) ? undefined : itemFn( selection[ k ] ) );
}; // selGetItemAt()

module.exports = selGetItemAt;

},{}],18:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var its = require( '../its.js' );
var as = require( '../as.js' );
var allowed = require( '../allowed.js' );
var constants = require( '../constants.js' );
// Size of a single token.
var tkSize = constants.tkSize;
// Mask for preceding spaces.
var psMask = constants.psMask;

// ## selTokensOut
/**
 * Out for selection of tokens. Note: the out always returns a Javascript
 * data type or data structure.
 * @param  {number[]} selTokens   Array containing indexes to the selected tokens.
 * @param  {obejct}   rdd         Raw document data structure.
 * @param  {function} itsf        Desired `its` mapper.
 * @param  {function} asf         Desired `as` reducer.
 * @param  {object}   addons      The addons from the model.
 * @return {*}                    Reduced value.
 * @private
 */
var selTokensOut = function ( selTokens, rdd, itsf, asf, addons ) {
  // Vectors require completely different handling.
  if ( itsf === its.vector ) {
    return its.vector( selTokens, rdd.tokens, addons );
  }

  // Not a vector request, perform map-reduce.
  var mappedTkns = [];
  var itsfn = ( itsf && allowed.its4selTokens.has( itsf ) ) ? itsf : its.value;
  var asfn = ( asf && allowed.as4selTokens.has( asf ) ) ? asf : as.array;

  // Note, `as.text` needs special attention to include preceeding spaces.
  // No `markedUpText` allowed here.
  if ( asfn === as.text ) {
    for ( let i = 0; i < selTokens.length; i += 1 ) {
      mappedTkns.push( ''.padEnd( rdd.tokens[ ( selTokens[ i ] * tkSize ) + 1 ] & psMask ), itsf( selTokens[ i ], rdd.tokens, rdd.cache, addons ) );  // eslint-disable-line no-bitwise
    }
  } else {
    for ( let i = 0; i < selTokens.length; i += 1 ) {
      mappedTkns.push( itsfn( selTokens[ i ], rdd.tokens, rdd.cache, addons ) );
    }
  }

  return asfn( mappedTkns );
}; // selTokensOut()

module.exports = selTokensOut;

},{"../allowed.js":1,"../as.js":19,"../constants.js":24,"../its.js":32}],19:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var sort4FT = require( './sort4FT.js' );
var containedMarkings = require( './contained-markings.js' );
var as = Object.create( null );

// ### array
/**
 * It is a simple passthru function i.e. input is returned as-is.
 *
 * @param  {string[]} tokens The input tokens.
 * @return {string[]}        the input `tokens` as-is.
 * @private
 */
as.array = function ( tokens ) {
  // Return the input tokens as-is.
  return tokens;
}; // array()

// ### set
/**
 * Constructs set from the `tokens`.
 *
 * @param  {string[]} tokens The input tokens.
 * @return {set}      the set of `tokens`.
 * @private
 */
as.set = function ( tokens ) {
  // Create set & return.
  return new Set( tokens );
}; // set()

// ### bow
/**
 *
 * Constructs the bag of words from the `tokens`.
 *
 * @param  {string[]} tokens The input tokens.
 * @return {objects}         the bag of words object containing `token/frequency`
 *                           `key/value` pairs.
 * @private
 */
as.bow = function ( tokens ) {
  // Bag of words.
  var bow = Object.create( null );
  var t;
  for ( let i = 0; i < tokens.length; i += 1 ) {
    t = tokens[ i ];
    bow[ t ] = 1 + ( bow[ t ] || 0 );
  }

  return bow;
}; // bow()

// ### freqTable
/**
 * Constructs the frequency table of `tokens`, which sorted in a descending
 * order of token's frequency.
 *
 * @param  {string[]} tokens The input tokens.
 * @return {array[]}         array of `[ token, frequency ]` pairs.
 * @private
 */
as.freqTable = function ( tokens ) {
  // NOTE: build FT based on argument type i.e. array or object (its.detail)
  var bow = as.bow( tokens );
  var keys = Object.keys( bow );
  var length = keys.length;
  var table = new Array( length );

  for ( var i = 0; i < length; i += 1 ) {
    table[ i ] = [ keys[ i ], bow[ keys[ i ] ] ];
  }

  return table.sort( sort4FT );
}; // freqTable()

// ### bigrams
/**
 * Generates bigrams of the input tokens.
 *
 * @param  {string[]} tokens The input tokens.
 * @return {array[]}         array of `[ token`<sub>i</sub>`, token`<sub>i+1</sub> `  ]`
 *                           bigrams.
 * @private
 */
as.bigrams = function ( tokens ) {
  // Bigrams will be stored here.
  var bgs = [];
  // Helper variables.
  var i, imax;
  // Create bigrams.
  for ( i = 0, imax = tokens.length - 1; i < imax; i += 1 ) {
    bgs.push( [ tokens[ i ], tokens[ i + 1 ] ] );
  }
  return bgs;
}; // bigrams()

as.unique = function ( tokens ) {
  return Array.from( new Set( tokens ) );
}; // unique()

// ### text
/**
 *
 * Generates the text by joining the contents of `twps` array (tokens with
 * preceding spaces).
 *
 * @param  {array} twps Array containing tokens with preceding spaces.
 * @return {string}     the text.
 * @private
*/
as.text = function ( twps ) {
  // Join on empty-space as preceding spaces are part of `twps`!
  return twps.join( '' ).trim();
}; // text()

// ### markedUpText
/**
 *
 * Generates the marked up text of the span specified by the `start` and `end` using
 * `twps` and `markings`.
 *
 * @param  {array}  twps     Array containing tokens with preceding spaces.
 * @param  {array}  markings Array containing span of markings & marking specs.
 * @param  {number} start    The start index of the tokens.
 * @param  {number} end      The end index of the tokens.
 * @return {string}          the markedup text.
 * @private
*/
as.markedUpText = function ( twps, markings, start, end ) {
  // Offset to be added while computing `first` and `last` indexes of `twps`.
  var offset = start * 2;
  // Compute the `range` of `markings` to consider on the basis `start` and `end`.
  var range = containedMarkings( markings, start, end );
  if ( range === null ) {
    // Means no valid range, return the text as is.
    return twps.join( '' ).trim();
  }
  // For every marking prefix the `first` one with `beginMarker` and suffix
  // the `last` one with `endMarker`.
  for ( let i = range.left; i <= range.right; i += 1 ) {
    const first = ( ( markings[ i ][ 0 ] * 2 ) - offset ) + 1;
    const last  = ( ( markings[ i ][ 1 ] * 2 ) - offset ) + 1;
    const beginMarker = ( markings[ i ][ 2 ]  === undefined ) ? '<mark>' : markings[ i ][ 2 ];
    const endMarker = ( markings[ i ][ 3 ]  === undefined ) ? '</mark>' : markings[ i ][ 3 ];

    twps[ first ] = beginMarker + twps[ first ];
    twps[ last ] += endMarker;
  }

  // Join all the elements and return the `markedUpText`.
  return twps.join( '' ).trim();
}; // markedUpText()

module.exports = as;

},{"./contained-markings.js":26,"./sort4FT.js":37}],20:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

/* eslint-disable no-console */
/* eslint-disable guard-for-in */
const composePatterns = require( './compose-patterns.js' );
const identifyMarkedArea = require( './identify-marked-area.js' );

const eosTokenN = 2070000;
const eosTokenX = '$%^EoS^%$';
const otherwiseN = 2070003;
const otherwiseX = ' otherwise';

var simpleFSM = function ( cache, token2Ignore ) {
  // Returned!
  var methods = Object.create( null );
  // Holds FSM in the following structure:<br/>
  // curr state —> event —> next state <br/>
  // One of the event is `otherwise`, whose next state defines the default state.
  var fsm = Object.create( null );
  // The root or the beginning state of the `fsm`.
  const root = 0;
  // Tracks the last used state. Whenever a new state is needed, its value is
  // incremented and returned. See `getNextState()`.
  var lastUsedState =  0;
  // The terminal states i.e. the detected patterns: maps state to name.
  var terminalStates = Object.create( null );
  // The terminal states, where part of pattern has been marked out.
  var markedStates = Object.create( null );
  // Add-ons value is stored here.
  var customPropertyAtStates = Object.create( null );
  // Use to substitute tokens by patterns in a multi-pass scenario.
  var substitutions;
  // On pattern detection function.
  var onPatternDetectionFn;
  // By default always ignore the new line character, else use the value supplied
  // by `token2Ignore`; this will usually be the OOV lexeme, i.e. `$%^oov^%$`.
  const toBeIgnoredToken =  ( token2Ignore === undefined ) ? '\n' : token2Ignore;
  // The `cache` is `undefined`, when things have to work on token text — for
  // learning & recognition both. For native case of learning (i.e. generation),
  // it can be `null` or real value; and native mode recognition will always
  // need real value of the `cache`.
  // Setup `keyLF/eosToken` to use during entity detection on the basis of `cache`
  // value — It is critical for model generation.
  const keyLF = ( cache === undefined || cache === null ) ? toBeIgnoredToken : cache.lookup( toBeIgnoredToken )[ 0 ];
  const eosToken = ( cache === undefined || cache === null ) ? eosTokenX : eosTokenN;
  // The `otherwise` event; including a space to ensure that such an input can
  // never arrive from the token stream. Later on it will be changed to numeric
  // value > `0xFFFFF` i.e. the limit of vocabulary.
  const otherwise = ( cache === undefined ) ? otherwiseX : otherwiseN;

  // ## getNextState
  /**
   *
   * Returns the next state to be assigned i.e. the next unused state or
   * a state corresponding to target, if defined.
   *
   * @param {number} index of current token.
   * @param {number} last index of last token.
   * @param {number} target state of the pattern being processed; could be
   * `undefined` if it is being encountered for the first time.
   * @returns {number} next state that should be assigned for the current event.
   * @private
  */
  var getNextState = function ( index, last, target ) {
    // Check its invocation in the of fsm.
    if ( index === last && target ) return target;
    // Compute next unused state & return. Note this now becomes the last
    // used state!
    lastUsedState += 1;
    return lastUsedState;
  }; // getNextState()

  // ## learnSinglePattern
  /**
   *
   * Learns a single pattern.
   *
   * @param {string} name of the pattern to be learned.
   * @param {array} pattern to be learned.
   * @param {array} mark `[ start, end ]`.
   * @param {any} customProperty contains definable value(s).
   * @returns {undefined} Nothing!
   * @private
  */
  var learnSinglePattern = function ( name, pattern, mark, customProperty ) {
    const length = pattern.length;
    // Last element.
    const last = length - 1;
    // Target state for this pattern, would be `undefined` if this pattern type is
    // enountered for the first time (`undefined` disables collapse of states).
    const target = undefined;
    // Tracks the `state` as the FSM builds up, specially useful if there are
    // machines with shared path i.e. common `(state, events)` pairs.
    let state = root;
    // Assigned for `otherwise` events.
    let goBackTo = root;
    // Temp for event & next state.
    let ev, nextState;

    // Iterate through the pattern's tokens, while discovering any existing
    // machine that can share path.
    for ( let k = 0; k < length; k += 1 ) {
      ev = pattern[ k ];
      // Create new state & intialize, if required.
      if ( fsm[ state ] === undefined ) {
        fsm[ state ] = Object.create( null );
        fsm[ state ][ otherwise ] = goBackTo;
      }
      // Check for machines that may share path.
      if ( fsm[ state ][ ev ] === undefined ) {
        // None found, create new state transition by assigning the next state for
        // the current event – `ev`.
        nextState = getNextState( k, last, target );
        fsm[ state ][ ev ] = nextState;
        // Always compute state transition from the perspective of discovering
        // shared path: here the `fsm[ state ][ ev ]` has been just assigned
        // `nextState`, therefore `state` needs to transition to this state only.
        state = nextState;
      } else if ( terminalStates[ fsm[ state ][ ev ] ] ) {
          // Case when shared path is found and the next state on the path is a
          // terminal state.
          if ( fsm[ state ][ otherwise ] === root ) fsm[ state ][ otherwise ] = goBackTo;
          goBackTo = fsm[ state ][ ev ];
          nextState = getNextState( k, last, target );
          fsm[ state ][ ev ] = nextState;
          // Compute state transition; again like earlier case, it would be `nextState`.
          state = nextState;
        } else if ( k === last ) {
            // Case when shared path is found and the next state on the path is NOT
            // a terminal state AND current token is the LAST one.
            nextState = getNextState( k, last, target );
            fsm[ fsm[ state ][ ev ] ][ otherwise ] = nextState;
            state = nextState;
          } else {
            // Case when shared path is found and the next state on the path is NOT
            // a terminal state AND current token is NOT the LAST one.<br/>
            // Simply compute state transition, no other work to be done!
            state = fsm[ state ][ ev ];
          }
    }
    terminalStates[ state ] = name;

    if ( mark ) {
      // Update last element of `mark` to simplifies computations during fsm
      // execution. Update must happen as a deep copy & not directly!
      markedStates[ state ] = identifyMarkedArea( mark, length );
    }

    if ( customProperty !== undefined ) {
      customPropertyAtStates[ state ] = customProperty;
    }
  }; // learnSinglePattern()

  // ## learn
  /**
   *
   * Learns the patterns that must be detected via recognize() API calls.
   *
   * @param {Object[]} patterns to be learned.
   *
   * @param {string} patterns[].name of the pattern.
   * @param {string} patterns[].structure of the pattern.
   * @returns {number} of uniquely named patterns.
   * `[ pattern-id, start-token, end-token ]` format.
   * @private
  */
  var learn = function ( patterns ) {
    // Temp for counting unique.
    var obj = Object.create( null );
    // Composed Patterns
    var cp = [];
    for ( let i = 0; i < patterns.length; i += 1 ) {
      const pi = patterns[ i ];
      if ( typeof pi.pattern === 'string' ) {
        const all = composePatterns( pi.pattern );
        for ( let j = 0; j < all.length; j += 1 )
          cp.push( { name: pi.name, pattern: all[ j ], mark: pi.mark, customProperty: pi.customProperty } );
      } else cp.push( { name: pi.name, pattern: pi.pattern, mark: pi.mark, customProperty: pi.customProperty } );
    }
    // Sort to get the longest pattern on the top.
    cp.sort( ( a, b ) => ( b.pattern.length - a.pattern.length ) );
    // All set, now learn using composed patterns – `cp`!
    for ( let i = 0; i < cp.length; i += 1 ) {
      learnSinglePattern( cp[ i ].name, cp[ i ].pattern, cp[ i ].mark, cp[ i ].customProperty );
    }
    // Return number of uniquely named patterns.
    for ( const ts in terminalStates ) obj[ terminalStates[ ts ] ] = true;
    return ( ( Object.keys( obj ) ).length );
  }; // learn()

  // ## setOnPatternDetectionFn
  /**
   *
   * Defines the function that is called on every detected pattern, provided
   * the detected pattern had an `customProperty` property defined.
   * @param {function} f to be called with `match` & `customProperty` value as parameters.
   * @returns {boolean} `true` if it was a success otherwise `false`.
   * @private
  */
  var setOnPatternDetectionFn = function ( f ) {
    if ( typeof f === 'function' ) {
      onPatternDetectionFn = f;
      return true;
    }
    return false;
  }; // setOnPatternDetectionFn()

  // ## pushMatch2Patterns
  /**
   *
   * Pushes a `match`ed pattern details into the `patterns` array after handling
   * marking and calling the on pattern detection function, if required. Before
   * pushing a `match` to patterns, the state (numeric) at `match[ 2 ]` is mapped
   * to its name using `terminalStates`; remember the `state` passed here is
   * always the terminal state. Passing state in match ensures that respective
   * `mark` and `customProperty` are handled differently if they have different values in
   * a state-machine rows, even though the `names` are identical.
   *
   * @param {array} patterns where the `match` is pushed.
   * @param {array} match pushed in to the `patterns`. The `match` conntains
   * 3-entries viz. 0—state, 1 & 2—start & end indexes of `tokens`.
   * @returns {undefined} Nothing.
   * @private
  */
  var pushMatch2Patterns = function ( patterns, match ) {
    // Extract the state at match[ 0 ].
    var m0 = match[ 2 ];
    // Pattern name `'0'` — simply ignore it!
    if ( terminalStates[ m0 ] === '0' ) return;
    // Not to be ignored — process it.
    var mark = markedStates[ m0 ];
    var customProperty = customPropertyAtStates[ m0 ];
    if ( mark ) {
      match[ 0 ] += mark[ 0 ];
      match[ 1 ] -= mark[ 1 ];
    }

    // Removed `customProperty !== undefined &&` check while coding pos experiment
    if ( onPatternDetectionFn )
      onPatternDetectionFn( match, customProperty );

    match[ 2 ] = terminalStates[ m0 ];

    patterns.push( match );
  }; // pushPattern()

  // ## setPatternSwap
  /**
   *
   * Sets up the patterns to be used for token substitution/swap in the
   * `recognize()` api.
   *
   * @param {array[]} patterns to be used for substitutions in `recognize()`.
   * @returns {undefined} Nothing.
   * @private
  */
  var setPatternSwap = function ( patterns ) {
    if ( !patterns || !Array.isArray( patterns ) ) {
      substitutions = undefined;
      return;
    }
    // Old `substitutions` are re-initialized.
    substitutions = Object.create( null );
    // Sort patterns by the start of pattern index.
    patterns.sort( ( a, b ) => ( a[ 0 ] > b[ 0 ] ) );
    // Index it by start of pattern.
    patterns.forEach( ( e ) => ( substitutions[ e[ 0 ] ] = [ e[ 1 ], e[ 2 ] ] ) );
  }; // setPatternSwap()

  // ## recognize
  /**
   *
   * Recognizes patterns present in the input tokens in a greedy manner.
   *
   * @param {array} tokens in which the patterns need to be recognized.
   * @param {function} [transformToken] an optional function that is called before
   * processing every token.
   * @param {*} [param] that has to be passed as the last param to `transformToken()`
   * function.
   * @returns {array[]} where each element follows
   * `[ pattern-id, start-token, end-token ]` format.
   * @private
  */
  var recognize = function ( tokens, transformToken, param ) {
    // Length of the `tokens.`
    const length = tokens.length;
    // Check if `transformToken` is a valid function.
    var transformTokenFn = ( typeof transformToken === 'function' ) ? transformToken : null;
    // Detected patterns are captured here. Each element has the following format: <br/>
    // `[ pattern-id, start-token, end-token ]`
    var patterns = [];
    // We don't need a separate state machines unlike `recognize()`, as the
    // following set of variables together act like a singleton machine.
    var first = 0;
    var state = root;
    // Next State.
    var ns = root;
    // Temp. for a single pattern.
    var p = null;
    // Last non-root otherwise state & index
    var lastOtherwiseIndex;
    var lastOtherwiseState;
    // Temp. for a token.
    var t;
    // Used to increment `j` and computing span of pattern correctly, may become
    // > 1 if an earlier detected pattern is longer that 1-token.
    var delta = 1;

    for ( let i = 0; i <= length; i += 1 ) {
      // **Attempt greedy lookup**:<br/>
      // Keep digging until next state becomes `root` or a terminal state is
      // encountered. Upon failure after a partial match, roll back is required
      // so that the extra consumed tokens can be explored by machine.
      for ( let j = i; j <= length; j += delta ) {
        // Extract current token.
        t = ( j === length ) ?  eosToken : tokens[ j ];

        // Skip the newline character; TODO: will replace by the hash value!
        // Use direct hash for the time being later, it must be obtained via cache
        if ( t === keyLF ) continue; // eslint-disable-line no-continue

        // Perform replacements using earlier detected patterns.
        if ( substitutions && substitutions[ j ] ) {
          t = substitutions[ j ][ 1 ];
          delta = substitutions[ j ][ 0 ] - j + 1;
        } else delta = 1;

        // Apply token transformation function, if defined. Must not be called
        // for the `eosToken`.
        if ( transformTokenFn && ( j < length ) ) t = transformTokenFn( t, cache, param, j );

        // Find next state on the basis of current `state` and current token – `t`.
        ns = fsm[ state ][ t ] || root;
        // Detect the state transition to capture `first` token of a potential upcoming
        // pattern. If state is `root` and the next state is `non-root` indicates
        // that we have just starting chasing for a new pattern.
        if ( !state && ns ) first = j;

        if ( terminalStates[ ns ] ) {
          // Terminal state encountered, save this pattern. Update span using `delta`.
          p = [ first, j + delta - 1, ns ];
          pushMatch2Patterns( patterns, p );
          // Set index to `j`, so that iterations can commence from `j + 1` as
          // for-loop increments the index variable at the end of loop!
          i = j;
          // Ensures that the inner loop terminates!
          j = length + 100;
          // Pattern has been discovered, so next state must be set to `root`.
          ns = root;
          // Same is true for the last saved otherwise state.
          lastOtherwiseState = root;
        } else if ( ns === root ) {
          // Not a terminal state but the next state has hit the `root`.
          if ( lastOtherwiseState ) {
            // But we have a `non-root` last saved otherwise state; this means
            // we must save this pattern.
            p = [ first, lastOtherwiseIndex, lastOtherwiseState ];
            pushMatch2Patterns( patterns, p );
            // Set index to the index corresponding to the above last saved otherwise
            // state.
            i = lastOtherwiseIndex;
            // Ensure that the inner loop terminates;
            j = length + 100;
            // Pattern has been discovered, so next state must be set to `root`.
            ns = root;
            // Same is true for the last saved otherwise state.
            lastOtherwiseState = root;
          } else {
            // The last saved otherwise state is pointing to `root`: terminate
            // the inner loop without updating the index variable — this ensures
            // complete roll back.
            j = length + 100;
          }
        }
        // Update the current state.
        state = ns;
        // Save (last) non-root otherwise state & index, if any.
        if ( fsm[ state ][ otherwise ] ) {
          // Update span using `delta`.
          lastOtherwiseIndex = j + delta - 1;
          lastOtherwiseState = fsm[ state ][ otherwise ];
        }
      }
    }

    return patterns;
  }; // recognize()

  // ## exportJSON
  /**
   * Exports the learning as a JSON, which may be saved as a text file for
   * later use via `importJSON()`.
   *
   * @return {string} Learning in JSON format.
   * @private
  */
  var exportJSON = function () {
    return JSON.stringify(
      [ 100, lastUsedState, fsm, terminalStates, markedStates, customPropertyAtStates ]
    );
  }; // exportJSON()

  // ## emptyModelJSON
  /**
   * Exports the an empty model's JSON. Useful in model generation.
   *
   * @return {string} Learning in JSON format.
   * @private
  */
  var emptyModelJSON = function () {
    // Empty machine!
    const m0 = Object.create( null );
    m0[ 0 ] = Object.create( null );
    return JSON.stringify(
      [ 100,
        0,                      // `lastUsedState`.
        m0,                     // `fsm`,
        Object.create( null ),  // `terminalStates`,
        Object.create( null ),  // `markedStates`,
        Object.create( null ),  // `customPropertyAtStates`
      ]
    );
  }; // emptyModelJSON()

  // ## importJSON
  /**
   * Imports an existing JSON learning for recognition.
   *
   * @param {JSON} json containing learnings in as exported by `exportJSON()`.
   * @return {void} Nothing!
   * @throws Error if `json` is invalid.
   * @private
  */
  var importJSON = function ( json ) {
    var model =  JSON.parse( json );
    lastUsedState = model[ 1 ];
    fsm = model[ 2 ];
    terminalStates = model[ 3 ];
    markedStates = model[ 4 ];
    customPropertyAtStates = model[ 5 ];
  }; // importJSON()

  // Prints the model in terms of the state machine & terminal states.
  var printModel = function () {
    console.log( 'State Machine:' );
    console.log( JSON.stringify( fsm, null, 2 ) );
    console.log();
    console.log( 'Terminal States:' );
    console.log( JSON.stringify( terminalStates, null, 2 ) );
    console.log();
    console.log( 'Marked States:' );
    console.log( JSON.stringify( markedStates, null, 2 ) );
    console.log();
    console.log( 'customProperty States:' );
    console.log( JSON.stringify( customPropertyAtStates, null, 2 ) );
  }; // printModel()


  methods.learn = learn;
  methods.recognize = recognize;
  methods.setPatternSwap = setPatternSwap;
  methods.setOnPatternDetectionFn = setOnPatternDetectionFn;
  methods.exportJSON = exportJSON;
  methods.importJSON = importJSON;
  methods.emptyModelJSON = emptyModelJSON;

  methods.printModel = printModel;

  // This a dummy statement to ensure 100% coverage; because feature of
  // collapsing shared states into single one was **disabled** due to `mark`.
  getNextState( 0, 0, 99 );
  return methods;
}; // fsm()

module.exports = simpleFSM;

},{"./compose-patterns.js":23,"./identify-marked-area.js":31}],21:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var constants = require( './constants.js' );
var xnMask = constants.xnMask;
var bits4PrecedingSpace = constants.bits4PrecedingSpace;
var xcMask = constants.xcMask;
var bits4xpPointer = constants.bits4xpPointer;

// ## cache
/**
 *
 * Creates an instance of `cache`. It is typically instantiated in each `winkNLP`
 * instance and there it is responsible for caching token properties acrosss the
 * documents i.e. the `doc()`.
 *
 * @param {Array} model containing language model.
 * @param {Array} featureFn extracts language specific features of a lexeme.
 * @return {object} of methods.
 * @private
*/
var cache = function ( model, featureFn ) {
  const fTokenType = 'tokenType';
  // Returned!
  var methods = Object.create( null );
  // Extract frequently used properties.
  var lexemesHash = model.features.lexeme.hash;
  var lxm = model.features.lexeme;
  var lexemeIntrinsicSize = model.features.lexeme.intrinsicSize;
  var layout = model.packing.layout;
  var pkSize = model.packing.size;
  var efSize = model.packing.efSize;
  var efList = model.packing.efList;
  var efListSize = efList.length;
  var lexicon = model.lexicon;
  var xpansions = model.xpansions;
  var posClusters = model.features.posClusters.list;
  // Contains quantas of UInt32Array of size `model.packing.size`. A quanta
  // at an `index` contains the features of the corresponding OOV lexeme loacted
  // at `model.features.lexeme.list[ index ]`. This simplifies information access,
  // as it remains identical to the **intrinsic lexicon** with the only difference
  // that this not a continuous array of UInt32s. It follows
  // `[ normal, lemma, <extractable features> ]` structure. The extractable
  // features will be dynamically determined using the language model.
  var extrinsicLexicon = [];
  // Base Packing Size is `2` because one word each for normal & lemma is needed.
  var elBasePackingSize = 2;
  // Packing size for each lexeme in `extrinsicLexicon` — base plus additional
  // words needed for extractable features.
  var elPackingSize = 2 + efSize;
  // Extractable Features temp storage; eventually its contents will be pushed
  // inside `extrinsicLexicon`. Space is allocated right in the beginning to save
  // time. Its contents are filled i.e. initialized with 0 whenever needed.
  var efArray = new Uint32Array( efSize );

  var feature = featureFn( model.packing.config );

  // Extractable Features Hash: used during property extraction for OOV tokens.
  // If a token is not found in this then a **0** is returned.
  var efHash = Object.create( null );
  // Since `tokenType` is determined during tokenization, it is always extractable.
  efHash.tokenType = true;
  // Copy rest from the list in to the hash.
  efList.forEach( ( ef ) => ( efHash[ ef ] = true ) );

  // ## getFeaturesIndex
  /**
   *
   * Returns the `index` of `value` from the feature `name`. If the value is
   * missing then it is added and its `index` is returned accordingly alongwith
   * a flag indicating that it is a new value.
   *
   * @param {string} name of the feature.
   * @param {string} value of the feature, whoes index will be returned.
   * @return {number[]} `[ isNewValue, index ]`.
   * @example
   * // Returns the index (hash) of **lexeme** – `you`:
   * getFeaturesIndex( 'lexeme', 'you' );
   * // -> [ 0, 47 ]
   * // If `you` was absent then it would have been added and the return value
   * // would have been [ 1, index of added value ]
   * @private
  */
  var getFeaturesIndex = function ( name, value ) {
    // Extract the named feature.
    var f = model.features[ name ];
    // And its hash & list.
    var h = f.hash;
    var l = f.list;
    // New `value` flag.
    var isNewValue = 0;
    // Check if `value` is present.
    var index = h[ value ];
    if ( index === undefined ) {
      // Feature's storage limit check. — not required right now!
      // if ( f.index > f.maxIndex ) {
      //   throw Error( `wink-nlp: memory limit for "${name}" exceeded.` );
      // }
      // Missing — add `value`.
      index = h[ value ] = f.index;
      // No need to increment index because push returns the required value!
      f.index = l.push( value );
      // Set new value flag.
      isNewValue = 1;
    }
    return [ isNewValue, index ];
  }; // getFeaturesIndex()

  // ## add
  /**
   *
   * Adds a token in the cache corresponding to the **text**. If the same is
   * present in the cache then a pointer to its cached value is retured; otherwise
   * a new entry is made in the cache and the same is returned.
   *
   * Whenever a new entry is made, all its extractable features are also
   * extracted & packed; and if an extractable feature is also new, its entry
   * is also made via `getFeaturesIndex()` api.
   *
   * @param {string} text i.e. the value of the token to be added.
   * @param {number} category of the token i.e. `word(0)` or `number(1)`, etc.
   * @return {number[]} index (or hash) of the `text` added.
   * @private
  */
  var add = function ( text, category ) {
    // Lowercased `text`.
    var normText = text.toLowerCase();
    // First start with `text` as its properties are being processed first.
    var textIndex = getFeaturesIndex( 'lexeme', text );
    // Then obtain index of its normal.
    var normIndex = ( normText === text ) ? textIndex : getFeaturesIndex( 'lexeme', normText );
    // Helpers: cfg of feature, feature, feature's value, feature's value for
    // packing & loop index.
    var cfg, f, fv, fv4p, k;

    // Process properties of `text` first.
    // The `textIndex[ 0 ]` is a indicated if the value is newly added, and if
    // so then add extract-able features. See `getFeaturesIndex()` above.
    if ( textIndex[ 0 ] ) {
      // NOTE: This block of code is repeated below, with an exception that
      // in the next block we use `normtext` in `fv = feature[ f ]( text )`.
      // Intialize extractable featires' array with all 0s.
      efArray.fill( 0 );
      // For every extractable feature, extract & pack.
      for ( k = 0; k < efListSize; k += 1 ) {
        f = efList[ k ];
        cfg = layout[ f ];
        // Use `text`.
        fv = feature[ f ]( text, category, methods );
        fv4p = ( cfg[ 3 ] ) ? fv : getFeaturesIndex( f, fv )[ 1 ];
        efArray[ cfg[ 0 ] ] |= ( fv4p << cfg[ 2 ] ); // eslint-disable-line no-bitwise
      } // for
      // Pack token type now.
      f = fTokenType;
      cfg = layout[ f ];
      efArray[ cfg[ 0 ] ] |= ( category << cfg[ 2 ] ); // eslint-disable-line no-bitwise
      // Push all the details i.e. `[ normal, lemma, <extractable features> ]`
      // into `extrinsicLexicon`.
      extrinsicLexicon.push( normIndex[ 1 ], normIndex[ 1 ], ...efArray );
    } // if ( >= lexemeIntrinsicSize )

    // If the normalized text is not same as the original text then the
    // normalize text's extract-able features could be candidates for addition.
    if ( textIndex[ 1 ] !== normIndex[ 1 ] ) {
      // Has it been newly added? If Yes, add its extract-able features.
      if ( normIndex[ 0 ] ) {
        // NOTE: This block of code is same as above.
        // Intialize extractable featires' array with all 0s.
        efArray.fill( 0 );
        // For every extractable feature, extract & pack.
        for ( k = 0; k < efListSize; k += 1 ) {
          f = efList[ k ];
          cfg = layout[ f ];
          // Use `normText`.
          fv = feature[ f ]( normText, category, methods );
          fv4p = ( cfg[ 3 ] ) ? fv : getFeaturesIndex( f, fv )[ 1 ];
          efArray[ cfg[ 0 ] ] |= ( fv4p << cfg[ 2 ] ); // eslint-disable-line no-bitwise
        } // for
        // Pack token type now.
        f = fTokenType;
        cfg = layout[ f ];
        efArray[ cfg[ 0 ] ] |= ( category << cfg[ 2 ] ); // eslint-disable-line no-bitwise
        // Push all the details i.e. `[ normal, lemma, <extractable features> ]`
        // into `extrinsicLexicon`.
        extrinsicLexicon.push( normIndex[ 1 ], normIndex[ 1 ], ...efArray );
      } // if ( >= lexemeIntrinsicSize )
    } // if ( textIndex !== normIndex )

    // Return the `textIndex` only – this can be sued to extract properties.
    return ( textIndex[ 1 ] );
  }; // add()

  // ## lookup
  /**
   *
   * Looks up for the `text` in the cache and returns its index. If the input
   * text is a contraction then its expansions are returned.
   *
   * @param {string} text to be searched in the cache.
   * @return {number[]} contains either a single element (i.e. `index`) indicating
   * that it is NOT a contraction or multiple elements indication that the text
   * is a contraction. Each contraction expands into 4 elements viz. `lexeme`,
   * `normal`, `lemma` , and `pos`.
   * @private
  */
  var lookup = function ( text ) {
    // `layout.isContraction` for multiple use later.
    var layout4isContraction = layout.isContraction;
    var layout4lemma = layout.lemma;
    // `index` to `text`.
    var index = lexemesHash[ text ];
    // Holds lemma extracted in case of contraction.
    var lemma;
    // Contraction Count, Contraction Index, Loop Index.
    var cc, cx, cxi;

    // If the text is not found, return `null`.
    if ( index === undefined ) return null;
    // `text` is found – need to check for contraction if `text` is not an OOV.
    var tokens = [];
    var isContraction;
    if ( index < lexemeIntrinsicSize ) {
      // Not an OOV, check it it is a contraction.
      isContraction = ( lexicon[ layout4isContraction[ 0 ] + ( index * pkSize ) ] & layout4isContraction[ 1 ] ) >>> layout4isContraction[ 2 ]; // eslint-disable-line no-bitwise
      if ( isContraction ) {
        // It is a contraction, process its expansions.
        // Start by extracting lemma, as it contains pointer to `expansions` and their count.
        lemma  = ( lexicon[ layout4lemma[ 0 ] + ( index * pkSize ) ] & layout4lemma[ 1 ] ) >>> layout4lemma[ 2 ]; // eslint-disable-line no-bitwise
        // Extract pointer (i.e. index) to expansions and their count.
        cx = lemma & 0x3FFF; // eslint-disable-line no-bitwise
        cc = ( lemma & ( xcMask << bits4xpPointer ) ) >> bits4xpPointer; // eslint-disable-line no-bitwise
        // Iterate through `cc` times to push details into the `tokens`.
        for ( cxi = 0; cxi < cc; cxi += 4 ) {
          tokens.push(
            xpansions[ cx + cxi ],      // lexeme
            cx + cxi + 1,               // normal (pointer to xpansion & not to lexicon)
            xpansions[ cx + cxi + 2 ],  // lemma
            xpansions[ cx + cxi + 3 ]   // pos
          );
        }
      } else {
        // Not a contraction, simply add `text`'s `index` to `tokens`.
        tokens.push( index );
      }
    } else {
      // An OOV, only add `text`'s `index` to `tokens`.
      tokens.push( index );
    }
    return tokens;
  }; // lookup()

  // ## value
  /**
   *
   * Returns the value corresponding to the `index`.
   *
   * @param {number} index for the value.
   * @return {string} value corresponding to the `index`.
   * @private
  */
  var value = function ( index ) {
    return lxm.list[ index ];
  }; // value()

  // ## normal
  /**
   *
   * Returns the index of normal of the input `index` (of required lexeme) after
   * taking into account mapping of spelling, if any.
   *
   * @param {number} index of the required lexeme.
   * @return {string} index to the normal.
   * @private
  */
  var normal = function ( index ) {
    // Temps for `layput.normal`, `layout.isSpellingMapped`, etc.
    var layout4normal = layout.normal;
    var layout4mapped = layout.isSpellingMapped;
    var layout4lemma =  layout.lemma;
    // Used to remap if its value is `1`. In this case lemma becomes the `normIndex`.
    var isSpellingMapped;
    // Index for OOVs i.e. when `index > lexemeIntrinsicSize`.
    var oovIdx;
    // Returned: normal's index.
    var normIndex;

    // Processing is different for native and OOV words or lexemes. For OOVs
    // properties have to be extracted from `extrinsicLexicon`, whereas for
    // native words they are exracted from `lexicon`.
    if ( index < lexemeIntrinsicSize ) {
      normIndex = ( lexicon[ layout4normal[ 0 ] + ( index * pkSize ) ] & layout4normal[ 1 ] ) >>> layout4normal[ 2 ]; // eslint-disable-line no-bitwise
      isSpellingMapped = ( lexicon[ layout4mapped[ 0 ] + ( index * pkSize ) ] & layout4mapped[ 1 ] ) >>> layout4mapped[ 2 ]; // eslint-disable-line no-bitwise
      if ( isSpellingMapped ) {
        // Mapped, pick up the lemma portion as this points to normal in case of
        // mapped spellings.
        normIndex = ( lexicon[ layout4lemma[ 0 ] + ( index * pkSize ) ] & layout4lemma[ 1 ] ) >>> layout4lemma[ 2 ]; // eslint-disable-line no-bitwise
      } else {
        // Compute actual index from the relative index.
        normIndex += index;
      }
    } else {
      oovIdx = index - lexemeIntrinsicSize;
      // Refer to `extrinsicLexicon` structure at the top of `cache()`.
      normIndex = extrinsicLexicon[ oovIdx * elPackingSize ];
      // This `normIndex` may point to an intrinsic lexeme, in which case
      // mapping needs to be checked.
      if ( normIndex < lexemeIntrinsicSize ) {
        isSpellingMapped = ( lexicon[ layout4mapped[ 0 ] + ( normIndex * pkSize ) ] & layout4mapped[ 1 ] ) >>> layout4mapped[ 2 ]; // eslint-disable-line no-bitwise
        if ( isSpellingMapped ) {
          normIndex = ( lexicon[ layout4lemma[ 0 ] + ( normIndex * pkSize ) ] & layout4lemma[ 1 ] ) >>> layout4lemma[ 2 ]; // eslint-disable-line no-bitwise
        }
      }
    }

    return normIndex;
  }; // normal()

  // ## mappedSpelling
  /**
   *
   * Returns the index of mapped spelling's of the input `index` of required lexeme.
   *
   * @param {number} index of the required lexeme.
   * @return {string} index to the normal.
   * @private
  */
  var mappedSpelling = function ( index ) {
    // Temps for `layout.isSpellingMapped`, etc.
    var layout4mapped = layout.isSpellingMapped;
    var layout4lemma =  layout.lemma;
    // Used to remap if its value is `1`. In this case lemma becomes the `normIndex`.
    var isSpellingMapped;
    // Returned: normal's index.
    var mappedIndex = index;

    // Only applicable to lexems that are inside the vocabulary as there can not
    // be mapped spelling for OOV words!
    if ( index < lexemeIntrinsicSize ) {
      isSpellingMapped = ( lexicon[ layout4mapped[ 0 ] + ( index * pkSize ) ] & layout4mapped[ 1 ] ) >>> layout4mapped[ 2 ]; // eslint-disable-line no-bitwise
      if ( isSpellingMapped ) {
        // Mapped, pick up the lemma portion as this points to normal in case of
        // mapped spellings.
        mappedIndex = ( lexicon[ layout4lemma[ 0 ] + ( index * pkSize ) ] & layout4lemma[ 1 ] ) >>> layout4lemma[ 2 ]; // eslint-disable-line no-bitwise
      }
    }

    return mappedIndex;
  }; // mappedSpelling()

  // ## nox
  /**
   *
   * Returns the index of normal of the expansion.
   *
   * @param {number} binaryWord containing pointer to `xpansions` and `precedingSpaces`;
   * It is the 2nd (relative) element of a single token's packet of 4-words.
   * @return {number} index to the normal, whoes value can be found via `value()`.
   * @private
  */
  var nox = function ( binaryWord ) {
    return xpansions[ ( binaryWord & xnMask) >>> bits4PrecedingSpace ];  // eslint-disable-line no-bitwise
  }; // nox()

  // ## property
  /**
   *
   * Extracts the property – `prop` of a lexeme (or word) specified by `index`.
   *
   * @param {number} index of the lexeme whoes properties are required to be extracted.
   * @param {string} prop (name) that needs to be extracted — it should be a valid property.
   * @return {string} extracted property, if `prop` is known/valid otherwise `null`.
   * @private
  */
  var property = function ( index, prop ) {
    // A property and its value
    var propValue;
    // Index for OOVs i.e. when `index > lexemeIntrinsicSize`.
    var oovIdx;
    // Temp for `layput[ p ]`
    var layout4Prop;

    // Processing is different for native and OOV words or lexemes. For OOVs
    // properties have to be extracted from `extrinsicLexicon`, whereas for
    // native words they are exracted from `lexicon`.
    if ( index < lexemeIntrinsicSize ) {
      layout4Prop = layout[ prop ];
      if ( layout4Prop  === undefined ) return null;
      propValue  = ( lexicon[ layout4Prop[ 0 ] + ( index * pkSize ) ] & layout4Prop[ 1 ] ) >>> layout4Prop[ 2 ]; // eslint-disable-line no-bitwise
      // Use hash/list to update value if required.
      if ( layout4Prop[ 3 ] === 0 || layout4Prop[ 5 ] === 1 ) propValue = model.features[ prop ].list[ propValue ];
    } else {
        // Attempt extraction only if extractable!
        if ( !efHash[ prop ] ) return 0;
        // Compute index into `extrinsicLexicon`.
        oovIdx = index - lexemeIntrinsicSize;
        layout4Prop = layout[ prop ];
        // No need for this check as `if ( !efHash[ prop ] )...` ensures return
        // in case of any unknown property:
        /* if ( layout4Prop  === undefined ) return null; */
        // Use `extrinsicLexicon`.

        // Reach to the desired quanta via `oovIdx * elPackingSize`, move forward by `base size` and then go to offset!
        propValue  = ( extrinsicLexicon[ ( oovIdx * elPackingSize ) + elBasePackingSize + layout4Prop[ 0 ] ] & layout4Prop[ 1 ] ) >>> layout4Prop[ 2 ]; // eslint-disable-line no-bitwise
        // Use hash/list to update value if required.
        if ( layout4Prop[ 3 ] === 0 || layout4Prop[ 5 ] === 1 ) propValue = model.features[ prop ].list[ propValue ];
    }
    return propValue;
  }; // property()

  var isMemberPOS = function ( lexemeIdx, posIdx ) {
    // Dont miss converting posIdx to a number.
    return posClusters[ property( lexemeIdx, 'lexemeCID' ) ].has( +posIdx );
  }; // isMemberPOS()

  // ## posOf
  /**
   *
   * Extracts the pos' index of the a lexeme (or word) specified by `index`.
   *
   * @param {number} index of the lexeme whoes properties are required to be extracted.
   * @return {string[]} extracted properties in the same sequence as `list`.
   * @private
  */
  var posOf = function ( index ) {
    // Value of extracted pos will go here.
    var posValue;
    // Index for OOVs i.e. when `index > lexemeIntrinsicSize`.
    var oovIdx;
    // Temp for `layput[ p ]`
    var layout4Prop;

    // Processing is different for native and OOV words or lexemes. For OOVs
    // properties have to be extracted from `extrinsicLexicon`, whereas for
    // native words they are exracted from `lexicon`.
    if ( index < lexemeIntrinsicSize ) {
        layout4Prop = layout.pos;
        posValue  = ( lexicon[ layout4Prop[ 0 ] + ( index * pkSize ) ] & layout4Prop[ 1 ] ) >>> layout4Prop[ 2 ]; // eslint-disable-line no-bitwise
    } else {
        // Compute index into `extrinsicLexicon`.
        oovIdx = index - lexemeIntrinsicSize;
        layout4Prop = layout.pos;

        // Use `extrinsicLexicon`.
        // Reach to the desired quanta via `oovIdx * elPackingSize`, move forward by `base size` and then go to offset!
        posValue  = ( extrinsicLexicon[ ( oovIdx * elPackingSize ) + elBasePackingSize + layout4Prop[ 0 ] ] & layout4Prop[ 1 ] ) >>> layout4Prop[ 2 ]; // eslint-disable-line no-bitwise
    }
    return posValue;
  }; // posOf()

  // ## valueOf
  /**
   *
   * Extracts the value of the `prop`erty for its input `index`.
   *
   * @param {string} prop to be extracted for the `index`.
   * @param {number} index of the property.
   * @return {string[]} extracted properties in the same sequence as `list`.
   * @private
  */
  var valueOf = function ( prop, index ) {
    return model.features[ prop ].list[ index ];
  }; // valueOf()

  // ## currentSize
  /**
   *
   * Returns the current size of lexicon including OOVs.
   *
   * @return {number} size of the current lexicon.
   * @private
  */
  var currentSize = function () {
    // Minus `1` becuase at `0` we have OOV symbolic word.
    return ( lxm.list.length - 1 );
  }; // size()

  // ## intrinsicSize
  /**
   *
   * Returns the intrinsic i.e. native size of lexicon.
   *
   * @return {number} size of the native or intrinsic lexicon.
   * @private
  */
  var intrinsicSize = function () {
    return lexemeIntrinsicSize;
  };

  /**
   * Finds if the text can have `pos` as valid part of speech, provided it is a
   * base form. Used in **lemmatization** to see if the lemma shares the same pos
   * with the original word.
   *
   * @param  {string} text  the incoming word.
   * @param  {string} pos   the pos that needs to be checked as one of the valid pos for text.
   * @return {boolean}       True if it does, otherwise false.
   */
  var hasSamePOS = function ( text, pos ) {
    // Get the word's index
    var textIndex = lookup( text );
    // If not found i.e. OOV means that it did not have a pre-defined POS set.
    if ( !textIndex ) return false;
    // More then one means it is a contraction.
    if ( textIndex.length > 1 ) return false;
    // Outside intrinsic vocab means OOV again.
    if ( textIndex[ 0 ] >= lexemeIntrinsicSize ) return false;
    // If it is not a base form so point in checking same POS — basics of
    // lemmatization. For example, `hiding` becomes `hid` on removal of `-ing`,
    // which is not in base form (i.e. hid is the past tense of hide); so it should
    // not take that as the lemma and instead try adding `-e`.
    if ( property( textIndex, 'isBaseForm' ) === 0 ) return false;
    // Finally if it is in base form then check for pos membership.
    return isMemberPOS( textIndex[ 0 ], model.pos.hash[ pos ] );
  }; // hasSamePOS()

  // ## isOOV
  /**
   *
   * Tests the input `text` for being an OOV.
   *
   * @param {text} text that needs to be test for OOV.
   * @return {boolean} true if OOV otherwise false (in vocab).
   * @private
  */
  var isOOV = function ( text ) {
    var textIndex = lookup( text );
    if ( !textIndex ) return true;
    if ( textIndex.length > 1 ) return false;
    if ( textIndex[ 0 ] >= lexemeIntrinsicSize ) return true;
    return false;
  }; // isOOV()

  methods.add = add;
  methods.lookup = lookup;
  methods.value = value;
  methods.property = property;
  methods.normal = normal;
  methods.nox = nox;
  methods.posOf = posOf;
  methods.valueOf = valueOf;
  methods.currentSize = currentSize;
  methods.intrinsicSize = intrinsicSize;
  methods.isOOV = isOOV;
  methods.isMemberPOS = isMemberPOS;
  methods.hasSamePOS = hasSamePOS;
  methods.mappedSpelling = mappedSpelling;

  return methods;
}; // cache()

module.exports = cache;

},{"./constants.js":24}],22:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

/* eslint-disable no-sync */


var makeRegexes = function ( config ) {
  var rgx = [];
  var imax = config.length;
  var i;

  for ( i = 0; i < imax; i += 1 ) {
    rgx.push( [ ( new RegExp( config[ i ][ 0 ], config[ i ][ 1 ] ) ), config[ i ][ 2 ] ] );
  }
  return rgx;
}; // makeRegexes()

var compileTRex =  function ( trex ) {
  var rtc;
  var ltc;
  var helpers = Object.create( null );

  try {
    rtc = makeRegexes( trex.rtc );

    ltc = makeRegexes( trex.ltc );

    // Helper regexes.
    for ( const h in trex.helpers ) { // eslint-disable-line guard-for-in
      helpers[ h ] = new RegExp( trex.helpers[ h ][ 0 ], trex.helpers[ h ][ 1 ] );
    }

    // file = path.join( __dirname, 'languages', language, 'normalization-map.json' );
    // nmap = JSON.parse( fs.readFileSync( file, 'utf8' ) );
  } catch ( ex ) {
    throw Error( 'wink-nlp: Invalid trex.\n\nDetails:\n' + ex.message );
  }
  return  { rtc: rtc, ltc: ltc, helpers: helpers };
}; // readLangConfig()

module.exports = compileTRex;

},{}],23:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var regex = /\[.*?\]/g;

// ## extractEnclosedText
/**
 *
 * Extracts the text enclosed in square brackets.
 *
 * @param {string} text from which enclosed text is extracted.
 * @returns {string[]} texts enclosed within square brackets.
 * @private
*/
var extractEnclosedText = function ( text ) {
  var // Extracted elements are captured here.
      elements = [],
      // Extract matches with quotes
      matches = text.match( regex );
  if ( !matches || ( matches.length === 0 ) ) return null;
  // Collect elements after removing the quotes.
  for ( var k = 0, kmax = matches.length; k < kmax; k += 1 ) {
    elements.push( matches[ k ].substr( 1, matches[ k ].length - 2 ) );
  }
  return ( elements );
}; // extractEnclosedText();

// ## productReducer
/**
 *
 * Callback function used by `reduce` inside the `product()` function.
 * Follows the standard guidelines of `reduce()` callback function.
 *
 * @param {array} prev refer to JS reduce function.
 * @param {array} curr refer to JS reduce function.
 * @returns {array} reduced value.
 * @private
*/
var productReducer = function ( prev, curr ) {
  var c,
      cmax = curr.length;
  var p,
      pmax = prev.length;
  var result = [];

  for ( p = 0; p < pmax; p += 1 ) {
    for ( c = 0; c < cmax; c += 1 ) {
      result.push( prev[ p ].concat( curr[ c ] ) );
    }
  }
  return ( result );
}; // productReducer()

/**
 *
 * Finds the Cartesian Product of arrays present inside the array `a`. Therefore
 * the array `a` must be an array of 1-dimensional arrays. For example,
 * `product( [ [ 9, 8 ], [ 1, 2 ] ] )` will produce
 * `[ [ 9, 1 ], [ 9, 2 ], [ 8, 1 ], [ 8, 2 ] ]`.
 *
 * @param {array} a whose cartesian product is computed.
 * @returns {array} reduced value.
 * @private
*/
var product = function ( a ) {
  return (
    a.reduce( productReducer, [ [] ] )
  );
}; // product()


// ## composeCorpus
/**
 *
 * Generates all possible patterns from the input argument string.
 * The string s must follow a special syntax as illustrated in the
 * example below:<br/>
 * `'[I] [am having|have] [a] [problem|question]'`<br/>
 *
 * Each phrase must be quoted between `[ ]` and each possible option of phrases
 * (if any) must be separated by a `|` character. The patterns are composed by
 * computing the cartesian product of all the phrases.
 *
 * If a single patterns expands to a large size then it issues console
 * warning/error at 512/65536 level.
 *
 * @param {string} str the input string.
 * @return {string[]} of all possible patterns.
 * @private
*/
var composePatterns = function ( str ) {
  if ( !str || ( typeof str !== 'string' ) ) return [];

  const LIMIT1 = 512;
  const LIMIT2 = 65536;
  var quotedTextElems = extractEnclosedText( str );
  var patterns = [];
  var finalPatterns = [];

  if ( !quotedTextElems ) return [ [ str ] ];
  quotedTextElems.forEach( function ( e ) {
    patterns.push( e.split( '|' ) );
  } );

  // Compute the size of the array that will be produced as a result of processing
  // the pattern.
  const size = patterns.reduce( ( ( prev, curr ) => prev * curr.length ), 1 );

  // Issue warning/error if the size is prohibitively large from the end-user
  // prespective. Note: while winkNLP can handle even larger sizes, it can
  // still break down in the event of explosion!
  if ( size > LIMIT1 && size < LIMIT2 ) {
    console.warn( 'winkNLP: complex pattern detected, consider simplifying it!' );
  } else if ( size > LIMIT2 ) console.error(
                              'winkNLP: very complex pattern detected, please review and simplify.\n' +
                              '         === It may slow down further execution! ===\n\n'
                             );

  product( patterns ).forEach( function ( e ) {
    finalPatterns.push( e.join( ' ' ).trim().split( /\s+/ ) );
  } );
  return ( finalPatterns );
}; // composePatterns()

module.exports = composePatterns;

},{}],24:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var consts = Object.create( null );
// Unknown or the UNK!
consts.UNK = 0;
// Bits reserved for `precedingSpaces`.
consts.bits4PrecedingSpace = 16;
// Bits reserved for `lemma`.
consts.bits4lemma = 20;
// Mask for pos extraction from tokens
consts.posMask = 0x3F00000;
// Mask for preceding spaces.
consts.psMask = 0xFFFF;
// Mask for pointer to normal in `xpansions`.
consts.xnMask = 0x3FFF0000;
// Mask for lemma extraction in case of contractions.
consts.lemmaMask = 0xFFFFF;
// Size of a single token.
consts.tkSize = 4;
// Size of a single expansion.
consts.xpSize = 4; // can't: ca can can MD i.e. expansion, normal, lemma, pos.
// Expansion count mask.
consts.xcMask = 0x1F;
// Bits reserved for point to expansions in `lemma` space.
consts.bits4xpPointer = 14;
// Negation Flag.
consts.negationFlag = Math.pow( 2, 31 );

module.exports = consts;

},{}],25:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var locate = require( './locate.js' );

// ## containedEntities
/**
 *
 * Returns the contained entities, if any within the span defined by the
 * `sentenceStart` and the `sentenceEnd`.
 *
 * @param {array} entities from where contained ones will be returned, if any.
 * @param {number} sentenceStart start of the sentence.
 * @param {number} sentenceEnd end of the sentence.
 * @return {array} of contained entities, empty if none are contained.
 * @private
*/
var containedEntities = function ( entities, sentenceStart, sentenceEnd ) {
  var left = locate( sentenceStart, entities );
  var right = locate( sentenceEnd, entities );
  var maxIndex = entities.length - 1;
  // Contained entities.
  var contained = [];
  // Index left & right.
  var kl, kr;
  // Helper.
  var i;

  // Return empty array if span is completely on the left or right side of the
  // `entities`.
  if ( ( left < 0 && right < 0 ) || ( left > maxIndex && right > maxIndex ) ) {
    return contained;
  }

  // The `left` must move to the next integer value to get the first index.
  // To avoid `-0`!
  kl = ( left < 0 ) ? 0 : Math.ceil( left );

  // If both `left` and `right` are fractions & equal means nothing is contained.
  if ( ( left === right ) && ( kl !== left ) ) {
    return contained;
  }

  // Something is conatined for sure, capture it and return!
  kr = Math.floor( right );
  for ( i = kl; i <= kr; i += 1 ) {
    contained.push( i );
  }

  return contained;
}; // containedEntities()

module.exports = containedEntities;

},{"./locate.js":33}],26:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var locate = require( './locate.js' );

// ## containedMarkings
/**
 *
 * Returns the range of contained markings, if any within the span defined by the
 * `start` and the `end`.
 *
 * @param {array} markings from where contained ones will be returned, if any.
 * @param {number} start The start of the span.
 * @param {number} end The end of the span.
 * @return {array} range of contained markings, `null` if none are contained.
 * @private
*/
var containedMarkings = function ( markings, start, end ) {
  if ( markings === undefined || start === undefined || end === undefined ) {
    return null;
  }

  // Left & right indexes into the `markings` array.
  var left = locate( start, markings );
  var right = locate( end, markings );
  var maxIndex = markings.length - 1;
  var kl, kr;

  // Return just the text if span is completely on the left or right side of the
  // `markings`.
  if ( ( left < 0 && right < 0 ) || ( left > maxIndex && right > maxIndex ) ) {
    return null;
  }

  // The `left` must move to the next integer value to get the first index.
  // To avoid `-0`!
  kl = ( left < 0 ) ? 0 : Math.ceil( left );

  // If both `left` and `right` are fractions & equal means nothing is contained.
  // Return just the text, no markups!
  if ( ( left === right ) && ( kl !== left ) ) {
    return null;
  }

  kr = Math.floor( right );
  // Mark those markings, which are completely contained in the closed interval
  // `[ start, end ]` i.e. no partially contained markings.
  if ( markings[ kl ][ 0 ] < start ) kl += 1;
  if ( markings[ kr ][ 1 ] > end )   kr -= 1;
  if ( kl > kr ) {
    return null;
  }

  var range = Object.create( null );
  range.left = kl;
  range.right = kr;

  return range;
}; // containedMarkings

module.exports = containedMarkings;

},{"./locate.js":33}],27:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

/* eslint-disable no-underscore-dangle */

var constants = require( './constants.js' );

// Bits reserved for `precedingSpaces`.
var bits4PrecedingSpace = constants.bits4PrecedingSpace;
// Size of a single expansion.
var xpSize = constants.xpSize;
// Bits reserved for `lemma`.
var bits4lemma = constants.bits4lemma;
// The UNK!
var UNK = constants.UNK;

var docDataWrapper = function ( data ) {
  // Extract frequently referred data elements:
  // Extract `cache`.
  var cache = data.cache;
  // Extract `tokens`.
  var tokens = data.tokens;

  // Returned!
  var methods = Object.create( null );

  // ## addToken
  /**
   *
   * It first creates a new lexeme entry into the `cache` and then this entry
   * is pushed into the `tokens` array alongwith the `precedingSpaces` and
   * rest of the token properties are initialized to `0`.
   *
   * @param {string} text to be added as token.
   * @param {string} category of the token.
   * @param {number} precedingSpaces to the `text` as parsed by tokenizer.
   * @param {number[]} tokens, where the token is added.
   * @returns {boolean} always `true`.
   * @private
  */
  var addToken = function ( text, category, precedingSpaces ) {
    tokens.push( cache.add( text, category ), precedingSpaces, 0, 0 );
    return true;
  }; // addToken()

  // ## addTokenIfInCache
  /**
   *
   * Adds a token corresponding to the input `text` if it is found in cache i.e.
   * not an OOV. The addition process ensures the following:
   * 1. Preceding spaces are added.
   * 2. If text is a contraction, it expansions are added. Since expansins
   * consists of lexeme, normal, lemma and pos, all of these are added to the
   * token structure.
   *
   * @param {string} text to be added as token.
   * @param {number} precedingSpaces to the `text` as parsed by tokenizer.
   * @returns {boolean} `truthy` if `text` is found in cache otherwise `falsy`.
   * @private
  */
  var addTokenIfInCache = function ( text, precedingSpaces ) {
    // The array `tokenIndex` will contain 1-element if `text` is not a predefined
    // contraction; otherwise it will contain `n x 4` elements, where `n` is the
    // number of expansions.
    var tokenIndex = cache.lookup( text );
    // Temp for preceding space in case of contarction.
    var ps;
    // Temp for lemma & pos.
    var lemma, pos;

    // `UNK` means 0 or `falsy`; it flags that token has not been added.
    if ( tokenIndex === null ) return UNK;

    if ( tokenIndex.length === 1 ) {
      tokens.push( tokenIndex[ 0 ], precedingSpaces, 0, 0 );
    } else {
      // Contraction, itereate through each expansion.
      for ( let k = 0; k < tokenIndex.length; k += xpSize ) {
        // The `precedingSpaces` will be 0 except for the first expansion.
        ps = ( k === 0 ) ? precedingSpaces : 0;
        // Concatenate pointer to normal contained in `xpansions` with preceding
        // spaces.
        ps |= ( tokenIndex[ k + 1 ] << bits4PrecedingSpace ); // eslint-disable-line no-bitwise
        // Lemma & POS are fixed mostly for all contractions.
        lemma = tokenIndex[ k + 2 ];
        pos   = tokenIndex[ k + 3 ];
        // Add token; annotations may be filled later in the pipeline.
        tokens.push( tokenIndex[ k ], ps, ( lemma | ( pos << bits4lemma ) ), 0 ); // eslint-disable-line no-bitwise
      }
    }
    // Return `truthy`, indicating that token(s) has been added successfully.
    return 99;
  }; // addTokenIfInCache()

  // ## isLexeme
  /**
   *
   * Tests if the `text` is a valid lexeme or not.
   *
   * @param {string} text to be added as token.
   * @returns {boolean} `truthy` if `text` is a valid lexeme otherwise `falsy`.
   * @private
  */
  var isLexeme = function ( text ) {
    // Return `truthy` if the text is valid i.e. found. Note for `$%^OOV^%$`, it returns
    // `0` i.e. `falsy`!
    return cache.lookup( text );
  }; // isLexeme()

  var clean = function () {
    tokens = null;
    cache = null;
  }; // clean()

  methods._addToken = addToken;
  methods._addTokenIfInCache = addTokenIfInCache;
  methods.isLexeme = isLexeme;
  methods.clean = clean;

  return methods;
}; // docDataWrapper()

module.exports = docDataWrapper;

},{"./constants.js":24}],28:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

var containedEntities = require( './contained-entities.js' );

// ### Helper Functions

// Get **item at** collection, selection & parent.
var getParentItem = require( './api/get-parent-item.js' );
var colGetItemAt = require( './api/col-get-item.js' );
var selGetItemAt = require( './api/sel-get-item.js' );

// **Each** iterator for collection & selection.
var colEach = require( './api/col-each.js' );
var selEach = require( './api/sel-each.js' );

// **Filter** for collection & selection.
var colFilter = require( './api/col-filter.js' );
var selFilter = require( './api/sel-filter.js' );

// **Token's out** for item, collection & selection.
var itmTokenOut = require( './api/itm-token-out.js' );
var colTokensOut = require( './api/col-tokens-out.js' );
var selTokensOut = require( './api/sel-tokens-out.js' );

// **Entity's out** for item, collection & selection.
var itmEntityOut = require( './api/itm-entity-out.js' );
var colEntitiesOut = require( './api/col-entities-out.js' );
var selEntitiesOut = require( './api/sel-entities-out.js' );

// **Sentence's out** for item, collection & selection.
var itmSentenceOut = require( './api/itm-sentence-out.js' );
var colSentencesOut = require( './api/col-sentences-out.js' );

// **Document's out** for item.
var itmDocumentOut = require( './api/itm-document-out.js' );

// Print tokens, it is primarily for command line output.
var printTokens = require( './api/print-tokens.js' );

// <hr/>

// # Doc
/**
 *
 * The wink-nlp **doc**ument – constructed in `wink-nlp.js` – publishes the
 * developer APIs.
 *
 * @param  {object} docData     It encapsulates the document data.
 * @param  {object} addons      The model's addon, may contain word vectors, stemmer etc.
 * @return {object}             conatining APIs.
 * @private
 */
var doc = function ( docData, addons ) {
  // Extract `cache` as it is frequently accessed.
  var cache = docData.cache;

  // Document's tokens; each token is represented as an array of numbers:
  // ```
  // [
  //   hash, // of tokenized lexeme
  //   (nox) + preceding spaces, // expansion's normal
  //   pos + lemma, // pos & lemma are contextual
  //   entity + sentence // 12bit + 20bits
  // ]
  // ```
  var tokens = docData.tokens;

  // Entities — sorted as array of `[ start, end, entity type ].`
  var entities = docData.entities;
  var customEntities = docData.customEntities;

  // Sentences — sorted as array of pairs of `[ start, end ]` pointing to the `tokens`.
  var sentences = docData.sentences;

  // Markings are 4-tuples of `start`, `end` **token indexes**,  and `begin & end markers`.
  // The begin & end markers are used to markup the tokens specified.
  var markings = docData.markings;


  // #### API core functions:

  // Collection APIs.
  var colEntities;
  var colCustomEntities;
  var colTokens;
  var colSentences;

  // Selection — obtained via `filter` — APIs. It is also like a collection.
  var colSelectedEntities;
  var colSelectedCustomEntities;
  var colSelectedTokens;

  // Item APIs.
  var itemToken;
  var itemEntity;
  var itemCustomEntity;
  var itemSentence;

  // Others.
  var isLexeme = cache.lookup;

  // The Document — Returned!
  var methods = Object.create( null );

  // ## Token
  // **Item, Collection, and Selection APIs.**

  // ### itemToken
  /**
   *
   * Makes item of the token specified at `index`.
   *
   * @param  {number} index The index of the token, which is required to be returned as item token.
   * @return {object}       containing applicable API methods.
   * @private
   */
  itemToken = function ( index ) {
    var api = Object.create( null );
    // Access the parent document.
    api.parentDocument = () => methods;
    // Access the parent entity, **if any.**
    api.parentEntity = () => getParentItem( index, entities, itemEntity );
    // Access the parent cuustom entity, **if any.**
    api.parentCustomEntity = () => getParentItem( index, customEntities, itemCustomEntity );
    // Markup this token.
    api.markup = ( beginMarker, endMarker ) => markings.push( [ index, index, beginMarker, endMarker ] );
    // Output this token or its properties using mapper function — `f`.
    api.out = ( f ) => itmTokenOut( index, docData, f, addons );
    // Access the parent sentence.
    api.parentSentence = () => getParentItem( index, sentences, itemSentence );
    // Index within the document.
    api.index = () => ( index );
    return api;
  }; // itemToken()

  // ### colSelectedTokens
  /**
   *
   * Makes collection of tokens identified by the `selectedTokens` array.
   *
   * @param  {array} selectedTokens The array of selected tokens, using which the
   *                                collection is made.
   * @return {object}               containing applicable API methods.
   * @private
   */
  colSelectedTokens = function ( selectedTokens ) {
    var api = Object.create( null );
    // Iterator.
    api.each = ( f ) => selEach( f, selectedTokens, itemToken );
    // Filter.
    api.filter = ( f ) => selFilter( f, selectedTokens, itemToken, colSelectedTokens );
    // Item at `k`th index. If `k` is outside valid range, return `undefined` like JS.
    api.itemAt = ( k ) => selGetItemAt( k, selectedTokens, itemToken );
    // Number of selected tokens.
    api.length = () => ( selectedTokens.length );
    // Output this collection of selected tokens as a reduced values or properties
    // using map/reduce functions — `f/g`.
    api.out = ( f, g ) => selTokensOut( selectedTokens, docData, f, g, addons );
    return api;
  }; // colTokens()

  // ### colTokens
  /**
   *
   * Makes collection of tokens beginning from `start` index to `end` index.
   *
   * @param  {number} start The start index.
   * @param  {number} end   The end index.
   * @return {object}       containing applicable API methods.
   * @private
   */
  colTokens = function ( start, end ) {
    return (
      function () {
        var api = Object.create( null );
        // Iterator.
        api.each = ( f ) => colEach( f, start, end, itemToken );
        // Filter.
        api.filter = ( f ) => colFilter( f, start, end, itemToken, colSelectedTokens );
        // Item at `k`th index. If `k` is outside valid range, return `undefined` like JS.
        // No need to handle relative indexing as `colGetItemAt` handles it.
        api.itemAt = ( k ) => colGetItemAt( k, start, end, itemToken );
        // Length of this collection.
        api.length = () => ( end - start + 1 );
        // Output this token collection as a reduced values or properties using
        // map/reduce functions — `f/g`.
        api.out = ( f, g ) => colTokensOut( start, end, docData, f, g, addons );

        return api;
      }
    );
  }; // colTokens()

  // <hr/>

  // ## Entity
  // **Item, Collection, and Selection APIs.**

  // ### itemEntity
  /**
   *
   * Makes item of the entity specified at `index`.
   *
   * @param  {number} index The index of the entity, which is required to be
   *                        returned as item entity.
   * @return {object}       containing applicable API methods.
   * @private
   */
  itemEntity = function ( index ) {
    var api = Object.create( null );
    // Access the parent document.
    api.parentDocument = () => methods;
    // Markup this entity.
    api.markup = ( beginMarker, endMarker ) => markings.push( [ entities[ index ][ 0 ], entities[ index ][ 1 ], beginMarker, endMarker ] );
    // Output this entity or its properties using mapper function — `f`.
    api.out = ( f ) => itmEntityOut( index, entities, docData, f );
    // Access the parent sentence.
    api.parentSentence =  () => getParentItem( entities[ index ][ 0 ], sentences, itemSentence );
    // Retun collection of tokens contained in this entity.
    api.tokens = colTokens( entities[ index ][ 0 ], entities[ index ][ 1 ] );
    // Index within the document.
    api.index = () => ( index );
    return api;
  }; // itemEntity()

  // ### colSelectedEntities
  /**
   *
   * Makes collection of entities identified by the `selectedEntities` array.
   *
   * @param  {array} selectedEntities The array of selected entities, using which
   *                                  the collection is made.
   * @return {object}                 containing applicable API methods.
   * @private
   */
  colSelectedEntities = function ( selectedEntities ) {
    var api = Object.create( null );
    // Iterator.
    api.each = ( f ) => selEach( f, selectedEntities, itemEntity );
    // Filter.
    api.filter = ( f ) => selFilter( f, selectedEntities, itemEntity, colSelectedEntities );
    // Item at `k`th index. If `k` is outside valid range, return `undefined` like JS.
    api.itemAt = ( k ) => selGetItemAt( k, selectedEntities, itemEntity );
    // Number of selected entities.
    api.length = () => ( selectedEntities.length );
    // Output this collectionn of selected of entities as a reduced value
    // using map/reduce functions — `f/g`.
    api.out = ( f, g ) => selEntitiesOut( selectedEntities, entities, docData, f, g );
    return api;
  }; // colSelectedEntities()

  // ### colEntities
  /**
   *
   * Makes collection of all the entities.
   *
   * @return {object} containing applicable API methods.
   * @private
   */
  colEntities = function () {
    var api = Object.create( null );
    // Iterator.
    api.each = ( f ) => colEach( f, 0, entities.length - 1, itemEntity );
    // Filter.
    api.filter = ( f ) => colFilter( f, 0, entities.length - 1, itemEntity, colSelectedEntities );
    // Item at `k`th index. If `k` is outside valid range, return `undefined` like JS.
    api.itemAt = ( k ) => colGetItemAt( k, 0, ( entities.length - 1 ), itemEntity );
    // Length of this collection.
    api.length = () => ( entities.length );
    // Output this collection of entities as a reduced value
    // using map/reduce functions — `f/g`.
    api.out = ( f, g ) => colEntitiesOut( entities, docData, f, g );
    return api;
  }; // colEntities()

  // <hr/>

  // ## Entity
  // **Item, Collection, and Selection APIs.**

  // ### itemCustomEntity
  /**
   *
   * Makes item of the entity specified at `index`.
   *
   * @param  {number} index The index of the entity, which is required to be
   *                        returned as item entity.
   * @return {object}       containing applicable API methods.
   * @private
   */
  itemCustomEntity = function ( index ) {
    var api = Object.create( null );
    // Access the parent document.
    api.parentDocument = () => methods;
    // Markup this entity.
    api.markup = ( beginMarker, endMarker ) => markings.push( [ customEntities[ index ][ 0 ], customEntities[ index ][ 1 ], beginMarker, endMarker ] );
    // Output this entity or its properties using mapper function — `f`.
    api.out = ( f ) => itmEntityOut( index, customEntities, docData, f );
    // Access the parent sentence.
    api.parentSentence =  () => getParentItem( customEntities[ index ][ 0 ], sentences, itemSentence );
    // Retun collection of tokens contained in this entity.
    api.tokens = colTokens( customEntities[ index ][ 0 ], customEntities[ index ][ 1 ] );
    // Index within the document.
    api.index = () => ( index );
    return api;
  }; // itemCustomEntity()

  // ### colSelectedCustomEntities
  /**
   *
   * Makes collection of entities identified by the `selectedEntities` array.
   *
   * @param  {array} selectedCustomEntities The array of selected entities, using which
   *                                        the collection is made.
   * @return {object}                       containing applicable API methods.
   * @private
   */
  colSelectedCustomEntities = function ( selectedCustomEntities ) {
    var api = Object.create( null );
    // Iterator.
    api.each = ( f ) => selEach( f, selectedCustomEntities, itemCustomEntity );
    // Filter.
    api.filter = ( f ) => selFilter( f, selectedCustomEntities, itemCustomEntity, colSelectedCustomEntities );
    // Item at `k`th index. If `k` is outside valid range, return `undefined` like JS.
    api.itemAt = ( k ) => selGetItemAt( k, selectedCustomEntities, itemCustomEntity );
    // Number of selected entities.
    api.length = () => ( selectedCustomEntities.length );
    // Output this collectionn of selected of entities as a reduced value
    // using map/reduce functions — `f/g`.
    api.out = ( f, g ) => selEntitiesOut( selectedCustomEntities, customEntities, docData, f, g );
    return api;
  }; // colSelectedCustomEntities()

  // ### colCustomEntities
  /**
   *
   * Makes collection of all the entities.
   *
   * @return {object} containing applicable API methods.
   * @private
   */
  colCustomEntities = function () {
    var api = Object.create( null );
    // Iterator.
    api.each = ( f ) => colEach( f, 0, customEntities.length - 1, itemCustomEntity );
    // Filter.
    api.filter = ( f ) => colFilter( f, 0, customEntities.length - 1, itemCustomEntity, colSelectedCustomEntities );
    // Item at `k`th index. If `k` is outside valid range, return `undefined` like JS.
    api.itemAt = ( k ) => colGetItemAt( k, 0, ( customEntities.length - 1 ), itemCustomEntity );
    // Length of this collection.
    api.length = () => ( customEntities.length );
    // Output this collection of entities as a reduced value
    // using map/reduce functions — `f/g`.
    api.out = ( f, g ) => colEntitiesOut( customEntities, docData, f, g );
    return api;
  }; // colCustomEntities()

  // <hr/>

  // ## Sentence
  // **Item, Collection, and Selection APIs.**

  // ### itemSentence
  /**
   *
   * Makes item of the sentence specified by `index` of the sentence.
   *
   * @param  {number} index The index of the sentence.
   * @return {object}       containing applicable API methods.
   * @private
   */
  itemSentence = function ( index ) {
    var api = Object.create( null );
    // Access the parent document.
    api.parentDocument = () => methods;
    // Markup this sentence.
    api.markup = ( beginMarker, endMarker ) => markings.push( [ sentences[ index ][ 0 ], sentences[ index ][ 1 ], beginMarker, endMarker ] );
    // Output this sentence as text.
    api.out = ( f ) => itmSentenceOut( index, docData, f, addons );
    // Outputs the collection of entities, if any, contained in this sentence.
    api.entities = () => colSelectedEntities( containedEntities( entities, sentences[ index ][ 0 ], sentences[ index ][ 1 ] ) );
    // Outputs the collection of custom entities, if any, contained in this sentence.
    api.customEntities = () => colSelectedCustomEntities( containedEntities( customEntities, sentences[ index ][ 0 ], sentences[ index ][ 1 ] ) );
    // Outputs the collection of tokens in this sentence.
    api.tokens = colTokens( sentences[ index ][ 0 ], sentences[ index ][ 1 ] );
    // Index within the document.
    api.index = () => ( index );
    return api;
  }; // itemSentence()

  // ### colSentences
  /**
   *
   * Makes collection of sentences in this document.
   *
   * @return {object} containing applicable API methods.
   * @private
   */
  colSentences = function () {
    var api = Object.create( null );
    // Iterator.
    api.each = ( f ) => colEach( f, 0, sentences.length - 1, itemSentence );
    // Item at `k`th index. If `k` is outside valid range, return `undefined` like JS.
    api.itemAt = ( k ) => colGetItemAt( k, 0, ( sentences.length - 1 ), itemSentence );
    // Length of this collection.
    api.length = () => ( sentences.length );
    // Output this collection of sentences as an array of strings.
    api.out = ( f ) => colSentencesOut( docData, f, addons );
    return api;
  }; // colSentences()

  // <hr/>


  // Published chainable methods.
  methods.entities = colEntities;
  methods.customEntities = colCustomEntities;
  methods.isLexeme = isLexeme;
  methods.isOOV = cache.isOOV;
  methods.out = ( f ) => itmDocumentOut( docData, f, addons );
  methods.sentences = colSentences;
  methods.tokens = colTokens( 0, docData.numOfTokens - 1 );

  methods.printTokens = () => printTokens( tokens, cache );

  // Enusre that we make a deep copy of config before returning to avoid corruption!
  methods.pipeConfig = () => JSON.parse( JSON.stringify( docData.currPipe ) );

  return methods;
};

module.exports = doc;

},{"./api/col-each.js":2,"./api/col-entities-out.js":3,"./api/col-filter.js":4,"./api/col-get-item.js":5,"./api/col-sentences-out.js":6,"./api/col-tokens-out.js":7,"./api/get-parent-item.js":8,"./api/itm-document-out.js":9,"./api/itm-entity-out.js":10,"./api/itm-sentence-out.js":11,"./api/itm-token-out.js":12,"./api/print-tokens.js":13,"./api/sel-each.js":14,"./api/sel-entities-out.js":15,"./api/sel-filter.js":16,"./api/sel-get-item.js":17,"./api/sel-tokens-out.js":18,"./contained-entities.js":25}],29:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var DocDataWrapper = require( './dd-wrapper.js' );
var Automata = require( './automaton.js' );
var mappers = require( './tokens-mappers.js' );
var mapRawTokens2UIdOfValue = mappers.mapRawTokens2UIdOfValue;
var mapRawTokens2UIdOfNormal = mappers.mapRawTokens2UIdOfNormal;

var cerAutomata = Automata(); // eslint-disable-line new-cap

var rgxOr = /^\[((?:[^| ]+\|)+?|(?:\|[^| ]+)+?|(?:[^| ]+\|[^| ]+)+?|(?:[^| ]+))\]$/;
var rgxPipe = /\|/g;

// ## mergeSplitsAndMatches
/**
 * Helper function to merge the two input array elements by picking elements
 * alternatively from each array.
 * @param  {string[]} splts obtained by splitting on pipe.
 * @param  {string[]} mtchs obtained by matching on pipe.
 * @return {string[]}       the merged array.
 * @private
 */
var mergeSplitsAndMatches = function ( splts, mtchs ) {
  const [ s0, ...splits ] = splts;
  return ( ( s0 === undefined ) ? mtchs : [ s0, ...mergeSplitsAndMatches( mtchs, splits ) ] );
}; // mergeSplitsAndMatches()

// # compiler
/**
 * It transforms the input patterns for custom entity recognition into a model,
 * which is run by winkNLP's `readDoc()` method. The model is created by
 * the `learnCustomEntities()` method of core winkNLP using this compiler. Brefore
 * the compiler can be **run**, its instance must be created using the following
 * parameters:
 *
 * @param  {JSON}     cerModel    precompiled custom entity meta model — handles escaping
 *                                of entity literals. For example `^ADJ` will match
 *                                with token `ADJ` (or `adj` based on `matchValue` in
 *                                `cerConfig`), whereas `ADJ` will match with the
 *                                adjective part-of-speech of a token.
 * @param  {object}   cache       of lexicon, which is required to deliver performance.
 * @param  {function} tokenize    is instantiated from core tokenizer, which tokenises the
 *                                input patterns. It is used in the `tokenizeText()` private
 *                                method of compiler.
 * @param  {boolean}  matchValue  match value flag — defines match on either `value` or
 *                                `normal` of tokens.<br/>
 * @return {object}               contains **run** function, which can compile the input
 *                                pattern into a model.
 * @private
 */
var compiler = function ( cerModel, cache, tokenize, matchValue ) {
  // Returned!
  var methods = Object.create( null );
  // Map of literals to be preserved.
  var preserve;

  cerAutomata.importJSON( cerModel );
  // On pattern detection, we need to save the custom property — `preserve`
  // created by the `cerModel's` execution.
  cerAutomata.setOnPatternDetectionFn( ( match, customProperty ) => ( match.push( customProperty ) ) );

  // ## hasOrPattern
  /**
   * Test the presence of or-pattern in the tokens and returns the index of the
   * same.
   * @param  {string[]} tokens of each word, split on spaces.
   * @return {number}          the index where token is found otherwise -1.
   * @private
   */
  var hasOrPattern = function ( tokens ) {
    // Use findIndex with regex to locate.
    return ( tokens.findIndex( ( e ) => rgxOr.test( e ) ) !== -1 );
  }; // hasOrPattern()

  // ## encloseInSquareBracket
  /**
   * Heper function to enclose incoming text element within square brackets.
   * @param  {string} e input text element.
   * @return {string}   enclosed text element.
   * @private
   */
  var encloseInSquareBracket = function ( e ) {
    // Enclose!
    return '[' + e +  ']';
  }; // encloseInSquareBracket()

  // ## tokenizeText
  /**
   * Tokenizes the incoming text using wink-nlp's tokenizer.
   * @param  {string} text   input text string.
   * @return {object[]}      where each object contains normal & value of the token.
   * @private
   */
  var tokenizeText = function ( text ) {
    // Mimic wink-nlp like manoeuvre!
    var rdd = Object.create( null );
    rdd.cache = cache;
    rdd.tokens = [];
    var wrappedDocData = DocDataWrapper( rdd );  // eslint-disable-line new-cap

    tokenize( wrappedDocData, text ); // eslint-disable-line new-cap
    const tokens = [];
    const values = mapRawTokens2UIdOfValue( rdd ).map( ( t ) => cache.value( t ) );
    const normals = mapRawTokens2UIdOfNormal( rdd ).map( ( t ) => cache.value( t ) );
    for ( let i = 0; i < values.length; i += 1 ) tokens.push( { value: values[ i ], normal: normals[ i ] } );
    return tokens;
  }; // tokenizeText()

  // ## compileSimplePattern
  /**
   * Compiles a simple pattern.
   *
   * @param  {string} text    input simple pattern string.
   * @return {string[]}       of compiled pattern.
   * @private
   */
  var compileSimplePattern = function ( text ) {
    // Compiled pattern build here.
    const cp = [];
    // Tokenized `text`.
    const tokens = tokenizeText( text );
    // Spans of recognized patterns from tokens' value because patterns are always
    // in UPPER case.
    const spans = cerAutomata.recognize( tokens.map( ( t ) => t.value ) );
    // The spans are mapped into `replacements` and are indexed by `spans[ i ][ 0 ]`.
    // `e[ 0 ]` & e[ 1 ] are start & end indexes, `e[ 2 ]` is entity name, and
    // `e[ 3 ]` is customProperty, where true mean preserve replacement.
    const replacements = Object.create( null );
    spans.forEach( ( e ) => ( replacements[ e[ 0 ] ] = [ e[ 1 ], e[ 2 ], e[ 3 ] ] ) );
    // Perform replacements.
    for ( let i = 0; i < tokens.length; i += 1 ) {
      // Replacement defined for this index — `i`? **Yes** means it could be a property
      // or esacped property or a lone escape character or an esacped escape character. **No**
      // means a literal.
      if ( replacements[ i ] ) {
        // **Empty** entity name indicates a lone escape character.
        if ( replacements[ i ][ 1 ] !==  '' ) {
          // Preserve? **Yes** means it is an escaped property or escape char;
          // **No** means property.
          if ( replacements[ i ][ 2 ].preserve ) {
            // Since it has to be preserved, `matchValue` drives both the `cp` &
            // `preserve` contents i.e. **normal** or **value**

            // This contains escaped `<property>`.
            const tri0 = ( matchValue ) ? tokens[ replacements[ i ][ 0 ] ].value : tokens[ replacements[ i ][ 0 ] ].normal;
            // This conntains `<property>&`.
            const ri1 = ( matchValue ) ? replacements[ i ][ 1 ] : replacements[ i ][ 1 ].toLowerCase();
            // Map escaped `<property>` to `<property>&`.
            preserve[ tri0 ] = ri1;
            cp.push( ri1 );
          } else {
            // It is a **property**, therefore it has to go to the state machine
            // **as-is**.
            cp.push( replacements[ i ][ 1 ] );
          }
        }
        // Skip by moving `i` to the end index.
        i = replacements[ i ][ 0 ];
      } else {
        // **Literal**: Extract token's normal or value based on `matchValue` flag.
        const ti = ( matchValue ) ? tokens[ i ].value : tokens[ i ].normal;
        cp.push( ti );
        preserve[ ti ] = ti;
      }
    }
    // Return compiled pattern.
    return cp;
  }; // compileSimplePattern()

  // ## compileOrPattern
  /**
   * Compiles the tokens containing "or" patterns.
   * @param  {string[]} tokens  contains the incoming tokens.
   * @return {string}           compiled text string.
   * @private
   */
  var compileOrPattern = function ( tokens ) {
    const pattern = [];
    for ( let i = 0; i < tokens.length; i += 1 ) {
      if ( rgxOr.test( tokens[ i ] ) ) {
        // Strip the opening/closing square brackets.
        const ti = tokens[ i ].substring( 1, tokens[ i ].length - 1 );
        // Find matches with `rgxPipe`; if they are null set to an empty array.
        const matches = ti.match( rgxPipe ) || [];
        // Find splits on `rgxPipe`.
        const splits = ti.split( rgxPipe );
        // Iterate through `splits` to check that each element cannot be tokenized
        // further.
        for ( let j = 0; j < splits.length; j += 1 ) {
          const st = ( splits[ j ] === '' ) ? [ '' ] : compileSimplePattern( splits[ j ] );
          if ( st.length > 1 ) {
           throw Error( `wink-nlp: incorrect token "${st.join( '' )}" encountered in examples of learnCustomEntities() API.` );
          }
          splits[ j ] = st[ 0 ];
        } // splits iterations
        // Merge matches & splits to create the pattern.
        pattern.push( encloseInSquareBracket( mergeSplitsAndMatches( splits, matches ).join( '' ) ) );
      } else {
        // Simple part of text, just enclose it in square brackets after replacement (if any).
        compileSimplePattern( tokens[ i ] ).forEach( ( t ) => pattern.push( encloseInSquareBracket( t ) ) );
      }
    }
    return pattern.join( ' ' );
  }; // compileOrPattern()

  // ## compileSinglePattern
  /**
   * Compiles a single pattern text. It invokes compilation of "or" or "simple"
   * pattern based on input text type.
   *
   * @param  {string} text      input pattern text.
   * @return {(array|string)}   depending onn type of pattern.
   * @private
   */
  var compileSinglePattern = function ( text ) {
    // Split on spaces.
    const atoms = text.trim().split( /\s+/ );
    // Invoke required compilation based on the type of `atoms` i.e. the text.
    if ( hasOrPattern( atoms ) ) {
      return compileOrPattern( atoms );
    }
    return compileSimplePattern( text );
  }; // compileSinglePattern()

  // ## run
  /**
   * Runs the compiler to compile the examples. It calls `compileSinglePattern()`
   * on each example iteratively.
   *
   * @param  {object[]} examples containing objects, where each object defines an
   *                             entity in terms of name and pattern.
   * @return {object}            compiled examples ready for automata and literals
   *                             preserve.
   * @private
   */
  var run = function ( examples ) {
    // Compiled examples are captured here.
    const ces = [];
    // Intialize preserve every time a new compilation happens.
    preserve = Object.create( null );
    for ( let i = 0; i < examples.length; i += 1 ) {
      const example = examples[ i ];
      const patterns = example.patterns;
      for ( let j = 0; j < patterns.length; j += 1 ) {
        const cp = compileSinglePattern( patterns[ j ] );
        const ce = Object.create( null );
        ce.name = example.name;
        ce.pattern = cp;
        if ( example.mark ) ce.mark = example.mark;
        ces.push( ce );
      }
    }

    return { examples: ces, preserve: preserve };
  }; // run()

  methods.run = run;

  return methods;
}; // compiler()

module.exports = compiler;

},{"./automaton.js":20,"./dd-wrapper.js":27,"./tokens-mappers.js":39}],30:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var helper = Object.create( null );

/**
 * Tests if argument `v` is a JS object.
 *
 * @param {*} v       is tested for a valid JS object.
 * @returns {boolean} ture if `v` is a valid JS object, otherwise false.
 */
helper.isObject = function ( v ) {
  return ( Object.prototype.toString.call( v ) === '[object Object]' );
}; // isObject()

/**
 * Tests if argument `v` is a JS array.
 *
 * @param {*} v       is tested for a valid JS array.
 * @returns {boolean} ture if `v` is a valid JS array, otherwise false.
 */
helper.isArray = function ( v ) {
  return ( Object.prototype.toString.call( v ) === '[object Array]' );
}; // isArray()

/**
 * Tests if argument `n` is a finite integer.
 *
 * @param {*} n       is tested for a finite integer.
 * @returns {boolean} ture if `n` is a finite integer, otherwise false.
 */
helper.isFiniteInteger = function ( n ) {
  return (
    ( typeof n === 'number' ) &&
    !isNaN( n ) &&
    isFinite( n ) &&
    ( n === Math.round( n ) )
  );
}; // isFiniteInteger()

/**
 * Tests if argument `a` contains one or more finite integers.
 *
 * @param {*} a       is tested for an array of finite integers.
 * @returns {boolean} ture if `n` is an array of finite integers, otherwise false.
 */
helper.isIntegerArray = function ( a ) {
  // If it is not an array, return `false`.
  if ( !helper.isArray( a ) ) return false;

  // Has no element i.e. no finite integer — return `false`.
  if ( a.length === 0 ) return false;

  // Test every element for a finite integer.
  for ( let i = 0; i < a.length; i += 1 ) {
    // Any failure means immediately return `false`.
    if ( !helper.isFiniteInteger( a[ i ] ) ) return false;
  }

  // It is an array and contains all finite integers, return `true`.
  return true;
}; // isIntegerArray()

module.exports = helper;

},{}],31:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## identifyMarkedArea
/**
 *
 * Identifies the area to be marked within the detected entitity's span, which is
 * extracted as the value.
 *
 * @param {number[]} mark contains the target area to be extracted from within
 *                        the entitity's span, defined as `[ firstIndex, lastIndex ]`.
 * @param {number} length of the entity's span.
 * @return {number[]}     array containing the modifiers for the orginal span.
 * @private
*/
const identifyMarkedArea = function ( mark, length ) {
  // Length Minus 1.
  const lm1 = length - 1;
  let [ firstIndex, lastIndex ] = mark;

  if ( firstIndex < 0 ) firstIndex += length;
  firstIndex = Math.max( firstIndex, 0 );
  if ( firstIndex > lm1 ) firstIndex = 0;

  if ( lastIndex < 0 ) lastIndex += length;
  lastIndex = Math.min( lastIndex, lm1 );
  if ( lastIndex < firstIndex ) lastIndex = lm1;

  // The `lastIndex` manoeuvre is required to keep identical approach
  // being followed in `learnSinglePattern()` of automaton.js, where
  // the `firstIndex` **was** being added and the `lastIndex` **was** being
  // subtracted from the span of entity.
  lastIndex = length - lastIndex - 1;
  return [ firstIndex, lastIndex ];
}; // identifyMarkedArea()

module.exports = identifyMarkedArea;

},{}],32:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var sort4FT = require( './sort4FT.js' );
var constants = require( './constants.js' );
var caseMap = [ 'other', 'lowerCase', 'upperCase', 'titleCase' ];
var swi = require( './sentence-wise-importance.js' );

// Size of a single token.
var tkSize = constants.tkSize;
// Bits reserved for `lemma`.
var bits4lemma = constants.bits4lemma;
// Mask for extracting pos
var posMask = constants.posMask;
// Mask for preceding spaces.
var psMask = constants.psMask;
// Mask for lemma in case of contraction.
var lemmaMask = constants.lemmaMask;

var its = Object.create( null );

its.case = function ( index, tokens, cache ) {
  return caseMap[ cache.property( tokens[ index * tkSize ], 'lutCase' ) ];
}; // case()

its.uniqueId = function ( index, tokens ) {
  return tokens[ index * tkSize ];
}; // uniqueId()

its.negationFlag = function ( index, tokens ) {
  return tokens[ ( index * tkSize ) + 3 ] >= constants.negationFlag;
}; // negationFlag()

its.normal = function ( index, tokens, cache ) {
  return (
    ( tokens[ ( index * tkSize ) + 1 ] > 65535 ) ?
      cache.value( cache.nox( tokens[ ( index * tkSize ) + 1 ] ) ) :
      cache.value( cache.normal( tokens[ index * tkSize ] ) )
  );
}; // normal()

its.contractionFlag = function ( index, tokens ) {
  return ( tokens[ ( index * tkSize ) + 1 ] > 65535 );
}; // contractionFlag()

its.pos = function ( index, tokens, cache ) {
  return cache.valueOf( 'pos', ( tokens[ ( index * tkSize ) + 2 ] & posMask ) >>> bits4lemma );  // eslint-disable-line no-bitwise
}; // pos()

its.precedingSpaces = function ( index, tokens ) {
  var token = tokens[ ( index * tkSize ) + 1 ];
  var count = token & psMask;  // eslint-disable-line no-bitwise
  return ( ''.padEnd( count ) );
}; // precedingSpaces()

its.prefix = function ( index, tokens, cache ) {
  return cache.property( tokens[ index * tkSize ], 'prefix' );
}; // prefix()

its.shape = function ( index, tokens, cache ) {
  return cache.property( tokens[ index * tkSize ], 'shape' );
}; // shape()

its.stopWordFlag = function ( index, tokens, cache ) {
  // Apply check on normalized token and not the original value, because
  // stop words are always defined in the lowercase.
  var normal = ( tokens[ ( index * tkSize ) + 1 ] > 65535 ) ?
    cache.nox( tokens[ ( index * tkSize ) + 1 ] ) :
    cache.normal( tokens[ index * tkSize ] );
  return ( cache.property( normal, 'isStopWord' ) === 1 );
}; // stopWordFlag()

its.abbrevFlag = function ( index, tokens, cache ) {
  return ( cache.property( tokens[ index * tkSize ], 'isAbbrev' ) === 1 );
}; // abbrevFlag()

its.suffix = function ( index, tokens, cache ) {
  return cache.property( tokens[ index * tkSize ], 'suffix' );
}; // suffix()

its.type = function ( index, tokens, cache ) {
  return cache.property( tokens[ index * tkSize ], 'tokenType' );
}; // type()

its.value = function ( index, tokens, cache ) {
  return cache.value( tokens[ index * tkSize ] );
}; // value()

its.stem = function ( index, tokens, cache, addons ) {
  return addons.stem( cache.value( tokens[ index * tkSize ] ) );
}; // stem()

its.lemma = function ( index, tokens, cache, addons ) {
  // If it is a contraction that lemma is already available in the token's data structure.
  if ( tokens[ ( index * tkSize ) + 1 ] > 65535 ) {
    return cache.value( tokens[ ( index * tkSize ) + 2 ] & lemmaMask ); // eslint-disable-line no-bitwise
  }
  // Handle mapped spelling if any.
  const mappedIdx = cache.mappedSpelling( tokens[ index * tkSize ] );
  // If the token has single lemma then no further processing is needed.
  if ( cache.property( mappedIdx, 'isSLemma' ) === 1 ) {
    return cache.value( cache.property( mappedIdx, 'lemma' ) );
  }
  // Exhausted all possibilities to avoid processing! Now lemmatize!
  const pos = its.pos( index, tokens, cache );
  const value = cache.value( cache.normal( tokens[ index * tkSize ] ) );
  return addons.lemmatize( value, pos, cache );
}; // lemmas()

its.vector = function ( ) {
  return ( new Array( 100 ).fill( 0 ) );
}; // vector()

its.detail = function ( ) {
  return true;
}; // detail()

its.markedUpText = function ( index, tokens, cache ) {
  // This is a special case because `tokens.out()` allows `as.markedUpText`.
  // Therefore simply return the value and rest is handled by `colTokensOut` with
  // `as.markedUpText()`` or `as.text()` as one of the arugments.
  return its.value( index, tokens, cache );
}; // markedUpText()

its.span = function ( spanItem ) {
  return spanItem.slice( 0, 2 );
}; // span()

its.sentiment = function ( spanItem ) {
  return spanItem[ 3 ];
}; // span()

its.readabilityStats = function ( rdd, addons ) {
  return addons.readabilityStats( rdd, its );
}; // readabilityStats()

its.sentenceWiseImportance = function ( rdd ) {
  return swi( rdd );
}; // sentenceWiseImportance()

/* ------ utilities ------ */

its.terms = function ( tf, idf, terms ) {
  return terms;
}; // terms()

its.docTermMatrix = function ( tf, idf, terms ) {
  const dtm = new Array( tf.length );
  for ( let id = 0; id < tf.length; id += 1 ) {
    dtm[ id ] = [];
    for ( let i = 0; i < terms.length; i += 1 ) {
      dtm[ id ].push( tf[ id ][ terms[ i ] ] || 0 );
    }
  }
  return dtm;
}; // getDocTermMatrix()

its.docBOWArray = function ( tf ) {
  return tf;
}; // docBOWArray()

its.bow = function ( tf ) {
  return tf;
}; // bow()

its.idf = function ( tf, idf ) {
  var arr = [];
  for ( const t in idf ) { // eslint-disable-line guard-for-in
    arr.push( [ t, idf[ t ] ] );
  }
  // Sort on frequency followed by the term.
  return arr.sort( sort4FT );
}; // idf()

its.tf = function ( tf ) {
  const arr = [];
  for ( const t in tf ) {  // eslint-disable-line guard-for-in
    arr.push( [ t, tf[ t ] ] );
  }
  // Sort on frequency followed by the term.
  return arr.sort( sort4FT );
}; // tf()

its.modelJSON = function ( tf, idf, terms, docId, sumOfAllDLs ) {
  return JSON.stringify( {
      uid: 'WinkNLP-BM25Vectorizer-Model/1.0.0',
      tf: tf,
      idf: idf,
      terms: terms,
      docId: docId,
      sumOfAllDLs: sumOfAllDLs
   } );
}; // model()

module.exports = its;

},{"./constants.js":24,"./sentence-wise-importance.js":36,"./sort4FT.js":37}],33:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## locate
/**
 *
 * Locates the `token`'s index in the `spans` and returns the index of the
 * span, where it is found; or the edge — a fraction between the 2-candidate
 * span-elements. Locate dictionary meaning: **discover the exact place or
 * position of.**
 *
 * @param {number} token to be located.
 * @param {array[]} spans where token will be searched.
 * @return {number} index of span where token is found; if it is not found then
 * it returns the edge — a fraction between the 2-candidate span-elements.
 * @private
*/
var locate = function ( token, spans ) {
  var minIndex = 0;
  var maxIndex = spans.length - 1;
  var currIndex;
  var leftToken;
  var rightToken;
  // Edge, if `token` is not found; they are converted to fractions using `sf`.
  var edge = -1;
  // `0.5` is a safe fraction as it is `2 ** -1`
  var sf = 0.5;
  while ( minIndex <= maxIndex ) {
    currIndex = ( minIndex + maxIndex ) / 2 | 0; // eslint-disable-line no-bitwise
    leftToken = spans[ currIndex ][ 0 ];
    rightToken = spans[ currIndex ][ 1 ];

    if ( token > rightToken ) {
      minIndex = currIndex + 1;
      edge = currIndex + sf;
    } else if ( token < leftToken ) {
      maxIndex = currIndex - 1;
      edge = currIndex - sf;
    } else return currIndex;
  }
  // Not found — return the edge!
  return edge;
}; // locate()

module.exports = locate;

},{}],34:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

/* eslint-disable no-underscore-dangle */

// Used in accessing the regex and its category from `rgxs`.
const RGX = 0;
const CAT = 1;
// SPECIAL REGULAR EXPRESSIONS:
// Regex to handle short forms or abbreviations.
var rgxShortFormDot = /^(?:(?:[A-Z])(?:\.))+$/i;
var rgxShortForm = /^(?:(?:[A-Z])(?:\.))+[a-z]?$/i;
// Regex process hyphenated words.
var rgxHyphens = /[\-\–\—]/gi;
var rgxPeriod = /[\.]/gi;
var rgxNumber = /[0-9]/;

// ### tokenizer
/**
 *
 * Creates an instance of `tokenizer`.
 *
 * @param {object} categories token categories, as obtained via the language model.
 * @param {object} preserve rules for hyphenation preservation.
 * @return {function} for recursive tokenization.
 * @private
*/
var tokenizer = function ( categories, preserve ) {
  // Function to add tokens to the `doc()`.
  var addToken;
  var addTokenIfInCache;
  // Function to test if lexeme exists via `doc()`.
  var isLexeme;
  // Preceding Spaces — special need for recursive tokenizer.
  var ps = 0;

  // ### pushHyphenatedToken
  /**
   *
   * Pushes the incoming `tkn` after handling hyphens, if any:
   * 1. Use it as-is if it is a valid lexeme or contains a number.
   * 2. Use it as-is if does not contain hyphens.
   * 3. Otherwise apply rules.
   *
   * @param {string} tkn to be processed as per rules hyphenation rules in `preserve`.
   * @param {array} tokens into which the (split) `tkn` is pushed.
   * @returns {void} nothing!
   * @private
  */
  var pushHyphenatedToken = function ( tkn, tokens ) {
    // Will contain pure alpha words, obtained by splitting on `rgxHyphens`.
    var words;
    // Will contain mathed hyphens.
    var hyphens;
    // Helper variables.
    var i, k, last;

    // If a token is a valid lexeme or contains one or more number, dont touch it.
    if ( isLexeme( tkn) || rgxNumber.test( tkn ) ) {
      tokens.push( [ tkn, categories.word ] );
      return;
    }

    hyphens = tkn.match( rgxHyphens );
    // If there are no hyphens in the word, dont touch it.
    if ( hyphens === null ) {
      tokens.push( [ tkn, categories.word ] );
      return;
    }

    // Word is hyphenated, process it according to the rules specified in `preserve`.
    words = tkn.split( rgxHyphens );
    last = words.length - 1;
    if ( preserve.prefix[ words[ 0 ] ] || preserve.suffix[ words[ last ] ] ) {
      tokens.push( [ tkn, categories.word ] );
      return;
    }
    k = 0;
    for ( i = 0; i < words.length; i += 1 ) {
      // Do not push any empty token!
      if ( words[ i ] !== '' ) {
        tokens.push( [ words[ i ], categories.word ] );
      }

      if ( k < hyphens.length ) {
        tokens.push( [ hyphens[ k ], categories.punctuation ] );
      }
      k += 1;
    }
  }; // pushHyphenatedToken()

  // ### pushWordToken
  /**
   *
   * Pushes the incoming `tkn` after handling periods and hyphens present:
   * 1. Use it as-is if it is a valid lexeme or a short form ending with a period.
   * 2. Split on period and the successively assemble tokens using matches & splits.
   * 3. Finally send each such assembled token down for handling hyphenated word.
   *
   * @param {string} tkn to be processed and pushed.
   * @param {array} tokens into which the (split) `tkn` is pushed.
   * @returns {void} nothing!
   * @private
  */
  var pushWordToken = function ( tkn, tokens ) {
    // Will contain words, obtained by splitting on `rgxPeriod`.
    var words;
    // Will contain matched periods.
    var periods;
    // Helper variables:<br/>
    // Index variables
    var i, k;
    // Used in successively assembling a potential token from matches & words
    // (i.e. splits), if word has periods.
    var currBuild = '';
    var nextBuild = '';


    // If a token is a **valid lexeme**, or it is **short form ending with a
    // period** (e.g. dot) then _dont touch it._
    if ( isLexeme( tkn ) || rgxShortFormDot.test( tkn ) ) {
      tokens.push( [ tkn, categories.word ] );
      return;
    }

    // Start by matching with periods
    periods = tkn.match( rgxPeriod );
    // If there are no periods in the word, dont touch it.
    if ( periods === null ) {
      pushHyphenatedToken( tkn, tokens );
      return;
    }

    // Word has periods, therefore process it:
    words = tkn.split( rgxPeriod );
    k = 0;

    for ( i = 0; i < words.length; i += 1 ) {
      // Build next potential token by joining the current build with the next word.
      nextBuild = currBuild + words[ i ];
      // If it is a valid possibility, then continue building it.
      if ( rgxShortForm.test( nextBuild ) || ( isLexeme( nextBuild ) && nextBuild.length > 2 ) || ( currBuild === '' ) ) {
        currBuild = nextBuild;
      } else {
        // Else send it down to handle hyphenated word.
        pushHyphenatedToken( currBuild, tokens );
        // Reset builds.
        currBuild = words[ i ];
        nextBuild = '';
      }

      if ( k < periods.length ) {
        // In the same manner handle period sign.
        nextBuild = currBuild + periods[ k ];
        if ( rgxShortForm.test( nextBuild ) || ( isLexeme( nextBuild ) && nextBuild.length > 2 ) ) {
          currBuild = nextBuild;
        } else {
          pushHyphenatedToken( currBuild, tokens );
          tokens.push( [ periods[ k ], categories.punctuation ] );
          currBuild = '';
          nextBuild = '';
        }
      }
      k += 1;
    }
    // Handle the last piece if applicable.
    if ( currBuild !== '' ) pushHyphenatedToken( currBuild, tokens );
  }; // pushWordToken()

  // ### tokenizeTextUnit
  /**
   *
   * Attempts to tokenize the input `text` using the `rgxSplit`. The tokenization
   * is carried out by combining the regex matches and splits in the right sequence.
   * The matches are the *real tokens*, whereas splits are text units that are
   * tokenized in later rounds! The real tokens (i.e. matches) are pushed as
   * `object` and splits as `string`.
   *
   * @param {string} text unit that is to be tokenized.
   * @param {object} rgxSplit object containing the regex and it's category.
   * @return {array} of tokens.
   * @private
  */
  var tokenizeTextUnit = function ( text, rgxSplit ) {
    // Regex matches go here; note each match is a token and has the same tag
    // as of regex's category.
    var matches = text.match( rgxSplit[ RGX ] );
    // Balance is "what needs to be tokenized".
    var balance = text.split( rgxSplit[ RGX ] );
    // The result, in form of combination of tokens & matches, is captured here.
    var tokens = [];
    // The tag;
    var tag = rgxSplit[ CAT ];
    // Helper variables.
    var i,
        imax,
        k,
        t; // Temp token.
        // tp; // Temp token with a period sign in end.

    // console.log( matches, balance, text, tag, balance[ 1 ] ); // eslint-disable-line no-console
    // A `null` value means it is equivalent to no matches i.e. an empty array.
    matches = ( matches ) ? matches : [];
    // Handle cases where the word is ending with period for **word category**.
    // Iterate in [ m0 b1 m1 ... ] pattern as `b0` has no value here.
    // *** COMMENTED out after `pushWordToken()`:
    // k = 0;
    // if ( tag === categories.word ) {
    //   for ( i = 1, imax = balance.length; i < imax; i += 1 ) {
    //     t = balance[ i ];
    //     if ( k < matches.length && t[ 0 ] === '.' ) {
    //       tp = matches[ k ] + '.';
    //       if ( isLexeme( tp ) || rgxShortForm.test( tp ) ) {
    //         matches[ k ] = tp;
    //         balance[ i ] = t.slice( 1 );
    //       }
    //     }
    //     k += 1;
    //   }
    // }

    // console.log( matches, balance, text, tag, balance[ 1 ] ); // eslint-disable-line no-console
    // Combine tokens & matches in the following pattern [ b0 m0 b1 m1 ... ]
    k = 0;
    for ( i = 0, imax = balance.length; i < imax; i += 1 ) {
      t = balance[ i ];
      t = t.trim();
      if ( t ) tokens.push( t );
      if ( k < matches.length ) {
        if ( tag === categories.word ) {
          // Handle special cases for words via:
          pushWordToken( matches[ k ], tokens );
        } else {
          tokens.push( [ matches[ k ], tag ] );
        }
      }
      k += 1;
    }

    return ( tokens );
  }; // tokenizeTextUnit()

  // ### tokenizeTextRecursively
  /**
   *
   * Tokenizes the input text recursively using the array of `regexes` and then
   * the `tokenizeTextUnit()` function. If (or whenever) the `regexes` becomes
   * empty, it simply splits the text on non-word characters instead of using
   * the `tokenizeTextUnit()` function.
   *
   * @param {string} text unit that is to be tokenized.
   * @param {object} regexes object containing the regex and it's category.
   * @return {undefined} nothing!
   * @private
  */
  var tokenizeTextRecursively = function ( text, regexes ) {
    var sentence = text.trim();
    var tokens = [];
    // Helpers – for loop variables & token category.
    var i, imax;
    var cat;

    if ( !regexes.length ) {
      // No regex left, this is the true **unk**.
      // Becuase it is `UNK`, we can use `addToken` instead of attempting
      // `addTokenIfInCache`.
      addToken( text, categories.unk, ps );
      ps = 0;
      return;
    }

    var rgx = regexes[ 0 ];
    tokens = tokenizeTextUnit( sentence, rgx );

    for ( i = 0, imax = tokens.length; i < imax; i += 1 ) {
      if ( typeof tokens[ i ] === 'string' ) {
        // Strings become candidates for further tokenization.
        tokenizeTextRecursively( tokens[ i ], regexes.slice( 1 ) );
      } else {
        // Use the passed value of preceding spaces only once!
        // First try cache, otherwise make a direct addition. This ensures
        // processing of expansions.
        cat = addTokenIfInCache( tokens[ i ][ 0 ], ps );
        if ( cat === categories.unk ) addToken( tokens[ i ][ 0 ], tokens[ i ][ 1 ], ps );
        // Reset `ps` to **0** as there can never be spaces in a text passed to
        // this tokenizer.
        ps = 0;
      }
    }
  }; // tokenizeTextRecursively()

  // ### tokenize
  /**
   *
   * Tokenizes the input `sentence` using the function `tokenizeTextRecursively()`.
   * This acts as the fall back tokenizer to the **linear tokenizer**.
   *
   * @method Tokenizer#tokenize
   * @param {RegExp} rgxs containg regexes for parsing.
   * @param {string} text the input sentence.
   * @param {number} precedingSpaces to the text
   * @param {object} doc contains the document; used here for adding tokens.
   * @return {void} nothing!
   * `value` and its `tag` identifying the type of the token.
   * @private
  */
  var tokenize = function ( rgxs, text, precedingSpaces, doc ) {
    // Cache frequently used doc methods.
    addToken = doc._addToken;
    addTokenIfInCache = doc._addTokenIfInCache;
    isLexeme = doc.isLexeme;
    // Set `ps` to the passed value of preceding spaces, it will be reset to **0**
    // after first use during recursion.
    ps = precedingSpaces;
    tokenizeTextRecursively( text, rgxs, precedingSpaces );
  }; // tokenize()

  return tokenize;
};

module.exports = tokenizer;

},{}],35:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

// ## search
/**
 *
 * Searches the `token`'s index in the `spans` and returns the index of the
 * span, where it is found.
 *
 * @param {number} token to be searched.
 * @param {array[]} spans where token will be searched.
 * @return {number} index of span where token is found; if it is not found then
 * it returns `null`.
 * @private
*/
var search = function ( token, spans ) {
  var minIndex = 0;
  var maxIndex = spans.length - 1;
  var currIndex;
  var leftToken;
  var rightToken;

  while ( minIndex <= maxIndex ) {
    currIndex = ( minIndex + maxIndex ) / 2 | 0; // eslint-disable-line no-bitwise
    leftToken = spans[ currIndex ][ 0 ];
    rightToken = spans[ currIndex ][ 1 ];

    if ( token > rightToken ) {
      minIndex = currIndex + 1;
    } else if ( token < leftToken ) {
      maxIndex = currIndex - 1;
    } else return currIndex;
  }

  return null;
}; // search()

module.exports = search;

},{}],36:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

const constants = require( './constants.js' );
// Bits reserved for `lemma`.
const bits4lemma = constants.bits4lemma;
// Mask for extracting pos
const posMask = constants.posMask;
// Size of a single token.
const tkSize = constants.tkSize;

/**
 * This implementation is inspired by the hypothesis that *content salience is proportional
 * to the frequency of part-of-speech n-grams* as outlined in the paper titled,
 * [Examining the Content Load of Part of Speech Blocks for Information Retrieval](https://dl.acm.org/doi/10.5555/1273073.1273142).
 *
 * @param {object} rdd  Raw Document Data structure containing the document whose
 *                      sentence wise importance will be determined.
 * @returns {object[]}  array of objects, in form of `{ index: <integer>, importance: <0–1>}`,
 *                      where index points to the sentence; 1 means highest importance and 0 indicates lowest.
 */
const sentenceWiseImportance = function ( rdd ) {
    // Define open class part-of-speeches; used to compute intitial information content
    const openClassPOS = Object.create(null);
    openClassPOS.ADJ = true;
    openClassPOS.ADV = true;
    openClassPOS.INTJ = true;
    openClassPOS.NOUN = true;
    openClassPOS.PROPN = true;
    openClassPOS.VERB = true;
    openClassPOS.NUM = true;
    openClassPOS.SYM = true;
    // N-gram to use to construct a pos group.
    const NGram = 4;
    const sentences = rdd.sentences;
    const tokens = rdd.tokens;
    const cache = rdd.cache;

    // Used to build table of weights of pos groups. Apart from frequency, it also maintains
    // (a) array of sentences, where a given pos group was found, (b) total weight computed as
    // frequency minus count of closed class part-of-speech in the group.
    const posGroupWeightTable = Object.create( null );

    for ( let s = 0; s < sentences.length; s += 1 ) {
      const pos = [];
      const [ start, end ] = sentences[ s ];
      for ( let t = start; t <= end; t += 1 ) {
        const p = cache.valueOf( 'pos', ( tokens[ ( t * tkSize ) + 2 ] & posMask ) >>> bits4lemma ); // eslint-disable-line no-bitwise
        if ( p !== 'SPACE' && p !== 'PUNCT' ) pos.push( p );
      }

      // Ignore sentences where we cannot build NGram i.e. sentences shorter than NGram.
      if ( pos.length < 4 ) continue; // eslint-disable-line no-continue
      // Determine NGrams;
      for ( let k = 0; k + NGram - 1 < pos.length; k += 1 ) {
        const pos4Gram = pos.slice( k, k + NGram );
        // Used to compute the weight for a pos group.
        const initInfoContent = pos4Gram.reduce(
          ( pv, cv ) => pv - ( ( openClassPOS[cv] ) ? 0 : 1 ),
          0
        );
        const posGroup = pos4Gram.join( '_' );
        posGroupWeightTable[ posGroup ] = posGroupWeightTable[ posGroup ] || Object.create( null );
        posGroupWeightTable[ posGroup ].group = posGroup;
        posGroupWeightTable[ posGroup ].sentences = posGroupWeightTable[ posGroup ].sentences || [];
        posGroupWeightTable[ posGroup ].sentences.push( s ); // ?
        posGroupWeightTable[ posGroup ].weight = ( posGroupWeightTable[ posGroup ].weight === undefined ) ?
                                                  initInfoContent + 1 :
                                                  ( posGroupWeightTable[ posGroup ].weight + 1 );
        posGroupWeightTable[ posGroup ].iv = initInfoContent;
      }
    }

    // Transform object into an array, and filter out elements with weight <= 0.
    const posGroupWeights = Object.keys( posGroupWeightTable )
                              .map( ( e ) => posGroupWeightTable[ e ] )
                              .filter( ( e ) => e.weight > 0 );
    // This is an array index by each sentence's index and would contain the total weight
    // computed by adding all the weights of each pos group found in that sentence.
    const sentenceWiseWeights = new Array( sentences.length );
    sentenceWiseWeights.fill( 0 );
    posGroupWeights.forEach( ( pgw ) => {
      pgw.sentences.forEach( ( e ) => {
         sentenceWiseWeights[ e ] += pgw.weight;
        } );
    });
    // Normalize weights by dividing them by the max.
    let max = Math.max( ...sentenceWiseWeights );
    // Avoid divide by zero situation
    if ( max === 0 ) max = 1;

    return sentenceWiseWeights.map( ( e, i ) => ( { index: i, importance: +( e / max ).toFixed( 4 ) } ) );
  };

  module.exports = sentenceWiseImportance;

},{"./constants.js":24}],37:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

/**
 * Stable sort function for frequency table i.e. `[ [ term, frequency ] ... ]`.
 * It first sorts on the frequency and then an alpha-numeric sort on term.
 *
 * @param  {array}  a first term-frequency pair element sent by sort.
 * @param  {array}  b second term-frequency pair element sent by sort.
 * @return {number}   number: -1 or 0 or +1.
 */
module.exports = ( a, b ) => {
  if ( b[ 1 ] > a[ 1 ] ) {
    return 1;
  } else if ( b[ 1 ] < a[ 1 ] ) {
           return -1;
         } else if ( a[ 0 ] > b[ 0 ] ) return 1;
  return -1;
};

},{}],38:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

var recTokenizer = require( './recursive-tokenizer.js' );

/**
 * Creates an instance of tokenizer.
 *
 * @param  {object}   trex        language specific regular expressions needed for
 *                                tokenization. This includes helper, linear and
 *                                recursive.
 * @param  {object}   categories  tokens categories and their map to numeric code.
 * @param  {object}   preserve    language specific suffixes and prefixes to be preserved.
 * @return {function}             that performs the tokenization based on the
 *                                above configuration.
 * @private
 */
var tokenizer = function ( trex, categories, preserve ) {
  // Maximum number of preceding spaces allowed.
  var maxPrecedingSpaces = 65535;
  var processFunctions = [];
  var rgxCatDetectors = trex.ltc;
  var tokenizeRecursively = recTokenizer( categories, preserve );
  // Initialize helper regexes.
  var rgxAnyWithRP = trex.helpers.anyWithRP;
  var rgxAnyWithLP = trex.helpers.anyWithLP;
  var rgxLPanyRP = trex.helpers.LPanyRP;
  var rgxSplitter = trex.helpers.splitter;

  var detectTokenCategory = function ( token ) {
    // console.log( token );
    var cat;
    for ( cat = 0; cat < rgxCatDetectors.length; cat += 1 ) {
      // console.log( token, rgxCatDetectors[ cat ][ 0 ].test( token ),  rgxCatDetectors[ cat ][ 1 ] )
      if ( rgxCatDetectors[ cat ][ 0 ].test( token ) ) return rgxCatDetectors[ cat ][ 1 ];
    }
    return categories.unk;
  }; // detectTokenCategory()


  var processUnk = function ( text, cat, precedingSpaces, doc ) {
    // Match is captured here.
    var match;
    // Splitted non-punctuation portion's category.
    var splitCat;

    // Match with any thing followed by a **right** punctuation.
    match = text.match( rgxAnyWithRP );
    // Non-null indicates that there was a right punctuation in the end.
    if ( match ) {
      // Safely add the text prior to punkt if in cache.
      splitCat = doc._addTokenIfInCache( match[ 1 ], precedingSpaces );
      if ( splitCat === categories.unk ) {
        // Try detecting token category before falling back to recursion.
        splitCat = detectTokenCategory( match[ 1 ] );
        if ( splitCat  === categories.unk ) {
          // Still 'unk', handle it via recursive tokenizer.
          tokenizeRecursively( trex.rtc, text, precedingSpaces, doc );
        } else {
          // Because it is a detected category use `processFunctions()`.
          processFunctions[ splitCat ]( match[ 1 ], splitCat, precedingSpaces, doc );
          doc._addToken( match[ 2 ], categories.punctuation, 0 );
        }
      } else {
        // The split is a added via `addTokenIfInCache()`, simply add the balance.
        doc._addToken( match[ 2 ], categories.punctuation, 0 );
      }
      // All done so,
      return;
    }
    // Match with any thing followed by a **left** punctuation.
    match = text.match( rgxAnyWithLP );
    // Now non-null indicates that there was a left punctuation in the beginning.
    if ( match ) {
      // If match 2 is a valid lexeme, can safley add tokens. Notice insertion
      // sequence has reversed compared to the previous if block.
      if ( doc.isLexeme( match[ 2 ] ) ) {
        doc._addToken( match[ 1 ], categories.punctuation, precedingSpaces );
        doc._addTokenIfInCache( match[ 2 ], 0 );
      } else {
        // Try detecting token category before falling bac k to recursion.
        splitCat = detectTokenCategory( match[ 2 ] );
        if ( splitCat  === categories.unk ) {
          // Still 'unk', handle it via recursive tokenizer.
          tokenizeRecursively( trex.rtc, text, precedingSpaces, doc );
        } else {
          // Because it is a detected category use `processFunctions()`.
          doc._addToken( match[ 1 ], categories.punctuation, precedingSpaces );
          processFunctions[ splitCat ]( match[ 2 ], splitCat, 0, doc );
        }
      }
      // All done so,
      return;
    }
    // Punctuation on both sides!
    match = text.match( rgxLPanyRP );
    if ( match ) {
      // If match 2 is a valid lexeme, can safley add tokens.
      if ( doc.isLexeme( match[ 2 ] ) ) {
        doc._addToken( match[ 1 ], categories.punctuation, precedingSpaces );
        doc._addTokenIfInCache( match[ 2 ], 0 );
        doc._addToken( match[ 3 ], categories.punctuation, 0 );
      } else {
        // Try detecting token category before falling bac k to recursion.
        splitCat = detectTokenCategory( match[ 2 ] );
        if ( splitCat  === categories.unk ) {
          // Still 'unk', handle it via recursive tokenizer.
          tokenizeRecursively( trex.rtc, text, precedingSpaces, doc );
        } else {
          // Because it is a detected category use `processFunctions()`.
          doc._addToken( match[ 1 ], categories.punctuation, precedingSpaces );
          processFunctions[ splitCat ]( match[ 2 ], splitCat, 0, doc );
          doc._addToken( match[ 3 ], categories.punctuation, 0 );
        }
      }
      // All done so,
      return;
    }

    // Nothing worked, treat the whole thing as `unk` and fallback to recursive tokenizer.
    tokenizeRecursively( trex.rtc, text, precedingSpaces, doc );
  }; // processUnk()

  // var processWord = function ( token, cat, precedingSpaces, doc ) {
  //   doc._addToken( token, cat, precedingSpaces );
  // }; // processWord()

  var processWordRP = function ( token, cat, precedingSpaces, doc ) {
    // Handle **special case**, `^[a-z]\.$` will arrive here instead of `shortForm`!
    var tl = token.length;
    if ( tl > 2 ) {
      doc._addToken( token.slice( 0, -1 ), categories.word, precedingSpaces );
      doc._addToken( token.slice( -1 ), categories.punctuation, 0 );
    } else if ( tl === 2 && token[ tl - 1 ] === '.' ) {
        doc._addToken( token, categories.word, precedingSpaces );
      } else {
        doc._addToken( token.slice( 0, -1 ), categories.word, precedingSpaces );
        doc._addToken( token.slice( -1 ), categories.punctuation, 0 );
      }
  }; // processWordRP()

  var processDefault = function ( token, cat, precedingSpaces, doc ) {
    doc._addToken( token, cat, precedingSpaces );
  }; // processDefault()

  var tokenize = function ( doc, text ) {
    // Raw tokens, obtained by splitting them on spaces.
    var rawTokens = [];
    // Contains the number of spaces preceding a token.
    var precedingSpaces = 0;
    // Pointer to the `rawTokens`, whereas `pp` is the previous pointer!
    var p;
    // Token category as detected by the `detectTokenCategory()` function.
    var cat;
    // A temporary token!
    var t;

    rawTokens = text.split( rgxSplitter );

    // Now process each raw token.
    for ( p = 0; p < rawTokens.length; p += 1 ) {
      t = rawTokens[ p ];
      // Skip empty (`''`) token.
      if ( !t ) continue; // eslint-disable-line no-continue
      // Non-empty token:
      if ( t[ 0 ] === ' ' ) {
        // This indicates spaces: count them.
        precedingSpaces = t.length;
        // Cap precedingSpaces to a limit if it exceeds it.
        if ( precedingSpaces > maxPrecedingSpaces ) precedingSpaces = maxPrecedingSpaces;
      } else {
        // A potential token: process it.
        cat = doc._addTokenIfInCache( t, precedingSpaces );
        if ( cat === categories.unk ) {
          cat = detectTokenCategory( t );
          processFunctions[ cat ]( t, cat, precedingSpaces, doc );
        }
        precedingSpaces = 0;
      }
    } // for
  }; // tokenize()

  // Main Code:
  // Specific Processes.
  processFunctions[ categories.unk ] = processUnk;
  processFunctions[ categories.wordRP ] = processWordRP;

  // Default process.
  processFunctions[ categories.emoji ] = processDefault;
  processFunctions[ categories.word ] = processDefault;
  processFunctions[ categories.shortForm ] = processDefault;
  processFunctions[ categories.number ] = processDefault;
  processFunctions[ categories.url ] = processDefault;
  processFunctions[ categories.email ] = processDefault;
  processFunctions[ categories.mention ] = processDefault;
  processFunctions[ categories.hashtag ] = processDefault;
  processFunctions[ categories.emoticon ] = processDefault;
  processFunctions[ categories.time ] = processDefault;
  processFunctions[ categories.ordinal ] = processDefault;
  processFunctions[ categories.currency ] = processDefault;
  processFunctions[ categories.punctuation ] = processDefault;
  processFunctions[ categories.symbol ] = processDefault;
  processFunctions[ categories.tabCRLF ] = processDefault;
  processFunctions[ categories.apos ] = processDefault;
  processFunctions[ categories.alpha ] = processDefault;
  processFunctions[ categories.decade ] = processDefault;

  return tokenize;
}; // tokenizer()

module.exports = tokenizer;

},{"./recursive-tokenizer.js":34}],39:[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var constants = require( './constants.js' );
// Size of a single token.
var tkSize = constants.tkSize;
// Bits reserved for `lemma`.
var bits4lemma = constants.bits4lemma;
// Mask for extracting pos
var posMask = constants.posMask;

var mappers = Object.create( null );

// ## mapRawTokens2UIDn
/**
 * Maps the raw tokens to an array of uid of normal of tokens.
 * @private
 *
 * @param {object} rdd The raw document data-structure.
 * @returns {array} conatining the uid of normals.
 * @private
*/
var mapRawTokens2UIdOfNormal = function ( rdd ) {
  // Extract tokens & cache.
  var tokens = rdd.tokens;
  var cache = rdd.cache;
  // Will contain only the hash of normal of tokenized lexemes.
  var mappedTokens = new Array( rdd.numOfTokens );
  var i, k;
  for ( i = 0; i < tokens.length; i += tkSize ) {
    k = i + 1;
    mappedTokens[ i / tkSize ] = ( tokens[ k ] > 65535 ) ?
                              // Handle contraction's expansion.
                              cache.nox( tokens[ k ] ) :
                              // Handle all other words.
                              cache.normal( tokens[ i ] );
  } // for ( i = 0; i < tokens.length...

  return mappedTokens;
}; // mapRawTokens2UIdOfNormal()

// ## mapRawTokens2UIDn
/**
 * Maps the raw tokens to an array of uid of value of tokens.
 * @private
 *
 * @param {object} rdd The raw document data-structure.
 * @returns {array} conatining the uid of values.
 * @private
*/
var mapRawTokens2UIdOfValue = function ( rdd ) {
  // Extract tokens.
  var tokens = rdd.tokens;
  var cache = rdd.cache;
  // Will contain only the hash of value of tokenized lexemes.
  var mappedTokens = new Array( rdd.numOfTokens );
  var i;
  for ( i = 0; i < tokens.length; i += tkSize ) {
    // Use mapped spelling — this ensure correct pos tagging & lemmatization etc.
    // as mapped spelling is the gold spelling.
    mappedTokens[ i / tkSize ] = cache.mappedSpelling( tokens[ i ] );
  } // for ( i = 0; i < tokens.length...
  return mappedTokens;
}; // mapRawTokens2UIdOfValue()

// ## mapRawTokens2UIdOfPOS
/**
 * Extracts the default or most likely pos tag for every token.
 * @private
 *
 * @param {object} rdd the raw document data.
 * @returns {array} conatining the default pos tags.
 * @private
*/
var mapRawTokens2UIdOfDefaultPOS = function ( rdd ) {
  // Extract tokens & cache.
  var tokens = rdd.tokens;
  var cache = rdd.cache;
  var posTags = new Array( rdd.numOfTokens );
  let pk = 0;
  for ( let i = 0; i < tokens.length; i += tkSize, pk += 1 ) {
    posTags[ pk ] = ( tokens[ ( i ) + 2 ] === 0 ) ?
                      // Make UNK to NOUN to handle the remote possibility of ML POS being undefined!
                      // Also use mapped spelling — this ensure correct pos tagging & lemmatization etc.
                      // as mapped spelling is the gold spelling.
                      ( cache.posOf( cache.mappedSpelling( tokens[ i ] ) ) || 8 ) :
                      ( ( tokens[ ( i ) + 2 ] & posMask ) >>> bits4lemma ); // eslint-disable-line no-bitwise
  }
  return posTags;
}; // mapRawTokens2UIdOfDefaultPOS()

mappers.mapRawTokens2UIdOfNormal = mapRawTokens2UIdOfNormal;
mappers.mapRawTokens2UIdOfValue = mapRawTokens2UIdOfValue;
mappers.mapRawTokens2UIdOfDefaultPOS = mapRawTokens2UIdOfDefaultPOS;

module.exports = mappers;

},{"./constants.js":24}],"wink-nlp":[function(require,module,exports){
//     wink-nlp
//
//     Copyright (C) GRAYPE Systems Private Limited
//
//     This file is part of “wink-nlp”.
//
//     Permission is hereby granted, free of charge, to any
//     person obtaining a copy of this software and
//     associated documentation files (the "Software"), to
//     deal in the Software without restriction, including
//     without limitation the rights to use, copy, modify,
//     merge, publish, distribute, sublicense, and/or sell
//     copies of the Software, and to permit persons to
//     whom the Software is furnished to do so, subject to
//     the following conditions:
//
//     The above copyright notice and this permission notice
//     shall be included in all copies or substantial
//     portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
//     ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
//     TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//     PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
//     CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
//     CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//

var DocDataWrapper = require( './dd-wrapper.js' );
var Doc = require( './doc-v2.js' );
var Cache = require( './cache.js' );
var tokenizer = require( './tokenizer.js' );
var compileTRex = require( './compile-trex.js' );
var mappers = require( './tokens-mappers.js' );
var itsHelpers = require( './its.js' );
var asHelpers = require( './as.js' );
var mapRawTokens2UIdOfNormal = mappers.mapRawTokens2UIdOfNormal;
var mapRawTokens2UIdOfDefaultPOS = mappers.mapRawTokens2UIdOfDefaultPOS;

var Compiler = require( './examples-compiler.js' );

var constants = require( './constants.js' );

var fsm = require( './automaton.js' );

var search = require( './search.js' );
var locate = require( './locate.js' );

var helper = require( './helper.js' );

// Size of a single token.
var tkSize = constants.tkSize;

/**
 * Creates an instance of nlp.
 * @private
 *
 * @param {object} theModel language model.
 * @param {string[]} pipe of nlp annotations.
 * @returns {object} conatining set of API methods for natural language processing.
 * @example
 * const nlp = require( 'wink-nlp' );
 * var myNLP = nlp();
*/
var nlp = function ( theModel, pipe ) {

  var methods = Object.create( null );
  // Token Regex; compiled from `model`
  var trex;
  // wink-nlp language `model`.
  var model;
  // Holds instance of `cache` created using the `model`.
  var cache;
  // NLP Pipe Config.
  // var nlpPipe = Object.create( null );
  // Configured tokenize.
  var tokenize;
  // Automata
  // 1. NER
  var nerAutomata;
  var nerTransformers;
  // 2. SBD
  var sbdAutomata;
  var sbdTransformers;
  var sbdSetter;
  // 3. NEG
  var negAutomata;
  var negSetter;
  // SA
  var saAutomata;
  var saSetter;
  // POS
  var posAutomata;
  var posTransformers;
  var posSetter;
  var posUpdater;
  // Patterns or Custom Entities
  var cerAutomata;
  var cerTransformer;
  var cerLearnings = 0;
  var cerPreserve;
  var cerConfig;
  // Used for compiling examples.
  var compiler;
  // Used to innstantiate the compiler.
  var cerMetaModel;

  // Contains a list of valid annotations built from `theModel`.
  var validAnnotations = Object.create( null );

  // Current pipe.
  var currPipe = Object.create( null );
  var onlyTokenization = true;

  // Private methods.

  // ## load
  /**
   * Loads the model containing the core model along with other applicable
   * models.
   * @private
   *
   * @returns {void} nothing!.
   * @private
  */
  var load = function () {
    // Load language model.
    model = theModel.core();
    // With `intrinsicSize` captured, instantiate cache etc.
    cache = Cache( model, theModel.featureFn ); // eslint-disable-line new-cap
    trex = compileTRex( model.trex );

    // Instantiate tokenizer.
    tokenize = tokenizer( trex, model.tcat.hash, model.preserve );

    // Load & setup SBD model.
    var sbdModel = theModel.sbd();

    sbdAutomata = new Array( sbdModel.machines.length );
    sbdTransformers = new Array( sbdModel.machines.length );
    for ( let i = 0; i < sbdModel.machines.length; i += 1 ) {
      sbdAutomata[ i ] = fsm( cache );
      sbdAutomata[ i ].importJSON( sbdModel.machines[ i ] );
      sbdTransformers[ i ] = sbdModel.transformers[ i ];
    }
    sbdSetter = sbdModel.setter;

    // Load & setup NER model.
    var nerModel = theModel.ner();

    nerAutomata = new Array( nerModel.machines.length );
    nerTransformers = new Array( nerModel.machines.length );
    for ( let i = 0; i < nerModel.machines.length; i += 1 ) {
      nerAutomata[ i ] = fsm( cache );
      nerAutomata[ i ].importJSON( nerModel.machines[ i ] );
      nerTransformers[ i ] = nerModel.transformers[ i ];
    }

    var negModel = theModel.negation();
    negAutomata = fsm( cache );
    negAutomata.importJSON( negModel.machines[ 0 ] );
    negSetter = negModel.setter;

    var saModel = theModel.sa();
    saAutomata = fsm( cache );
    saAutomata.importJSON( saModel.machines[ 0 ] );
    saSetter = saModel.setter;

    var posModel = theModel.pos();
    posAutomata = new Array( posModel.machines.length );
    posTransformers = new Array( nerModel.machines.length );
    for ( let i = 0; i < posModel.machines.length; i += 1 ) {
      // Ignore only OOV literal and not new line character in the case of POS Tagging.
      posAutomata[ i ] = fsm( cache, cache.value( 0 ) );
      posAutomata[ i ].importJSON( posModel.machines[ i ] );
      posTransformers[ i ] = posModel.transformers[ i ];
    }
    posSetter = posModel.setter;
    posUpdater = posModel.updater;


    var cmModel = theModel.metaCER();
    cerMetaModel = cmModel.machines;
    cerTransformer = cmModel.transformers[ 0 ];
    // posAutomata = fsm( cache, cache.value( 0 ) );
    // posAutomata.importJSON( posModel.machines[ 0 ] );
    // posTransformer = posModel.transformers[ 0 ];
  }; // load()

  // Public Methods.
  // ## readDoc
  /**
   * Loads a single document to be processed.
   * @private
   *
   * @param {string} text of the document that you want to process.
   * @returns {object} the document in terms of an object that exposes the API.
   * @example
   * const DOC = "The quick brown fox jumps over the lazy dog";
   * myNLP.readDoc(DOC);
  */
  var readDoc = function ( text ) {
    if ( typeof text !== 'string' ) {
      throw Error( `wink-nlp: expecting a valid Javascript string, instead found "${typeof text}".`);
    }
    // Raw Document Data-structure gets populated here as NLP pipe taks execute!
    var rdd = Object.create( null );
    // The `cache` is also part of document data structure.
    rdd.cache = cache;
    // Document's tokens; each token is represented as an array of numbers:
    // ```
    // [
    //   hash, // of tokenized lexeme
    //   (nox) + preceding spaces, // expansion's normal
    //   pos + lemma, // pos & lemma are contextual
    //   negation flag // 1 bit at msb
    // ]
    // ```
    rdd.tokens = [];
    // Sentences — stored as array of pairs of `[ start, end ]` pointing to the `tokens`.
    rdd.sentences = [];
    // Markings are 4-tuples of `start`, `end` **token indexes**,  and `begin & end markers`.
    // The begin & end markers are used to markup the tokens specified.
    rdd.markings = [];
    // Publish the current annotation pipeline so that code can inquire about
    // active annotations!
    rdd.currPipe = currPipe;

    var wrappedDocData = DocDataWrapper( rdd );  // eslint-disable-line new-cap

    // Start of NLP Pipe
    tokenize( wrappedDocData, text ); // eslint-disable-line new-cap
    // Compute number of tokens.
    rdd.numOfTokens = rdd.tokens.length / tkSize;
    // This structure is identical to sentences ( or entities ), for the sake of uniformity.
    // The structure is `[ start, end, negationFlag, sentimentScore ]`.
    rdd.document = [ 0, ( rdd.numOfTokens - 1 ), 0, 0 ];

    // Map tokens for automata if there are other annotations to be performed.
    var tokens4Automata = ( onlyTokenization ) ? null : mapRawTokens2UIdOfNormal( rdd );

    var px;
    if ( currPipe.sbd ) {
      // Sentence Boundary Detection.
      // Set first `Pattern Swap (x)` as `null`.
      px = null;
      for ( let i = 0; i < sbdAutomata.length; i += 1 ) {
        sbdAutomata[ i ].setPatternSwap( px );
        // For SBD, all tokens are required to extract preceeding spaces.
        px = sbdAutomata[ i ].recognize( tokens4Automata, sbdTransformers[ i ], rdd.tokens );
      }
      // The structure of sentence is:<br/>
      // `[ start, end, negationFlag, sentimentScore ]`
      sbdSetter( px, rdd );
      // Compute number of sentences!
      rdd.numOfSentences = rdd.sentences.length;
    } else {
      // Setup default sentence as entire document!
      rdd.numOfSentences = 1;
      rdd.sentences = [ [ 0, ( rdd.numOfTokens - 1 ), 0, 0 ] ];
    }

    if ( currPipe.ner ) {
      // Named entity detection.
      px = null;
      for ( let i = 0; i < nerAutomata.length; i += 1 ) {
        nerAutomata[ i ].setPatternSwap( px );
        px = nerAutomata[ i ].recognize( tokens4Automata, nerTransformers[ i ] );
      }
      // Entities — storted as array of `[ start, end, entity type ].`
      // There are no setter for entities as no transformation is needed.
      rdd.entities = px;
    } else {
      rdd.entities = [];
    }

    if ( currPipe.negation ) {
      // Negation
      px = null;
      px = negAutomata.recognize( tokens4Automata );
      negSetter( px, rdd, constants, search );
    }

    if ( currPipe.sentiment ) {
      // Sentiment Analysis
      px = null;
      px = saAutomata.recognize( tokens4Automata );
      saSetter( px, rdd, constants, locate );
    }

    if ( currPipe.pos ) {
      // PoS Tagging
      const posTags = mapRawTokens2UIdOfDefaultPOS( rdd );
      px = null;
      for ( let i = 0; i < posAutomata.length; i += 1 ) {
        px = posAutomata[ i ].recognize( posTags, posTransformers[ 0 ], rdd.tokens );
        posUpdater( px, cache, posTags, tokens4Automata );
      }
      posSetter( rdd, posTags, tkSize, constants.bits4lemma );
    }

    if ( currPipe.cer ) {
      // Patterns
      px = null;
      if ( cerAutomata !== undefined && cerLearnings > 0 ) {
        cerConfig.rdd = rdd;
        cerConfig.preserve = cerPreserve;
        cerConfig.constants = constants;
        if ( cerConfig.useEntity ) cerAutomata.setPatternSwap( rdd.entities );
        px = cerAutomata.recognize( tokens4Automata, cerTransformer, cerConfig );
      }
      // If there are no custom entities, then `px` will be `null`; in such a case
      // set `customEntities` to an empty array.
      rdd.customEntities = px || [];
    } else rdd.customEntities = [];


    // Word Vector
    // if ( theModel.wordVectors !== undefined ) {
    //
    // }

    // Now create the document!
    var doc = Doc( rdd, theModel.addons ); // eslint-disable-line new-cap

    // All done — cleanup document's data.
    wrappedDocData.clean();
    return doc;
  }; // readDoc()

  var learnCustomEntities = function ( examples, config ) {
    // Ensure (a) `examples` is an array and (b) and its each element is an object.
    if ( helper.isArray( examples ) ) {
      examples.forEach( ( ex ) => {
        if ( helper.isObject( ex ) ) {
          // The object must contain name  & patterns property of string and array type respectively.
          if ( ( typeof ex.name !== 'string' ) || ( ex.name === '' ) ) {
            throw Error( `wink-nlp: name should be a string, instead found "${ex.name}":\n\n${JSON.stringify( ex, null, 2 )}` );
          } else if ( helper.isArray( ex.patterns ) ) {
            for ( let k = 0; k < ex.patterns.length; k += 1 ) {
              const p = ex.patterns[ k ];
              // Each pattern should be a string.
              if ( ( typeof p !== 'string' ) || ( p === '' ) ) {
                throw Error( `wink-nlp: each pattern should be a string, instead found "${p}":\n\n${JSON.stringify( ex, null, 2 )}` );
              }
            } // for ( let k = 0;... )
          } else {
            // Pattern is not an array.
            throw Error( `wink-nlp: patterns should be an array, instead found "${typeof ex.patterns}":\n\n${JSON.stringify( ex, null, 2 )}` );
          }
          // If mark is present then it should be an array of integers **and** its length must
          // be equal to 2 **and** start index <= end index.
          if ( ( ex.mark !== undefined ) &&
                ( !helper.isIntegerArray( ex.mark ) ||
                ( ex.mark.length !== 2 ) ||
                ( ex.mark.length === 2 && ex.mark[ 0 ] > ex.mark[ 1 ] ) ) ) {
            throw Error( `wink-nlp: mark should be an array containing start & end indexes, instead found:\n\n${JSON.stringify( ex.mark, null, 2 )}` );
          }
        } else {
          // Example is not an object.
          throw Error( `wink-nlp: each example should be an object, instead found a "${typeof ex}":\n\n${JSON.stringify( ex, null, 2 )}` );
        }
      } );
    } else {
      // Examples is not an array.
      throw Error( `wink-nlp: examples should be an array, instead found "${typeof examples}".` );
    }

    // Validate config
    cerConfig = ( config === undefined || config === null ) ? Object.create( null ) : JSON.parse( JSON.stringify( config ) );
    if ( !helper.isObject( cerConfig ) ) {
      throw Error( `wink-nlp: config should be an object, instead found "${typeof cerConfig}".` );
    }
    cerConfig.matchValue = !!cerConfig.matchValue;
    cerConfig.usePOS = ( cerConfig.usePOS === undefined ) ? true : !!cerConfig.usePOS;
    cerConfig.useEntity = ( cerConfig.useEntity === undefined ) ? true : !!cerConfig.useEntity;


    // Instantiate compiler.
    compiler = Compiler( cerMetaModel, cache, tokenize, cerConfig.matchValue ); // eslint-disable-line new-cap

    cerAutomata = null;
    cerLearnings = 0;
    cerAutomata = fsm();
    const compiled = compiler.run( examples );
    cerPreserve = compiled.preserve;
    cerLearnings = cerAutomata.learn( compiled.examples );
    // cerAutomata.printModel();
    return cerLearnings;
  }; // learnCustomEntities()

  if ( helper.isObject( theModel ) ) {
    if ( typeof theModel.core !== 'function' ) {
      throw Error( 'wink-nlp: invalid model used.' );
    }
  } else {
    throw Error( 'wink-nlp: invalid model used.' );
  }

  // Build a list of valid annotations from `theModel`. This will ensure that
  // only **available** annotations from the model can be used in the pipe.
  validAnnotations.sbd = typeof theModel.sbd === 'function';
  validAnnotations.negation = typeof theModel.negation === 'function';
  validAnnotations.sentiment = typeof theModel.sa === 'function';
  validAnnotations.pos = typeof theModel.pos === 'function';
  validAnnotations.ner = typeof theModel.ner === 'function';
  validAnnotations.cer = typeof theModel.metaCER === 'function';

  const tempPipe = ( pipe === undefined ) ? Object.keys( validAnnotations ) : pipe;
  if ( helper.isArray( tempPipe ) ) {
    tempPipe.forEach( ( at ) => {
      if ( !validAnnotations[ at ] ) throw Error( `wink-nlp: invalid pipe annotation "${at}" found.` );
      currPipe[ at ] = true;
      onlyTokenization = false;
    } );
  } else throw Error( `wink-nlp: invalid pipe, it must be an array instead found a "${typeof pipe}".` );

  // Load the model.
  load();
  // Setup default configuration.
  // definePipeConfig();
  // Methods.
  methods.readDoc = readDoc;
  methods.learnCustomEntities = learnCustomEntities;
  // Expose `its` and `as` helpers.
  methods.its = itsHelpers;
  methods.as = asHelpers;

  return methods;
}; // wink

module.exports = nlp;

},{"./as.js":19,"./automaton.js":20,"./cache.js":21,"./compile-trex.js":22,"./constants.js":24,"./dd-wrapper.js":27,"./doc-v2.js":28,"./examples-compiler.js":29,"./helper.js":30,"./its.js":32,"./locate.js":33,"./search.js":35,"./tokenizer.js":38,"./tokens-mappers.js":39}]},{},[]);
