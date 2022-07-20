import React from "react";
import { useDropzone } from "react-dropzone";

import Button from "../../components/Button";
import Modal from "../../components/Modal";

const AddDataset = ({ ...rest }) => {
  const {
    // acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone();

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  return (
    <Modal className="upload-modal" {...rest}>
      <div className="text-center">
        <h2>Upload Dataset</h2>
        <p className="text-light-1">Upload dataset to share with candidates</p>
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

              <Button xlg primary className="mt-30">
                Browse/Drop your files to upload
              </Button>
            </div>
          </div>
          {/* <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside> */}
        </section>
      </div>
    </Modal>
  );
};

export default AddDataset;
