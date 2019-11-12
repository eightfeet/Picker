# picker

```sh
npm install @eightfeet/picker
```

### Usage

```javascript
import { MobileSelect } from @eightfeet/picker;

const datePicker = new MobileSelect({
        id: 'datePicker',
        wheels: [
            {data:['周日','周一','周二','周三','周四','周五','周六']},
            {data:['08:00','09:00','10:00','11:00','12:00','13:00','14:00']}
        ],
        trigger: '#datepicker',
        onConfirm: function (data) {
            handleResult(data, '#mobileselect', null, 'mobileselectStringtype')
        }
    });

datePicker.showPicker(['周二', '10：00']);
```



### parame

| 参数          | 类型     | 说明                                                         | 是否必填 |
| ------------- | -------- | ------------------------------------------------------------ | -------- |
| id            | String   | 模块ID，模块根节点将以此为id，部分子节点将添加class=“id_功能名” 作为className用于覆写样式（能通过style参数设置样式的尽量不要通过className去覆写），默认id=MobileSelect_时间戳_100位随机数 | 否       |
| parentId      | String   | 模块挂载的父节点，                                           | 否       |
| emBase        | Number   | 基础字体大小，模块采用em为单位制，子节点元素单位em的参考值，比如｛emBase:20｝则相当于1em=20px | 否       |
| trigger       | String   | 引用picker页面的目标触发node，用于点击以唤起picker           | 必填     |
| title         | String   | 设置picker的标题                                             | 否       |
| wheels        | Object   | picker的原始数据，这里控制picker选择器的类型,见wheels附表    | 必填     |
| keyMap        | Object   | 当wheels为 “联动数据结构” 或者 “{ key: value }数据结构” 时用来定义picker显示的数据结构（具体参照wheels附表） | 否       |
| defaultValue  | Array    | 创建picker初始化时默认选择的值，请使用keyMap中valve对应定义的key的值 | 否       |
| style         | Object   | 控制picker的样式，见style附表                                |          |
| onConfirm     | Function | 点击确认时的回调，以参数形式返回被选中的结果                 | 否       |
| onCancel      | Function | 点击取消或者遮罩层时的回调，以参数形式返回上次选中的结果     | 否       |
| transitionEnd | Function | 滚动结束时的回调，以参数形式返回被选中的结果                 | 否       |
| onShow        | Function | 显示picker时的回调，返回picker对象                           | 否       |
| onHide        | Function | 隐藏picker时的回调，返回picker对象                           | 否       |
| onChange      | Function | 改变选择时的回调，以参数形式返回被选中的结果                 | 否       |



### options

#### picker.updatePicker(value)

用于更新picker默认值，value是要更新的值



#### picker.showPicker(value);

显示picker，有参数时定位到参数值位置再显示picker



#### picker.getCurValue();

获取当前选中结果的值



### wheels数据结构

- **基础数据结构**

  > root数组中每一个Object为一个滚动wheel列，data数组的每一项为当前wheel列的每一项

  ```javascript
  [
      {data:['周日','周一','周二','周三','周四','周五','周六']}     
      {data:['08:00','09:00','10:00','11:00','12:00','13:00','14:00']}
  ]
  ```

  

- **{ key: value } 数据结构**

  > 这类数据常用于显示信息与对应值分开展示的场景，root数组中每一个Object为一个滚动wheel列，data数组的每一项为当前wheel列的每一项；
  >
  > 这里需要注意的是默认情况下Picker以name作为展示key，以value作为取值key，如果您的当前数据对象没有这两个key或者需要指定数据时需要通过keyMap来通知Picker当前数据哪个key是用于显示的, 比如下面数据就需要指定```keyMap = { name: 'date', value: 'val'}```

  ```javascript
  [
      {
          data: [
              { val: 0, date: '周日' },
              { val: 1, date: '周一' },
              { val: 2, date: '周二' },
              { val: 3, date: '周三' },
              { val: 4, date: '周四' },
              { val: 5, date: '周五' },
              { val: 6, date: '周六' }
          ]
      },
      {
          data: [
              { val: 8, date: '08:00' },
              { val: 9, date: '09:00' },
              { val: 10, date: '10:00' },
              { val: 11, date: '11:00' },
              { val: 12, date: '12:00' },
              { val: 13, date: '13:00' },
              { val: 14, date: '14:00' }
          ]
      }
  ]
  ```

  

- **联动数据结构**  

  > 联动数据常用于父子关系数据的展示，他的显示信息与对应值也是分开展示的场景，数据中的每一个层级关系代表列一个wheel列，平级数组的每一个对象为当前wheel列的每一项，依次到最后一个子集。wheels子集嵌套越深，Picker的列数也就越多
  >
  > 这里需要注意的是同 “{ key: value } 数据” 结构一样需要通过keyMap来通知Picker当前数据哪个key是用于显示的, 比如下面数据就需要指定```keyMap = { name: 'date', value: 'val', childs: 'childs'}```

  ```javascript
  [
      {
          data: [
              {
                  val: 'a',
                  date: 'A',
                  childs: [
                      {
                          val: 'a-a',
                          date: 'A-A',
                          childs: [
                              {
                                  val: 'a-a-a',
                                  date: 'A-A-A',
                              },
                              {
                                  ...第三级第二项
                              }
                          ]
                      },
                      {
                          ...第二级第二项
                      }
                  ]
              },
              {
  				...第一级第二项
              }
          ]
      }
  ],
  ```

  

  

### style附表

> 用于定义Picker的样式，这里以行内样式覆写Picker的默认样式，每个属性名对应一个node节点；属性名的值应该是一个style Object，Object的key建议使用javascript 的style属性，比如 { backgroundColor: "red" , zIndex: 100 }，这样Picker内部的生成程序可以更好的补全浏览器厂商前缀，当然如果样式属性浏览器支持很好的话，你也完全可以写成 { "background-color": "red" , "z-index": 100 }

| 属性名     | 说明                                                     |
| ---------- | -------------------------------------------------------- |
| overlay    | 覆盖层   overlay: { backgroundColor: 'rgba(0,0,0,0.4)' } |
| wrap       | 外框                                                     |
| headlines  | 标题栏                                                   |
| title      | 标题                                                     |
| cancel     | 取消                                                     |
| confirm    | 确定                                                     |
| panel      | 轮子面板                                                 |
| selectline | 选择线                                                   |
| mask       | 轮子面板覆盖层                                           |

**注意：这里暂不提供轮子、轮子的每一项以及轮子被选中项/激活是的属性，当然如果非常有必要编辑他们的样式也可以通过自定义class来覆写，建议尽量不要覆写轮子每一项的样式，特别是高度，Picker内部html元素的高度是依照轮子每一项的高度计算而来**

> 轮子的样式 class=\`${Picker.id}_wheel\`
>
> 轮子被选中项的样式 class=\`${Picker.id}_activated\`