import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Chakra imports
import {
    Box,
    Button,
    Flex,
    Grid,
    Progress,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Icon,
    useColorMode,
    useColorModeValue,
    Avatar,
    Spacer,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import BarChart from "components/Charts/BarChart";
  import LineChart from "components/Charts/LineChart";
  import IconBox from "components/Icons/IconBox";
  import avatar5 from "assets/img/avatars/avatar5.png";
  // Custom icons
  import {
    CartIcon,
    DocumentIcon,
    GlobeIcon,
    WalletIcon,
  } from "components/Icons/Icons.js";
  import {
    FaCube,
    FaFacebook,
    FaInstagram,
    FaPenFancy,
    FaPlus,
    FaTwitter,
    FaRegCalendarAlt,
    FaArrowDown,
    FaArrowUp,
    FaPencilAlt
    
  } from "react-icons/fa";
  import { IoDocumentsSharp } from "react-icons/io5";
  // import React from "react";
  // Variables
  import {
    barChartData,
    barChartOptions,
    lineChartData,
    lineChartOptions,
  } from "variables/charts";
  import { pageVisits, socialTraffic } from "variables/general";

// Custom components
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { MastercardIcon, VisaIcon } from "components/Icons/Icons";
import { HSeparator } from "components/Separator/Separator";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";

    import {
        billingData,
        invoicesData,
        newestTransactions,
        olderTransactions,
    } from "variables/general";
    
  
  export default function Dashboard() {
    // Chakra Color Mode
    const iconBlue = useColorModeValue("blue.500", "blue.500");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");
    const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textTableColor = useColorModeValue("gray.500", "white");

    // Chakra color mode
    const iconColor = useColorModeValue("blue.500", "white");
    const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    const borderProfileColor = useColorModeValue("white", "transparent");
    const emailColor = useColorModeValue("gray.400", "gray.300");

  
    const { colorMode } = useColorMode();


    const [budgets, setBudgets]= useState([]);
    const [budgetItems, setBudgetItems]= useState([]);
    const [budgetItemsExpenses, setBudgetItemsExpenses]= useState([]);

    const [budgetTitle, setBudgetTitle]= useState([]);
    const [budgetDate, setBudgetDate]= useState([]);

    const getBudgetItems = async (budget_id) => {
        axios
        .get("http://127.0.0.1:8000/api/budget-items/details/"+budget_id)
        .then((data) => {
        
            setBudgetItems(data.data);
            setBudgetItemsExpenses(data.data.expenses)
            console.log(data.data);
            // console.log(budgetItemsExpenses);
            // console.log(budgetItems?.income);
            // console.log(budgetItems);
            // console.log(budgetItemsExpenses);
        })
        .catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        const getBudgetsData = async () => {
            axios
            .get("http://127.0.0.1:8000/api/budget/get-all")
            .then((data) => {
                console.log(data.data);
                setBudgets(data.data);
        
                // return data.data;
            })
            .catch((error) => {
                console.log(error)
            });
        };
        
        // setBudgets(getBudgetsData());

        // console.log(budgets);
        console.log("MOUNTED");
        getBudgetsData();
        return () => {
        console.log("UNMOUNTING");
         setBudgets([]);
         setBudgetItems([]);
        // this now gets called when the component unmounts
        };
    },[]);

    const deleteBudget = (budget_id) => {
        console.log(budget_id);
    }

    const editBudget = (budget_id) =>{
        getBudgetItems(budget_id);


        const filtered = budgets.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(budget_id)));

        // console.log(filtered);
        setBudgetTitle(filtered[0]?.title);
        setBudgetDate(filtered[0]?.created_at);

        console.log(budgetItems);
        group_expenses();
    }

    const closeBudgetView = ()=>{

        setBudgetItems([]);
        setBudgetTitle([]);
        setBudgetDate([]);
    }

    const expenses_group_total = budgetItems?.expenses_group_total;
    const expenses_grouped_list = budgetItems?.expenses_grouped;

    const group_expenses = () => {
        expenses_grouped_list?.map((item, i) => {
            // return(
            
            // <Text color='gray.400' fontSize='xs' my='18px'>
            //     {item.toString()}
            //     {item[i]?.group_title}
            // </Text>
            // )
            console.log("--- "+item[i]?.group_title);
            item?.map((item) => {
                console.log(item.title);
                // return(
                    // <TransactionRow
                    //     name={item.title}
                    //     logo={FaArrowDown}
                    //     date={item.group_title}
                    //     price={"- R"+item.amount}
                    // />
                // )
            })

            // )
        })
        console.log(expenses_grouped_list);
        console.log(budgetItems?.expenses_grouped);
    }
    
    return (
      <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
        <Flex
            direction={{ sm: "column", md: "row" }}
            mb='24px'
            maxH='330px'
            justifyContent={{ sm: "center", md: "space-between" }}
            align='center'
            backdropFilter='blur(21px)'
            boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
            border='1.5px solid'
            borderColor={borderProfileColor}
            bg={bgProfile}
            p='24px'
            borderRadius='20px'>
            <Flex
            align='center'
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Avatar
                me={{ md: "22px" }}
                src={avatar5}
                w='80px'
                h='80px'
                borderRadius='15px'
            />
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
                <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
                Alec Thompson
                </Text>
                <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight='semibold'>
                alec@simmmple.com
                </Text>
            </Flex>
            </Flex>
            <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}>
            <Button p='0px' bg='transparent' variant='no-effects'>
                <Flex
                align='center'
                w={{ sm: "100%", lg: "135px" }}
                bg={colorMode === "dark" ? "navy.900" : "#fff"}
                borderRadius='8px'
                justifyContent='center'
                py='10px'
                boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.06)'
                cursor='pointer'>
                <Icon color={textColor} as={FaCube} me='6px' />
                <Text fontSize='xs' color={textColor} fontWeight='bold'>
                    OVERVIEW
                </Text>
                </Flex>
            </Button>
            <Button p='0px' bg='transparent' variant='no-effects'>
                <Flex
                align='center'
                w={{ lg: "135px" }}
                borderRadius='15px'
                justifyContent='center'
                py='10px'
                mx={{ lg: "1rem" }}
                cursor='pointer'>
                <Icon color={textColor} as={IoDocumentsSharp} me='6px' />
                <Text fontSize='xs' color={textColor} fontWeight='bold'>
                    TEAMS
                </Text>
                </Flex>
            </Button>
            <Button p='0px' bg='transparent' variant='no-effects'>
                <Flex
                align='center'
                w={{ lg: "135px" }}
                borderRadius='15px'
                justifyContent='center'
                py='10px'
                cursor='pointer'>
                <Icon color={textColor} as={FaPenFancy} me='6px' />
                <Text fontSize='xs' color={textColor} fontWeight='bold'>
                    PROJECTS
                </Text>
                </Flex>
            </Button>
            </Flex>
        </Flex>


        { budgetItems?.length == 0 ?
        <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }}>
            <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
            <Flex direction='column'>
                <CardHeader py='12px'>
                <Text color={textColor} fontSize='lg' fontWeight='bold'>
                    Budgets list
                </Text>
                </CardHeader>
                <CardBody>
                <Flex direction='column' w='100%'>
                    {budgets?.map((row) => {
                        return (
                            <BillingRow
                            name={row.title}
                            company={row.desc}
                            email={row.budget_date}
                            number={row.created_at}
                            budget_id={row.budget_id}
                            deleteBudget={deleteBudget}
                            editBudget={editBudget}
                            />
                        );
                    })}
                </Flex>
                </CardBody>
            </Flex>
            </Card>
        </Grid>
        :
        <Grid templateColumns={{ sm: "1fr", lg: "1.2fr 1.2fr" }}>
            
            <Card  my={{ lg: "24px" }} me={{ lg: "24px" }}>
            <CardHeader mb='12px'>

                <Button p="0px" bg="transparent"
                onClick={()=>closeBudgetView()}
                variant="no-effects">
                    <Flex color={textColor} cursor="pointer" align="center" p="12px">
                    <Icon as={FaPencilAlt} me="4px" />
                    <Text fontSize="sm" fontWeight="semibold">
                        {" "}Close
                    </Text>
                    </Flex>
                </Button>
                <Flex direction='column' w='100%'>
                        <Flex
                            direction={{ sm: "column", lg: "row" }}
                            justify={{ sm: "center", lg: "space-between" }}
                            align={{ sm: "center" }}
                            w='100%'
                            my={{ md: "12px" }}>
                            <Text
                            color={textColor}
                            fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                            fontWeight='bold'>
                            {budgetTitle}
                            </Text>
                            <Flex align='center'>
                            <Icon
                                as={FaRegCalendarAlt}
                                color='gray.400'
                                fontSize='md'
                                me='6px'></Icon>
                            <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
                                {budgetDate}
                            </Text>
                            </Flex>
                        </Flex>
                
                </Flex>
            </CardHeader>
            <CardBody>
                <Flex direction='column' w='100%'>
                <Text
                    color='gray.400'
                    fontSize={{ sm: "sm", md: "md" }}
                    fontWeight='semibold'
                    my='12px'>
                    INCOME
                </Text>
                {budgetItems?.income.map((row) => {
                    return (
                    <TransactionRow
                        name={row.title}
                        logo={FaArrowUp}
                        date={row.updated_at}
                        price={"+ R"+row.amount}
                    />
                    );
                })}
                <br/>
                <hr/>
                <br/>
                
                <Text
                    color='gray.400'
                    fontSize={{ sm: "sm", md: "md" }}
                    fontWeight='semibold'
                    my='12px'>
                    EXPENSES
                </Text>
                {budgetItems?.expenses?.map((item, i) => {
                    return (
                        <TransactionRow
                            name={item.title}
                            logo={FaArrowDown}
                            date={item.group_title}
                            price={"- R"+item.amount}
                        />
                    );
                })}
                {/* {budgetItems?.expenses?.map((item, i) => { */}
                {expenses_grouped_list.map((item, i) => {
                    // return(
                    
                    // <Text color='gray.400' fontSize='xs' my='18px'>
                    //     {item.toString()}
                    //     {item[i]?.group_title}
                    // </Text>
                    // )
                    
                    {item?.map((item) => {
                    
                        // return(
                            <TransactionRow
                                name={item.title}
                                logo={FaArrowDown}
                                date={item.group_title}
                                price={"- R"+item.amount}
                            />
                        // )
                    })}
    
                    // )
                })}
                {group_expenses}
                </Flex>
            </CardBody>
            </Card>

            <Card  my='24px' ms={{ lg: "24px" }}>
            <Flex direction='column'>
                <CardHeader py='12px'>
                {/* <Text color={textColor} fontSize='lg' fontWeight='bold'>
                    Totals
                </Text>
                <br/>
 */}

                <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing='24px' mb='20px'>

                <Card minH='125px'>
                    <Flex direction='column'>
                        <Flex
                        flexDirection='row'
                        align='center'
                        justify='center'
                        w='100%'
                        mb='25px'>
                        <Stat me='auto'>
                            <StatLabel
                            fontSize='xs'
                            color='gray.400'
                            fontWeight='bold'
                            textTransform='uppercase'>
                            Total Income
                            </StatLabel>
                            <Flex>
                            <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                                R{budgetItems?.income_total}
                            </StatNumber>
                            </Flex>
                        </Stat>
                        <IconBox
                            borderRadius='50%'
                            as='Box'
                            h={"45px"}
                            w={"45px"}
                            bg={iconBlue}>
                            <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                        </IconBox>
                        </Flex>
                        <Text color='gray.400' fontSize='sm'>
                        <Text as='span' color='green.400' fontWeight='bold' fontSize='md'>
                            R{budgetItems?.amount_remaining}{" "}
                        </Text>
                           Remaining
                        </Text>
                    </Flex>
                    </Card>
                    <Card minH='125px'>
                    <Flex direction='column'>
                        <Flex
                        flexDirection='row'
                        align='center'
                        justify='center'
                        w='100%'
                        mb='25px'>
                        <Stat me='auto'>
                            <StatLabel
                            fontSize='xs'
                            color='gray.400'
                            fontWeight='bold'
                            textTransform='uppercase'>
                            Total Expenses
                            </StatLabel>
                            <Flex>
                            <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                                R{budgetItems?.expenses_total}
                            </StatNumber>
                            </Flex>
                        </Stat>
                        <IconBox
                            borderRadius='50%'
                            as='Box'
                            h={"45px"}
                            w={"45px"}
                            bg={iconBlue}>
                            <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                        </IconBox>
                        </Flex>
                        <Text color='gray.400' fontSize='sm'>
                        <Text as='span' color='green.400' fontWeight='bold'>
                            {((budgetItems?.expenses_total/budgetItems?.income_total)*100).toFixed(2)}%{" "}
                        </Text>
                         of income
                        </Text>
                    </Flex>
                    </Card>
                </SimpleGrid>

                <hr/>
                {/* <br/> */}
                </CardHeader>
                <CardBody>
                    {
                        expenses_group_total.map((item, i)=>{
                            return(
                                <Flex direction="column"  my='15px' ms={{ lg: "15px" }}>   
                                    <Text
                                        fontSize="md"
                                        color="blue.500"
                                        fontWeight="bold"
                                        pb=".2rem"
                                    >{((item.amount/budgetItems?.income_total)*100).toFixed(0)}% spent on {item.group_title}</Text>
                                    <Progress
                                        colorScheme="blue"
                                        size="xs"
                                        value={((item.amount/budgetItems?.income_total)*100).toFixed(2)}
                                        borderRadius="15px"
                                    />
                                    <Text
                                        fontSize="xs"
                                        color="blue.500"
                                        fontWeight="bold"
                                        pb=".2rem"
                                    >R{item.amount}</Text>
                                    
                                </Flex>
                      
                            ) 
                        })  
                    }
                   
                </CardBody>
            </Flex>
            </Card>
           
        </Grid>

        }

      </Flex>
    );
  }
  