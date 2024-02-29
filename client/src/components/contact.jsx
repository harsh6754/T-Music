import React from 'react'
import styled from 'styled-components';
import DetailsBar from './DetailsBar';
import Header from './Header'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  background-color: whitesmoke;
  padding-bottom: 50px;
`;

const PageHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const FormContainer = styled.div`
  width: 70%;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  height: 70vh;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const TextOne = styled.b`
  font-size: 30px;
  color: rgb(4, 4, 59);
  text-align: center;
`;

const TextTwo = styled.p`
  color: rgb(4, 4, 34);
  font-size: 15px;
  text-align: center;
`;

const contact = () => {
  return (
    <div className='w-full h-auto flex flex-col  bg-primary'>
      <Header />
      <PageWrapper>
        <PageHeadingWrapper>
          <TextOne>Contact US</TextOne>
          <TextTwo>Any Question or remarks? Just write us a message</TextTwo>
        </PageHeadingWrapper>
        <FormContainer>
          <DetailsBar />
        </FormContainer>
      </PageWrapper>
    </div>
  )
}

export default contact
