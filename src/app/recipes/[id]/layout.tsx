import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "RecipeLayout Metadata"
};
type Props = {children: React.ReactNode}
const RecipeLayout = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    )
}
export default RecipeLayout;