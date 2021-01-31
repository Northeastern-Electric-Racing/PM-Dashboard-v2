import { seedUser } from '../functions/seed';

test('Seed user has proper values', () => {
    expect(seedUser.name).toBe('Jane');
});