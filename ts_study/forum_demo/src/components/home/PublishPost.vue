<template>
    Publish page: {{ category_id }}
    <div id="container">
        <input placeholder="input a title" class="title" v-model="title" />
    </div>
    <div id="container">
        <textarea placeholder="input a brief" class="summary" v-model="summary" />
    </div>
    <div id="container">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
            style="border-bottom: 1px solid #ccc; width: 800px;" />
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml"
            style="height: 400px;width: 800px;overflow-y: hidden;" @onCreated="handleCreated" />
    </div>
    <div id="container">
        <div class="button" v-on:click="publish">Publish post</div>
    </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, getCurrentInstance } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor } from '@wangeditor/editor'
import store from '../../tools/Store'
import networkPath from '../../tools/Network';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
/*
import { Options, Vue } from 'vue-facing-decorator'
@Options({
    props: {
        category_id: String
    }
})
*/

export default {
    components: { Editor, Toolbar },
    props: {
        category_id: String
    },
    setup(props: any) {
        const router = useRouter()
        const instance = getCurrentInstance()
        const editorRef = shallowRef()
        const valueHtml = ref('')
        const title = ref('')
        const summary = ref('')
        const toolbarConfig = {
            excludeKeys: ['group-video', 'group-image', 'fullScreen']
        }

        const editorConfig = { placeholder: 'input some content' }
        onBeforeUnmount(() => {
            const editor = editorRef.value;
            if (editor == null) return;
            editor.destroy()
        })
        const handleCreated = (editor: IDomEditor) => {
            console.log('created ', editor)
            editorRef.value = editor
        }
        const publish = () => {
            console.log(valueHtml.value)
            console.log(props.category_id)
            console.log(title.value)
            console.log(summary.value)
            console.log(store.state.id)

            let content = valueHtml.value;
            let t = title.value;
            let s = summary.value
            let author_id = store.state.id;
            let category_id = props.category_id;

            if (!instance) {
                console.error('FATAL: Component instance is not available for publishing.')
                return
            }
            if (!content) {
                ElMessage({ message: 'please write content first', type: 'error' });
                return
            }
            if (!t) {
                ElMessage({ message: 'Post title must be provide', type: 'error' });
                return;
            }
            if (!s) {
                ElMessage({ message: 'Post summary content must be set.', type: 'error' });
                return;
            }
            if (!author_id) {
                ElMessage({ message: 'must be login first', type: 'error' });
                return;
            }
            if (!category_id) {
                ElMessage({ message: 'choose a category', type: 'error' });
                return;
            }

            instance.appContext.app.axios.post(networkPath.createPost, {
                title: t,
                summary: s,
                category_id: category_id,
                content: content,
                author_id: author_id
            }).then(() => {
                ElMessage({ message: 'publish success, will goto home page ~', type: 'success' })
                setTimeout(() => { router.push({ name: "home" }) }, 3000)
            }).catch((error: any) => {
                ElMessage.error(error.response.data.msg)
            })
        }

        return {
            editorRef,
            mode: 'default',
            title,
            summary,
            valueHtml,
            toolbarConfig,
            editorConfig,
            handleCreated,
            publish
        }
    }
}
</script>

<style scoped>
#container {
    margin: 0 auto;
    width: 800px;
    background-color: white;
    box-shadow: 5px 5px 10px #c1c1c1;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
}

.title {
    border: transparent;
    width: 80%;
    height: 50px;
    font-size: 30px;
    max-lines: 1;
    margin: 20px;
    outline: none;
}

.summary {
    border: transparent;
    width: 100%;
    height: 50px;
    font-size: 18px;
    max-lines: 1;
    margin: 20px;
    outline: none;
}

.button {
    width: 100%;
    height: 60px;
    font-size: 25px;
    line-height: 60px;
    text-align: center;
    background-color: cornflowerblue;
    color: white;
}
</style>