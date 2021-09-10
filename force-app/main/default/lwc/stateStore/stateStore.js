export default class StateStore {
  static _instance = null;

  // Singletonパターンにしてみる。
  // StateStoreを複数持ちたい時もあるかもなので、実際利用は要検討
  static getInstance(callback) {
    if (!StateStore._instance) {
      StateStore._instance = new StateStore();
    }
    // 通知方法を登録
    // この実装で使いやすいかは謎
    if (callback) {
      StateStore._instance.register(callback);
    }
    // 複数のLWCでも単一のStateStoreオブジェクトを参照する。
    return StateStore._instance;
  }

  constructor() {
    this.store = {};
    this.callbacks = [];
  }

  // Data bindingっぽいのを実装したかった
  // 状態変更を通知先を登録
  register = (callback) => {
    this.callbacks.push(callback);
  };

  // StateStoreを使っている人らに状態変更を通知
  notify = () => {
    this.callbacks.forEach((c) => {
      c(this.store);
    });
  };

  // 状態をTypeで追加
  add = (detail) => {
    const { type, value } = detail;
    console.log(type, value);
    this.store[type] = value;
    // 変更通知
    this.notify();
  };

  // 状態をTypeで削除
  del = (detail) => {
    const { type } = detail;
    delete this.store[type];
    this.notify();
  };

  // 状態をTypeで返す
  fetch = (detail) => {
    const { type } = detail;
    return this.store[type];
  };
  // 状態を全部返す
  fetchAll = () => {
    return this.store;
  };
}
