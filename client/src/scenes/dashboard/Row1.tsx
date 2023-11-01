import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis} from "recharts";
import BoxHeader from "@/components/boxHeader";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import FlexBetween from "@/components/FlexBetween";


const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
]

const Row1 = () => {
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const {palette} = useTheme()
    const pieColors = [palette.primary[800], palette.primary[300]];
    const operationalExpenses = useMemo(() => {
        return(
            operationalData &&
            operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
                return{
                    name: month.substring(0, 3),
                    "Operaional Expenses": operationalExpenses,
                    "Non Operational Expenses": nonOperationalExpenses
                }
            })
        )

    }, [operationalData])

    const productExpenseData = useMemo(() => {
        return(
        productData &&
        productData.map(({ _id, price, expense }) => {
                return{
                    id: _id,
                    price: price,
                    expense: expense
                }
            })
        )

    }, [productData])
    return (
       <>
        <DashboardBox  gridArea="d">
            <BoxHeader title="Operational v/s Non Operational Expenses" subtitle = "hey to I would like to live like you do" sideText="+4%"  />
                <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={operationalExpenses}
                            margin={{
                                top: 20,
                                right: 0,
                                left: -10,
                                bottom: 55,
                            }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" tickLine = {false} style={{ fontSize: "10px" }} />
                                <YAxis tickLine = {false} orientation = "left" yAxisId = "left" style={{ fontSize: "10px" }} axisLine = {false} />
                                <YAxis tickLine = {false} orientation = "right" yAxisId = "right" style={{ fontSize: "10px" }} axisLine = {false} />
                                <Tooltip />
                                <Line yAxisId="left" type="monotone" dataKey= "Non Operational Expenses" stroke={palette.tertiary[500]}  />
                                <Line yAxisId="right" type="monotone" dataKey= "Operaional Expenses" stroke={palette.primary.main}  />
                        </LineChart>
                    </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox  gridArea="e">
            <BoxHeader title="Campaigns And Targets" sideText="+4%" subtitle="hey there still pressing on"/>
            <FlexBetween mt = "0.25rem" gap= "1.5rem" pr = "1rem">
                <PieChart
                    width={110}
                    height={100}
                    margin={{
                        top: 0,
                        right: -10,
                        left: 10,
                        bottom: 0,
                    }}
                    >
                <Pie
                    stroke="none"
                    data={pieData}
                    innerRadius={18}
                    outerRadius={38}
                    paddingAngle={5}
                    dataKey="value"
                >
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
                </Pie>
            </PieChart>
            <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                <Typography variant="h5" >Target sales </Typography>
                <Typography m = "0.3rem 0"  variant="h3" color={palette.primary[300]}>
                    83
                </Typography>
                <Typography variant="h6"> Finance goals of the campaigne that is desired </Typography>
            </Box>
            <Box ml="-0.7rem" flexBasis="40%">
                <Typography variant="h5" >Loses in Revenue</Typography>
                <Typography m = "0.3rem 0"  variant="h6">
                    Loses are down 25%
                </Typography>
                <Typography mt="0.4rem" variant="h5"> profit margins</Typography>
                <Typography mt="0.4rem" variant="h5"> Margins are up by 30% from last month</Typography>
            </Box>
        </FlexBetween>
        </DashboardBox>
        <DashboardBox  gridArea="f">
            <BoxHeader title="Product Prices vs Expenses" sideText="+4%" subtitle="hora"/>
            <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
            margin={{
                top: 20,
                right: 25,
                bottom: 40,
                left: 0,
            }}
            >
            <CartesianGrid stroke= {palette.grey[800]} />
            <XAxis
                type="number"
                dataKey="price"
                name="price"
                axisLine = {false}
                tickLine = {false}
                style={{ fontSize: "10px" }}
                tickFormatter={(v) => `$${v}`}
            />
             <YAxis
                type="number"
                dataKey="expense"
                name="expense"
                axisLine = {false}
                tickLine = {false}
                style={{ fontSize: "10px" }}
                tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter name="Product Expense Ratio" data={ productExpenseData } fill={palette.tertiary[500]} />
            </ScatterChart>
      </ResponsiveContainer>
        </DashboardBox>
       </>
    )
}

export default Row1
