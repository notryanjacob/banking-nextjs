import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions";
import { createSessionClient } from "@/lib/appwrite";

jest.mock('@/utils/appwriteClient');
jest.mock('@/utils/userService');

describe('getLoggedInUser', () => {
    it('returns the logged in user details', async () => {
        // Mock the session client and account.get()
        const mockAccount = {
            get: jest.fn().mockResolvedValue({ $id: '67ed20b3002b61478ec1' }),
        };
        (createSessionClient as jest.Mock).mockResolvedValue({ account: mockAccount });

        // Mock getUserInfo
        const mockUser = {
            email: 'notryanjacob@gmail.com',
            userId: '67ed20b3002b61478ec1',
            dwollaCustomerUrl: 'https://api-sandbox.dwolla.com/customers/83828a91-cb32-4f6c-a297-f262ec8e7d51',
            dwollaCustomerId: '83828a91-cb32-4f6c-a297-f262ec8e7d51',
            firstName: 'Ryan',
            lastName: 'Jacob',
            address1: 'address',
            city: 'Mumbai',
            state: 'CA',
            postalCode: '12345',
            dateOfBirth: '2004-04-15',
            ssn: '1234',
            $id: '67ed20bc003b19159ce2',
            $createdAt: '2025-04-02T11:34:21.236+00:00',
            $updatedAt: '2025-04-02T11:34:21.236+00:00',
            $permissions: [],
            $databaseId: '67b20dc700150d1e19b1',
            $collectionId: '67b2ef830022c3bfd83c',
        };

        (getUserInfo as jest.Mock).mockResolvedValue(mockUser);

        const user = await getLoggedInUser();

        expect(user).toEqual(JSON.parse(JSON.stringify(mockUser)));
        expect(createSessionClient).toHaveBeenCalled();
        expect(mockAccount.get).toHaveBeenCalled();
        expect(getUserInfo).toHaveBeenCalledWith({ userId: '67ed20b3002b61478ec1' });
    });

    it('returns null if an error occurs', async () => {
        (createSessionClient as jest.Mock).mockRejectedValue(new Error('Something failed'));

        const user = await getLoggedInUser();
        expect(user).toBeNull();
    });
});
