//Message= this.$message
import { Message } from "element-ui";
//第一个参数是nuxt对象,解构出$axios
export default ({ $axios }) => {
    $axios.onError(err => {
        //解构
        const { message, statusCode } = err.response.data;
        if (statusCode === 400) {
            Message.error(message)
        }
    })
}