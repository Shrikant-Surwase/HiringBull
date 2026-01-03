import React from 'react';
import styled from 'styled-components';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import logo from '../utils/logo.png';
import logoBig from '../utils/logo-big.png';
import social1 from '../utils/social1.png';
import social2 from '../utils/social2.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Landing = () => {
  const rows = [
    {
      aspect: "Competition Level",
      hiringbull: "Limited to 1,000 members → early apply, significantly less competition",
      others: "Extremely high competition",
      groups: "Extremely high competition",
      hbType: "good",
      oType: "bad",
      gType: "bad"
    },
    {
      aspect: "Access Control",
      hiringbull: "Capped membership (only 1,000 users at a time)",
      others: "Open to everyone",
      groups: "Open to everyone",
      hbType: "good",
      oType: "bad",
      gType: "bad"
    },
    {
      aspect: "Job Discovery Speed",
      hiringbull: "Early alerts from company career pages",
      others: "Often delayed",
      groups: "Early alerts",
      hbType: "good",
      oType: "warn",
      gType: "good"
    },
    {
      aspect: "Job Quality",
      hiringbull: "Verified company career-page links only",
      others: "Mixed quality",
      groups: "Unverified, noisy",
      hbType: "good",
      oType: "warn",
      gType: "bad"
    },
    {
      aspect: "Personalization",
      hiringbull: "Based on your segment & company choice",
      others: "Broad, generic",
      groups: "None",
      hbType: "good",
      oType: "warn",
      gType: "bad"
    },
    {
      aspect: "Notifications",
      hiringbull: "Only for relevant jobs you opt into",
      others: "High-noise alerts",
      groups: "High-noise alerts",
      hbType: "good",
      oType: "warn",
      gType: "warn"
    },
    {
      aspect: "DM Visibility (to company employees or HRs)",
      hiringbull: "100% visibility with up to 3 controlled requests/month",
      others: "No visibility guarantee",
      groups: "No access to employees / HRs",
      hbType: "good",
      oType: "bad",
      gType: "bad"
    },
    {
      aspect: "Fake / Expired Jobs",
      hiringbull: "Actively filtered",
      others: "Common",
      groups: "Common",
      hbType: "good",
      oType: "bad",
      gType: "bad"
    },
    {
      aspect: "Social Media Important Posts",
      hiringbull: "Curated hiring posts from LinkedIn, Reddit, Twitter",
      others: "Not centralized",
      groups: "None",
      hbType: "good",
      oType: "bad",
      gType: "bad"
    },
    {
      aspect: "Promotional / Spam Entries",
      hiringbull: "No promotions, ads, or paid postings",
      others: "Sponsored & promoted listings",
      groups: "Heavy promotions & spam",
      hbType: "good",
      oType: "warn",
      gType: "bad"
    },
    {
      aspect: "Target Audience",
      hiringbull: "Built specifically for India",
      others: "Global, not India-focused",
      groups: "Indian groups exist but unstructured",
      hbType: "good",
      oType: "bad",
      gType: "warn"
    }
  ];

  return (
    <Container>
      <Navbar>
        <div className="top">
          <span>Already a member?</span> Stay ahead with the HiringBull app on Google Play Store <div className="download-btn">Download Now ↗</div>
        </div>
        <div className="bottom">
          <div className="left">
            <img className='logobig' src={logo} alt="" />
            HiringBull
          </div>
          <div className="right">
            <a href="#features">Features</a>
            <a href="#compare">Compare</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#apply" className='type2'>Apply for Membership <OfflineBoltIcon /></a>
          </div>
        </div>
      </Navbar>
      <Page1>
        <img src={logoBig} alt="" />

        <p class="hero-title main-title">
          Apply early.
        </p>

        <p class="hero-subtitle">
          Compete with <u>50 applicants</u>, not 50,000.
        </p>

        <a href='/' className="apply-btn">
          Apply for Membership <OfflineBoltIcon />
        </a>

        <div className="dancing-scroll-action">
          <ExpandMoreIcon />
        </div>
      </Page1>
      <PageGap>
        <div className="ticker">
          <div className="ticker__content">
            <span>Application currently available only on Play Store. iOS coming soon.</span>
            <img src={logo} alt="" />
            <span>Application currently available only on Play Store. iOS coming soon.</span>
            <img src={logo} alt="" />
            <span>Application currently available only on Play Store. iOS coming soon.</span>
            <img src={logo} alt="" />
          </div>

          <div className="ticker__content">
            <span>Application currently available only on Play Store. iOS coming soon.</span>
            <img src={logo} alt="" />
            <span>Application currently available only on Play Store. iOS coming soon.</span>
            <img src={logo} alt="" />
            <span>Application currently available only on Play Store. iOS coming soon.</span>
            <img src={logo} alt="" />
          </div>
        </div>
      </PageGap>
      <Page>
        <h1>
          Features
          <img src={logo} alt="" />
        </h1>
        <h2>
          What you get with HiringBull
        </h2>
        <div className="container1000">
          <div className="square-2">
            <div className="svgs">
              <div className="svg">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 24C18 18.477 22.477 14 28 14C33.523 14 38 18.477 38 24V31.5C38 33.433 38.784 35.285 40.18 36.68L41 37.5H15L15.82 36.68C17.216 35.285 18 33.433 18 31.5V24Z"
                    fill="#FFC107"
                  />

                  <path
                    d="M24 40C24 42.209 25.791 44 28 44C30.209 44 32 42.209 32 40H24Z"
                    fill="#FFB300"
                  />

                  <circle cx="28" cy="36.5" r="2" fill="#FFA000" />

                  <path
                    d="M22 24C22 21 24.5 18.5 28 18.5"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                  />

                  <path
                    d="M12 26C9 24 9 20 12 18"
                    stroke="#FFC107"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />

                  <path
                    d="M44 26C47 24 47 20 44 18"
                    stroke="#FFC107"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="title">
              Apply Before the Crowd Does - Get alerted when jobs go live - Only career page links
            </div>
            <div className="desc">
              We monitor company career pages and social channels so you can apply early, when there are dozens of applicants instead of thousands. Most jobs? You'll know in under 10 minutes. Tougher sites? We catch them from social posts, still way faster than manual searching.
            </div>
            <div className="tags">
              <div className="tag">150+ Companies</div>
              <div className="tag">Verified Career Page Links</div>
              <div className="tag">Within 10 Minutes</div>
            </div>
          </div>
          <div className="square">
            <div className="svgs">
              <div className="svg">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="28"
                    y="36"
                    text-anchor="middle"
                    font-size="24"
                    font-weight="800"
                    fill="#FFC107"
                    font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    3×
                  </text>
                </svg>
              </div>
            </div>
            <div className="title">
              Outreach with company employees and recruiters.
            </div>
            <div className="desc">
              Write what you need once we deliver it to verified employees in curated WhatsApp communities. To avoid spam, we limit to 3 requests a month.
            </div>
            <div className="tags">
              <div className="tag">3 times per month</div>
            </div>
          </div>
          <div className="square">
            <div className="svgs">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png" alt="" />
              <img src="https://store-images.s-microsoft.com/image/apps.15970.14375561300249796.05fe8c27-ce9e-4144-8702-0e81e2f575b1.042364cb-b745-4796-a520-61291e2dd6b9" alt="" />
              <img src="https://img.freepik.com/free-vector/twitter-app-new-logo-x-black-background_1017-45425.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
            </div>
            <div className="title">
              Discover hidden opportunities from real social posts.
            </div>
            <div className="desc">
              Catch posts like "my team is hiring," "DM for referral," or "looking for a React dev"—before they hit job boards. We share the authentic post URL so you can reach out directly.
            </div>
            <div className="tags">
              <div className="tag">Linkedin</div>
              <div className="tag">Reddit</div>
              <div className="tag">X</div>
            </div>
          </div>
          <div className="square">
            <div className="svgs">
              <div className="svg">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="28"
                    y="36"
                    text-anchor="middle"
                    font-size="22"
                    font-weight="800"
                    fill="#FFC107"
                    font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    1000
                  </text>
                </svg>
              </div>
            </div>
            <div className="title">
              Exclusive <br /> 1,000-member cap
            </div>
            <div className="desc">
              Early alerts only work when access is limited. The cap ensures members act before applications flood in.
            </div>
            <u>Make it easier — use a <b>referral code</b> to get a discount and priority access.</u>
            <div className="tags">
              <div className="tag">Exclusive Club</div>
            </div>
          </div>
          <div className="square">
            <div className="svgs">
              <div className="svg">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="28"
                    y="26"
                    text-anchor="middle"
                    font-size="16"
                    font-weight="800"
                    fill="#FFC107"
                    font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    100%
                  </text>

                  <text
                    x="28"
                    y="42"
                    text-anchor="middle"
                    font-size="16"
                    font-weight="800"
                    fill="#FFC107"
                    font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    OFF
                  </text>
                </svg>

              </div>
            </div>
            <div className="title">
              Get Placed. Get 100% Back.
            </div>
            <div className="desc">
              If you're confident in landing a job or internship, this is effectively your free ticket get placed during mentorship and we refund your membership payment.
            </div>
            <u><b>Terms apply</b> - eg. verify using official selection emails or offer letters.</u>
            <div className="tags">
              <div className="tag">100% Money Back</div>
            </div>
          </div>
        </div>

        <div className="request-feature">
          <div className="github-logo">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
          </div>
          <div className="text">
            Can't find a feature you need? <br /><b>Request it</b> and we'll built it for you! ❤️
          </div>
          <div className="hiringbull-logo">
            <img src={logoBig} alt="" />
          </div>
        </div>

      </Page>
      <PageBetween>
        <div className="line"></div>
        <img src={logo} alt="" />
        <div className="line"></div>
      </PageBetween>
      <Page>
        <h1>
          Why HiringBull Works
          <img src={logo} alt="" />
        </h1>
        <h2>
          Early access. Smaller competition. Real visibility.
        </h2>

        <Table>
          <div className="comparison-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th><img src={logoBig} alt="" /> </th>
                  <th><img src={social1} alt="" /></th>
                  <th><img src={social2} alt="" /></th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="aspect">{row.aspect}</td>

                    <td className={`cell ${row.hbType}`}>
                      <span className="icon">
                        {row.hbType == "good" ? "✅" : "✖️"}
                      </span>
                      {row.hiringbull}
                    </td>

                    <td className={`cell ${row.oType}`}>
                      <span className="icon">
                        {row.oType == "good" ? "✅" : "✖️"}
                      </span>
                      {row.others}
                    </td>

                    <td className={`cell ${row.gType}`}>
                      <span className="icon">
                        {row.gType == "good" ? "✅" : "✖️"}
                      </span>
                      {row.groups}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Table>

        {/* <div className="request-feature">
          <div className="github-logo">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
          </div>
          <div className="text">
            Can't find a feature you need? <br /><b>Request it</b> and we'll built it for you! ❤️
          </div>
          <div className="hiringbull-logo">
            <img src={logoBig} alt="" />
          </div>
        </div> */}

      </Page>
      <PageBetween>
        <div className="line"></div>
        <img src={logo} alt="" />
        <div className="line"></div>
      </PageBetween>
      <Page>
        <h1>
          Pricing & Membership Plans
          <img src={logo} alt="" />
        </h1>
        <h2>
          A small membership fee for a much larger advantage.
        </h2>

        <div className="container1000">
          <div className="square-pricing">
            <div className="title">Starter Plan - <i>1 Month</i></div>
            <div className="desc">Best for trying HiringBull</div>
            <div className="line"></div>
            <div className="price">
              <div className="current-amount">
                <span>₹199</span> / month
              </div>
              <div className="total-amount">
                ( 1 Month Access )
              </div>
            </div>
            <div className="advantage-points">
              <div className="point"><CheckCircleIcon /> Early alerts from verified career pages you select</div>
              <div className="point"><CheckCircleIcon /> Curated hiring signals from social posts</div>
              <div className="point"><CheckCircleIcon /> Up to 3 outreach requests per month</div>
            </div>
            <a href="#apply" className='apply-btn'>Apply for Membership <OfflineBoltIcon /></a>
          </div>
          <div className="square-pricing recommended">
            <div className="tag">Most Popular</div>
            <div className="title">Growth Plan - <i>3 Months</i></div>
            <div className="desc">Best for active job seekers</div>
            <div className="line"></div>
            <div className="price">
              <div className="current-amount">
                <span>₹149</span> / month
              </div>
              <div className="total-amount">
                ( 3 Month Access - <span>₹447</span> Total )
              </div>
            </div>
            <div className="advantage-points">
              <div className="point"><CheckCircleIcon /> All Starter features included</div>
              <div className="point"><CheckCircleIcon /> 100% money-back guarantee if placed*</div>
              <div className="point"><CheckCircleIcon /> Priority support</div>
            </div>
            <a href="#apply" className='apply-btn'>Apply for Membership <OfflineBoltIcon /></a>
          </div>
          <div className="square-pricing">
            <div className="title">Pro Plan - <i>6 Months</i></div>
            <div className="desc">Maximum Advantage 🔥</div>
            <div className="line"></div>
            <div className="price">
              <div className="current-amount">
                <span>₹119</span> / month
              </div>
              <div className="total-amount">
                ( 6 Month Access - <span>₹714</span> Total )
              </div>
            </div>
            <div className="advantage-points">
              <div className="point"><CheckCircleIcon /> All Growth features included</div>
              <div className="point"><CheckCircleIcon /> Free mock interviews with FAANG employees</div>
              <div className="point"><CheckCircleIcon /> Outreach feature priority</div>
            </div>
            <a href="#apply" className='apply-btn'>Apply for Membership <OfflineBoltIcon /></a>
          </div>
        </div>
      </Page>
    </Container >
  )
}

