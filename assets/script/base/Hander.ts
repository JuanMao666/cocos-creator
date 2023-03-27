import { _decorator, Component, Node } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Hander')
export class Hander {
    private callFun: Function;
    private thisC: any;
    private isOnce: boolean;
    private args: Array<any>;

    /**
     * 创建Hander
     * @param callFun 
     * @param thisC 
     * @param args 
     * @param isOnce 是否只执行一次
     * @returns 
     */
    public static create(callFun: Function, thisC: any, isOnce: boolean = true, args?: Array<any>): Hander {
        let hander: Hander = Global.ObjectPool.get("Hander");
        hander.callFun = callFun;
        hander.thisC = thisC;
        hander.args = args;
        hander.isOnce = isOnce;
        return hander;
    }

    /**执行 */
    public run(): any {
        let returnFlag;
        if (this.callFun) {
            returnFlag = this.callFun.apply(this.thisC, this.args);
        }
        if (this.isOnce) {
            this.dispose();
        }
        return returnFlag;
    }

    public dispose() {
        this.callFun = null;
        this.thisC = null;
        this.args = null;
        this.isOnce = null;
        Global.ObjectPool.push(this);
    }
}

