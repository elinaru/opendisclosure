// Generated by CoffeeScript 1.6.2
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.GoogleChart = (function(_super) {
    __extends(GoogleChart, _super);

    function GoogleChart() {
      this._removeGoogleListener = __bind(this._removeGoogleListener, this);
      this._addGoogleListener = __bind(this._addGoogleListener, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.render = __bind(this.render, this);
      this.id = __bind(this.id, this);
      this.onGoogleLoad = __bind(this.onGoogleLoad, this);      _ref = GoogleChart.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    /*
    # Initialize a new GoogleChart object
    #
    # Example:
    #   lineChart = new Backbone.GoogleChart({
    #     chartType: 'ColumnChart',
    #     dataTable: [['Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
    #                [700, 300, 400, 500, 600, 800]],
    #     options: {'title': 'Countries'},
    #   });
    #
    #   $('body').append( lineChart.render().el );
    # 
    # For the complete list of options please checkout
    # https://developers.google.com/chart/interactive/docs/reference#chartwrapperobject
    #
    */


    GoogleChart.prototype.initialize = function(options) {
      var chartOptions,
        _this = this;

      chartOptions = _.extend({}, options);
      ['el', 'id', 'attributes', 'className', 'tagName'].map(function(k) {
        return delete chartOptions[k];
      });
      google.load('visualization', '1', {
        packages: ['corechart'],
        callback: function() {
          return _this.onGoogleLoad("loaded");
        }
      });
      return this.onGoogleLoad(function() {
        var formatter, _i, _ref1, _results;

        _this.google = google.visualization;
        if (chartOptions.dataTable instanceof Array) {
          chartOptions.dataTable = _this.google.arrayToDataTable(chartOptions.dataTable);
        }
        if (typeof chartOptions.beforeDraw === "function") {
          chartOptions.beforeDraw(_this, chartOptions);
        }
        if (formatter = chartOptions.formatter) {
          (function() {
            _results = [];
            for (var _i = 0, _ref1 = chartOptions.dataTable.getNumberOfRows() - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; 0 <= _ref1 ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this).map(function(index) {
            return formatter.columns.map(function(column) {
              return chartOptions.dataTable.setFormattedValue(index, column, formatter.callback(chartOptions.dataTable.getValue(index, column)));
            });
          });
        }
        return _this.wrapper = new _this.google.ChartWrapper(chartOptions);
      });
    };

    /*
    # Execute a callback once google visualization fully loaded
    */


    GoogleChart.prototype.onGoogleLoad = function(callback) {
      if (callback === "loaded") {
        this.googleLoaded = true;
        return _(this.onGoogleLoadItems).map(function(fn) {
          return fn();
        });
      } else {
        if (this.googleLoaded) {
          return callback();
        } else {
          return (this.onGoogleLoadItems || (this.onGoogleLoadItems = [])).push(callback);
        }
      }
    };

    /*
    # Execute a callback once a given element ID appears in DOM ( mini livequery ).
    #
    # We need it because GoogleChart object only draw itself on DOM elements
    # so we first need to wait for our element to be added to the DOM before
    # we call GoogleChart.draw().
    # 
    # Usage: 
    #   Backbone.GoogleChart.watch("#myid", function() { console.log("I'm in") });
    #   $("body").append("<div id='myid'></div>"); // 'I"m in' should be printed to console
    #
    */


    GoogleChart.watch = function(id, fn) {
      var func, timeout;

      (GoogleChart._list || (GoogleChart._list = {}))[id] = fn;
      if (GoogleChart._watching) {
        return;
      }
      GoogleChart._watching = true;
      timeout = 10;
      return (func = function() {
        _(GoogleChart._list).map(function(fn, id) {
          if ($(id)[0]) {
            return fn() & delete GoogleChart._list[id];
          }
        });
        if (_(GoogleChart._list).isEmpty()) {
          return GoogleChart._watching = false;
        } else {
          return setTimeout(func, timeout += 10);
        }
      })();
    };

    /*
    # Returns the wrapping element id
    # if no id was specified on initialization a random one will be returned
    */


    GoogleChart.prototype.id = function() {
      var _ref1;

      return ((_ref1 = this.el) != null ? _ref1.id : void 0) || this.randomID();
    };

    /*
    # "Instruct" the current graph instance to draw itself once its visiable on DOM
    # return the current instance
    */


    GoogleChart.prototype.render = function() {
      var _this = this;

      this.onGoogleLoad(function() {
        return _this.constructor.watch("#" + _this.el.id, function() {
          return _this.wrapper.draw(_this.el.id);
        });
      });
      return this;
    };

    /*
    # Register for ChartWrapper events
    # For the complete event list please look at the events section under
    #  https://developers.google.com/chart/interactive/docs/reference#chartwrapperobject
    # 
    #   graph = new Backbone.GoogleChart({chartOptions: options});
    #   graph.on("select",function(graph) { console.log("Someone click on me!") })
    #   graph.on("error",function(graph) { console.log("Oops") })
    #   graph.on("ready",function(graph) { console.log("I'm ready!") })
    #
    */


    GoogleChart.prototype.bind = function(event, callback) {
      var _base;

      (_base = this._listers)[event] || (_base[event] = this._addGoogleListener(event));
      return GoogleChart.__super__.bind.call(this, event, callback);
    };

    /*
    # alias of @bind
    */


    GoogleChart.prototype.on = GoogleChart.prototype.bind;

    /*
    # Unbind events, please look at Backbone.js docs for the API
    */


    GoogleChart.prototype.unbind = function(event, callback, context) {
      var _this = this;

      if (event) {
        this._removeGoogleListener(event);
      } else if (callback) {
        _(this._listers).pairs().map(function(pair) {
          if (pair[1] === callback) {
            return _this._removeGoogleListener(pair[0]);
          }
        });
      } else {
        _(this._listers).values().map(this._removeGoogleListener);
      }
      return GoogleChart.__super__.unbind.call(this, event, callback, context);
    };

    /*
    # alias of @unbind
    */


    GoogleChart.prototype.off = GoogleChart.prototype.unbind;

    GoogleChart.prototype._addGoogleListener = function(event) {
      var _this = this;

      return this.onGoogleLoad(function() {
        return _this.google.events.addListener(_this.wrapper, event, function() {
          return _this.trigger(event, _this.wrapper.getChart());
        });
      });
    };

    GoogleChart.prototype._removeGoogleListener = function(event) {
      var _this = this;

      return this.onGoogleLoad(function() {
        _this.google.events.removeListener(_this._listers[event]);
        return delete _this._listers[event];
      });
    };

    GoogleChart.prototype._listers = {};

    /*
    # Generate a random ID, gc_XXX
    */


    GoogleChart.prototype.randomID = function() {
      return _.uniqueId("gc_");
    };

    return GoogleChart;

  }).call(this, Backbone.View);

}).call(this);
