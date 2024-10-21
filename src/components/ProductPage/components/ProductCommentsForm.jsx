// ProductCommentsForm.js
import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { sendComments } from "@/services/commentService"; // Asegúrate de que la ruta sea correcta
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext
import { LanguageContext } from "../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../themes/translations"; // Importar las traducciones

const ProductCommentsForm = ({ productId }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const commentData = {
      productId: productId, // Usa el productId pasado como prop
      text: newComment,
      rating: parseInt(rating, 10),
    };
    console.log(commentData);

    try {
      await sendComments(commentData); // Llama a la función sendComments
      setSuccess(t.commentSuccess);
      setNewComment("");
      setRating("1");
    } catch (error) {
      setError(error.message || t.commentError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="container">
        <Form.Group className="mb-3" controlId="text">
          <Form.Label className={darkMode ? "text-light" : "text-dark"}>
            {t.commentLabel}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={t.commentPlaceholder}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} // Ajuste de colores según el modo
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label className={darkMode ? "text-light" : "text-dark"}>
            {t.ratingLabel}
          </Form.Label>
          <Form.Select
            aria-label={t.selectRatingAriaLabel}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} // Ajuste de colores según el modo
          >
            <option value="1">{t.ratingOptions[1]}</option>
            <option value="2">{t.ratingOptions[2]}</option>
            <option value="3">{t.ratingOptions[3]}</option>
            <option value="4">{t.ratingOptions[4]}</option>
            <option value="5">{t.ratingOptions[5]}</option>
          </Form.Select>
        </Form.Group>
        <Button
          variant={darkMode ? "outline-light" : "primary"}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? t.submitting : t.submit}
        </Button>
        {error && <p className="text-danger mt-2">{error}</p>}
        {success && <p className="text-success mt-2">{success}</p>}
      </Form>
    </>
  );
};

export default ProductCommentsForm;
