const originRequest = require("request");
const { promisify } = require("util");
const request = promisify(originRequest);
const cheerio = require("cheerio");

// 获取GitHub首页 掘金文章 B站视频链接
function getData(url) {
  return new Promise(async (resolve,reject) => {
    // 获取文档
    const { body } = await request(url);
    const $ = cheerio.load(body);
    // 获取 readme 主体内容中的 a标签
    const list = $('html>body>.application-main>div>main>div.new-discussion-timeline>div>div>div.Layout>.Layout-main #readme>div.Box-body>article').find('a'),
    articles = [],
    videos = [];
    // 将对应链接放到对应数组
    list.map((i,el) => {
      const url = $(el).attr('href')
      if(url.startsWith('https://juejin.cn/post')){
        articles.push(url)
      }else if(url.startsWith('https://www.bilibili.com/video')){
        videos.push(url)
      }
    })
    resolve({articles,videos})
  })
}
module.exports = getData;
