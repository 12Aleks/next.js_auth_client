import Link from "next/link";
import SignInButton from "@/components/SignInButton";

const AppBar = () => {
    return (
        <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
            <Link className="text-gray-500 hover:text-gray-900 transition-colors font-medium" href={"/"}>
                Home Page
            </Link>
            <Link
                className="text-gray-500 hover:text-gray-900  transition-colors font-medium"
                href={"/dashboard"}
            >
                DashBoard
            </Link>

            <SignInButton />
        </header>
    );
};

export default AppBar;