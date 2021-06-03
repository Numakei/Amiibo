import { useEffect, useState } from "react";
import { fetchImages } from "./api";
import { fetchNames } from "./Nameapi";
import CharaImage from "./image";

function Header() {
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
          onchange="createOrder(this.value)"
        >
          <option value="default">default</option>
          <option value="abcorder">ABC order</option>
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
  }, []);

  //console.log(name);
  console.log(data);
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
                <div class="column is-1">
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

function Main(name) {
  const [names, setNames] = useState([]);
  useEffect(() => {
    fetchNames(name.name).then((names) => {
      setNames(names.amiibo);
    });
  }, []);
  const gameserieses = Array.from(new Set(names.map(({ name }) => name)));
  const abcorder = Array.from(new Set(names.map(({ name }) => name)));
  abcorder.sort();
  //console.log(abcorder);
  const select = document.getElementById("order-select");
  return (
    <div>
      {gameserieses.map((item, key) => {
        //console.log(item);
        return (
          <div key={key}>
            <Contents name={item} />
          </div>
        );
      })}
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
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
