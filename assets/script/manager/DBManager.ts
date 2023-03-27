/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-12-05 16:37:40
 * @ Description:龙骨管理
 */

import { dragonBones, Texture2D, _decorator } from 'cc';
import { Global } from '../base/Global';
import { DBAvater } from '../dragonBones/DBAvater';
import { DBFile } from '../dragonBones/DBFile';
import { DBFileLoad } from '../dragonBones/DBFileLoad';
const { ccclass } = _decorator;

@ccclass('DBManager')
export class DBManager {
    private factory: dragonBones.CCFactory = dragonBones.CCFactory.getInstance();
    private files: Map<string, DBFile> = new Map();
    private loadFiles: Map<string, DBFileLoad> = new Map();

    private static instance: DBManager | null = null;
    public static getInstance(): DBManager {
        if (!this.instance) {
            this.instance = new DBManager();
        }
        return this.instance;
    }

    /**
     * 加载骨架
     * @param name 资源名
     * @param tar 目标
     */
    public loaddArmature(name: string, tar: DBAvater) {
        let file: DBFile = this.files[name];
        if (file) {
            this.makeArmature(name, tar);
        } else {
            let load: DBFileLoad = this.loadFiles[name];
            if (!load) {
                load = Global.ObjectPool.get("DBFileLoad");
                load.name = name;
            }
            load.tarList.push(tar);

            if (!load.isLoading)
                this.loadArmatureFile(load);
        }
    }

    /**
     * 创建骨骼动画
     * @param name 资源名
     * @param tar 目标
     * @returns 
     */
    public makeArmature(name: string, tar: DBAvater) {
        let file: DBFile = this.files[name];
        if (!file)
            return;
        file.dbAsset.addRef();
        file.dbAtlas.addRef();
        tar.create(file.dbAsset, file.dbAtlas);
    }

    /**
     * 加载龙骨文件
     * @param load 龙骨文件数据加载情况
     */
    public loadArmatureFile(load: DBFileLoad) {
        load.isLoading = true;
        let dbAsset: dragonBones.DragonBonesAsset;
        let dbAtlas: dragonBones.DragonBonesAtlasAsset;

        let complete = () => {
            if (!dbAsset || !dbAtlas)
                return;
            this.saveArmatureFile(load.name, dbAsset, dbAtlas);

            for (let key in load.tarList) {
                let tar: DBAvater = load.tarList[key];
                this.makeArmature(load.name, tar);
            }
            delete this.loadFiles[load.name];
        }

        Global.ResLoader.load(`dragon/${load.name}_ske`, dragonBones.DragonBonesAsset, (err, data: dragonBones.DragonBonesAsset) => {
            dbAsset = data;
            complete();
        })

        Global.ResLoader.load(`dragon/${load.name}_tex`, dragonBones.DragonBonesAtlasAsset, (err, data: dragonBones.DragonBonesAtlasAsset) => {
            dbAtlas = data;
            complete();
        })
    }

    /**
     * 缓存龙骨文件到缓存
     * @param name 文件名
     * @param dbAsset 骨骼数据
     * @param dbAtlas 骨骼纹理数据
     */
    private saveArmatureFile(name: string, dbAsset: dragonBones.DragonBonesAsset, dbAtlas: dragonBones.DragonBonesAtlasAsset): void {
        if (this.files[name]) return;

        let file: DBFile = Global.ObjectPool.get("DBFile");
        file.name = name;
        file.dbAsset = dbAsset;
        file.dbAtlas = dbAtlas;
        this.files[name] = file;
    }

    /**
     * 去除/去除文件加载
     * @param name 
     * @param tar 
     */
    public unLoadArmatureFile(name: string, tar: DBAvater) {
        let file: DBFile = this.files[name];
        if (file) {
            file.dbAsset.decRef();
            file.dbAtlas.decRef();
            if (file.dbAsset.refCount <= 0 || file.dbAtlas.refCount <= 0) {
                this.files.delete(name);
                file.dispose();
                Global.ObjectPool.push(file);
            }
        } else {
            let load: DBFileLoad = this.loadFiles[name];
            if (load) {
                let index = load.tarList.indexOf(tar);
                if (index != -1) {
                    load.tarList.splice(index, 1);
                }
                if (load.tarList.length == 0) {
                    load.dispose();
                    delete this.loadFiles[name];
                    Global.ObjectPool.push(load);
                }
            }
        }
    }
}

