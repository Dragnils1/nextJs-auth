import { InferGetServerSidePropsType} from "next";
import { FC } from "react";
import { useRouter } from "next/router";

type Data = { 
    data: InferGetServerSidePropsType<typeof getServerSideProps>
 }


const Id: FC<Data> = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    

    const router = useRouter()

    const query = router.query

    if (router.isFallback) {
        return <div>Загрузка...</div>
    }
    

    return(
        <>
            <h1>USer id: {query.id}</h1>
            <div>
                <h2>All users:</h2>
                <ul>
                    {data.map((user: any) => {

                        return (
                            <li key={Number(new Date) + user.id }>
                                {Object.values(user).map((elem) => {
                                    if (typeof elem !== "object") {
                                        return <p>name value of elem: {elem}</p>
                                    }
                                })}
                                <hr/>
                            </li>
                        )
        
                    } )}
                </ul>
            </div>
        </>
    )
}

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { id: '1' } },
//             { params: { id: '2' } }
//         ],
//         fallback: true
//     }
// }

export const getServerSideProps = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}

export default Id