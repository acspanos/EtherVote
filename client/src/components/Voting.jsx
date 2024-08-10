import React, { useEffect, useState, useRef } from 'react';

const Voting = () => {

    const [ days, setDays ] = useState(0);
    const [ hours, setHours ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);

    const calcTime = async () => {
        const dt1 = new Date();
        const dt2 = new Date("Jully 18, 2023 20:00:00");
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        var days = parseInt(diff/(60*60*24),10);
        diff-=(days*60*60*24);
        var hours=parseInt((diff/(60*60)),10);days*24;
        diff-=(hours*60*60);
        var minut=parseInt(diff/60,10);
        setMinutes(minut);
        setHours(hours);
        setDays(days);
    }

    useEffect(() => {
        calcTime();
    }, []);

    return (
        
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-voting">
        <div className="flex flex-col md:p-6 py-2 px-4">
                <h3 className="text-3xl sm:text-5xl text-white text-center my-2">
                   Ballots closing
                </h3>
                <section className="counters2 items-center">
                        <div className="container">
                            <div>
                            <div className="px-20 text-3xl sm:text-5xl counter font-semibold" data-target="60000">{days}</div>
                                <h3 className='stats-gradient font-semibold sm:text-2xl'>Days</h3>
                            </div>
                            <div>
                            <div className="text-3xl sm:text-5xl counter font-semibold  px-10" data-target="60000">{hours}</div>
                                <h3 className='stats-gradient font-semibold sm:text-2xl'>Hours</h3>
                            </div>
                            <div>
                            <div className="text-3xl sm:text-5xl counter font-semibold px-10" data-target="60000">{minutes}</div>
                                <h3 className='stats-gradient font-semibold sm:text-2xl'>Minutes</h3>
                            </div>
                        </div>
                    </section>
        </div>
    </div>
    );
}

export default Voting;