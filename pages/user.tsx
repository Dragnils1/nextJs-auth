import { FC, useState } from "react";
import Link from "next/link";
import styles from "../styles/user.module.scss"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

interface Props {
    data: InferGetStaticPropsType<typeof getStaticProps>
}

interface IUser {
    id: number;
    name: string;
    email: string;
}

const User: FC<Props> = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {


    return (
        <>
            {data.map((user: any) => {
                return (
                    <div className={styles.user} key={Math.floor(Number(new Date())) + user.id}>
                        <h1>name: <Link href={`/users/${user.id}`}>{user.name}</Link></h1>
                        <h2>id: {user.id}</h2>
                        <h3>email: {user.email} </h3>
                    </div>
                )
            })}
        </>
    )
}

export const getStaticProps = async () =>{

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json()    

    return {
        props: {
            data,
        },
    }
}

export default User;

