'use strict';

const Controller = require('egg').Controller;
const getData = require('../utils/spider/github')
class SpiderController extends Controller {
  async spider_github(){
    const {ctx} = this;
    // 获取GitHub url
    const url = ctx.request.body.url;
    if(url){
      // 爬取 掘金文章 B站视频链接
      let {articles,videos} = await getData(url);
      // 数据处理
      for(let i = 0;i<articles.length;i++){
        articles[i] = {url:articles[i]}
      }
      // 数据处理
      for(let i = 0;i<videos.length;i++){
        videos[i] = {url:videos[i]}
      }
      // 返回结果
      ctx.body = {
        header: {
          code: 0,
          message: 'ok',
        },
        body:{
          username:url.split('/')[3],
          articles,
          videos
        }
      }
    }else{
      ctx.body = {
        header: {
          code: -1,
          message: 'github 首页地址不能为空',
        }
      }
    }

  }
}

module.exports = SpiderController;
