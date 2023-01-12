import * as $Icon from '@ant-design/icons-vue'
import { h } from 'vue'
const Icon = (props) => {
    return h($Icon[props.name])
}
export default Icon
