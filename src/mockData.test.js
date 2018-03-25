/* eslint-disable no-undef */
import { expect } from 'chai';
import mockData from '../src';
import axios from 'axios';

const baseItems = [
  { id: 1, name: 'Han', job: 'Scoundrel' },
  { id: 2, name: 'Luke', job: 'Jedi' },
  { id: 3, name: 'Chewie', job: 'RRRARGH' },
];

describe('mockData()', function() {
  let mocked;
  beforeEach(() => {
    mocked = mockData('/api/characters', baseItems);
  });

  afterEach(() => {
    mocked.close();
  });

  it('should get all items', (done) => {
    axios.get('/api/characters').then((resp) => {
      expect(resp.data).to.deep.equal(baseItems);
      done();
    });
  });

  it('should get single item by id', (done) => {
    axios.get('/api/characters/2').then((resp) => {
      expect(resp.data).to.deep.equal(baseItems[1]);
      done();
    });
  });

  it('should create new item', (done) => {
    const newCharacter = {name: 'Obi Wan', job: 'Only Hope'};

    axios.post('/api/characters', newCharacter).then((resp) => {
      return resp.data.id;
    }).then((id) => {
      axios.get(`/api/characters/${id}`).then((resp) => {
        const expected = {id, name: 'Obi Wan', job: 'Only Hope'};
        expect(resp.data).to.deep.equal(expected);
        done();
      });
    });
  });

  it('should update an item', (done) => {
    axios.put('/api/characters/1', {name: 'Han', job: 'Nerf Herder'}).then((resp) => {
      expect(resp.data.job).to.equal('Nerf Herder');

      return axios.get('/api/characters/1');
    }).then((resp) => {
      console.log(resp.data)
      expect(resp.data).to.deep.equal({id: '1', name: 'Han', job: 'Nerf Herder'});
      done();
    })
  });

  it('should delete an item', (done) => {
    axios.delete('/api/characters/1').then((resp) => {
      expect(resp.data.id).to.equal('1');
      return axios.get('/api/characters');
    }).then((resp) => {
      expect(resp.data).to.deep.equal(baseItems.slice(1));
      done();
    });
  });

  it('should work with different id property', (done) => {
    mocked.close();
    const mongoIdItems = baseItems.map(({id, name, job}) => ({_id: id, name, job}));
    mocked = mockData('/api/characters', mongoIdItems, '_id');
    
    axios.get('/api/characters/1').then((resp) => {
      expect(resp.data._id).to.equal(1);
      expect(resp.data).to.deep.equal(mongoIdItems[0]);
      done();
    });
  });
});
