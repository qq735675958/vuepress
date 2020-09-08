
module.exports = {
    title: '个人文档',
    description: '欢迎来到我的博客',
    base: '/vuepressBlog/', // 项目根路径
    // head 标签中的额外内容
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }] // 这个是标签页 logo
    ],
    serviceWorker: true,
    // 语言配置
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
        }
    },
    // 主题配置
    themeConfig: {
        lastUpdated: 'Last Updated',
        // 顶部导航
        nav: [
            { text: '归档', link: '/archives/' },
            { text: '分类', link: '/categories/',
                items: [
                    { text: 'Node.js', link: '/language/chinese/' },
                    { text: 'js', link: '/language/js/' },
                    { text: 'react', link: '/react/' },
                    { text: 'python', link: '/language/python/' },
                    { text: 'Nodejs', link: '/language/eggjs/' },
                    { text: 'webpack', link: '/language/webpack/' },
                    { text: 'nginx', link: '/nginx/' },
                    { text: 'docker', link: '/language/docker/' },
                ]
            },
            { text: 'js代码片段', link: '/function/' },
            { text: '关于我', link: '/about/' }
        ],
        // 侧边栏
        sidebar: {
            '/nginx/':[
                {
                    title: "Nginx 配置",
                    collapsable: true,
                    children: [
                        { title: "起步", path: "/nginx/" },
                    ]
                }
            ]
        },
        sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
        displayAllHeaders: false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
        activeHeaderLinks: false, // 默认值：true 滚动时通过 hash 高亮侧边栏标题
        // Git 仓库和编辑链接
        repo: 'https://github.com/qq735675958', // 你的仓库
        repoLabel: 'GitHub', // 导航栏上的文本
        // editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '编辑此页面',
        themeConfig: {
            lastUpdated: 'Last Updated', // string | boolean
        }
    },
}