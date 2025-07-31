import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'
export default function StackComponent({isSmallScreen}) {
  return (
    <Stack 
              direction={isSmallScreen ? 'column' : 'row'} 
              spacing={2}
              sx={{ mb: 2 }}
            >
              {[
                { title: 'Views', count: 31, change: '+3', bg: '#c7a2eaff, #8ec5fc' },
                { title: 'Clients', count: 63, change: '+1', bg: '#a1c4fd, #c2e9fb' },
                { title: 'Purchases', count: 10, change: '+1', bg: '#bb89daff, #e8d4efff ' },
              ].map((card, i) => (
                <Paper key={i} sx={{
                  flex: 1,
                  p: isSmallScreen ? 3 : 8,
                  borderRadius: 5,
                  background: card.bg.includes(',') ? `linear-gradient(100deg, ${card.bg})` : card.bg,
                  minWidth: isSmallScreen ? '100%' : 'auto'
                }}>
                  <Typography variant={isSmallScreen ? "subtitle1" : "h6"}>{card.title}</Typography>
                  <Typography variant={isSmallScreen ? "h5" : "h4"}>{card.count}</Typography>
                  <Typography variant="caption">{card.change} last day</Typography>
                </Paper>
              ))}
            </Stack>
  )
}
