# can-fixture-defaults
Provides useful default behavior using can-fixture

`can-fixture` enables mocking a back-end CRUD API for development by intercepting in-browser XHR requests. However, the API can be a little intimidating for beginners. The purpose of `can-fixture-defaults` is to allow mocking of data with minimal configuration simply by specifying a base url and passing an array of objects.

## Usage

Import into your project:

```js
import mockData from 'can-fixture-defaults';
```

Define a base URL for a simulated RESTful endpoint and pass in an array of objects:

```js
import mockData from 'can-fixture-defaults';

const baseItems = [
  { id: 1, name: 'Han', job: 'Scoundrel' },
  { id: 2, name: 'Luke', job: 'Jedi' },
  { id: 3, name: 'Chewie', job: 'RRRARGH' },
];

mockData('/api/characters', baseItems);
```

Then simply use whatever library you'd normally use for AJAX requests and it should behave just like a normal API.

### Find All
```js
axios.get('/api/characters').then((resp) => {
  console.log(resp.data); // --> same as baseItems
});
```

### Find One
```js
axios.get('/api/characters/2').then((resp) => {
  console.log(resp.data.name); // --> 'Luke'
})
```

### Create
```js
axios.post('/api/characters',  {name: 'Obi Wan', job: 'Only Hope'}).then((resp) => {
  console.log(resp.data.id); // newly assigned id
  return axios.get('/api/characters')
}).then((resp) => {
  console.log(resp.data); // baseItems + newly created object
});
```

### Update
```js
axios.put('/api/characters/1', {name: 'Han', job: 'Nerf Herder'}).then((resp) => {
  console.log(resp.data.job) // --> 'Nerf Herder'
  return axios.get('/api/characters/1');
}).then((resp) => {
  console.log(resp.data.job) // --> 'Nerf Herder'
});
```

### Delete

```js
axios.delete('/api/characters/1').then((resp) => {
  console.log(resp.data.id) // --> '1'
  return axios.get('/api/characters');
}).then((resp) => {
  console.log(resp.data) // baseItems, missing Han
});
```

## Specify a different id property

If your API uses a different ID field and you'd like your fixtures to match it, simply specify an id as a third argument.

```js
import mockData from 'can-fixture-defaults';

// use mongo-style _id field instead
const baseItems = [{_id: 1, name: 'Leia', job: 'Rebel Scum'}]
mockData('/api/characters', baseItems, '_id');
```

## Disable a fixture

If you'd like to be able to turn off a fixture, call `.close()` on the object returned by `mockData`:

```js
import mockData from 'can-fixture-defaults';

const mocked = mockData('/api/characters', []);
mockData.close();
axios.get('/api/characters'); // now works normally without being intercepted
```