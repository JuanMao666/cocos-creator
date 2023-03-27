/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-12-05 17:38:45
 * @ Description:龙骨文件数据加载情况
 */

import { _decorator } from 'cc';
import { DBAvater } from './DBAvater';
const { ccclass, property } = _decorator;

@ccclass('DBFileLoad')
export class DBFileLoad {
    public name: string;
    public tarList: Array<DBAvater> = [];
    public isLoading: boolean;

    public dispose() {
        this.name = null;
        this.tarList = null;
        this.isLoading = false;
    }
}

