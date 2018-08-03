$(function () {
    var ikeNum = new IkeNumCal('#num-cal', {
        min: 0, // 最小值
        max: 10, // 最大值
        inpDisabled: true, // 输入框是否禁用
        defaultValue: 5, //  初始值
        size: '' // 尺寸大小
    });
})