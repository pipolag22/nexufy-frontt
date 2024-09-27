import React, { useState } from "react";
import { Pagination, Table } from "react-bootstrap";

const CustomTable = ({ columns, data }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula la paginación
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid">
      <Table striped bordered hover variant="light">
        <thead>
          <tr className="text-center">
            {columns.map((col) => (
              <th key={col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center" style={{ fontSize: "12px" }}>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.accessor}>{col.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="w-full d-flex justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default CustomTable;
