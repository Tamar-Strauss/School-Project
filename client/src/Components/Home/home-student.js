import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import courses from '../../images/Courses.jpg'
import exams from '../../images/exams.jpg'
import learning from '../../images/learning.jpg'
import Menu from '../menu/menu';

export default function HomeStudent() {

  const navigate = useNavigate();

  const images = [
    // {
    //   url: exams,
    //   title: 'Exam',
    //   width: '33%',
    //   nav: '/tests'
    // },
    {
      url: learning,
      title: 'Learning - My Courses',
      width: '50%',
      nav: `/courses/students/my-courses`
    },
    {
      url: courses,
      title: 'Courses',
      width: '50%',
      nav: '/courses'
    },
  ];

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  })
  );


  return (

    <div className='card' style={{height: '100%'}}>
      <Menu />
      <div className='card' style={{ marginTop: '10%' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
          {images.map((image) => (
            <ImageButton onClick={() => { navigate(`${image.nav}`) }}
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                        <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: 'relative',
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              fontSize: '1.5rem', // גודל הגופן
              fontWeight: 'bold', // הדגשה
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', // הצללה לטקסט
              letterSpacing: '0.1rem', // ריווח בין אותיות (אופציונלי)
            }}
          >
            {image.title}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </div>
    </div>
  );
}