import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "SearchLayout Metadata"
};
type Props = {children: React.ReactNode}
const RecipesLayout = ({children}: Props) => {
    return (
        <>

            {children}
        </>
    )
}
export default RecipesLayout;