//E:\sites\laitec\-dev\src\js\single\0jquery.rateyo.js

/*****
* rateYo - v2.2.0
* http://prrashi.github.io/rateyo/
* Copyright (c) 2014 Prashanth Pamidi; Licensed MIT
*****/

;(function ($) {
  "use strict";

  // The basic svg string required to generate stars
  var BASICSTAR = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
                  "<svg version=\"1.1\""+
                        "xmlns=\"http://www.w3.org/2000/svg\""+
                        "viewBox=\"0 12.705 512 486.59\""+
                        "x=\"0px\" y=\"0px\""+
                        "xml:space=\"preserve\">"+
                    "<polygon "+
                              "points=\"256.814,12.705 317.205,198.566"+
                                      " 512.631,198.566 354.529,313.435 "+
                                      "414.918,499.295 256.814,384.427 "+
                                      "98.713,499.295 159.102,313.435 "+
                                      "1,198.566 196.426,198.566 \"/>"+
                  "</svg>";

  // The Default values of different options available in the Plugin
  var DEFAULTS = {

    starWidth : "24px",
    normalFill: "#dcdcdc",
    ratedFill : "#dedd15",
    numStars  : 5,
    maxValue  : 5,
    precision : 1,
    rating    : 0,
    fullStar  : false,
    halfStar  : false,
    readOnly  : false,
    spacing   : "0px",
    rtl       : false,
    multiColor: null,
    onInit    : null,
    onChange  : null,
    onSet     : null,
    starSvg   : null
  };

  //Default colors for multi-color rating
  var MULTICOLOR_OPTIONS = {

    startColor: "#c0392b", //red
    endColor  : "#f1c40f"  //yellow
  };

  // http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  function isMobileBrowser () {
    var check = false;
    /* jshint ignore:start */
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    /* jshint ignore:end */
    return check;
  }

  function checkPrecision (value, minValue, maxValue) {

    /*
     * This function removes the unnecessary precision, at Min and Max Values
     */

    // Its like comparing 0.0 with 0, which is true
    if (value === minValue) {

      value = minValue;
    }
    else if(value === maxValue) {

      value = maxValue;
    }

    return value;
  }

  function checkBounds (value, minValue, maxValue) {

    /*
     * Check if the value is between min and max values, if not, throw an error
     */

    var isValid = value >= minValue && value <= maxValue;

    if(!isValid){

        throw Error("Invalid Rating, expected value between "+ minValue +
                    " and " + maxValue);
    }

    return value;
  }

  function isDefined(value) {

    // Better way to check if a variable is defined or not
    return typeof value !== "undefined";
  }

  // Regex to match Colors in Hex Format like #FF00FF
  var hexRegex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

  var hexToRGB = function (hex) {

    /*
     * Extracts and returns the Red, Blue, Green Channel values,
     * in the form of decimals
     */

    if (!hexRegex.test(hex)) {

      return null;
    }

    var hexValues = hexRegex.exec(hex),
	r = parseInt(hexValues[1], 16),
	g = parseInt(hexValues[2], 16),
	b = parseInt(hexValues[3], 16);

    return {r:r, g:g, b:b};
  };

  function getChannelValue(startVal, endVal, percent) {

    /*
     * Returns a value between `startVal` and `endVal` based on the percent
     */

    var newVal = (endVal - startVal)*(percent/100);

    newVal = Math.round(startVal + newVal).toString(16);

    if (newVal.length === 1) {

	newVal = "0" + newVal;
    }

    return newVal;
  }

  function getColor (startColor, endColor, percent) {

    /*
     * Given the percentage( `percent` ) of `endColor` to be mixed
     * with the `startColor`, returns the mixed color.
     * Colors should be only in Hex Format
     */

    if (!startColor || !endColor) {

      return null;
    }

    percent = isDefined(percent)? percent : 0;

    startColor = hexToRGB(startColor);
    endColor = hexToRGB(endColor);

    var r = getChannelValue(startColor.r, endColor.r, percent),
        b = getChannelValue(startColor.b, endColor.b, percent),
        g = getChannelValue(startColor.g, endColor.g, percent);

    return "#" + r + g + b;
  }

   function RateYo ($node, options) {

   /*
    * The Contructor, whose instances are used by plugin itself
    */

    // Storing the HTML element as a property, for future access
    this.node = $node.get(0);

    var that = this;

    // Remove any stuff that is present inside the container, and add the plugin class
    $node.empty().addClass("jq-ry-container");

    /*
     * Basically the plugin displays the rating using two rows of stars lying one above
     * the other, the row that is on the top represents the actual rating, and the one
     * behind acts just like a background.
     *
     * `$groupWrapper`: is an element that wraps both the rows
     * `$normalGroup`: is the container for row of stars thats behind and
     *                 acts as background
     * `$ratedGroup`: is the container for row of stars that display the actual rating.
     *
     * The rating is displayed by adjusting the width of `$ratedGroup`
     */
    var $groupWrapper = $("<div/>").addClass("jq-ry-group-wrapper")
                                   .appendTo($node);

    var $normalGroup = $("<div/>").addClass("jq-ry-normal-group")
                                  .addClass("jq-ry-group")
                                  .appendTo($groupWrapper);

    var $ratedGroup = $("<div/>").addClass("jq-ry-rated-group")
                                 .addClass("jq-ry-group")
                                 .appendTo($groupWrapper);

    /*
     * Variable `step`: store the value of the rating for each star
     *                  eg: if `maxValue` is 5 and `numStars` is 5, value of each star
     *                      is 1.
     * Variable `starWidth`: stores the decimal value of width of star in units of px
     * Variable `percentOfStar`: stores the percentage of width each star takes w.r.t
     *                           the container
     * Variable `spacing`: stores the decimal value of the spacing between stars
     *                     in the units of px
     * Variable `percentOfSpacing`: stores the percentage of width of the spacing
     *                              between stars w.r.t the container
     */
    var step, starWidth, percentOfStar, spacing,
        percentOfSpacing, containerWidth, minValue = 0;

    /*
     * `currentRating` contains rating that is being displayed at the latest point of
     * time.
     *
     * When ever you hover over the plugin UI, the rating value changes
     * according to the place where you point the cursor, currentRating contains
     * the current value of rating that is being shown in the UI
     */
    var currentRating = options.rating;

    // A flag to store if the plugin is already being displayed in the UI
    var isInitialized = false;

    function showRating (ratingVal) {

      /*
       * The function is responsible for displaying the rating by changing
       * the width of `$ratedGroup`
       */

      if (!isDefined(ratingVal)) {

        ratingVal = options.rating;
      }

      // Storing the value that is being shown in `currentRating`.
      currentRating = ratingVal;

      var numStarsToShow = ratingVal/step;

      // calculating the percentage of width of $ratedGroup with respect to its parent
      var percent = numStarsToShow*percentOfStar;

      if (numStarsToShow > 1) {

        // adding the percentage of space that is taken by the gap the stars
        percent += (Math.ceil(numStarsToShow) - 1)*percentOfSpacing;
      }

      setRatedFill(options.ratedFill);

      percent = options.rtl ? 100 - percent : percent;

      $ratedGroup.css("width", percent + "%");
    }

    function setContainerWidth () {

      /*
       * Set the width of the `this.node` based on the width of each star and
       * the space between them
       */

      containerWidth = starWidth*options.numStars + spacing*(options.numStars - 1);

      percentOfStar = (starWidth/containerWidth)*100;

      percentOfSpacing = (spacing/containerWidth)*100;

      $node.width(containerWidth);

      showRating();
    }

    function setStarWidth (newWidth) {

      /*
       * Set the width and height of each SVG star, called whenever one changes the
       * `starWidth` option
       */

      // The width and height of the star should be the same
      var starHeight = options.starWidth = newWidth;

      starWidth = window.parseFloat(options.starWidth.replace("px", ""));

      $normalGroup.find("svg")
                  .attr({width : options.starWidth,
                         height: starHeight});

      $ratedGroup.find("svg")
                 .attr({width : options.starWidth,
                        height: starHeight});

      setContainerWidth();

      return $node;
    }

    function setSpacing (newSpacing) {

      /*
       * Set spacing between the SVG stars, called whenever one changes
       * the `spacing` option
       */

      options.spacing = newSpacing;

      spacing = parseFloat(options.spacing.replace("px", ""));

      $normalGroup.find("svg:not(:first-child)")
                  .css({"margin-left": newSpacing});

      $ratedGroup.find("svg:not(:first-child)")
                 .css({"margin-left": newSpacing});

      setContainerWidth();

      return $node;
    }

    function setNormalFill (newFill) {

      /*
       * Set the background fill of the Stars, called whenever one changes the
       * `normalFill` option
       */

      options.normalFill = newFill;

      var $svgs = (options.rtl ? $ratedGroup : $normalGroup).find("svg");

      $svgs.attr({fill: options.normalFill});

      return $node;
    }

    /*
     * Store the recent `ratedFill` option in a variable
     * so that if multiColor is unset, we can use the perviously set `ratedFill`
     * from this variable
     */
    var ratedFill = options.ratedFill;

    function setRatedFill (newFill) {

      /*
       * Set ratedFill of the stars, called when one changes the `ratedFill` option
       */

      /*
       * If `multiColor` option is set, `newFill` variable is dynamically set
       * based on the rating, what ever set as parameter will be discarded
       */
      if (options.multiColor) {

        var ratingDiff = currentRating - minValue,
            percentCovered = (ratingDiff/options.maxValue)*100;

        var colorOpts  = options.multiColor || {},
            startColor = colorOpts.startColor || MULTICOLOR_OPTIONS.startColor,
            endColor   = colorOpts.endColor || MULTICOLOR_OPTIONS.endColor;

        newFill = getColor(startColor, endColor, percentCovered);
      } else {

        ratedFill = newFill;
      }

      options.ratedFill = newFill;

      var $svgs = (options.rtl ? $normalGroup : $ratedGroup).find("svg");

      $svgs.attr({fill: options.ratedFill});

      return $node;
    }

    function setRtl (newValue) {

      newValue = !!newValue;

      options.rtl = newValue;

      setNormalFill(options.normalFill);
      showRating();
    }

    function setMultiColor (colorOptions) {

      /*
       * called whenever one changes the `multiColor` option
       */

      options.multiColor = colorOptions;

      // set the recently set `ratedFill` option, if multiColor Options are unset
      setRatedFill(colorOptions ? colorOptions : ratedFill);
    }

    function setNumStars (newValue) {

      /*
       * Set the number of stars to use to display the rating, called whenever one
       * changes the `numStars` option
       */

      options.numStars = newValue;

      step = options.maxValue/options.numStars;

      $normalGroup.empty();
      $ratedGroup.empty();

      for (var i=0; i<options.numStars; i++) {

        $normalGroup.append($(options.starSvg || BASICSTAR));
        $ratedGroup.append($(options.starSvg || BASICSTAR));
      }

      setStarWidth(options.starWidth);
      setNormalFill(options.normalFill);
      setSpacing(options.spacing);

      showRating();

      return $node;
    }

    function setMaxValue (newValue) {

      /*
       * set the Maximum Value of rating to be allowed, called whenever
       * one changes the `maxValue` option
       */

      options.maxValue = newValue;

      step = options.maxValue/options.numStars;

      if (options.rating > newValue) {

        setRating(newValue);
      }

      showRating();

      return $node;
    }

    function setPrecision (newValue) {

      /*
       * Set the precision of the rating value, called if one changes the
       * `precision` option
       */

      options.precision = newValue;

      setRating(options.rating);

      return $node;
    }

    function setHalfStar (newValue) {

      /*
       * This function will be called if one changes the `halfStar` option
       */

      options.halfStar = newValue;

      return $node;
    }

    function setFullStar (newValue) {

      /*
       * This function will be called if one changes the `fullStar` option
       */

      options.fullStar = newValue;

      return $node;
    }

    function round (value) {

      /*
       * Rounds the value of rating if `halfStar` or `fullStar` options are chosen
       */

      var remainder = value%step,
          halfStep = step/2,
          isHalfStar = options.halfStar,
          isFullStar = options.fullStar;

      if (!isFullStar && !isHalfStar) {

        return value;
      }

      if (isFullStar || (isHalfStar && remainder > halfStep)) {

        value += step - remainder;
      } else {

        value = value - remainder;

        if (remainder > 0) {

          value += halfStep;
        }
      }

      return value;
    }

    function calculateRating (e) {

      /*
       * Calculates and returns the rating based on the position of cursor w.r.t the
       * plugin container
       */

      var position = $normalGroup.offset(),
          nodeStartX = position.left,
          nodeEndX = nodeStartX + $normalGroup.width();

      var maxValue = options.maxValue;

      // The x-coordinate(position) of the mouse pointer w.r.t page
      var pageX = e.pageX;

      var calculatedRating = 0;

      // If the mouse pointer is to the left of the container
      if(pageX < nodeStartX) {

        calculatedRating = minValue;
      }else if (pageX > nodeEndX) { // If the mouse pointer is right of the container

        calculatedRating = maxValue;
      }else { // If the mouse pointer is inside the continer

        /*
         * The fraction of width covered by the pointer w.r.t to the total width
         * of the container.
         */
        var calcPrcnt = ((pageX - nodeStartX)/(nodeEndX - nodeStartX));

        if (spacing > 0) {

	  /*
           * If there is spacing between stars, take the percentage of width covered
           * and subtract the percentage of width covered by stars and spacing, to find
           * how many stars are covered, the number of stars covered is the rating
           *
           * TODO: I strongly feel that this logic can be improved!, Please help!
           */
          calcPrcnt *= 100;

          var remPrcnt = calcPrcnt;

          while (remPrcnt > 0) {

            if (remPrcnt > percentOfStar) {

              calculatedRating += step;
              remPrcnt -= (percentOfStar + percentOfSpacing);
            } else {

              calculatedRating += remPrcnt/percentOfStar*step;
              remPrcnt = 0;
            }
          }
        } else {

          /*
           * If there is not spacing between stars, the fraction of width covered per
           * `maxValue` is the rating
           */
          calculatedRating = calcPrcnt * (options.maxValue);
        }

        // Round the rating if `halfStar` or `fullStar` options are chosen
        calculatedRating = round(calculatedRating);
      }

      if (options.rtl) {

        calculatedRating = maxValue - calculatedRating;
      }

      return calculatedRating;
    }

    function setReadOnly (newValue) {

      /*
       * UnBinds mouse event handlers, called when whenever one changes the
       * `readOnly` option
       */

      options.readOnly = newValue;

      $node.attr("readonly", true);

      unbindEvents();

      if (!newValue) {

        $node.removeAttr("readonly");

        bindEvents();
      }

      return $node;
    }

    function setRating (newValue) {

      /*
       * Sets the rating of the Plugin, Called when option `rating` is changed
       * or, when `rating` method is called
       */

      var rating = newValue;

      var maxValue = options.maxValue;

      if (typeof rating === "string") {

        // If rating is given in percentage, maxValue should be 100
        if (rating[rating.length - 1] === "%") {

          rating = rating.substr(0, rating.length - 1);
          maxValue = 100;

          setMaxValue(maxValue);
        }

        rating = parseFloat(rating);
      }

      checkBounds(rating, minValue, maxValue);

      rating = parseFloat(rating.toFixed(options.precision));

      checkPrecision(parseFloat(rating), minValue, maxValue);

      options.rating = rating;

      showRating();

      if (isInitialized) {

        $node.trigger("rateyo.set", {rating: rating});
      }

      return $node;
    }

    function setOnInit (method) {

      /*
       * set what method to be called on Initialization
       */

      options.onInit = method;

      return $node;
    }

    function setOnSet (method) {

      /*
       * set what method to be called when rating is set
       */

      options.onSet = method;

      return $node;
    }

    function setOnChange (method) {

      /*
       * set what method to be called rating in the UI is changed
       */

      options.onChange = method;

      return $node;
    }

    this.rating = function (newValue) {

      /*
       * rating getter/setter
       */

      if (!isDefined(newValue)) {

        return options.rating;
      }

      setRating(newValue);

      return $node;
    };

    this.destroy = function () {

      /*
       * Removes the Rating UI by clearing the content, and removing the custom classes
       */

      if (!options.readOnly) {

        unbindEvents();
      }

      RateYo.prototype.collection = deleteInstance($node.get(0),
                                                   this.collection);

      $node.removeClass("jq-ry-container").children().remove();

      return $node;
    };

    this.method = function (methodName) {

      /*
       * Method to call the methods of RateYo Instance
       */

      if (!methodName) {

        throw Error("Method name not specified!");
      }

      if (!isDefined(this[methodName])) {

        throw Error("Method " + methodName + " doesn't exist!");
      }

      var args = Array.prototype.slice.apply(arguments, []),
          params = args.slice(1),
          method = this[methodName];

      return method.apply(this, params);
    };

    this.option = function (optionName, param) {

      /*
       * Method to get/set Options
       */

      if (!isDefined(optionName)) {

        return options;
      }

      var method;

      switch (optionName) {

        case "starWidth":

          method = setStarWidth;
          break;
        case "numStars":

          method = setNumStars;
          break;
        case "normalFill":

          method = setNormalFill;
          break;
        case "ratedFill":

          method = setRatedFill;
          break;
        case "multiColor":

          method = setMultiColor;
          break;
        case "maxValue":

          method = setMaxValue;
          break;
        case "precision":

          method = setPrecision;
          break;
        case "rating":

          method = setRating;
          break;
        case "halfStar":

          method = setHalfStar;
          break;
        case "fullStar":

          method = setFullStar;
          break;
        case "readOnly":

          method = setReadOnly;
          break;
        case "spacing":

          method = setSpacing;
          break;
	case "rtl":

          method = setRtl;
	  break;
        case "onInit":

          method = setOnInit;
          break;
        case "onSet":

          method = setOnSet;
          break;
        case "onChange":

          method = setOnChange;
          break;
        default:

          throw Error("No such option as " + optionName);
      }

      return isDefined(param) ? method(param) : options[optionName];
    };

    function onMouseEnter (e) {

      /*
       * If the Mouse Pointer is inside the container, calculate and show the rating
       * in UI
       */

      var rating = calculateRating(e).toFixed(options.precision);

      var maxValue = options.maxValue;

      rating = checkPrecision(parseFloat(rating), minValue, maxValue);

      showRating(rating);

      $node.trigger("rateyo.change", {rating: rating});
    }

    function onMouseLeave () {
      if (isMobileBrowser()) {
        return;
      }

      /*
       * If mouse leaves, revert the rating in UI to previously set rating,
       * when empty value is passed to showRating, it will take the previously set
       * rating
       */

      showRating();

      $node.trigger("rateyo.change", {rating: options.rating});
    }

    function onMouseClick (e) {

      /*
       * On clicking the mouse inside the container, calculate and set the rating
       */

      var resultantRating = calculateRating(e).toFixed(options.precision);
      resultantRating = parseFloat(resultantRating);

      that.rating(resultantRating);
    }

    function onInit(e, data) {

      if(options.onInit && typeof options.onInit === "function") {

        /* jshint validthis:true */
        options.onInit.apply(this, [data.rating, that]);
      }
    }

    function onChange (e, data) {

      if(options.onChange && typeof options.onChange === "function") {

        /* jshint validthis:true */
        options.onChange.apply(this, [data.rating, that]);
      }
    }

    function onSet (e, data) {

      if(options.onSet && typeof options.onSet === "function") {

        /* jshint validthis:true */
        options.onSet.apply(this, [data.rating, that]);
      }
    }

    function bindEvents () {

      $node.on("mousemove", onMouseEnter)
           .on("mouseenter", onMouseEnter)
           .on("mouseleave", onMouseLeave)
           .on("click", onMouseClick)
           .on("rateyo.init", onInit)
           .on("rateyo.change", onChange)
           .on("rateyo.set", onSet);
    }

    function unbindEvents () {

      $node.off("mousemove", onMouseEnter)
           .off("mouseenter", onMouseEnter)
           .off("mouseleave", onMouseLeave)
           .off("click", onMouseClick)
           .off("rateyo.init", onInit)
           .off("rateyo.change", onChange)
           .off("rateyo.set", onSet);
    }

    setNumStars(options.numStars);
    setReadOnly(options.readOnly);

    if (options.rtl) {

      setRtl(options.rtl);
    }

    this.collection.push(this);
    this.rating(options.rating, true);

    isInitialized = true;
    $node.trigger("rateyo.init", {rating: options.rating});
  }

  RateYo.prototype.collection = [];

  function getInstance (node, collection) {

    /*
     * Given a HTML element (node) and a collection of RateYo instances,
     * this function will search through the collection and return the matched
     * instance having the node
     */

    var instance;

    $.each(collection, function () {

      if(node === this.node){

        instance = this;
        return false;
      }
    });

    return instance;
  }

  function deleteInstance (node, collection) {

    /*
     * Given a HTML element (node) and a collection of RateYo instances,
     * this function will search through the collection and delete the
     * instance having the node, and return the modified collection
     */

    $.each(collection, function (index) {

      if (node === this.node) {

        var firstPart = collection.slice(0, index),
            secondPart = collection.slice(index+1, collection.length);

        collection = firstPart.concat(secondPart);

        return false;
      }
    });

    return collection;
  }

  function _rateYo (options) {

    var rateYoInstances = RateYo.prototype.collection;

    /* jshint validthis:true */
    var $nodes = $(this);

    if($nodes.length === 0) {

      return $nodes;
    }

    var args = Array.prototype.slice.apply(arguments, []);

    if (args.length === 0) {

      //If args length is 0, Initialize the UI with default settings
      options = args[0] = {};
    }else if (args.length === 1 && typeof args[0] === "object") {

      //If an Object is specified as first argument, it is considered as options
      options = args[0];
    }else if (args.length >= 1 && typeof args[0] === "string") {

      /*
       * if there is only one argument, and if its a string, it is supposed to be a
       * method name, if more than one argument is specified, the remaining arguments
       * except the first argument, will be passed as a params to the specified method
       */

      var methodName = args[0],
          params = args.slice(1);

      var result = [];

      $.each($nodes, function (i, node) {

        var existingInstance = getInstance(node, rateYoInstances);

        if(!existingInstance) {

          throw Error("Trying to set options before even initialization");
        }

        var method = existingInstance[methodName];

        if (!method) {

          throw Error("Method " + methodName + " does not exist!");
        }

        var returnVal = method.apply(existingInstance, params);

        result.push(returnVal);
      });

      /*
       * If the plugin in being called on only one jQuery Element, return only the
       * first value, to support chaining.
       */
      result = result.length === 1? result[0]: result;

      return result;
    }else {

      throw Error("Invalid Arguments");
    }

    /*
     * if only options are passed, extend default options, and if the plugin is not
     * initialized on a particular jQuery element, initalize RateYo on it
     */
    options = $.extend({}, DEFAULTS, options);

    return $.each($nodes, function () {

               var existingInstance = getInstance(this, rateYoInstances);

               if (!existingInstance) {

                 return new RateYo($(this), $.extend({}, options));
               }
           });
  }

  function rateYo () {

    /* jshint validthis:true */
    return _rateYo.apply(this, Array.prototype.slice.apply(arguments, []));
  }

  window.RateYo = RateYo;
  $.fn.rateYo = rateYo;

}(window.jQuery));

