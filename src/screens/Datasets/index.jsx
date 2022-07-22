import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import HeaderBtns from "./HeaderBtns";

import useModal from "../../hooks/useModal";
import AddDataset from "../../modals/AddDataset";
import Loader from "../../components/Loader";

const Datasets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [datasetsState, setDatasetsState] = useState([]);
  const datasetModalUtils = useModal(false);
  const userState = useSelector((state) => state.user);

  const fileOpenHandler = (filename) => {
    axios
      .get(`/datasets/{filename}?email=${userState.email}&filename=${filename}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error("Uh Oh! Something went wrong while fetching the file.");
      });
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`/datasets?email=${userState.email}`)
      .then((res) => {
        console.log(res.data);
        setDatasetsState(res.data.file_details);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Uh Oh! Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userState]);

  return (
    <>
      <AddDataset {...datasetModalUtils} />
      <DashboardLayout
        HeaderBtns={HeaderBtns}
        btn1OnClick={datasetModalUtils.toggleShow}
      >
        <div className="card-lg">
          <h4 className="title d-1100-none">Dataset</h4>

          {isLoading ? (
            <div className="text-center">
              <Loader lg />
            </div>
          ) : (
            <div className="custom-table mt-1100-0">
              <div className="table-head">
                <div className="row-item">
                  <div className="cell-item">Name</div>
                  <div className="cell-item">Kind</div>
                  <div className="cell-item">Size</div>
                  <div className="cell-item">Date</div>
                </div>
              </div>

              <div className="table-body">
                {datasetsState.map((el, idx) => {
                  const { filename, kind, size, date_added } = el;

                  return (
                    <div key={"item-" + idx} className="row-item">
                      <div className="cell-item">
                        <div className="left">Name</div>
                        <div className="right">
                          <div
                            className="d-flex align-items-center gap-2 c-pointer"
                            onClick={() => fileOpenHandler(filename)}
                          >
                            <img src="/assets/vectors/file.svg" alt="file" />{" "}
                            <span className="text-primary-1">{filename}</span>
                          </div>
                        </div>
                      </div>
                      <div className="cell-item">
                        <div className="left">Kind</div>
                        <div className="right">{kind}</div>
                      </div>
                      <div className="cell-item">
                        <div className="left">Size</div>
                        <div className="right">{size}</div>
                      </div>
                      <div className="cell-item">
                        <div className="left">Date</div>
                        <div className="right">
                          {new Date(date_added).toLocaleTimeString()}{" "}
                          {new Date(date_added).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Datasets;
