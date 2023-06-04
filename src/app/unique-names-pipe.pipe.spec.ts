import { UniqueNamesPipe } from './unique-names-pipe.pipe';

describe('UniqueNamesPipe', () => {
  it('create an instance', () => {
    const pipe = new UniqueNamesPipe();
    expect(pipe).toBeTruthy();
  });
});
