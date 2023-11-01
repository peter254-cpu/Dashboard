import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart,  XAxis, Tooltip, YAxis, Line, CartesianGrid, Area, LineChart, Legend, BarChart, Bar } from "recharts";
import BoxHeader from '@/components/boxHeader';

interface Props{};

const Row = (Props: Props) => {
    const { data } = useGetKpisQuery();
    const { palette } = useTheme()
    const revenue = useMemo(() =>{
        return(
            data && data[0].monthlyData.map(({ month, revenue }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                }
            })
        );
    }, [data])

    const revenueExpenses = useMemo(() =>{
        return(
            data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses
                }
            })
        );
    }, [data])

    const revenueProfit = useMemo(() =>{
        return(
            data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    profit: (revenue - expenses).toFixed(2),
                }
            })
        );
    }, [data])

    return (
       <>
        <DashboardBox  gridArea="a">
            <BoxHeader title="Revenue and expenses" subtitle = "hey to I would like to live like you do" sideText="+4%"  />
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                width={500}
                height={400}
                data={revenueExpenses}
                margin={{
                    top: 15,
                    right: 25,
                    left: -10,
                    bottom: 60,
                }}
                >
                    <defs>
                        <linearGradient id='colorRevenue' x1="0" y1="0" x2 = "0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id='colorExpenses' x1="0" y1="0" x2 = "0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                <XAxis dataKey="name" tickLine = {false} style={{ fontSize: "10px" }} />
                <YAxis tickLine = {false} style={{ fontSize: "10px" }} axisLine = {{ strokeWidth: "0"}} domain={[8000, 23000]} />
                <Tooltip />
                <Area type="monotone" dot = {true} dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone"  dot = {true} dataKey="expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
                </AreaChart>
            </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox  gridArea="b">
        <BoxHeader title="Profit and revenue" subtitle = "hey to I would like to live like you do" sideText="+4%"  />
            <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={400}
                        data={revenueProfit}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" tickLine = {false} style={{ fontSize: "10px" }} />
                            <YAxis tickLine = {false} yAxisId = "left" style={{ fontSize: "10px" }} axisLine = {false} />
                            <YAxis tickLine = {false} orientation = "right" yAxisId = "right" style={{ fontSize: "10px" }} axisLine = {false} />
                            <Tooltip />
                            <Legend height={20} wrapperStyle={{margin: '0 0 10px 0'}} />
                            < Line yAxisId="left" type="monotone" dataKey= "profit" stroke={palette.tertiary[500]}  />
                            < Line yAxisId="right" type="monotone" dataKey= "revenue" stroke={palette.primary.main}  />
                    </LineChart>
                </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox  gridArea="c">
            <BoxHeader title="Revenue Month by Month" subtitle = "hey to I would like to live like you do" sideText="+4%"  />
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={300}
                data={revenue}
                margin={{
                    top: 17,
                    right: 15,
                    left: -5,
                    bottom: 58,
                }}
                >
                     <defs>
                        <linearGradient id='colorRevenue' x1="0" y1="0" x2 = "0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id='colorExpenses' x1="0" y1="0" x2 = "0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid  vertical = {false} stroke = {palette.grey[800]} />
                    <XAxis dataKey="name" axisLine = {false} tickLine = {false} style={{ fontSize: '10px' }} />
                    <YAxis  axisLine = {false} tickLine = {false} style={{ fontSize: '10px' }} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    </BarChart>
            </ResponsiveContainer>
        </DashboardBox>
       </>
    )
}

export default Row
