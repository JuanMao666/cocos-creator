import { _decorator, Node, instantiate } from 'cc';
import { ProgressCallback } from '../res/ResLoader';
import { LayerManager } from './LayerManager';
import { ViewConst, ViewInfo } from "../const/ViewConst";
import { Global } from '../base/Global';
import { LoginLoadingView } from '../loading/LoginLoadingView';

export interface ViewArgs {
    index?: number;
    exParam?: any;
}

export class ViewManager {
    private static instance: ViewManager | null = null;
    public static getInstance(): ViewManager {
        if (!this.instance) {
            this.instance = new ViewManager();
        }
        return this.instance;
    }

    /**界面映射 */
    // public viewCl: { [id: number]: ViewInfo } = {};
    public viewCl: Map<number, ViewInfo> = new Map();
    /**已打开的界面 */
    public opens: Map<number, any> = new Map();

    public register(key: number, info: ViewInfo) {
        this.viewCl[key] = info;
    }

    public logV() {
        for (let key in this.viewCl) {
            let value = this.viewCl[key];
            console.log(`${key} ---- ${value}`);
        }
    }

    /**获取界面类 */
    public getViewClById(id: number): ViewInfo {
        return this.viewCl[id];
    }

    public open(id: number, args?: ViewArgs | null, progressCallback?: ProgressCallback | null, completeCallback?: Function | null) {
        let info: ViewInfo = this.getViewClById(id);
        if (info.view) {
            this.addView(id, info.view, args, completeCallback);
        } else {
            this.loadView(id, progressCallback, (view: any) => {
                this.addView(id, view, args, completeCallback);
            }, args)
        }
    }

    /**把界面添加在canvas上 */
    public addView(id: number, view: any, args: ViewArgs, completeCallback?: Function | null) {
        if (!id) return;
        view.node.active = true;
        let info: ViewInfo = this.getViewClById(id);
        let layer = info.layer ? info.layer : LayerManager.UI_WIN;
        let node = Global.LayerManager.getLayerCanvasByName(layer);
        if (!node) {
            console.log(`${layer}没有canvas`);
            return;
        }
        node.addChild(view.node);
        view.args = args;
        if (view.isStart)//初始化过的界面才需要调
            view.open(args);
        this.opens.set(id, view);
        if (completeCallback)
            completeCallback(view);
    }

    public loadView(id: number, progressCallback: ProgressCallback | null, completeCallback: (view: any) => void, args: any) {
        let info: ViewInfo = this.getViewClById(id);
        let view: any = info.view;
        if (view) {
            completeCallback(view);
            return;
        };
        let path = info.prefab;
        Global.ResLoader.load(path, progressCallback, (err, prefab) => {
            // 检查加载资源错误
            if (err) {
                console.log(`loadView load ${id} faile, path: ${path} error: ${err}`);
                completeCallback(null);
                return;
            }

            // 检查实例化错误
            let viewNode: Node = instantiate(prefab);
            if (null == viewNode) {
                console.log(`loadView instantiate ${id} faile, path: ${path}`);
                completeCallback(null);
                prefab.decRef();
                return;
            }
            viewNode.addComponent(info.cl);
            view = viewNode.getComponent(info.cl) as any;
            view.viewId = info.id;
            info.view = view;
            completeCallback(view);
            view.cacheAsset(prefab);
        })
    }

    public close(id: number) {
        let view: any = this.opens.get(id);
        if (!view) return;
        view.node.active = false;
        view.close();
        view.node.removeFromParent();
        // view.destroy();
        this.opens.delete(id);
    }

    /**清除所有界面 */
    public closeAll() {
        this.opens.forEach((view: any, key) => {
            this.close(key);
        });
    }

    /**登录加载页 */
    public setLoginLoadIng(ponit: number, desc: string) {
        let info: ViewInfo = this.getViewClById(ViewConst.LOGIN_LOADING);
        let view: LoginLoadingView = info.view;
        if (!view) return;
        view.setPoint(ponit, desc);
    }
}