import { _decorator, Component, Node, assetManager } from 'cc';
import { Global } from './Global';
import { Hander } from './Hander';
const { ccclass, property } = _decorator;

@ccclass('GameConfig')
export class GameConfig {
    private static zipCfig;
    private static configDataList: Map<string, JSON> = new Map();

    private static instance: GameConfig | null = null;
    public static getInstance(): GameConfig {
        if (!this.instance) {
            this.instance = new GameConfig();
        }
        return this.instance;
    }

    public static initConfig(hander: Hander) {
        Global.ResLoader.load("config/config", (err, assets: any) => {
            JSZip.loadAsync(assets._buffer).then((zip) => {
                this.zipCfig = zip;
                hander.run();
            });
        })
    }

    public static parseAllConfig(hander: Hander) {
        for (const key in this.zipCfig.files) {
            this.parseFile(key);
        }
        hander.run();
    }

    public static getConfig(fileName: string) {
        if (!this.zipCfig) return null;
        if (fileName.indexOf(".json") == -1)
            fileName = fileName + ".json";
        this.parseFile(fileName);
        return this.configDataList[fileName];
    }

    public static parseFile(fileName) {
        if (!this.configDataList[fileName]) {
            let file = this.zipCfig.file(fileName);
            if (!file) {
                console.log(`${fileName}配置不存在`);
                return;
            }
            this.zipCfig.file(fileName).async('string').then(data => {
                let json = this.isJSON(data);
                // console.log(json);
                this.configDataList.set(fileName, json)
            });
        }
    }

    public static isJSON(str: string): any {
        try {
            let obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return obj;
            } else {
                return null;
            }

        } catch (e) {
            return null;
        }
    }
}

