import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import isEmpty from "../../utils/is-empty";
import { useSelector } from "react-redux";

const AddDataset = ({ onComplete, ...rest }) => {
  const userState = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    files: "",
  });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const images = Array.from(acceptedFiles);
      setFormState({ files: images });
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    if (!isEmpty(formState.files)) {
      for (let index = 0; index < formState.files.length; index++) {
        formData.append("files", formState.files[index]);
      }
    }

    axios
      .post(`/datasets?email=${userState.email}`, formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Files uploaded successfully!");
        onComplete();
      })
      .catch((err) => {
        console.log(err);
        try {
          if (
            typeof err?.response?.data?.detail === "object" &&
            err?.response?.data?.detail.length > 0
          ) {
            err?.response?.data?.detail?.forEach((el) => {
              toast.error(el.loc[1] + " " + el.msg);
            });
          } else if (typeof err?.response?.data?.detail === "string") {
            toast.error(err?.response?.data?.detail);
          } else {
            toast.error("Uh Oh! Something went wrong.");
          }
        } catch (err) {
          console.log(err);
          toast.error("Uh Oh! Something went wrong.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal className="upload-modal" {...rest}>
      <div className="text-center">
        <h2>Upload Dataset</h2>
        <form
          encType="multipart/form-data"
          onSubmit={formSubmitHandler}
          action=""
        >
          <p className="text-light-1">
            Upload dataset to share with candidates
          </p>
          <section className="container mt-60">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div>
                <img
                  className="upload-img"
                  src="/assets/vectors/upload.svg"
                  alt="upload"
                />

                <div className="fs-12 mt-20">Drag and drop your files here</div>

                <Button
                  xlg
                  primary
                  className="mt-30"
                  onClick={(e) => e.preventDefault()}
                >
                  Browse/Drop your files to upload
                </Button>
              </div>
            </div>
            {!isEmpty(files) && (
              <aside className="mt-20">
                <h4>Files:</h4>
                <ul className="mt-10">{files}</ul>
              </aside>
            )}
          </section>

          <Button primary className="mt-20">
            {isLoading ? <Loader /> : "Upload"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddDataset;
