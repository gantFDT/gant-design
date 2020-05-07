import Schema, { Rules } from 'async-validator';
var descriptor: any = {
	roles: {
		type: "array", required: true, len: 3,
		fields: {
			0: {
				type: "object", fields: {
					id: { required: true, len: 4 },
					name: { required: true, len: 5 }
				}
			},
		}
	}
}
async function test() {
	var schema = new Schema(descriptor)
	try {
		const res = await schema.validate({ roles: [{ id: "222", name: 'zzz' }] });
	} catch (error) {
		console.log(error)
	}


}
test()