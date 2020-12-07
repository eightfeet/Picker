declare module '@eightfeet/picker' {
    export interface Option<M extends KeyMap> {
        /**
         * 模块ID，模块根节点将以此为id，部分子节点将添加class=“id_功能名” 作为className用于覆写样式（能通过style参数设置样式的尽量不要通过className去覆写），默认id=MobileSelect_时间戳_100位随机数
         * @type {string}
         * @memberof Option
         */
        id?: string;
        /**
         * 模块挂载的父节点
         * @type {string}
         * @memberof Option
         */
        parentId?: string;
        /**
         * 基础字体大小，模块采用em为单位制，子节点元素单位em的参考值，比如｛emBase:20｝则相当于1em=20px
         * @type {number}
         * @memberof Option
         */
        emBase?: number;
        /**
         * 引用picker页面的目标触发node，用于点击以唤起picker	必填
         * @type {string}
         * @memberof Option
         */
        trigger: string;
        /**
         * 设置picker的标题
         * @type {string}
         * @memberof Option
         */
        title?: string;
        /**
         * Object	picker的原始数据，这里控制picker选择器的类型,见wheels数据结构	必填
         * @type {{
         *         }}
         * @memberof Option
         */
        wheels: Wheels<M>;
        /**
         * 数据映射关系帮定wheel数据到picker
         *
         * @type {{
         *             display: string;
         *             value: string;
         *             childs?: string;
         *         }}
         * @memberof Option
         */
        keyMap?: KeyMap;
        /**
         * 创建picker初始化时默认选择的值，请使用keyMap中valve对应定义的key的值	否
         * @type {any[
         *
         *         ]}
         * @memberof Option
         */
        defaultValue?: any[];
        /**
         * 控制picker的样式，见style附表
         * @type {{
         *
         *         }}
         * @memberof Option
         */
        style?: {
            /**
             * 覆盖层
             */
            overlay?: {[kesy: string]: any};
            /**
             * 外框
             */
            wrap?: {[kesy: string]: any};
            /**
             * 标题栏
             */
            headlines?: {[kesy: string]: any};
            /**
             * 标题
             */
            title?: {[kesy: string]: any};
            /**
             * 取消
             */
            cancel?: {[kesy: string]: any};
            /**
             * 确定
             */
            confirm?: {[kesy: string]: any};
            /**
             * 轮子面板
             */
            panel?: {[kesy: string]: any};
            /**
             * 选择线
             */
            selectline?: {[kesy: string]: any};
            /**
             * 轮子面板覆盖层
             */
            mask?: {[kesy: string]: any};
        };
        /**
         * 取消按钮文字
         * @type {string}
         * @memberof Option
         */
        cancelBtnText?: string;
        /**
         * 确定按钮文字
         * @type {string}
         * @memberof Option
         */
        confirmBtnText?: string;
        /**
         * 点击确认时的回调，以参数形式返回被选中的结果
         * @memberof Option
         */
        onConfirm?: (value: Value) => void;
        /**
         * 点击取消或者遮罩层时的回调，以参数形式返回上次选中的结果
         * @memberof Option
         */
        onCancel?: (value: Value) => void;
        /**
         * 滚动结束时的回调，以参数形式返回被选中的结果
         * @memberof Option
         */
        transitionEnd?: (value: Value) => void;
        /**
         * 显示picker时的回调，返回当前picker实例
         * @memberof Option
         */
        onShow?: (picker: Picker) => void;
        /**
         * 隐藏picker时的回调，返回当前picker实例
         * @memberof Option
         */
        onHide?: (picker: Picker) => void;
        /**
         * 改变选择时的回调，以参数形式返回被选中的结果
         * @memberof Option
         */
        onChange?: (value: Value) => void;
    }

    export type Value = {[keys: string]: any }[];

    /**
     * 基础数据结构
     * @interface wheelsBaseType
     */
    export interface wheelsBaseType {
        data: string[];
    }
    /**
     * 键值数据类型
     * @interface wheelsKeyValueType
     */
    export interface wheelsKeyValueType {
        data: { [keys: string]: any }[];
    }
    /**
     * 联动数据类型
     * @interface wheelsInterrelatedType
     */
    export interface wheelsInterrelatedType {
        data: {
            [keys: string]: wheelsInterrelatedType[] | any;
        }[];
    }

    export interface KeyMap {
        /**
         * 用于显示的属性名
         * @type {string}
         */
        display: string;
        /**
         * 用于值的属性名
         * @type {string}
         */
        value: string;
        /**
         * 用于二级数据的属性名
         * @type {string}
         */
        childs?: string;
    }

    type ColumnData<K extends string, V extends string, C extends string> = {
        [display in K]: string;
    } &
        {
            [value in V]: any;
        } &
        {
            [childs in C]?: ColumnData<K, V, C>[];
        };

    interface Column<M extends KeyMap> {
        data: ColumnData<M['display'], M['value'], M['childs']>[];
    }

    interface DefaultKeyMap  {
              /**
         * 用于显示的属性名
         * @type {string}
         */
        display: 'display';
        /**
         * 用于值的属性名
         * @type {string}
         */
        value: 'value';
        /**
         * 用于二级数据的属性名
         * @type {string}
         */
        childs: 'childs';
    }

    export type Wheels<M extends KeyMap = DefaultKeyMap> = Column<M>[]

    class Picker {
        constructor(option: Option<any>);
        /**
         * 用于更新picker默认值，value是要更新的值，value是一个数组，每一项代表每列轮子的默认值。如果定义了keyMap请使用keyMap中valve对应定义的值；
         */
        public updatePicker: (value: any[], callback: () => void) => void;
        /**
         * 显示picker，有参数时定位到参数值位置再显示picker, 参数value值同updatePicker的参数值
         */
        public showPicker: (value: any[]) => void;
        /**
         * 获取当前选中结果的值
         */
        public getCurValue: () => any[];
        /**
         * 销毁picker，注意这里仅对主要事件侦听器以及创建picker时生成的html节点的移除，外部对象请自行销毁，比如
         * var newPicker = new Picker({...});
         * newPicker.distory();
         * newPicker = null; // 完全销毁生成的picker对象
         */
        public distory: () => {};
    }

    export default Picker;
}
