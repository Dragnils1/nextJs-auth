import { apiHandler, usersRepo, omit } from 'helpers/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
    get: getUsers
});

function getUsers(req: NextApiRequest, res: NextApiResponse) {
    // return users without hashed passwords in the response
    const response = usersRepo.getAll().map((x: any) => omit(x, 'hash'));
    return res.status(200).json(response);
}