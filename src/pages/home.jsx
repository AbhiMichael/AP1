import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Chip, 
  TextField, 
  InputAdornment, 
  IconButton,
  Paper,
  Avatar,
  Divider,
  Stack
} from '@mui/material';
import { 
  Search, 
  LocationOn, 
  Bed, 
  Bathtub, 
  SquareFoot, 
  Favorite, 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Home,
  Apartment,
  Villa,
  Commercial
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AutoRotatingCarousel } from '@mui/lab';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E3B55',
    },
    secondary: {
      main: '#FF5A5F',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h4: {
      fontWeight: 600,
    },
  },
});

const properties = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    price: '$450,000',
    location: 'New York, NY',
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  },
  {
    id: 2,
    title: 'Luxury Villa with Ocean View',
    price: '$1,250,000',
    location: 'Miami, FL',
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  },
  {
    id: 3,
    title: 'Cozy Suburban Home',
    price: '$325,000',
    location: 'Austin, TX',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  },
  {
    id: 4,
    title: 'Penthouse with City Views',
    price: '$2,100,000',
    location: 'Chicago, IL',
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  },
];

const services = [
  { icon: <Home fontSize="large" />, title: 'Residential', description: 'Find your perfect home from our extensive listings of houses and apartments.' },
  { icon: <Apartment fontSize="large" />, title: 'Commercial', description: 'Office spaces, retail locations, and other commercial properties.' },
  { icon: <Villa fontSize="large" />, title: 'Luxury', description: 'High-end properties with premium amenities and locations.' },
  { icon: <Commercial fontSize="large" />, title: 'Investment', description: 'Properties with great potential for return on investment.' },
];

const testimonials = [
  { 
    name: 'Sarah Johnson', 
    role: 'Home Buyer', 
    content: 'The team made the entire home buying process seamless. Found my dream home in just 2 weeks!', 
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg' 
  },
  { 
    name: 'Michael Chen', 
    role: 'Investor', 
    content: 'Great insights into the local market. Helped me identify properties with excellent ROI potential.', 
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg' 
  },
  { 
    name: 'Emily Rodriguez', 
    role: 'Seller', 
    content: 'Sold my property above asking price in just 5 days. Highly recommend their services!', 
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg' 
  },
];

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1 }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main' }}>
                EliteHomes
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <Button color="inherit">Buy</Button>
                <Button color="inherit">Rent</Button>
                <Button color="inherit">Sell</Button>
                <Button color="inherit">Agents</Button>
                <Button variant="contained" color="primary">Contact</Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Section */}
        <Box sx={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 10,
          textAlign: 'center'
        }}>
          <Container maxWidth="lg">
            <Typography variant="h1" component="h1" gutterBottom>
              Find Your Dream Home
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
              Discover the perfect property that matches your lifestyle
            </Typography>
            
            <Paper elevation={3} sx={{ p: 2, maxWidth: 800, mx: 'auto', backgroundColor: 'rgba(255,255,255,0.9)' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Location"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    select
                    SelectProps={{ native: true }}
                    placeholder="Property Type"
                  >
                    <option value="">Any Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    select
                    SelectProps={{ native: true }}
                    placeholder="Price Range"
                  >
                    <option value="">Any Price</option>
                    <option value="1">$0 - $300,000</option>
                    <option value="2">$300,000 - $600,000</option>
                    <option value="3">$600,000 - $1,000,000</option>
                    <option value="4">$1,000,000+</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    startIcon={<Search />}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>

        {/* Featured Properties */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Featured Properties
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Explore our handpicked selection of premium properties
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {properties.map((property) => (
              <Grid item key={property.id} xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={property.image}
                      alt={property.title}
                    />
                    <Chip 
                      label="Featured" 
                      color="secondary" 
                      size="small" 
                      sx={{ 
                        position: 'absolute', 
                        top: 10, 
                        left: 10,
                        fontWeight: 'bold'
                      }} 
                    />
                    <IconButton 
                      aria-label="add to favorites"
                      sx={{ 
                        position: 'absolute', 
                        top: 10, 
                        right: 10,
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.3)'
                      }}
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {property.title}
                    </Typography>
                    <Typography color="primary" fontWeight="bold" gutterBottom>
                      {property.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {property.location}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography variant="body2">
                        <Bed fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {property.beds} beds
                      </Typography>
                      <Typography variant="body2">
                        <Bathtub fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {property.baths} baths
                      </Typography>
                      <Typography variant="body2">
                        <SquareFoot fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {property.sqft} sqft
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" fullWidth>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button variant="outlined" color="primary" size="large">
              View All Properties
            </Button>
          </Box>
        </Container>

        {/* Services Section */}
        <Box sx={{ backgroundColor: '#f5f7fa', py: 8 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Our Services
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Comprehensive real estate services for all your needs
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    height: '100%', 
                    textAlign: 'center',
                    '&:hover': {
                      boxShadow: 3,
                      transition: 'all 0.3s ease'
                    }
                  }}>
                    <Box sx={{ 
                      backgroundColor: 'primary.main', 
                      color: 'white', 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3
                    }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              What Our Clients Say
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hear from our satisfied customers
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="body1" fontStyle="italic" gutterBottom>
                    "{testimonial.content}"
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={testimonial.avatar} alt={testimonial.name} />
                    <Box sx={{ ml: 2 }}>
                      <Typography fontWeight="bold">{testimonial.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box sx={{ 
          backgroundImage: 'linear-gradient(rgba(46, 59, 85, 0.9), rgba(46, 59, 85, 0.9))',
          color: 'white',
          py: 10,
          textAlign: 'center'
        }}>
          <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Find Your Dream Home?
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
              Our expert agents are here to help you every step of the way.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ 
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Contact Us Today
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ backgroundColor: '#2E3B55', color: 'white', py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  EliteHomes
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Your trusted partner in real estate for over 15 years.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <IconButton aria-label="facebook" sx={{ color: 'white' }}>
                    <Facebook />
                  </IconButton>
                  <IconButton aria-label="twitter" sx={{ color: 'white' }}>
                    <Twitter />
                  </IconButton>
                  <IconButton aria-label="instagram" sx={{ color: 'white' }}>
                    <Instagram />
                  </IconButton>
                  <IconButton aria-label="linkedin" sx={{ color: 'white' }}>
                    <LinkedIn />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Company
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">About Us</Typography>
                  <Typography variant="body2">Careers</Typography>
                  <Typography variant="body2">Blog</Typography>
                  <Typography variant="body2">Press</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Services
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">Buying</Typography>
                  <Typography variant="body2">Selling</Typography>
                  <Typography variant="body2">Renting</Typography>
                  <Typography variant="body2">Investing</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Contact
                </Typography>
                <Typography variant="body2" gutterBottom>
                  123 Main Street, Suite 100
                </Typography>
                <Typography variant="body2" gutterBottom>
                  New York, NY 10001
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Phone: (555) 123-4567
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Email: info@elitehomes.com
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3 }}>
              <Typography variant="body2" textAlign="center">
                © {new Date().getFullYear()} EliteHomes Real Estate. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;