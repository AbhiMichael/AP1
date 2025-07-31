import { Paper, Stack, Typography,Avatar ,Button,IconButton, Box, useTheme, useMediaQuery} from '@mui/material'
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router';
export default function RightComponent() {

  const [currentImage, setCurrentImage] = useState('/windmill.jpg');
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const items = [
    { name: 'Windmills Loft', percent: 25, color: '#888', up: true, image: '/windmill.jpg' },
    { name: 'Seaview Villa', percent: 18, color: '#888', up: false, image: '/seavieww.jpg' },
    { name: 'Family Villa', percent: 12, color: '#888', up: false, image: '/family.jpg' }, 
  ];

  return (
    
<Box sx={{
              width: {xs:'100%' ,lg: 350},
              flexShrink: 0
            }}>
              <Box borderRadius={4} overflow="hidden" mb={3}>
                <img
                  src={currentImage}
                  alt="Selected"
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    maxHeight: isMediumScreen ? '250px' : '350px', 
                    objectFit: 'cover' 
                  }}
                />
              </Box>

              <Paper sx={{ p: isSmallScreen ? 1 : 3, borderRadius: 4 }}>
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Box display="flex" bgcolor="#fbfbfb" borderRadius={8} p={0.5}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#c3ebf4',
                        color: '#333',
                        borderRadius: 6,
                        px: 4,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#000', color: '#fff' }
                      }}
                    >
                      Objects
                    </Button>
                    <Button variant="text" sx={{ color: '#000', px: 3, textTransform: 'none' }}>
                      Relators
                    </Button>
                  </Box>
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>

                <Stack spacing={2}>
                  {items.map((item, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setCurrentImage(item.image)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: item.color === '#000' ? '#000' : '000',
                        color: item.color === '#575656ff' ? '#000' : '#575656ff',
                        p: 2,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': { backgroundColor: '#000000ff' }
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={item.image} sx={{ width: 32, height: 32 }} />
                        <Typography variant={isSmallScreen ? "body2" : "body1"}>{item.name}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Typography variant={isSmallScreen ? "body2" : "body1"}>{item.percent}%</Typography>
                        {item.up ? <ArrowDropUpIcon color="success" /> : <ArrowDropDownIcon color="error" />}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Paper>
    </Box>
            
  )
}