const CategoryCard = ({ image, name, description }) => {
  return (
    <div className="custom-card rounded-5">
    <img
      src={image}
      alt={name}
      className="card-image object-fit-cover rounded-5"
    />
    <div className="overlay text-card-custom d-flex flex-column justify-content-center align-items-start">
      <p className="fs-3 fw-semibold text-white">{name}</p>
      <p className="fs-6 text-white">{description}</p>
    </div>
  </div>
  );
};

export default CategoryCard;
