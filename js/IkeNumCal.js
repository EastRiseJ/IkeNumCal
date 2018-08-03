/**
 * IkeNumCal.js v1.0.0-beta.0
 * author Ike Ji
 */

(function (global, factory) {
    global.IkeNumCal = factory()
}(this, (function () {
    'use strict';
    function IkeNumCal (el, options) {
        var _this = this;
        this.el = el;
        // 默认的配置
        this.defaultOptions = {
            max: 999, // 最大值
            min: -999, // 最小值
            defaultValue: 0, //  初始值
            size: '', // 尺寸大小
            inpDisabled: true // 输入框是否禁用
        };
        this.options = {};

        this.obj = {

        };

        /**
         * 初始化
         */
        this.init = function () {
            this.initOptions();
            this.initObj();
            this.renderDom();
            this.bindEvents();
            this.watchObj();
        }


        /**
         * 初始化配置文件
         */
        this.initOptions = function () {
            for ( var k in options) {
                this.defaultOptions[k] = options[k];
            }
            this.options = Object.assign({}, this.defaultOptions);
        }


        /**
         * 初始化obj对象
         */
        this.initObj = function () {
            this.obj = {
                inpVal: this.options.defaultValue || 1
            };
        }

        /**
         * 绑定事件
         */
        this.bindEvents  = function () {
            $(document).on('click', this.el + ' .ike-btn-qua-reduce', this.quantityChange);
            $(document).on('click', this.el + ' .ike-btn-qua-add', this.quantityChange);

            $(document).on('keyup', this.el + ' .ike-inp', this.limitInput);
        }

        /**
         * 监听value的变化
         */
        this.watchObj = function () {
            this.obj['__inpVal__'] = this.obj['inpVal'];
            Object.defineProperty(this.obj, 'inpVal', {
                // writable: true,
                enumerable : true,
                configurable : true,
                get: function () {
                    return this['__inpVal__'];
                },
                set: function (val) {
                    this['__inpVal__'] = val;
                    $(_this.el + ' input').val(parseInt(val || 0, 10));
                    _this.btnStatusChange();
                }
            })
        }

        /**
         * 改变按钮可点击状态样式
         */
        this.btnStatusChange = function () {
            var newVal = parseInt($(this.el + ' input').val(), 10),
                min = _this.options.min,
                max = _this.options.max;
            if (newVal === max) {
                $(this.el + ' button.ike-btn-qua-add').prop('disabled', 'disabled');
            } else {
                $(this.el + ' button.ike-btn-qua-add').removeProp('disabled');
            }

            if (newVal === min) {
                $(this.el + ' button.ike-btn-qua-reduce').prop('disabled', 'disabled');
            } else {
                $(this.el + ' button.ike-btn-qua-reduce').removeProp('disabled');
            }
        }

        /**
         * 限制input输入
         */
        this.limitInput = function (event) {
            var $oInp = $(this),
                oldVal = $oInp.val();
            setTimeout(function () {
                var newVal = parseInt($oInp.val(), 10),
                    min = _this.options.min,
                    max = _this.options.max;
                if ((event.keyCode >= 48 && event.keyCode <= 57) ||
                    (event.keyCode >= 96 && event.keyCode <= 105)) {
                    if (newVal >= min && newVal <= max) {
                        _this.obj.inpVal = $oInp.val();
                    } else if (newVal < min) {
                        _this.obj.inpVal = min;
                    } else if (newVal > max) {
                        _this.obj.inpVal = max;
                    } else {
                        _this.obj.inpVal = oldVal;
                    }
                } else {
                    _this.obj.inpVal = oldVal;
                }
                _this.options.inpChangeFun && _this.options.inpChangeFun(_this.obj.inpVal);
            }, 0);
        }

        /**
         * 数量加减
         */
        this.quantityChange = function (event) {
            var flag = event.target.className.indexOf('btn-qua-add') > -1,
                quantity = parseInt($(_this.el + ' input').val(), 10),
                // quantity = parseInt(_this.obj.inpVal, 10),
                max = _this.options.max,
                min = _this.options.min;
            if (flag) {
                if (quantity < max) {
                    _this.obj.inpVal = quantity + (flag ? 1 : -1);
                }
                _this.options.addFun && _this.options.addFun(_this.obj.inpVal);
                _this.options.inpChangeFun && _this.options.inpChangeFun(_this.obj.inpVal);
            } else {
                if (quantity > min) {
                    _this.obj.inpVal = quantity + (flag ? 1 : -1);
                }
                _this.options.reduceFun && _this.options.reduceFun(_this.obj.inpVal);
                _this.options.inpChangeFun && _this.options.inpChangeFun(_this.obj.inpVal);
            }

        }
        /**
         * 渲染Dom
         */
        this.renderDom = function () {
            $(el).html('<span class="ike-numcal-box"><button class="ike-btn-qua-reduce">-</button>' +
                '<input class="ike-inp" type="text" ' + (this.options.inpDisabled && 'disabled')+ ' name="" value="' + this.obj.inpVal + '" />' +
                '<button class="ike-btn-qua-add">+</button></span>');
            if (this.options.size) {
                $(el + ' .ike-numcal-box').addClass('btn-' + this.options.size);
            }
        }


        this.init();

        return this.obj;
    }

    return IkeNumCal;
})));


