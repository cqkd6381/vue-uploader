<template>
  <div class="tasks">
    <slot :file-list="fileList">
      <div class="tasks-header">
        <div class="title">
          1个文件正在上传
        </div>
        <div class="operation">
          <a class="open" href="#">
            <i class="ti-angle-down"></i>
          </a>
          <a class="close" href="#">
            <i class="iconfont icon-close"></i>
          </a>
        </div>
      </div>

      <div class="tasks-body">
        <div class="tasks-item v-for="file in fileList" :key="file.id">
          <uploader-file :file="file" :list="true"></uploader-file>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
  import { uploaderMixin } from '../common/mixins'
  import UploaderFile from './file.vue'

  const COMPONENT_NAME = 'uploader-list'

  export default {
    name: COMPONENT_NAME,
    mixins: [uploaderMixin],
    computed: {
      fileList () {
        return this.uploader.fileList
      }
    },
    components: {
      UploaderFile
    }
  }
</script>

<style>
  @media (min-width: 768px) {
    .tasks{width: 500px;position: fixed;right: 20px;bottom: 20px;box-shadow: rgba(0,0,0,.1) 0 2px 10px;}
  }
  @media (max-width: 768px) {
    .tasks{width:calc(100% - 20px);position: fixed;left: 10px; right: 10px;bottom: 10px;box-shadow: 0 3px 9px rgba(0,0,0,.2);}
  }
  .tasks-header{width: 100%;height: 50px; padding:10px 20px;background: #fff;background: #f1f1f1;line-height: 30px;}
  .tasks-header .title{font-size: 18px;float: left;}
  .tasks-header .operation{float: right;}
  .tasks-header .operation i{width: 30px;height: 30px;display:block;text-align: center;line-height: 30px;font-size: 14px;font-weight: bold; }
  .tasks-header .operation a{width: 30px;height: 30px;display: block; margin-left: 10px;float: left;}
  .tasks-header .operation a:hover{background: #eee;}
  .tasks-header .operation .act i{-webkit-transform: rotate(180deg);transform: rotate(180deg);}}
  .tasks-body{width: 100%;background: #fff;}
  .tasks-item{width: 100%;height: 70px;padding:20px 20px;border-bottom: #eee solid 1px;position: relative;background: #fff;}
</style>
