import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EventCall')
export class EventCall {
    public eventName: string;
    public callFun: Function;
    public thisc: any;
    public isOne?: boolean; // 是否只执行一次

    public dispose() {
        this.eventName = null;
        this.callFun = null;
        this.thisc = null;
        this.isOne = null;
    }
}

