import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import '../../global.css';
import './style.css';

export default function Input({ name, isPassword, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [password, setPassword] = useState(isPassword);
  const [passwordText, setPasswordText] = useState('View password');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
    setPasswordText(password ? 'View password' : 'Hide password');
  }, [fieldName, registerField, setPasswordText, password]);

  function configureViewPassword() {
    setPassword(!password);
  }

  function configurePasswordAndErrors() {
    if (isPassword) {
      return (

        <div className="showPassword">
          <button
            type="button"
            className="buttonPassword"
            onClick={() => configureViewPassword()}
          >{passwordText}</button>
          <label
            className={error ? "showLabelError" : "labelError"}>
            {error}
          </label>
        </div>
      );
    } else {
      return (
        <label
          className={error ? "showLabelError" : "labelError"}>
          {error}
        </label>
      );
    }
  }


  return (
    <>
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        type={password ? "password" : "text"}
        {...rest}
        className={error ? "defaultTextBoxError" : "defaultTextBox"} />
      {configurePasswordAndErrors()}
    </>
  );
}