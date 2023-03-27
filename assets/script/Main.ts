import { _decorator, Component } from 'cc';
import { ViewConst } from './const/ViewConst';
import { Global } from './base/Global';
import { DBAvater } from './dragonBones/DBAvater';
import { LayerManager } from './manager/LayerManager';
import { GameConfig } from './base/GameConfig';
import { Hander } from './base/Hander';
import { ViewArgs } from './manager/ViewManager';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    start() {
        Global.init();
        Global.LayerManager.initLayer();
        Global.ModuleManager.initView();

        Global.ViewManager.open(ViewConst.LOGIN_LOADING, { exParam: { point: 0.5, desc: "加载配置..." } } as ViewArgs, null, Main.initConfig);
    }

    update(deltaTime: number) {
        
    }

    /**加载配置 */
    public static initConfig() {
        GameConfig.initConfig(Hander.create(Main.parseConfig, this));
    }

    /**解析配置 */
    public static parseConfig() {
        Global.ViewManager.setLoginLoadIng(0.9, "解析配置...");
        GameConfig.parseAllConfig(Hander.create(Main.gameStart, this));
    }

    public static gameStart() {
        Global.ViewManager.setLoginLoadIng(1, "登录中...");
        // viewMgr.logV();
        Global.ViewManager.open(ViewConst.TEST);

        let avater: DBAvater = Global.ObjectPool.get("DBAvater");
        let node = Global.LayerManager.getLayerCanvasByName(LayerManager.UI_MODEL);
        node.addChild(avater);
        avater.init("54002");

        let avater2: DBAvater = Global.ObjectPool.get("DBAvater");
        let node2 = Global.LayerManager.getLayerCanvasByName(LayerManager.UI_MODEL);
        node2.addChild(avater2);
        avater2.init("54002");
        avater2.position.set(250, 0, 0);

        let cfg = GameConfig.getConfig("0yuangiftbag");
        console.log(cfg);
    }
}

