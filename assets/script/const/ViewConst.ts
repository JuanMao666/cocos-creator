/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-17 14:13:54
 * @ Description:界面数据
 */

import { BaseView } from "../base/BaseView";

export interface ViewInfo {
    /**界面id(唯一) */
    id: number;
    /**预制体路径 */
    prefab: string;
    /**类 */
    cl: string;
    /**层级 */
    layer: string;
    /**界面 */
    view?: any;
}

export class ViewConst {
    /**登录加载界面 */
    static LOGIN_LOADING = 1;
    /**测试界面 */
    static TEST = 2;
    /**加载界面 */
    static LOADING = 3;
}

