(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-native'), require('prop-types'), require('d3-scale'), require('d3-array'), require('lodash')) :
  typeof define === 'function' && define.amd ? define(['react', 'react-native', 'prop-types', 'd3-scale', 'd3-array', 'lodash'], factory) :
  (global = global || self, global.soundcloud = factory(global.React, global.reactNative, global.PropTypes, global.d3Scale, global.d3Array, global._));
}(this, function (React, reactNative, PropTypes, d3Scale, d3Array, _) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  _ = _ && _.hasOwnProperty('default') ? _['default'] : _;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  /* eslint import/no-unresolved: [2, { ignore: ['react-native'] }] */

  function getColor(bars, bar, percentPlayed, percentPlayable, inverse, ACTIVE, ACTIVE_INVERSE, ACTIVE_PLAYABLE, ACTIVE_PLAYABLE_INVERSE, INACTIVE, INACTIVE_INVERSE) {
    if (bar / bars.length < percentPlayed) {
      return inverse ? ACTIVE_INVERSE : ACTIVE;
    }

    if (bar / bars.length < percentPlayable) {
      return inverse ? ACTIVE_PLAYABLE_INVERSE : ACTIVE_PLAYABLE;
    }

    return inverse ? INACTIVE_INVERSE : INACTIVE;
  }

  var dimensionsWidth = reactNative.Dimensions.get('window').width;

  /* eslint import/no-unresolved: [2, { ignore: ['react', 'react-native'] }] */

  function Waveform(_ref) {
    var waveform = _ref.waveform,
        height = _ref.height,
        width = _ref.width,
        setTime = _ref.setTime,
        percentPlayed = _ref.percentPlayed,
        percentPlayable = _ref.percentPlayable,
        inverse = _ref.inverse,
        active = _ref.active,
        activeInverse = _ref.activeInverse,
        activePlayable = _ref.activePlayable,
        activePlayableInverse = _ref.activePlayableInverse,
        inactive = _ref.inactive,
        inactiveInverse = _ref.inactiveInverse;
    var scaleLinearHeight = d3Scale.scaleLinear().domain([0, waveform.height]).range([0, height]);

    var chunks = _.chunk(waveform.samples, waveform.width / ((width - 60) / 3));

    return React__default.createElement(reactNative.View, {
      style: [{
        height: height,
        width: width,
        justifyContent: 'center',
        flexDirection: 'row'
      }, inverse && {
        transform: [{
          rotateX: '180deg'
        }, {
          rotateY: '0deg'
        }]
      }]
    }, chunks.map(function (chunk, i) {
      return React__default.createElement(reactNative.TouchableOpacity, {
        key: i,
        onPress: function onPress() {
          setTime(i);
        }
      }, React__default.createElement(reactNative.View, {
        style: {
          backgroundColor: getColor(chunks, i, percentPlayed, percentPlayable, inverse, active, activeInverse, activePlayable, activePlayableInverse, inactive, inactiveInverse),
          width: 2,
          marginRight: 1,
          height: scaleLinearHeight(d3Array.mean(chunk))
        }
      }));
    }));
  }

  Waveform.propTypes = {
    waveform: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    setTime: PropTypes.func.isRequired,
    percentPlayed: PropTypes.number.isRequired,
    percentPlayable: PropTypes.number.isRequired,
    inverse: PropTypes.bool.isRequired,
    active: PropTypes.string.isRequired,
    activeInverse: PropTypes.string.isRequired,
    activePlayable: PropTypes.string.isRequired,
    activePlayableInverse: PropTypes.string.isRequired,
    inactive: PropTypes.string.isRequired,
    inactiveInverse: PropTypes.string.isRequired
  };

  var SoundCloudWave =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(SoundCloudWave, _Component);

    function SoundCloudWave() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        waveform: null
      });

      return _this;
    }

    var _proto = SoundCloudWave.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      var waveformUrl = this.props.waveformUrl;
      fetch(waveformUrl.replace('png', 'json')).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({
          waveform: json
        });
      });
    };

    _proto.render = function render() {
      var _this$props = this.props,
          height = _this$props.height,
          width = _this$props.width,
          percentPlayed = _this$props.percentPlayed,
          percentPlayable = _this$props.percentPlayable,
          setTime = _this$props.setTime,
          active = _this$props.active,
          activeInverse = _this$props.activeInverse,
          activePlayable = _this$props.activePlayable,
          activePlayableInverse = _this$props.activePlayableInverse,
          inactive = _this$props.inactive,
          inactiveInverse = _this$props.inactiveInverse;
      var waveform = this.state.waveform;
      if (!waveform) return null;
      return React__default.createElement(reactNative.View, {
        style: {
          flex: 1,
          justifyContent: 'center'
        }
      }, React__default.createElement(Waveform, {
        waveform: waveform,
        height: height,
        width: width,
        setTime: setTime,
        percentPlayed: percentPlayed,
        percentPlayable: percentPlayable,
        active: active,
        activeInverse: activeInverse,
        activePlayable: activePlayable,
        activePlayableInverse: activePlayableInverse,
        inactive: inactive,
        inactiveInverse: inactiveInverse,
        inverse: true
      }), React__default.createElement(Waveform, {
        waveform: waveform,
        height: height,
        width: width,
        setTime: setTime,
        percentPlayed: percentPlayed,
        percentPlayable: percentPlayable,
        active: active,
        activeInverse: activeInverse,
        activePlayable: activePlayable,
        activePlayableInverse: activePlayableInverse,
        inactive: inactive,
        inactiveInverse: inactiveInverse,
        inverse: false
      }));
    };

    return SoundCloudWave;
  }(React.Component);

  SoundCloudWave.defaultProps = {
    percentPlayable: 0,
    height: 50,
    width: dimensionsWidth,
    active: '#FF1844',
    activeInverse: '#4F1224',
    activePlayable: '#1b1b26',
    activePlayableInverse: '#131116',
    inactive: '#424056',
    inactiveInverse: '#1C1A27'
  };
  SoundCloudWave.propTypes = {
    waveformUrl: PropTypes.string.isRequired,
    setTime: PropTypes.func.isRequired,
    percentPlayed: PropTypes.number.isRequired,
    percentPlayable: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    active: PropTypes.string,
    activeInverse: PropTypes.string,
    activePlayable: PropTypes.string,
    activePlayableInverse: PropTypes.string,
    inactive: PropTypes.string,
    inactiveInverse: PropTypes.string
  };

  return SoundCloudWave;

}));
//# sourceMappingURL=react-native-soundcloud-waveform.js.map
