import React, { useContext } from 'react';
import { VotingContext } from '../context/VotingContext';
import styles, { layout } from "../styles";
import { features } from "../constants";

const Services = () => {
    const {voteNum, usersNum,minutes ,hours,days}  = useContext(VotingContext);

    const FeatureCard = ({ icon, title, content, index }) => (
        <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
          <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
            <img src={icon} alt="star" className="w-[80%] h-[80%] object-contain" />
          </div>
          <div className="flex-1 flex flex-col ml-3">
            <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
              {title}
            </h4>
            <p className="fotn-semibold stats-gradient text-white text-[16px] leading-[24px]">
              {content}
            </p>
          </div>
        </div>
      );

    return (
        <div className="flex w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-start justify-between  px-4">
                <div className=" flex flex-3 justify-start flex-col mf:mr-60">
                    <h1 className='text-white text-3xl sm:text-5xl py-2  text-center '>
                        Everything becomes digital
                    </h1>
                    <section className="counters items-center">
                        <div className="container">
                            <div>
                                {/* <div className="counter font-semibold text-4xl" data-target="60000">{usersNum}</div> */}
                                <div className="counter font-semibold text-4xl" data-target="60000">121.000+</div>
                                <h3 className='stats-gradient font-semibold text-2xl'>Registered</h3>
                            </div>
                            <div>
                                <div className="counter font-semibold text-4xl" data-target="15000">1200+</div>
                                <h3 className='stats-gradient font-semibold text-2xl'>Voted</h3>
                            </div>
                            <div>
                                <div className="counter font-semibold text-4xl" data-target="15000">1500+</div>
                                <h3 className='stats-gradient font-semibold text-2xl'>Active Users</h3>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 py-2">
                    <section id="features" className={layout.section}>
                        <div className={`${layout.sectionImg} flex-col`}>
                            {features.map((feature, index) => (
                                <FeatureCard key={feature.id} {...feature} index={index} />
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}

export default Services;