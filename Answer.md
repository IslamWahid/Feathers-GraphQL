# Answer

There was a problem when trying to find locations by `_id` and that was affecting when trying to get a location by id and also when trying to get any other entity that has a relationship with specific location document which in our case is the apartment entity.

so when we try to `GET: /locations/{id}` it responds with `not found id` and also when trying to get an apartment and populating the associated location it returns `null` for the location attribute

I noticed that the `id` in the error returned is different than the `id` in the query I send, it was converted to lowerCase.

I started to trace it and went inside the `feathers-mongodb` library and I found that the library is checking for the `id` if it's a valid MongoID,it converts it to new MongoID otherwise it keeps it as string. and the only valid ids in the seed files were for the `locations` collection so that when trying to find by `id` it was being converted to mongoID which was changing the case for the string and since we seeded these ids as strings not mongoIDs, they aren't matched and the query fails.

`ObjectID.isValid` function in `bson` library is the function that validates the id.

## Solution

I changed the seed ids for `locations` to be seeded as valid MongoIDs so that it's saved in the same way that it will be queried as.

## Another Solution

We may also change the seed ids for `locations` to be invalid MongoIDs as the `ObjectID.isValid` function in `bson` library is checking

```javascript
if (typeof id === 'string') {
    return id.length === 12 || (id.length === 24 && checkForHexRegExp.test(id));
  }
```

so We may change the length of the ids in the seeds for locations and the apartments relation.