export default Landing

const Container = styled.div`
  width: 100vw; 
`

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

    display: flex; 
    align-items: center;  
    justify-content: space-between;
    padding: 0 50px;

    .left{
      width: 120px;
      height: 30px;

      display: flex;  
      align-items: center;
      cursor: pointer;

      text-transform: uppercase;
      font-size: 1.1rem;
      font-weight: 600; 
      letter-spacing: 1.5px;

      img{
        height: 26px;
        scale: 1.75;
        margin-right: 12px;
      }
    }

    .right{
      display: flex; 
      align-items: center; 
      gap: 25px;

      a{
        text-decoration: none; 
        color: black;
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
      }

      .type2{
        padding: 5px 15px;  
        border-radius: 100px;
        cursor: pointer;

        background-color: black;
        color: yellow;

        display: flex; 
        align-items: center; 
        gap: 5px;
      }

      svg{
        font-size: 1.25rem;  
        fill: yellow;
      }

      img{
        height: 25px;
        margin-top: 6px;
      }
    }
  }
`

const Page1 = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 85px);
  background-color: #fff; 

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img{
    height: 100px;
    margin-top: -60px;
  }

  .hero-title {
    font-size: clamp(2.8rem, 4vw, 3.8rem);
    line-height: 1.15;
    letter-spacing: 3.5px;
    text-align: center;
    
    max-width: 900px;
    margin: 0 auto;
    text-transform: uppercase;
    font-weight: 700;
    margin: 1rem 0;
  }
 
  .hero-subtitle {
    font-size: 1.65rem;
    font-weight: 200;
    line-height: 1.5;
    text-align: center;

    color: #333;
    
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    
    u{
      color: #333;
      font-weight: 400;
    }
  }

  .apply-btn{
    margin-top: 30px;
    padding: 12px 25px;
    background-color: black;    
    color: yellow;
    border-radius: 100px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;

    text-decoration: none;

    display: flex;
    align-items: center;
    gap: 8px;
  }

  svg{
    font-size: 1.5rem;  
    fill: yellow;
  }

  .dancing-scroll-action {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;

    animation: scrollBounce 1.8s ease-in-out infinite;
  }

  @keyframes scrollBounce {
    0% {
      transform: translate(-50%, 0);
      opacity: 0.6;
    }
    40% {
      transform: translate(-50%, 8px);
      opacity: 1;
    }
    80% {
      transform: translate(-50%, 0);
      opacity: 0.6;
    }
    100% {
      transform: translate(-50%, 0);
      opacity: 0.8;
    }
  }

  /* Optional: icon styling */
  .dancing-scroll-action svg {
    font-size: 4rem;
    fill: #888;
  }
`

