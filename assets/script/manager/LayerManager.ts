/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-18 15:01:50
 * @ Description:层级管理
 */

import { _decorator, director } from 'cc';
const { ccclass } = _decorator;

@ccclass('LayerManager')
export class LayerManager {
    private static instance: LayerManager | null = null;
    public static getInstance(): LayerManager {
        if (!this.instance) {
            this.instance = new LayerManager();
        }
        return this.instance;
    }
    /**场景层 */
    public static UI_SCENE = "UI_SCENE";
    /**模型层 */
    public static UI_MODEL = "UI_MODEL";
    /**主界面层 */
    public static UI_MAIN = "UI_MAIN";
    /**窗口层 */
    public static UI_WIN = "UI_WIN";
    /**引导层 */
    public static UI_GUILD = "UI_GUILD";

    public getLayerCanvasByName(name) {
        let node = director.getScene().getChildByName(name);
        return node.getChildByName("Canvas");
    }

    /**初始化层级 */
    public initLayer() {
        director.addPersistRootNode(director.getScene().getChildByName("MainCamera"));
        director.addPersistRootNode(director.getScene().getChildByName("UICamera"));
        director.addPersistRootNode(director.getScene().getChildByName(LayerManager.UI_SCENE));
        director.addPersistRootNode(director.getScene().getChildByName(LayerManager.UI_MODEL));
        director.addPersistRootNode(director.getScene().getChildByName(LayerManager.UI_MAIN));
        director.addPersistRootNode(director.getScene().getChildByName(LayerManager.UI_WIN));
        director.addPersistRootNode(director.getScene().getChildByName(LayerManager.UI_GUILD));
    }
}