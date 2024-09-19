import React from "react";
import { Table } from "react-bootstrap";

const CustomTable = ({input}) => {
  return (
    <div>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Nombre de usuario</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
           {input.map((item)=>(
          <tr key={item.id}>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.roles.name}</td>
          </tr>
           ))} 
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
