module.exports = {
    title: '我的博客',
    description: '只是一个博客而已',
    // 主题配置
    themeConfig: {
        // 顶部导航
        nav: [
            { text: '首页', link: '/' },
            { text: '归档', link: '/archives/' },
            { text: '分类', link: '/categories/',
                items: [
                    { text: 'Node.js', link: '/language/chinese/' },
                    { text: 'js', link: '/language/japanese/' }
                ]
            },
            { text: '关于我', link: '/about/' }
        ],

        // 侧边栏
        sidebar: [
            '/'
        ],
        sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
        displayAllHeaders: false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
        activeHeaderLinks: true, // 默认值：true 滚动时通过 hash 高亮侧边栏标题

        // Git 仓库和编辑链接
        repo: 'https://github.com/qq735675958', // 你的仓库
        repoLabel: 'GitHub', // 导航栏上的文本

        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '编辑此页面'
    }
}