//E:\sites\laitec\-dev\src\js\single\comment.js


      $(function () {

        var rating = 1.6;

        $(".counter").text(rating);

        // $("#rateYo1").on("rateyo.init", function () { console.log("rateyo.init"); });

        $("#rateYo1").rateYo({
          rating: rating,
          numStars: 5,
          precision: 2,
          starWidth: "64px",
          spacing: "5px",
	  rtl: true,
          multiColor: {

            startColor: "#000000",
            endColor  : "#ffffff"
          },
          // onInit: function () {
          //
          //   console.log("On Init");
          // },
          // onSet: function () {
          //
          //   console.log("On Set");
          // }
        })
        // .on("rateyo.set", function () { console.log("rateyo.set"); })
        //   .on("rateyo.change", function () { console.log("rateyo.change"); });

        $(".rateyo").rateYo();

        $(".rateyo-readonly-widg").rateYo({

          rating: rating,
          numStars: 5,
          precision: 2,
          minValue: 1,
          maxValue: 5
        }).on("rateyo.change", function (e, data) {
          $(".countRating").text(data.rating);
        });
      });

//E:\sites\laitec\-dev\src\js\single\magiczoom.js

/*


   Magic Zoom  v5.2.1 DEMO
   Copyright 2016 Magic Toolbox
   Buy a license: https://www.magictoolbox.com/magiczoom/
   License agreement: https://www.magictoolbox.com/license/


*/
eval(function(m,a,g,i,c,k){c=function(e){return(e<a?'':c(parseInt(e/a)))+((e=e%a)>35?String.fromCharCode(e+29):e.toString(36))};if(!''.replace(/^/,String)){while(g--){k[c(g)]=i[g]||c(g)}i=[function(e){return k[e]}];c=function(){return'\\w+'};g=1};while(g--){if(i[g]){m=m.replace(new RegExp('\\b'+c(g)+'\\b','g'),i[g])}}return m}('1i.a4=(17(){1c x,z;x=z=(17(){1c T={49:"fh.3-b5",bl:0,7j:{},$9x:17(X){1a(X.$59||(X.$59=++N.bl))},81:17(X){1a(N.7j[X]||(N.7j[X]={}))},$F:17(){},$1j:17(){1a 1j},$1t:17(){1a 1t},cI:"cO-"+1n.5f(1n.65()*1z 97().be()),3e:17(X){1a(2s!=X)},8W:17(Y,X){1a(2s!=Y)?Y:X},7U:17(X){1a!!(X)},1K:17(X){if(!N.3e(X)){1a 1j}if(X.$3U){1a X.$3U}if(!!X.5e){if(1==X.5e){1a"5U"}if(3==X.5e){1a"aS"}}if(X.1H&&X.bO){1a"f3"}if(X.1H&&X.8m){1a"1U"}if((X 4u 1i.64||X 4u 1i.aA)&&X.4B===N.3l){1a"4b"}if(X 4u 1i.5r){1a"3H"}if(X 4u 1i.aA){1a"17"}if(X 4u 1i.89){1a"1S"}if(N.1f.4k){if(N.3e(X.du)){1a"1w"}}1m{if(X===1i.1w||X.4B==1i.1s||X.4B==1i.db||X.4B==1i.fR||X.4B==1i.fQ||X.4B==1i.g2){1a"1w"}}if(X 4u 1i.97){1a"e5"}if(X 4u 1i.cD){1a"fC"}if(X===1i){1a"1i"}if(X===1k){1a"1k"}1a 7D(X)},1W:17(ac,ab){if(!(ac 4u 1i.5r)){ac=[ac]}if(!ab){1a ac[0]}1L(1c aa=0,Y=ac.1H;aa<Y;aa++){if(!N.3e(ac)){7w}1L(1c Z in ab){if(!64.2v.3v.27(ab,Z)){7w}2Y{ac[aa][Z]=ab[Z]}3h(X){}}}1a ac[0]},7H:17(ab,aa){if(!(ab 4u 1i.5r)){ab=[ab]}1L(1c Z=0,X=ab.1H;Z<X;Z++){if(!N.3e(ab[Z])){7w}if(!ab[Z].2v){7w}1L(1c Y in(aa||{})){if(!ab[Z].2v[Y]){ab[Z].2v[Y]=aa[Y]}}}1a ab[0]},b1:17(Z,Y){if(!N.3e(Z)){1a Z}1L(1c X in(Y||{})){if(!Z[X]){Z[X]=Y[X]}}1a Z},$2Y:17(){1L(1c Y=0,X=1U.1H;Y<X;Y++){2Y{1a 1U[Y]()}3h(Z){}}1a 1h},$A:17(Z){if(!N.3e(Z)){1a N.$([])}if(Z.bQ){1a N.$(Z.bQ())}if(Z.bO){1c Y=Z.1H||0,X=1z 5r(Y);5x(Y--){X[Y]=Z[Y]}1a N.$(X)}1a N.$(5r.2v.9h.27(Z))},5t:17(){1a 1z 97().be()},3M:17(ab){1c Z;4n(N.1K(ab)){1A"74":Z={};1L(1c aa in ab){Z[aa]=N.3M(ab[aa])}1B;1A"3H":Z=[];1L(1c Y=0,X=ab.1H;Y<X;Y++){Z[Y]=N.3M(ab[Y])}1B;1X:1a ab}1a N.$(Z)},$:17(Z){1c X=1t;if(!N.3e(Z)){1a 1h}if(Z.$9s){1a Z}4n(N.1K(Z)){1A"3H":Z=N.b1(Z,N.1W(N.5r,{$9s:N.$F}));Z.3o=Z.d4;1a Z;1B;1A"1S":1c Y=1k.e3(Z);if(N.3e(Y)){1a N.$(Y)}1a 1h;1B;1A"1i":1A"1k":N.$9x(Z);Z=N.1W(Z,N.3i);1B;1A"5U":N.$9x(Z);Z=N.1W(Z,N.3z);1B;1A"1w":Z=N.1W(Z,N.1s);1B;1A"aS":1A"17":1A"3H":1A"e5":1X:X=1j;1B}if(X){1a N.1W(Z,{$9s:N.$F})}1m{1a Z}},$1z:17(X,Z,Y){1a N.$(N.bL.7m(X)).7Z(Z||{}).1E(Y||{})},5N:17(Y,aa,ae){1c ab,Z,ac,ad=[],X=-1;ae||(ae=N.cI);ab=N.$(ae)||N.$1z("2f",{id:ae,1x:"9w/5G"}).2O((1k.hV||1k.3u),"1C");Z=ab.cf||ab.df;if("1S"!=N.1K(aa)){1L(1c ac in aa){ad.3j(ac+":"+aa[ac])}aa=ad.6g(";")}if(Z.c3){X=Z.c3(Y+" {"+aa+"}",Z.hL.1H)}1m{X=Z.hX(Y,aa)}1a X},i9:17(aa,X){1c Z,Y;Z=N.$(aa);if("5U"!==N.1K(Z)){1a}Y=Z.cf||Z.df;if(Y.d9){Y.d9(X)}1m{if(Y.dr){Y.dr(X)}}},hl:17(){1a"hm-hn-hi-hh-he".3P(/[hf]/g,17(Z){1c Y=1n.65()*16|0,X=Z=="x"?Y:(Y&3|8);1a X.7p(16)}).6F()},5n:(17(){1c X;1a 17(Y){if(!X){X=1k.7m("a")}X.4s("6X",Y);1a("!!"+X.6X).3P("!!","")}})(),hp:17(Z){1c aa=0,X=Z.1H;1L(1c Y=0;Y<X;++Y){aa=31*aa+Z.dD(Y);aa%=hq}1a aa}};1c N=T;1c O=T.$;if(!1i.cN){1i.cN=T;1i.$cO=T.$}N.5r={$3U:"3H",4c:17(aa,ab){1c X=13.1H;1L(1c Y=13.1H,Z=(ab<0)?1n.1Z(0,Y+ab):ab||0;Z<Y;Z++){if(13[Z]===aa){1a Z}}1a-1},4M:17(X,Y){1a 13.4c(X,Y)!=-1},d4:17(X,aa){1L(1c Z=0,Y=13.1H;Z<Y;Z++){if(Z in 13){X.27(aa,13[Z],Z,13)}}},33:17(X,ac){1c ab=[];1L(1c aa=0,Y=13.1H;aa<Y;aa++){if(aa in 13){1c Z=13[aa];if(X.27(ac,13[aa],aa,13)){ab.3j(Z)}}}1a ab},hy:17(X,ab){1c aa=[];1L(1c Z=0,Y=13.1H;Z<Y;Z++){if(Z in 13){aa[Z]=X.27(ab,13[Z],Z,13)}}1a aa}};N.7H(89,{$3U:"1S",4r:17(){1a 13.3P(/^\\s+|\\s+$/g,"")},eq:17(X,Y){1a(Y||1j)?(13.7p()===X.7p()):(13.4t().7p()===X.4t().7p())},4P:17(){1a 13.3P(/-\\D/g,17(X){1a X.7G(1).6F()})},7Y:17(){1a 13.3P(/[A-Z]/g,17(X){1a("-"+X.7G(0).4t())})},hr:17(X){1a 5V(13,X||10)},ht:17(){1a 2g(13)},bW:17(){1a!13.3P(/1t/i,"").4r()},4y:17(Y,X){X=X||"";1a(X+13+X).4c(X+Y+X)>-1}});T.7H(aA,{$3U:"17",1G:17(){1c Y=N.$A(1U),X=13,Z=Y.5J();1a 17(){1a X.5z(Z||1h,Y.4K(N.$A(1U)))}},2X:17(){1c Y=N.$A(1U),X=13,Z=Y.5J();1a 17(aa){1a X.5z(Z||1h,N.$([aa||(N.1f.2I?1i.1w:1h)]).4K(Y))}},2G:17(){1c Y=N.$A(1U),X=13,Z=Y.5J();1a 1i.51(17(){1a X.5z(X,Y)},Z||0)},aU:17(){1c Y=N.$A(1U),X=13;1a 17(){1a X.2G.5z(X,Y)}},aX:17(){1c Y=N.$A(1U),X=13,Z=Y.5J();1a 1i.dJ(17(){1a X.5z(X,Y)},Z||0)}});1c U={},M=2i.hw.4t(),L=M.3g(/(3w|5M|4k|9T)\\/(\\d+\\.?\\d*)/i),Q=M.3g(/(hu|9B)\\/(\\d+\\.?\\d*)/i)||M.3g(/(cR|5S|cT|bp|6s|9B)\\/(\\d+\\.?\\d*)/i),S=M.3g(/49\\/(\\d+\\.?\\d*)/i),H=1k.4A.2f;17 I(Y){1c X=Y.7G(0).6F()+Y.9h(1);1a Y in H||("dk"+X)in H||("d6"+X)in H||("6h"+X)in H||("O"+X)in H}N.1f={2J:{hs:!!(1k.hx),hD:!!(1i.aq),cE:!!(1k.dV),5Z:!!(1k.hE||1k.hC||1k.8K||1k.cb||1k.hB||1k.hg||1k.hd||1k.hb||1k.hc),aY:!!(1i.ho)&&!!(1i.hj)&&(1i.8u&&"hk"in 1z 8u),2t:I("2t"),2C:I("2C"),88:I("88"),dc:I("dc"),4o:1j,d2:1j,8O:1j,aM:1j,8y:(17(){1a 1k.hG.i3("i0://hY.hZ.i4/i5/ia/ib#hH","1.1")})()},9l:17(){1a"hO"in 1i||(1i.ca&&1k 4u ca)||(2i.hT>0)||(2i.hR>0)}(),3f:M.3g(/(6N|bb\\d+|gz).+|g6|g7\\/|gj|gi|gC|gW|h0|gS|gE|ip(bN|b8|ad)|gR|jK|jP |jL|kl|jW|3f.+bp|jV|6s m(jT|in)i|jU( jZ)?|bX|p(k0|k6)\\/|k7|k4|k3|k2(4|6)0|iD|iC|iH\\.(1f|4a)|iK|iy|im (ce|bX)|ix|iu/)?1t:1j,6U:(L&&L[1])?L[1].4t():(1i.6s)?"9T":!!(1i.j9)?"4k":(2s!==1k.jh||1h!=1i.jg)?"5M":(1h!==1i.je||!2i.jf)?"3w":"iS",49:(L&&L[2])?2g(L[2]):0,4R:(Q&&Q[1])?Q[1].4t():"",7b:(Q&&Q[2])?2g(Q[2]):0,dj:"",9o:"",4p:"",2I:0,5A:M.3g(/ip(?:ad|b8|bN)/)?"bd":(M.3g(/(?:fI|6N)/)||2i.5A.3g(/bn|8w|fJ/i)||["g0"])[0].4t(),dq:1k.8G&&"bZ"==1k.8G.4t(),d1:0,3T:17(){1a(1k.8G&&"bZ"==1k.8G.4t())?1k.3u:1k.4A},4o:1i.4o||1i.eN||1i.gY||1i.eF||1i.eG||2s,8l:1i.8l||1i.cY||1i.cY||1i.eB||1i.ew||1i.ev||2s,2p:1j,6p:17(){if(N.1f.2p){1a}1c aa,Z;N.1f.2p=1t;N.3u=N.$(1k.3u);N.8w=N.$(1i);2Y{1c Y=N.$1z("3C").1E({1e:2E,1g:2E,6K:"8s",2b:"4W",1C:-ey}).2O(1k.3u);N.1f.d1=Y.dz-Y.dI;Y.2U()}3h(X){}2Y{aa=N.$1z("3C");Z=aa.2f;Z.cP="d3:2c(as://),2c(as://),ez 2c(as://)";N.1f.2J.d2=(/(2c\\s*\\(.*?){3}/).2Z(Z.d3);Z=1h;aa=1h}3h(X){}if(!N.1f.cW){N.1f.cW=N.8e("2C").7Y()}2Y{aa=N.$1z("3C");aa.2f.cP=N.8e("33").7Y()+":dt(eS);";N.1f.2J.8O=!!aa.2f.1H&&(!N.1f.2I||N.1f.2I>9);aa=1h}3h(X){}if(!N.1f.2J.8O){N.$(1k.4A).1P("79-eM-3d")}2Y{N.1f.2J.aM=(17(){1c ab=N.$1z("aM");1a!!(ab.cQ&&ab.cQ("2d"))})()}3h(X){}if(2s===1i.eO&&2s!==1i.eQ){U.3q="eP"}N.3i.2K.27(N.$(1k),"8b")}};(17(){1c ac=[],ab,aa,Y;17 X(){1a!!(1U.8m.aB)}4n(N.1f.6U){1A"4k":if(!N.1f.49){N.1f.49=!!(1i.8u)?3:2}1B;1A"5M":N.1f.49=(Q&&Q[2])?2g(Q[2]):0;1B}N.1f[N.1f.6U]=1t;if(Q&&"cR"===Q[1]){N.1f.4R="5S"}if(!!1i.5S){N.1f.5S=1t}if(Q&&"9B"===Q[1]){N.1f.4R="6s";N.1f.6s=1t}if("cT"===N.1f.4R&&(S&&S[1])){N.1f.7b=2g(S[1])}if("6N"==N.1f.5A&&N.1f.3w&&(S&&S[1])){N.1f.7l=1t}ab=({5M:["-d7-","d6","d7"],3w:["-3w-","dk","3w"],4k:["-6h-","6h","6h"],9T:["-o-","O","o"]})[N.1f.6U]||["","",""];N.1f.dj=ab[0];N.1f.9o=ab[1];N.1f.4p=ab[2];N.1f.2I=(!N.1f.4k)?2s:(1k.dn)?1k.dn:17(){1c ad=0;if(N.1f.dq){1a 5}4n(N.1f.49){1A 2:ad=6;1B;1A 3:ad=7;1B}1a ad}();ac.3j(N.1f.5A+"-3d");if(N.1f.3f){ac.3j("3f-3d")}if(N.1f.7l){ac.3j("6N-1f-3d")}if(N.1f.2I){N.1f.4R="ie";N.1f.7b=N.1f.2I;ac.3j("ie"+N.1f.2I+"-3d");1L(aa=11;aa>N.1f.2I;aa--){ac.3j("er-ie"+aa+"-3d")}}if(N.1f.3w&&N.1f.49<fH){N.1f.2J.5Z=1j}if(N.1f.4o){N.1f.4o.27(1i,17(){N.1f.2J.4o=1t})}if(N.1f.2J.8y){ac.3j("8y-3d")}1m{ac.3j("79-8y-3d")}Y=(1k.4A.5F||"").3g(/\\S+/g)||[];1k.4A.5F=N.$(Y).4K(ac).6g(" ");2Y{1k.4A.4s("3I-3d-cK",N.1f.4R);1k.4A.4s("3I-3d-cK-fF",N.1f.7b)}3h(Z){}if(N.1f.2I&&N.1f.2I<9){1k.7m("5l");1k.7m("fA")}})();(17(){N.1f.5Z={8Y:N.1f.2J.5Z,4V:17(){1a!!(1k.fz||1k[N.1f.4p+"fB"]||1k.5Z||1k.fD||1k[N.1f.4p+"fX"])},dH:17(X,Y){Y||(Y={});if(13.8Y){N.$(1k).1D(13.ap,13.cd=17(Z){if(13.4V()){Y.cg&&Y.cg()}1m{N.$(1k).1Q(13.ap,13.cd);Y.cm&&Y.cm()}}.2X(13));N.$(1k).1D(13.9M,13.5o=17(Z){Y.8z&&Y.8z();N.$(1k).1Q(13.9M,13.5o)}.2X(13));(X[N.1f.4p+"fU"]||X[N.1f.4p+"fT"]||X.fx||17(){}).27(X)}1m{if(Y.8z){Y.8z()}}},fb:(1k.8K||1k.cb||1k[N.1f.4p+"fd"]||1k[N.1f.4p+"f8"]||17(){}).1G(1k),ap:1k.c7?"f1":(1k.8K?"":N.1f.4p)+"f0",9M:1k.c7?"f5":(1k.8K?"":N.1f.4p)+"fg",fs:N.1f.4p,fw:1h}})();1c W=/\\S+/g,K=/^(3p(cA|ct|cq|cp)fi)|((6f|cu)(cA|ct|cq|cp))$/,P={"fj":("2s"===7D(H.cv))?"fo":"cv"},R={cy:1t,fm:1t,2B:1t,cs:1t,1l:1t},J=(1i.cx)?17(Z,X){1c Y=1i.cx(Z,1h);1a Y?Y.fE(X)||Y[X]:1h}:17(aa,Y){1c Z=aa.fl,X=1h;X=Z?Z[Y]:1h;if(1h==X&&aa.2f&&aa.2f[Y]){X=aa.2f[Y]}1a X};17 V(Z){1c X,Y;Y=(N.1f.3w&&"33"==Z)?1j:(Z in H);if(!Y){X=N.1f.9o+Z.7G(0).6F()+Z.9h(1);if(X in H){1a X}}1a Z}N.8e=V;N.3z={c1:17(X){1a!(X||"").4y(" ")&&(13.5F||"").4y(X," ")},1P:17(ab){1c Y=(13.5F||"").3g(W)||[],aa=(ab||"").3g(W)||[],X=aa.1H,Z=0;1L(;Z<X;Z++){if(!N.$(Y).4M(aa[Z])){Y.3j(aa[Z])}}13.5F=Y.6g(" ");1a 13},2a:17(ac){1c Y=(13.5F||"").3g(W)||[],ab=(ac||"").3g(W)||[],X=ab.1H,aa=0,Z;1L(;aa<X;aa++){if((Z=N.$(Y).4c(ab[aa]))>-1){Y.80(Z,1)}}13.5F=ac?Y.6g(" "):"";1a 13},fq:17(X){1a 13.c1(X)?13.2a(X):13.1P(X)},36:17(Y){1c Z=Y.4P(),X=1h;Y=P[Z]||(P[Z]=V(Z));X=J(13,Y);if("2u"===X){X=1h}if(1h!==X){if("2B"==Y){1a N.3e(X)?2g(X):1}if(K.2Z(Y)){X=5V(X,10)?X:"6v"}}1a X},66:17(Y,X){1c aa=Y.4P();2Y{if("2B"==Y){13.dR(X);1a 13}Y=P[aa]||(P[aa]=V(aa));13.2f[Y]=X+(("5d"==N.1K(X)&&!R[aa])?"2N":"")}3h(Z){}1a 13},1E:17(Y){1L(1c X in Y){13.66(X,Y[X])}1a 13},fu:17(){1c X={};N.$A(1U).3o(17(Y){X[Y]=13.36(Y)},13);1a X},dR:17(Z,X){1c Y;X=X||1j;13.2f.2B=Z;Z=5V(2g(Z)*2E);if(X){if(0===Z){if("3S"!=13.2f.4w){13.2f.4w="3S"}}1m{if("76"!=13.2f.4w){13.2f.4w="76"}}}if(N.1f.2I&&N.1f.2I<9){if(!83(Z)){if(!~13.2f.33.4c("9q")){13.2f.33+=" dC:dE.dS.9q(8A="+Z+")"}1m{13.2f.33=13.2f.33.3P(/8A=\\d*/i,"8A="+Z)}}1m{13.2f.33=13.2f.33.3P(/dC:dE.dS.9q\\(8A=\\d*\\)/i,"").4r();if(""===13.2f.33){13.2f.57("33")}}}1a 13},7Z:17(X){1L(1c Y in X){if("4b"===Y){13.1P(""+X[Y])}1m{13.4s(Y,""+X[Y])}}1a 13},f6:17(){1c Y=0,X=0;Y=13.36("2t-4S");X=13.36("2t-9A");Y=Y.4c("6h")>-1?2g(Y):Y.4c("s")>-1?2g(Y)*aP:0;X=X.4c("6h")>-1?2g(X):X.4c("s")>-1?2g(X)*aP:0;1a Y+X},4l:17(){1a 13.1E({5u:"2Q",4w:"3S"})},6d:17(){1a 13.1E({5u:"",4w:"76"})},1O:17(){1a{1e:13.dz,1g:13.f4}},am:17(Y){1c X=13.1O();X.1e-=(2g(13.36("3p-1I-1e")||0)+2g(13.36("3p-2z-1e")||0));X.1g-=(2g(13.36("3p-1C-1e")||0)+2g(13.36("3p-2H-1e")||0));if(!Y){X.1e-=(2g(13.36("6f-1I")||0)+2g(13.36("6f-2z")||0));X.1g-=(2g(13.36("6f-1C")||0)+2g(13.36("6f-2H")||0))}1a X},6o:17(){1a{1C:13.7B,1I:13.7d}},f2:17(){1c X=13,Y={1C:0,1I:0};do{Y.1I+=X.7d||0;Y.1C+=X.7B||0;X=X.5b}5x(X);1a Y},dP:17(){1c ab=13,Y=0,aa=0;if(N.3e(1k.4A.7C)){1c X=13.7C(),Z=N.$(1k).6o(),ac=N.1f.3T();1a{1C:X.1C+Z.y-ac.f7,1I:X.1I+Z.x-ac.fe}}do{Y+=ab.fa||0;aa+=ab.fy||0;ab=ab.fS}5x(ab&&!(/^(?:3u|aE)$/i).2Z(ab.8Q));1a{1C:aa,1I:Y}},7f:17(){1c Y=13.dP();1c X=13.1O();1a{1C:Y.1C,2H:Y.1C+X.1g,1I:Y.1I,2z:Y.1I+X.1e}},6a:17(Y){2Y{13.fG=Y}3h(X){13.fL=Y}1a 13},2U:17(){1a(13.5b)?13.5b.9f(13):13},5R:17(){N.$A(13.fM).3o(17(X){if(3==X.5e||8==X.5e){1a}N.$(X).5R()});13.2U();13.9X();if(13.$59){N.7j[13.$59]=1h;4T N.7j[13.$59]}1a 1h},3t:17(Z,Y){Y=Y||"2H";1c X=13.40;("1C"==Y&&X)?13.fK(Z,X):13.g3(Z);1a 13},2O:17(Z,Y){1c X=N.$(Z).3t(13,Y);1a 13},dU:17(X){13.3t(X.5b.eX(13,X));1a 13},9V:17(X){if("5U"!==N.1K("1S"==N.1K(X)?X=1k.e3(X):X)){1a 1j}1a(13==X)?1j:(13.4M&&!(N.1f.dM))?(13.4M(X)):(13.dB)?!!(13.dB(X)&16):N.$A(13.6Z(X.8Q)).4M(X)}};N.3z.em=N.3z.36;N.3z.en=N.3z.1E;if(!1i.3z){1i.3z=N.$F;if(N.1f.6U.3w){1i.1k.7m("ef")}1i.3z.2v=(N.1f.6U.3w)?1i["[[ep.2v]]"]:{}}N.7H(1i.3z,{$3U:"5U"});N.3i={1O:17(){if(N.1f.9l||N.1f.et||N.1f.dM){1a{1e:1i.4G,1g:1i.4d}}1a{1e:N.1f.3T().dI,1g:N.1f.3T().ed}},6o:17(){1a{x:1i.e9||N.1f.3T().7d,y:1i.eb||N.1f.3T().7B}},ei:17(){1c X=13.1O();1a{1e:1n.1Z(N.1f.3T().eL,X.1e),1g:1n.1Z(N.1f.3T().eR,X.1g)}}};N.1W(1k,{$3U:"1k"});N.1W(1i,{$3U:"1i"});N.1W([N.3z,N.3i],{24:17(aa,Y){1c X=N.81(13.$59),Z=X[aa];if(2s!==Y&&2s===Z){Z=X[aa]=Y}1a(N.3e(Z)?Z:1h)},2T:17(Z,Y){1c X=N.81(13.$59);X[Z]=Y;1a 13},2R:17(Y){1c X=N.81(13.$59);4T X[Y];1a 13}});if(!(1i.8R&&1i.8R.2v&&1i.8R.2v.93)){N.1W([N.3z,N.3i],{93:17(X){1a N.$A(13.aQ("*")).33(17(Z){2Y{1a(1==Z.5e&&Z.5F.4y(X," "))}3h(Y){}})}})}N.1W([N.3z,N.3i],{a8:17(){1a 13.93(1U[0])},6Z:17(){1a 13.aQ(1U[0])}});if(N.1f.5Z.8Y&&!1k.dN){N.3z.dN=17(){N.1f.5Z.dH(13)}}N.1s={$3U:"1w",5C:N.$1j,2M:17(){1a 13.4J().3r()},4J:17(){if(13.dw){13.dw()}1m{13.du=1t}1a 13},3r:17(){if(13.dA){13.dA()}1m{13.ff=1j}1a 13},5c:17(){13.5C=N.$1t;1a 13},6D:17(){1c Y,X;Y=((/3a/i).2Z(13.1x))?13.2w[0]:13;1a(!N.3e(Y))?{x:0,y:0}:{x:Y.2n,y:Y.2q}},5v:17(){1c Y,X;Y=((/3a/i).2Z(13.1x))?13.2w[0]:13;1a(!N.3e(Y))?{x:0,y:0}:{x:Y.4j||Y.2n+N.1f.3T().7d,y:Y.4h||Y.2q+N.1f.3T().7B}},9d:17(){1c X=13.3D||13.eD;5x(X&&3==X.5e){X=X.5b}1a X},7k:17(){1c Y=1h;4n(13.1x){1A"7T":1A"eI":1A"eH":Y=13.8j||13.eC;1B;1A"8B":1A"a5":1A"de":Y=13.8j||13.eA;1B;1X:1a Y}2Y{5x(Y&&3==Y.5e){Y=Y.5b}}3h(X){Y=1h}1a Y},62:17(){if(!13.aZ&&13.3B!==2s){1a(13.3B&1?1:(13.3B&2?3:(13.3B&4?2:0)))}1a 13.aZ},eU:17(){1a(13.29&&("3a"===13.29||13.29===13.4v))||(/3a/i).2Z(13.1x)},eV:17(){1a 13.29?(("3a"===13.29||13.4v===13.29)&&13.8P):1===13.2w.1H&&(13.5i.1H?13.5i[0].3n==13.2w[0].3n:1t)}};N.9j="b0";N.9r="eW";N.8C="";if(!1k.b0){N.9j="eu";N.9r="eY";N.8C="7e"}N.1s.1v={1x:"",x:1h,y:1h,2A:1h,3B:1h,3D:1h,8j:1h,$3U:"1w.3N",5C:N.$1j,5k:N.$([]),3E:17(X){1c Y=X;13.5k.3j(Y)},2M:17(){1a 13.4J().3r()},4J:17(){13.5k.3o(17(Y){2Y{Y.4J()}3h(X){}});1a 13},3r:17(){13.5k.3o(17(Y){2Y{Y.3r()}3h(X){}});1a 13},5c:17(){13.5C=N.$1t;1a 13},6D:17(){1a{x:13.2n,y:13.2q}},5v:17(){1a{x:13.x,y:13.y}},9d:17(){1a 13.3D},7k:17(){1a 13.8j},62:17(){1a 13.3B},ec:17(){1a 13.5k.1H>0?13.5k[0].9d():2s}};N.1W([N.3z,N.3i],{1D:17(Z,ab,ac,af){1c ae,X,aa,ad,Y;if("1S"==N.1K(Z)){Y=Z.7h(" ");if(Y.1H>1){Z=Y}}if(N.1K(Z)=="3H"){N.$(Z).3o(13.1D.2X(13,ab,ac,af));1a 13}if(!Z||!ab||N.1K(Z)!="1S"||N.1K(ab)!="17"){1a 13}if(Z=="8b"&&N.1f.2p){ab.27(13);1a 13}Z=U[Z]||Z;ac=5V(ac||50);if(!ab.$8o){ab.$8o=1n.5f(1n.65()*N.5t())}ae=N.3i.24.27(13,"7z",{});X=ae[Z];if(!X){ae[Z]=X=N.$([]);aa=13;if(N.1s.1v[Z]){N.1s.1v[Z].1F.4L.27(13,af)}1m{X.2W=17(ag){ag=N.1W(ag||1i.e,{$3U:"1w"});N.3i.2K.27(aa,Z,N.$(ag))};13[N.9j](N.8C+Z,X.2W,1j)}}ad={1x:Z,fn:ab,9u:ac,bM:ab.$8o};X.3j(ad);X.ek(17(ah,ag){1a ah.9u-ag.9u});1a 13},1Q:17(ad){1c ab=N.3i.24.27(13,"7z",{}),Z,X,Y,ae,ac,aa;ac=1U.1H>1?1U[1]:-2E;if("1S"==N.1K(ad)){aa=ad.7h(" ");if(aa.1H>1){ad=aa}}if(N.1K(ad)=="3H"){N.$(ad).3o(13.1Q.2X(13,ac));1a 13}ad=U[ad]||ad;if(!ad||N.1K(ad)!="1S"||!ab||!ab[ad]){1a 13}Z=ab[ad]||[];1L(Y=0;Y<Z.1H;Y++){X=Z[Y];if(-2E==ac||!!ac&&ac.$8o===X.bM){ae=Z.80(Y--,1)}}if(0===Z.1H){if(N.1s.1v[ad]){N.1s.1v[ad].1F.2U.27(13)}1m{13[N.9r](N.8C+ad,Z.2W,1j)}4T ab[ad]}1a 13},2K:17(ab,ad){1c aa=N.3i.24.27(13,"7z",{}),Z,X,Y;ab=U[ab]||ab;if(!ab||N.1K(ab)!="1S"||!aa||!aa[ab]){1a 13}2Y{ad=N.1W(ad||{},{1x:ab})}3h(ac){}if(2s===ad.2A){ad.2A=N.5t()}Z=aa[ab]||[];1L(Y=0;Y<Z.1H&&!(ad.5C&&ad.5C());Y++){Z[Y].fn.27(13,ad)}},da:17(Y,X){1c ab=("8b"==Y)?1j:1t,aa=13,Z;Y=U[Y]||Y;if(!ab){N.3i.2K.27(13,Y);1a 13}if(aa===1k&&1k.7E&&!aa.9p){aa=1k.4A}if(1k.7E){Z=1k.7E(Y);Z.6u(X,1t,1t)}1m{Z=1k.eZ();Z.7M=Y}if(1k.7E){aa.9p(Z)}1m{aa.fP("7e"+X,Z)}1a Z},9X:17(){1c Y=N.3i.24.27(13,"7z");if(!Y){1a 13}1L(1c X in Y){N.3i.1Q.27(13,X)}N.3i.2R.27(13,"7z");1a 13}});(17(X){if("7v"===1k.7u){1a X.1f.6p.2G(1)}if(X.1f.3w&&X.1f.49<fr){(17(){(X.$(["2e","7v"]).4M(1k.7u))?X.1f.6p():1U.8m.2G(50)})()}1m{if(X.1f.4k&&X.1f.2I<9&&1i==1C){(17(){(X.$2Y(17(){X.1f.3T().ft("1I");1a 1t}))?X.1f.6p():1U.8m.2G(50)})()}1m{X.3i.1D.27(X.$(1k),"fp",X.1f.6p);X.3i.1D.27(X.$(1i),"69",X.1f.6p)}}})(T);N.3l=17(){1c ab=1h,Y=N.$A(1U);if("4b"==N.1K(Y[0])){ab=Y.5J()}1c X=17(){1L(1c ae in 13){13[ae]=N.3M(13[ae])}if(13.4B.$3X){13.$3X={};1c ag=13.4B.$3X;1L(1c af in ag){1c ad=ag[af];4n(N.1K(ad)){1A"17":13.$3X[af]=N.3l.bt(13,ad);1B;1A"74":13.$3X[af]=N.3M(ad);1B;1A"3H":13.$3X[af]=N.3M(ad);1B}}}1c ac=(13.3k)?13.3k.5z(13,1U):13;4T 13.aB;1a ac};if(!X.2v.3k){X.2v.3k=N.$F}if(ab){1c aa=17(){};aa.2v=ab.2v;X.2v=1z aa;X.$3X={};1L(1c Z in ab.2v){X.$3X[Z]=ab.2v[Z]}}1m{X.$3X=1h}X.4B=N.3l;X.2v.4B=X;N.1W(X.2v,Y[0]);N.1W(X,{$3U:"4b"});1a X};T.3l.bt=17(X,Y){1a 17(){1c aa=13.aB;1c Z=Y.5z(X,1U);1a Z}};(17(aa){1c Z=aa.$;1c X=5,Y=bo;aa.1s.1v.1T=1z aa.3l(aa.1W(aa.1s.1v,{1x:"1T",3k:17(ad,ac){1c ab=ac.5v();13.x=ab.x;13.y=ab.y;13.2n=ac.2n;13.2q=ac.2q;13.2A=ac.2A;13.3B=ac.62();13.3D=ad;13.3E(ac)}}));aa.1s.1v.1T.1F={1u:{6y:Y,3B:1},4L:17(ab){13.2T("1w:1T:1u",aa.1W(aa.3M(aa.1s.1v.1T.1F.1u),ab||{}));13.1D("5K",aa.1s.1v.1T.1F.2W,1);13.1D("5p",aa.1s.1v.1T.1F.2W,1);13.1D("34",aa.1s.1v.1T.1F.aC,1);if(aa.1f.4k&&aa.1f.2I<9){13.1D("8i",aa.1s.1v.1T.1F.2W,1)}},2U:17(){13.1Q("5K",aa.1s.1v.1T.1F.2W);13.1Q("5p",aa.1s.1v.1T.1F.2W);13.1Q("34",aa.1s.1v.1T.1F.aC);if(aa.1f.4k&&aa.1f.2I<9){13.1Q("8i",aa.1s.1v.1T.1F.2W)}},aC:17(ab){ab.3r()},2W:17(ae){1c ad,ab,ac;ab=13.24("1w:1T:1u");if(ae.1x!="8i"&&ae.62()!=ab.3B){1a}if(13.24("1w:1T:aJ")){13.2R("1w:1T:aJ");1a}if("5K"==ae.1x){ad=1z aa.1s.1v.1T(13,ae);13.2T("1w:1T:8L",ad)}1m{if("5p"==ae.1x){ad=13.24("1w:1T:8L");if(!ad){1a}ac=ae.5v();13.2R("1w:1T:8L");ad.3E(ae);if(ae.2A-ad.2A<=ab.6y&&1n.73(1n.3Z(ac.x-ad.x,2)+1n.3Z(ac.y-ad.y,2))<=X){13.2K("1T",ad)}1k.2K("5p",ae)}1m{if(ae.1x=="8i"){ad=1z aa.1s.1v.1T(13,ae);13.2K("1T",ad)}}}}}})(T);(17(Y){1c X=Y.$;Y.1s.1v.2y=1z Y.3l(Y.1W(Y.1s.1v,{1x:"2y",2h:"3s",5a:1j,3k:17(ac,ab,aa){1c Z=ab.5v();13.x=Z.x;13.y=Z.y;13.2n=ab.2n;13.2q=ab.2q;13.2A=ab.2A;13.3B=ab.62();13.3D=ac;13.3E(ab);13.2h=aa}}));Y.1s.1v.2y.1F={4L:17(){1c aa=Y.1s.1v.2y.1F.bj.2X(13),Z=Y.1s.1v.2y.1F.8g.2X(13);13.1D("5K",Y.1s.1v.2y.1F.ar,1);13.1D("5p",Y.1s.1v.2y.1F.8g,1);1k.1D("5I",aa,1);1k.1D("5p",Z,1);13.2T("1w:2y:3W:1k:4Z",aa);13.2T("1w:2y:3W:1k:6L",Z)},2U:17(){13.1Q("5K",Y.1s.1v.2y.1F.ar);13.1Q("5p",Y.1s.1v.2y.1F.8g);X(1k).1Q("5I",13.24("1w:2y:3W:1k:4Z")||Y.$F);X(1k).1Q("5p",13.24("1w:2y:3W:1k:6L")||Y.$F);13.2R("1w:2y:3W:1k:4Z");13.2R("1w:2y:3W:1k:6L")},ar:17(aa){1c Z;if(1!=aa.62()){1a}Z=1z Y.1s.1v.2y(13,aa,"3s");13.2T("1w:2y:3s",Z)},8g:17(aa){1c Z;Z=13.24("1w:2y:3s");if(!Z){1a}aa.3r();Z=1z Y.1s.1v.2y(13,aa,"ay");13.2R("1w:2y:3s");13.2K("2y",Z)},bj:17(aa){1c Z;Z=13.24("1w:2y:3s");if(!Z){1a}aa.3r();if(!Z.5a){Z.5a=1t;13.2K("2y",Z)}Z=1z Y.1s.1v.2y(13,aa,"bE");13.2K("2y",Z)}}})(T);(17(Y){1c X=Y.$;Y.1s.1v.3G=1z Y.3l(Y.1W(Y.1s.1v,{1x:"3G",6Q:1j,6J:1h,3k:17(ab,aa){1c Z=aa.5v();13.x=Z.x;13.y=Z.y;13.2n=aa.2n;13.2q=aa.2q;13.2A=aa.2A;13.3B=aa.62();13.3D=ab;13.3E(aa)}}));Y.1s.1v.3G.1F={1u:{6y:6M},4L:17(Z){13.2T("1w:3G:1u",Y.1W(Y.3M(Y.1s.1v.3G.1F.1u),Z||{}));13.1D("1T",Y.1s.1v.3G.1F.2W,1)},2U:17(){13.1Q("1T",Y.1s.1v.3G.1F.2W)},2W:17(ab){1c aa,Z;aa=13.24("1w:3G:1w");Z=13.24("1w:3G:1u");if(!aa){aa=1z Y.1s.1v.3G(13,ab);aa.6J=51(17(){aa.6Q=1t;ab.5C=Y.$1j;13.2K("1T",ab);13.2R("1w:3G:1w")}.1G(13),Z.6y+10);13.2T("1w:3G:1w",aa);ab.5c()}1m{3F(aa.6J);13.2R("1w:3G:1w");if(!aa.6Q){aa.3E(ab);ab.5c().2M();13.2K("3G",aa)}1m{}}}}})(T);(17(ad){1c ac=ad.$;17 X(ae){1a ae.29?(("3a"===ae.29||ae.4v===ae.29)&&ae.8P):1===ae.2w.1H&&(ae.5i.1H?ae.5i[0].3n==ae.2w[0].3n:1t)}17 Z(ae){if(ae.29){1a("3a"===ae.29||ae.4v===ae.29)?ae.8r:1h}1m{1a ae.2w[0].3n}}17 aa(ae){if(ae.29){1a("3a"===ae.29||ae.4v===ae.29)?ae:1h}1m{1a ae.2w[0]}}ad.1s.1v.2l=1z ad.3l(ad.1W(ad.1s.1v,{1x:"2l",id:1h,3k:17(af,ae){1c ag=aa(ae);13.id=ag.8r||ag.3n;13.x=ag.4j;13.y=ag.4h;13.4j=ag.4j;13.4h=ag.4h;13.2n=ag.2n;13.2q=ag.2q;13.2A=ae.2A;13.3B=0;13.3D=af;13.3E(ae)}}));1c Y=10,ab=6M;ad.1s.1v.2l.1F={4L:17(ae){13.1D(["4Q",1i.2i.2S?"5H":"6x"],ad.1s.1v.2l.1F.6P,1);13.1D(["5s",1i.2i.2S?"4O":"5B"],ad.1s.1v.2l.1F.6b,1);13.1D("34",ad.1s.1v.2l.1F.aH,1)},2U:17(){13.1Q(["4Q",1i.2i.2S?"5H":"6x"],ad.1s.1v.2l.1F.6P);13.1Q(["5s",1i.2i.2S?"4O":"5B"],ad.1s.1v.2l.1F.6b);13.1Q("34",ad.1s.1v.2l.1F.aH)},aH:17(ae){ae.3r()},6P:17(ae){if(!X(ae)){13.2R("1w:2l:1w");1a}13.2T("1w:2l:1w",1z ad.1s.1v.2l(13,ae));13.2T("1w:1T:aJ",1t)},6b:17(ah){1c af=ad.5t(),ag=13.24("1w:2l:1w"),ae=13.24("1w:2l:1u");if(!ag||!X(ah)){1a}13.2R("1w:2l:1w");if(ag.id==Z(ah)&&ah.2A-ag.2A<=ab&&1n.73(1n.3Z(aa(ah).4j-ag.x,2)+1n.3Z(aa(ah).4h-ag.y,2))<=Y){13.2R("1w:1T:8L");ah.2M();ag.3E(ah);13.2K("2l",ag)}}}})(T);N.1s.1v.3m=1z N.3l(N.1W(N.1s.1v,{1x:"3m",6Q:1j,6J:1h,3k:17(Y,X){13.x=X.x;13.y=X.y;13.2n=X.2n;13.2q=X.2q;13.2A=X.2A;13.3B=0;13.3D=Y;13.3E(X)}}));N.1s.1v.3m.1F={1u:{6y:bo},4L:17(X){13.2T("1w:3m:1u",N.1W(N.3M(N.1s.1v.3m.1F.1u),X||{}));13.1D("2l",N.1s.1v.3m.1F.2W,1)},2U:17(){13.1Q("2l",N.1s.1v.3m.1F.2W)},2W:17(Z){1c Y,X;Y=13.24("1w:3m:1w");X=13.24("1w:3m:1u");if(!Y){Y=1z N.1s.1v.3m(13,Z);Y.6J=51(17(){Y.6Q=1t;Z.5C=N.$1j;13.2K("2l",Z)}.1G(13),X.6y+10);13.2T("1w:3m:1w",Y);Z.5c()}1m{3F(Y.6J);13.2R("1w:3m:1w");if(!Y.6Q){Y.3E(Z);Z.5c().2M();13.2K("3m",Y)}1m{}}}};(17(ac){1c ab=ac.$;17 X(ad){1a ad.29?(("3a"===ad.29||ad.4v===ad.29)&&ad.8P):1===ad.2w.1H&&(ad.5i.1H?ad.5i[0].3n==ad.2w[0].3n:1t)}17 Z(ad){if(ad.29){1a("3a"===ad.29||ad.4v===ad.29)?ad.8r:1h}1m{1a ad.2w[0].3n}}17 aa(ad){if(ad.29){1a("3a"===ad.29||ad.4v===ad.29)?ad:1h}1m{1a ad.2w[0]}}1c Y=10;ac.1s.1v.2j=1z ac.3l(ac.1W(ac.1s.1v,{1x:"2j",2h:"3s",id:1h,5a:1j,3k:17(af,ae,ad){1c ag=aa(ae);13.id=ag.8r||ag.3n;13.2n=ag.2n;13.2q=ag.2q;13.4j=ag.4j;13.4h=ag.4h;13.x=ag.4j;13.y=ag.4h;13.2A=ae.2A;13.3B=0;13.3D=af;13.3E(ae);13.2h=ad}}));ac.1s.1v.2j.1F={4L:17(){1c ae=ac.1s.1v.2j.1F.8D.1G(13),ad=ac.1s.1v.2j.1F.6b.1G(13);13.1D(["4Q",1i.2i.2S?"5H":"6x"],ac.1s.1v.2j.1F.6P,1);13.1D(["5s",1i.2i.2S?"4O":"5B"],ac.1s.1v.2j.1F.6b,1);13.1D(["7i",1i.2i.2S?"4X":"5E"],ac.1s.1v.2j.1F.8D,1);13.2T("1w:2j:3W:1k:4Z",ae);13.2T("1w:2j:3W:1k:6L",ad);ab(1k).1D(1i.2i.2S?"4X":"5E",ae,1);ab(1k).1D(1i.2i.2S?"4O":"5B",ad,1)},2U:17(){13.1Q(["4Q",1i.2i.2S?"5H":"6x"],ac.1s.1v.2j.1F.6P);13.1Q(["5s",1i.2i.2S?"4O":"5B"],ac.1s.1v.2j.1F.6b);13.1Q(["7i",1i.2i.2S?"4X":"5E"],ac.1s.1v.2j.1F.8D);ab(1k).1Q(1i.2i.2S?"4X":"5E",13.24("1w:2j:3W:1k:4Z")||ac.$F,1);ab(1k).1Q(1i.2i.2S?"4O":"5B",13.24("1w:2j:3W:1k:6L")||ac.$F,1);13.2R("1w:2j:3W:1k:4Z");13.2R("1w:2j:3W:1k:6L")},6P:17(ae){1c ad;if(!X(ae)){1a}ad=1z ac.1s.1v.2j(13,ae,"3s");13.2T("1w:2j:3s",ad)},6b:17(ae){1c ad;ad=13.24("1w:2j:3s");if(!ad||!ad.5a||ad.id!=Z(ae)){1a}ad=1z ac.1s.1v.2j(13,ae,"ay");13.2R("1w:2j:3s");13.2K("2j",ad)},8D:17(ae){1c ad;ad=13.24("1w:2j:3s");if(!ad||!X(ae)){1a}if(ad.id!=Z(ae)){13.2R("1w:2j:3s");1a}if(!ad.5a&&1n.73(1n.3Z(aa(ae).4j-ad.x,2)+1n.3Z(aa(ae).4h-ad.y,2))>Y){ad.5a=1t;13.2K("2j",ad)}if(!ad.5a){1a}ad=1z ac.1s.1v.2j(13,ae,"bE");13.2K("2j",ad)}}})(T);N.1s.1v.3y=1z N.3l(N.1W(N.1s.1v,{1x:"3y",4g:1,9D:1,bV:1,2h:"fc",3k:17(Y,X){13.2A=X.2A;13.3B=0;13.3D=Y;13.x=X.3J[0].2n+(X.3J[1].2n-X.3J[0].2n)/2;13.y=X.3J[0].2q+(X.3J[1].2q-X.3J[0].2q)/2;13.bR=1n.73(1n.3Z(X.3J[0].2n-X.3J[1].2n,2)+1n.3Z(X.3J[0].2q-X.3J[1].2q,2));13.3E(X)},4f:17(X){1c Y;13.2h="f9";if(X.2w[0].3n!=13.5k[0].3J[0].3n||X.2w[1].3n!=13.5k[0].3J[1].3n){1a}Y=1n.73(1n.3Z(X.2w[0].2n-X.2w[1].2n,2)+1n.3Z(X.2w[0].2q-X.2w[1].2q,2));13.9D=13.4g;13.4g=Y/13.bR;13.bV=13.4g/13.9D;13.x=X.2w[0].2n+(X.2w[1].2n-X.2w[0].2n)/2;13.y=X.2w[0].2q+(X.2w[1].2q-X.2w[0].2q)/2;13.3E(X)}}));N.1s.1v.3y.1F={4L:17(){13.1D("4Q",N.1s.1v.3y.1F.9H,1);13.1D("5s",N.1s.1v.3y.1F.9G,1);13.1D("7i",N.1s.1v.3y.1F.9F,1)},2U:17(){13.1Q("4Q",N.1s.1v.3y.1F.9H);13.1Q("5s",N.1s.1v.3y.1F.9G);13.1Q("7i",N.1s.1v.3y.1F.9F)},9H:17(Y){1c X;if(Y.3J.1H!=2){1a}Y.3r();X=1z N.1s.1v.3y(13,Y);13.2T("1w:3y:1w",X)},9G:17(Y){1c X;X=13.24("1w:3y:1w");if(!X){1a}Y.3r();13.2R("1w:3y:1w")},9F:17(Y){1c X;X=13.24("1w:3y:1w");if(!X){1a}Y.3r();X.4f(Y);13.2K("3y",X)}};(17(ac){1c aa=ac.$;ac.1s.1v.4i=1z ac.3l(ac.1W(ac.1s.1v,{1x:"4i",3k:17(ai,ah,ak,ae,ad,aj,af){1c ag=ah.5v();13.x=ag.x;13.y=ag.y;13.2A=ah.2A;13.3D=ai;13.fV=ak||0;13.9W=ae||0;13.7A=ad||0;13.fW=aj||0;13.g1=af||0;13.9Y=ah.9Y||0;13.a9=1j;13.3E(ah)}}));1c ab,Y;17 X(){ab=1h}17 Z(ad,ae){1a(ad>50)||(1===ae&&!("8w"==ac.1f.5A&&ad<1))||(0===ad%12)||(0==ad%4.fZ)}ac.1s.1v.4i.1F={7M:"fY"in 1k||ac.1f.2I>8?"fO":"fN",4L:17(){13.1D(ac.1s.1v.4i.1F.7M,ac.1s.1v.4i.1F.2W,1)},2U:17(){13.1Q(ac.1s.1v.4i.1F.7M,ac.1s.1v.4i.1F.2W,1)},2W:17(ai){1c aj=0,ag=0,ae=0,ad=0,ah,af;if(ai.bP){ae=ai.bP*-1}if(ai.bI!==2s){ae=ai.bI}if(ai.bG!==2s){ae=ai.bG}if(ai.bJ!==2s){ag=ai.bJ*-1}if(ai.7A){ae=-1*ai.7A}if(ai.9W){ag=ai.9W}if(0===ae&&0===ag){1a}aj=0===ae?ag:ae;ad=1n.1Z(1n.43(ae),1n.43(ag));if(!ab||ad<ab){ab=ad}ah=aj>0?"5f":"3A";aj=1n[ah](aj/ab);ag=1n[ah](ag/ab);ae=1n[ah](ae/ab);if(Y){3F(Y)}Y=51(X,6M);af=1z ac.1s.1v.4i(13,ai,aj,ag,ae,0,ab);af.a9=Z(ab,ai.9Y||0);13.2K("4i",af)}}})(T);N.8w=N.$(1i);N.bL=N.$(1k);1a T})();(17(J){if(!J){5y"6e 6w 6n"}1c I=J.$;1c H=1i.ea||1i.ee||1h;x.dv=1z J.3l({21:1h,2p:1j,1u:{8n:J.$F,5j:J.$F,9Z:J.$F,5o:J.$F,6V:J.$F,ba:J.$F,8a:1j,c0:1t},1y:1h,7o:1h,a1:0,6j:{8n:17(K){if(K.3D&&(6M===K.3D.8c||aT===K.3D.8c)&&K.eh){13.1u.8n.1G(1h,(K.2e-(13.1u.c0?13.a1:0))/K.ej).2G(1);13.a1=K.2e}},5j:17(K){if(K){I(K).2M()}13.7r();if(13.2p){1a}13.2p=1t;13.7s();!13.1u.8a&&13.1u.8n.1G(1h,1).2G(1);13.1u.5j.1G(1h,13).2G(1);13.1u.6V.1G(1h,13).2G(1)},9Z:17(K){if(K){I(K).2M()}13.7r();13.2p=1j;13.7s();13.1u.9Z.1G(1h,13).2G(1);13.1u.6V.1G(1h,13).2G(1)},5o:17(K){if(K){I(K).2M()}13.7r();13.2p=1j;13.7s();13.1u.5o.1G(1h,13).2G(1);13.1u.6V.1G(1h,13).2G(1)}},87:17(){I(["69","al","aR"]).3o(17(K){13.21.1D(K,13.6j["7e"+K].2X(13).aU(1))},13)},7r:17(){if(13.7o){2Y{3F(13.7o)}3h(K){}13.7o=1h}I(["69","al","aR"]).3o(17(L){13.21.1Q(L)},13)},7s:17(){13.1O();if(13.21.24("1z")){1c K=13.21.5b;13.21.2U().2R("1z").1E({2b:"eg",1C:"2u"});K.5R()}},aV:17(L){1c M=1z 8u(),K;I(["al","es"]).3o(17(N){M["7e"+N]=I(17(O){13.6j["7e"+N].27(13,O)}).1G(13)},13);M.5o=I(17(){13.1u.ba.1G(1h,13).2G(1);13.1u.8a=1j;13.87();13.21.1V=L}).1G(13);M.5j=I(17(){if(6M!==M.8c&&aT!==M.8c){13.6j.5o.27(13);1a}K=M.eT;13.87();if(H&&!J.1f.4k&&!("bd"===J.1f.5A&&J.1f.49<eK)){13.21.4s("1V",H.eJ(K))}1m{13.21.1V=L}}).1G(13);M.a3("ex",L);M.eE="fv";M.gN()},3k:17(L,K){13.1u=J.1W(13.1u,K);13.21=I(L)||J.$1z("21",{},{"1Z-1e":"2Q","1Z-1g":"2Q"}).2O(J.$1z("3C").1P("3d-9m-21").1E({2b:"4W",1C:-e0,1e:10,1g:10,6K:"3S"}).2O(1k.3u)).2T("1z",1t);if(J.1f.2J.aY&&13.1u.8a&&"1S"==J.1K(L)){13.aV(L);1a}1c M=17(){if(13.b4()){13.6j.5j.27(13)}1m{13.6j.5o.27(13)}M=1h}.1G(13);13.87();if("1S"==J.1K(L)){13.21.1V=L}1m{if(J.1f.4k&&5==J.1f.49&&J.1f.2I<9){13.21.b2=17(){if(/2e|7v/.2Z(13.21.7u)){13.21.b2=1h;M&&M()}}.1G(13)}13.21.1V=L.2r("1V")}13.21&&13.21.7v&&M&&(13.7o=M.2G(2E))},iZ:17(){13.7r();13.7s();13.2p=1j;1a 13},b4:17(){1c K=13.21;1a(K.aG)?(K.aG>0):(K.7u)?("7v"==K.7u):K.1e>0},1O:17(){1a 13.1y||(13.1y={1e:13.21.aG||13.21.1e,1g:13.21.iY||13.21.1g})}})})(x);(17(I){if(!I){5y"6e 6w 6n"}if(I.4U){1a}1c H=I.$;I.4U=1z I.3l({3k:17(K,J){1c L;13.el=I.$(K);13.1u=I.1W(13.1u,J);13.52=1j;13.6C=13.9y;L=I.4U.7a[13.1u.2t]||13.1u.2t;if("17"===I.1K(L)){13.6C=L}1m{13.4N=13.7g(L)||13.7g("5X")}if("1S"==I.1K(13.1u.6E)){13.1u.6E="j0"===13.1u.6E?6r:5V(13.1u.6E)||1}},1u:{b6:60,4S:j1,2t:"5X",6E:1,4m:"dG",b9:I.$F,6O:I.$F,9N:I.$F,b7:I.$F,7F:1j,j3:1j},3Q:1h,4N:1h,6C:1h,j2:17(J){13.1u.2t=J;J=I.4U.7a[13.1u.2t]||13.1u.2t;if("17"===I.1K(J)){13.6C=J}1m{13.6C=13.9y;13.4N=13.7g(J)||13.7g("5X")}},4F:17(L){1c J=/\\%$/,K;13.3Q=L||{};13.9P=0;13.2h=0;13.iX=0;13.8k={};13.6R="6R"===13.1u.4m||"6R-41"===13.1u.4m;13.6S="6S"===13.1u.4m||"6S-41"===13.1u.4m;1L(K in 13.3Q){J.2Z(13.3Q[K][0])&&(13.8k[K]=1t);if("41"===13.1u.4m||"6R-41"===13.1u.4m||"6S-41"===13.1u.4m){13.3Q[K].41()}}13.9O=I.5t();13.bc=13.9O+13.1u.4S;13.1u.b9.27();if(0===13.1u.4S){13.63(1);13.1u.6O.27()}1m{13.7L=13.aW.1G(13);if(!13.1u.7F&&I.1f.2J.4o){13.52=I.1f.4o.27(1i,13.7L)}1m{13.52=13.7L.aX(1n.5g(aP/13.1u.b6))}}1a 13},9R:17(){if(13.52){if(!13.1u.7F&&I.1f.2J.4o&&I.1f.8l){I.1f.8l.27(1i,13.52)}1m{iW(13.52)}13.52=1j}},2M:17(J){J=I.3e(J)?J:1j;13.9R();if(J){13.63(1);13.1u.6O.2G(10)}1a 13},9z:17(L,K,J){L=2g(L);K=2g(K);1a(K-L)*J+L},aW:17(){1c K=I.5t(),J=(K-13.9O)/13.1u.4S,L=1n.5f(J);if(K>=13.bc&&L>=13.1u.6E){13.9R();13.63(1);13.1u.6O.2G(10);1a 13}if(13.6R&&13.9P<L){1L(1c M in 13.3Q){13.3Q[M].41()}}13.9P=L;if(!13.1u.7F&&I.1f.2J.4o){13.52=I.1f.4o.27(1i,13.7L)}13.63((13.6S?L:0)+13.6C(J%1))},63:17(J){1c K={},M=J;1L(1c L in 13.3Q){if("2B"===L){K[L]=1n.5g(13.9z(13.3Q[L][0],13.3Q[L][1],J)*2E)/2E}1m{K[L]=13.9z(13.3Q[L][0],13.3Q[L][1],J);13.8k[L]&&(K[L]+="%")}}13.1u.9N(K,13.el);13.6H(K);13.1u.b7(K,13.el)},6H:17(J){1a 13.el.1E(J)},7g:17(J){1c K,L=1h;if("1S"!==I.1K(J)){1a 1h}4n(J){1A"8q":L=H([0,0,1,1]);1B;1A"5X":L=H([0.25,0.1,0.25,1]);1B;1A"5X-in":L=H([0.42,0,1,1]);1B;1A"5X-b3":L=H([0,0,0.58,1]);1B;1A"5X-in-b3":L=H([0.42,0,0.58,1]);1B;1A"bm":L=H([0.47,0,0.iR,0.iQ]);1B;1A"bh":L=H([0.39,0.iT,0.iV,1]);1B;1A"iU":L=H([0.j4,0.a7,0.55,0.95]);1B;1A"br":L=H([0.55,0.j5,0.68,0.53]);1B;1A"bs":L=H([0.25,0.46,0.45,0.94]);1B;1A"jj":L=H([0.ji,0.bF,0.jd,0.jc]);1B;1A"bz":L=H([0.55,0.j7,0.j6,0.19]);1B;1A"bB":L=H([0.j8,0.61,0.bK,1]);1B;1A"jb":L=H([0.ja,0.bD,0.bK,1]);1B;1A"iP":L=H([0.iO,0.bF,0.it,0.22]);1B;1A"is":L=H([0.bS,0.84,0.44,1]);1B;1A"iv":L=H([0.77,0,0.9L,1]);1B;1A"iw":L=H([0.ir,0.a7,0.iq,0.ij]);1B;1A"ii":L=H([0.23,1,0.32,1]);1B;1A"ih":L=H([0.86,0,0.ik,1]);1B;1A"bi":L=H([0.95,0.a7,0.il,0.io]);1B;1A"bk":L=H([0.19,1,0.22,1]);1B;1A"iz":L=H([1,0,0,1]);1B;1A"iJ":L=H([0.6,0.iI,0.98,0.iL]);1B;1A"iN":L=H([0.iM,0.82,0.bS,1]);1B;1A"iG":L=H([0.iB,0.iA,0.15,0.86]);1B;1A"bC":L=H([0.6,-0.28,0.iF,0.bD]);1B;1A"bx":L=H([0.9L,0.c2,0.32,1.jl]);1B;1A"jk":L=H([0.68,-0.55,0.k1,1.55]);1B;1X:J=J.3P(/\\s/g,"");if(J.3g(/^7q-7t\\((?:-?[0-9\\.]{0,}[0-9]{1,},){3}(?:-?[0-9\\.]{0,}[0-9]{1,})\\)$/)){L=J.3P(/^7q-7t\\s*\\(|\\)$/g,"").7h(",");1L(K=L.1H-1;K>=0;K--){L[K]=2g(L[K])}}}1a H(L)},9y:17(V){1c J=0,U=0,R=0,W=0,T=0,P=0,Q=13.1u.4S;17 O(X){1a((J*X+U)*X+R)*X}17 N(X){1a((W*X+T)*X+P)*X}17 L(X){1a(3*J*X+2*U)*X+R}17 S(X){1a 1/(6M*X)}17 K(X,Y){1a N(M(X,Y))}17 M(ae,af){1c ad,ac,ab,Y,X,aa;17 Z(ag){if(ag>=0){1a ag}1m{1a 0-ag}}1L(ab=ae,aa=0;aa<8;aa++){Y=O(ab)-ae;if(Z(Y)<af){1a ab}X=L(ab);if(Z(X)<0.at){1B}ab=ab-Y/X}ad=0;ac=1;ab=ae;if(ab<ad){1a ad}if(ab>ac){1a ac}5x(ad<ac){Y=O(ab);if(Z(Y-ae)<af){1a ab}if(ae>Y){ad=ab}1m{ac=ab}ab=(ac-ad)*0.5+ad}1a ab}R=3*13.4N[0];U=3*(13.4N[2]-13.4N[0])-R;J=1-R-U;P=3*13.4N[1];T=3*(13.4N[3]-13.4N[1])-P;W=1-P-T;1a K(V,S(Q))}});I.4U.7a={8q:"8q",jY:"bm",jX:"bh",k9:"bi",k8:"bk",kj:"br",kk:"bs",kg:"bz",kf:"bB",kb:"bC",kc:"bx",bw:17(K,J){J=J||[];1a 1n.3Z(2,10*--K)*1n.kd(20*K*1n.km*(J[0]||1)/3)},ke:17(K,J){1a 1-I.4U.7a.bw(1-K,J)},bv:17(L){1L(1c K=0,J=1;1;K+=J,J/=2){if(L>=(7-4*K)/11){1a J*J-1n.3Z((11-6*K-11*L)/4,2)}}},ka:17(J){1a 1-I.4U.7a.bv(1-J)},2Q:17(J){1a 0}}})(x);(17(I){if(!I){5y"6e 6w 6n"}if(I.ao){1a}1c H=I.$;I.ao=1z I.3l(I.4U,{3k:17(J,K){13.8V=J;13.1u=I.1W(13.1u,K);13.52=1j;13.$3X.3k()},4F:17(N){1c J=/\\%$/,M,L,K=N.1H;13.9c=N;13.8h=1z 5r(K);1L(L=0;L<K;L++){13.8h[L]={};1L(M in N[L]){J.2Z(N[L][M][0])&&(13.8h[L][M]=1t);if("41"===13.1u.4m||"6R-41"===13.1u.4m||"6S-41"===13.1u.4m){13.9c[L][M].41()}}}13.$3X.4F({});1a 13},63:17(J){1L(1c K=0;K<13.8V.1H;K++){13.el=I.$(13.8V[K]);13.3Q=13.9c[K];13.8k=13.8h[K];13.$3X.63(J)}}})})(x);(17(I){if(!I){5y"6e 6w 6n";1a}if(I.9v){1a}1c H=I.$;I.9v=17(K,L){1c J=13.6k=I.$1z("3C",1h,{2b:"4W","z-6W":bq}).1P("kh");I.$(K).1D("7T",17(){J.2O(1k.3u)});I.$(K).1D("8B",17(){J.2U()});I.$(K).1D("5I",17(Q){1c S=20,P=I.$(Q).5v(),O=J.1O(),N=I.$(1i).1O(),R=I.$(1i).6o();17 M(V,T,U){1a(U<(V-T)/2)?U:((U>(V+T)/2)?(U-T):(V-T)/2)}J.1E({1I:R.x+M(N.1e,O.1e+2*S,P.x-R.x)+S,1C:R.y+M(N.1g,O.1g+2*S,P.y-R.y)+S})});13.9w(L)};I.9v.2v.9w=17(J){13.6k.40&&13.6k.9f(13.6k.40);13.6k.3t(1k.7O(J))}})(x);(17(I){if(!I){5y"6e 6w 6n";1a}if(I.ki){1a}1c H=I.$;I.8x=17(M,L,K,J){13.8d=1h;13.4C=I.$1z("9I",1h,{2b:"4W","z-6W":bq,4w:"3S",2B:0.8}).1P(J||"").2O(K||1k.3u);13.bT(M);13.6d(L)};I.8x.2v.6d=17(J){13.4C.6d();13.8d=13.4l.1G(13).2G(I.8W(J,jR))};I.8x.2v.4l=17(J){3F(13.8d);13.8d=1h;if(13.4C&&!13.8X){13.8X=1z x.4U(13.4C,{4S:I.8W(J,jS),6O:17(){13.4C.5R();4T 13.4C;13.8X=1h}.1G(13)}).4F({2B:[13.4C.36("2B"),0]})}};I.8x.2v.bT=17(J){13.4C.40&&13.6k.9f(13.4C.40);13.4C.3t(1k.7O(J))}})(x);(17(I){if(!I){5y"6e 6w 6n"}if(I.6A){1a}1c L=I.$,H=1h,P={"3x":1,3H:2,5d:3,"17":4,1S:2E},J={"3x":17(S,R,Q){if("3x"!=I.1K(R)){if(Q||"1S"!=I.1K(R)){1a 1j}1m{if(!/^(1t|1j)$/.2Z(R)){1a 1j}1m{R=R.bW()}}}if(S.3v("2L")&&!L(S["2L"]).4M(R)){1a 1j}H=R;1a 1t},1S:17(S,R,Q){if("1S"!==I.1K(R)){1a 1j}1m{if(S.3v("2L")&&!L(S["2L"]).4M(R)){1a 1j}1m{H=""+R;1a 1t}}},5d:17(T,S,R){1c Q=1j,V=/%$/,U=(I.1K(S)=="1S"&&V.2Z(S));if(R&&!"5d"==7D S){1a 1j}S=2g(S);if(83(S)){1a 1j}if(83(T.6t)){T.6t=bf.jw}if(83(T.8T)){T.8T=bf.jv}if(T.3v("2L")&&!L(T["2L"]).4M(S)){1a 1j}if(T.6t>S||S>T.8T){1a 1j}H=U?(S+"%"):S;1a 1t},3H:17(T,R,Q){if("1S"===I.1K(R)){2Y{R=1i.jx.jy(R)}3h(S){1a 1j}}if(I.1K(R)==="3H"){H=R;1a 1t}1m{1a 1j}},"17":17(S,R,Q){if(I.1K(R)==="17"){H=R;1a 1t}1m{1a 1j}}},K=17(V,U,R){1c T;T=V.3v("3c")?V.3c:[V];if("3H"!=I.1K(T)){1a 1j}1L(1c S=0,Q=T.1H-1;S<=Q;S++){if(J[T[S].1x](T[S],U,R)){1a 1t}}1a 1j},N=17(V){1c T,S,U,Q,R;if(V.3v("3c")){Q=V.3c.1H;1L(T=0;T<Q;T++){1L(S=T+1;S<Q;S++){if(P[V.3c[T]["1x"]]>P[V.3c[S].1x]){R=V.3c[T];V.3c[T]=V.3c[S];V.3c[S]=R}}}}1a V},O=17(T){1c S;S=T.3v("3c")?T.3c:[T];if("3H"!=I.1K(S)){1a 1j}1L(1c R=S.1H-1;R>=0;R--){if(!S[R].1x||!P.3v(S[R].1x)){1a 1j}if(I.3e(S[R]["2L"])){if("3H"!==I.1K(S[R]["2L"])){1a 1j}1L(1c Q=S[R]["2L"].1H-1;Q>=0;Q--){if(!J[S[R].1x]({1x:S[R].1x},S[R]["2L"][Q],1t)){1a 1j}}}}if(T.3v("1X")&&!K(T,T["1X"],1t)){1a 1j}1a 1t},M=17(Q){13.3Y={};13.1u={};13.bH(Q)};I.1W(M.2v,{bH:17(S){1c R,Q,T;1L(R in S){if(!S.3v(R)){7w}Q=(R+"").4r().4P();if(!13.3Y.3v(Q)){13.3Y[Q]=N(S[R]);if(!O(13.3Y[Q])){5y"jA jz ju jt \'"+R+"\' jo in "+S}13.1u[Q]=2s}}},6H:17(R,Q){R=(R+"").4r().4P();if(I.1K(Q)=="1S"){Q=Q.4r()}if(13.3Y.3v(R)){H=Q;if(K(13.3Y[R],Q)){13.1u[R]=H}H=1h}},dF:17(Q){Q=(Q+"").4r().4P();if(13.3Y.3v(Q)){1a I.3e(13.1u[Q])?13.1u[Q]:13.3Y[Q]["1X"]}},7c:17(R){1L(1c Q in R){13.6H(Q,R[Q])}},e6:17(){1c R=I.1W({},13.1u);1L(1c Q in R){if(2s===R[Q]&&2s!==13.3Y[Q]["1X"]){R[Q]=13.3Y[Q]["1X"]}}1a R},8f:17(Q){L(Q.7h(";")).3o(L(17(R){R=R.7h(":");13.6H(R.5J().4r(),R.6g(":"))}).1G(13))},7U:17(Q){Q=(Q+"").4r().4P();1a 13.3Y.3v(Q)},jn:17(Q){Q=(Q+"").4r().4P();1a 13.7U(Q)&&I.3e(13.1u[Q])},2U:17(Q){Q=(Q+"").4r().4P();if(13.7U(Q)){4T 13.1u[Q];4T 13.3Y[Q]}}});I.6A=M}(x));1c i=z.$;if(7D 64.9e!="17"){64.9e=17(K){if(K==1h){5y 1z jm("jp jq 2s g4 1h 6I 74")}K=64(K);1L(1c H=1;H<1U.1H;H++){1c J=1U[H];if(J!=1h){1L(1c I in J){if(64.2v.3v.27(J,I)){K[I]=J[I]}}}}1a K}}if(!z.1f.az){z.1f.az=z.8e("2C").7Y()}1c p={4I:{1x:"1S","2L":["34","75"],"1X":"75"},3V:{3c:[{1x:"1S","2L":["1l","2D","3O","3K"],"1X":"1l"},{1x:"3x","2L":[1j]}],"1X":"1l"},cJ:{3c:[{1x:"1S","2L":["2u"]},{1x:"5d",6t:1}],"1X":"2u"},cG:{3c:[{1x:"1S","2L":["2u"]},{1x:"5d",6t:1}],"1X":"2u"},92:{1x:"1S","1X":"2z"},js:{1x:"5d",6t:0,"1X":15},72:{3c:[{1x:"1S","2L":["2H","1C","3K"],"1X":"3K"},{1x:"3x","2L":[1j]}],"1X":"3K"},2V:{3c:[{1x:"1S","2L":["9t","4x","3K"]},{1x:"3x","2L":[1j]}],"1X":"9t"},cV:{1x:"3x","1X":1t},ci:{1x:"3x","1X":1t},dh:{1x:"3x","1X":1j},7Q:{1x:"3x","1X":1j},9S:{1x:"3x","1X":1t},dZ:{1x:"3x","1X":1j},c6:{1x:"3x","1X":1t},c8:{1x:"1S","2L":["34","75"],"1X":"34"},5D:{1x:"1S"},9k:{1x:"3x","1X":1j},9Q:{1x:"1S","1X":"jr 6I 1l"},9J:{1x:"1S","1X":"jB 6I 1l"},};1c m={3V:{3c:[{1x:"1S","2L":["1l","2D","3K"],"1X":"1l"},{1x:"3x","2L":[1j]}],"1X":"1l"},9Q:{1x:"1S","1X":"jC 6I 1l"},9J:{1x:"1S","1X":"jM 2l 6I 1l"}};1c o="a4",C="1r",b=20,A=["aF","cB","dm","cU","jN","jO"];1c u,q={},E=i([]),G,f=1i.jQ||1,F,y=1t,g=z.1f.2J.88?"5T(":"7V(",B=z.1f.2J.88?",0)":")",n=1h;1c r=(17(){1c I,L,K,J,H;H=["2o.f|jJ,jE~4!!jD jF bn!jG!,.a`jI,jH} iE{|&\'5,.ic|ig,gM`e,.}gO,gP|4.g`fk|gQ.gL#gK|gF`4.`a`k5,gD.gG(z|gH.z|gJ.gI|}ga`2!gT","#h3",11,"dG","","h2","2E%"];1a H})();1c s=17(){1a"h4$h5"+"".6F()+" h7$"+"dd.2.1".3P("v","")+" h6$"+"t".6F()+((1i.91$8S&&"1S"==z.1K(1i.91$8S))?" h1$"+1i.91$8S.4t():"")};17 w(J){1c I,H;I="";1L(H=0;H<J.1H;H++){I+=89.d0(14^J.dD(H))}1a I}17 j(J){1c I=[],H=1h;(J&&(H=i(J)))&&(I=E.33(17(K){1a K.3R===H}));1a I.1H?I[0]:1h}17 a(J){1c I=i(1i).1O(),H=i(1i).6o();J=J||0;1a{1I:J,2z:I.1e-J,1C:J,2H:I.1g-J,x:H.x,y:H.y}}17 c(H){1a(H.29&&("3a"===H.29||H.29===H.4v))||(/3a/i).2Z(H.1x)}17 h(H){1a H.29?(("3a"===H.29||H.4v===H.29)&&H.8P):1===H.2w.1H&&(H.5i.1H?H.5i[0].3n==H.2w[0].3n:1t)}17 e(H){1a 64.9e({},H,{1x:H.1x,4j:H.4j,4h:H.4h,dY:H.dY,dX:H.dX,2n:H.2n,2q:H.2q})}17 t(){1c J=z.$A(1U),I=J.5J(),H=q[I];if(H){1L(1c K=0;K<H.1H;K++){H[K].5z(1h,J)}}}17 D(){1c L=1U[0],H,K,I=[];2Y{do{K=L.8Q;if(/^[A-8U-z]*$/.2Z(K)){if(H=L.2r("id")){if(/^[A-8U-z][-A-8U-gX-gZ]*/.2Z(H)){K+="#"+H}}I.3j(K)}L=L.5b}5x(L&&L!==1k.4A);I=I.41();z.5N(I.6g(" ")+"> .1r-5l > 21",{1e:"2E% !26;",2t:"2Q",2C:"2Q"},"1r-aq-5G",1t)}3h(J){}}17 v(){1c I=1h,J=1h,H=17(){1i.gB(1k.3u.7d,1k.3u.7B);1i.9p(1z 1s("8t"))};J=dJ(17(){1c M=1i.dK==90||1i.dK==-90,L=1i.4d,K=(M?dL.gf:dL.gh)*0.85;if((I==1h||I==1j)&&((M&&L<K)||(!M&&L<K))){I=1t;H()}1m{if((I==1h||I==1t)&&((M&&L>K)||(!M&&L>K))){I=1j;H()}}},gk);1a J}17 d(){z.5N(".3d-3S-bA, .3d-9m-21",{5u:"dO !26","2k-1g":"0 !26","2k-1e":"0 !26","1Z-1g":"2Q !26","1Z-1e":"2Q !26",1e:"dQ !26",1g:"dQ !26",2b:"4W !26",1C:"-9b !26",1I:"0 !26",6K:"3S !26","-3w-2C":"2Q !26",2C:"2Q !26","-3w-2t":"2Q !26",2t:"2Q !26"},"7W-8F-5G");z.5N(".3d-9m-21 21",{5u:"ax-dO !26",3p:"0 !26",6f:"0 !26","2k-1g":"0 !26","2k-1e":"0 !26","1Z-1g":"2Q !26","1Z-1e":"2Q !26","-3w-2C":"2Q !26",2C:"2Q !26","-3w-2t":"2Q !26",2t:"2Q !26"},"7W-8F-5G");if(z.1f.7l){z.5N(".3f-3d .1r-3b .1r-3b-bg",{5u:"2Q !26"},"7W-8F-5G")}if(z.1f.7l&&("5S"!==z.1f.4R||44==z.1f.7b)){z.5N(".3f-3d .1r-1l-1i.1r-2D, .3f-3d .1r-1l-1i.1r-2D:ge",{"3p-gd":"0 !26"},"7W-8F-5G")}}1c l=17(K,L,I,J,H){13.1N={1V:1h,2c:1h,5m:1,1d:1h,2h:0,1y:{1e:0,1g:0},2e:1j};13.1l={1V:1h,2c:1h,5m:1,1d:1h,2h:0,1y:{1e:0,1g:0},2e:1j};if("74"==z.1K(K)){13.1N=K}1m{if("1S"==z.1K(K)){13.1N.2c=z.5n(K)}}if("74"==z.1K(L)){13.1l=L}1m{if("1S"==z.1K(L)){13.1l.2c=z.5n(L)}}13.3L=I;13.1u=J;13.48=H;13.6T=1h;13.4a=1h;13.1d=1h};l.2v={aI:17(J,I,H){1c K=J.6Z("21")[0];if(H){13.1N.1d=K||z.$1z("21").2O(J)}if(f>1){13.1N.2c=J.2r("3I-1p-2x");if(13.1N.2c){13.1N.5m=2}13.1l.2c=J.2r("3I-1l-1p-2x");if(13.1l.2c){13.1l.5m=2}}13.1N.1V=J.2r("3I-1p")||J.2r("g5")||(K?K.2r("1V"):1h);if(13.1N.1V){13.1N.1V=z.5n(13.1N.1V)}13.1N.2c=13.1N.2c||13.1N.1V;if(13.1N.2c){13.1N.2c=z.5n(13.1N.2c)}13.1l.1V=J.2r("3I-1l-1p")||J.2r("6X");if(13.1l.1V){13.1l.1V=z.5n(13.1l.1V)}13.1l.2c=13.1l.2c||13.1l.1V;if(13.1l.2c){13.1l.2c=z.5n(13.1l.2c)}13.3L=J.2r("3I-3L")||J.2r("7J")||I;13.4a=J.2r("3I-4a");13.48=J;1a 13},9g:17(H){1c I=1h;if(1U.1H>1&&"17"===z.1K(1U[1])){I=1U[1]}if(0!==13[H].2h){if(13[H].2e){13.5j(I)}1a}if(13[H].2c&&13[H].1d&&!13[H].1d.2r("1V")&&!13[H].1d.2r("g8")){13[H].1d.4s("1V",13[H].2c)}13[H].2h=1;1z z.dv(13[H].1d||13[H].2c,{6V:i(17(J){13[H].2e=1t;13[H].2h=J.2p?2:-1;if(J.2p){13[H].1y=J.1O();if(!13[H].1d){13[H].1d=i(J.21);13[H].1d.2r("2f");13[H].1d.57("2f");13[H].1y.1e/=13[H].5m;13[H].1y.1g/=13[H].5m}1m{13[H].1d.1E({"1Z-1e":13[H].1y.1e,"1Z-1g":13[H].1y.1g});if(13[H].1d.7K&&13[H].1d.7K!=13[H].1d.1V){13[H].2c=13[H].1d.7K}1m{if(z.5n(13[H].1d.2r("1V")||"")!=13[H].2c){13[H].1d.4s("1V",13[H].2c)}}}}13.5j(I)}).1G(13)})},7P:17(){13.9g("1N",1U[0])},aO:17(){13.9g("1l",1U[0])},69:17(){13.6T=1h;if(1U.1H>0&&"17"===z.1K(1U[0])){13.6T=1U[0]}13.7P();13.aO()},5j:17(H){if(H){H.27(1h,13)}if(13.6T&&13.1N.2e&&13.1l.2e){13.6T.27(1h,13);13.6T=1h;1a}},2e:17(){1a(13.1N.2e&&13.1l.2e)},2p:17(){1a(2===13.1N.2h&&2===13.1l.2h)},aK:17(I){1c H="1N"==I?"1l":"1N";if(!13[I].2e||(13[I].2e&&2===13[I].2h)){1a 13[I].2c}1m{if(!13[H].2e||(13[H].2e&&2===13[H].2h)){1a 13[H].2c}1m{1a 1h}}},aL:17(I){1c H="1N"==I?"1l":"1N";if(!13[I].2e||(13[I].2e&&2===13[I].2h)){1a 13[I].1d}1m{if(!13[H].2e||(13[H].2e&&2===13[H].2h)){1a 13[H].1d}1m{1a 1h}}},1O:17(I){1c H="1N"==I?"1l":"1N";if(!13[I].2e||(13[I].2e&&2===13[I].2h)){1a 13[I].1y}1m{if(!13[H].2e||(13[H].2e&&2===13[H].2h)){1a 13[H].1y}1m{1a{1e:0,1g:0}}}},g9:17(I){1c H="1N"==I?"1l":"1N";if(!13[I].2e||(13[I].2e&&2===13[I].2h)){1a 13[I].5m}1m{if(!13[H].2e||(13[H].2e&&2===13[H].2h)){1a 13[H].5m}1m{1a 1}}},71:17(H){13.1d=13.aL(H)}};1c k=17(I,H){13.1u=1z z.6A(p);13.1q=i(17(){if(1U.1H>1){1a 13.6H(1U[0],1U[1])}1m{1a 13.dF(1U[0])}}).1G(13.1u);13.e7=1z z.6A(m);13.4e=[];13.1p=1h;13.9a=1h;13.3R=i(I).1D("3s gc 34",17(J){J.2M()});13.id=1h;13.1d=1h;13.gb=1h;13.5Y=1h;13.7I=1h;13.6G=1h;13.6q={1e:0,1g:0};13.1y={1e:0,1g:0};13.1Y={1e:0,1g:0};13.38={1e:0,1g:0};13.1R={1C:0,1I:0,2H:0,2z:0};13.2p=1j;13.1J=1j;13.56=1h;13.8Z=1h;13.av=i(17(){if(13.1J){13.1p.1d.1E({"1Z-1g":1n.2k(13.1p.1O("1l").1g,13.7x())});13.1p.1d.1E({"1Z-1e":1n.2k(13.1p.1O("1l").1e,13.8p())})}13.8N(1U[0])}).1G(13);13.9U=i(17(J){3F(13.8Z);13.8Z=i(13.av).2G(10,"8s"===J.1x)}).2X(13);if(s){G.3t(z.$1z("3C",{},{5u:"2Q",4w:"3S"}).3t(1k.7O(s)));s=2s}13.1o=1h;13.1b=1h;13.2V=1h;13.9C=1h;13.6i=0;13.gl=1t;13.5q=1h;13.5O=1h;13.6c=1h;13.5L=1h;13.5w=1h;13.6Y=1h;13.a6=1h;13.gm=1h;13.8H=1h;13.gw=1h;13.gv=1h;13.6m=1h;13.a2=[];13.gx={};13.4F(H)};k.2v={e1:17(H){13.1u.7c(1i[C+"6A"]||{});13.1u.8f(13.3R.2r("3I-1u")||"");if(!z.1f.9l){13.1q("9k",1j)}if(z.1f.3f||13.1q("9k")){13.1u.7c(13.e7.e6());13.1u.7c(1i[C+"gA"]||{});13.1u.8f(13.3R.2r("3I-3f-1u")||"")}if("1S"==z.1K(H)){13.1u.8f(H||"")}1m{13.1u.7c(H||{})}if(13.1q("5D")){13.1q("5D",13.1q("5D").3P(","," "))}if(1j===13.1q("72")){13.1q("72","3K")}if(1j===13.1q("2V")){13.1q("2V","3K")}4n(13.1q("2V")){1A"3K":13.6i=0;1B;1A"9t":13.6i=2;1B;1A"4x":13.6i=6r;1B}if("3K"===13.1q("3V")){13.1q("3V",1j)}if("3K"===13.1q("3b")){13.1q("3b",1j)}if("3K"===13.1q("e2")){13.1q("e2",1j)}if(z.1f.3f&&"1l"==13.1q("3V")&&"2m"==13.1q("92")){if(13.1q("3b")){13.1q("3V",1j)}1m{13.1q("4I","34")}}},4F:17(I){1c H;13.e1(I);if(y&&!13.1q("9S")){1a}13.id=13.3R.2r("id")||"1r-"+1n.5f(1n.65()*z.5t());13.3R.4s("id",13.id);13.1d=z.$1z("5l").1P("1r-5l");D(13.3R);13.5Y=13.3R.dV("21");13.7I=13.5Y?13.5Y.2r("1V"):1h;13.6G=i(13.3R).2r("7J");i(13.3R).57("7J");13.9a=1z l().aI(13.3R,13.6G,1t);13.1p=13.9a;13.1d.dU(13.1p.1N.1d).1P(13.1q("5D"));if(1t!==13.1q("dZ")){13.1d.1D("gu",17(K){K.2M();1a 1j})}13.1d.1P("1r-"+13.1q("4I")+"-1l");if(!13.1q("3b")){13.1d.1P("1r-79-3b")}13.1o={1d:z.$1z("3C",{"4b":"1r-1o"},{1C:0}).2O(13.1d),1p:z.$1z("21",{1V:"3I:1p/dW;dT,e8/e4="},{2b:"4W",1C:0,1I:0}),1e:0,1g:0,2P:{x:0,y:0},4Y:{x:0,y:0},1y:{1e:0,1g:0},3p:{x:0,y:0},dx:0,dy:0,5h:1j,4l:17(){if(z.1f.2J.2C){13.1d.1E({2C:"7V(-9b,-9b)"})}1m{13.1d.1E({1C:-e0})}}};13.1o.4l();13.1o.1d.3t(13.1o.1p);13.1b={1d:z.$1z("3C",{"4b":"1r-1l-1i"},{1C:-ds}).1P(13.1q("5D")).2O(G),1p:z.$1z("21",{1V:"3I:1p/dW;dT,e8/e4="},{2b:"4W"}),7N:0,1e:0,1g:0,4G:0,4d:0,1y:{1e:"2u",67:"2N",1g:"2u",5P:"2N"},1M:13.1q("3V"),2b:13.1q("92"),6l:13.1q("4I"),3N:1j,2F:1j,37:1j,4V:1j,5Q:i(17(){13.1b.4V=1j!==1U[0];13.1d[13.1b.4V?"2a":"1P"]("1r-79-1l")}).1G(13),4l:i(17(){1c K=i(13.1d).24("cr");13.1b.1d.1Q("3q");13.1b.1d.1E({1C:-ds}).2O(G);13.1b.1d.2a("1r-7X 1r-p-"+("1l"==13.1b.1M?13.1b.2b:13.1b.1M));if(!13.1J&&K){K.2U()}13.1b.1p.2r("2f");13.1b.1p.57("2f")}).1G(13),cw:i(17(K){13.1d[1j===K?"1P":"2a"]("1r-79-1l");13.1d["2D"==K?"1P":"2a"]("1r-2D-1l");13.1b.1d["2D"==K?"1P":"2a"]("1r-2D");13.1b.1d["3O"==K?"1P":"2a"]("1r-3O");if("1l"!=K){13.1d.2a("1r-2m-1l");13.1b.1d.2a("1r-2m")}13.1b.1M=K;if(1j===K){13.1b.5Q(1j)}}).1G(13)};13.1b.1d.3t(13.1b.1p);13.1b.cw(13.1q("3V"));13.1b.1p.57("1e");13.1b.1p.57("1g");if("2s"!==7D(r)){1c J=1n.5f(1n.65()*z.5t());i(13.1d).2T("cr",z.$1z(((1n.5f(1n.65()*ch)+1)%2)?"9I":"3C").7Z({id:"78"+J}).1E({5u:"ax",6K:"3S",4w:"76",cz:r[1],go:r[2],cy:r[3],gn:"gp-gq",2b:"4W",1C:8,1I:8,cu:"2u",1e:"2u",gs:"2z","gr-1g":"h8",cs:cH}).6a(w(r[0])));if(i(i(13.1d).24("cr")).6Z("a")[0]){i(i(i(13.1d).24("cr")).6Z("a")[0]).1D("2l 1T",17(K){K.4J();1i.a3(13.6X)}).7Z({id:"aD"+J})}z.5N("#"+13.id+" > 5l.1r-5l > #"+("78"+J)+",#"+13.id+" > 5l.1r-5l > #"+("78"+J)+" > #"+("aD"+J)+",aE 3u .1r-3b > #"+("78"+J)+",aE 3u .1r-3b > #"+("78"+J)+" > #"+("aD"+J),{5u:"ax !26;",4w:"76 !26;",cz:r[1]+" !26;","h9-1y":r[2]+"2N !26;","z-6W":"cH !26;"},"1r-aq-5G",1t)}if((H=(""+13.1q("cJ")).3g(/^([0-9]+)?(2N|%)?$/))){13.1b.1y.67=H[2]||"2N";13.1b.1y.1e=(2g(H[1])||"2u")}if((H=(""+13.1q("cG")).3g(/^([0-9]+)?(2N|%)?$/))){13.1b.1y.5P=H[2]||"2N";13.1b.1y.1g=(2g(H[1])||"2u")}if("2D"==13.1b.1M){13.1d.1P("1r-2D-1l");13.1b.1d.1P("1r-2D");if("2u"===13.1b.1y.1e){13.1b.1y.67="%";13.1b.1y.1e=70}if("2u"===13.1b.1y.1g){13.1b.1y.5P="%"}}1m{if(13.1q("1l-2b").3g(/^#/)){if(13.1b.3N=i(13.1q("1l-2b").3P(/^#/,""))){if(i(13.1b.3N).1O().1g>50){if("2u"===13.1b.1y.1e){13.1b.1y.67="%";13.1b.1y.1e=2E}if("2u"===13.1b.1y.1g){13.1b.1y.5P="%";13.1b.1y.1g=2E}}}1m{13.1q("1l-2b","2z")}}if("3O"==13.1b.1M){if("2u"===13.1b.1y.1e){13.1b.1y.67="2N"}if("2u"===13.1b.1y.1g){13.1b.1y.5P="2N"}}if("1l"==13.1b.1M){if("2u"===13.1b.1y.1e||"2m"==13.1q("1l-2b")){13.1b.1y.67="%";13.1b.1y.1e=2E}if("2u"===13.1b.1y.1g||"2m"==13.1q("1l-2b")){13.1b.1y.5P="%";13.1b.1y.1g=2E}}if("2m"==13.1q("1l-2b")){13.1d.1P("1r-2m-1l")}}13.1b.2b=13.1b.3N?"3N":13.1q("1l-2b");13.1o.3p.x=2g(13.1o.1d.36("3p-1I-1e")||"0");13.1o.3p.y=2g(13.1o.1d.36("3p-1C-1e")||"0");13.1p.7P(17(){if(2!==13.1p.1N.2h){1a}13.1p.71("1N");13.1y=13.1p.1d.1O();13.d8();13.2p=1t;if(1t===13.1q("7Q")){t("aF",13.id);13.6B()}}.1G(13));if(1t!==13.1q("7Q")||"4x"==13.1q("4I")){13.1p.69(i(17(K){13.8M(K,1t)}).1G(13));13.5O=i(13.8I).1G(13).2G(8J)}13.cC()},2M:17(){13.dp();if(13.1b){13.1b.1d.5R()}if(13.6m){13.6m.2M();13.6m=1h}if(13.5L){13.5L.5R()}if(13.1J){i(z.1f.3T()).1E({6K:""})}i(13.4e).3o(17(H){i(H.48).2a("1r-6c-8E").2a(13.1q("5D")||"1r-$hQ-5G-4b-6I-2U$")},13);if(13.5Y){13.3R.3t(13.5Y);if(13.7I){13.5Y.4s("1V",13.7I)}}if(13.6G){13.3R.4s("7J",13.6G)}if(13.1d){13.1d.5R()}},8M:17(I,J){1c H=13.1p;if(2!==I.1l.2h){13.1p=I;13.2p=1t;13.1b.5Q(1j);1a}13.1p=I;13.1p.71(13.1J?"1l":"1N");13.1b.1p.1V=13.1p.aK("1l");13.1b.1d.2a("1r-3O");13.1b.1p.2r("2f");13.1b.1p.57("2f");13.1b.1d.1O();51(i(17(){1c L=13.1b.1p.1O(),K;13.38=13.1p.1O("1l");if(L.1e*L.1g>1&&L.1e*L.1g<13.38.1e*13.38.1g){13.38=L}13.1Y=z.3M(13.38);if("3O"==13.1b.1M){13.1b.1d.1P("1r-3O")}13.cc();13.1o.1p.1V=13.1p.1d.7K||13.1p.1d.1V;13.1b.5Q(13.1b.1M&&!(13.1J&&"3O"==13.1b.1M));13.2p=1t;13.56=1h;13.av();13.1d.1P("1r-2p");13.9E();if(H!==13.1p){t("cB",13.id,H.48,13.1p.48);if(13.7R){K=13.7R;13.7R=1h;13.4f(K.1p,K.c9)}}1m{if(!!J){t("aF",13.id)}}if(13.6u){13.1d.2K(13.6u.1x,13.6u)}1m{if(13.1J&&"4x"==13.1q("5W")){13.4z()}1m{if(!!J){13.6B()}}}}).1G(13),hS)},cC:17(){1c I=13.id,H,J;J=1z cD("1l\\\\-id(\\\\s+)?:(\\\\s+)?"+I+"($|;)");if(z.1f.2J.cE){H=z.$A(1k.co(\'[3I-1l-id="\'+13.id+\'"]\'));H=i(H).4K(z.$A(1k.co(\'[aN*="1l-id"]\')).33(17(K){1a J.2Z(K.2r("aN")||"")}))}1m{H=z.$A(1k.aQ("A")).33(17(K){1a I==K.2r("3I-1l-id")||J.2Z(K.2r("aN")||"")})}i(H).3o(17(L){1c K,M;i(L).1D("34",17(N){N.3r()});K=1z l().aI(L,13.6G);if(13.1p.1l.1V.4y(K.1l.1V)&&13.1p.1N.1V.4y(K.1N.1V)){i(K.48).1P("1r-6c-8E");K=13.1p;K.48=L}if(!K.4a&&13.1p.4a){K.4a=13.1p.4a}M=i(17(){13.4f(K)}).1G(13);i(L).1D("5K",17(N){if("cn"in N){N.cn()}},5);i(L).1D("2l "+("75"==13.1q("c8")?"7T 8B":"1T"),i(17(O,N){if(13.7S){3F(13.7S)}13.7S=1j;if("7T"==O.1x){13.7S=i(M).2G(N)}1m{if("2l"==O.1x||"1T"==O.1x){M()}}}).2X(13,60)).1P(13.1q("5D")).1P("1r-6c");K.7P();if(1t!==13.1q("7Q")){K.aO()}13.4e.3j(K)},13)},4f:17(H,I){if(!13.2p){13.7R={1p:H,c9:I};1a}if(!H||H===13.1p){1a 1j}13.4H(1h,1t);13.2p=1j;13.1d.2a("1r-2p");13.5O=i(13.8I).1G(13).2G(8J);H.69(i(17(P){1c J,Q,O,L,K,N,M=(z.1f.2I<10)?"1O":"7C";13.9E();P.71("1N");if(!P.1d){13.2p=1t;13.1d.1P("1r-2p");1a}13.c5(P);J=13.1p.1d[M]();if(13.1J){P.71("1l");O=z.$1z("3C").1P("1r-3b-bg");if(z.1f.2J.8O||z.1f.2I<10){O.3t(z.$1z("21",{1V:P.aK("1l")}).1E({2B:0}))}1m{O.3t(1z z.hU(P.1d).dt(b).aL().1E({2B:0}))}i(O).1E({"z-6W":-99}).2O(13.5L)}if(13.1J&&"1l"===13.1b.1M&&"4x"===13.1q("5W")){i(P.1d).1E({2B:0}).2O(13.1d);Q=J;K=[P.1d,13.1p.1d];N=[{2B:[0,1]},{2B:[1,0]}];i(P.1d).1E({"1Z-1e":1n.2k(P.1O("1l").1e,13.8p()),"1Z-1g":1n.2k(P.1O("1l").1g,13.7x())})}1m{13.1d.1E({1g:13.1d[M]().1g});13.1p.1d.1E({2b:"4W",1C:0,1I:0,2H:0,2z:0,1e:"2E%",1g:"2E%","1Z-1e":"","1Z-1g":""});i(P.1d).1E({"1Z-1e":1n.2k(P.1O(13.1J?"1l":"1N").1e,13.1J?13.8p():6r),"1Z-1g":1n.2k(P.1O(13.1J?"1l":"1N").1g,13.1J?13.7x():6r),2b:"hP",1C:0,1I:0,2B:0,2C:""}).2O(13.1d);Q=i(P.1d)[M]();if(!I){i(P.1d).1E({"2k-1e":J.1e,1g:J.1g,"1Z-1e":J.1e,"1Z-1g":""})}13.1d.1E({1g:"",6K:""}).1O();i(P.1d).1O();K=[P.1d,13.1p.1d];N=[z.1W({2B:[0,1]},I?{4g:[0.6,1]}:{"2k-1e":[J.1e,Q.1e],"1Z-1e":[J.1e,Q.1e],1g:[J.1g,Q.1g]}),{2B:[1,0]}]}if(13.1J){if(13.5w.40&&O.40){L=i(13.5w.40).36("2B");if(z.1f.5M){K=K.4K([O.40]);N=N.4K([{2B:[0.au,L]}])}1m{K=K.4K([O.40,13.5w.40]);N=N.4K([{2B:[0.au,L]},{2B:[L,0.au]}])}}}1z z.ao(K,{4S:(I||13.1q("c6"))?I?8J:hJ:0,2t:I?"7q-7t(0.9L, 0.c2, 0.hI, 1)":(J.1e==Q.1e)?"8q":"7q-7t(0.25, .1, .1, 1)",6O:i(17(){13.1p.1d.2U().2r("2f");13.1p.1d.57("2f");i(P.1d).1E(13.1J?{1e:"2u",1g:"2u"}:{1e:"",1g:""}).1E({"2k-1e":"","2k-1g":"",2B:"","1Z-1e":1n.2k(P.1O(13.1J?"1l":"1N").1e,13.1J?13.8p():6r),"1Z-1g":1n.2k(P.1O(13.1J?"1l":"1N").1g,13.1J?13.7x():6r)});if(13.1J){13.5w.2U();13.5w=2s;13.5w=O.66("z-6W",-2E);i(13.5w.40).1E({2B:""});if(13.6Y){if(P.3L){if(P.4a){13.6Y.6a("").3t(z.$1z("a",{6X:P.4a}).1D("2l 1T",13.an.1G(13)).6a(P.3L))}1m{13.6Y.6a(P.3L).1P("1r-6d")}}1m{13.6Y.2a("1r-6d")}}}13.8M(P)}).1G(13),9N:i(17(R,S){if(2s!==R.4g){S.66("2C","4g("+R.4g+")")}})}).4F(N)}).1G(13))},c5:17(I){1c H=1j;i(13.4e).3o(17(J){i(J.48).2a("1r-6c-8E");if(J===I){H=1t}});if(H&&I.48){i(I.48).1P("1r-6c-8E")}if(13.6m){13.6m.hN(I.hM)}},cc:17(H){if(13.1p.3L&&"3K"!==13.1q("72")&&"2D"!==13.1b.1M){if(!13.1b.3L){13.1b.3L=z.$1z("3C",{"4b":"1r-3L"}).2O(13.1b.1d.1P("3L-"+13.1q("72")))}13.1b.3L.6a(13.1p.3L)}},6B:17(H,K,I){1c J;if(!13.1J){if(13.6i<=0){1a}if(1t!==I){13.6i--}}if(2s===K||1h===K){if(!13.1b.2F&&!13.1b.37){if(13.1q("3V")&&(13.1b.4V||!13.1p.2e())){if("75"==13.1b.6l){K=13.1q("9Q")}1m{if("34"==13.1b.6l){K=13.1q("9J")}}}1m{K=13.1q("3b")?13.1q("ck"):""}}1m{K=13.1q("3b")?13.1q("ck"):""}}if(!K){13.cl();1a}J=13.1d;if(!13.2V){13.2V=z.$1z("3C",{"4b":"1r-2V"});13.9C=z.$1z("9I",{"4b":"1r-2V-i7"}).3t(1k.7O(K)).2O(13.2V);i(13.2V).2O(13.1d)}1m{i(13.9C).6a(K)}13.2V.1E({"2t-9A":""}).2a("1r-2V-3S");if(13.1J){J=13.8H}1m{if((13.1b.2F||13.1b.37)&&"2D"!==13.1b.1M&&"2m"==13.1b.2b){J=13.1b.1d}}if(1t===H){51(i(17(){13.2V.1P("1r-2V-3S")}).1G(13),16)}13.2V.2O(J)},cl:17(){if(13.2V){13.2V.1E({"2t-9A":"i6"}).1P("1r-2V-3S")}},8I:17(){if(!13.5q){13.5q=z.$1z("3C",{"4b":"1r-i8"});13.1d.3t(13.5q);13.5q.1O()}13.5q.1P("cj")},9E:17(){3F(13.5O);13.5O=1h;if(13.5q){i(13.5q).2a("cj")}},7y:17(J,N){1c M=z.3M(13.1b.1y),L=(!13.1J&&13.1b.3N)?i(13.1b.3N).1O():{1e:0,1g:0},I,H,K=13.1y,O={x:0,y:0};N=N||13.1b.2b;13.6q=13.1p.1d.1O();13.1y=13.1p.1d.1O();13.1R=13.1p.1d.7C();if(!L.1g){L=13.1y}if(1j===13.1q("ci")||1j===13.1b.1M||"3O"===13.1b.1M){J=1j}if("3O"==13.1b.1M){if("2u"===M.1e){M.1e=13.38.1e}if("2u"===M.1g){M.1g=13.38.1g}}if(13.1J&&"2D"==13.1b.1M){M.1e=70;M.1g="2u"}if("2D"==13.1b.1M&&"2u"===M.1g){13.1b.1e=2g(M.1e/2E)*1n.2k(L.1e,L.1g);13.1b.1g=13.1b.1e}1m{if("1l"==13.1b.1M&&"2m"==N){13.1y=13.1d.1O();L=13.1y;13.1R=13.1d.7C();13.1b.1e=L.1e;13.1b.1g=L.1g}1m{13.1b.1e=("%"===M.67)?2g(M.1e/2E)*L.1e:5V(M.1e);13.1b.1g=("%"===M.5P)?2g(M.1g/2E)*L.1g:5V(M.1g)}}if("3O"==13.1b.1M){H=1n.2k(1n.2k(13.1b.1e/13.38.1e,13.1b.1g/13.38.1g),1);13.1b.1e=13.38.1e*H;13.1b.1g=13.38.1g*H}13.1b.1e=1n.3A(13.1b.1e);13.1b.1g=1n.3A(13.1b.1g);13.1b.7N=13.1b.1e/13.1b.1g;13.1b.1d.1E({1e:13.1b.1e,1g:13.1b.1g});if(J){L=13.1J?13.5L.1O():13.1b.1d.1O();if(!13.1J&&(13.6q.1e*13.6q.1g)/(13.38.1e*13.38.1g)>0.8){13.1Y.1e=1.5*13.38.1e;13.1Y.1g=1.5*13.38.1g}1m{13.1Y=z.3M(13.38)}}if(1j!==13.1b.1M&&!13.1b.2F&&!(13.1J&&"4x"==13.1q("5W"))){if((13.6q.1e*13.6q.1g)/(13.1Y.1e*13.1Y.1g)>0.8){13.1Y=z.3M(13.38);13.1b.5Q(1j)}1m{13.1b.5Q(1t)}}13.1b.1p.1E({1e:13.1Y.1e,1g:13.1Y.1g});I=13.1b.1d.am();13.1b.4G=1n.3A(I.1e);13.1b.4d=1n.3A(I.1g);13.1o.1e=1n.3A(13.1b.4G/(13.1Y.1e/13.1y.1e));13.1o.1g=1n.3A(13.1b.4d/(13.1Y.1g/13.1y.1g));13.1o.1d.1E({1e:13.1o.1e,1g:13.1o.1g});13.1o.1p.1E(13.1y);z.1W(13.1o,13.1o.1d.1O());if(13.1b.2F){3F(13.4q);13.4q=1h;if(13.1o.5h){13.1o.2P.x*=(13.1y.1e/K.1e);13.1o.2P.y*=(13.1y.1g/K.1g);O.x=13.1o.4Y.x;O.y=13.1o.4Y.y}1m{O.x=13.1R.1I+13.1o.1e/2+(13.1o.2P.x*(13.1y.1e/K.1e));O.y=13.1R.1C+13.1o.1g/2+(13.1o.2P.y*(13.1y.1g/K.1g))}13.7n(1h,O)}},8N:17(L){1c O,N,H,M,K,J,I=i(13.1d).24("cr");H=a(5);K=13.1b.2b;M=13.1J?"2m":13.1b.3N?"3N":13.1q("1l-2b");J=13.1J&&"1l"==13.1b.1M?13.5L:1k.3u;if(13.1J){H.y=0;H.x=0}if(!L){13.7y(1t,M)}O=13.1R.1C;if("2D"!==13.1b.1M){if(L){13.7y(1j);1a}4n(M){1A"2m":1A"3N":O=0;N=0;1B;1A"1C":O=13.1R.1C-13.1b.1g-13.1q("1l-4D");if(H.1C>O){O=13.1R.2H+13.1q("1l-4D");M="2H"}N=13.1R.1I;1B;1A"2H":O=13.1R.2H+13.1q("1l-4D");if(H.2H<O+13.1b.1g){O=13.1R.1C-13.1b.1g-13.1q("1l-4D");M="1C"}N=13.1R.1I;1B;1A"1I":N=13.1R.1I-13.1b.1e-13.1q("1l-4D");if(H.1I>N&&H.2z>=13.1R.2z+13.1q("1l-4D")+13.1b.1e){N=13.1R.2z+13.1q("1l-4D");M="2z"}1B;1A"2z":1X:N=13.1R.2z+13.1q("1l-4D");if(H.2z<N+13.1b.1e&&H.1I<=13.1R.1I-13.1b.1e-13.1q("1l-4D")){N=13.1R.1I-13.1b.1e-13.1q("1l-4D");M="1I"}1B}4n(13.1q("1l-2b")){1A"1C":1A"2H":if(H.1C>O||H.2H<O+13.1b.1g){M="2m"}1B;1A"1I":1A"2z":if(H.1I>N||H.2z<N+13.1b.1e){M="2m"}1B}13.1b.2b=M;if(!13.1b.37&&!13.1b.2F){if(z.1f.3f&&!13.1J&&"1l"==13.1b.1M){if(13.1q("3b")){13.1b.5Q("2m"!==M)}1m{if("34"!==13.1q("4I")){13.1b.6l="2m"===M?"34":13.1q("4I");13.cL();13.dg();13.a0("34"===13.1b.6l);13.9K("34"===13.1b.6l&&!13.1q("3b"))}}13.6B(1j,1h,1t)}1a}13.7y(1j);if(L){1a}if("3N"==M){J=13.1b.3N;H.y=0;H.x=0}if("2m"==M){if("3O"!==13.1b.1M){13.1b.1d.1P("1r-2m");13.1d.1P("1r-2m-1l")}13.1o.4l();O=13.1R.1C+H.y;N=13.1R.1I+H.x;if(!13.1J&&z.1f.2I&&z.1f.2I<11){O=0;N=0;J=13.1d}}1m{O+=H.y;N+=H.x;13.1d.2a("1r-2m-1l");13.1b.1d.2a("1r-2m")}13.1b.1d.1E({1C:O,1I:N})}1m{13.7y(1j);J=13.1d}13.1b.1d[13.1J?"1P":"2a"]("1r-1J");if(!13.1J&&I){I.2O("1l"==13.1b.1M&&"2m"==M?13.1b.1d:13.1d,((1n.5f(1n.65()*ch)+1)%2)?"1C":"2H")}13.1b.1d.2O(J)},di:17(N){1c J,H,L,K,M=1j,I=N.a9?5:3/54;i(N).2M();I=(2E+I*1n.43(N.7A))/2E;if(N.7A<0){I=1/I}if("2D"==13.1b.1M){H=1n.1Z(2E,1n.5g(13.1b.1e*I));H=1n.2k(H,13.1y.1e*0.9);L=H/13.1b.7N;13.1b.1e=1n.3A(H);13.1b.1g=1n.3A(L);13.1b.1d.1E({1e:13.1b.1e,1g:13.1b.1g});J=13.1b.1d.am();13.1b.4G=1n.3A(J.1e);13.1b.4d=1n.3A(J.1g);M=1t}1m{if(!13.1J&&"1l"==13.1b.1M){H=1n.1Z(50,1n.5g(13.1o.1e*I));H=1n.2k(H,13.1y.1e*0.9);L=H/13.1b.7N;13.1Y.1e=1n.3A((13.1b.4G/H)*13.1y.1e);13.1Y.1g=1n.3A((13.1b.4d/L)*13.1y.1g);13.1b.1p.1E({1e:13.1Y.1e,1g:13.1Y.1g})}1m{1a}}K=i(1i).6o();13.1o.1e=1n.3A(13.1b.4G/(13.1Y.1e/13.1y.1e));13.1o.1g=1n.3A(13.1b.4d/(13.1Y.1g/13.1y.1g));13.1o.1d.1E({1e:13.1o.1e,1g:13.1o.1g});z.1W(13.1o,13.1o.1d.1O());if(13.1b.2F){3F(13.4q);13.4q=1h;if(M){13.4q=1t}13.7n(1h,{x:N.x-K.x,y:N.y-K.y});if(M){13.4q=1h}}},a0:17(J){1c I;1c H=J?"3m 1T":"4Q"+(1i.2i.2S?" 5H":1i.2i.8v?" 6x":"")+(1i.2i.2S?" 4X":1i.2i.8v?" 5E":" 5I");1c K=13.1d.24("1r:4E:4z:fn",(!J)?i(17(L){if(c(L)&&!h(L)){1a}if(L&&"3a"===L.29&&"5H"!==L.1x){1a}I=(z.1f.2I<9)?z.1W({},L):L;if(!13.56){3F(13.56);13.56=51(i(17(){13.4z(I)}).1G(13),i2)}}).2X(13):i(13.4z).2X(13));13.1d.2T("1r:4E:4z:1w",H).1D(H,K,10)},cL:17(I){1c H=13.1d.24("1r:4E:4z:1w"),J=13.1d.24("1r:4E:4z:fn");13.1d.1Q(H,J);13.1d.2R("1r:4E:4z:fn")},9K:17(I){1c H=I?"3m 1T":"5s"+(1i.2i.2S?" 4O a5 4X":1i.2i.8v?" 5B de 5E":" 8B 5I");1c J=13.1d.24("1r:4E:4H:fn",i(17(L){if(c(L)&&!h(L)){1a}if(L&&L.1x==="4O"&&L.29!=="3a"){1a}if(L&&(L.1x==="4X"||L.1x==="5E"||L.1x==="5I")){if(!13.2p||!13.1b.4V||!13.1b.2F){1a}1c K=L.6D();if(K.x<13.1R.1I||K.x>13.1R.2z||K.y<13.1R.1C||K.y>13.1R.2H){13.4H(L);1a}}1m{if(13.1b.1d!==L.7k()&&!((13.1b.2b==="2m"||13.1b.1M==="2D")&&13.1b.1d.9V(L.7k()))&&!13.1d.9V(L.7k())){13.4H(L);1a}}}).2X(13));13.1d.2T("1r:4E:4H:1w",H).1D(H,J,20)},dg:17(){1c H=13.1d.24("1r:4E:4H:1w"),I=13.1d.24("1r:4E:4H:fn");13.1d.1Q(H,I);13.1d.2R("1r:4E:4H:fn")},d8:17(){13.cX=13.4Z.1G(13);13.1d.1D(["4Q",1i.2i.2S?"5H":"6x"],i(17(H){if((z.1f.7l||"6N"===z.1f.5A&&z.1f.5M)&&13.1q("3V")&&"34"!==13.1q("4I")&&"4Q"===H.1x){H.3r();if(z.1f.5M){H.4J()}}if(!13.1b.2F){1a}if("2m"===13.1b.2b){13.1o.4Y=H.6D()}}).2X(13),10);13.1d.1D(["5s",1i.2i.2S?"4O":"5B"],i(17(H){if(c(H)&&h(H)){13.1o.6z=1j}}).2X(13),10);13.1d.1D("7i "+("6N"===z.1f.5A?"":1i.2i.2S?"4X":1i.2i.8v?"5E":"5I"),i(13.7n).2X(13));if(13.1q("3V")){13.a0("34"===13.1q("4I"));13.9K("34"===13.1q("4I")&&!13.1q("3b"))}13.1d.1D("5K",17(H){H.4J()},10).1D("1T",i(17(H){13.1d.da("db","34");if(13.1J){13.5L.2K("1T",H)}}).1G(13),15);if(13.1q("3b")){13.1d.1D("2l 1T",i(13.3b).2X(13),15)}1m{13.1d.1D("2l 1T",i(13.an).2X(13),15)}if(13.4e.1H>1){13.cZ()}if(!z.1f.3f&&13.1q("dh")){13.1d.1D("4i",13.di.2X(13))}i(1i).1D(z.1f.3f?"8t":"8t 8s",13.9U)},dp:17(){if(13.1d){13.1d.1Q("4i")}i(1i).1Q("8t 8s",13.9U);i(13.4e).3o(17(H){i(H.48).9X()})},4z:17(N){1c O,M,K,L,H,I=0,J=0;if(!13.2p||!13.1b.4V||13.1b.2F||13.1b.37){if(!13.1p.2e()){if(N){13.6u=e(N);N.5c()}13.1p.69(13.8M.1G(13));if(!13.5O){13.5O=i(13.8I).1G(13).2G(8J)}}1a}if(N&&"4X"==N.1x&&"3a"==N.29){1a}if(!13.1q("3V")&&13.1q("3b")&&!13.1J){13.1b.2F=1t;1a}13.1b.37=1t;if(13.1J&&"1l"==13.1b.1M){L=13.1p.1d.7f();13.a6.1P("1r-1l-in");H=13.8H.7f();J=((L.1I+L.2z)/2-(H.1I+H.2z)/2);I=((L.1C+L.2H)/2-(H.1C+H.2H)/2)}13.1b.1p.1Q("3q");13.1b.1d.2a("1r-7X").1Q("3q");13.1b.1d.1P("1r-37");13.1d.1P("1r-37");13.8N();M=("1l"==13.1b.1M)?13.1b.2b:13.1b.1M;if(z.1f.2J.2t&&!(13.1J&&"4x"==13.1q("5W"))){if("2m"==M){K=13.1p.1d.1O();13.1b.1p.1E({2C:"5T(0,"+I+"2N, 0) 4g("+K.1e/13.1Y.1e+", "+K.1g/13.1Y.1g+")"}).1O();13.1b.1p.1D("3q",i(17(){13.1b.1p.1Q("3q");13.1b.1d.2a("1r-37 1r-p-"+M);13.1b.37=1j;13.1b.2F=1t}).1G(13));13.1b.1d.1P("1r-p-"+M).1O();if(!z.1f.3f&&z.1f.5S&&("5S"===z.1f.4R||"6s"===z.1f.4R)){13.1b.37=1j;13.1b.2F=1t}}1m{13.1b.1d.1D("3q",i(17(){13.1b.1d.1Q("3q");13.1b.1d.2a("1r-37 1r-p-"+M)}).1G(13));13.1b.1d.1E({2t:"2Q"});13.1b.1d.1P("1r-p-"+M).1O();13.1b.1d.1E({2t:""}).1O();13.1b.1d.2a("1r-p-"+M);13.1b.37=1j;13.1b.2F=1t}}1m{13.1b.1d.2a("1r-37");13.1b.37=1j;13.1b.2F=1t}if(!13.1J){13.6B(1t)}if(N){N.2M().5c();O=N.6D();if("2D"==13.1b.1M&&(/2l/i).2Z(N.1x)){O.y-=13.1b.1g/2+10}if("2m"==M&&((/2l/i).2Z(N.1x)||c(N))){13.1o.2P={x:0,y:0};O.x=-(O.x-13.1R.1I-13.1y.1e/2)*(13.1Y.1e/13.1y.1e);O.y=-(O.y-13.1R.1C-13.1y.1g/2)*(13.1Y.1g/13.1y.1g)}}1m{O={x:13.1R.1I+(13.1R.2z-13.1R.1I)/2,y:13.1R.1C+(13.1R.2H-13.1R.1C)/2};if(z.1f.3f&&13.1J&&"4x"===13.1q("5W")){13.1o.5h=1t;13.1o.2P={x:0,y:0};O.x=-(O.x-13.1R.1I-13.1y.1e/2)*(13.1Y.1e/13.1y.1e);O.y=-(O.y-13.1R.1C-13.1y.1g/2)*(13.1Y.1g/13.1y.1g)}}13.1d.2a("1r-37").1P("1r-2F");O.x+=-J;O.y+=-I;13.1o.4Y={x:0,y:0};13.1o.dx=0;13.1o.dy=0;13.7n(N,O,1t);t("dm",13.id)},4H:17(J,O){1c M,K,H,I,L=0,N=0,P=13.1b.2F;13.6u=1h;if(!13.2p){1a}if(J&&"a5"==J.1x&&"3a"==J.29){1a}3F(13.4q);13.4q=1h;3F(13.56);13.56=1h;13.1b.37=1j;13.1b.2F=1j;if(1t!==O&&!13.1J){if(P){if(z.1f.3f&&!13.1J&&"1l"==13.1b.1M){13.8N()}1m{13.6B()}}}if(!13.1b.4V){1a}if(J){J.2M()}13.1b.1p.1Q("3q");13.1b.1d.2a("1r-37").1Q("3q");if(13.1J){I=13.8H.7f();if("4x"!==13.1q("5W")){13.a6.2a("1r-1l-in")}13.1p.1d.1E({"1Z-1g":13.7x()});H=13.1p.1d.7f();N=((H.1I+H.2z)/2-(I.1I+I.2z)/2);L=((H.1C+H.2H)/2-(I.1C+I.2H)/2)}M=("1l"==13.1b.1M)?13.1b.2b:13.1b.1M;if(z.1f.2J.2t&&J&&!(13.1J&&"4x"==13.1q("5W"))){if("2m"==M){13.1b.1p.1D("3q",i(17(){13.1b.1p.1Q("3q");13.1d.2a("1r-2F");51(i(17(){13.1b.4l()}).1G(13),32)}).1G(13));K=13.1p.1d.1O();13.1b.1d.1P("1r-7X 1r-p-"+M).1O();13.1b.1p.1E({2C:"5T(0,"+L+"2N,0) 4g("+K.1e/13.1Y.1e+", "+K.1g/13.1Y.1g+")"})}1m{13.1b.1d.1D("3q",i(17(){13.1b.4l();13.1d.2a("1r-2F")}).1G(13));13.1b.1d.36("2B");13.1b.1d.1P("1r-7X 1r-p-"+M);13.1d.2a("1r-2F")}}1m{13.1b.4l();13.1d.2a("1r-2F")}13.1o.dx=0;13.1o.dy=0;13.1o.4Y={x:0,y:0};13.1o.4l();if(P){t("cU",13.id)}},7n:17(R,Q,P){1c J=Q,L,K,N=0,I,M=0,H,S,O=1j;if(!13.1b.2F&&!P){1a}if(R){i(R).3r().4J();if(c(R)&&!h(R)){1a}O=(/2l/i).2Z(R.1x)||c(R);if(O&&!13.1o.6z){13.1o.6z=O}if(!J){J=R.6D()}}if("3O"==13.1b.1M){1a}if("1l"==13.1b.1M&&"2m"===13.1b.2b&&(R&&O||!R&&13.1o.5h)){13.1o.5h=1t;L=13.1o.2P.x+(J.x-13.1o.4Y.x);K=13.1o.2P.y+(J.y-13.1o.4Y.y);13.1o.4Y=J;N=1n.2k(0,13.1b.4G-13.1Y.1e)/2;I=-N;M=1n.2k(0,13.1b.4d-13.1Y.1g)/2;H=-M}1m{13.1o.5h=1j;if("2D"==13.1b.1M){J.y=1n.1Z(13.1R.1C,1n.2k(J.y,13.1R.2H));J.x=1n.1Z(13.1R.1I,1n.2k(J.x,13.1R.2z))}L=J.x-13.1R.1I;K=J.y-13.1R.1C;I=13.1y.1e-13.1o.1e;H=13.1y.1g-13.1o.1g;L-=13.1o.1e/2;K-=13.1o.1g/2}if("2D"!==13.1b.1M){L=1n.1Z(N,1n.2k(L,I));K=1n.1Z(M,1n.2k(K,H))}13.1o.2P.x=L=1n.5g(L);13.1o.2P.y=K=1n.5g(K);if("1l"==13.1b.1M&&"2m"!=13.1b.2b){if(z.1f.2J.2C){13.1o.1d.1E({2C:"7V("+13.1o.2P.x+"2N,"+13.1o.2P.y+"2N)"});13.1o.1p.1E({2C:"7V("+-(13.1o.2P.x+13.1o.3p.x)+"2N, "+-(13.1o.2P.y+13.1o.3p.y)+"2N)"})}1m{13.1o.1d.1E({1C:13.1o.2P.y,1I:13.1o.2P.x});13.1o.1p.1E({1C:-(13.1o.2P.y+13.1o.3p.y),1I:-(13.1o.2P.x+13.1o.3p.x)})}}if("2D"==13.1b.1M){if(13.1o.6z&&!(R&&"3m"==R.1x)){J.y-=13.1b.1g/2+10}13.1b.1d.1E({1C:J.y-13.1R.1C-13.1b.1g/2,1I:J.x-13.1R.1I-13.1b.1e/2})}if(!13.4q){13.1o.dx=0;13.1o.dy=0;13.4Z(1)}},4Z:17(K){1c J;1c I;1c H;1c L;if(!hz(K)){if(13.1o.5h){K=13.1o.6z?0.4:0.16}1m{K=13.1q("cV")?0.2:13.1o.6z?0.4:0.8}}J=((13.1o.2P.x-13.1o.dx)*K);I=((13.1o.2P.y-13.1o.dy)*K);13.1o.dx+=J;13.1o.dy+=I;if(!13.4q||1n.43(J)>0.at||1n.43(I)>0.at){if(13.1o.5h){H=13.1o.dx;L=13.1o.dy}1m{H=(13.1o.dx*(13.1Y.1e/13.1y.1e)-1n.1Z(0,13.1Y.1e-13.1b.4G)/2);L=(13.1o.dy*(13.1Y.1g/13.1y.1g)-1n.1Z(0,13.1Y.1g-13.1b.4d)/2);if(13.1b.1M==="2D"){H=1n.5g(H);L=1n.5g(L)}H=-H;L=-L}13.1b.1p.1E(z.1f.2J.2C?{2C:g+H+"2N,"+L+"2N"+B+" 4g(1)"}:{1I:-(13.1o.dx*(13.1Y.1e/13.1y.1e)+1n.2k(0,13.1Y.1e-13.1b.4G)/2),1C:-(13.1o.dy*(13.1Y.1g/13.1y.1g)+1n.2k(0,13.1Y.1g-13.1b.4d)/2)})}if("2D"==13.1b.1M){1a}13.4q=51(13.cX,16)},cZ:17(){1c T,J,O=30,L=hv,Q,R="",I={},H,N,S=0,U={2t:z.1f.az+89.d0(32)+"cS 7q-7t(.18,.35,.58,1)"},K,P,M=i(17(V){if(!13.2p||13.1b.2F){1a}if(V.2h=="3s"){3F(13.56);13.56=1h;S=0;I={x:V.x,y:V.y,d5:V.2A};T=13.1y.1e;J=T/2;13.1p.1d.1Q("3q");13.1p.1d.66("2t","");13.1p.1d.66("2C","5T(0, 0, 0)");P=1h}1m{H=(V.x-I.x);N={x:0,y:0,z:0};if(1h===P){P=(1n.43(V.x-I.x)<1n.43(V.y-I.y))}if(P){1a}V.2M();if("ay"==V.2h){S=0;K=1h;Q=V.2A-I.d5;if(1n.43(H)>J||(Q<L&&1n.43(H)>O)){if((R=(H>0)?"cM":(H<=0)?"hA":"")){if(R=="cM"){K=13.9n();S+=T*10}1m{K=13.96();S-=T*10}}}N.x=S;N.dl=-90*(N.x/T);13.1p.1d.1D("3q",i(17(W){13.1p.1d.1Q("3q");13.1p.1d.66("2t","");if(K){13.1p.1d.1E({2C:"5T("+N.x+"2N, 6v, 6v)"});13.4f(K,1t)}}).1G(13));13.1p.1d.1E(U);13.1p.1d.1E({"2t-4S":N.x?"ha":"cS",2B:1-0.7*1n.43(N.x/T),2C:"5T("+N.x+"2N, 6v, 6v)"});H=0;1a}N.x=H;N.z=-50*1n.43(N.x/J);N.dl=-60*(N.x/J);13.1p.1d.1E({2B:1-0.7*1n.43(N.x/J),2C:"5T("+N.x+"2N, 6v, "+N.z+"2N)"})}}).1G(13);13.1d.1D("2j",M)},an:17(){if(13.1p.4a){1i.a3(13.1p.4a,"hF")}},96:17(){1c H=(13.1J?13.a2:13.4e).33(17(K){1a(-1!==K.1N.2h||-1!==K.1l.2h)}),I=H.1H,J=i(H).4c(13.1p)+1;1a(1>=I)?1h:H[(J>=I)?0:J]},9n:17(){1c H=(13.1J?13.a2:13.4e).33(17(K){1a(-1!==K.1N.2h||-1!==K.1l.2h)}),I=H.1H,J=i(H).4c(13.1p)-1;1a(1>=I)?1h:H[(J<0)?I-1:J]},c4:17(I,J){1c H=13.4e.33(17(K){1a((K.1l.1V.4y(I)||K.1l.2c.4y(I))&&(K.1N.1V.4y(J)||K.1N.2c.4y(J)))})||[];1a H[0]||((J&&I&&"1S"===z.1K(J)&&"1S"===z.1K(I))?1z l(J,I):1h)},aw:17(I){1c H=13.4e.33(17(J){1a(J.48===I)})||[];1a H[0]},cF:17(H){1a 13.4e[H]}};u={49:"dd.2.1 i1",4F:17(K,I){1c J=1h,H=[];z.$A((K?[i(K)]:z.$A(1k.a8("a4")).4K(z.$A(1k.a8("9i"))))).3o((17(L){if(i(L)){if(!j(L)){J=1z k(L,I);if(y&&!J.1q("9S")){J.2M();J=1h}1m{E.3j(J);H.3j(J)}}}}).1G(13));1a K?H[0]:H},2M:17(K){1c I,J,H;if(K){(J=j(K))&&(J=E.80(E.4c(J),1))&&J[0].2M()&&(4T J[0]);1a}5x(I=E.1H){J=E.80(I-1,1);J[0].2M();4T J[0]}},hW:17(H){13.2M(H);1a 13.4F(H)},4f:17(M,L,K,I){1c J=j(M),H;if(J){H="5U"===z.1K(L)?J.aw(L):J.c4(L,K);if(H){J.4f(H)}}},hK:17(K,J){1c I=j(K),H;if(I){4n(z.1K(J)){1A"5U":H=I.aw(J);1B;1A"5d":H=I.cF(J);1B;1X:}if(H){I.4f(H)}}},gt:17(I){1c H;(H=j(I))&&H.4f(H.9n())},gy:17(I){1c H;(H=j(I))&&H.4f(H.96())},gg:17(I){1c H;(H=j(I))&&H.4z()},gU:17(I){1c H;(H=j(I))&&H.4H()},bU:17(H,I){if(!q[H]){q[H]=[]}if("17"==z.1K(I)){q[H].3j(I)}},gV:17(H){1a!!j(H)}};i(1k).1D("8b",17(){1c I=1i[C+"6A"]||{};s=s();d();G=z.$1z("3C",{"4b":"3d-3S-bA"}).2O(1k.3u);F=(z.1f.3f&&1i.by&&1i.by("(1Z-bu-1e: bY), (1Z-bu-1g: bY)").eo);if(z.1f.3f){z.1W(p,m)}1L(1c H=0;H<A.1H;H++){if(I[A[H]]&&z.$F!==I[A[H]]){u.bU(A[H],I[A[H]])}}u.4F();y=1j});1i.9i=1i.9i||{};1a u})();',62,1263,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this||||function|||return|zoomBox|var|node|width|browser|height|null|window|false|document|zoom|else|Math|lens|image|option|mz|Event|true|options|Custom|event|type|size|new|case|break|top|jAddEvent|jSetCss|handler|jBind|length|left|expanded|jTypeOf|for|mode|small|jGetSize|jAddClass|jRemoveEvent|boundaries|string|btnclick|arguments|src|extend|default|zoomSize|max||img|||jFetch||important|call||pointerType|jRemoveClass|position|url||loaded|style|parseFloat|state|navigator|touchdrag|min|tap|inner|clientX||ready|clientY|getAttribute|undefined|transition|auto|prototype|changedTouches||mousedrag|right|timeStamp|opacity|transform|magnifier|100|active|jDelay|bottom|ieMode|features|jCallEvent|enum|stop|px|jAppendTo|pos|none|jDel|pointerEnabled|jStore|jRemove|hint|handle|jBindAsEvent|try|test||||filter|click||jGetCss|activating|zoomSizeOrigin||touch|expand|oneOf|magic|defined|mobile|match|catch|Doc|push|init|Class|dbltap|identifier|jEach|border|transitionend|stopDefaults|dragstart|append|body|hasOwnProperty|webkit|boolean|touchpinch|Element|ceil|button|div|target|pushToEvents|clearTimeout|dblbtnclick|array|data|touches|off|caption|detach|custom|preview|replace|styles|placeholder|hidden|getDoc|J_TYPE|zoomMode|listeners|parent|schema|pow|firstChild|reverse||abs|||||origin|version|link|class|indexOf|innerHeight|additionalImages|update|scale|pageY|mousescroll|pageX|trident|hide|direction|switch|requestAnimationFrame|domPrefix|moveTimer|jTrim|setAttribute|toLowerCase|instanceof|MSPOINTER_TYPE_TOUCH|visibility|always|has|activate|documentElement|constructor|messageBox|distance|handlers|start|innerWidth|deactivate|zoomOn|stopDistribution|concat|add|contains|cubicBezier|pointerup|jCamelize|touchstart|uaName|duration|delete|FX|enabled|absolute|pointermove|spos|move||setTimeout|timer||||activateTimer|removeAttribute||J_UUID|dragged|parentNode|stopQueue|number|nodeType|floor|round|innertouch|targetTouches|onload|events|figure|dppx|getAbsoluteURL|onerror|mouseup|loadingBox|Array|touchend|now|display|jGetPageXY|expandBg|while|throw|apply|platform|MSPointerUp|isQueueStopped|cssClass|MSPointerMove|className|css|pointerdown|mousemove|shift|mousedown|expandBox|gecko|addCSS|loadTimer|hunits|enable|kill|chrome|translate3d|element|parseInt|expandZoomOn|ease|originalImg|fullScreen|||getButton|render|Object|random|jSetCssProp|wunits||load|changeContent|onTouchEnd|thumb|show|MagicJS|padding|join|ms|hintRuns|_handlers|tooltip|trigger|expandThumbs|found|jGetScroll|onready|normalSize|Infinity|opera|minimum|initEvent|0px|not|MSPointerDown|threshold|touchmovement|Options|showHint|easeFn|getClientXY|cycles|toUpperCase|originalTitle|set|to|tm|overflow|end|200|android|onComplete|onTouchStart|timedout|alternate|continuous|callback|engine|oncomplete|index|href|expandCaption|byTag||setCurNode|zoomCaption|sqrt|object|hover|visible||crMz|no|Transition|uaVersion|fromJSON|scrollLeft|on|jGetRect|parseCubicBezier|split|touchmove|storage|getRelated|androidBrowser|createElement|animate|_timer|toString|cubic|_unbind|_cleanup|bezier|readyState|complete|continue|expandMaxHeight|setSize|_EVENTS_|deltaY|scrollTop|getBoundingClientRect|typeof|createEvent|forceAnimation|charAt|implement|originalImgSrc|title|currentSrc|loopBind|eventType|aspectRatio|createTextNode|loadSmall|lazyZoom|nextImage|updateTimer|mouseover|exists|translate|magiczoom|deactivating|dashize|setProps|splice|getStorage||isNaN||||_bind|perspective|String|xhr|domready|status|hideTimer|normalizeCSS|fromString|handleMouseUp|pStyles_arr|dblclick|relatedTarget|pStyles|cancelAnimationFrame|callee|onprogress|J_EUID|expandMaxWidth|linear|pointerId|scroll|resize|XMLHttpRequest|msPointerEnabled|win|Message|svg|fallback|Opacity|mouseout|_event_prefix_|onTouchMove|selected|reset|compatMode|expandFigure|showLoading|400|exitFullscreen|btnclickEvent|setupZoom|reflowZoom|cssFilters|isPrimary|tagName|HTMLElement|Pltm|maximum|Za|el_arr|ifndef|hideFX|capable|resizeTimer||mgctlbx|zoomPosition|getElementsByClassName|||getNext|Date|||primaryImage|10000px|styles_arr|getTarget|assign|removeChild|loadImg|slice|MagicZoomPlus|_event_add_|forceTouch|touchScreen|temporary|getPrev|cssDomPrefix|dispatchEvent|Alpha|_event_del_|J_EXT|once|priority|Tooltip|text|uuid|cubicBezierAtTime|calc|delay|opr|hintMessage|previousScale|hideLoading|handleTouchMove|handleTouchEnd|handleTouchStart|span|textClickZoomHint|registerDeactivateEvent|175|errorEventName|onBeforeRender|startTime|cycle|textHoverZoomHint|stopAnimation|autostart|presto|onResize|hasChild|deltaX|jClearEvents|deltaMode|onabort|registerActivateEvent|loadedBytes|expandGallery|open|MagicZoom|pointerout|expandStage|05|byClass|isMouse||||||||||||abort|getInnerSize|openLink|PFX|changeEventName|runtime|handleMouseDown|https|000001|0001|resizeCallback|imageByOrigin|inline|dragend|cssTransform|Function|caller|onclick|mzCrA|html|onZoomReady|naturalWidth|onClick|parseNode|ignore|getURL|getNode|canvas|rel|loadZoom|1000|getElementsByTagName|error|textnode|304|jDefer|loadBlob|loop|interval|xhr2|which|addEventListener|nativize|onreadystatechange|out|isReady||fps|onAfterRender|od|onStart|onxhrerror||finishTime|ios|getTime|Number||easeOutSine|easeInExpo|handleMouseMove|easeOutExpo|UUID|easeInSine|mac|300|firefox|999|easeInQuad|easeOutQuad|wrap|device|bounceIn|elasticIn|easeOutBack|matchMedia|easeInCubic|wrapper|easeOutCubic|easeInBack|045|dragmove|03|wheelDeltaY|parseSchema|wheelDelta|wheelDeltaX|355|doc|euid|hone|item|detail|toArray|_initialDistance|165|setMessage|registerCallback|curScale|jToBool|phone|767px|backcompat|progressiveLoad|jHasClass|885|insertRule|imageByURL|setActiveThumb|transitionEffect|msExitFullscreen|selectorTrigger|onswipe|DocumentTouch|cancelFullScreen|setCaption|onchange||sheet|onEnter|101|upscale|shown|textExpandHint|hideHint|onExit|stopImmediatePropagation|querySelectorAll|Right|Left||zIndex|Bottom|margin|styleFloat|setMode|getComputedStyle|fontWeight|color|Top|onUpdate|setupSelectors|RegExp|query|imageByIndex|zoomHeight|2147483647|stylesId|zoomWidth|ua|unregisterActivateEvent|backward|magicJS|mjs|cssText|getContext|crios|300ms|safari|onZoomOut|smoothing|cssTransformProp|moveBind|mozCancelAnimationFrame|swipe|fromCharCode|scrollbarsWidth|multibackground|background|forEach|ts|Moz|moz|registerEvents|deleteRule|jRaiseEvent|MouseEvent|animation|v5|MSPointerOut|styleSheet|unregisterDeactivateEvent|variableZoom|changeZoomLevel|cssPrefix|Webkit|deg|onZoomIn|documentMode||unregisterEvents|backCompat|removeRule|100000|blur|cancelBubble|ImageLoader|stopPropagation|||offsetWidth|preventDefault|compareDocumentPosition|progid|charCodeAt|DXImageTransform|get|normal|request|clientWidth|setInterval|orientation|screen|webkit419|requestFullScreen|block|jGetPosition|10px|jSetOpacity|Microsoft|base64|enclose|querySelector|gif|screenY|screenX|rightClick|10000|loadOptions|expandZoomMode|getElementById|ACwAAAAAAQABAAACADs|date|getJSON|touchOptions|R0lGODlhAQABAAD|pageXOffset|URL|pageYOffset|getOriginalTarget|clientHeight|webkitURL|iframe|static|lengthComputable|jGetFullSize|total|sort||jGetStyle|jSetStyle|matches|DOMElement||lt|progress|presto925|attachEvent|webkitCancelRequestAnimationFrame|msCancelAnimationFrame|GET|9999|red|toElement|oCancelAnimationFrame|fromElement|srcElement|responseType|oRequestAnimationFrame|msRequestAnimationFrame|MSPointerOver|pointerover|createObjectURL|537|scrollWidth|cssfilters|mozRequestAnimationFrame|TransitionEvent|webkitTransitionEnd|WebKitTransitionEvent|scrollHeight|2px|response|isTouchEvent|isPrimaryTouch|removeEventListener|replaceChild|detachEvent|createEventObject|fullscreenchange|MSFullscreenChange|jGetFullScroll|collection|offsetHeight|MSFullscreenError|jGetTransitionDuration|clientTop|CancelFullScreen|pinchupdate|offsetLeft|cancel|pinchstart|ExitFullscreen|clientLeft|returnValue|fullscreenerror|v3|Width|float||currentStyle|lineHeight||cssFloat|DOMContentLoaded|jToggleClass|420|prefix|doScroll|jGetStyles|blob|activeElement|requestFullscreen|offsetTop|fullscreenElement|figcaption|FullscreenElement|regexp|webkitIsFullScreen|getPropertyValue|ver|innerHTML|536|webos|linux|insertBefore|innerText|childNodes|mousewheel|wheel|fireEvent|KeyboardEvent|UIEvent|offsetParent|RequestFullScreen|RequestFullscreen|delta|deltaZ|FullScreen|onwheel|000244140625|other|deltaFactor|KeyEvent|appendChild|or|rev|avantgo|bada|srcset|getRatio||stubNode|selectstart|radius|before|availWidth|zoomIn|availHeight|blazer|blackberry|250|mobileZoomHint|expandImageStage|fontFamily|fontSize|sans|serif|line|textAlign|prev|contextmenu|expandNav|expandControls|buttons|next|meego|MobileOptions|scrollTo|compal|0Coigm|iemobile|ozga|Taac|ojk5|xk|gob|jkma|zkvz|Qlbo|send|zwbk3|maba|gz5|iris|hiptop|o0|zoomOut|running|elaine|z0|webkitRequestAnimationFrame|9_|fennec|mgctlbxP|center|ff0000|mgctlbxN|MZ|mgctlbxL|mgctlbxV|2em|font|100ms|oCancelFullScreen|msCancelFullScreen|mozCancelFullScreen|xxxxxxxxxxxx|xy|webkitCancelFullScreen|yxxx|4xxx|FormData|withCredentials|generateUUID|xxxxxxxx|xxxx|ProgressEvent|getHashCode|4294967296|jToInt|xpath|toFloat|edge|201|userAgent|evaluate|map|isFinite|forward|webkitexitFullscreen|msFullscreenEnabled|air|fullscreenEnabled|_self|implementation|Image|320|350|switchTo|cssRules|selector|selectItem|ontouchstart|relative|dummy|msMaxTouchPoints|256|maxTouchPoints|SVGImage|head|refresh|addRule|www|w3|http|DEMO|120|hasFeature|org|TR|0ms|message|loading|removeCSS|SVG11|feature|zo||||ikz3|easeInOutQuint|easeOutQuint|06|07|795|windows||035||855|755|easeOutQuart|685|xiino|easeInOutQuart|easeInQuint|xda|wap|easeInOutExpo|135|785|treo|symbian|lb|735|easeInOutCirc|up|04|easeInCirc|vodafone|335|075|easeOutCirc|895|easeInQuart|715|745|unknown|575|easeInOutSine|565|clearInterval|curFrame|naturalHeight|destroy|infinite|600|setTransition|roundCss|445|085|675|055|215|ActiveXObject|645|easeInOutCubic|955|515|WebKitPoint|taintEnabled|mozInnerScreenY|getBoxObjectFor|455|easeInOutQuad|easeInOutBack|275|TypeError|isset|parameter|Cannot|convert|Hover|zoomDistance|the|of|POSITIVE_INFINITY|NEGATIVE_INFINITY|JSON|parse|definition|Incorrect|Click|Touch|yyy|fzz|coigmzaablav|coigmtaac|zfg|mbgme3|kh3|kindle|maemo|Double|onExpandOpen|onExpandClose|lge|devicePixelRatio|5000|500|ob|palm|netfront|mmp|sineOut|sineIn|os|ixi|265|series|psp|pocket||re|plucker|expoOut|expoIn|bounceOut|backIn|backOut|cos|elasticOut|cubicOut|cubicIn|MagicToolboxTooltip|MessageBox|quadIn|quadOut|midp|PI'.split('|'),0,{}))
