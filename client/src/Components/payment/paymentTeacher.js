import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { UseCreate } from "../../services/usePostAxios";
import Menu from '../menu/menu';
const Payment = () => {
    const { numLectures } = useParams();

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
    const pricePerLecture = 500; // מחיר לשיעור
    const totalAmount = parseInt(numLectures, 10) * pricePerLecture; // המרת numLectures למספר

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

        // Validate card number (16 digits)
        const numberRegex = /^\d{16}$/;
        if (!numberRegex.test(card.number)) {
            errorMessages.number = "Invalid card number (16 digits required)";
            isValid = false;
        }

        // Validate cardholder's name
        if (card.name.trim() === "") {
            errorMessages.name = "Cardholder name cannot be empty";
            isValid = false;
        }

        // Validate expiry date (MM/YY or MMYY)
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$|^\d{4}$/;
        const expiryDate = card.expiry.trim();

        if (!expiryRegex.test(expiryDate)) {
            errorMessages.expiry = "Invalid expiry date (format: MM/YY or MMYY)";
            isValid = false;
        } else {
            // Format MMYY to MM/YY
            let formattedExpiryDate = expiryDate;
            if (formattedExpiryDate.length === 4) {
                formattedExpiryDate = `${formattedExpiryDate.slice(0, 2)}/${formattedExpiryDate.slice(2)}`;
            }

            const [month, year] = formattedExpiryDate.split("/").map((item) => parseInt(item, 10));
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear() % 100;

            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                errorMessages.expiry = "Expiry date is invalid";
                isValid = false;
            }
        }

        // Validate CVC (3 digits)
        const cvcRegex = /^\d{3}$/;
        if (!cvcRegex.test(card.cvc)) {
            errorMessages.cvc = "Invalid CVC (3 digits required)";
            isValid = false;
        }

        setErrors(errorMessages); // Always set errors
        return isValid;
    };

    // const handleSubmit = () => {
    //     if (!validateForm()) {
    //         return;
    //     }

    //     // המשך תהליך התשלום
    //     alert('Payment successful!');
    //     navigate(`/courses/teachers/my-courses`);
    // };

    async function handleSubmit() {
      if (!validateForm()) {
               return;
            }
      const teacherId = JSON.parse(localStorage.getItem('userInfo')).id; // קבלת מזהה המורה מתוך ה-localStorage
  
      // קבלת נתוני הקורס מה-localStorage
      const courseData = JSON.parse(localStorage.getItem('courseData'));
  
      // אם הנתונים לא קיימים ב-localStorage, תוכל להחזיר הודעת שגיאה או טיפול במקרה הזה
      if (!courseData) {
          alert('Course data not found in localStorage');
          // return;
      }
  
      // בניית אובייקט הקורס מתוך הנתונים שהתקבלו מ-localStorage
      const obj = {
          name: courseData.name,
          teacherId: teacherId,
          description: courseData.description,
          categoryId: courseData.categoryId,
          accessPeriod: courseData.accessPeriod,
          price: courseData.price,
          numOfLecture: courseData.numOfLecture
      };
  
      if (JSON.parse(localStorage.getItem('userInfo')).status) {
          const res = await UseCreate('courses', obj);
          console.log(res);
          const courseId = res.data.id;
          const numLectures = courseData.numOfLecture; // השתמש בנתון ממערכת ה-localStorage
          console.log(numLectures);
  
          if (res.status && res.status === 200) {
              alert('Course created successfully');
              navigate("/courses/teachers/my-courses")
          }
          else if (res.status && res.status === 201) {
              alert('There is already a course with the same name.');
          }
          else {
              alert(`Error: ${res.message}`);
          }
      } else {
          alert('Sorry, you don\'t have permission.');
      }
  }
  
  

    return (
        <>
            <Menu />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: "20px" }}>
                <div style={{ width: "300px", textAlign: "center" }}>
                    <h3>For payment: {totalAmount} $</h3> {/* הדפסת סכום התשלום */}
                    <h2>Enter payment details</h2>
                    <Cards
                        number={card.number}
                        name={card.name}
                        expiry={card.expiry}
                        cvc={card.cvc}
                        focused={card.focus}
                    />

                    <div style={{ marginTop: "20px" }}>
                        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                            <input
                                type="text"
                                name="number"
                                placeholder="number"
                                value={card.number}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                style={styles.input}
                            />
                            {errors.number && <span style={styles.error}>{errors.number}</span>}

                            <input
                                type="text"
                                name="name"
                                placeholder="name"
                                value={card.name}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                style={styles.input}
                            />
                            {errors.name && <span style={styles.error}>{errors.name}</span>}

                            <input
                                type="text"
                                name="expiry"
                                placeholder="expiry"
                                value={card.expiry}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                style={styles.input}
                            />
                            {errors.expiry && <span style={styles.error}>{errors.expiry}</span>}

                            <input
                                type="text"
                                name="cvc"
                                placeholder="CVC"
                                value={card.cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                style={styles.input}
                            />
                            {errors.cvc && <span style={styles.error}>{errors.cvc}</span>}

                            <Button
                                label="Pay"
                                icon="pi pi-check"
                                type="submit"
                                style={styles.button}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
        maxWidth: "280px",
        margin: "0 auto",
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
    button: {
        marginTop: "20px",
        padding: "10px",
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
        width: "100%",
        maxWidth: "280px",
        margin: "0 auto",
    },
};

export default Payment;
