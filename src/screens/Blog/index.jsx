import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../../layouts/MainLayout";
import Section from "../../components/Section";
import Loader from "../../components/Loader";

const Blog = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [blogState, setBlogState] = useState({ title: "", content: "" });

  useEffect(() => {
    axios
      .get(`/blog/content?id=${id}`)
      .then((res) => {
        setBlogState({ title: res.data.title, content: res.data.content });
      })
      .catch((err) => {
        console.log(err);

        toast.error(
          "Uh Oh! Something went wrong while fetching the blog content"
        );
      })
      .finally(() => setIsLoading(false));
  }, [id]);
  return (
    <MainLayout>
      <Section id="blog">
        {isLoading ? (
          <div className="text-center">
            <Loader lg />
          </div>
        ) : (
          <>
            <h2 className="text-center">{blogState.title}</h2>

            <p className="mt-20">{blogState.content}</p>
          </>
        )}
      </Section>
    </MainLayout>
  );
};

export default Blog;
