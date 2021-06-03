import { useEffect, useState } from "react";
import { fetchImages } from "./api";
import { fetchNames } from "./Nameapi";
import CharaImage from "./image";

function Header({ order, setOrder }) {
  return (
    <header className="hero is-danger is-bold">
      <div className="hero-body red">
        <div className="container">
          <h1 className="title">amiibo</h1>
        </div>
      </div>
      <div className="selectBox">
        <select
          name="orders"
          id="order-select"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="default">default</option>
          <option value="abc">ABC order</option>
        </select>
      </div>
    </header>
  );
}

function Contents(name) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchImages(name.name).then((data) => {
      setData(data.amiibo);
    });
  }, [name]);

  return (
    <div>
      <section className="section">
        <section class="hero is-small rightgreen is-text-white">
          <div class="hero-body">
            <p class="title">{name.name}</p>
          </div>
        </section>
        <div className="container column">
          <div class="columns">
            {data.map((item, key) => {
              return (
                <div class="column is-2" key={key}>
                  <CharaImage name={item} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Main({ name, order }) {
  const [names, setNames] = useState([]);
  useEffect(() => {
    fetchNames(name).then((names) => {
      const abc = Array.from(new Set(names.amiibo.map(({ name }) => name)));
      if (order === "abc") {
        abc.sort();
      }
      setNames(abc);
    });
  }, [order]);
  return (
    <div>
      {names.map((item, key) => {
        return (
          <div>
            <Contents name={item} />
          </div>
        );
      })}
      {/* { {gameseries.name.map((item, key) => {
        //console.log(item);
        return (
          <div key={key}>
            <Contents name={item} />
          </div>
        );
      })} } */}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Data are retrieved from Amiibo API</p>
        <p>
          <a href="https://www.amiiboapi.com/">Amiibo API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  const [order, setOrder] = useState("default");

  const handleChange = (order) => {
    setOrder(order);
  };

  console.log(order);

  return (
    <div>
      <Header setOrder={handleChange} order={order} />
      <Main order={order} />
      <Footer />
    </div>
  );
}

export default App;
