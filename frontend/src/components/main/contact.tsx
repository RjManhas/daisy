import { m } from 'framer-motion';
import { varFade } from '../animate/variants/fade';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography/Typography';
import Button from '@mui/material/Button/Button';
import { paths } from 'src/routes/paths';
import Container from '@mui/material/Container/Container';
import MotionViewport from '../animate/motion-viewport';

export default function StillQuestions() {
  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          bgcolor: 'grey.900',
          pt: { xs: 10, md: 15 },
          pb: { xs: 10, md: 20 },
        }}
      >
        <Container component={MotionViewport}>
          <m.div variants={varFade().in}>
            <Box
              sx={{
                textAlign: 'center',
                mt: {
                  xs: 5,
                  md: 10,
                },
              }}
            >
              <m.div variants={varFade().inDown}>
                <Typography variant="h4">Still have questions?</Typography>
              </m.div>

              <m.div variants={varFade().inDown}>
                <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
                  Feel free to contact us!
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Button
                  color="inherit"
                  size="large"
                  variant="contained"
                  href={paths.social.discord}
                >
                  Contact us
                </Button>
              </m.div>
            </Box>
          </m.div>
        </Container>
      </Box>
    </>
  );
}
