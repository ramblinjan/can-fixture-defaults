import fixture, { store } from 'can-fixture';
import { Algebra, props } from 'can-set';

export const mockData = (url, baseItems, id = 'id') => {
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

/* eslint-disable-next-line import/no-default-export */
export default mockData;