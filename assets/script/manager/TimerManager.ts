/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-12-14 15:46:05
 * @ Description:计时器管理
 */

import { _decorator, Component, Node, repeat } from 'cc';
import { Hander } from '../base/Hander';
import { TimerHander } from '../base/TimerHander';
const { ccclass, property } = _decorator;

@ccclass('TimerManager')
export class TimerManager {
    private timerDic = {};
    private frameC = 0;

    update(deltaTime: number) {
        for (let key in this.timerDic) {
            let timerArr = this.timerDic[key];
            for (let key2 in timerArr) {
                let timer: TimerHander = timerArr[key2];
                if (this.frameC >= timer.nextFrame) {
                    timer.run();
                    if (timer.repeat > 0) {
                        timer.repeat--;
                        timer.nextFrame = this.frameC + timer.frame;
                    }else{
                        
                    }
                }
            }
        }
        this.frameC++;
    }

    /**获取当前帧率 */
    public getFrame(): number {
        return this.frameC;
    }

    /**
     * 定帧执行（几帧一调）
     * @param frame 间隔帧数
     * @param callFun 
     * @param thisC  
     * @param repeat 重复次数
     */
    public addFrame(frame: number, callFun: Function, thisC: any, repeat: number) {
        let hander: TimerHander = TimerHander.create();
        hander.callFun = callFun;
        hander.thisC = thisC;
        hander.frame = frame;
        hander.nextFrame = this.frameC + frame;
        hander.repeat = repeat;

        let arr: Array<TimerHander> = this.timerDic[thisC.uuid];
        if (arr)
            arr.push(hander);
        else
            arr = [hander];
        this.timerDic[thisC.uuid] = arr;
    }
}

