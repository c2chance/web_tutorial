<template>
    <div class="category">
        Current category: {{ post?.category.label ?? "" }}
    </div>
    <div id="container">
        <div class="title">
            {{ post?.title }}
        </div>
        <div>
            <span class="tag">Author: {{ post?.author.nickname }}</span>
            <span class="tag">Publish time: {{ post?.publish_time }}</span>
            <span class="tag delete" v-if="post?.author.id == userId" v-on:click="deletePost">Delete post</span>
        </div>
        <div class="summary">
            <div class="summary_title">Summary</div>
            <div class="summary_content">{{ post?.summary }}</div>
        </div>
        <div v-html="post?.content" class="content editor-content-view"></div>
    </div>
    <div id="container">
        <div class="comment_title">
            <span>User comment</span>
            <span
                style="margin-left: 10px; font-size: 12px; padding: 10px; font-weight: bold;background-color: antiquewhite;border-radius: 10px;"
                v-on:click="publishComment">Publish comment</span>
        </div>
        <div v-for="(item, index) in comments" :key="index" v-on:click="publishReply(index)">
            <div class="comment_icon">
                {{ item.author.nickname[0] }}
            </div>
            <div class="comment_container">
                <div v-if="item.reply" class="reply">
                    reply{{ item.reply?.nickname }}:
                </div>
                <div class="comment_content">
                    {{ item.author.nickname }} Said: {{ item.content }}
                </div>
                <div class="comment_tags">
                    <span>
                        Publish Time: {{ item.publish_time }}
                    </span>
                    <span v-if="item.author.id == userId" style="color: red;" v-on:click="deleteComment(item.id)">
                        Delete
                    </span>
                </div>
            </div>
        </div>
        <div v-if="hasMoreComments" class="comment_more" v-on:click="loadComment">
            Click to load more ...
        </div>
    </div>
    <el-dialog v-model="commentPannelOpen" title="Comment a comment">
        <div style="margin-bottom: 30px; font-size: 22px;" v-if="replyTo">Reply: {{ replyTo.nickname }}</div>
        <div>
            <el-input v-model="commentText" :rows="4" type="textarea" placeholder="Please input a comment" />
        </div>
        <div style="margin-top: 30px">
            <el-button size="large" type="primary" :disabled="canPublishComment"
                v-on:click="toPublishComment">Comment</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
//import { Options, Vue } from 'vue-class-component'
import { Inject, Component, Vue, toNative } from 'vue-facing-decorator'
import { Post, Comment } from '../../tools/Model'
import networkPath from '../../tools/Network'
import { ElMessage, ElMessageBox } from 'element-plus'
import store, { UserInfo } from '../../tools/Store'

// @Options({ props: { id: String } })
/*
interface Props {
    id: string;
}
const props = defineProps<Props>()
*/
/*
const props = define({
    id: String;
})
*/
/*
@Component({
    provide: {
        id: 
    }
})
*/
@Component
class PostDetail extends Vue {
    @Inject
    id!: string
    post: Post | null = null
    userId = store.state.id
    comments: Comment[] = []
    hasMoreComments = true
    commentPannelOpen = false
    replyTo: UserInfo | null = null
    commentText = ""

    get canPublishComment(): boolean {
        return this.commentText.length <= 0
    }

    mounted(): void {
        this.loadData();
        this.loadComment()
    }

    loadData() {
        this.axios.get(networkPath.detail + `?id=${this.id}`).then((response) => {
            this.post = response.data.content
        }).catch((error) => {
            ElMessage.error(error.response.msg)
        })
    }

    loadComment() {
        this.axios.get(networkPath.comments + `?post_id=${this.id}&offset=${this.comments.length}&limit=5`).then((response) => {
            this.comments.push(...response.data.content)
            this.hasMoreComments = response.data.content.length == 5
        }).catch((error) => {
            ElMessage.error(error.response.msg)
        });
    }

