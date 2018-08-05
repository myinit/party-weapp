// components/party-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    party: {
      type: Object,
      value: ''
    },
    index: {
      type: Number,
      value: 1
    },
    isShopParty: {
      type: Boolean,
      value: false
    },
    isScrollViewTap: {
      type: Boolean,
      value: false,
      observer: function (newValue,oldValue) {
        if (newValue){
          this._translateXPartyItem(0,200)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    background: 'http://img.zcool.cn/community/01989f58ad6b9ba801219c779368cd.jpg',
    animation: '',
    wrapAnimation: '',
    /**
     * 配置项
     */
    swipeCheckX: 35, //激活检测滑动的阈值
    swipeCheckState: 0, //0未激活 1激活
    maxMoveLeft: 185, //消息列表项最大左滑距离
    thresholdMoveLeft: 75, //左滑阈值，超过则显示菜单
    lastShowPartyId: '', //记录上次显示菜单的消息id
    moveX: 0, //记录平移距离
    showState: 0, //0 未显示菜单 1显示菜单
    touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
    swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 内部方法
     */
    _translateXPartyItem: function(x, duration) {
      var animation = wx.createAnimation({
        duration: duration
      });
      animation.translateX(x).step();
      this._animationPartyItem(animation);
    },
    _animationPartyItem: function(animation) {
      this.setData({
        animation: animation.export()
      });
    },
    _animationPartyWrapItem: function(animation) {
      this.setData({
        wrapAnimation: animation.export()
      });
    },
    deletePartyItem: function(e) {
      var animation = wx.createAnimation({
        duration: 200
      });
      animation.height(0).opacity(0).step();
      this._animationPartyWrapItem(animation);
      this.setData({
        showState: 0
      });
      this.triggerEvent('scrollEvent', { scrollY: true })
    },
    shareParty: function(e) {
      const url = e.currentTarget.dataset.url
    },
    copyParty: function(e) {
      const url = e.currentTarget.dataset.url
      wx.setClipboardData({
        data: url,
        success: res => {
          wx.showModal({
            content: '已经自动复制到您的剪切板',
            showCancel: false
          })
        }
      })
    },
    sendParty: function(e) {
      const url = e.currentTarget.dataset.url
    },
    deleteParty: function(e) {
      const url = e.currentTarget.dataset.url
    },
    onPartyTouchStart: function(e) {
      console.log(this.data.isScrollViewTap);
      if (this.data.showState === 1) {
        this.setData({
          touchStartState: 1,
          showState: 0,
          moveX: 0,
        })
        this._translateXPartyItem(0, 200);
        return;
      }
      this.setData({
        firstTouchX: e.touches[0].clientX,
        firstTouchY: e.touches[0].clientY
      })
      if (this.data.firstTouchX > this.data.swipeCheckX) {
        this.setData({
          swipeCheckState: 1
        })
      }
      this.setData({
        lastMoveTime: e.timeStamp
      })
    },

    onPartyTouchMove: function(e) {
      if (this.data.swipeCheckState === 0) {
        return;
      }
      //当开始触摸时有菜单显示时，不处理滑动操作
      if (this.data.touchStartState === 1) {
        return;
      }
      var moveX = e.touches[0].clientX - this.data.firstTouchX;
      var moveY = e.touches[0].clientY - this.data.firstTouchY;
      //已触发垂直滑动，由scroll-view处理滑动操作
      if (this.data.swipeDirection === 2) {
        return;
      }
      //未触发滑动方向
      if (this.data.swipeDirection === 0) {
        //触发垂直操作
        if (Math.abs(moveY) > 4) {
          this.data.swipeDirection = 2;

          return;
        }
        //触发水平操作
        if (Math.abs(moveX) > 4) {
          this.data.swipeDirection = 1;
          this.triggerEvent('scrollEvent', { scrollY: false})
        } else {
          return;
        }

      }
      this.setData({
        lastMoveTime: e.timeStamp
      })
      //处理边界情况
      if (moveX > 0) {
        moveX = 0;
      }
      //检测最大左滑距离
      if (moveX < -this.maxMoveLeft) {
        moveX = -this.data.maxMoveLeft;
      }
      this.data.moveX = moveX;
      this._translateXPartyItem(moveX, 0);
    },
    onPartyTouchEnd: function(e) {
      this.data.swipeCheckState = 0;
      var swipeDirection = this.data.swipeDirection;
      this.setData({
        swipeDirection: 0
      })
      if (this.data.touchStartState === 1) {
        this.setData({
          touchStartState: 0,
        });
        this.triggerEvent('scrollEvent', { scrollY: true })
        return;
      }
      //垂直滚动，忽略
      if (swipeDirection !== 1) {
        return;
      }
      if (this.data.moveX === 0) {
        //不显示菜单状态下,激活垂直滚动
        this.setData({
          showState: 0,
        });
        this.triggerEvent('scrollEvent', { scrollY: true })
        return;
      }
      let query = wx.createSelectorQuery().in(this)
      let correctMoveLeft = 0
      let _this = this
      query.select('.party-card-menu').fields({
        size: true
      }, function(res) {
        correctMoveLeft = res.width
        if (_this.data.moveX === correctMoveLeft) {
          _this.setData({
            showState: 1
          })
          return;
        }
        if (_this.data.moveX < -_this.data.thresholdMoveLeft) {
          _this.setData({
            moveX: -correctMoveLeft,
            showState: 1
          })
        } else {
          _this.setData({
            moveX: 0,
            showState: 0,
          })
          _this.triggerEvent('scrollEvent', { scrollY: true })
        }
        _this._translateXPartyItem(_this.data.moveX, 500);
      }).exec()
    },
  },


})