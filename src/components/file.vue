<template>
  <div class="tasks-item" :status="status">
    <slot
      :file="file"
      :list="list"
      :status="status"
      :paused="paused"
      :error="error"
      :response="response"
      :average-speed="averageSpeed"
      :formated-average-speed="formatedAverageSpeed"
      :current-speed="currentSpeed"
      :is-complete="isComplete"
      :is-uploading="isUploading"
      :size="size"
      :formated-size="formatedSize"
      :uploaded-size="uploadedSize"
      :progress="progress"
      :progress-style="progressStyle"
      :progressing-class="progressingClass"
      :time-remaining="timeRemaining"
      :formated-time-remaining="formatedTimeRemaining"
      :type="type"
      :extension="extension"
      :file-category="fileCategory"
      :file-icon="fileIcon"
      >
      <div class="item-icon">
        <svg aria-hidden="true" class="icon">
          <use :xlink:href="'#icon-'+fileIcon"></use>
        </svg>
      </div>
      <div class="item-info">
        <h6 :title="file.name">
          {{file.name}}
        </h6>
        <p :title="file.father">
          {{file.father ? file.father : '正在获取上传地址...'}}
        </p>
      </div>
      <div class="item-bit">
        {{formatedSize}}
      </div>
      <div class="item-speed">
        <span v-show="status !== 'uploading'" :id="'unique-id1-'+file.id">{{statusText}}</span>
        <span v-show="status === 'uploading'">{{formatedAverageSpeed}}</span>
      </div>
      <div class="item-status">
        <a class="start act" v-show="status === 'uploading'" @click="pause" title="暂停">
          <i class="iconfont icon-status-start"></i>
        </a>
        <a class="start" :class="{ 'pauseDisabled': !showPaused }" v-show="status === 'paused'" @click="resume" title="开始">
          <i class="iconfont  icon-status-start"></i>
        </a>
        <a class="again" v-show="status === 'error'" @click="retry" title="重试">
          <i class="iconfont icon-status-again"></i>
        </a>
        <a style="color: #00c15c;" v-show="status === 'success'">
          <i class="iconfont icon-status-processing" :id="'unique-id2-'+file.id"></i>
        </a>
        <a class="delete" v-show="status != 'success'" @click="remove" title="删除">
          <i class="iconfont icon-status-fail"></i>
        </a>
      </div>
      <div class="progress" :style="progressStyle"></div>
    </slot>
  </div>
</template>

