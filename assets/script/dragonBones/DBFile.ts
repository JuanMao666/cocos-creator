/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-12-05 16:53:36
 * @ Description:龙骨文件数据
 */

import { _decorator, dragonBones } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DBFile')
export class DBFile {
    public name: string;
    public dbAsset: dragonBones.DragonBonesAsset;
    public dbAtlas: dragonBones.DragonBonesAtlasAsset;

    public dispose() {
        this.name = null;
        this.dbAsset = null;
        this.dbAtlas = null;
    }
}

