<template>
  <div class="home pt_20 pl_20">
    <!-- 表单 -->
    <el-form
      ref="form"
      :model="params"
      :rules="rules"
      label-width="100px"
      class="form flex flex_align_center"
    >
      <el-form-item label="github地址" prop="url">
        <el-input v-model="params.url"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit" :loading="loading"
        >查询</el-button
      >
    </el-form>
    <!-- 概览信息 -->
    <p class="infos pt_20">
      <span>用 户 名: <span class="c_green">
        {{data.username}}
      </span>
       </span>
      <span>文章数量：<span class="c_green">
        {{data.articles.length}}
      </span>
       </span>
      <span>视频数量：<span class="c_green">
        {{data.videos.length}}
      </span>
       </span>
      <span>得 分:
        <span class="c_green fontsize_20">
          {{data.score}}
        </span>
        </span>
      <p class="pl_20 pt_20 c_666">说明：每篇文章5分，每个视频10分</p>
    </p>
    <!-- 文章列表 -->
    <el-table
    class="mt_20"
      v-if="data.articles.length"
      stripe border
      :data="data.articles"
      style="width: 100%"
      max-height="400"
    >
      <el-table-column fixed label="文章地址">
        <template #default="scope">
          <a target="_blank" :href="scope.row.url">{{scope.row.url}}</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 视频列表 -->
    <el-table
    class="mt_20"
      v-if="data.videos.length"
      stripe border
      :data="data.videos"
      style="width: 100%"
      max-height="400"
    >
      <el-table-column fixed prop="url" label="视频地址">
        <template #default="scope">
          <a target="_blank" :href="scope.row.url">{{scope.row.url}}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { github } from "@/api/spider";
import {ElMessage} from 'element-plus'
export default defineComponent({
  name: "HomePage",
  setup() {
    // 表单
    const form: any = ref(null);
    // 请求参数
    const params = reactive({
      params: {
        url: "",
      },
    });
    // 表单校验规则
    const rules = reactive({
      rules: {
        url: [
          {
            required: true,
            message: "请输入要查询GitHub项目的首页地址",
            trigger: "blur",
          },
        ],
      },
    });
    // 提交按钮loading
    const loading = ref(false);
    // 页面数据
    const data = reactive({
      // 用户名
      username:"",
      // 总分
      score:0,
      // 文章列表
      articles:[],
      // 视频列表
      videos:[]
    })
    // 获取GitHub首页链接数据
    function submit() {
      form.value.validate((valid: boolean) => {
        if (valid) {
          loading.value = true;
          github(params.params).then((res:any) => {
            loading.value = false;
            data.username = res.body.username
            data.articles = res.body.articles
            data.videos = res.body.videos
            calc();
          }).catch((err:{message:string}) => {
            ElMessage.error(err.message)
            loading.value = false;
          });
        } else {
          return false;
        }
      });
    }
    // 计算总分
    function calc(){
      data.score = data.articles.length*5+data.videos.length*10
    }
    return {
      form,
      ...toRefs(params),
      ...toRefs(rules),
      loading,
      data,
      submit,
    };
  },
});
</script>
<style lang="scss" scoped>
.home {
  .infos{
    >span{margin-left: 20px;}
  }
  .form {
    width: 500px;
    .el-form-item {
      margin-bottom: 0;
      .el-input {
        width: 500px;
        margin-right: 10px;
      }
    }
  }
}
</style>
