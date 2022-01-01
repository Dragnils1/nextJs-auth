import { FC } from "react";

export { Layout };

const Layout: FC<{}> = ({ children }) => {
    return (
        <div className="p-4">
            <div className="container">
                {children}
            </div>
        </div>
    );
}