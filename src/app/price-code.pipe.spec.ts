import { PriceCodePipe } from './price-code.pipe';

describe('PriceCodePipe', () => {
  it('create an instance', () => {
    const pipe = new PriceCodePipe();
    expect(pipe).toBeTruthy();
  });
});
