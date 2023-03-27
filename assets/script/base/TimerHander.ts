/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-12-14 15:52:47
 * @ Description: 计时器hander
 */

import { _decorator } from 'cc';
import { Global } from './Global';
import { Hander } from './Hander';
const { ccclass, property } = _decorator;

@ccclass('TimerHander')
export class TimerHander {
    public callFun: Function;
    public thisC: any;
    public repeat: number;
    public frame: number;
    public nextFrame: number;

    /**
     * 创建Hander
     */
    public static create(): TimerHander {
        let hander: TimerHander = Global.ObjectPool.get("TimerHander");
        return hander;
    }

    /**执行 */
    public run(): any {
        let returnFlag;
        if (this.callFun)
            this.callFun.apply(this.thisC);
    }

    public dispose() {
        this.callFun = null;
        this.thisC = null;
        this.repeat = null;
        this.frame = null;
        this.nextFrame = null;
        Global.ObjectPool.push(this);
    }
}

