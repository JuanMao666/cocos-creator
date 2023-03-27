import { _decorator, ProgressBar, Label, UITransform } from 'cc';
import { BaseView } from '../base/BaseView';
import { ViewArgs } from '../manager/ViewManager';
const { ccclass, property } = _decorator;

@ccclass('LoginLoadingView')
export class LoginLoadingView extends BaseView {
    private pg: ProgressBar;
    private lb_desc: Label;

    private maxWidth: number = 0;
    private showValue: number = 0;
    private _mProgress: number = 0;
    private isFinish: boolean = false;

    start() {
        this.pg = this.getChildComponent("pg", ProgressBar);
        this.lb_desc = this.getChildComponent("lb_desc", Label);

        let tf: UITransform = this.getChildComponent("pg", UITransform);
        this.maxWidth = tf.width;
        this.pg.totalLength = this.maxWidth;
        this.showValue = Math.floor(this.maxWidth * 0.8);

        super.start();
    }

    public open(args: ViewArgs) {
        super.open(args);
        if (args && args.exParam)
            this.setPoint(args.exParam.point, args.exParam.desc);
    }

    public setPoint(point: number, desc: string) {
        this.showValue = Math.floor(this.maxWidth * point);
        this.lb_desc.string = desc;
    }

    public update(deltaTime: number) {
        this.setProgress();
    }

    private setProgress() {
        if (this.mProgress < this.showValue)
            this.mProgress += 8;
        else
            this.complete();
    }

    private get mProgress(): number {
        return this._mProgress;
    }

    private set mProgress(value) {
        this._mProgress = Math.min(value, this.maxWidth);
        let p = value / this.maxWidth;
        this.pg.progress = p;
    }

    private complete() {
        this.closeView();
    }
}

