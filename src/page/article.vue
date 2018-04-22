<template>
  <div class="container pad_t75">
    <div class="panel">
      <div class="panel_tit">
        <div class="row">
          <h4 class="col-md-4">
            <label>
              <span>标题：</span>
              <input type="text" class="form-control panel_tit_input" v-model="article.title">
            </label>
          </h4>
          <h4 class="col-md-4 col-md-offset-4 text-right">
            <label>
              <span>天气：</span>
              <input type="text" class="form-control panel_tit_input" v-model="article.weather">
            </label>
          </h4>
        </div>
      </div>
      <div class="panel_body">
        <div class="set_form clearfix">
          <div class="tit">是否公开</div>
          <div class="inp">
            <input type="checkbox" v-model="article.status">
          </div>
        </div>
        <div class="set_form clearfix">
          <div class="tit">标签</div>
          <div class="inp">
            <select class="form-control panel_tit_input" v-model="article.tag">
              <option v-for="option in getTags" :value="option" :key="option.id">{{option}}</option>
            </select>
            <button class="btn btn-info" @click="addTag">{{tag.text}}</button>
            <input type="text" class="form-control panel_tit_input" v-model.trim="tag.newTag" v-show="tag.show" placeholder="添加标签">
          </div>
        </div>
      </div>
      <div id="editor"></div>
      <div class="panel_body text-right">
        <button class="btn btn-sm btn-info" @click="articleSub">我写完啦</button>
        <button class="btn btn-sm btn-danger" @click="$router.go(-1)">我不写了</button>
      </div>
    </div>
  </div>
</template>
<script>
  import WE from 'wangeditor'
  import { mapGetters ,mapActions } from 'vuex'

    export default {
      data () {
        return {
          article:{
            title: '',
            weather: '',
            status: true,
            tag: '',
            content: ''
          },
          tag:{
            text:'添加',
            show: false,
            newTag:''
          }
        }
      },
      computed: {
        ...mapGetters({
          getTags: 'getTags',
          getArticle: 'getArticle'
        }),
        ...mapActions({
          addArticle: 'addArticle',
          tags: 'tags',
          newTag: 'newTag'
        })
      },
      mounted () {
        this.$store.dispatch('tags')
        this.article.tag = this.getTags[0]
        const url = (process.env.NODE_ENV === 'production')
          ? 'http://'
          :'http://localhost:3000/article/upload'

        this.editor =  new WE('editor')
        this.editor.config.menus = [
          'source', '|',
          'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|',
          'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|',
          'link', 'unlink', 'table', 'img', 'insertcode', '|',
          'undo', 'redo', 'fullscreen'
        ]
        this.editor.config.menuFixed = false
        this.editor.config.uploadImgUrl = url
        this.editor.config.hideLinkImg = true
        this.editor.config.uploadHeaders = {
          'Authorization': 'Bearer ' + localStorage.getItem('user').replace(/(^\")|(\"$)/g, '')
        }
        this.editor.create()
      },
      methods:{
        addTag () {
          let tag = this.tag.newTag
          if (this.tag.show && tag && tag.length < 10) {
            this.tag.show = false
            this.tag.text = '添加'
            this.$store.dispatch('newTag', tag)
            this.article.tag = tag
            this.tag.newTag = ''
          } else {
            this.tag.show = true
            this.tag.text = '确定'
          }
        },
        articleSub () {
          this.article.content = this.editor.$txt.html()
          this.article.image = this.editor.$txt.find('img').eq(0).attr('src')
          this.article.status? this.article.status = 1 : this.article.status = 0
          this.$store.dispatch('addArticle', this.article)
        }
      },
      watch: {
        getArticle: function () {
          if (this.getArticle._id) {
            this.$router.push({ name: 'page', params: { aid: this.getArticle._id }})
          }
        }
      }
    }
</script>
