import SideBar from "../components/navbar";

const Home = () => {

    const user = 'Conviado'

    return ( 
        <div className="flex">
            <SideBar />
            <h3 className="m-7 font-bold text-[27px]">Hello, {user} 👋</h3>
        </div>
    );
}

export default Home;