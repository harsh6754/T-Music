import React, { useRef } from 'react';
import Header from './Header';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_4h4sako', // Corrected environment variable usage
        'template_o6sym37', // Corrected environment variable usage
        form.current,
        "1up9aB2deQPU1J8wG" // Corrected environment variable usage
      )
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success('Email send Successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error('Failed to send email!');
        }
      );
  };

  return (
    <div className="w-full h-auto flex flex-col bg-primary">
      <Header/>
      <Container>
        <StyledContactForm>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
          </form>
        </StyledContactForm>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 87.3vh;
  background-color: black;
`;

const StyledContactForm = styled.div`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 15px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input,
    textarea {
      width: 100%;
      padding: 7px;
      margin-bottom: 10px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      min-height: 100px;
      max-height: 100px;
    }

    label {
      margin-top: 1rem;
    }

    input[type='submit'] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;

export default Contact;