const Page = styled.div`
  min-height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;   

  padding: 80px 80px;

  h1{
    font-size: 2.5rem;
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
    font-size: 1.5rem;
    font-weight: 300;
    text-align: center;
    margin-bottom: 16px;

  }

  .container1000{
    width: 1000px;

    margin: 40px 0;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 460px;
    gap: 24px;

    padding: 24px;
    box-sizing: border-box;

    /* Common square styles */
    .square,
    .square-2 {
      position: relative;
      background: #fff;
      border-radius: 28px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      border: 1px solid #f4eeee;

      padding: 25px;

      .svgs{
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .svg{
          width: 60px;
          height: 60px;
          display: flex; 
          align-items: center;  
          justify-content: center;  
          /* background-color: #d3d3d352; */
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-right: 15px;

          background-color: #fff5cc;
        } 

        img{
          width: 40px;
          height: 40px;
          margin-right: 15px;
          border-radius: 8px;
        }
      }
      
      .title{
        font-size: 1.5rem;
        font-weight: 600;
        text-align: left;
        margin-top: 15px;
      }

      .desc{
        margin-top: 15px;
        font-size: 1rem;
        font-weight: 300;
        color: #555;
        text-align: left;
      }

      u{
        color: #555;
        font-weight: 200; 
        margin-top: 10px;  
        font-size: 0.85rem;
        font-style: italic;

        b{
          font-weight: 400;
        }

        text-align: left;
        display: block; 
      }

      .tags{
        display: flex;  
        align-items: center;
        gap: 10px;
        margin-top: 20px;

        position: absolute;
        bottom: 20px;

        .tag{
          padding: 7.5px 15px;
          background-color: #ffefc1;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #b8860b;
        }
      }

    }
      
      /* Large rectangle (spans 2 columns) */
    .square-2 {
      grid-column: span 2;
    }

    .square-pricing{
      position: relative;
      background: #fff;
      border-radius: 28px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      border: 1px solid #f4eeee;

      padding: 25px;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      .title{
        font-size: 1rem;
        font-weight: 600;
        text-align: left;
        /* padding: 10px 20px; */
        /* background-color: #a6f0b9; */
        /* border-radius: 100px; */

        i{
          font-weight: 300;
        }
      }

      .desc{
        margin-top: 5px;
        font-size: 0.9rem;
        font-weight: 300;
        color: #555;
        text-align: left;
      }

      .line{
        height: 1px;
        width: 100%;

        background-color: #cccccc;

        margin: 15px 0;
      }

      .price{
        .current-amount{
          font-size: 0.85rem;
          font-weight: 300;
          letter-spacing: 0rem;

          span{
            font-size: 1.5rem;
          }
        }

        .total-amount{
          font-size: 0.85rem;
          font-weight: 300;
          margin-top: 5px;
        }


        span{
          font-weight: 600;
          letter-spacing: 0.1rem;

          font-family: 'Inter', system-ui, sans-serif;
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
        }
      }

      .advantage-points{
        .point{
          display: flex;
          align-items: center;

          font-size: 0.85rem;
          font-weight: 300;
          margin-top: 10px;

          svg{
            margin-right: 10px;
            font-size: 1rem;
          }
        }
      }

      .apply-btn{
        position: absolute;
        width: calc(100% - 50px);
        bottom: 25px;
        padding: 12px 25px;
        background-color: black;    
        color: #ffff00c4;
        border-radius: 100px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;

        opacity: 0.75;

        text-decoration: none;

        display: flex;
        align-items: center;
        gap: 8px;
        
        svg{
          font-size: 1.5rem;  
          fill: #ffff00c4;
        }

        &:hover{
          opacity: 1;
          transition-duration: 250ms;
          color: yellow;

          svg{
            fill: yellow;
          }
        }
      }

    }

    .recommended{
      border: 2px solid #ffb300;
      scale: 1.05;
      background-color: #ffb30003;

      .tag{
        background-color: #ffb300;
        color: #fff; 

        left: calc(50% - 50px);

        position: absolute;
        top: -12.5px;
        padding: 5px 15px;
        font-size: 0.75rem;
        font-weight: 600;

        border-radius: 100px;
      }

      .apply-btn{
        opacity: 0.85;
      }
    }

    /* ---------------- SHRINK ---------------- */
    @media (max-width: 1120px) {
      width: calc(100vw - 40px);
      grid-template-columns: 1fr;

      .square, .square-2 {
        height: auto;
      }

      .square-2 {
        grid-column: span 1;
      }
    }
  }

  .request-feature{
    margin: 40px auto 0 auto;

    width: 600px;
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    gap: 15px;

    padding: 15px 25px;
    border-radius: 100px;  
    background: #fff;
    border-radius: 1000px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border: 1px solid black;

    .github-logo{
      width: 40px;
      height: 40px;

      img{
        width: 40px;
        height: 40px;
      }
    }

    .text{
      font-size: 1rem;
      font-weight: 300;
      color: #333;

      margin: 0 10px;
    } 

    .hiringbull-logo{
      height: 40px;

      img{
        height: 100%;
      }
    }

    @media (max-width: 800px){
      width: calc(100% - 40px);

      .github-logo{
        img{
          height: 50px;
          width: 50px;
        }
      }

      .hiringbull-logo{
        height: 50px;

        img{
          margin: 0;
          height: 50px;
        }
      }
    }
  }
`

