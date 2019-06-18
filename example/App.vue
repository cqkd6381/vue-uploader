<template>
  <uploader :options="options" :file-status-text="statusText" ref="uploader" @file-complete="fileComplete" @complete="complete"></uploader>
</template>

<script>
  export default {
    data () {
      return {
        options: {
          target: '//localhost:3000/upload', // '//jsonplaceholder.typicode.com/posts/',
          testChunks: false
        },
        attrs: {
          accept: 'image/*'
        },
        statusText: {
          success: '成功了',
          error: '出错了',
          uploading: '上传中',
          paused: '暂停中',
          waiting: '等待中'
        }
      }
    },
    methods: {
      complete () {
        console.log('complete', arguments)
      },
      fileComplete () {
        console.log('file complete', arguments)
      }
    },
    mounted () {
      this.$nextTick(() => {
        window.uploader = this.$refs.uploader.uploader
      })
    }
  }
</script>

<style>
</style>
