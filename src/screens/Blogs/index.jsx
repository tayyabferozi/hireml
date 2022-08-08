import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import GridContainer from "../../components/GridContainer";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import MainLayout from "../../layouts/MainLayout";

// const blogsData = [
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
//   {
//     img: "/assets/imgs/blog-img.png",
//     title: "Top 5 SaaS Businesses",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas et ut mattis sociis non in. Sed non in",
//   },
// ];

const Blogs = () => {
  const [isLoading, setisLoading] = useState(false);
  const [blogsState, setBlogsState] = useState([]);

  useEffect(() => {
    setisLoading(true);

    axios
      .get("/blog")
      .then((res) => {
        setBlogsState(res.data.blogs);
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response.status === 401) {
          toast.error("Please login to view the blogs");
        } else {
          toast.error("Uh Oh! Something went wrong while fetching the blogs");
        }
      })
      .finally(() => setisLoading(false));
  }, []);

  return (
    <MainLayout>
      <Section id="blogs" fancy withBottomGrad>
        <div className="title">
          <h2>Blogs</h2>
        </div>

        {isLoading ? (
          <div className="text-center mt-50">
            <Loader />
          </div>
        ) : (
          <div className="blog-cards mt-50">
            <GridContainer rowClassName="main-row">
              {blogsState.map((el, idx) => {
                const {
                  id,
                  img = "/assets/imgs/blog-img.png",
                  title,
                  Description,
                } = el;

                return (
                  <div
                    key={"blog-item" + idx}
                    className="col-xxl-3 col-lg-4 col-md-6"
                  >
                    <div className="card">
                      <div className="card-img">
                        <img className="d-block" src={img} alt={title} />
                      </div>
                      <div className="card-body">
                        <div className="fs-20 fw-600 text-dark-1 mb-10">
                          {title}
                        </div>
                        <p className="">{Description}</p>
                        <Button
                          to={`/blog/${id}`}
                          className="rev mt-3"
                          primary
                          icon={{
                            src: "/assets/vectors/chevron-right-white.svg",
                            alt: "chevron",
                          }}
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </GridContainer>
          </div>
        )}
      </Section>
    </MainLayout>
  );
};

export default Blogs;
