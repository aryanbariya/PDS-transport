import React from 'react';

// TextInput component for text input fields
export const TextInput = ({ label, name, value, onChange, type = 'text', error }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control ${error ? 'is-invalid' : ''}`}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

// SelectInput component for dropdown fields
export const SelectInput = ({ label, name, value, onChange, options, valueKey, displayKey, error }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control ${error ? 'is-invalid' : ''}`}
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option[valueKey]} value={option[valueKey]}>
          {option[displayKey]}
        </option>
      ))}
    </select>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
); 