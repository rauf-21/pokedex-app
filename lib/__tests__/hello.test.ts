import greet from '../hello';

describe('Greet function test', () => {
  it('should return string', () => {
    const result = greet('world');

    expect(result).toBe('Hello, world!');
  });

  it('should work without providing name argument', () => {
    const result = greet();

    expect(result).toBe('Hello, anonymous!');
  });
});
