/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-17 14:22:48
 * @ Description:界面映射
 */

import { Global } from "../base/Global";
import { ViewConst, ViewInfo } from "../const/ViewConst";
import { LayerManager } from "./LayerManager";



export class ModuleManager {
    private static instance: ModuleManager | null = null;
    public static getInstance(): ModuleManager {
        if (!this.instance) {
            this.instance = new ModuleManager();
        }
        return this.instance;
    }

    /**初始化界面映射 */
    public initView() {
        this.register(ViewConst.LOGIN_LOADING, { id: ViewConst.LOGIN_LOADING, prefab: "prefab/LoginLoadingView", cl: "LoginLoadingView", layer: LayerManager.UI_GUILD });
        this.register(ViewConst.TEST, { id: ViewConst.TEST, prefab: "prefab/test", cl: "TestView", layer: LayerManager.UI_WIN });
        this.register(ViewConst.LOADING, { id: ViewConst.LOADING, prefab: "prefab/LoadingView", cl: "LoadingView", layer: LayerManager.UI_WIN });
    }

    private register(id: number, info: ViewInfo) {
        Global.ViewManager.register(id, info);
        // console.log(`${key} ---- ${cl}`);
    }
}