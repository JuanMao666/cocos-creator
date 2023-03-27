import { Asset, _decorator, Component, Node } from 'cc';
import { Global } from '../base/Global';
import { AssetType, CompleteCallback, ProgressCallback} from './ResLoader';
const { ccclass, property } = _decorator;

/**
 * @ Author: zhengxinpeng
 * @ Create Time: 2022-11-16 16:03:25
 * @ Description:资源引用计数
 */
@ccclass('ResKeeper')
export class ResKeeper extends Component {
    private assetCase: Set<Asset> = new Set<Asset>();
    /**
     * 加载资源
     * @param bundleName  assetbundle的路径
     * @param paths       资源url或url数组
     * @param type        资源类型
     * @param onProgress  加载进度回调
     * @param onComplete  加载完成回调
     */
    public load<T extends Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    public load<T extends Asset>(...args: any) {
        Global.ResLoader.load.apply(Global.ResLoader, args);
    }

    /**缓存资源 计数+1 */
    public cacheAsset(asset: Asset) {
        if (!this.assetCase.has(asset)) {
            asset.addRef();
            this.assetCase.add(asset);
        }
    }

    /**减少资源引用 */
    private destoryAllCache() {
        this.assetCase.forEach(element => {
            element.decRef();
        });
        this.assetCase.clear();
    }

    onDestroy() {
        this.destoryAllCache();
    }

    /**回池用 */
    onDispose() {
        this.destoryAllCache();
    }
}

