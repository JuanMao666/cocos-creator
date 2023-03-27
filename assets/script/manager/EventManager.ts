/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-24 16:24:50
 * @ Description:事件管理
 */

import { _decorator, Component, Node, CCObject } from 'cc';
import { Global } from '../base/Global';
import { EventCall } from './EventCall';

export class EventManager {
    private static instance: EventManager | null = null;

    public static getInstance(): EventManager {
        if (!this.instance) {
            this.instance = new EventManager();
        }
        return this.instance;
    }

    private eventLinster: Map<string, Array<EventCall>> = new Map();
    private targetLinster: Map<any, Array<EventCall>> = new Map();

    public getEventLinster(eventName: string, callFun: Function, thisc: any) {
        let arr = this.eventLinster[eventName];
        for (let i = 0; i < arr.length; i++) {
            let call: EventCall = arr[i];
            if (call.callFun == callFun && call.thisc == thisc)
                return i;
        }
        return -1;
    }

    /**
     * 注册事件
     * @param eventName 事件名
     * @param callFun   回调方法
     * @param thisc     注册对象
     * @param isOne?    是否只调一次
     */
    public addEventLinster(eventName: string, callFun: Function, thisc: any, isOne?) {
        let arr: Array<EventCall> = this.eventLinster[eventName];
        let call: EventCall = Global.ObjectPool.get("EventCall");
        call.eventName = eventName;
        call.callFun = callFun;
        call.thisc = thisc;
        call.isOne = isOne;
        if (!arr) {
            this.eventLinster[eventName] = [call];
        } else {
            if (this.getEventLinster(eventName, callFun, thisc) >= 0)
                arr.push(call)
            else
                return false;
        }
        return true;
    }

    public removeEventLister(eventName: string, callFun: Function, thisc: any) {
        let index = this.getEventLinster(eventName, callFun, thisc);
        if (index >= 0) {
            let arr: Array<EventCall> = this.eventLinster[eventName];
            let call: EventCall = arr[index];
            call.dispose();
            Global.ObjectPool.push(call);
            arr.splice(index, 1);
            if (arr.length == 0)
                delete this.eventLinster[eventName];
        }
    }

    public dispatchEvent(eventName: string, ...args) {
        let arr: Array<EventCall> = this.eventLinster[eventName];
        for (let i = arr.length - 1; i >= 0; i--) {
            let call: EventCall = arr[i];
            call.callFun.apply(call.thisc, args);
            if (call.isOne) {
                let call: EventCall = arr[i];
                call.dispose();
                Global.ObjectPool.push(call);
                arr.splice(i, 1);
            }
        }
    }
}
