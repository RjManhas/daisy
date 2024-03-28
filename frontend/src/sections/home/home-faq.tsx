import React, { useRef, useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqsCardProps {
  faqsList: FaqItem;
  idx: number;
}

const FaqsCard: React.FC<FaqsCardProps> = ({ faqsList, idx }) => {
  const answerElRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<boolean>(false);
  const [answerH, setAnswerH] = useState<string>('0px');

  const handleOpenAnswer = () => {
    if (answerElRef.current) {
      //@ts-ignore
      const answerElH = answerElRef.current.childNodes[0].offsetHeight;
      setState(!state);
      setAnswerH(`${answerElH + 20}px`);
    }
  };

  return (
    <div className="space-y-3 mt-5 overflow-hidden border-b" key={idx} onClick={handleOpenAnswer}>
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-[#DFE3E8] font-medium">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: '0px' }}
      >
        <div>
          <p className="text-[#C4CDD5]">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeFAQ() {
  const faqsList: FaqItem[] = [
    {
      q: 'IS THE PRODUCT CURRENTLY SAFE / UPDATED?',
      a: 'Please always check our status page before opening a ticket and asking.',
    },
    {
      q: 'THE PRODUCT IS NOT WORKING, WILL I RECEIVE COMPENSATION?',
      a: 'Yes, of course! Every active subscription is compensated once the product is fully tested and updated. Please remember that every user receives compensation at the same time, and the countdown for the compensation period starts after daisy is updated, not when you log in to the loader.',
    },
    {
      q: 'CAN I GET A REFUND?',
      a: "if our product doesn't work on your PC and our staff team has tried every possible solution without success, and you case meets our refund policy then you will be eligible for a refund. It's worth noting that from our experience, our software works on 99.9% of PCs!			",
    },
    {
      q: 'CAN I USE IT ON MY MAIN ACCOUNT?',
      a: `We don't recommend using it on your main account because every software, not just daisy, can be detected at any moment, regardless of how private or unique the software may be. If not detected, there's still a risk that your account could be manually banned. We will not refund you, or provide any new accounts if you do recive a gameban. Please take a look at our TOS or contact our support team.`,
    },
    {
      q: 'I WANT TO BE A MEDIA CREATOR.',
      a: 'Please make a support ticket on our discord server daisy.ac/discord and we will be more then happy to look at your application.',
    },
    {
      q: 'I WANT TO BE A RESELLER.',
      a: 'Please make a support ticket on our discord server daisy.ac/discord and we will be more then happy to look at your application. NOTICE: we will only accept you if you already have a community.',
    },
    {
      q: 'CAN I SHARE / SELL MY LOADER ACCOUNT TO SOMEONE?',
      a: 'No, you are not allowed to share or sell your account with anyone. If we see any actions like that, we will permanently ban all of your accounts from Daisy. We have systems in place, do not try to get around our system.',
    },
  ];

  return (
    <Box
      sx={{
        textAlign: 'center',
        bgcolor: 'grey.900',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <Container component={MotionViewport}>
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
          <m.div variants={varFade().inUp} className="space-y-3 text-center">
            <h1 className="text-3xl text-[#F4F6F8] font-semibold">Frequently Asked Questions</h1>
            <p className="text-[#DFE3E8] max-w-lg mx-auto text-lg">
              Answered all frequently asked questions, Still confused? feel free to contact us.
            </p>
          </m.div>
          <m.div variants={varFade().inUp} className="mt-14 max-w-2xl mx-auto">
            {faqsList.map((item, idx) => (
              <FaqsCard key={idx} idx={idx} faqsList={item} />
            ))}
          </m.div>
        </section>
      </Container>
    </Box>
  );
}
