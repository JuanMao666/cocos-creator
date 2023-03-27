/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-12-06 11:27:33
 * @ Description:全局方法
 */

import { _decorator } from 'cc';
import { DBManager } from '../manager/DBManager';
import { EventManager } from '../manager/EventManager';
import { LayerManager } from '../manager/LayerManager';
import { ModuleManager } from '../manager/ModuleManager';
import { SceneManager } from '../manager/SceneManager';
import { ViewManager } from '../manager/ViewManager';
import { ObjectPool } from '../res/ObjectPool';
import ResLoader from '../res/ResLoader';
import { GameConfig } from './GameConfig';
const { ccclass, property } = _decorator;


@ccclass('Global')
export class Global {
    public static ResLoader: ResLoader;
    public static EventManager: EventManager;
    public static LayerManager: LayerManager;
    public static ModuleManager: ModuleManager;
    public static DBManager: DBManager;
    public static ViewManager: ViewManager;
    public static ObjectPool: ObjectPool;
    public static SceneManager: SceneManager;
    public static GameConfig: GameConfig;

    public static init() {
        Global.ResLoader = ResLoader.getInstance();
        Global.EventManager = EventManager.getInstance();
        Global.LayerManager = LayerManager.getInstance();
        Global.ModuleManager = ModuleManager.getInstance();
        Global.DBManager = DBManager.getInstance();
        Global.ViewManager = ViewManager.getInstance();
        Global.ObjectPool = ObjectPool.getInstance();
        Global.SceneManager = SceneManager.getInstance();
        Global.GameConfig = GameConfig.getInstance();
    }
}

