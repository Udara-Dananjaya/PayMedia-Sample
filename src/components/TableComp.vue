<template>
	<div class="table-comp-wrapper">
		<b-table :data="data">
			<b-table-column v-for="column in columns" :key="column.id" :field="column.field ? column.field : 'No'"
				:label="column.label" v-slot="props">

				<span v-if="column.label != 'Image'"> {{ props.row[column.field] }}</span>
				<img :src="`${props.row[column.field]}`" width="50px" height="50px" v-if="column.label == 'Image'">

				<span v-if="column.label == 'Action'">
					<div class="buttons">
						<span>
							<b-button type="is-primary" @click.prevent="emitEditUser(props.row.id)">Update</b-button>
							<b-button type="is-danger" @click.prevent="emitDeleteUser(props.row.id)">Delete</b-button>
						</span>
					</div>
				</span>
			</b-table-column>

		</b-table>
	</div>
</template>


<script>
export default {
	props: {
		columns: {
			type: Array,
			required: true
		},
		data: {
			type: Array,
			default: () => []
		}
	},
	emits: ['edit-user', 'delete-user'],
	methods: {
		emitEditUser(id) {
			this.$emit('edit-user', id);
		},
		emitDeleteUser(id) {
			this.$emit('delete-user', id);
		}
	}
};
</script>
