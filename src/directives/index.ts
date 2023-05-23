import { App } from 'vue'
import copy from './copy'
export default {
    install(app: App) {
        app.directive('copy', copy)
    }
}
