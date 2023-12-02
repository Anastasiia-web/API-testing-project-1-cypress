

describe('Mocha’s interface', () => {
    context('it provides a way to keep tests easier to read and organized.', () => {
      it('This is your test case', () => {
        // tag:smoke
        expect(true).to.eq(true)
      });
    });
  });