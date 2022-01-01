import Link from "next/link";
import { FC } from "react";

interface Props {
    name: string
}

const Todo: FC<Props> = ({name}) => {
    return(
        <>
            <nav style={{margin: "20%"}}>
                <Link href="/">mainPage</Link>
                <Link href="/smth"> smth</Link>
            </nav>
            
        </>
    )
}
export default Todo