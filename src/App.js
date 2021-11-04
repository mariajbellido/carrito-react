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

  const agregarProductoCarrito = (idProductoAgregar, nombre) => {
    //console.log(idProductoAgregar, nombre);
    // Si el carrito no tiene elementos entonces agregamos uno.
    if (carrito.length === 0) {
      cambiarCarrito([{ id: idProductoAgregar, nombre: nombre, cantidad: 1 }]);
    } else {
      // Si existen ya productos, tenemos que revisar que el carrito no tenga ya el producto que queremos adquirir.
      // Si ya lo tiene, entonces queremos actualizar su valor / cantidad
      // Si no tiene el producto, entonces lo agregamos.

      // Para poder editar un arreglo tenemos que clonarlo (no modificar directamente)
      const nuevoCarrito = [...carrito];

      // Comprobamos si el carrito tiene el ID del producto a a agregar

      const yaEnCarrito =
        nuevoCarrito.filter((productoCarrito) => {
          return productoCarrito.id === idProductoAgregar;
        }).length > 0;

      // Si ya está en el carrito deberemos actualizarlo
      if (yaEnCarrito) {
        // Para ello, deberemos buscarlo, obtener su posición en el arreglo...
        // ... y en base a su posición, actualizaremos su valor
        nuevoCarrito.forEach((productoYaCarrito, index) => {
          if (productoYaCarrito.id === idProductoAgregar) {
            const cantidad = nuevoCarrito[index].cantidad;
            nuevoCarrito[index] = {
              id: idProductoAgregar,
              nombre: nombre,
              cantidad: cantidad + 1
            };
          }
        });
        // Si no está en carrito, empujamos / enviamos el producto al arreglo
      } else {
        nuevoCarrito.push({
          id: idProductoAgregar,
          nombre: nombre,
          cantidad: 1
        });
      }
      // Por último ya, actualizaremos el carrito.
      cambiarCarrito(nuevoCarrito);
    }
  };

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
            <Route exact path="/" component={Inicio} />
            <Route path="/blog" component={Blog} />
            <Route path="/tienda">
              <Tienda
                productos={productos}
                agregarProductoCarrito={agregarProductoCarrito}
              />
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