<script>
  import Uploader from 'cqkd-upload.js'
  import events from '../common/file-events'
  import { secondsToStr } from '../common/utils'

  const COMPONENT_NAME = 'uploader-file'
  const fileExts = [
    {ext: 'pdf', icon: 'pdf'}, {ext: 'txt', icon: 'txt'}, {ext: 'umd', icon: 'umd'}, {ext: 'xls', icon: 'xls'}, {ext: 'doc', icon: 'doc'}, {ext: 'ppt', icon: 'ppt'}, {ext: 'docx', icon: 'docx'}, {ext: 'pptx', icon: 'pptx'}, {ext: 'xlsx', icon: 'xlsx'}, {ext: 'wps', icon: 'wps'}, {ext: 'html', icon: 'html'}, {ext: 'hlp', icon: 'hlp'},
    {ext: 'bmp', icon: 'bmp'}, {ext: 'jpg', icon: 'jpg'}, {ext: 'jpeg', icon: 'jpeg'}, {ext: 'png', icon: 'png'}, {ext: 'tif', icon: 'tif'}, {ext: 'gif', icon: 'gif'}, {ext: 'pcx', icon: 'pcx'}, {ext: 'tga', icon: 'tga'}, {ext: 'exif', icon: 'exif'}, {ext: 'fpx', icon: 'fpx'}, {ext: 'svg', icon: 'svg'}, {ext: 'psd', icon: 'psd'}, {ext: 'cdr', icon: 'cdr'}, {ext: 'pcd', icon: 'pcd'}, {ext: 'dxf', icon: 'dxf'}, {ext: 'ufo', icon: 'ufo'}, {ext: 'eps', icon: 'eps'}, {ext: 'ai', icon: 'ai'}, {ext: 'raw', icon: 'raw'}, {ext: 'webp', icon: 'webp'},
    {ext: 'mp3', icon: 'mp'}, {ext: 'wave', icon: 'wave'}, {ext: 'ape', icon: 'ape'}, {ext: 'flac', icon: 'flac'}, {ext: 'acc', icon: 'acc'}, {ext: 'wma', icon: 'wma'}, {ext: 'ra', icon: 'ra'}, {ext: 'mid', icon: 'mid'}, {ext: 'amr', icon: 'amr'},
    {ext: 'mpeg', icon: 'mpeg'}, {ext: 'avi', icon: 'avi'}, {ext: 'mov', icon: 'mov'}, {ext: 'asf', icon: 'asf'}, {ext: 'wmv', icon: 'wmv'}, {ext: '3gp', icon: 'gp'}, {ext: 'rmvb', icon: 'rmvb'}, {ext: 'flv', icon: 'flv'}, {ext: 'mkv', icon: 'mkv'}, {ext: 'dat', icon: 'dat'}, {ext: 'mp4', icon: 'mp1'}, {ext: 'rm', icon: 'rm'}, {ext: 'swf', icon: 'swf'},
    {ext: 'zip', icon: 'zip'}, {ext: 'rar', icon: 'rar'}, {ext: 'ios', icon: 'ios'}, {ext: 'arj', icon: 'arj'}, {ext: 'int', icon: 'int'}, {ext: 'sys', icon: 'sys'}, {ext: 'dll', icon: 'dll'}, {ext: 'adt', icon: 'adt'}, {ext: 'exe', icon: 'exe'}, {ext: 'com', icon: 'com'}, {ext: 'c', icon: 'c'}, {ext: 'asm', icon: 'asm'}, {ext: 'for', icon: 'for'}, {ext: 'lib', icon: 'lib'}, {ext: 'lst', icon: 'lst'}, {ext: 'msg', icon: 'msg'}, {ext: 'obj', icon: 'obj'}, {ext: 'pas', icon: 'pas'}, {ext: 'wki', icon: 'wki'}, {ext: 'bas', icon: 'bas'}, {ext: 'bak', icon: 'bak'}, {ext: 'tmp', icon: 'tmp'}, {ext: 'bat', icon: 'bat'}, {ext: 'cmd', icon: 'cmd'}, {ext: 'jar', icon: 'jar'}, {ext: '7z', icon: '7z'}, {ext: 'tar', icon: 'tar'}, {ext: 'gzip', icon: 'gzip'}
  ]
  export default {
    name: COMPONENT_NAME,
    props: {
      file: {
        type: Object,
        default () {
          return {}
        }
      },
      list: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        paramslist: [],
        showPaused: false,
        response: null,
        paused: false,
        error: false,
        averageSpeed: 0,
        currentSpeed: 0,
        isComplete: false,
        isUploading: false,
        size: 0,
        formatedSize: '',
        uploadedSize: 0,
        progress: 0,
        timeRemaining: 0,
        type: '',
        extension: '',
        progressingClass: ''
      }
    },
    computed: {
      fileCategory () {
        const extension = this.extension
        const isFolder = this.file.isFolder
        let type = isFolder ? 'folder' : 'unknow'
        const categoryMap = this.file.uploader.opts.categoryMap
        const typeMap = categoryMap || {
          image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
          video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
          audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
          document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
        }
        Object.keys(typeMap).forEach((_type) => {
          const extensions = typeMap[_type]
          if (extensions.indexOf(extension) > -1) {
            type = _type
          }
        })
        return type
      },
      fileIcon () {
        let type = this.file.isFolder ? 'folder' : 'unknow'
        if (this.file.isFolder) {
          return 'folder'
        }
        type = fileExts.find(item => item.ext === this.extension.toLowerCase())
        if (type) {
          return type.icon
        } else {
          return 'unknow'
        }
      },
      progressStyle2 () {
        const progress = Math.floor(this.progress * 100)
        const style = `translateX(${Math.floor(progress - 100)}%)`
        return {
          progress: `${progress}%`,
          webkitTransform: style,
          mozTransform: style,
          msTransform: style,
          transform: style
        }
      },
      progressStyle () {
        const progress = Math.floor(this.progress * 100)
        const style = progress + '%'
        return {
          width: style
        }
      },
      formatedAverageSpeed () {
        return `${Uploader.utils.formatSize(this.averageSpeed)} / S`
      },
      status () {
        const isUploading = this.isUploading
        const isComplete = this.isComplete
        const isError = this.error
        const paused = this.paused
        if (isComplete) {
          return 'success'
        } else if (isError) {
          return 'error'
        } else if (isUploading) {
          return 'uploading'
        } else if (paused) {
          return 'paused'
        } else {
          return 'waiting'
        }
      },
      statusText () {
        const status = this.status
        const fileStatusText = this.file.uploader.fileStatusText
        let txt = status
        if (typeof fileStatusText === 'function') {
          txt = fileStatusText(status, this.response)
        } else {
          txt = fileStatusText[status]
        }
        return txt || status
      },
      formatedTimeRemaining () {
        const timeRemaining = this.timeRemaining
        const file = this.file
        if (timeRemaining === Number.POSITIVE_INFINITY || timeRemaining === 0) {
          return ''
        }
        let parsedTimeRemaining = secondsToStr(timeRemaining)
        const parseTimeRemaining = file.uploader.opts.parseTimeRemaining
        if (parseTimeRemaining) {
          parsedTimeRemaining = parseTimeRemaining(timeRemaining, parsedTimeRemaining)
        }
        return parsedTimeRemaining
      }
    },
    watch: {
      status (newStatus, oldStatus) {
        if (oldStatus && newStatus === 'uploading' && oldStatus !== 'uploading') {
          this.showPaused = true
          this.tid = setTimeout(() => {
            this.progressingClass = 'uploader-file-progressing'
          }, 200)
        } else {
          clearTimeout(this.tid)
          this.progressingClass = ''
        }
      }
    },
    methods: {
      _actionCheck () {
        this.showPaused = true
        this.paused = this.file.paused
        this.error = this.file.error
        this.isUploading = this.file.isUploading()
      },
      _actionFileList (file) {
        let that = this
        if (file.isFolder) {
          file.fileList.map(file => {
            that._actionFileList(file)
          })
        } else {
          if (file.pendedChunks.length) {
            let uploadToken = file.upload_token
            // console.log(uploadToken)
            let chunks = file.pendedChunks.map(chunkOffset => {
              return {
                'upload_token': uploadToken,
                'cloud_file_key_num': chunkOffset
              }
            })
            this.paramslist = this.paramslist.concat(chunks)
          }
        }
      },
      pause () {
        this.file.pause()
        this._actionCheck()
        this._fileProgress()
      },
      resume () {
        this.showPaused = false
        this.paramslist = []
        // console.log(this.file)
        this._actionFileList(this.file)
        // console.log(this.paramslist)
        if (this.file.storage === 'openstack' && this.paramslist.length) {
          let xhr = new XMLHttpRequest()
          xhr.addEventListener('loadend', this.resume2, false)
          xhr.open('post', this.file.uploader.opts.removeChunkLink, true)
          xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
          xhr.setRequestHeader('X-auth-token', this.file.uploader.opts.headers['X-auth-token'])
          let data = {
            'paramslist': this.paramslist
          }
          xhr.send(JSON.stringify(data))
        } else {
          this.resume2()
        }
      },
      resume2 () {
        this.file.resume()
        this._actionCheck()
      },
      remove () {
        this.file.cancel()
      },
      retry () {
        this.file.retry()
        this._actionCheck()
      },
      processResponse (message) {
        let res = message
        try {
          res = JSON.parse(message)
        } catch (e) {}
        this.response = res
      },
      fileEventsHandler (event, args) {
        const rootFile = args[0]
        const file = args[1]
        const target = this.list ? rootFile : file
        if (this.file === target) {
          if (this.list && event === 'fileSuccess') {
            this.processResponse(args[2])
            return
          }
          this[`_${event}`].apply(this, args)
        }
      },
      _fileProgress () {
        this.progress = this.file.progress()
        this.averageSpeed = this.file.averageSpeed
        this.currentSpeed = this.file.currentSpeed
        this.timeRemaining = this.file.timeRemaining()
        this.uploadedSize = this.file.sizeUploaded()
        this._actionCheck()
      },
      _fileSuccess (rootFile, file, message) {
        if (rootFile) {
          this.processResponse(message)
        }
        this._fileProgress()
        this.error = false
        this.isComplete = true
        this.isUploading = false
      },
      _fileComplete () {
        this._fileSuccess()
      },
      _fileError (rootFile, file, message) {
        this._fileProgress()
        this.processResponse(message)
        this.error = true
        this.isComplete = false
        this.isUploading = false
      },
      _fileRetry (rootFile, file, message) {
        // this._fileProgress()
      }
    },
    mounted () {
      const staticProps = ['paused', 'error', 'averageSpeed', 'currentSpeed']
      const fnProps = [
        'isComplete',
        'isUploading',
        {
          key: 'size',
          fn: 'getSize'
        },
        {
          key: 'formatedSize',
          fn: 'getFormatSize'
        },
        {
          key: 'uploadedSize',
          fn: 'sizeUploaded'
        },
        'progress',
        'timeRemaining',
        {
          key: 'type',
          fn: 'getType'
        },
        {
          key: 'extension',
          fn: 'getExtension'
        }
      ]
      staticProps.forEach(prop => {
        this[prop] = this.file[prop]
      })
      fnProps.forEach((fnProp) => {
        if (typeof fnProp === 'string') {
          this[fnProp] = this.file[fnProp]()
        } else {
          this[fnProp.key] = this.file[fnProp.fn]()
        }
      })

      const handlers = this._handlers = {}
      const eventHandler = (event) => {
        handlers[event] = (...args) => {
          this.fileEventsHandler(event, args)
        }
        return handlers[event]
      }
      events.forEach((event) => {
        this.file.uploader.on(event, eventHandler(event))
      })
    },
    destroyed () {
      events.forEach((event) => {
        this.file.uploader.off(event, this._handlers[event])
      })
      this._handlers = null
    }
  }
