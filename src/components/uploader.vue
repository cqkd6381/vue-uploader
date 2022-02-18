<template>
  <div class="tasks">
    <slot :files="files" :file-list="fileList" :started="started">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </slot>
  </div>
</template>

<script>
  import Uploader from 'cqkd-upload.js'
  import { kebabCase } from '../common/utils'
  import UploaderBtn from './btn.vue'
  import UploaderDrop from './drop.vue'
  import UploaderUnsupport from './unsupport.vue'
  import UploaderList from './list.vue'
  import UploaderFiles from './files.vue'
  import UploaderFile from './file.vue'
  const COMPONENT_NAME = 'uploader'
  const FILE_ADDED_EVENT = 'fileAdded'
  const FILES_ADDED_EVENT = 'filesAdded'
  const UPLOAD_START_EVENT = 'uploadStart'
  export default {
    name: COMPONENT_NAME,
    provide () {
      return {
        uploader: this
      }
    },
    props: {
      options: {
        type: Object,
        default () {
          return {}
        }
      },
      autoStart: {
        type: Boolean,
        default: true
      },
      fileStatusText: {
        type: [Object, Function],
        default () {
          return {
            success: 'success',
            error: 'error',
            uploading: 'uploading',
            paused: 'paused',
            waiting: 'waiting'
          }
        }
      }
    },
    data () {
      return {
        started: false,
        files: [],
        fileList: []
      }
    },
    methods: {
      uploadStart () {
        this.showTask = true
        this.started = true
      },
      fileAdded (file) {
        this.numbers += 1
        this.$emit(kebabCase(FILE_ADDED_EVENT), file)
        if (file.ignored) {
          // is ignored, filter it
          return false
        }
      },
      filesAdded (files, fileList) {
        this.$emit(kebabCase(FILES_ADDED_EVENT), files, fileList)
        if (files.ignored || fileList.ignored) {
          // is ignored, filter it
          return false
        }
      },
      fileSuccess (file) {
        this.numbers -= 1
      },
      fileRemoved (file) {
        this.files = this.uploader.files
        this.fileList = this.uploader.fileList
      },
      filesSubmitted (files, fileList) {
        this.files = this.uploader.files
        this.fileList = this.uploader.fileList
        if (this.autoStart) {
          this.uploader.upload()
        }
      },
      allEvent (...args) {
        const name = args[0]
        const EVENTSMAP = {
          [FILE_ADDED_EVENT]: true,
          [FILES_ADDED_EVENT]: true,
          [UPLOAD_START_EVENT]: 'uploadStart'
        }
        const handler = EVENTSMAP[name]
        if (handler) {
          if (handler === true) {
            return
          }
          this[handler].apply(this, args.slice(1))
        }
        args[0] = kebabCase(name)
        this.$emit.apply(this, args)
      }
    },
    created () {
      this.options.initialPaused = !this.autoStart
      const uploader = new Uploader(this.options)
      this.uploader = uploader
      this.uploader.fileStatusText = this.fileStatusText
      uploader.on('catchAll', this.allEvent)
      uploader.on(FILE_ADDED_EVENT, this.fileAdded)
      uploader.on(FILES_ADDED_EVENT, this.filesAdded)
      uploader.on('fileRemoved', this.fileRemoved)
      uploader.on('filesSubmitted', this.filesSubmitted)
    },
    destroyed () {
      const uploader = this.uploader
      uploader.off('catchAll', this.allEvent)
      uploader.off(FILE_ADDED_EVENT, this.fileAdded)
      uploader.off(FILES_ADDED_EVENT, this.filesAdded)
      uploader.off('fileRemoved', this.fileRemoved)
      uploader.off('filesSubmitted', this.filesSubmitted)
      this.uploader = null
    },
    components: {
      UploaderBtn,
      UploaderDrop,
      UploaderUnsupport,
      UploaderList,
      UploaderFiles,
      UploaderFile
    }
  }
</script>

<style>
  .close {
    opacity: .5;
  }
  .close:hover, .close:focus {
    opacity: 1;
  }
  a {
    color: #383838;
    text-decoration: none;
  }
  a:hover, a:focus {
    text-decoration: none;
    color: #006ADF;
    outline: none;
  }
  @media (min-width: 768px) {
    .tasks{width: 500px;box-shadow: rgba(0,0,0,.1) 0 2px 10px;}
  }
  @media (max-width: 768px) {
    .tasks{width:calc(100% - 20px);box-shadow: 0 3px 9px rgba(0,0,0,.2);}
  }
  .tasks-header{width: 100%;height: 50px; padding:10px 20px;background: #fff;background: #f1f1f1;line-height: 30px;}
  .tasks-header .title{font-size: 18px;float: left;}
  .tasks-header .operation{float: right;}
  .tasks-header .operation i{width: 30px;height: 30px;display:block;text-align: center;line-height: 30px;font-size: 14px;font-weight: bold; }
  .tasks-header .operation a{width: 30px;height: 30px;display: block; margin-left: 10px;float: left;}
  .tasks-header .operation a:hover{background: #eee;}
  .tasks-header .operation .act i{-webkit-transform: rotate(180deg);transform: rotate(180deg);}
</style>