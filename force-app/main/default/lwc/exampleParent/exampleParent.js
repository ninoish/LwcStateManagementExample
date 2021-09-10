import { LightningElement } from "lwc";
import StateStore from "c/stateStore";
export default class ExampleParent extends LightningElement {

  // このサンプルでは、StateStoreの内容全てを表示する
  _stateValue = "";
  get stateValue() {
    return this._stateValue;
  };
  set stateValue(v) {
    this._stateValue = JSON.stringify(v);
  }

  store;
  type = "";
  value = "";

  connectedCallback() {
    this.store = StateStore.getInstance((changedValue) => {
      this.stateValue = changedValue;
    });
  }

  onChangeTypeInput = (e) => {
    this.type = e.detail.value;
  };
  onChangeValueInput = (e) => {
    this.value = e.detail.value;
  };

  onClickDelete = () => {
    this.store.del({ type: this.type });
  };
  onClickAdd = () => {
    this.store.add({ type: this.type, value: this.value });
  };
}
