<template>
    Home
    <div id="container">
        <el-menu mode="horizontal" @select="selectedItem" default-active="0">
            <el-menu-item v-for="(item, index) in categoryData" :index="`${index}`" :key="index">{{ item.label
                }}</el-menu-item>
        </el-menu>

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
                        Publish time: {{ post.publish_time }}
                    </div>
                </span>
                <div class="line"></div>
            </div>
            <div class="more" v-on:click="loadMore">{{ bottomViewText }}</div>
        </div>
    </div>
    <div class="publish">
        <el-button type="primary" style="width: 50px;height:50px;font-size:30px;" icon="Edit" circle
            v-on:click="publishPost" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { CategoryModel, Post } from '../../tools/Model'
import networkPath from '../../tools/Network'
import { ElMessage, ElMessageBox } from 'element-plus'
//@Options({})
@Component
class Home extends Vue {
    categoryData: CategoryModel[] = []
    posts: Post[] = []
    selectedCategoryId = 0
    hasMore = true
    bottomViewText = 'Click to load more'
    mounted(): void {
        this.loadDataCategories()
    }
    loadDataCategories(): void {
        this.axios.get(networkPath.categories).then((response) => {
            this.categoryData = response.data.content;
            this.selectedCategoryId = this.categoryData[0].id;
            this.loadPosts()
        }).catch(() => {
            ElMessage.error('Network failed, please refresh the page later.')
        })
    }

    loadPosts() {
        this.axios.get(networkPath.posts + `?category_id=${this.selectedCategoryId}&offset=0&limit=5`).then((response) => {
            this.posts = response.data.content;
            if (response.data.content.length < 5) {
                this.bottomViewText = "You've reached the bottom!"
                this.hasMore = false
            } else {
                this.bottomViewText = "Click to load more"
                this.hasMore = true
            }
        }).catch(() => {
            ElMessage.error('Network failed, please refresh the page later.')
        })
    }
    loadMore() {
        if (!this.hasMore) return;
        this.axios.get(networkPath.posts + `?category_id=${this.selectedCategoryId}&offset=${this.posts.length}&limit=5`).then((response) => {
            this.posts.push(...response.data.content)
            console.log(this.posts)
            if (response.data.content.length < 5) {
                this.bottomViewText = "You've reached the bottom!"
                this.hasMore = false;
            } else {
                this.bottomViewText = "Click to load more ..."
                this.hasMore = true
            }
        }).catch(() => {
            ElMessage.error('Network failed, refresh the page later')
        })
    }
    selectedItem(index: number) {
        this.selectedCategoryId = this.categoryData[index].id;
        console.log(this.selectedCategoryId);
        this.loadPosts();
    }

    publishPost() {
        ElMessageBox.confirm(`Confirm posting a new topic under the current section.`).then(() => {
            this.$router.push({ name: "publish", params: { category_id: this.selectedCategoryId } })
        }).catch(() => {
            console.log('Cancel post')
        })
    }
    goDetail(index: number) {
        let postId = this.posts[index].id;
        this.$router.push({ name: 'detail', params: { id: postId } })
    }
}
export default toNative(Home)

</script>
<style scoped>
#container {
    margin: 0 auto;
    width: 950px;
    background-color: white;
    box-shadow: 5px 5px 10px #c1c1c1;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}


.post {
    height: 130px;
    background-color: white;
    position: relative;
}


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


.content {
    margin-top: 0px;
    padding: 0px;
    display: inline-block;
    margin-left: 80px;
    margin-right: 80px;
    position: absolute;
}


.title {
    margin-top: 10px;
    width: 100%;
    font-weight: bold;
    color: #444444;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
}


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


.time {
    font-size: 14px;
    margin-top: 5px;
    color: #a1a1a1;
}


.line {
    background-color: #e1e1e1;
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
}


.more {
    height: 50px;
    line-height: 50px;
    text-align: center;
}


.publish {
    position: fixed;
    right: 100px;
    top: 110px;
}
</style>