    deletePost() {
        ElMessageBox.confirm(`Confirm to delete the current comment? `).then(() => {
            this.axios.delete(networkPath.deletePost, {
                data: { id: this.id }
            }).then(() => {
                ElMessage.success('Delete successful')
                setTimeout(() => { this.$router.push({ name: "home" }) }, 3000)
            }).catch((error) => {
                ElMessage.error(error.response.msg)
            })

        }).catch(() => {
            console.log('Cancel delete')
        })
    }
    // 
    deleteComment(id: number) {
        // 
        ElMessageBox.confirm(`Confirm to delete comment��`).then(() => {
            this.axios.delete(networkPath.deleteComment, {
                data: {
                    id: id
                }
            }).then(() => {
                ElMessage.success('delete success');
                // 
                setTimeout(() => {
                    this.comments = [];
                    this.loadComment();
                }, 3000);
            }).catch((error) => {
                ElMessage.error(error.response.msg);
            });
        }).catch(() => {
            console.log("Cancel delete");
        });
    }

    publishComment() {
        this.replyTo = null
        this.commentPannelOpen = true
    }

    publishReply(index: number) {
        this.replyTo = this.comments[index].author
        this.commentPannelOpen = true
    }

    toPublishComment() {
        var params: any = {
            post_id: this.id,
            content: this.commentText,
            author_id: this.userId
        }
        if (this.replyTo) {
            params.reply_to = this.replyTo.id;
        }
        this.axios.post(networkPath.createComment, params).then(() => {
            ElMessage.success('Comment success')
            setTimeout(() => {
                this.comments = []
                this.loadComment()
                this.commentPannelOpen = false
                this.commentText = ""
            }, 3000)
        }).catch((error) => {
            ElMessage.error(error.response.msg)
        })
    }
}
export default toNative(PostDetail)
</script>

<style scoped>
#container {
    margin-left: 80px;
    margin-top: 10px;
    width: 950px;
    background-color: white;
    box-shadow: 5px 5px 10px #c1c1c1;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.category {
    color: #777777;
    margin-left: 80px;
}

.title {
    font-size: 40px;
    margin-left: 15px;
    margin-top: 15px;
    margin-right: 15px;
}

.tag {
    margin-left: 20px;
    color: #777777;
}

.delete {
    color: red;
}

.summary {
    background-color: #EEF1FE;
    border-radius: 10px;
    margin: 10px;
    margin-top: 40px;
    padding: 20px;
}

.summary_title {
    font-weight: bold;
}

.summary_content {
    margin-top: 20px;
    color: #333333;
}

.content {
    margin: 20px;
}

.comment_title {
    font-size: 20px;
    margin-left: 15px;
    margin-top: 15px;
    margin-right: 15px;
}

.comment_icon {
    width: 50px;
    height: 50px;
    display: inline-block;
    background-color: #c1c1c1;
    border-radius: 5px;
    margin: 15px;
    text-align: center;
    font-size: 30px;
    line-height: 50px;
    font-weight: bold;
    vertical-align: top;
}

.reply {
    font-size: 14px;
    color: #777777;
}

.comment_container {
    display: inline-block;
    margin-right: 20px;
    margin-top: 15px;
    vertical-align: top;
}

.comment_content {
    font-size: 18px;
}

.comment_tags {
    margin-top: 5px;
    font-size: 14px;
    color: #c1c1c1;
}

.comment_more {
    text-align: center;
    font-size: 18px;
    margin: 10px;
    padding-top: 20px;
    border-top: #f1f1f1 1px solid;
    margin-bottom: 50px;
}
</style>

<style>
.editor-content-view {
    padding: 0 10px;
    margin-top: 20px;
    overflow-x: auto;
}

.editor-content-view p,
.editor-content-view li {
    white-space: pre-wrap;

}

.editor-content-view blockquote {
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
}

.editor-content-view code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
    border-radius: 3px;
}

.editor-content-view pre>code {
    display: block;
    padding: 10px;
}

.editor-content-view table {
    border-collapse: collapse;
}

.editor-content-view td,
.editor-content-view th {
    border: 1px solid #ccc;
    min-width: 50px;
    height: 20px;
}

.editor-content-view th {
    background-color: #f1f1f1;
}

.editor-content-view ul,
.editor-content-view ol {
    padding-left: 20px;
}

.editor-content-view input[type="checkbox"] {
    margin-right: 5px;
}
</style>