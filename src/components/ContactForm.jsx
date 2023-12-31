import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../features/contacts/contactSlice";
import { nanoid } from "nanoid";
import { Button, TextField, Box } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export const ContactForm = () => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });
  const [error, setError] = useState({
    errorName: false,
    errorPhone: false,
    message: "",
    complete: false,
  });
  const handleValidation = (contact) => {
    const { name, phone } = contact;
    const regex = {
      name: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+ [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/,
      phone: /^\+\d{1,4}[-\s]\d{3,12}$/,
    };
    if (regex.name.test(name)) {
      if (regex.phone.test(phone)) {
        setError({
          errorName: false,
          errorPhone: false,
          message: "Successful",
          complete: true,
        });
      } else {
        setError({
          errorName: false,
          errorPhone: true,
          message:
            "Enter phone number in format: +CountryCode-LocalNumber or +CountryCode LocalNumber.",
          complete: false,
        });
      }
    } else {
      setError({
        errorName: true,
        errorPhone: false,
        message: "Enter a valid name in format: Name Lastname",
        complete: false,
      });
    }
  };

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
    handleValidation(contact);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (error.complete) {
      dispatch(
        addContact({
          ...contact,
          id: nanoid(5),
        })
      );
      setContact({
        name: "",
        phone: "",
      });
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} autoComplete="off">
      <TextField
        sx={{ mb: 2 }}
        fullWidth
        required
        error={error.errorName}
        helperText={error.errorName && error.message}
        id="outlined-error-helper-text"
        label="Name"
        name="name"
        onChange={handleChange}
        value={contact.name}
      ></TextField>
      <TextField
        sx={{ mb: 2 }}
        fullWidth
        required
        error={error.errorPhone}
        helperText={error.errorPhone && error.message}
        id="outlined-error-helper-text"
        label="Phone Numer"
        name="phone"
        onChange={handleChange}
        value={contact.phone}
      ></TextField>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="success"
        size="medium"
        startIcon={<PersonAddAlt1Icon />}
      >
        Submit
      </Button>
    </Box>
  );
};
