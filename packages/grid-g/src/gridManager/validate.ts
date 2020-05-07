// validate a field with multiple rules
var Schema = require('async-validate'),
  data = { bar: 'qux', foo: '111' },
  descriptor = {
    type: 'array',
    fields: {
      0: {
        type: 'object',
        fields: {
          id: [
            { type: 'string', required: true, max: 12 },
            function exists(cb) {
              // 	console.log(this)
              //   if (!data[this.value]) {
              //     this.raise(this.reason('missing-id'), 'id %s does not exist', this.value);
              //   }
              cb();
            },
          ],
        },
      },
    },
  },
  source = [{ id: 'foo' }],
  schema;

require('async-validate/plugin/all');

schema = new Schema(descriptor);
schema.validate(source, function(err, res) {
  console.dir(res);
});
