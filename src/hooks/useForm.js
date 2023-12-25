import { useState } from "react";
import validate from "../utils/validate";

const useForm = (initialValue, rules) => {
  const [form, setForm] = useState(initialValue);
  const [error, setError] = useState({});

  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _validate = () => {
    const errorObj = validate(rules, form);
    setError(errorObj);
    return errorObj;
  };

  return {
    form,
    error,
    setForm,
    register,
    validate: _validate,
  };
};

export default useForm;
