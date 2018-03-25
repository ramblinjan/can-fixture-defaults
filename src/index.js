import fixture, { store } from 'can-fixture';
import { Algebra, props } from 'can-set';

/* eslint-disable-next-line import/no-default-export */
const mockData = (url, baseItems, id = 'id') => {
  const mockAlgebra = new Algebra(
    props.id(id)
  );

  const mockStore = store(baseItems, mockAlgebra);
  fixture(url, mockStore);

  // get rid of extra nested data field
  fixture(`GET ${url}`, (request, response) => {
    mockStore.getListData(request, (data) => {
      response(200, data.data)
    });
  });

  return {
    close: () => fixture(url, null)
  };
};

export default mockData;
