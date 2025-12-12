// pages/decision/decision.js
Page({
  data: {
    cards: [
      { isFlipped: false, result: '' },
      { isFlipped: false, result: '' }
    ],
    showReset: false
  },

  onLoad: function () {
    this.generateResults();
  },

  // 预先生成结果
  generateResults() {
    const options = ['Yes', 'No', 'Yes', 'No', 'Try Again'];
    
    // 生成两个不一样的结果，增加趣味性
    let res1 = options[Math.floor(Math.random() * options.length)];
    let res2 = options[Math.floor(Math.random() * options.length)];
    
    this.setData({
      'cards[0].result': res1,
      'cards[1].result': res2,
      'cards[0].isFlipped': false,
      'cards[1].isFlipped': false,
      showReset: false
    });
  },

  // 点击翻牌
  flipCard(e) {
    const index = e.currentTarget.dataset.index;
    
    // 如果已经翻开了，就不做操作
    if (this.data.cards[index].isFlipped) return;

    // 更新对应卡片的状态
    const key = `cards[${index}].isFlipped`;
    this.setData({
      [key]: true,
      showReset: true // 只要翻了一张，就显示重置按钮
    });
  },

  // 重置
  reset() {
    // 先把卡片翻回去
    this.setData({
      'cards[0].isFlipped': false,
      'cards[1].isFlipped': false,
      showReset: false
    });

    // 延迟一点点时间再换结果，不然用户会看到结果突变
    setTimeout(() => {
      this.generateResults();
    }, 300);
  }
});