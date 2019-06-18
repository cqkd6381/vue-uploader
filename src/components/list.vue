<template>
  <div class="tasks-body">
    <slot :file-list="fileList">
      <div v-for="file in fileList" :key="file.id">
        <uploader-file :file="file" :list="true"></uploader-file>
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
  .tasks-body{width: 100%;background: #fff;max-height: 300px;overflow-y: scroll;overflow-x: hidden;}
</style>
