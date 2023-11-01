import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import BoxHeader from "@/components/boxHeader";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";


const Row2 = () => {
    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionsData } =  useGetTransactionsQuery();
    const { palette } = useTheme()
    const pieColors = [palette.primary[800], palette.primary[500]]
    //console.log('product data', productData)
    const pieChartData = useMemo(() => {
        if (kpiData){
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key ,value]) => {
                    return [
                        {
                            name: key,
                            value: value,

                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - value
                        }
                    ]
                }
            )
        }
    }, [kpiData]);

    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`
        },
    ]
    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
            
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.1,
            renderCell: (params: GridCellParams) => params.value.length,
        },
    ]
    console.log("productColumns", productColumns)
    return (
        <>
        <DashboardBox  gridArea="g">
            <BoxHeader 
                title="List of products"
                sideText={`${productData?.length} products`}
                subtitle="hello there looking forward to connect"
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                    }}
                    >
                        <DataGrid
                            columnHeaderHeight = {25}
                            rowHeight = {35}
                            rows={productData || []}
                            columns={productColumns}
                            />
                    </Box>
        </DashboardBox>
        <DashboardBox  gridArea="h"><BoxHeader 
                title="Recent Orders"
                sideText={`${transactionsData?.length} latest transactions`}
                subtitle="hello there looking forward to connect"
                />
                <Box
                    mt="1rem"
                    p="0 0.5rem"
                    height="80%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                    }}
                    >
                        <DataGrid
                            columnHeaderHeight = {25}
                            rowHeight = {35}
                            rows={transactionsData || []}
                            columns={transactionColumns}
                            />
                    </Box></DashboardBox>
        <DashboardBox  gridArea="i">
            <BoxHeader 
                    title="Expense Breakdown by category"
                    sideText="+5%"
                    subtitle="God is Greate"
             />
             <FlexBetween mt="0.5rem"  gap="0.5rem" p="0 1rem" textAlign="center">
                {pieChartData?.map((data, i) =>(
                     <Box key={`${data[0].name}- ${i}`}>
                     <PieChart
                         width={110} 
                         height={100} 
                         >
                     <Pie
                         stroke="none"
                         data={data}
                         innerRadius={18}
                         outerRadius={35}
                         paddingAngle={5}
                         dataKey="value"
                     >
                     {data.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={pieColors[index]} />
                     ))}
                     </Pie>
                 </PieChart>
                 <Typography variant="h5">{data[0].name}</Typography>
                     </Box>
                ))}
             </FlexBetween>
        </DashboardBox>
        <DashboardBox  gridArea="j">
            <BoxHeader 
                        title="Overall Summary and Explanation data "
                        sideText="14%"
                        subtitle="How we are doing"
            />
            <Box
                height="15px"
                margin="1.25rem 1rem 0.4rem 1rem"
                bgcolor={palette.primary[800]}
                borderRadius="1rem"
            >
                <Box
                    height="15px"
                    bgcolor={palette.primary[600]}
                    borderRadius="1rem"
                    width="40%"
                >

                </Box>
                <Typography margin="0 1rem" variant="h6">
                Lorem ipsum dolor sit amet, consectetur adipiscing eli.
                </Typography>
            </Box>
        </DashboardBox>
        </>
    )
}

export default Row2
