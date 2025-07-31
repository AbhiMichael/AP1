import { Paper, Stack, Typography ,Box} from '@mui/material'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
export default function ChartComponent({isSmallScreen}) {
  return (
  <Paper sx={{ 
                mt: 2, 
                p: isSmallScreen ? 1 : 3, 
                borderRadius: 3,
                overflow: 'hidden'
              }}>
                <Typography variant={isSmallScreen ? "subtitle1" : "h6"} mb={1}>Total profit</Typography>
                <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                  <Typography variant={isSmallScreen ? "h5" : "h4"} fontWeight={600}>$628.00</Typography>
                  <Typography color="gray">income</Typography>
                  <Typography color="gray">expense</Typography>
                </Box>
                <Box sx={{ height: 250, mt: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jun', income: 100000, expense: 200000 },
                      { month: 'Jul', income: 400000, expense: 350000 },
                      { month: 'Aug', income: 300000, expense: 250000 },
                      { month: 'Sep', income: 500000, expense: 450000 },
                      { month: 'Oct', income: 700000, expense: 500000 },
                      { month: 'Nov', income: 300000, expense: 200000 },
                      { month: 'Dec', income: 400000, expense: 350000 },
                      { month: 'Jan', income: 350000, expense: 280000 }
                    ]}>
                      <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(val) => `${val / 1000}k`} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#00aeae" strokeWidth={2} />
                      <Line type="monotone" dataKey="expense" stroke="#616164" strokeWidth={2} strokeDasharray="4 2" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
    </Paper>)
}