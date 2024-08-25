import Link from "next/link";
const Header = () => {
    const navigation = [
        {
            id: 1,
            tytle: "Sign Up",
            path: "/"
        },
        {
            id: 2,
            tytle: "Sign In",
            path: "/login"
        },
        {
            id: 3,
            tytle: "Home",
            path: "/home"
        },
        {
            id: 4,
            tytle: "About",
            path: "/about"
        },
        {
            id: 5,
            tytle: "Contact",
            path: "/contact"
        },
      
    ]
    return (
            <div className=" flex  text-white bg-slate-800 py-4">
                <Link href='home'  >   <h1 className=" mx-14 text-[25px]">ToDo List</h1></Link>
                <div className=" flex gap-6">
                    {navigation.map((e) => <Link key={e.id} href={e.path}  > {e.tytle} </Link>)}
                </div>
            </div>
    )
}
export default Header;