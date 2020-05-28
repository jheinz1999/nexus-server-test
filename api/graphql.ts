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
    t.field('phone_number', {
      type: 'String',
      resolve(parent) {
        return `+${parent.phone_country_code}${parent.phone_national_number}`
      },
    });
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneusers();
  },
});

schema.queryType({
  definition(t) {
    t.list.field('users', {
      type: 'users',
      resolve(_root, _args, ctx) {
        return ctx.db.users.findMany();
      }
    });
    t.field('userById', {
      type: 'users',
      resolve(_root, args, ctx) {
        if (!args || !args.id) {
          return null;
        }
        return ctx.db.users.findOne({
          where: {
            id: args.id,
          }
        });
      },
      args: {
        id: schema.arg({
          type: 'Int',
        }),
      },
    });
  }
});