const PageGap = styled.div`
  height: 40px;
  background-color: #222;

  display: flex;
  align-items: center;
  overflow: hidden;

  .ticker {
    display: flex;
    width: max-content;
    animation: scroll-left 25s linear infinite;
  }

  .ticker__content {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    padding-right: 40px;
  }

  span {
    font-size: 0.85rem;
    font-weight: 500;
    font-style: italic;
    color: white;
  }

  img {
    height: 32px;
    margin: 0 20px;
    vertical-align: middle;
  }

  @keyframes scroll-left {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

const PageBetween = styled.div`
  width: 100vw;
  height: 60px;
  
  display: flex;  
  align-items: center;  
  justify-content: center;

  padding: 0 60px;

  .line {
    flex: 1;
    height: 1px;
    background-color: #ccc;
    margin: 40px auto;
  } 

  img{
    height: 40px;
    margin: 0 20px;
  }
`

const Table = styled.div`
  width: 100%;
  margin-top: 40px;

  /* Wrapper for mobile responsiveness */
  .comparison-wrapper {
    width: 100%;
    overflow-x: auto;
    border-radius: 12px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border: 1px solid black;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px; /* Ensures columns don't get too narrow on mobile */
    background-color: #ffffff;
    table-layout: fixed; /* Enforces equal width logic unless specified */
  }

  /* --- Header Styling --- */
  thead tr {
    background-color: #ffffff;
  }

  th {
    padding: 1rem 1.25rem;
    text-align: left;
    font-size: 0.95rem;
    /* text-transform: uppercase; */
    font-weight: 600;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    color: #4b5563;

    img{
      height: 40px;
      margin-bottom: -10px;
    }
  }
  
  .compare-company{
    display: flex;
    align-items: center;
    
    img{
      height: 40px;
    }
  }

  th:first-child {
    border-left: none;
  }

  /* --- Row & Cell Styling --- */
  td {
    padding: 1.25rem;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #4b5563;
    border-bottom: 1px solid #000;
    
    /* Key for variable row heights: align text to top */
    vertical-align: top; 
  }

  /* Remove border from last row */
  tbody tr:last-child td {
    border-bottom: none;
  }

  /* Aspect Column (First Column) Styling */
  .aspect {
    width: 20%; /* Fixed width for the label column */
    font-weight: 600;
    background-color: #ffffff;
  }

  /* --- Status Logic (Good/Bad/Warn) --- */
  .cell {
    position: relative;
    transition: background-color 0.2s ease;
    border-left: 1px solid #000;
  }

  /* Good State */
  .good {
    background-color: #f0fdf4; /* Very light green bg */
    color: #15803d;
  }
  
  /* Bad State */
  .bad {
    background-color: #e28282; /* Very light red bg */
    color: #b91c1c;
  }

  /* Warn State */
  .warn {
    background-color: #f9d0d0; /* Very light yellow bg */
    color: #b45309;
  }

  /* --- Icon Styling --- */
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-weight: 800;
    font-size: 1.1em;
  }

  /* Specific icon colors if you want them to pop more than text */
  .good .icon { color: #16a34a; }
  .bad .icon { color: #dc2626; }
  .warn .icon { color: #d97706; }

  /* --- Mobile Tweak --- */
  @media (max-width: 768px) {
    th, td {
      padding: 1rem;
    }
  }
`;