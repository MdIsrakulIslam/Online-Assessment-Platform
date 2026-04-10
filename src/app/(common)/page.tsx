// import { getServerSession } from "next-auth";
// import { authOptions } from "@/nextAuth/authOptions";
// import { redirect } from "next/navigation";

import LoginForm from "@/components/pages/auth/LoginForm/LoginForm"

// const Page = async () => {
//     const session = await getServerSession(authOptions);

//     if (session) {
//         redirect("/dashboard");
//     } else {
//         redirect("/auth/login");
//     }
// };

// export default Pag

const Home = () => {
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default Home