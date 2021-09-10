import { LightningElement } from "lwc";
import StateStore from "c/stateStore";
const MYNUM_TYPE = "mynum";
export default class ExampleChild extends LightningElement {

  // No @api

  store;
  connectedCallback() {
    // 状態変更通知なしでStateStoreインスタンスを取得
    this.store = StateStore.getInstance();

    this.store.add({
      type: "messageFromChild",
      value: "This is a message from the child component"
    });
    this.store.add({ type: MYNUM_TYPE, value: 1 });
  }

  increment() {
    const mynum = this.store.fetch({ type: MYNUM_TYPE });
    this.store.add({ type: MYNUM_TYPE, value: parseInt(mynum, 10) + 1 });
  }
}
