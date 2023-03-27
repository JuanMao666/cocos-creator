import { dragonBones, _decorator, Node, Layers } from 'cc';
import { Global } from '../base/Global';
const { ccclass, property } = _decorator;

@ccclass('DBAvater')
export class DBAvater extends Node {
    private armatureDisplay: dragonBones.ArmatureDisplay;
    private resName = "";

    public init(resName: string) {
        this.resName = resName;
        this.load();
    }

    public load() {
        Global.DBManager.loaddArmature(this.resName, this);
        this.name = `DBAvater_${this.resName}`;
        this.layer = Layers.Enum.UI_2D;
    }

    /**
     * 加载完的回调
     * @param armature 
     */
    public create(dbAsset: dragonBones.DragonBonesAsset, dbAtlas: dragonBones.DragonBonesAtlasAsset) {
        if (!this.armatureDisplay) {
            this.armatureDisplay = this.addComponent(dragonBones.ArmatureDisplay);
        }
        this.armatureDisplay.dragonAsset = dbAsset
        this.armatureDisplay.dragonAtlasAsset = dbAtlas
        this.armatureDisplay.armatureName = this.resName;

        this.playAnimation("stand", 0);
    }

    /**
     * 播放动作
     * @param animName 动作名称
     * @param playTimes playTimes 指定播放动画的次数。
     * -1 为使用配置文件中的次数。
     * 0 为无限循环播放。
     * >0 为动画的重复次数。
     */
    public playAnimation(animName: string, playTimes?: number) {
        if (!this.armatureDisplay) return;
        this.armatureDisplay.playAnimation(animName, playTimes);
    }

    public dispose() {
        Global.DBManager.unLoadArmatureFile(this.name, this);
        this.resName = "";
        this.name = "";
        this.armatureDisplay = null;
    }
}

