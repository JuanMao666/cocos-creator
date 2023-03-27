/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-17 14:25:47
 * @ Description:测试界面
 */
import { _decorator, Node, Sprite, RichText, Button, director, Scene } from 'cc';
import { BaseView } from '../base/BaseView';
import { Global } from '../base/Global';
import { ViewConst } from '../const/ViewConst';
const { ccclass, property } = _decorator;

@ccclass('TestView')
export class TestView extends BaseView {
    private Sprite: Sprite;
    private rt_txt: RichText;
    private btn1: Button;

    private count = 0;

    public start() {
        super.start();
        this.Sprite = this.getChildComponent("Sprite", Sprite);
        this.rt_txt = this.getChildComponent("rt_txt", RichText);
        this.btn1 = this.getChildComponent("btn1", Button);

        this.addClick(this.node, this.btn1, "onClick", "xxxxxx");
    }

    public open(args) {
        super.open(args);
    }

    public onClick(event: Event, customEventData: string) {
        this.rt_txt.string = `${customEventData}   ${this.count}`;
        this.count++;
        // console.log(customEventData); // foobar
        Global.SceneManager.loadScene("Scene2");
        Global.ViewManager.close(ViewConst.TEST);
    }
}

