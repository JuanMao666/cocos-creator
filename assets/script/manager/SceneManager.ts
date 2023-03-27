import { director, _decorator } from 'cc';
import { Global } from '../base/Global';
import { ViewConst } from '../const/ViewConst';
import { LoadingView } from '../loading/LoadingView';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager {
    public loadingView: LoadingView;

    private static instance: SceneManager | null = null;
    public static getInstance(): SceneManager {
        if (!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
    }

    public loadScene(name: string) {
        if (!this.loadingView) {
            Global.ViewManager.open(ViewConst.LOADING, null, null, (view) => {
                this.loadingView = view;
                this.sceneProgress(name);
            });
        } else {
            this.sceneProgress(name);
        }
    }

    private sceneProgress(name: string) {
        director.loadScene(name, () => {
            this.loadingView.setIsEnter(true);
        });
    }
}

