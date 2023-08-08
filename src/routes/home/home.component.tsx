import Directory from "../../components/directory/directory.component";
import Categories from "../../assets/data.json";

const Home = () => {
  return (
    <div>
      <Directory categories={Categories} />
    </div>
  );
};

export default Home;
