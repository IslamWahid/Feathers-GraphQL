const omit = require('lodash/omit');

export default function(Query, Service, GetServiceName, FindServiceName) {
  Object.assign(Query, {
    [`${GetServiceName}`]: (root, args, context) => {
      return Service.find(Object.assign({}, context, { query: args })).then(
        result => result[0]
      );
    }
  });
  Object.assign(Query, {
    [`${FindServiceName}`]: (root, args, context) => {
      return Service.find(
        Object.assign({}, context, {
          query: Object.assign({}, omit(args, ['limit', 'skip']), {
            $limit: args.limit,
            $skip: args.skip
          })
        })
      ).then(result => {
        return { total: result.length, items: result };
      });
    }
  });
}
