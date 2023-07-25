import { useFormik } from "formik";

const useNewCard = () => {
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
    },
    onSubmit: (values) => {
      console.log({ values });
    },
  });

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
  };
};

export default useNewCard;
