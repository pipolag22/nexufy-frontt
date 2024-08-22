import React from "react";
import { Table } from "react-bootstrap";

const ProductData = () => {
  return (
    <div className="container mt-4" >
      <Table className="align-middle" style={{height:"300px"}}   >
        <tbody>
            <tr >
                <td className="text-center bg-dark-subtle text-dark-emphasis fw-semibold w-25">Descripción:</td>
                <td className="bg-body-secondary">Aqui va la descripcion del producto</td>
            </tr>
            <tr>
                <td className="text-center bg-dark-subtle text-dark-emphasis fw-semibold">Estado:</td>
                <td className="bg-body-secondary">Aqui va el estado del producto</td>
            </tr>
            <tr>
                <td className="text-center bg-dark-subtle text-dark-emphasis fw-semibold">Presentación:</td>
                <td className="bg-body-secondary">Aqui va la presentacion del producto</td>
            </tr>
        </tbody>
      </Table>
        
    </div>
  );
};

export default ProductData;
