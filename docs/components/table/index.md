# Table 表格

> 展示行列数据

:::demo

```vue
<table style="width: 500px">
		<caption>
			SUmmary
		</caption>
		<colgroup>
			<col class="blue" style="width: 200px" />
			<col span="2" class="yellow" />
			<col span="2" class="red" />
		</colgroup>
		<thead>
			<tr>
				<th></th>
				<th scope="col">Name</th>
				<th scope="col">age</th>
				<th scope="col">address</th>
				<th scope="col">id</th>
			</tr>
		</thead>
		<tbody dir="rtl">
			<tr>
				<th scope="row">Skill</th>
				<td>wu</td>
				<td>11</td>
				<td>11</td>
				<td>11</td>
			</tr>
			<tr>
				<th scope="row">aa</th>
				<td>wu</td>
				<td>11</td>
				<td>11</td>
				<td>11</td>
			</tr>
		</tbody>
	</table>
```
