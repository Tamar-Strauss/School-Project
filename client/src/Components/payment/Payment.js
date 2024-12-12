import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { UseCreate } from "../../services/usePostAxios";
import Menu from '../menu/menu';

const Payment = () => {
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });
  const [errors, setErrors] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear error message when the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setCard((prev) => ({ ...prev, focus: e.target.name }));
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessages = { number: "", name: "", expiry: "", cvc: "" };
  
    // Validating card number (16 digits)
    const numberRegex = /^\d{16}$/;
    if (!numberRegex.test(card.number)) {
      errorMessages.number = "מספר כרטיס לא תקין (צריך להיות 16 ספרות)";
      isValid = false;
    }
  
    // Validating cardholder's name
    if (card.name.trim() === "") {
      errorMessages.name = "שם בעל הכרטיס לא יכול להיות ריק";
      isValid = false;
    }
  
    // Validating expiry date (MM/YY format with or without a slash)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$|^\d{4}$/;
    const expiryDate = card.expiry.trim();
  
    if (!expiryRegex.test(expiryDate)) {
      errorMessages.expiry = "תאריך תפוגה לא תקין (צריך להיות בפורמט MM/YY או 1225)";
      isValid = false;
    } else {
      // If the format is without slash (1225), we need to insert the slash for further checks
      let formattedExpiryDate = expiryDate;
      if (formattedExpiryDate.length === 4) {
        formattedExpiryDate = `${formattedExpiryDate.slice(0, 2)}/${formattedExpiryDate.slice(2)}`;
      }
  
      const [month, year] = formattedExpiryDate.split("/").map((item) => parseInt(item, 10));
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so we add 1
      const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
  
      // If the year is less than current year or month is in the past, it's invalid
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errorMessages.expiry = "תאריך תפוגה לא תקף";
        isValid = false;
      }
    }
  
    // Validating CVC (3 digits)
    const cvcRegex = /^\d{3}$/;
    if (!cvcRegex.test(card.cvc)) {
      errorMessages.cvc = "קוד CVC לא תקין (צריך להיות 3 ספרות)";
      isValid = false;
    }
  
    setErrors(errorMessages);
    return isValid;
  };
  
debugger
  const { courseId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!validateForm()) {
      return; // Don't submit the form if there are validation errors
    }

    const obj = {
      studentId: JSON.parse(localStorage.getItem('userInfo')).id,
      courseId: courseId,
      registerDate: new Date(),
      nextLectureNum: 1,
    };

    const register = async () => {
      const res = await UseCreate('course_students', obj);
      if (res.status === 201) {
        console.log('נרשמת בהצלחה');
        alert("תשלום בוצע בהצלחה!");
        navigate('/courses/students/my-courses');
      } else {
        alert("הנך רשום כבר לקורס זה");
        console.log(res.response.data.message);
        navigate('/courses/students/my-courses');
      }
    };
    register();
  };

  return (
    <>
      <Menu />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "20px" }}>
        <div style={{ width: "300px", textAlign: "center" }}>
          <h2>הזן פרטי תשלום</h2>
          <Cards
            number={card.number}
            name={card.name}
            expiry={card.expiry}
            cvc={card.cvc}
            focused={card.focus}
          />
          {/* Adding a small margin between the card and input fields */}
          <div style={{ marginTop: "20px" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input
                type="text"
                name="number"
                placeholder="מספר כרטיס"
                value={card.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  maxWidth: "280px",
                  margin: "0 auto",
                }}
              />
              {errors.number && <span style={{ color: "red", fontSize: "12px" }}>{errors.number}</span>}

              <input
                type="text"
                name="name"
                placeholder="שם בעל הכרטיס"
                value={card.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  maxWidth: "280px",
                  margin: "0 auto",
                }}
              />
              {errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}

              <input
                type="text"
                name="expiry"
                placeholder="תאריך תפוגה (MM/YY)"
                value={card.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  maxWidth: "280px",
                  margin: "0 auto",
                }}
              />
              {errors.expiry && <span style={{ color: "red", fontSize: "12px" }}>{errors.expiry}</span>}

              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                value={card.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  maxWidth: "280px",
                  margin: "0 auto",
                }}
              />
              {errors.cvc && <span style={{ color: "red", fontSize: "12px" }}>{errors.cvc}</span>}

              <Button
                label="שלם"
                icon="pi pi-check"
                onClick={handleSubmit}
                type="button" // Ensures the button doesn't submit the form automatically
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  backgroundColor: "#4caf50",
                  borderColor: "#4caf50",
                  width: "100%",
                  maxWidth: "280px",
                  margin: "0 auto",
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
