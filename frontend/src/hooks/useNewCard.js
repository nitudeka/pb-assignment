import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { getUUID } from "../utils/common";

const useNewCard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
    },
    validate,
    validateOnChange: false,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { uuid: getUUID(), "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          cardNumber: values.cardNumber.replaceAll(" ", ""),
        }),
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        formik.setFieldError("cardNumber", data.message);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  function validate(values) {
    const errors = {};

    if (!values.cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (values.cardNumber.replace(" ", "").length < 18) {
      errors.cardNumber = "Please provide complete card number";
    }
    if (values.expiryDate.length !== 7) {
      errors.expiryDate = "Expiry date required";
    } else {
      const month = parseInt(values.expiryDate.substr(0, 2), 10);
      const year = parseInt(values.expiryDate.substr(5, 2), 10);
      const currentYear = new Date().getFullYear() % 100;

      const isValid =
        month >= 1 &&
        month <= 12 &&
        year >= currentYear &&
        year <= currentYear + 20;

      if (!isValid) errors.expiryDate = "Invalid expiry date";
    }
    if (values.cvv.length !== 3) errors.cvv = "CVV is required";
    if (!values.name) errors.name = "Name is required";

    return errors;
  }

  const handleNumChange = (value) => {
    const cleanedValue = value.replace(/\s+/g, "").replace(/[^0-9]/g, "");
    let formattedValue = "";
    for (let i = 0; i < cleanedValue.length; i += 4) {
      formattedValue += cleanedValue.substr(i, 4) + " ";
    }
    if (formattedValue.length <= 20) {
      formik.setFieldValue("cardNumber", formattedValue.trim());
    }
  };

  const handleExpiry = (value) => {
    const cleanedValue = value.replace(/[^0-9]/g, "");
    let formattedValue = cleanedValue;
    if (cleanedValue.length > 2) {
      formattedValue =
        cleanedValue.substr(0, 2) + " / " + cleanedValue.substr(2, 2);
    }

    formik.setFieldValue("expiryDate", formattedValue);
  };

  const handleCvv = (value) => {
    const cleanedValue = value.replace(/[^0-9]/g, "");
    const truncatedValue = cleanedValue.slice(0, 3);
    formik.setFieldValue("cvv", truncatedValue);
  };

  const handleName = (value) => {
    formik.setFieldValue("name", value);
  };

  return {
    ...formik.values,
    handleNumChange,
    handleExpiry,
    handleCvv,
    handleName,
    onSubmit: formik.handleSubmit,
    errors: formik.errors,
    loading,
  };
};

export default useNewCard;
