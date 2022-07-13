import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Section from "../../components/Section";
import MainLayout from "../../layouts/MainLayout";

const Login = () => {
  return (
    <MainLayout>
      <Section id="auth">
        <div className="auth-card">
          <h3 className="text-center">Login</h3>
          <div className="mt-26">
            <Input label="Your email" placeholder="Tonynguyen@example.com" />
            <Input className="mt-34" label="Password" type="password" />
          </div>

          <Link className="d-block text-end highlight fs-12 mt-26" to="/">
            Forgot password?
          </Link>

          <Button primary shadowed className="mt-3">
            Login
          </Button>

          <div className="text-center fs-14 text-dark-1 mt-40">
            Don’t have an account?{" "}
            <Link className="highlight" to="/register">
              Sign up
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
};

export default Login;