</script>

<style>
  .tasks-item{width: 100%;height: 60px;padding:15px 20px;border-bottom: #eee solid 1px;position: relative;background: #fff;}
  .tasks-item .progress{height:59px;position: absolute;bottom:-20px;background-color:rgba(150,208,150,.3);box-shadow: none; left: 0;border-radius: 0;z-index:1;}
  .tasks-item[status="error"] .progress{background-color: rgba(255,0,0,.1);}
  .tasks-item:last-child{border-bottom: none;}
  .tasks-item .item-icon{width: 30px;height: 30px;position: absolute;left: 20px;z-index:2}
  .tasks-item .item-icon .icon{width: 30px;height: 30px;}
  .tasks-item .item-info{padding-left: 40px;font-size: 12px;width:235px;float: left;z-index:2}
  .tasks-item .item-info h6,.tasks-item .item-info p{text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
  .tasks-item .item-info p{color: #999; margin-top: 5px;}
  .tasks-item .item-status{width: 50px;height: 30px;text-align: center;line-height: 30px;position: absolute;right: 20px;top: 15px;text-align: right;z-index:2}
  .tasks-item .item-status a{width:25px;height: 30px;display:inline-block; margin: 0 -1.5px;}
  .tasks-item .item-status .start{color: #00c15c;}
  .tasks-item .item-status .delete{color: #aaa;}
  .tasks-item .item-status .again{color: #aaa;}
  .tasks-item .item-status .again:hover{ color: #006adf;}
  .tasks-item .item-bit,.tasks-item .item-speed{width: 90px;float: left;font-size: 12px; line-height: 30px; text-align: center; z-index:2}
  .tasks-item .item-status .start.act{color: #006adf;}
  .tasks-item .item-status .start.act .icon-status-start:before{content:"\e743";}
  .tasks-item .item-status .delete:hover{color: #f00;}
  p, h6 {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .pauseDisabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
</style>
