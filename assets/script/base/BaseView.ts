import { _decorator, EventHandler, Widget, Button, Node, approx } from 'cc';
import { BaseComponent } from './BaseComponent';
import { ViewArgs } from '../manager/ViewManager';
import { EventCall } from '../manager/EventCall';
import { Global } from './Global';
const { ccclass, property } = _decorator;
/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-17 13:48:30
 */
@ccclass("BaseView")
export class BaseView extends BaseComponent {
    public viewId = 0;

    start() {
        super.start();
    }

    update(deltaTime: number) {

    }

    public open(args: ViewArgs) {
        super.open(args);
        this.args = args;
        this.setCenter();
    }

    private setCenter() {
        let widget = this.node.addComponent(Widget);
        widget.isAlignVerticalCenter = true;
        widget.verticalCenter = 0;
        widget.isAlignHorizontalCenter = true;
        widget.horizontalCenter = 0;
    }

    public close() {
        super.close();
        this.removeAllEvent();
    }

    public closeView() {
        Global.ViewManager.close(this.viewId);
    }

    public onDispose() {
        super.onDispose();
        this.removeAllEvent();
        this.removeHander();
    }

    public eventArr: Array<EventCall> = [];
    /**记录监听事件 */
    public recoedEvent(eventName: string, callFun: Function) {
        let call: EventCall = Global.ObjectPool.get("EventCall");
        call.eventName = eventName;
        call.callFun = callFun;
        call.thisc = this;
        this.eventArr.push(call);
    }

    /**监听事件 */
    public addEvent(eventName: string, callFun: Function) {
        let flag = Global.EventManager.addEventLinster(eventName, callFun, this);
        if (flag)
            this.recoedEvent(eventName, callFun);
    }

    public removeAllEvent() {
        for (let key in this.eventArr) {
            let call: EventCall = this.eventArr[key];
            Global.EventManager.removeEventLister(call.eventName, call.callFun, call.thisc);
            call.dispose();
            Global.ObjectPool.push(call);
        }
        this.eventArr = [];
    }

    private handerDic = {};
    /**
     * 添加按钮点击事件 
     * @param node 这个 node 节点是你的事件处理代码组件所属的节点。
     * @param btn 按钮。
     * @param handler 指定一个回调函数，当用户点击 Button 并释放时会触发此函数。
     * @param customEventData 用户指定任意的字符串作为事件回调的最后一个参数传入。
     */
    public addClick(node: Node, btn: Button, handler: string, customEventData?: string) {
        let handlerArr = this.handerDic[btn.uuid];
        if (!handlerArr) {
            handlerArr = [];
        } else {
            if (handlerArr.indexOf(handler) != -1) {
                console.log(`${btn}重复注册点击事件${handler}`);
                return;
            }
        }
        let clickEventHandler: EventHandler = new EventHandler();
        clickEventHandler.target = node; // 这个 node 节点是你的事件处理代码组件所属的节点
        let clName = Global.ObjectPool.getClName(this);
        clickEventHandler.component = clName;// 这个是脚本类名
        clickEventHandler.handler = handler;
        clickEventHandler.customEventData = customEventData;
        btn.clickEvents.push(clickEventHandler);
        handlerArr.push(handler);
        this.handerDic[btn.uuid] = handlerArr;
    }

    private removeHander() {
        this.handerDic = {};
    }

    /**
     * 获取节点下的控件
     * @param name 节点名
     * @param cl 组件类
     */
    public getChildComponent(nodeName: string, cl: any): any {
        let node = this.node.getChildByName(nodeName);
        if (!node) return null;
        return node.getComponent(cl);

    }
}

