/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-12-07 14:52:46
 * @ Description:地图加载页
 */

import { Label, math, ProgressBar, Tween, tween, UITransform, _decorator } from 'cc';
import { BaseView } from '../base/BaseView';
import { Global } from '../base/Global';
import { ViewArgs } from '../manager/ViewManager';
const { ccclass, property } = _decorator;

@ccclass('LoadingView')
export class LoadingView extends BaseView {
    private pro: ProgressBar;
    private lb_value: Label;

    private maxWidth = 0;
    public isEnter = false;
    private _mProgress = 0;
    private showValue = 0;

    public start() {
        super.start();
        this.pro = this.getChildComponent("pro", ProgressBar);
        this.lb_value = this.getChildComponent("lb_value", Label);

        let tf: UITransform = this.getChildComponent("pro", UITransform);
        this.maxWidth = tf.width;
        this.pro.totalLength = this.maxWidth;
        this.showValue = Math.floor(this.maxWidth * 0.8);
    }

    public open(args: ViewArgs) {
        super.open(args);
    }

    /**设置是否已经进入场景 */
    public setIsEnter(bool: boolean) {
        this.isEnter = bool;
    }

    public close() {
        this.mProgress = 0;
        this.isEnter = false;
        Global.SceneManager.loadingView = null;
    }

    public update(deltaTime: number) {
        this.setProgress();
    }

    public setProgress() {
        if (this.isEnter) {
            if (this.mProgress < this.maxWidth)
                this.mProgress += 8;
            else
                this.complete();
        } else {
            if (this.mProgress < this.showValue)
                this.mProgress += 5;
        }
    }

    private complete() {
        if (this.mProgress == this.maxWidth)
            this.closeView();
    }

    private get mProgress(): number {
        return this._mProgress;
    }

    private set mProgress(value) {
        this._mProgress = Math.min(value, this.maxWidth);
        let p = value / this.maxWidth;
        this.lb_value.string = `${Math.floor(p * 100)}%`;
        this.pro.progress = p;
    }
}

