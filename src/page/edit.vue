<template>
  <div class="container pad_t75" v-show="getArticleOwn">
    <div class="panel">
      <div class="panel_tit">
        <div class="row">
          <h4 class="col-md-4">
            <label>
              <span>标题：</span>
              <input type="text" name="title" class="form-control panel_tit_input" :value="getArticle.title" @change="newArticle">
            </label>
          </h4>
          <h4 class="col-md-4 col-md-offset-4 text-right">
            <label>
              <span>天气：</span>
              <input type="text" name="weather" class="form-control panel_tit_input" :value="getArticle.weather" @change="newArticle">
            </label>
          </h4>
        </div>
      </div>
      <div class="panel_body">
        <div class="set_form clearfix">
          <div class="tit">是否公开</div>
          <div class="inp">
            <input type="checkbox" name="status" :checked="getArticle.status == 1" value="true" @change="newArticleCheckbox">
          </div>
        </div>
        <div class="set_form clearfix">
          <div class="tit">标签</div>
          <div class="inp">
            <select class="form-control panel_tit_input" name="tag" :value="getArticle.tag" @change="newArticle">
              <option v-for="option in getTags" :value="option" :key='option.id'>{{option}}</option>
            </select>
            <button class="btn btn-info" @click="addTag">{{tag.text}}</button>
            <input type="text" class="form-control panel_tit_input" v-model.trim="tag.newTag" v-show="tag.show" placeholder="添加标签">
          </div>
        </div>
      </div>
      <div id="editor" v-html="getArticle.content"></div>
      <div class="panel_body text-right">
        <button class="btn btn-sm btn-info" @click="articleSub">我改好啦</button>
        <button class="btn btn-sm btn-danger" @click="$router.go(-1)">我不改了</button>
      </div>
    </div>
  </div>
</template>

<script>
  import WE from 'wangeditor'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        // aid: this.$route.params.aid,
        tag: {
          text: '添加',
          show: false,
          newTag: ''
        },
        newArticleContent: {}
      }
    },
    props: {
      aid: ''
    },
    computed: {
      ...mapGetters({
        getTags: 'getTags',
        getArticle: 'getArticle',
        getArticleOwn: 'getArticleOwn'
      }),
      ...mapActions({
        articlePage: 'articlePage',
        editArticle: 'editArticle',
        tags: 'tags',
        newTag: 'newTag'
      })
    },
    mounted() {
      this.$store.dispatch('articlePage', this.aid)
      this.$store.dispatch('tags')

      const url = (process.env.NODE_ENV === 'production')
        ? 'http://47.106.102.59:3000/article/upload'
        :'http://localhost:3000/article/upload'

      this.editor = new WE('#editor')
      this.editor.customConfig.menus = [
        'bold', 'underline', 'italic', 'strikeThrough', 'eraser', 'foreColor', 'backColor',
        'quote', 'fontName', 'fontSize', 'head', 'list', 'justify',
        'link', 'unink', 'table', 'image', 'code', 'emoticon',
        'undo', 'redo'
      ]
      this.editor.customConfig.menuFixed = false
      this.editor.customConfig.uploadImgServer = url
      this.editor.customConfig.showLinkImg = false
      this.editor.customConfig.uploadImgHeaders = {
        'Authorization': 'Bearer ' + localStorage.getItem('user').replace(/(^\")|(\"$)/g, '')
      }
      this.editor.create()

    },
    methods:{
      newArticle (e) {
        this.newArticleContent[e.target.name] = e.target.value
      },
      newArticleCheckbox (e) {
        this.newArticleContent[e.target.name] = e.target.checked
      },

      addTag(){
        var tag = this.tag.newTag
        if (this.tag.show && tag && tag.length < 10) {
          this.tag.show = false
          this.tag.text = '添加'
          this.$store.dispatch('newTag', tag)
          this.tag.newTag = ''
        } else {
          this.tag.show = true
          this.tag.text = '确定'
        }
      },
      articleSub () {
        this.newArticleContent.aid = this.aid
        this.newArticleContent.content = this.editor.txt.html()
        // if(this.newArticleContent.status === false) this.newArticleContent.status = 0
        // if(this.newArticleContent.status === true) this.newArticleContent.status = 1
        this.newArticleContent.status = this.newArticleContent.status ? 1 : 0
        this.newArticleContent.image = this.editor.$textElem.find('img')[0] && this.editor.$textElem.find('img')[0].src
        this.$store.dispatch('editArticle', this.newArticleContent)
      }
    },
    watch:{
      getArticle () {
        if (!this.getArticleOwn) this.$router.go(-1)
      }
    }
  }

</script>
