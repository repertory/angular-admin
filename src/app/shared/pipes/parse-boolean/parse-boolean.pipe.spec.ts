import { ParseBooleanPipe } from './parse-boolean.pipe';

describe('ParseBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new ParseBooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
