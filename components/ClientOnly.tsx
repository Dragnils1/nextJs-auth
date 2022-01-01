import { FC, useEffect, useState } from "react";

interface Props {
    deligated?: [] 
}

const ClientOnLy: FC<Props> = ({children, ...deligated}) => {

    const [hasMounted, setHasMounted] = useState<boolean>(false)

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) {
        return null;
    }

    return <div {...deligated}>{children}</div>;
}

export default ClientOnLy;