// components/fav/fav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 定义自定义属性值类型和默认值
    fang: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addFav() {
      // 子组件向父组件发送一个自定义事件，父组件要去实现它
      this.triggerEvent('addFav', { id: this.properties.fang }, null);
    }
  }
})
