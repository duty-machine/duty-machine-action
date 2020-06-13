### 这是什么？

这是一个使用issue为网路上的文章存档的github action，可以将文章转为issue进行持久保存。配置了此action的仓库，在新建issue的时候会触发抓取，文章内容会被跟评在新建的issue下方。

抓取的样例可见：https://github.com/duty-machine/duty-machine/issues?q=label%3Afetched+is%3Aclosed 。

我们同时提供了一个[示例仓库](https://github.com/duty-machine/duty-machine)做公开的备份服务，并配置了一个[在线提交入口](https://archives.duty-machine.now.sh/)供大众免登陆使用。

### 这个action支持什么网站？

目前已进行适配的网站请见：https://github.com/duty-machine/duty-machine-action/tree/master/websites 。

### 如何配置？

1. 新建一个代码仓库，这个仓库将用来存放抓取到的文件，可以是私有仓库。
2. 在`Actions`标签页里Setup一个workflow，选择Simple workflow或者任意一个都可以。
3. 将编辑器里的内容替换成 https://github.com/duty-machine/duty-machine-action/blob/master/sample_workflow.yml 的内容，然后保存。

### 如何使用？

在代码仓库中新建一个issue，在标题或正文中写入要抓取的文章链接，提交即可触发抓取。一般需要一分钟，抓取的过程可以在`Actions`标签页下看到。

### 开发

添加抓取的配置，可以在websites文件夹新建一个文件，文件名将会作为之后引用的网站名。网站配置文件的格式为：
```
{
  test: (string) => boolean, // 给定一个网址，用来检测属不属于当前配置的网站
  process: (string) => { // 给定一个网址，抓取文章内容，返回值应为一个对象
    title: string,
    author: string || null,
    dom: HTMLElement, // 代表文章内容的jsdom对象
    date: string || null // 文章在原网站上的日期
  }
  samples: Array<string> // 示例网址的链接
}
```

测试用命令：
```bash
npm run test-website weixin # 使用website配置里的samples进行抓取测试
npm run determine-website https://mp.weixin.qq.com/s # 确定一个url使用的website
```
