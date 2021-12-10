# table

作为祖先 注入核心方法和属性

```ts
useProvideTable()
```

```ts
<div>
	<table>
		<colGroup></colGroup>
		{title && <Panel />}
		{groupTableNode}
		{footer && <Panel />}
	</table>
</div>
```

## GroupTableNode

> 核心

```ts
<TableComponent>
	{bodyGroup()} // colGroup
	{(header) => <Header />}
	{bodyTable()}
</TableComponent>
```

### bodyTable

> Body

高阶组件 <WrapperComponent ='tbody'>

## Header

高阶组件 <WrapperComponent = 'thead'>

column => 树形结构扁平化处理 => 渲染

## Cell
