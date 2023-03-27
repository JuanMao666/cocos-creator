/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-28 15:42:55
 * @ Description:对象池
 */

import { js, _decorator } from "cc";
const { ccclass } = _decorator;

@ccclass('ObjectPool')
export class ObjectPool {
    private objMax = 50;//最大数量
    private objPool = {};

    private static instance: ObjectPool | null = null;
    public static getInstance(): ObjectPool {
        if (!this.instance) {
            this.instance = new ObjectPool();
        }
        return this.instance;
    }

    /**获取对象 */
    public get(cName: string | any) {
        let instance;
        let objArr: Array<any> = this.objPool[cName];
        if (objArr) {
            instance = objArr[0];
            objArr.splice(0);
        } else {
            let cl = this.getClByName(cName);
            if (!cl) {
                console.log("通过名字获取已注册的类型,需要在类增加 @ccclass装饰器");
                return;
            }
            instance = new cl();
        }
        return instance;
    }

    /**回池 */
    public push(obj: any) {
        let cName = this.getClName(obj);
        if (!cName || cName == "") {
            console.log("获取对象的类型名称,需要在类增加 @ccclass装饰器");
            return;
        }
        let objArr: Array<any> = this.objPool[cName];
        if (!objArr) {
            objArr = [obj];
        } else {
            if (objArr.length > this.objMax) {

            } else {
                objArr.push(obj);
            }
        }
        this.objPool[cName] = objArr;
        // console.log(this.objPool);
    }

    /*通过类名获取类 (需要在类增加 @ccclass装饰器) */
    public getClByName(cName: string) {
        return js.getClassByName(cName);
    }

    /*获取对象的类型名称，如果对象是 {} 字面量，将会返回 "" (需要在类增加 @ccclass装饰器) */
    public getClName(obj: any): string {
        return js.getClassName(obj);
    }
}