const { findUserByUsername, addUser } = require('../model/userModel');
const { addTransfer } = require('../model/transferModel');
const { users, transfers } = require('../model/database');

describe('User Model', () => {
  beforeEach(() => {
    users.length = 0;
  });

  it('should add and find a user', () => {
    addUser({ username: 'user1', password: '123' });
    const user = findUserByUsername('user1');
    expect(user).toBeDefined();
    expect(user.username).toBe('user1');
  });

  it('should return undefined for non-existent user', () => {
    const user = findUserByUsername('notfound');
    expect(user).toBeUndefined();
  });
});

describe('Transfer Model', () => {
  beforeEach(() => {
    transfers.length = 0;
  });

  it('should add a transfer', () => {
    addTransfer({ from: 'user1', to: 'user2', value: 100 });
    expect(transfers.length).toBe(1);
    expect(transfers[0].from).toBe('user1');
  });
});
