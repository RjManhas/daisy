import { Box } from '@mui/system';
import Container from '@mui/system/Container';
import MotionViewport from 'src/components/animate/motion-viewport';
import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import { varFade } from 'src/components/animate';
import { m } from 'framer-motion';

export default function HomeCTAProducts() {
  const theme = useTheme();
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
        <m.div variants={varFade().inUp} className="space-y-3 text-center">
          <div className="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <h2
              className={`text-3xl font-extrabold text-[${theme.palette.text.primary}] sm:text-4xl`}
            >
              <span className="block">Want to see what we can offer</span>
              <span className={`block text-[#4756c8]`}>It&#x27;s today or never.</span>
            </h2>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <m.div variants={varFade().inUp} className="inline-flex rounded-md shadow">
                <a
                  type="button"
                  href={paths.dashboard.shop.root}
                  className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Get started
                </a>
              </m.div>
            </div>
          </div>
        </m.div>
      </Container>
    </Box>
  );
}
