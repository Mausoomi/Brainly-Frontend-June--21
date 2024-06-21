import * as React from "react";
import '../../Styles/ourkey.css'
import ourkey1 from '../../Assets/Images/our-key-1.png';
import ourkey2 from '../../Assets/Images/our-key-2.png';
import ourkey3 from '../../Assets/Images/our-key-3.png';
import ourkey4 from '../../Assets/Images/our-key-4.png';
import Heading from "../Heading";

function OurKey() {
    return (
        <div className="flex flex-col sm:mt-20 sm:mb-20 mt-8 mb-0 bg-our-key mx-4">
          <Heading blueText="OUR KEY" whiteText="Features"/>
          
            <div className="justify-between mt-12 w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 mx-10 max-md:flex-col max-md:gap-0 max-md:mx-0 items-baseline">
                    <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-5 tracking-normal text-center sm:mt-10 mt-0 max-md:max-w-full ourKeyBox">
                            <img
                                alt=""
                                loading="lazy"
                                src={ourkey1}
                                className="self-center max-w-full rounded-full aspect-square w-[100px]  hideImage"
                            />
                            <div className="mt-8 font-poppins font-bold test-shadow text-[28px] bg-clip-text bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] max-md:max-w-full">
                                Enhancing Recall through Imagery
                            </div>
                            <div className="mt-8  opacity-80 font-poppins sm:text-base text-xs font-medium leading-5 text-zinc-300 max-md:max-w-full">
                                Visualize to Memorize: Brainy Lingo boosts vocabulary retention
                                with vivid imagery and stories, inspired by 'Image
                                Creation—Picture' research. This approach strengthens
                                word-meaning connections, enhancing recall through engaging
                                visual exercises.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col items-center self-stretch px-5 my-auto tracking-normal text-center max-md:mt-10 max-md:max-w-full ourKeyBox">
                            <img
                                alt=""
                                loading="lazy"
                                src={ourkey2}
                                className="max-w-full rounded-full aspect-square w-[100px]  hideImage"
                            />
                            <div className="mt-8 font-poppins font-bold test-shadow text-[28px] font-bold bg-clip-text bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] max-md:max-w-full">
                                Effective Reinforcement
                            </div>
                            <div className="self-stretch opacity-80 font-poppins mt-8  sm:text-base text-xs  font-medium leading-5 text-zinc-300 max-md:max-w-full">
                                Mistakes Mastered! With spaced repetition algorithms, Brainy
                                Lingo ensures that learning sticks by revisiting challenging
                                words at just the right times, making revision targeted and
                                effective.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="justify-between w-full sm:mt-10 mt-0  max-md:max-w-full">
                <div className="flex gap-5 mx-10 max-md:flex-col max-md:gap-0 max-md:mx-0">
                    <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow px-5 tracking-normal text-center max-md:mt-10 max-md:max-w-full ourKeyBox">
                            <img
                                alt=""
                                loading="lazy"
                                src={ourkey3}
                                className="self-center max-w-full rounded-full aspect-square w-[100px]  hideImage"
                            />
                            <div className="mt-8 font-poppins font-bold test-shadow text-[28px] font-bold bg-clip-text bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] max-md:max-w-full">
                                Efficiency and Accessibility
                            </div>
                            <div className="mt-8 opacity-80 sm:text-base text-xs font-poppins font-medium leading-5 text-zinc-300 max-md:max-w-full">
                                Saving Time and Money! Brainy Lingo delivers daily tailored
                                vocabulary exercises, eliminating the need for expensive tuition
                                and fitting learning into busy schedules.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col font-poppins grow items-center px-5 tracking-normal text-center max-md:mt-10 max-md:max-w-full ourKeyBox">
                            <img
                                alt=""
                                loading="lazy"
                                src={ourkey4}
                                className="max-w-full rounded-full aspect-square w-[100px]  hideImage"
                            />
                            <div className="mt-8 font-poppins font-bold test-shadow text-[28px] font-bold bg-clip-text bg-[linear-gradient(93deg,#761DE8_-2.94%,#29BDEC_56.14%)] max-md:max-w-full">
                                Motivation and Engagement
                            </div>
                            <div className="self-stretch opacity-80 mt-8  sm:text-base text-xs  font-poppins text-lg font-medium leading-5 text-zinc-300 max-md:max-w-full">
                                Climb the Ranks! Brainy Lingo's leaderboard fuels a friendly
                                competitive spirit, motivating children to outdo themselves and
                                others in vocabulary practice, turning learning into an exciting
                                challenge.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurKey