import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Section from "../../components/Section";
import MainLayout from "../../layouts/MainLayout";

const Register = () => {
  return (
    <MainLayout>
      <Section id="auth">
        <div className="auth-card">
          <h3 className="text-center">Register</h3>
          <div className="mt-26">
            <Input label="Name" />
            <Input className="mt-34" label="Email" />
            <Input className="mt-34" label="Phone Number" />
            <Input className="mt-34" label="Company Name" />
            <Input className="mt-34" label="Password" type="password" />
            <Input className="mt-34" label="Confirm Password" type="password" />
          </div>

          <Link className="d-block text-end highlight fs-12 mt-26" to="/">
            {/* Forgot password? */}
          </Link>

          <Button primary shadowed className="mt-26">
            Register
          </Button>

          <div className="text-center fs-14 text-dark-1 mt-40">
            Already have an account?{" "}
            <Link className="highlight" to="/login">
              Login
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
};

export default Register;
