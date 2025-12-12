// pages/index/index.js
const db = require('../../utils/data.js');

Page({
  data: {
    year: 2025,
    month: 12,
    day: 12,
    weekday: '星期五',
    
    // 初始化占位数据
    yiText: '加载中...',
    jiText: '加载中...',
    score: 0,
    comment: '计算中',
    attrs: { zhi: 0, cai: 0 },
    // 新增：控制弹窗显示的变量
    showSimulator: false
  },

  onLoad: function () {
    this.initDate();
    this.refreshDailyData();
  },

  initDate() {
    const now = new Date();
    const weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    this.setData({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      weekday: weekMap[now.getDay()]
    });
  },

  refreshDailyData() {
    const list = db.fortuneList;
    
    // 随机取两个不同的索引
    let idx1 = Math.floor(Math.random() * list.length);
    let idx2 = Math.floor(Math.random() * list.length);
    while (idx1 === idx2) {
      idx2 = Math.floor(Math.random() * list.length);
    }

    const score = Math.floor(Math.random() * 41) + 60;
    const zhi = Math.floor(Math.random() * 20) + 80;
    const cai = Math.floor(Math.random() * 20) + 80;
    const randomComment = db.comments[Math.floor(Math.random() * db.comments.length)];

    this.setData({
      yiText: list[idx1].text, 
      jiText: list[idx2].text,
      score: score,
      comment: randomComment,
      attrs: { zhi, cai }
    });
  },

  // --- 交互区域 ---
// --- 新增交互逻辑 ---
  // 打开弹窗
  openSimulator() {
    this.setData({
      showSimulator: true
    });
  },

  // 关闭弹窗
  closeSimulator() {
    this.setData({
      showSimulator: false
    });
  },

  // 跳转到 Yes or No 页面 (保留正常功能)
  goToDecision() {
    wx.navigateTo({
      url: './decision/decision.wxml'
    });
  }
});