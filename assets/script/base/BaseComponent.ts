import { _decorator, Component, Node } from 'cc';
import { ResKeeper } from '../res/ResKeeper';
import { ViewArgs } from '../manager/ViewManager';
const { ccclass, property } = _decorator;

/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-14 14:21:13
 * @ Description:Component基类
 */
@ccclass('BaseComponent')
export class BaseComponent extends ResKeeper {
    private _args: ViewArgs;
    public isStart: boolean = false;

    onLoad() {

    }

    start() {
        this.isStart = true;
        this.open(this.args);
    }

    update(deltaTime: number) {

    }

    public open(args: ViewArgs) {
    }

    public close() {
        this.args = null;
    }

    lateUpdate(deltaTime: number) {

    }

    onEnable(): void {

    }

    onDisable(): void {

    }

    onDestroy(): void {
        super.onDestroy();
    }

    /**回池用 */
    onDispose() {
        super.onDispose();
        this.isStart = false;
        this.args = null;
    }

    public get args(): ViewArgs {
        return this._args;
    }

    public set args(a: ViewArgs) {
        this._args = a;
    }
}

