# IkeNumCal
常用的数字加减组件。 可用于购物车等应用场景

[demo(https://chinajds.cn/IkeNumCal/)](https://chinajds.cn/IkeNumCal/) 

## 使用方法
```
例：(详细见源代码) 
<div id="num-cal"></div>
<script type="text/javascript">
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
</script>
```