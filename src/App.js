import React, { useState } from "react";
import "./styles.css";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route
} from "react-router-dom";

import Inicio from "./components/Inicio";
import Blog from "./components/Blog";
import Tienda from "./components/Tienda";
import Error404 from "./components/Error404";
import Carrito from "./components/Carrito";

const App = () => {
  const productos = [
    { id: 1, nombre: "Producto 1" },
    { id: 2, nombre: "Producto 2" },
    { id: 3, nombre: "Producto 3" },
    { id: 4, nombre: "Producto 4" }
  ];

  const [carrito, cambiarCarrito] = useState([]);

  return (
    <Router>
      <Contenedor>
        <Menu>
          <NavLink to="/" exact>
            Inicio
          </NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/tienda">Tienda</NavLink>
        </Menu>
        <main>
          <Switch>
            <Route path="/" exact="true" component={Inicio} />
            <Route path="/blog" component={Blog} />
            <Route path="/tienda">
              <Tienda productos={productos} />
            </Route>
            <Route componenet={Error404} />
          </Switch>
        </main>

        <aside>
          <Carrito carrito={carrito} />
        </aside>
      </Contenedor>
    </Router>
  );
};

const Contenedor = styled.div`
  max-width: 1000px;
  padding: 40px;
  width: 90%;
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 1fr;
  background: #fff;
  margin: 40px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Menu = styled.nav`
  width: 100%;
  text-align: center;
  background: #092c4c;
  grid-column: span 2;
  border-radius: 3px;

  a {
    color: #fff;
    display: inline-block;
    padding: 15px 20px;
  }

  a:hover {
    background: #1d85e8;
    text-decoration: none;
  }
`;

export default App;
