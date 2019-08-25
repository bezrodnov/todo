import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useForm = (fields, opts = {}) => {
  const { t } = useTranslation();

  const fieldMap = fields.reduce((fieldMap, field) => {
    fieldMap[field.name] = field;
    return fieldMap;
  }, {});

  const { defaultValues = {} } = opts;
  fields.forEach(field => {
    defaultValues[field.name] = defaultValues[field.name] || field.defaultValue;
  });

  const [values, setValues] = useState(defaultValues);

  const [errors, setErrors] = useState({});

  const handleChange = name => e => {
    const value = fieldMap[name].type === 'date' ? e : e.target.value;

    setValues(oldValues => ({ ...oldValues, [name]: value }));
    validate(name, value);
  };

  const handleBlur = name => () => {
    validate(name, values[name]);
  };

  const validate = (name, value) => {
    if (fieldMap[name].required) {
      const hasError = !value || !value.trim();
      setErrors(oldErrors => ({
        ...oldErrors,
        [name]: hasError && t('global.form.fieldRequired'),
      }));
    }
  };

  return {
    values,
    fieldProps: name => ({
      value: values[name],
      error: !!errors[name],
      helperText: errors[name],
      onBlur: handleBlur(name),
      onChange: handleChange(name),
    }),
    isValid: () => !Object.keys(errors).some(name => errors[name]),
  };
};
