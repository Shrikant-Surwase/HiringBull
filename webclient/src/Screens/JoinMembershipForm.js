import React from 'react';
import { useState } from "react";
import styled from 'styled-components';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import logo from '../utils/logo.png';
import logoBig from '../utils/logo-big.png';
import social1 from '../utils/social1.png';
import social2 from '../utils/social2.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';

const JoinMembershipForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const STEPS = [
    { id: 1, label: "Overview" },
    { id: 2, label: "Your Details" },
    { id: 3, label: "Payment" },
    { id: 4, label: "Approval" },
  ];

  return (
    <Container>
      <Navbar>
        {/* <div className="top">
          <span>Already a member?</span> Stay ahead with the HiringBull app on Google Play Store <div className="download-btn">Download Now ↗</div>
        </div> */}
        <div className="bottom">
          <div className="middle">
            <OfflineBoltIcon />
            Join HiringBull Membership
            <img className='logobig' src={logo} alt="" />
          </div>
        </div>
        <div className="info">
          <InfoIcon />
          <div className="text">To protect quality, memberships are reviewed manually and approved within 24–48 hours.
            If your application isn’t approved, your payment is refunded automatically — no questions asked.</div>
        </div>
      </Navbar>
      <Content>
        <Pagination>
          {STEPS.map((step, index) => {
            const isDone = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <>
                <div
                  className={`circle ${isDone ? "done" : ""} ${isActive ? "active" : ""
                    }`}
                  onClick={() => {
                    if (step.id < currentStep) {
                      setCurrentStep(step.id);
                    }
                  }}
                >
                  {step.id} <span>{step.label}</span>
                </div>

                {index < STEPS.length - 1 && (
                  <div
                    className={`line ${step.id < currentStep ? "done" : ""
                      }`}
                  />
                )}
              </>
            );
          })}
        </Pagination>

        {
          currentStep == 1 ? (
            <OneContent>
              <h1>
                Apply Early. Compete Less. Get Real Visibility.
                <img src={logo} alt="" />
              </h1>

              <h2>HiringBull is a curated membership for serious job seekers who want early access to verified openings on official company career pages and real visibility with company employees. Instead of competing with thousands on public job portals, members apply when openings are still fresh and lightly contested.</h2>

              <h2>We continuously monitor official career pages and trusted social signals to detect job postings the moment they go live. This allows you to apply within minutes, not days later when roles are already saturated with applications. Every alert is intentional, relevant, and sourced directly from the company.</h2>

              <h2>Beyond early access, HiringBull enables limited, high-signal outreach to verified employees and recruiters through curated communities. Outreach is capped to prevent spam and ensure that messages remain meaningful, relevant, and respectful of the people reviewing them.</h2>

              <h2>To maintain quality and fairness, every membership is manually reviewed and approved within 24–48 hours. If an application is not approved, the payment is automatically refunded, ensuring a risk-free and transparent experience for every applicant.</h2>
              <a href='/' className="link">Explore all features in detail ↗</a>
              <div className="next-btn" onClick={() => setCurrentStep(2)}>Continue to Your Details →</div>
            </OneContent>
          ) : (
            currentStep == 2 ? (
              <OneContent>
                <h1>
                  Tell Us about Yourself
                  <img src={logo} alt="" />
                </h1>

                <h2>This information helps us review your application and ensure the membership reaches people from diverse backgrounds who genuinely benefit from the platform. Your information is private, securely handled, and never shared without your consent.</h2>

                <div className="next-btn" onClick={() => setCurrentStep(2)}>Continue to Your Details →</div>
              </OneContent>
            ) : null
        )
        }

      </Content>
    </Container>
  )
}

export default JoinMembershipForm

const Container = styled.div`
  width: 100vw; 
`;

const Navbar = styled.div`
  width: 100vw; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);   

  display: flex;
  flex-direction: column;

  .top{
    height: 40px;
    border-bottom: 1px solid black;
    
    display: flex; 
    align-items: center;  
    justify-content: center;
    padding: 0 20px;

    background-color: #ffc502;

    font-size: 0.85rem;
    font-weight: 300;
    
    span{
      margin-right: 5px;
      font-weight: 500;
    }

    .download-btn{
      margin-left: 5px;
      padding: 5px 10px;
      background-color: black;
      color: white;
      border-radius: 100px;
      cursor: pointer;
      font-size: 0.75rem;
    }
  }

  .bottom{
    height: 45px;
    border-bottom: 1px solid black;
    background-color: black;

    display: flex; 
    align-items: center;  
    justify-content: center;
    padding: 0 50px;


    .middle{
      height: 30px;

      display: flex;  
      align-items: center;
      cursor: pointer;

      text-transform: uppercase;
      font-size: 1.1rem;
      font-weight: 600; 
      letter-spacing: 1.5px;
      color: yellow;

      img{
        height: 26px;
        scale: 1.75;
        margin: 0 20px;
      }

      svg{
        font-size: 1.5rem;
        margin: 0 10px;
        fill: yellow;
      }
    }
  }

  .info{
    display: flex;
    align-items: center;
    padding: 10px;
    /* background-color: #ffc60040; */
    /* border: 1px solid #ffc60070; */
    border-radius: 10px;
    
    svg{
      font-size: 1.5rem;
      margin-right: 10px;
      fill: #efc030;
    }
    
    .text{
      font-size: 0.85rem;
      font-weight: 300;
    }
  }
`;


const Content = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 60px 0;
`

const Pagination = styled.div`
  /* border: 1px solid black; */
  width: 90%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* border-bottom: 1px solid #ccc; */
  padding-bottom: 27px; 

  scale: 0.95;

  .circle{
    position: relative;
    cursor: pointer;
    display: grid;
    place-items: center;

    font-size: 1rem;
    font-weight: 300;

    height: 45px;
    aspect-ratio: 1/1;

    border-radius: 50%;

    /* border: 1px solid black;  */
    background-color: #ece6e6;

    margin: 0 20px;

    font-family: 'Inter', system-ui, sans-serif;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;

    span{
      width: 100px;
      position: absolute;
      bottom: -30px;

      font-size: 0.85rem;
      padding-bottom: 2px;
      /* border: 1px solid black; */
      /* border-bottom: 4px solid green; */

      text-align: center;
    }
  }

  .line{
    flex: 1;
    height: 1px;
    background-color: #ccc;
  }

  .active{
    background-color: #ffc600;
    font-weight: 500;
    border: 1px solid black;

    span{
      border-bottom: 4px solid #ffc600;
    }
  }

  .done{
    background-color: #ffc600;
  }

`

const OneContent = styled.div`
  min-height: 600px;
  width: 100%;
  
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: center; */

  h1{
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px; 

    /* background-color: #f0f0f0; */
    
    display: flex;
    align-items: center;
    gap: 12px;

    img{
      height: 60px;
    }
  }

  h2{
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 16px;

    text-align: left;
  }

  .link{
    width: 100%;
    font-size: 1rem;
    font-weight: 300;
    margin-top: 10px;
    text-align: left;
    color: #333;
  }

  .next-btn{
    padding: 10px 30px;
    border-radius: 100px;
    background-color: black;
    color: white;
    font-size: 0.85rem;
    margin-top: 50px;
    cursor: pointer;
  }
`