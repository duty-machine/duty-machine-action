### 这是什么？

这是一个使用issue为网路上的文章存档的github action，可以将文章转为issue进行持久保存。配置了此action的仓库，在新建issue的时候会触发抓取，文章内容会被跟评在新建的issue下方。

抓取的样例可见：https://github.com/duty-machine/duty-machine/issues?q=label%3Afetched+is%3Aclosed 。

### 这个action支持什么网站？

目前已进行适配的网站：
* matters.news
* telegra.ph
* chinadigitaltimes.net
* mp.weixin.qq.com

### 如何配置？

1. 新建一个代码仓库，这个仓库将用来存放抓取到的文件，可以是私有仓库。
2. 在`Actions`标签页里Setup一个workflow，选择Simple workflow或者任意一个都可以。
3. 将编辑器里的内容替换成 https://github.com/duty-machine/duty-machine-action/blob/master/sample_workflow.yml 的内容，然后保存。

### 如何使用？

在代码仓库中新建一个issue，在标题或正文中写入要抓取的微信文章链接，提交即可触发抓取。一般需要一分钟，抓取的过程可以在`Actions`标签页下看到。
