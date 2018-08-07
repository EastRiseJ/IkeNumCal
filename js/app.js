$(function () {
    var ikeNum = new IkeNumCal('#num-cal', {
        min: 0, // 最小值
        max: 10, // 最大值
        inpDisabled: true, // 输入框是否禁用
        defaultValue: 5, //  初始值
        size: '', // 尺寸大小
        addTxt: '+',// ‘+’按钮的文字显示
        subTxt: '-',// ‘-’按钮的文字显示
        addFun: function () {
        	// 点击‘+’按钮时触发
        	console.log('add');
        }, 
        subFun: function () {
        	// 点击‘-’按钮时触发
        	console.log('sub');
        }, 
        inpChangeFun: function () {
        	// 当数值改变时触发
        	console.log('change');
        }
    });

    $(document).on('click', '#btn-getval', function () {
    	alert('当前数值为： ' + ikeNum.inpVal);
    });
})