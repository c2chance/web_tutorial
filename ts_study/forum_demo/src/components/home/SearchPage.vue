<template>
    <div id="container">
        <div>
            <div class="post" v-for="(post, index) in posts" :key="`${index}`" v-on:click="goDetail(index)">
                <span class="avatar">
                    {{ post.author.nickname.charAt(0) }}
                </span>
                <span class="content">
                    <div class="title">
                        {{ post.title }}
                    </div>
                    <div class="summary">
                        {{ post.summary }}
                    </div>
                    <div class="time">
                        Publish Time: {{ post.publish_time }}
                    </div>
                </span>
                <div class="line"></div>
            </div>
            <div class="more" v-on:click="loadMore">{{ bottomViewText }}</div>
        </div>
    </div>
</template>

<script lang="ts">
//import { Options, Vue } from 'vue-facing-decorator'
import { Component, toNative, Vue } from 'vue-facing-decorator'
import { Post } from '../../tools/Model'
import networkPath from '../../tools/Network'
import { ElMessage } from 'element-plus'
/*
@Options({
    props: {
        keyword: String
    }
})
*/
@Component
class SearchPage extends Vue {
    keyword!: string
    posts: Post[] = []
    hasMore = true
    bottomViewText = 'click to load more'
    mounted(): void {
        this.loadPosts()
    }

    loadPosts() {
        this.axios.get(networkPath.searchPosts + '?keyword=${this.keyword}&offset=0&limit=5').then((response) => {
            this.posts = response.data.content;
            if (response.data.content.length < 5) {
                this.bottomViewText = 'You\'ve reached the bottom!'
                this.hasMore = false
            } else {
                this.bottomViewText = 'click to load more'
                this.hasMore = true
            }
        }).catch(() => {
            ElMessage.error('Network failure, please refresh the page later')
        })
    }

    loadMore() {
        if (!this.hasMore) { return }
        this.axios.get(networkPath.searchPosts + '?keyword=${this.keyword}&offset=${this.posts.length}&limit=5').then((response) => {
            this.posts.push(...response.data.content)
            console.log(this.posts)
            if (response.data.content.length < 5) {
                this.bottomViewText = 'You\'ve reached the bottom!'
                this.hasMore = false
            } else {
                this.bottomViewText = 'click to load more'
                this.hasMore = true
            }
        }).catch(() => {
            ElMessage.error('Network failure, please refresh the page later')
        })
    }
    goDetail(index: number) {
        let postId = this.posts[index].id
        this.$router.push({ name: 'detail', params: { id: postId } })
    }
}
export default toNative(SearchPage)
</script>

<style scoped>
/* ��������ʽ */
#container {
    margin: 0 auto;
    width: 950px;
    background-color: white;
    box-shadow: 5px 5px 10px #c1c1c1;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

/* ���������ʽ */
.post {
    height: 130px;
    background-color: white;
    position: relative;
}

/* ͷ����ʽ */
.avatar {
    margin-top: 15px;
    margin-left: 15px;
    width: 50px;
    height: 50px;
    background-color: azure;
    color: black;
    font-size: 30px;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    border-radius: 10px;
    position: absolute;
}

/* ���ݲ�����ʽ */
.content {
    margin-top: 0px;
    padding: 0px;
    display: inline-block;
    margin-left: 80px;
    margin-right: 80px;
    position: absolute;
}

/* ������ʽ */
.title {
    margin-top: 10px;
    width: 100%;
    font-weight: bold;
    color: #444444;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ժҪ��ʽ */
.summary {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 5px;
    font-size: 15px;
    line-height: 25px;
    color: #777777;
}

/* ʱ��ģ����ʽ */
.time {
    font-size: 14px;
    margin-top: 5px;
    color: #a1a1a1;
}

/* �ָ�����ʽ */
.line {
    background-color: #e1e1e1;
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
}

/* ���ظ��ఴť����ʽ */
.more {
    height: 50px;
    line-height: 50px;
    text-align: center;
}
</style>
