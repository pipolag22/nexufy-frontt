import React from "react";
import { Table } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const ProductData = ({description}) => {
  return (
    <div className="container mt-4" >
      <Table className="align-middle" style={{height:"300px"}}   >
        <tbody>
            <tr >
                <td className="text-center bg-dark-subtle text-dark-emphasis fw-semibold w-25">Descripción:</td>
                <td className="bg-body-secondary">{description}</td>
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
