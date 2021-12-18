const sidebar = {
	'/': getSideBar()
}

function getSideBar() {
	return [
		{
			text: '介绍'
		},
		{
			text: '通用'
		},
		{
			text: '数据展示',
			children: [
				{
					text: 'Table 表格',
					link: '/components/table/'
				}
			]
		}
	]
}

export default sidebar
