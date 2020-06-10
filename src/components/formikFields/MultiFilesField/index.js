import React, { useState } from "react";
import styles from "./index.module.css";

function MultiFilesField({ setFieldValue, ...props }) {
  const [amount, setAmount] = useState(0);

  const onChange = (event) => {
    console.log(event.target.files);
    if (event.target.files) {
      setAmount(event.target.files.length);
      setFieldValue(props.name, event.target.files);
    }
  };

  return (
    <label className={styles.container}>
      <span className={styles.button}>Select Files</span>
      {`${amount} files selected`}
      <input
        type="file"
        {...props}
        onChange={onChange}
        className={styles.fileInput}
      />
    </label>
  );
}

export default MultiFilesField;
