<script lang="ts" setup>
	import { ref } from 'vue'
	import Table from '../packages/vc-table/index'
	const data = [
		{
			key: '1',
			firstName: 'John',
			lastName: 'Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: ['nice', 'developer']
		},
		{
			key: '2',
			firstName: 'Jim',
			lastName: 'Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: ['loser']
		},
		{
			key: '3',
			firstName: 'Joe',
			lastName: 'Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			tags: ['cool', 'teacher']
		}
	]
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 200,
			children: [
				{
					title: 'firstName',
					key: 'firstName',
					width: 100,
					dataIndex: 'firstName'
				},
				{
					title: 'lastName',
					key: 'lastName',
					width: 100,
					dataIndex: 'lastName'
				}
			]
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			width: 200
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			width: 200
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			width: 200
		}
	]
</script>

<template>
	<div class="data"></div>
	<table>
		<thead>
			<tr>
				<th colspan="2">Name</th>
				<th rowspan="2">age</th>
			</tr>
			<tr>
				<th>firstName</th>
				<th>lastName</th>
			</tr>
		</thead>
	</table>
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
		<tbody>
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
	<Table
		aria-hidden="true"
		:data-arr="{ ss: 1 }"
		class="aaa bbb"
		:data="data"
		:columns="columns"
		:showHeader="true"
		prefixCls="ant-table"
	>
		<template #title="slotsData">
			{{ slotsData }}
			<h1>Title</h1>
		</template>
		<template #footer="slotsData">
			{{ slotsData }}
			<h1>Footer</h1>
		</template>
	</Table>
</template>

<style scoped>
	.data {
		background-color: red;
		width: 400px;
		max-width: 500px;
	}

	.blue {
		background-color: skyblue;
		width: 100px;
	}
	.red {
		width: 50px;
		background-color: red;
	}
	.yellow {
		background-color: yellow;
		width: 100px;
	}
	table {
		border: 1px solid #ccc;
		border-collapse: collapse;
	}
	caption {
		caption-side: bottom;
	}
</style>
