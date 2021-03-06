'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = autoPlay;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowEqual = require('fbjs/lib/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _reactSwipeableViewsCore = require('react-swipeable-views-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autoPlay(MyComponent) {
  var AutoPlay = function (_Component) {
    (0, _inherits3.default)(AutoPlay, _Component);

    function AutoPlay(props, context) {
      (0, _classCallCheck3.default)(this, AutoPlay);

      var _this = (0, _possibleConstructorReturn3.default)(this, (AutoPlay.__proto__ || (0, _getPrototypeOf2.default)(AutoPlay)).call(this, props, context));

      _this.state = {};
      _this.timer = null;

      _this.handleInterval = function () {
        var _this$props = _this.props,
            children = _this$props.children,
            direction = _this$props.direction,
            onChangeIndex = _this$props.onChangeIndex,
            slideCount = _this$props.slideCount;


        var indexLatest = _this.state.index;
        var indexNew = indexLatest;

        if (direction === 'incremental') {
          indexNew += 1;
        } else {
          indexNew -= 1;
        }

        if (slideCount || children) {
          indexNew = (0, _reactSwipeableViewsCore.mod)(indexNew, slideCount || _react.Children.count(children));
        }

        // Is uncontrolled
        if (_this.props.index === undefined) {
          _this.setState({
            index: indexNew
          });
        }

        if (onChangeIndex) {
          onChangeIndex(indexNew, indexLatest);
        }
      };

      _this.handleChangeIndex = function (index, indexLatest) {
        // Is uncontrolled
        if (_this.props.index === undefined) {
          _this.setState({
            index: index
          });
        }

        if (_this.props.onChangeIndex) {
          _this.props.onChangeIndex(index, indexLatest);
        }
      };

      _this.handleSwitching = function (index, type) {
        if (_this.timer) {
          clearInterval(_this.timer);
          _this.timer = null;
        } else if (type === 'end') {
          _this.startInterval();
        }

        if (_this.props.onSwitching) {
          _this.props.onSwitching(index, type);
        }
      };

      _this.state.index = _this.props.index || 0;
      return _this;
    }

    (0, _createClass3.default)(AutoPlay, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.startInterval();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var index = nextProps.index;


        if (typeof index === 'number' && index !== this.props.index) {
          this.setState({
            index: index
          });
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var shouldResetInterval = !(0, _shallowEqual2.default)({
          index: prevProps.index,
          interval: prevProps.interval,
          autoplay: prevProps.autoplay
        }, {
          index: this.props.index,
          interval: this.props.interval,
          autoplay: this.props.autoplay
        });

        if (shouldResetInterval) {
          this.startInterval();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.timer);
      }
    }, {
      key: 'startInterval',
      value: function startInterval() {
        var _props = this.props,
            autoplay = _props.autoplay,
            interval = _props.interval;


        clearInterval(this.timer);

        if (autoplay) {
          this.timer = setInterval(this.handleInterval, interval);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            autoplay = _props2.autoplay,
            direction = _props2.direction,
            interval = _props2.interval,
            indexProp = _props2.index,
            onChangeIndex = _props2.onChangeIndex,
            other = (0, _objectWithoutProperties3.default)(_props2, ['autoplay', 'direction', 'interval', 'index', 'onChangeIndex']);
        var index = this.state.index;


        if (!autoplay) {
          return _react2.default.createElement(MyComponent, (0, _extends3.default)({ index: index }, other));
        }

        return _react2.default.createElement(MyComponent, (0, _extends3.default)({
          index: index,
          onChangeIndex: this.handleChangeIndex,
          onSwitching: this.handleSwitching
        }, other));
      }
    }]);
    return AutoPlay;
  }(_react.Component);

  AutoPlay.defaultProps = {
    autoplay: true,
    direction: 'incremental',
    interval: 3000
  };
  AutoPlay.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * If `false`, the auto play behavior is disabled.
     */
    autoplay: _propTypes2.default.bool,
    /**
     * @ignore
     */
    children: _propTypes2.default.node,
    /**
     * This is the auto play direction.
     */
    direction: _propTypes2.default.oneOf(['incremental', 'decremental']),
    /**
     * @ignore
     */
    index: _propTypes2.default.number,
    /**
     * Delay between auto play transitions (in ms).
     */
    interval: _propTypes2.default.number,
    /**
     * @ignore
     */
    onChangeIndex: _propTypes2.default.func,
    /**
     * @ignore
     */
    onSwitching: _propTypes2.default.func,
    /**
     * @ignore
     */
    slideCount: _propTypes2.default.number
  } : {};


  return AutoPlay;
}