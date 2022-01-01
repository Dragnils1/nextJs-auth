import { useState, useEffect, FC } from 'react';

import { Layout, AddEdit } from 'components/users';
import { Spinner } from 'components';
import { userService, alertService } from 'services';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';



const Edit: FC<{ id: InferGetStaticPropsType<typeof getServerSideProps>}> = ({ id }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then((x: any) => setUser(x))
            .catch(alertService.error)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <h1>Edit User</h1>
            {user ? <AddEdit user={user} /> : <Spinner />}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    return {
        props: { id: params?.id }
    }
}

export default Edit;