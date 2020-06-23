import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import Banner from "../../images/bannerfreelancer.png";
import FreelanceImg from "../../images/unsplash4.jpg";
import JobseekeriMG from "../../images/unsplash3.jpg";
import RecruiterImg from "../../images/unsplash1.jpg";
import howitworkspng from "../../images/howitworks.png";
import manoncomputer1png from "../../images/manoncomputer1.png";
import whyloudpng from "../../images/whyloud.png";
import missionpng from "../../images/mission.png";
import ProjectOwnerImg from "../../images/unsplash2.jpg";
import projectownerlady from "../../images/project ownerlady.png";
import recruiterbanner from "../../images/recriterbanner.png";
import jobseekerguy from "../../images/jobseekerguy.png";
import SyselfButton from "../../components/SyselfButton/SyselfButton";
import classes from "./Home.module.css";
import BannerContent from "./BannerContent";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  let [index, changeindex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      changeindex((index) => {
        console.log(index);
        if (index === 3) {
          return 0;
        }
        return index + 1;
      });
    }, 9000);
    return () => clearInterval(interval);
  }, []);
  const { regComplete, email } = useContext(AuthContext);

  return (
    <Layout showFooter>
      <div className={classes.Home}>
        <div
          className={classes.BannerCont}
          style={{
            background:
              index === 0
                ? "#fe998a"
                : index === 1
                ? "#fa6c56"
                : index === 2
                ? "#f55748"
                : "#da2f3c",
          }}
        >
          <img src={Banner} alt="banner" />

          <BannerContent
            title="Freelancer"
            visibilityindex={0}
            currentindex={index}
            description="Loudinsight freelancer options give you the opportunity to get
    short term jobs that are in your area of expertises"
            img={manoncomputer1png}
          />

          <BannerContent
            title="Project owner"
            visibilityindex={1}
            currentindex={index}
            description="Become a loud insight project owner, post a project for bid and get in touch with the best freelancer"
            img={projectownerlady}
          />

          <BannerContent
            title="Jobseekers"
            visibilityindex={2}
            currentindex={index}
            description="Become a loud insight Jobseeker,apply for jobs, develop your CV and get discovered by Recruiters with little effort"
            img={jobseekerguy}
          />
          <BannerContent
            title="Recruiter"
            visibilityindex={3}
            currentindex={index}
            description="Become a loud insight recruiter, post a project for bid and get in touch with the best freelancer"
            img={recruiterbanner}
          />
        </div>
        {/* RANGE OF CATEGORIES */}

        {regComplete === false && email ? (
          <div className={classes.CompleteReg}>
            <h2>Hi {email}, please complete your registration </h2>
            <SyselfButton
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Continue
            </SyselfButton>
          </div>
        ) : null}
        <div className={classes.rangeOfCategories}>
          <div className={classes.rangeOfCategoriesCont}>
            <div className={classes.RangeLeft}>
              <h1>Check out our range of categories</h1>
            </div>
            <div className={classes.RangeRight}>
              <p>Programming</p>
              <p>Graphics design</p>
              <p>Video editing</p>
              <p>Voice acting</p>
              <p>E-book editing</p>
              <p>Song writing</p>
              <p>Engineering</p>
              <p>Law</p>
            </div>
          </div>
        </div>

        {/* FREELANCE SECTION */}
        <div className={classes.FreelanceSection}>
          <div className={classes.FreelanceCont}>
            <div className={classes.Left}>
              <img src={FreelanceImg} alt="freelanceimage" />
            </div>
            <div className={classes.Right}>
              <div className={classes.TopContainer}>
                <h1>
                  Join us as a{" "}
                  <span className={classes.userType}>Freelancer</span>
                </h1>
                <p>
                  Join us as a freelancer and build great things with our sea of
                  project owners waiting to have access to your talent.
                </p>
              </div>
              <div className={classes.ButtonCont}>
                <SyselfButton>Join</SyselfButton>
              </div>
            </div>
          </div>
        </div>

        {/* JOB SEEKER */}

        <div
          className={[classes.JobSeekerSection, classes.lightpeach].join(" ")}
        >
          <div className={classes.JobseekerCont}>
            <div className={classes.Right}>
              <div className={classes.TopContainer}>
                <h1>
                  Join us as a{" "}
                  <span className={classes.userType}>Jobseeker</span>
                </h1>
                <p>
                  Join us as a freelancer and build great things with our sea of
                  project owners waiting to have access to your talent.
                </p>
              </div>
              <div className={classes.ButtonCont}>
                <SyselfButton>Join</SyselfButton>
              </div>
            </div>
            <div className={classes.Left}>
              <img src={JobseekeriMG} alt="freelanceimage" />
            </div>
          </div>
        </div>
        {/*RECRUITER */}
        <div className={classes.RecruiterSection}>
          <div className={classes.RecruiterCont}>
            <div className={classes.Left}>
              <img src={RecruiterImg} alt="freelanceimage" />
            </div>
            <div className={classes.Right}>
              <div className={classes.TopContainer}>
                <h1>
                  Join us as a{" "}
                  <span className={classes.userType}>Recruiter</span>
                </h1>
                <p>
                  Join us as a freelancer and build great things with our sea of
                  project owners waiting to have access to your talent.
                </p>
              </div>
              <div className={classes.ButtonCont}>
                <SyselfButton>Join</SyselfButton>
              </div>
            </div>
          </div>
        </div>

        {/* */}

        <div
          className={[classes.ProjectOwnerSection, classes.lightpeach].join(
            " "
          )}
        >
          <div className={classes.ProjectOwnerCont}>
            <div className={classes.Right}>
              <div className={classes.TopContainer}>
                <h1>
                  Join us as a{" "}
                  <span className={classes.userType}>Project Owner</span>
                </h1>
                <p>
                  Join us as a freelancer and build great things with our sea of
                  project owners waiting to have access to your talent.
                </p>
              </div>
              <div className={classes.ButtonCont}>
                <SyselfButton>Join</SyselfButton>
              </div>
            </div>
            <div className={classes.Left}>
              <img src={ProjectOwnerImg} alt="freelanceimage" />
            </div>
          </div>
        </div>

        {/* About us */}

        <div className={classes.AboutUs}>
          <h2>About Us</h2>

          <div className={classes.ThreeFlexRow}>
            <div className={classes.Segment}>
              <img src={howitworkspng} alt="" />
              <h2 className={classes.Title}>How it works</h2>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                eaque soluta suscipit repudiandae veritatis quibusdam, hic
                pariatur? Libero aperiam similique cumque eveniet officia
                numquam eligendi accusamus asperiores fugit laudantium. Rerum?
              </p>
            </div>
            <div className={classes.Segment}>
              <img src={missionpng} alt="" />
              <h2 className={classes.Title}>Why Loudinsight</h2>
              <p>
                Many Employers and Project Owners in the World face challenges
                with finding the right talents, from suitable qualifications, to
                team dynamics, to economics that fit their financial scale. Our
                unique solution or platform addresses all of these concerns.
                With LoudInsight, any employer or project owner can fuel hiring
                success by accessing talent’s deep profile and portfolio to help
                make an informed decision.
              </p>
            </div>
            <div className={classes.Segment}>
              <img src={whyloudpng} alt="" />
              <h2 className={classes.Title}>Our Mission</h2>
              <p>
                On a mission to give Jobseekers and Freelancers all over the
                world the platform to showcase their talents
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
