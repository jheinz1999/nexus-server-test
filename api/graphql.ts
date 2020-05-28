import { schema } from "nexus"

schema.objectType({
  name: 'users',
  definition(t) {
    t.model.id();
    t.model.email_address();
    t.model.first_name();
    t.model.last_name();
    t.model.phone_country_code();
    t.model.phone_national_number();
  },
});

schema.queryType({
  definition(t) {
    t.list.field('users', {
      type: 'users',
      resolve(_root, _args, ctx) {
        return ctx.db.users.findMany();
      }
    })
  }
});
