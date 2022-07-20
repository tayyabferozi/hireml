import React from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import HeaderBtns from "./HeaderBtns";

import useModal from "../../hooks/useModal";
import AddDataset from "../../modals/AddDataset";

const data = [
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
  {
    name: "Data name",
    kind: "ABC",
    size: "10 MB",
    date: "Updated 2 hours ago",
  },
];

const Datasets = () => {
  const datasetModalUtils = useModal(false);

  return (
    <>
      <AddDataset {...datasetModalUtils} />
      <DashboardLayout
        HeaderBtns={HeaderBtns}
        btn1OnClick={datasetModalUtils.toggleShow}
      >
        <div className="card-lg">
          <h4 className="title d-1100-none">Dataset</h4>

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
              {data.map((el, idx) => {
                const { name, kind, size, date } = el;

                return (
                  <div key={"item-" + idx} className="row-item">
                    <div className="cell-item">
                      <div className="left">Name</div>
                      <div className="right">
                        <div className="d-flex align-items-center gap-2">
                          <img src="/assets/vectors/file.svg" alt="file" />{" "}
                          <span className="text-primary-1">{name}</span>
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
                      <div className="right">{date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Datasets;
