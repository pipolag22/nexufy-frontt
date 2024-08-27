import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

const AuthForm = ({ title, fields, buttonText, linkText, linkAction, onSubmit }) => {
  // Manejador del envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene la recarga de la página
    const formData = new FormData(event.target);

    // Convierte los datos del formulario en un objeto
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Llama la función onSubmit pasada como prop
    onSubmit(data);
  };

  return (
    <div className="d-flex align-items-center vh-100">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center bg-light p-5">
            <h2 className="mb-4">{title}</h2>
            <form onSubmit={handleSubmit}>
              {fields.map((field, index) => (
                <div className="mb-3" key={index}>
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="form-control"
                    id={field.id}
                    name={field.id} // Asegura que el name coincide con el id
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary w-100 mb-3">
                {buttonText}
              </button>
            </form>
            <div className="text-center">
              <button className="btn btn-link" onClick={linkAction}>
                {linkText}
              </button>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
            <img src={fields[0].image} alt={title} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

//  PropTypes
AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkAction: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // Añadido onSubmit como requerido
};

export default AuthForm;
