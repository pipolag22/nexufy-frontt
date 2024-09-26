import React from "react";
import { Table } from "react-bootstrap";

const CustomTable = ({input}) => {

  return (
    <div className="container ">
      <Table striped bordered hover variant="light">
        <thead>
          <tr className="text-center">
            <th>Nombre de usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
           {input.map((item)=>(
          <tr key={item.id}>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.roles[0]?.name.split('_')[1]}</td>
            <td></td>
          </tr>
           ))} 
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
