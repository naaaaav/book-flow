import HomeHeader from "../components/home/HomeHeader";
import Categorys from "../components/home/Categorys";
import Event from "../resources/home/event.jpg";
import Books from "../components/home/Books";
import Footer from "../components/home/Footer";
import './Home.css';

function Home() {
    return (
        <div>
            <div>
                <HomeHeader />
            </div> 
            <div>
                <Categorys />
            </div>
            <div>
                <img className="eventImg" src={Event} />
            </div>
            <div>
                <Books />
            </div>
            <div>
                <Footer />
            </div>
        </div>
        
      );
}
export default Home;